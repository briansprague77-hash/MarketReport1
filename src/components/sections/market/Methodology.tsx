'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import { methodology, author } from '@/data/market';
import { Shield, BookOpen, UserCheck } from 'lucide-react';

const sourceIcons = [BookOpen, Shield, UserCheck];

export default function Methodology() {
  return (
    <section className="py-16 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Transparency
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50">
            Methodology & Sources
          </h2>
          <p className="mt-4 text-base font-body text-charcoal-400 max-w-3xl mx-auto leading-relaxed">
            {methodology.overview}
          </p>
        </motion.div>

        {/* Sources */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {methodology.sources.map((source, i) => {
            const Icon = sourceIcons[i] || BookOpen;
            return (
              <motion.div
                key={source.name}
                variants={staggerItem}
                className="rounded-xl border border-charcoal-800 bg-charcoal-900/80 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 mb-4">
                  <Icon className="h-5 w-5 text-gold-500" />
                </div>
                <h3 className="text-base font-heading font-bold text-ivory-50 mb-2">
                  {source.name}
                </h3>
                <p className="text-sm font-body text-charcoal-400 leading-relaxed">
                  {source.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Author */}
        <motion.div
          className="rounded-xl border border-charcoal-800 bg-charcoal-900/80 p-8 max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Compiled By
          </p>
          <h3 className="text-xl font-heading font-bold text-ivory-50">
            {author.name}
          </h3>
          <p className="text-sm font-body text-charcoal-400 mt-1">
            {author.title}
          </p>
          <p className="text-sm font-body text-charcoal-400 mt-4 leading-relaxed max-w-lg mx-auto">
            {author.bio}
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="mt-10 text-xs font-body text-charcoal-500 text-center max-w-3xl mx-auto leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          {methodology.disclaimer}
        </motion.p>
      </div>
    </section>
  );
}
