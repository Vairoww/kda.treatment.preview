import { describe, it, expect } from 'vitest';
import { calculateEstimate, validateContactSearch, estimateText, smsLink } from '@/lib/kda';
describe('KDA estimate rules',()=>{
 it('starts paint correction and 5-year ceramic at $1,290 and 2–3 days',()=>{const e=calculateEstimate('sedan','ceramic',[]);expect(e.low).toBe(1290);expect(e.pkg.days).toBe('2–3 Days');});
 it('starts full-front PPF at $2,150 and 3–4 days',()=>{const e=calculateEstimate('sedan','front-ppf',[]);expect(e.low).toBe(2150);expect(e.pkg.days).toBe('3–4 Days');});
 it('starts vinyl wrap at $3,400 and 4–5 days',()=>{const e=calculateEstimate('sedan','wrap',[]);expect(e.low).toBe(3400);expect(e.pkg.days).toBe('4–5 Days');});
 it('starts full-body PPF at $5,200 and 5–7 days',()=>{const e=calculateEstimate('sedan','body-ppf',[]);expect(e.low).toBe(5200);expect(e.pkg.days).toBe('5–7 Days');});
 it('adds 15% to SUV core packages',()=>expect(calculateEstimate('suv','wrap',[]).low).toBe(3910));
 it('adds 25% to large truck core packages',()=>expect(calculateEstimate('truck','wrap',[]).low).toBe(4250));
 it('adds 25% to exotic core packages',()=>expect(calculateEstimate('exotic','wrap',[]).low).toBe(4250));
 it('adds $550 for calipers',()=>expect(calculateEstimate('sedan','ceramic',['calipers']).low).toBe(1840));
 it('adds $450 for chrome delete',()=>expect(calculateEstimate('sedan','ceramic',['chrome']).low).toBe(1740));
 it('adds $350 for tint',()=>expect(calculateEstimate('sedan','ceramic',['tint']).low).toBe(1640));
 it('adds $650 for wheels',()=>expect(calculateEstimate('sedan','ceramic',['wheels']).low).toBe(1940));
 it('uses the requested 15% upper range and nearest $10 rounding',()=>{const e=calculateEstimate('suv','front-ppf',['calipers']);expect(e.low).toBe(3020);expect(e.high).toBe(3480);});
 it('does not multiply fixed add-on prices or count duplicated add-ons twice',()=>expect(calculateEstimate('truck','wrap',['calipers','calipers']).low).toBe(4800));
 it('preserves booking selections and price range from URL inputs',()=>expect(validateContactSearch({vehicle:'suv',package:'front-ppf',addons:'calipers',low:'3020',high:'3480'})).toEqual({vehicle:'suv',package:'front-ppf',addons:'calipers',low:3020,high:3480}));
 it('uses only the required SMS number with encoded vehicle selections',()=>{const e=calculateEstimate('suv','front-ppf',['calipers']);const url=smsLink(estimateText(e));expect(url.startsWith('sms:+15165905353?body=')).toBe(true);expect(decodeURIComponent(url)).toContain('SUV / Crossover');expect(decodeURIComponent(url)).toContain('$3,020 – $3,480 USD');});
});
