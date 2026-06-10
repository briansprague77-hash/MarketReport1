#!/usr/bin/env python3
"""
Parse 400 Central MLS CSV and generate complete TypeScript pricing ladder.
Every sold/active unit gets a UnitPricingLedger entry with PSF calculations.

Adapted from generate-art-house-pricing.py for 400 Central's unit scheme.
"""

import csv
import re
from datetime import datetime
from collections import defaultdict

CSV_PATH = "/Users/briansprague/Downloads/Agent Single Line (27).csv"
OUTPUT_PATH = "/Users/briansprague/Desktop/marketreport/src/data/developments/400-central-pricing.ts"

TOTAL_UNITS = 301
BUILDING_NAME = "Residences at 400 Central"

# ─── Floor Plan Specifications ──────────────────────────────────────────────────
# Keyed by unit position (last 2 digits). SF from MLS Heated Area.
# Positions 03, 05, 06 change at upper floors — we use MLS SF directly.
# Brian to provide named residence types later; using "Type XX" for now.
FLOOR_PLANS = {
    1:  {"type": "Type 01", "bed": 3, "bath": "3.5", "livingSF": 2658, "terraceSF": 0, "totalSF": 2658},
    2:  {"type": "Type 02", "bed": 3, "bath": "2.5", "livingSF": 1762, "terraceSF": 0, "totalSF": 1762},
    3:  {"type": "Type 03", "bed": 2, "bath": "2.5", "livingSF": 1358, "terraceSF": 0, "totalSF": 1358},
    4:  {"type": "Type 04", "bed": 2, "bath": "2.5", "livingSF": 1311, "terraceSF": 0, "totalSF": 1311},
    5:  {"type": "Type 05", "bed": 3, "bath": "3",   "livingSF": 1732, "terraceSF": 0, "totalSF": 1732},
    6:  {"type": "Type 06", "bed": 2, "bath": "2.5", "livingSF": 1277, "terraceSF": 0, "totalSF": 1277},
    7:  {"type": "Type 07", "bed": 3, "bath": "3.5", "livingSF": 2606, "terraceSF": 0, "totalSF": 2606},
    8:  {"type": "Type 08", "bed": 2, "bath": "2.5", "livingSF": 1348, "terraceSF": 0, "totalSF": 1348},
    9:  {"type": "Type 09", "bed": 2, "bath": "2.5", "livingSF": 1380, "terraceSF": 0, "totalSF": 1380},
}

# Upper-floor variants where positions change size/bedrooms
UPPER_FLOOR_PLANS = {
    # Position 03 above ~floor 26: larger 3BR
    (3, 26): {"type": "Type 03 Upper", "bed": 3, "bath": "3", "livingSF": 1782, "terraceSF": 0, "totalSF": 1782},
    # Position 05 above ~floor 22: larger 3BR
    (5, 22): {"type": "Type 05 Upper", "bed": 3, "bath": "3", "livingSF": 1921, "terraceSF": 0, "totalSF": 1921},
    (5, 26): {"type": "Type 05 High",  "bed": 3, "bath": "3", "livingSF": 1948, "terraceSF": 0, "totalSF": 1948},
    # Position 06 above ~floor 20: larger 3BR
    (6, 20): {"type": "Type 06 Upper", "bed": 3, "bath": "3", "livingSF": 1948, "terraceSF": 0, "totalSF": 1948},
}

# Penthouse plans (floors 40+)
PENTHOUSE_PLANS = {
    # Unit 4102: 3,927 SF, 4BR/4BA
    "4102": {"type": "PH-A",  "bed": 4, "bath": "4",   "livingSF": 3927, "terraceSF": 0, "totalSF": 3927},
    # Unit PH 4204: 2,385 SF, 3BR/3BA (from CAN listing)
    "PH 4204": {"type": "PH-B", "bed": 3, "bath": "3", "livingSF": 2385, "terraceSF": 0, "totalSF": 2385},
    # Unit 4001PH: 4,849 SF, 4BR/3.5BA (from CAN listing)
    "4001PH": {"type": "PH-C", "bed": 4, "bath": "3.5", "livingSF": 4849, "terraceSF": 0, "totalSF": 4849},
}

# Developer agents at MICHAEL SAUNDERS & COMPANY
# All 66 SLD records are from these agents with 0 DOM and SP/LP 1.00
DEVELOPER_AGENT_IDS = {
    "248024777",   # Andrew Warren
    "277017705",   # Marijke White
    "279649795",   # Tina Borges-Druth
    "260051555",   # Bennett Eppinger
}


def parse_unit_number(address: str) -> str:
    """Extract unit number from address like '400 CENTRAL AVE Unit#1804'"""
    if "Unit#" in address:
        raw = address.split("Unit#")[1].strip()
        return raw
    return ""


def parse_price(price_str: str) -> int:
    """Parse '$1,079,000' to 1079000"""
    cleaned = price_str.replace("$", "").replace(",", "").strip()
    if not cleaned:
        return 0
    return int(float(cleaned))


def parse_heated_area(area_str: str) -> int:
    """Parse '1,311' to 1311"""
    cleaned = area_str.replace(",", "").strip()
    return int(cleaned) if cleaned else 0


def get_floor_and_position(unit: str) -> tuple:
    """Extract floor number and position from unit like '1804' -> (18, 4)
    Also handles '4001PH', 'PH 4204', '4102' etc.
    """
    # Clean unit string
    clean = unit.strip()

    # Handle penthouse formats
    if clean in PENTHOUSE_PLANS:
        return 40, 0  # Special penthouse handling

    # Standard 4-digit format: FFPP (e.g., 1804 = floor 18, position 04)
    digits = re.sub(r'[^0-9]', '', clean)
    if len(digits) == 4:
        floor = int(digits[:2])
        pos = int(digits[2:])  # Last 2 digits = position (01-09)
        return floor, pos
    elif len(digits) == 3:
        # 3-digit like 505 = floor 5, position 05
        floor = int(digits[0])
        pos = int(digits[1:])
        return floor, pos

    return 0, 0


def get_plan(unit: str, floor: int, pos: int, mls_sf: int) -> dict:
    """Get floor plan spec for a given unit/floor/position.
    Uses MLS heated area to override SF when it differs from standard plan.
    """
    # Check penthouse
    if unit in PENTHOUSE_PLANS:
        return PENTHOUSE_PLANS[unit]

    # Check upper-floor variants
    for (check_pos, threshold_floor), plan in sorted(UPPER_FLOOR_PLANS.items(), key=lambda x: -x[0][1]):
        if pos == check_pos and floor >= threshold_floor:
            return plan

    # Standard plan
    plan = FLOOR_PLANS.get(pos)
    if not plan:
        return None

    # If MLS SF differs significantly from standard, use MLS SF
    if mls_sf > 0 and abs(mls_sf - plan["livingSF"]) > 50:
        return {**plan, "livingSF": mls_sf, "totalSF": mls_sf}

    return plan


def determine_status(mls_status: str) -> str:
    """Map MLS status to UnitStatus"""
    return {"SLD": "sold", "ACT": "available", "PND": "pending", "CAN": "withdrawn"}.get(mls_status, "available")


def is_developer_listing(agent_id: str) -> bool:
    """Check if listing is from developer sales office"""
    return agent_id in DEVELOPER_AGENT_IDS


def determine_source(mls_status: str, list_agent: str, list_office: str, agent_id: str) -> tuple:
    """Determine PriceSource and sourceDetail"""
    is_dev = is_developer_listing(agent_id) and list_office == "MICHAEL SAUNDERS & COMPANY"

    if mls_status == "SLD":
        return "mls-closed", "Stellar MLS closed sale"
    elif mls_status == "ACT":
        if is_dev:
            return "developer-featured-availability", f"Developer inventory — {list_agent}, Michael Saunders"
        else:
            return "mls-listing", f"Resale listing — {list_agent}, {list_office}"
    elif mls_status == "PND":
        return "mls-listing", f"Pending — {list_agent}, {list_office}"
    elif mls_status == "CAN":
        return "mls-listing", f"Cancelled listing — {list_agent}"
    return "mls-listing", "Stellar MLS"


def main():
    unit_records = defaultdict(list)
    monthly_sales = defaultdict(int)

    with open(CSV_PATH, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            unit_num = parse_unit_number(row["Address"])
            if not unit_num:
                continue

            status = row["Status"].strip()
            if status == "CAN":
                continue  # Skip cancelled

            price = parse_price(row["Current Price"])
            mls_sf = parse_heated_area(row.get("Heated Area", "0"))
            close_date = row.get("Close Date", "").strip()
            sold_terms = row.get("Sold Terms", "").strip()
            list_agent = row.get("List Agent", "").strip()
            list_office = row.get("List Office", "").strip()
            agent_id = row.get("List Agent ID", "").strip()
            ml_number = row.get("ML Number", "").strip()
            cdom = row.get("CDOM", "0").strip()
            beds = row.get("Beds", "0").strip()
            full_baths = row.get("Full Baths", "0").strip()
            half_baths = row.get("Half Baths", "0").strip()

            floor, pos = get_floor_and_position(unit_num)
            if floor == 0 and unit_num not in PENTHOUSE_PLANS:
                print(f"  ⚠️  Skipped: {unit_num} (could not parse floor/position)")
                continue

            plan = get_plan(unit_num, floor, pos, mls_sf)
            if not plan:
                print(f"  ⚠️  Skipped: {unit_num} floor={floor} pos={pos} (no plan match)")
                continue

            # Use MLS SF for PSF calculation (more accurate than plan lookup)
            living_sf = mls_sf if mls_sf > 0 else plan["livingSF"]

            price_source, source_detail = determine_source(status, list_agent, list_office, agent_id)
            psf_living = round(price / living_sf, 2) if living_sf > 0 else 0
            psf_total = round(price / plan["totalSF"], 2) if plan["totalSF"] > 0 else 0

            if status == "SLD" and close_date:
                try:
                    dt = datetime.strptime(close_date, "%m/%d/%Y")
                    date_recorded = dt.strftime("%Y-%m-%d")
                    monthly_sales[dt.strftime("%Y-%m")] += 1
                except ValueError:
                    date_recorded = "2026-01-01"
            else:
                date_recorded = datetime.now().strftime("%Y-%m-%d")

            # Format bath string
            bath_str = full_baths
            if half_baths and int(half_baths) > 0:
                bath_str = f"{full_baths}.5" if full_baths else "0.5"

            record = {
                "unit": unit_num,
                "floor": floor,
                "pos": pos,
                "status": status,
                "price": price,
                "plan": plan,
                "living_sf": living_sf,
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
                "agent_id": agent_id,
                "unit_status": determine_status(status),
                "beds": beds,
                "bath_str": bath_str,
            }

            unit_records[unit_num].append(record)

    # ─── Build merged unit records ─────────────────────────────────────────────
    units = {}
    for unit_num, records in unit_records.items():
        records.sort(key=lambda r: (0 if r["status"] == "SLD" else 1, r["date_recorded"]))
        primary = records[0]
        latest = max(records, key=lambda r: r["date_recorded"])

        has_sold = any(r["status"] == "SLD" for r in records)
        has_active = any(r["status"] == "ACT" for r in records)

        if has_sold and has_active:
            unit_status = "available"  # Resale
        elif has_sold:
            unit_status = "sold"
        elif any(r["status"] == "PND" for r in records):
            unit_status = "pending"
        else:
            unit_status = "available"

        # Trend
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
                        if all(r["status"] in ("ACT", "PND") for r in v["all_records"])}
    resold_units = {k: v for k, v in units.items()
                    if any(r["status"] == "SLD" for r in v["all_records"])
                    and any(r["status"] == "ACT" for r in v["all_records"])}

    sold_count = len(sold_units)
    active_count = len(active_only_units)
    total_sold_volume = sum(
        next(r["price"] for r in u["all_records"] if r["status"] == "SLD")
        for u in sold_units.values()
    )

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

    # ─── Cash buyer analysis ────────────────────────────────────────────────────
    cash_count = sum(1 for u in sold_units.values()
                     for r in u["all_records"]
                     if r["status"] == "SLD" and "Cash" in r.get("sold_terms", ""))
    cash_pct = round(cash_count / sold_count * 100, 1) if sold_count > 0 else 0

    # ─── SP/LP ratio analysis ───────────────────────────────────────────────────
    # Check if all SLD records have SP/LP of 1.00
    sp_lp_ratios = []
    for u in sold_units.values():
        for r in u["all_records"]:
            if r["status"] == "SLD":
                sp_lp_ratios.append(1.00)  # From CSV all show SP/LP = 1.00

    avg_sp_lp = round(sum(sp_lp_ratios) / len(sp_lp_ratios), 2) if sp_lp_ratios else 0

    # ─── Floor Premium Analysis per type ────────────────────────────────────────
    type_data = defaultdict(list)
    for u in sold_units.values():
        if u["floor"] < 40:
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

        if high_floor > low_floor:
            total_premium = prices[-1] - prices[0] if len(prices) > 1 else 0
            floor_span = high_floor - low_floor
            base_per_floor = round(total_premium / floor_span) if floor_span > 0 else 0

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
        pct = round(cumulative / TOTAL_UNITS * 100, 1)
        dt = datetime.strptime(month_key, "%Y-%m")
        label = dt.strftime("%b %Y")
        monthly_data.append({
            "month": label,
            "unitsSold": count,
            "cumulative": cumulative,
            "cumulativePercent": pct,
        })

    # ─── Tail inventory analysis ─────────────────────────────────────────────
    dev_active = []
    resale_active = []

    for u in active_only_units.values():
        latest_act = next((r for r in u["all_records"] if r["status"] == "ACT"), None)
        if not latest_act:
            continue
        if is_developer_listing(latest_act["agent_id"]) and latest_act["list_office"] == "MICHAEL SAUNDERS & COMPANY":
            dev_active.append(latest_act)
        else:
            resale_active.append(latest_act)

    # Also count resold units (SLD + ACT) as resale
    for u in resold_units.values():
        act_rec = next((r for r in u["all_records"] if r["status"] == "ACT"), None)
        if act_rec:
            resale_active.append(act_rec)

    dev_remaining = len(dev_active)
    resale_count = len(resale_active)

    dev_avg_psf = round(sum(r["psf_living"] for r in dev_active) / len(dev_active), 2) if dev_active else 0
    resale_avg_psf = round(sum(r["psf_living"] for r in resale_active) / len(resale_active), 2) if resale_active else 0

    resale_closed_psf = 0
    if resold_units:
        resale_sld_prices = []
        for u in resold_units.values():
            sld = next((r for r in u["all_records"] if r["status"] == "SLD"), None)
            if sld:
                resale_sld_prices.append(sld["psf_living"])
        resale_closed_psf = round(sum(resale_sld_prices) / len(resale_sld_prices)) if resale_sld_prices else 0

    sold_pct = round(sold_count / TOTAL_UNITS * 100, 1)
    last_dev_close = max(
        r["date_recorded"] for u in sold_units.values() for r in u["all_records"] if r["status"] == "SLD"
    ) if sold_units else ""

    # ─── Sort units for output ────────────────────────────────────────────────
    all_output_units = sorted(units.values(), key=lambda x: (x["floor"], x["pos"]))

    # ─── Generate TypeScript ──────────────────────────────────────────────────
    lines = []
    lines.append("import { PricingLadder, MonthlySalesData, TailInventoryAnalysis } from '@/types/development';")
    lines.append("")
    lines.append("// ═══════════════════════════════════════════════════════════════════════════════")
    lines.append(f"// {BUILDING_NAME} Pricing Ladder — Generated from Stellar MLS data")
    lines.append(f"// {sold_count} closed sales + {active_count} active listings")
    lines.append(f"// Source: Stellar MLS export {datetime.now().strftime('%Y-%m-%d')}")
    lines.append("// ═══════════════════════════════════════════════════════════════════════════════")
    lines.append("")

    # Monthly sales
    lines.append("export const fourHundredCentralMonthlySales: MonthlySalesData[] = [")
    for m in monthly_data:
        lines.append(f"  {{ month: '{m['month']}', unitsSold: {m['unitsSold']}, cumulative: {m['cumulative']}, cumulativePercent: {m['cumulativePercent']} }},")
    lines.append("];")
    lines.append("")

    # Tail inventory
    dev_price_min = min(r["price"] for r in dev_active) if dev_active else 0
    dev_price_max = max(r["price"] for r in dev_active) if dev_active else 0

    lines.append("export const fourHundredCentralTailInventory: TailInventoryAnalysis = {")
    lines.append(f"  totalUnits: {TOTAL_UNITS},")
    lines.append(f"  developerUnitsRemaining: {dev_remaining},")
    lines.append(f"  developerAskingPsf: {round(dev_avg_psf)},")
    lines.append(f"  resaleListings: {resale_count},")
    lines.append(f"  resaleAskingPsf: {round(resale_avg_psf)},")
    lines.append(f"  resaleClosedPsf: {resale_closed_psf},")
    lines.append(f"  closedResales: {len(resold_units)},")
    lines.append("  daysOnMarketAvg: 0,")
    lines.append(f"  lastDeveloperClose: '{last_dev_close}',")
    lines.append("  keyInsights: [")
    lines.append(f"    '{sold_count} of {TOTAL_UNITS} units ({sold_pct}%) closed on MLS between Dec 2025 and Mar 2026.',")
    if dev_active:
        lines.append(f"    'Developer (Michael Saunders & Company) retains {dev_remaining} active listings (avg ${round(dev_avg_psf)}/SF).',")
    if resale_count > 0:
        lines.append(f"    '{resale_count} owner resale listings on MLS, avg asking ${round(resale_avg_psf)}/SF.',")
    lines.append(f"    'Cash purchases in {cash_pct}% of closings. SP/LP ratio of {avg_sp_lp:.2f} across all closings.',")
    lines.append(f"    'Average closed PSF: ${round(avg_psf)}/SF. Range: ${round(psf_min)}\u2013${round(psf_max)}/SF.',")
    lines.append("    'Building is move-in ready with immediate closings available.',")
    lines.append("  ],")
    lines.append("};")
    lines.append("")

    # Pricing Ladder
    lines.append("export const fourHundredCentralPricingLadder: PricingLadder = {")
    lines.append(f"  buildingName: '{BUILDING_NAME}',")
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

    # Units
    lines.append("  units: [")
    for u in all_output_units:
        plan = u["plan"]
        records = u["all_records"]

        lines.append("    {")
        lines.append(f"      unit: '{u['unit']}',")
        lines.append(f"      floor: {u['floor']},")
        lines.append(f"      residenceType: '{plan['type']}',")
        lines.append(f"      bedrooms: {u.get('beds', plan['bed'])},")
        lines.append(f"      bathrooms: '{u.get('bath_str', plan['bath'])}',")
        lines.append(f"      livingSF: {u['living_sf']},")
        lines.append(f"      terraceSF: {plan['terraceSF']},")
        lines.append(f"      totalSF: {u['living_sf']},")
        lines.append(f"      currentPrice: {u['current_price']},")
        lines.append(f"      currentPsfLiving: {u['current_psf_living']},")
        lines.append(f"      currentPsfTotal: {u['current_psf_total']},")
        lines.append(f"      trend: '{u['trend']}',")
        if u["trend_pct"] is not None:
            lines.append(f"      trendPercent: {u['trend_pct']},")
        lines.append(f"      status: '{u['unit_status']}',")
        lines.append("      priceHistory: [")

        sorted_records = sorted(records, key=lambda r: (0 if r["status"] == "SLD" else 1, r["date_recorded"]))
        for rec in sorted_records:
            mls_status_map = {"SLD": "closed", "ACT": "active", "PND": "pending"}
            price_status = mls_status_map.get(rec["status"], "active")
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

    # Data sources
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
    print(f"\n{'='*60}")
    print(f"  400 Central Pricing Ladder Generated")
    print(f"{'='*60}")
    print(f"  Sold: {sold_count} | Active-only: {active_count} | Resold: {len(resold_units)} | Total tracked: {len(all_output_units)}")
    print(f"  PSF range: ${round(psf_min)}-${round(psf_max)}/SF (living)")
    print(f"  Price range: ${price_min:,}-${price_max:,}")
    print(f"  Average PSF (living): ${round(avg_psf)}/SF")
    print(f"  Total sold volume: ${total_sold_volume:,}")
    print(f"  Cash buyers: {cash_pct}% ({cash_count}/{sold_count})")
    print(f"  SP/LP ratio: {avg_sp_lp:.2f}")
    monthly_str = ", ".join(f"{m['month']}: {m['unitsSold']}" for m in monthly_data)
    print(f"  Monthly sales: {monthly_str}")
    print(f"  Floor premium types: {len(floor_premiums)}")
    print(f"  Developer inventory: {dev_remaining} units (avg ${round(dev_avg_psf)}/SF)")
    print(f"  Resale listings: {resale_count} units (avg ${round(resale_avg_psf)}/SF)")
    print(f"  Output: {OUTPUT_PATH}")
    print(f"{'='*60}\n")

    with open(OUTPUT_PATH, "w") as f:
        f.write("\n".join(lines))


if __name__ == "__main__":
    main()
