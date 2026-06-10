'use client';

import Image from 'next/image';
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
  ChefHat,
  Bath,
  Wifi,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface ResidenceFeaturesProps {
  development: Development;
}

const baseCategoryConfig: Record<
  string,
  { label: string; icon: React.ElementType; accent: string }
> = {
  kitchen: {
    label: "Chef's Kitchen",
    icon: ChefHat,
    accent: 'border-gold-500/30 bg-gold-500/5',
  },
  bathroom: {
    label: 'Spa Bathrooms',
    icon: Bath,
    accent: 'border-blue-400/30 bg-blue-500/5',
  },
  smartHome: {
    label: 'Smart Home',
    icon: Wifi,
    accent: 'border-emerald-500/30 bg-emerald-500/5',
  },
  general: {
    label: 'Residence Finishes',
    icon: Home,
    accent: 'border-charcoal-600/40 bg-charcoal-800/30',
  },
};

// Waldorf-specific images — only shown on waldorf-astoria detail page
const waldorfImages: Record<string, { src: string; alt: string }> = {
  kitchen: {
    src: '/images/developments/waldorf-astoria/renderings/wa-kitchen.jpg',
    alt: 'Waldorf Astoria chef\'s kitchen with premium Gaggenau appliances',
  },
  bathroom: {
    src: '/images/developments/waldorf-astoria/renderings/wa-primary-bathroom.jpg',
    alt: 'Waldorf Astoria primary bathroom with marble finishes',
  },
  general: {
    src: '/images/developments/waldorf-astoria/renderings/wa-primary-closet.jpg',
    alt: 'Waldorf Astoria walk-in closet with custom millwork',
  },
};

function getCategoryConfig(slug: string) {
  const config: Record<string, { label: string; icon: React.ElementType; accent: string; image?: { src: string; alt: string } }> = {};
  for (const [key, val] of Object.entries(baseCategoryConfig)) {
    config[key] = {
      ...val,
      image: slug === 'waldorf-astoria' ? waldorfImages[key] : undefined,
    };
  }
  return config;
}

export default function ResidenceFeatures({ development }: ResidenceFeaturesProps) {
  const { residenceFeatures } = development;

  if (!residenceFeatures) return null;

  const categoryConfig = getCategoryConfig(development.slug);
  const categories = Object.entries(residenceFeatures) as [
    keyof typeof categoryConfig,
    string[],
  ][];

  return (
    <section id="features" className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow={development.slug === 'waldorf-astoria' ? 'Interior Design by BAMO' : 'Interior Finishes'}
            title="Residence Features"
            subtitle={development.slug === 'waldorf-astoria'
              ? 'Fully finished residences with curated fixtures, premium appliances, and smart home integration — designed by world-renowned BAMO.'
              : 'Premium finishes, modern appliances, and thoughtful design throughout every residence.'}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {categories.map(([key, features]) => {
            const config = categoryConfig[key];
            if (!config) return null;
            const Icon = config.icon;
            const img = config.image;

            return (
              <motion.div
                key={key}
                variants={staggerItem}
                className={`rounded-2xl border ${config.accent} overflow-hidden`}
              >
                {/* Feature image */}
                {img && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-charcoal-100 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-charcoal-700" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-charcoal-900">
                      {config.label}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-gold-600 mt-0.5 flex-shrink-0" />
                        <span className="text-charcoal-700 font-body text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
