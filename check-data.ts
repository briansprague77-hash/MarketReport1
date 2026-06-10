import { trackedDevelopments } from './src/data/developments/index';

console.log(`Total trackedDevelopments: ${trackedDevelopments.length}`);
trackedDevelopments.forEach((d, i) => {
  console.log(`  ${i + 1}. ${d.slug} — ${d.name} (${d.county}, ${d.statusLabel}, hasPage=${d.hasPage})`);
});
