'use client';

import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';
import {
  Crown,
  Globe,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  UtensilsCrossed,
  Shirt,
  Home,
  ShoppingBag,
  CalendarHeart,
  Dog,
  Star,
  Gem,
  CheckCircle2,
  BellRing,
  Sunrise,
  Coffee,
  Dumbbell,
  ChefHat,
  Wine,
  Building2,
  MapPin,
  Clock,
} from 'lucide-react';

interface OwnerBenefitsProps {
  development: Development;
}

const brandedIcons: Record<string, React.ElementType> = {
  '24/7 Waldorf Concierge': Crown,
  '15-25% Resale Premium': TrendingUp,
  'Hilton Honors Diamond': Globe,
};

const serviceIcons: Record<string, React.ElementType> = {
  '24-hour concierge': Crown,
  'Full-time doorman': ShieldCheck,
  'Valet parking': Star,
  'Bellman services': Gem,
  'Emergency maintenance': ShieldCheck,
  'Package reception and storage': ShoppingBag,
  'Common area maintenance': Home,
  'Housekeeping services': Sparkles,
  'Dry cleaning and laundry': Shirt,
  'In-residence dining': UtensilsCrossed,
  'Personal shopping': ShoppingBag,
  'Event planning': CalendarHeart,
  'Pet care services': Dog,
};

export default function OwnerBenefits({ development }: OwnerBenefitsProps) {
  const { brandedValue, ownershipServices } = development;

  if (!brandedValue) return null;

  return (
    <section id="owner-benefits" className="section-padding bg-charcoal-950">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Branded Residence Value"
            title={brandedValue.title}
            subtitle={development.slug === 'waldorf-astoria'
              ? 'The tangible advantages your clients receive from owning in a Hilton-managed branded residence.'
              : 'The tangible advantages your clients receive from owning in this development.'}
            variant="dark"
          />
        </motion.div>

        {/* ─── Branded Value Propositions ──────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {brandedValue.propositions.map((prop) => {
            const Icon = brandedIcons[prop.title] || Sparkles;
            return (
              <motion.div
                key={prop.title}
                variants={staggerItem}
                className="relative rounded-2xl border border-gold-500/20 bg-charcoal-900/60 p-8 overflow-hidden group hover:border-gold-500/40 transition-colors"
              >
                {/* Decorative glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-colors" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-gold-500" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-ivory-50 mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-ivory-300 font-body leading-relaxed text-sm">
                    {prop.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── Ownership Services ─────────────────────────────────────── */}
        {ownershipServices && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Standard Services */}
              <div className="rounded-2xl border border-charcoal-700/60 bg-charcoal-900/40 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-ivory-50/10 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-ivory-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-ivory-50">
                      Standard Services
                    </h3>
                    <p className="text-xs font-body text-charcoal-400">
                      Included with ownership
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {ownershipServices.standard.map((service) => {
                    const Icon = serviceIcons[service] || CheckCircle2;
                    return (
                      <li key={service} className="flex items-start gap-3">
                        <Icon className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <span className="text-ivory-200 font-body text-sm">
                          {service}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* À La Carte */}
              <div className="rounded-2xl border border-charcoal-700/60 bg-charcoal-900/40 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-ivory-50">
                      À La Carte
                    </h3>
                    <p className="text-xs font-body text-charcoal-400">
                      White-glove add-ons
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {ownershipServices.alaCarte.map((service) => {
                    const Icon = serviceIcons[service] || CheckCircle2;
                    return (
                      <li key={service} className="flex items-start gap-3">
                        <Icon className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <span className="text-ivory-200 font-body text-sm">
                          {service}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Hilton Honors (Waldorf-only) */}
              {development.slug === 'waldorf-astoria' && (
              <div className="rounded-2xl border border-gold-500/30 bg-gold-500/5 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/15 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-ivory-50">
                      Hilton Honors Diamond
                    </h3>
                    <p className="text-xs font-body text-gold-400">
                      Automatic with ownership
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {ownershipServices.hiltonBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Star className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                      <span className="text-ivory-200 font-body text-sm">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── Living at the Waldorf — Daily Experience (Waldorf-only) ─ */}
        {development.slug === 'waldorf-astoria' && (<>
        <motion.div
          className="mt-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className="h-px w-8 bg-gold-500"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
              The Living Experience
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-3">
            A Day at the Waldorf
          </h3>
          <p className="text-base font-body text-ivory-400 leading-relaxed max-w-3xl mb-10">
            Branded residences differ from conventional condominiums in one fundamental way: the
            hotel operator manages the building as an extension of their global hospitality
            standard. Here is what that means in practice.
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {dayExperiences.map((exp) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={exp.title}
                  className="relative bg-charcoal-900/50 border border-charcoal-700/50 rounded-xl p-6 hover:border-gold-500/30 transition-colors group"
                  variants={staggerItem}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/15 transition-colors">
                      <Icon className="h-5 w-5 text-gold-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-charcoal-400 block">
                        {exp.time}
                      </span>
                      <h4 className="text-sm font-heading font-bold text-ivory-50">
                        {exp.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm font-body text-ivory-300 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ─── The Branded Difference — Hotel vs. Condo ─────────────── */}
        <motion.div
          className="mt-20 bg-charcoal-900/30 border border-charcoal-700 rounded-sm p-8 md:p-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="h-px w-8 bg-gold-500"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
              The Branded Difference
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-4">
            How Hotel Management Changes Ownership
          </h3>
          <p className="text-base font-body text-ivory-400 leading-relaxed max-w-3xl mb-10">
            Unlike a traditional condominium where an elected HOA board manages operations,
            Waldorf Astoria residences are operated by Hilton&rsquo;s dedicated hospitality
            team. This creates a fundamentally different ownership model.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {brandedDifferences.map((diff, i) => (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.5, delay: 0.15 * i }}
              >
                <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
                  {diff.title}
                </h4>
                <p className="text-sm font-body text-ivory-300 leading-relaxed">
                  {diff.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Global Portfolio Context ─────────────────────────────── */}
        <motion.div
          className="mt-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className="h-px w-8 bg-gold-500"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
              Global Brand
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-3">
            The Waldorf Astoria Residences Network
          </h3>
          <p className="text-base font-body text-ivory-400 leading-relaxed max-w-3xl mb-10">
            St. Petersburg joins a portfolio of 20+ Waldorf Astoria Residences worldwide.
            Owners belong to a global network spanning gateway cities and resort destinations.
          </p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {portfolioLocations.map((loc) => (
              <motion.div
                key={loc.city}
                className="bg-charcoal-900/40 border border-charcoal-700/40 rounded-lg px-5 py-4 hover:border-gold-500/20 transition-colors"
                variants={staggerItem}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                  <span className="text-sm font-body font-semibold text-ivory-100">
                    {loc.city}
                  </span>
                </div>
                <span className="text-xs font-body text-charcoal-400">
                  {loc.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        </>)}

        {/* ─── Interior Design (BAMO for Waldorf, generic for others) ─ */}
        {development.residenceFeatures && (
          <motion.div
            className="mt-20"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="h-px w-8 bg-gold-500"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={defaultViewport}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                Interior Standard
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-3">
              {development.slug === 'waldorf-astoria' ? 'Designed by BAMO' : 'Interior Finishes'}
            </h3>
            <p className="text-base font-body text-ivory-400 leading-relaxed max-w-3xl mb-10">
              {development.slug === 'waldorf-astoria'
                ? 'Every residence is delivered fully finished by BAMO, the internationally acclaimed design firm behind the Waldorf Astoria Beverly Hills, the Four Seasons Resort Maui, and private estates across six continents.'
                : 'Premium finishes and modern design throughout every residence.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {residenceCategories.map((cat) => {
                const features = development.residenceFeatures?.[cat.key as keyof typeof development.residenceFeatures];
                if (!features || features.length === 0) return null;
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.key}
                    className="bg-charcoal-900/50 border border-charcoal-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center">
                        <Icon className="h-4.5 w-4.5 text-gold-500" />
                      </div>
                      <h4 className="text-sm font-heading font-bold text-ivory-50 uppercase tracking-wide">
                        {cat.label}
                      </h4>
                    </div>
                    <ul className="space-y-2.5">
                      {features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold-500/70 mt-0.5 flex-shrink-0" />
                          <span className="text-xs font-body text-ivory-300 leading-relaxed">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─── Static Data ──────────────────────────────────────────────────────────── */

const dayExperiences: {
  time: string;
  title: string;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    time: 'Morning',
    title: 'Arrive to a Managed Lobby',
    icon: Sunrise,
    description:
      'Full-time doorman and bellman greet residents by name. Valet retrieves your car before you reach the porte-cochère. Packages are already sorted and held at the front desk.',
  },
  {
    time: 'Mid-Morning',
    title: 'Wellness Center & Pool Deck',
    icon: Dumbbell,
    description:
      'A Level 18 wellness center with private massage rooms, his/her sauna, steam rooms, and a state-of-the-art fitness studio. 20,000 SF resort-style pool deck with dual infinity-edge pools and cabanas.',
  },
  {
    time: 'Afternoon',
    title: 'Concierge-Managed Living',
    icon: Crown,
    description:
      'Your concierge arranges dinner reservations, coordinates housekeeping schedules, accepts deliveries, and handles maintenance requests — the same service model as a Waldorf Astoria hotel, applied to your home.',
  },
  {
    time: 'Evening',
    title: 'Peacock Alley Sky Lounge',
    icon: Wine,
    description:
      'Level 47 rooftop sunset bar inspired by the original Waldorf Astoria\'s legendary gathering space. Private resident events, curated wine programs, and panoramic Gulf views from 500+ feet.',
  },
  {
    time: 'Any Time',
    title: 'In-Residence Dining & Services',
    icon: ChefHat,
    description:
      'À la carte in-residence dining, dry cleaning pickup, personal shopping, event planning, and pet care — available on demand through the concierge desk, billed separately from HOA.',
  },
  {
    time: 'Ground Floor',
    title: 'Michelin Dining',
    icon: UtensilsCrossed,
    description:
      'A 10,000 SF signature restaurant at street level, accessible to both residents and the public. Walking-distance dining without leaving your building — a hallmark of the branded residence model.',
  },
];

const brandedDifferences: { title: string; description: string }[] = [
  {
    title: 'Professional Operations, Not a Volunteer Board',
    description:
      'Hilton deploys a dedicated hospitality team — general manager, concierge staff, engineering, and housekeeping — trained to their global brand standard. No elected HOA board managing day-to-day operations. Predictable expense ratios backed by institutional oversight.',
  },
  {
    title: 'Consistent Service Quality',
    description:
      'The same guest-service training protocols used across 8,300+ Hilton properties apply to your home. Staff turnover, training standards, and service benchmarks are managed by Hilton corporate — not left to individual board decisions.',
  },
  {
    title: 'Brand-Protected Asset Value',
    description:
      'Waldorf Astoria enforces design guidelines, common-area maintenance standards, and operational benchmarks that protect the brand identity over time. This institutional stewardship is what generates the 15-25% resale premium documented across branded residence portfolios globally.',
  },
  {
    title: 'Global Mobility for Owners',
    description:
      'Automatic Hilton Honors Diamond status connects owners to the worldwide Hilton ecosystem — preferred rates, room upgrades, executive lounge access, and late checkout at any of the 8,300+ properties. Ownership here travels with you.',
  },
];

const portfolioLocations: { city: string; status: string }[] = [
  { city: 'New York City', status: 'Existing' },
  { city: 'Atlanta Buckhead', status: 'Existing' },
  { city: 'Park City', status: 'Existing' },
  { city: 'Las Vegas', status: 'Existing' },
  { city: 'Chicago', status: 'Existing' },
  { city: 'Miami', status: 'In Development' },
  { city: 'St. Petersburg', status: 'Pre-Construction' },
  { city: 'Pompano Beach', status: 'In Development' },
  { city: 'Denver', status: 'In Development' },
  { city: 'Sarasota', status: 'In Development' },
  { city: 'Lake Tahoe', status: 'In Development' },
  { city: 'Dubai', status: 'International' },
  { city: 'Costa Rica', status: 'International' },
  { city: 'Los Cabos', status: 'International' },
  { city: 'Maldives', status: 'International' },
  { city: 'Tangier', status: 'International' },
];

const residenceCategories: {
  key: string;
  label: string;
  icon: React.ElementType;
}[] = [
  { key: 'general', label: 'Living Spaces', icon: Home },
  { key: 'kitchen', label: 'Chef\'s Kitchen', icon: ChefHat },
  { key: 'bathroom', label: 'Spa Baths', icon: Sparkles },
  { key: 'smartHome', label: 'Smart Home', icon: Building2 },
];
