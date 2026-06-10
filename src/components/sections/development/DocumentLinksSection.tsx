'use client';

import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeUp, defaultViewport } from '@/lib/animations';

interface DocumentLinksSectionProps {
  development: Development;
}

export default function DocumentLinksSection({ development }: DocumentLinksSectionProps) {
  const docs = development.documents;

  if (!docs) return null;

  const hasAny = docs.purchaseAgreementUrl || docs.condoDocsUrl || docs.driveFolderUrl;
  if (!hasAny) return null;

  return (
    <section id="documents" className="section-padding bg-ivory-100">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Documents"
            title="Purchase & Condo Documents"
            subtitle="Review the purchase agreement and condominium documents for this development."
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
        >
          {docs.purchaseAgreementUrl && (
            <a
              href={docs.purchaseAgreementUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-sm border border-ivory-300 bg-white hover:border-gold-500/40 hover:bg-ivory-50 transition-all group shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-charcoal-400 group-hover:text-gold-600 transition-colors flex-shrink-0"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <path d="M14 2v6h6" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
              <span className="font-body text-sm font-medium text-charcoal-700 group-hover:text-charcoal-900 transition-colors">
                Purchase Agreement
              </span>
            </a>
          )}

          {docs.condoDocsUrl && (
            <a
              href={docs.condoDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-sm border border-ivory-300 bg-white hover:border-gold-500/40 hover:bg-ivory-50 transition-all group shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-charcoal-400 group-hover:text-gold-600 transition-colors flex-shrink-0"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                <path d="M12 13V7" />
                <path d="m9 10 3-3 3 3" />
              </svg>
              <span className="font-body text-sm font-medium text-charcoal-700 group-hover:text-charcoal-900 transition-colors">
                Condo Documents
              </span>
            </a>
          )}

          {docs.driveFolderUrl && (
            <a
              href={docs.driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-sm border border-gold-500/30 bg-gold-50/50 hover:border-gold-500/50 hover:bg-gold-50 transition-all group shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold-600 group-hover:text-gold-700 transition-colors flex-shrink-0"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <polyline points="9 14 12 11 15 14" />
              </svg>
              <span className="font-body text-sm font-medium text-charcoal-700 group-hover:text-charcoal-900 transition-colors">
                All Developer Materials
              </span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
