export const PHONE = '+15165905353';
export const vehicles = [
 { id: 'sedan', name: 'Coupe / Sedan', note: 'Standard', multiplier: 1 },
 { id: 'suv', name: 'SUV / Crossover', note: '+15%', multiplier: 1.15 },
 { id: 'truck', name: 'Full-Size Truck / Large SUV', note: '+25%', multiplier: 1.25 },
 { id: 'exotic', name: 'Exotic / Performance', note: '+25%', multiplier: 1.25 },
];
export const packages = [
 { id: 'ceramic', name: '2-Stage Paint Correction + 5-Yr Ceramic', price: 1290, days: '2–3 Days', tag: 'Most Popular', description: 'Depth, clarity, and a finish that stays protected. Two-stage correction sealed with a five-year ceramic coating.' },
 { id: 'front-ppf', name: 'Full-Front Self-Healing PPF + Ceramic', price: 2150, days: '3–4 Days', tag: '', description: 'Invisible protection where it matters most. Full hood, fenders, bumper, and mirrors, finished with ceramic.' },
 { id: 'wrap', name: 'Full Color-Change Vinyl Wrap', price: 3400, days: '4–5 Days', tag: '', description: 'A completely new personality. Precision-installed premium vinyl in your choice of color and finish.' },
 { id: 'body-ppf', name: 'Full-Body Gloss or Stealth PPF', price: 5200, days: '5–7 Days', tag: '', description: 'Comprehensive self-healing protection. Preserve the original gloss or transform it with a stealth finish.' },
];
export const addons = [
 { id:'calipers', name:'Custom Brake Caliper Painting', price:550 },
 { id:'chrome', name:'Chrome Delete / Gloss Roof Wrap', price:450 },
 { id:'tint', name:'Ceramic Window Tinting', price:350 },
 { id:'wheels', name:'Wheel Powder Coating', price:650 },
];
export function calculateEstimate(vehicleId:string, packageId:string, addonIds:string[]) {
 const vehicle = vehicles.find(v=>v.id===vehicleId) ?? vehicles[0];
 const pkg = packages.find(p=>p.id===packageId) ?? packages[0];
 if (!vehicle || !pkg) throw new Error('Missing estimate configuration');
 const selectedAddons = addons.filter(a=>addonIds.includes(a.id));
 const base = pkg.price * vehicle.multiplier + selectedAddons.reduce((sum,a)=>sum+a.price,0);
 return { vehicle, pkg, selectedAddons, low:Math.round(base/10)*10, high:Math.round(base*1.15/10)*10 };
}
export const money = (n:number) => '$'+n.toLocaleString('en-US');
export function estimateText(e:ReturnType<typeof calculateEstimate>) {
 return `Hi KDA! I'd like an estimate for ${e.vehicle.name}: ${e.pkg.name}${e.selectedAddons.length ? '. Add-ons: '+e.selectedAddons.map(a=>a.name).join(', ') : ''}. Estimated range: ${money(e.low)} – ${money(e.high)} USD. Turnaround: ${e.pkg.days}.`;
}
export const smsLink = (body = '') => `sms:${PHONE}${body ? '?body='+encodeURIComponent(body) : ''}`;
export type ContactSearch = { vehicle?:string; package?:string; addons?:string; low?:number; high?:number };
export function validateContactSearch(search: Record<string,unknown>):ContactSearch {
 const result:ContactSearch = {};
 for (const key of ['vehicle','package','addons'] as const) if(typeof search[key]==='string') result[key]=search[key];
 for (const key of ['low','high'] as const) { const n=Number(search[key]); if(Number.isFinite(n)&&n>0) result[key]=n; }
 return result;
}
export function pageHead(title:string,description:string) {
 return { meta:[{ title:`${title} | KDA Treatment Inc. (Concept Preview)` },{name:'description',content:description},{property:'og:title',content:`${title} | KDA Treatment Inc. (Concept Preview)`},{property:'og:description',content:description},{property:'og:image',content:'/images/studio-hero.png'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] };
}
