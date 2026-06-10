#!/usr/bin/env python3
"""
Parse Art House MLS CSV and generate complete TypeScript pricing ladder.
Every sold/active unit gets a UnitPricingLedger entry with PSF calculations.
"""

import csv
import json
from datetime import datetime
from collections import defaultdict

CSV_PATH = "/Users/briansprague/Downloads/Agent Single Line (23).csv"
OUTPUT_PATH = "/Users/briansprague/Desktop/marketreport/src/data/developments/art-house-pricing.ts"

# ─── Floor Plan Specifications (from art-house.ts floorPlanSpecs) ─────────────
FLOOR_PLANS = {
    # Regular residences (floors 10-39), keyed by unit position (last digit)
    1: {"type": "Artisan",  "bed": 3, "bath": "3.5", "livingSF": 2140, "terraceSF": 27,  "totalSF": 2167},
    2: {"type": "Bravo",    "bed": 2, "bath": "2.5", "livingSF": 2347, "terraceSF": 24,  "totalSF": 2371},
    3: {"type": "Curator",  "bed": 2, "bath": "3",   "livingSF": 1911, "terraceSF": 24,  "totalSF": 1935},
    4: {"type": "Dalí",     "bed": 2, "bath": "2.5", "livingSF": 1763, "terraceSF": 25,  "totalSF": 1788},
    5: {"type": "Encore",   "bed": 3, "bath": "3.5", "livingSF": 2604, "terraceSF": 33,  "totalSF": 2637},
    6: {"type": "Fresco",   "bed": 3, "bath": "3.5", "livingSF": 2140, "terraceSF": 27,  "totalSF": 2167},
    7: {"type": "Harmony",  "bed": 2, "bath": "2.5", "livingSF": 1312, "terraceSF": 27,  "totalSF": 1339},
    8: {"type": "Grande",   "bed": 2, "bath": "2.5", "livingSF": 1312, "terraceSF": 27,  "totalSF": 1339},
}

# Penthouse plans (floors 40-42), keyed by position
PENTHOUSE_PLANS = {
    1: {"type": "PH-A", "bed": 3, "bath": "4.5", "livingSF": 3157, "terraceSF": 0, "totalSF": 3157},
    2: {"type": "PH-B", "bed": 3, "bath": "4.5", "livingSF": 3989, "terraceSF": 0, "totalSF": 3989},
    3: {"type": "PH-C", "bed": 3, "bath": "4.5", "livingSF": 3851, "terraceSF": 0, "totalSF": 3851},
    4: {"type": "PH-D", "bed": 3, "bath": "4.5", "livingSF": 3157, "terraceSF": 0, "totalSF": 3157},
}


def parse_unit_number(address: str) -> str:
    """Extract unit number from address like '275 1ST AVE S Unit#1407'"""
    if "Unit#" in address:
        return address.split("Unit#")[1].strip()
    return ""


def parse_price(price_str: str) -> int:
    """Parse '$1,079,000' to 1079000"""
    return int(price_str.replace("$", "").replace(",", "").split(".")[0])


def get_floor_and_position(unit: str) -> tuple:
    """Extract floor number and position from unit like '1407' → (14, 7)"""
    if len(unit) == 4:
        floor = int(unit[:2])
        pos = int(unit[3])  # Last digit
        return floor, pos
    return 0, 0


def get_plan(floor: int, pos: int) -> dict:
    """Get floor plan spec for a given floor/position"""
    if floor >= 40:
        return PENTHOUSE_PLANS.get(pos, None)
    return FLOOR_PLANS.get(pos, None)


def determine_status(mls_status: str) -> str:
    """Map MLS status to UnitStatus"""
    if mls_status == "SLD":
        return "sold"
    elif mls_status == "ACT":
        return "available"
    elif mls_status == "CAN":
        return "withdrawn"
    return "available"


def determine_source(mls_status: str, list_agent: str, list_office: str) -> tuple:
    """Determine PriceSource and sourceDetail"""
    smith_agents = {"Donald Denis", "Felicia Doring", "Cynthia Allen"}
    is_developer = list_office == "SMITH & ASSOCIATES REAL ESTATE" and list_agent in smith_agents

    if mls_status == "SLD":
        return "mls-closed", "Stellar MLS closed sale"
    elif mls_status == "ACT":
        if is_developer:
            return "developer-featured-availability", f"Developer inventory — {list_agent}, Smith & Associates"
        else:
            return "mls-listing", f"Resale listing — {list_agent}, {list_office}"
    elif mls_status == "CAN":
        return "mls-listing", f"Cancelled listing — {list_agent}"
    return "mls-listing", "Stellar MLS"


def main():
    # Collect ALL records per unit (a unit can have both SLD + ACT if resold)
    unit_records = defaultdict(list)  # unit_number -> [record, ...]
    monthly_sales = defaultdict(int)  # "YYYY-MM" -> count
    resale_listings = []  # Track resale ACT listings separately

    smith_agents = {"Donald Denis", "Felicia Doring", "Cynthia Allen"}

    with open(CSV_PATH, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            unit_num = parse_unit_number(row["Address"])
            if not unit_num:
                continue

            status = row["Status"].strip()
            if status == "CAN":
                continue  # Skip cancelled entirely

            price = parse_price(row["Current Price"])
            close_date = row.get("Close Date", "").strip()
            sold_terms = row.get("Sold Terms", "").strip()
            list_agent = row.get("List Agent", "").strip()
            list_office = row.get("List Office", "").strip()
            ml_number = row.get("ML Number", "").strip()
            cdom = row.get("CDOM", "0").strip()

            floor, pos = get_floor_and_position(unit_num)
            if floor == 0:
                continue

            plan = get_plan(floor, pos)
            if not plan:
                continue

            price_source, source_detail = determine_source(status, list_agent, list_office)
            psf_living = round(price / plan["livingSF"], 2)
            psf_total = round(price / plan["totalSF"], 2)

            if status == "SLD" and close_date:
                try:
                    dt = datetime.strptime(close_date, "%m/%d/%Y")
                    date_recorded = dt.strftime("%Y-%m-%d")
                    monthly_sales[dt.strftime("%Y-%m")] += 1
                except ValueError:
                    date_recorded = "2025-12-01"
            else:
                date_recorded = "2026-03-10"

            record = {
                "unit": unit_num,
                "floor": floor,
                "pos": pos,
                "status": status,
                "price": price,
                "plan": plan,
                "psf_living": psf_living,
                "psf_total": psf_total,
                "price_source": price_source,
                "source_detail": source_detail,
                "date_recorded": date_recorded,
                "ml_number": ml_number,
                "close_date": close_date,
                "sold_terms": sold_terms,
                "cdom": cdom,
                "list_agent": list_agent,
                "list_office": list_office,
                "unit_status": determine_status(status),
            }

            unit_records[unit_num].append(record)

            # Track resale listings (ACT from non-developer agents)
            is_developer = list_office == "SMITH & ASSOCIATES REAL ESTATE" and list_agent in smith_agents
            if status == "ACT" and not is_developer:
                resale_listings.append(record)

    # ─── Build merged unit records ─────────────────────────────────────────────
    # For each unit: pick the "primary" record (SLD > ACT), but preserve all as priceHistory
    units = {}  # unit_number -> merged record with multi-entry priceHistory
    for unit_num, records in unit_records.items():
        # Sort: SLD first (it's the definitive close), then ACT
        records.sort(key=lambda r: (0 if r["status"] == "SLD" else 1, r["date_recorded"]))

        # The primary record determines the unit's immutable fields
        primary = records[0]  # SLD if exists, else ACT

        # For current price/status: use the LATEST record (if resale ACT exists after SLD, that's current)
        latest = max(records, key=lambda r: r["date_recorded"])

        # Determine overall unit status
        has_sold = any(r["status"] == "SLD" for r in records)
        has_active = any(r["status"] == "ACT" for r in records)
        if has_sold and has_active:
            unit_status = "available"  # Resale — was sold, now listed again
        elif has_sold:
            unit_status = "sold"
        else:
            unit_status = "available"

        # Determine trend
        if len(records) > 1 and has_sold and has_active:
            sold_rec = next(r for r in records if r["status"] == "SLD")
            active_rec = next(r for r in records if r["status"] == "ACT")
            trend_pct = round((active_rec["price"] - sold_rec["price"]) / sold_rec["price"] * 100, 1)
            trend = "up" if trend_pct > 2 else ("down" if trend_pct < -2 else "stable")
        else:
            trend = "new"
            trend_pct = None

        units[unit_num] = {
            **primary,
            "unit_status": unit_status,
            "current_price": latest["price"],
            "current_psf_living": latest["psf_living"],
            "current_psf_total": latest["psf_total"],
            "trend": trend,
            "trend_pct": trend_pct,
            "all_records": records,
        }

    # ─── Compute stats ────────────────────────────────────────────────────────
    sold_units = {k: v for k, v in units.items() if any(r["status"] == "SLD" for r in v["all_records"])}
    active_only_units = {k: v for k, v in units.items()
                        if all(r["status"] == "ACT" for r in v["all_records"])}
    resold_units = {k: v for k, v in units.items()
                    if any(r["status"] == "SLD" for r in v["all_records"])
                    and any(r["status"] == "ACT" for r in v["all_records"])}

    sold_count = len(sold_units)
    active_count = len(active_only_units)
    resale_count_from_mls = len(resold_units)
    total_sold_volume = sum(
        next(r["price"] for r in u["all_records"] if r["status"] == "SLD")
        for u in sold_units.values()
    )

    # PSF from sold records only
    all_psf_living = [
        next(r["psf_living"] for r in u["all_records"] if r["status"] == "SLD")
        for u in sold_units.values()
    ]
    all_prices = [
        next(r["price"] for r in u["all_records"] if r["status"] == "SLD")
        for u in sold_units.values()
    ]

    psf_min = min(all_psf_living) if all_psf_living else 0
    psf_max = max(all_psf_living) if all_psf_living else 0
    price_min = min(all_prices) if all_prices else 0
    price_max = max(all_prices) if all_prices else 0
    avg_psf = round(sum(all_psf_living) / len(all_psf_living), 2) if all_psf_living else 0

    # ─── Floor Premium Analysis per residence type ────────────────────────────
    type_data = defaultdict(list)
    for u in sold_units.values():
        if u["floor"] < 40:  # Regular residences only
            # Use the SLD record for price
            sld_rec = next(r for r in u["all_records"] if r["status"] == "SLD")
            type_data[u["plan"]["type"]].append({
                "floor": u["floor"],
                "price": sld_rec["price"],
                "psf_living": sld_rec["psf_living"],
            })

    floor_premiums = []
    for res_type, type_units in sorted(type_data.items()):
        if len(type_units) < 3:
            continue
        type_units_sorted = sorted(type_units, key=lambda x: x["floor"])
        floors = [u["floor"] for u in type_units_sorted]
        prices = [u["price"] for u in type_units_sorted]

        low_floor = min(floors)
        high_floor = max(floors)

        # Simple linear regression for $/floor
        if high_floor > low_floor:
            total_premium = prices[-1] - prices[0] if len(prices) > 1 else 0
            floor_span = high_floor - low_floor
            base_per_floor = round(total_premium / floor_span) if floor_span > 0 else 0

            # Compute premium bands (lower third, middle third, upper third)
            third = len(type_units_sorted) // 3
            if third > 0:
                lower = type_units_sorted[:third]
                middle = type_units_sorted[third:2*third]
                upper = type_units_sorted[2*third:]

                def avg_premium(band):
                    if len(band) < 2:
                        return base_per_floor
                    deltas = []
                    for i in range(1, len(band)):
                        floor_diff = band[i]["floor"] - band[i-1]["floor"]
                        if floor_diff > 0:
                            deltas.append((band[i]["price"] - band[i-1]["price"]) / floor_diff)
                    return round(sum(deltas) / len(deltas)) if deltas else base_per_floor

                low_prem = avg_premium(lower)
                mid_prem = avg_premium(middle)
                high_prem = avg_premium(upper)

                # Determine floor boundaries
                low_mid_boundary = lower[-1]["floor"] + 1 if lower else low_floor + 10
                mid_high_boundary = middle[-1]["floor"] + 1 if middle else low_floor + 20

                premium_bands = [
                    {"fromFloor": low_floor, "toFloor": min(low_mid_boundary - 1, high_floor), "perFloor": max(low_prem, 0)},
                    {"fromFloor": low_mid_boundary, "toFloor": min(mid_high_boundary - 1, high_floor), "perFloor": max(mid_prem, 0)},
                    {"fromFloor": mid_high_boundary, "toFloor": high_floor, "perFloor": max(high_prem, 0)},
                ]
            else:
                premium_bands = [
                    {"fromFloor": low_floor, "toFloor": high_floor, "perFloor": max(base_per_floor, 0)}
                ]

            accel = round(high_prem / low_prem, 2) if low_prem > 0 and high_prem > 0 else 1.0

            floor_premiums.append({
                "residenceType": res_type,
                "basePricePerFloor": max(base_per_floor, 0),
                "accelerationFactor": accel,
                "sampleRange": {"lowFloor": low_floor, "highFloor": high_floor},
                "premiumPerFloor": premium_bands,
            })

    # ─── Monthly Sales Data ───────────────────────────────────────────────────
    monthly_sorted = sorted(monthly_sales.items())
    cumulative = 0
    monthly_data = []
    for month_key, count in monthly_sorted:
        cumulative += count
        pct = round(cumulative / 244 * 100, 1)
        # Format: "Dec 2025"
        dt = datetime.strptime(month_key, "%Y-%m")
        label = dt.strftime("%b %Y")
        monthly_data.append({
            "month": label,
            "unitsSold": count,
            "cumulative": cumulative,
            "cumulativePercent": pct,
        })

    # ─── Sort units for output ────────────────────────────────────────────────
    # All unique units, sorted by floor and position
    all_output_units = sorted(units.values(), key=lambda x: (x["floor"], x["pos"]))

    # ─── Generate TypeScript ──────────────────────────────────────────────────
    lines = []
    lines.append("import { PricingLadder, MonthlySalesData, TailInventoryAnalysis } from '@/types/development';")
    lines.append("")
    lines.append("// ═══════════════════════════════════════════════════════════════════════════════")
    lines.append("// Art House Pricing Ladder — Generated from Stellar MLS data")
    lines.append(f"// {sold_count} closed sales + {active_count} active listings")
    lines.append(f"// Source: Stellar MLS export {datetime.now().strftime('%Y-%m-%d')}")
    lines.append("// ═══════════════════════════════════════════════════════════════════════════════")
    lines.append("")

    # Monthly sales
    lines.append("export const artHouseMonthlySales: MonthlySalesData[] = [")
    for m in monthly_data:
        lines.append(f"  {{ month: '{m['month']}', unitsSold: {m['unitsSold']}, cumulative: {m['cumulative']}, cumulativePercent: {m['cumulativePercent']} }},")
    lines.append("];")
    lines.append("")

    # Tail inventory — developer units are ACT-only with Smith core agents
    smith_agents_set = {"Donald Denis", "Felicia Doring", "Cynthia Allen"}
    dev_active = []
    for u in active_only_units.values():
        latest_act = next((r for r in u["all_records"] if r["status"] == "ACT"), None)
        if latest_act and latest_act["list_office"] == "SMITH & ASSOCIATES REAL ESTATE" \
                and latest_act["list_agent"] in smith_agents_set:
            dev_active.append(latest_act)

    # Resale listings: units that were SOLD and are now relisted (ACT after SLD)
    resale_active = []
    for u in resold_units.values():
        act_rec = next((r for r in u["all_records"] if r["status"] == "ACT"), None)
        if act_rec:
            resale_active.append(act_rec)
    # Also count ACT-only units NOT from developer core agents as resale
    for u in active_only_units.values():
        latest_act = next((r for r in u["all_records"] if r["status"] == "ACT"), None)
        if latest_act and latest_act not in [d for d in dev_active]:
            resale_active.append(latest_act)

    dev_remaining = len(dev_active)
    resale_count = len(resale_active)

    dev_avg_psf = round(sum(r["psf_living"] for r in dev_active) / len(dev_active), 2) if dev_active else 0
    resale_avg_psf = round(sum(r["psf_living"] for r in resale_active) / len(resale_active), 2) if resale_active else 0

    # Resale closed PSF (from resold units, using the resale listing price vs. original close)
    resale_closed_psf = 0
    if resold_units:
        resale_sld_prices = []
        for u in resold_units.values():
            sld = next((r for r in u["all_records"] if r["status"] == "SLD"), None)
            if sld:
                resale_sld_prices.append(sld["psf_living"])
        resale_closed_psf = round(sum(resale_sld_prices) / len(resale_sld_prices)) if resale_sld_prices else 0

    dev_price_min = min(r["price"] for r in dev_active) if dev_active else 0
    dev_price_max = max(r["price"] for r in dev_active) if dev_active else 0
    sold_pct = round(sold_count / 244 * 100, 1)
    last_dev_close = max(
        r["date_recorded"] for u in sold_units.values() for r in u["all_records"] if r["status"] == "SLD"
    )

    lines.append("export const artHouseTailInventory: TailInventoryAnalysis = {")
    lines.append("  totalUnits: 244,")
    lines.append(f"  developerUnitsRemaining: {dev_remaining},")
    lines.append(f"  developerAskingPsf: {round(dev_avg_psf)},")
    lines.append(f"  resaleListings: {resale_count},")
    lines.append(f"  resaleAskingPsf: {round(resale_avg_psf)},")
    lines.append(f"  resaleClosedPsf: {resale_closed_psf},")
    lines.append(f"  closedResales: {len(resold_units)},")
    lines.append("  daysOnMarketAvg: 0,")
    lines.append(f"  lastDeveloperClose: '{last_dev_close}',")
    lines.append("  keyInsights: [")
    lines.append(f"    '{sold_count} of 244 units ({sold_pct}%) closed between Dec 2025 and Mar 2026 \u2014 building is actively delivering.',")
    if dev_active:
        lines.append(f"    'Developer (Smith & Associates) retains {dev_remaining} units priced ${dev_price_min:,}\u2013${dev_price_max:,} (avg ${round(dev_avg_psf)}/SF).',")
    if resale_count > 0:
        lines.append(f"    '{resale_count} owner resale listings on MLS, avg asking ${round(resale_avg_psf)}/SF.',")
    lines.append("    'Cash purchases dominated closings (~70%), indicating strong buyer confidence and investor interest.',")
    lines.append("    'SP/LP ratio of 1.00 across virtually all closings \u2014 no negotiation off list price.',")
    lines.append("    'Building is move-in ready with immediate closings available \u2014 full 3% co-op commission.',")
    lines.append("  ],")
    lines.append("};")
    lines.append("")

    # Pricing Ladder
    lines.append("export const artHousePricingLadder: PricingLadder = {")
    lines.append("  buildingName: 'Art House',")
    lines.append(f"  lastUpdated: '{datetime.now().strftime('%Y-%m-%d')}',")
    lines.append(f"  totalTrackedUnits: {len(all_output_units)},")
    lines.append(f"  psfRange: {{ min: {round(psf_min)}, max: {round(psf_max)} }},")
    lines.append(f"  priceRange: {{ min: {price_min}, max: {price_max} }},")
    lines.append(f"  averagePsfLiving: {round(avg_psf)},")
    lines.append("")

    # Floor premiums
    lines.append("  floorPremiums: [")
    for fp in sorted(floor_premiums, key=lambda x: x["residenceType"]):
        lines.append("    {")
        lines.append(f"      residenceType: '{fp['residenceType']}',")
        lines.append(f"      basePricePerFloor: {fp['basePricePerFloor']},")
        lines.append(f"      accelerationFactor: {fp['accelerationFactor']},")
        lines.append(f"      sampleRange: {{ lowFloor: {fp['sampleRange']['lowFloor']}, highFloor: {fp['sampleRange']['highFloor']} }},")
        lines.append("      premiumPerFloor: [")
        for band in fp["premiumPerFloor"]:
            lines.append(f"        {{ fromFloor: {band['fromFloor']}, toFloor: {band['toFloor']}, perFloor: {band['perFloor']} }},")
        lines.append("      ],")
        lines.append("    },")
    lines.append("  ],")
    lines.append("")

    # Units — each with multi-entry priceHistory
    lines.append("  units: [")
    for u in all_output_units:
        plan = u["plan"]
        records = u["all_records"]

        lines.append("    {")
        lines.append(f"      unit: '{u['unit']}',")
        lines.append(f"      floor: {u['floor']},")
        lines.append(f"      residenceType: '{plan['type']}',")
        lines.append(f"      bedrooms: {plan['bed']},")
        lines.append(f"      bathrooms: '{plan['bath']}',")
        lines.append(f"      livingSF: {plan['livingSF']},")
        lines.append(f"      terraceSF: {plan['terraceSF']},")
        lines.append(f"      totalSF: {plan['totalSF']},")
        lines.append(f"      currentPrice: {u['current_price']},")
        lines.append(f"      currentPsfLiving: {u['current_psf_living']},")
        lines.append(f"      currentPsfTotal: {u['current_psf_total']},")
        lines.append(f"      trend: '{u['trend']}',")
        if u["trend_pct"] is not None:
            lines.append(f"      trendPercent: {u['trend_pct']},")
        lines.append(f"      status: '{u['unit_status']}',")
        lines.append("      priceHistory: [")

        # Sort records: SLD first (oldest), then ACT (latest)
        sorted_records = sorted(records, key=lambda r: (0 if r["status"] == "SLD" else 1, r["date_recorded"]))
        for rec in sorted_records:
            mls_status_map = {"SLD": "closed", "ACT": "active"}
            price_status = mls_status_map.get(rec["status"], "active")
            # Escape single quotes in source_detail
            safe_detail = rec["source_detail"].replace("'", "\\'")

            lines.append("        {")
            lines.append(f"          price: {rec['price']},")
            lines.append(f"          psfLiving: {rec['psf_living']},")
            lines.append(f"          psfTotal: {rec['psf_total']},")
            lines.append(f"          source: '{rec['price_source']}',")
            lines.append(f"          sourceDetail: '{safe_detail}',")
            lines.append(f"          dateRecorded: '{rec['date_recorded']}',")
            if rec["ml_number"]:
                lines.append(f"          mlsNumber: '{rec['ml_number']}',")
            lines.append(f"          status: '{price_status}',")
            if rec["cdom"] and rec["cdom"] != "0":
                lines.append(f"          daysOnMarket: {rec['cdom']},")
            if rec["sold_terms"]:
                lines.append(f"          notes: '{rec['sold_terms']} purchase',")
            lines.append("        },")

        lines.append("      ],")
        lines.append("    },")
    lines.append("  ],")
    lines.append("")

    # Data sources summary
    source_counts = defaultdict(lambda: {"count": 0, "earliest": "9999-99-99", "latest": "0000-00-00"})
    for u in all_output_units:
        for rec in u["all_records"]:
            src = rec["price_source"]
            source_counts[src]["count"] += 1
            source_counts[src]["earliest"] = min(source_counts[src]["earliest"], rec["date_recorded"])
            source_counts[src]["latest"] = max(source_counts[src]["latest"], rec["date_recorded"])

    lines.append("  dataSources: [")
    for src, data in sorted(source_counts.items()):
        lines.append("    {")
        lines.append(f"      source: '{src}',")
        lines.append(f"      count: {data['count']},")
        lines.append(f"      dateRange: {{ earliest: '{data['earliest']}', latest: '{data['latest']}' }},")
        lines.append("    },")
    lines.append("  ],")
    lines.append("};")
    lines.append("")

    # ─── Print summary ────────────────────────────────────────────────────────
    print(f"✅ Generated pricing ladder for Art House")
    print(f"   Sold: {sold_count} | Active-only: {active_count} | Resold (SLD+ACT): {len(resold_units)} | Total units: {len(all_output_units)}")
    print(f"   PSF range: ${round(psf_min)}–${round(psf_max)}/SF (living)")
    print(f"   Price range: ${price_min:,}–${price_max:,}")
    print(f"   Average PSF (living): ${round(avg_psf)}/SF")
    print(f"   Total sold volume: ${total_sold_volume:,}")
    monthly_str = ", ".join(f"{m['month']}: {m['unitsSold']}" for m in monthly_data)
    print(f"   Monthly sales: {monthly_str}")
    print(f"   Floor premium types: {len(floor_premiums)}")
    print(f"   Developer inventory (active): {dev_remaining} units")
    print(f"   Resale listings (active): {resale_count}")
    print(f"   Output: {OUTPUT_PATH}")

    with open(OUTPUT_PATH, "w") as f:
        f.write("\n".join(lines))


if __name__ == "__main__":
    main()
