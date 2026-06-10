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

interface VisionariesProps {
  development: Development;
}

export default function Visionaries({ development }: VisionariesProps) {
  const { visionaries } = development;

  if (!visionaries || visionaries.length === 0) return null;

  return (
    <section id="visionaries" className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="The Vision"
            title="World-Class Team"
            subtitle="The developer, architectural, and interior design principals behind this landmark project."
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {visionaries.map((group, i) => (
            <motion.div key={i} className="space-y-4" variants={staggerItem}>
              <div className="text-xs font-body font-semibold uppercase tracking-widest text-gold-500 mb-4">
                {group.role}
              </div>
              {group.companies.map((company, j) => (
                <motion.div
                  key={j}
                  className="bg-white border border-ivory-300 rounded-sm p-6 hover:shadow-md hover:border-gold-500/20 transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-sm bg-charcoal-800 flex items-center justify-center mb-4">
                    <span className="text-gold-500 text-lg font-heading font-bold">
                      {company.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-charcoal-900 mb-2">
                    {company.name}
                  </h3>
                  <p className="text-sm font-body text-charcoal-500 leading-relaxed">
                    {company.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
