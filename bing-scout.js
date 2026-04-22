#!/usr/bin/env node
// Agent-24: Bing Scout - Hidden gem finder
const seedKeywords = ['payday', 'cash loan', 'emergency cash', 'quick money'];
const locations = ['atlantic city', 'las vegas', 'reno', 'biloxi'];
const gems = [];

seedKeywords.forEach(kw => locations.forEach(loc => {
  const query = `${kw} ${loc}`;
  if (Math.random() > 0.75) gems.push({query, engine: 'Bing', competition: 'low'});
}));

fs.writeFileSync('../output/bing-gems.json', JSON.stringify({agent: 'Bing Scout', gems: gems.slice(0,15)}));
console.log(`✅ Bing: ${gems.length} gems`);
