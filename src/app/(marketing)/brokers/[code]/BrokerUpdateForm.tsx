'use client';

import { useEffect } from 'react';
import SubmitCorrectionForm from '@/components/sections/shared/SubmitCorrectionForm';

const TIER_KEY = 'tbmr-audience-tier';
const BROKER_IDENTITY_KEY = 'tbmr-broker-identity';

interface Props {
  code: string;
  brokerName: string;
  firm: string;
  developmentSlug: string;
  developmentName: string;
}

/**
 * Broker-portal form — delegates rendering to the shared
 * SubmitCorrectionForm with the broker identity prefilled, and handles
 * the one thing the shared form doesn't: unlocking the sales-agent
 * audience tier in localStorage as a side effect of visiting this page.
 */
export default function BrokerUpdateForm({
  code,
  brokerName,
  firm,
  developmentSlug,
  developmentName,
}: Props) {
  useEffect(() => {
    try {
      localStorage.setItem(TIER_KEY, 'sales-agent');
      localStorage.setItem(
        BROKER_IDENTITY_KEY,
        JSON.stringify({ code, brokerName, firm, developmentSlug })
      );
    } catch {
      // localStorage unavailable (private mode) — tier unlock just won't persist.
    }
  }, [code, brokerName, firm, developmentSlug]);

  return (
    <SubmitCorrectionForm
      brokerCode={code}
      lockedDevelopmentSlug={developmentSlug}
      sourceContext={`broker-portal:${code}`}
      heading="Submit a Development Update"
      subheading={`Updates for ${developmentName} are emailed to Brian for review before appearing on the site.`}
      submitLabel="Submit for Review"
    />
  );
}
