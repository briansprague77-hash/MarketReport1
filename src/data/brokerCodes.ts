// src/data/brokerCodes.ts
//
// Per-broker access codes for the gated /brokers/[code] portal.
//
// Each entry represents one sales exec, developer, or broker actively
// selling in the tracked pipeline. They share their code URL with Brian,
// who pastes it into the address bar to access:
//   - their development's live dashboard
//   - WhatsApp Business deep link to Brian with prefilled context
//   - "Submit Development Update" form that emails Brian for review
//
// Visiting a valid /brokers/[code] URL also unlocks the `sales-agent`
// audience tier in localStorage (see BrokerUpdateForm).
//
// Seed codes below are placeholders — Brian replaces with real codes
// before going live. The `developmentSlug` must match an existing slug
// in src/data/developments.

export interface BrokerAccess {
  code: string;
  name: string;
  firm: string;
  role: 'sales-exec' | 'developer' | 'broker';
  developmentSlug: string;
  email?: string;
  phone?: string;
}

export const brokerCodes: Record<string, BrokerAccess> = {
  // No codes seeded for production launch. Add real per-broker entries
  // here (Brian will provide via chat). Until then, every /brokers/[code]
  // URL 404s — which is the correct behavior for an empty registry.
  //
  // Example:
  // 'PMG001': {
  //   code: 'PMG001',
  //   name: 'Vonda Golub',
  //   firm: 'Smith & Associates',
  //   role: 'sales-exec',
  //   developmentSlug: 'waldorf-astoria',
  //   email: 'vonda@smithrealtor.com',
  // },
};

export function getBrokerByCode(code: string): BrokerAccess | null {
  return brokerCodes[code] ?? null;
}
