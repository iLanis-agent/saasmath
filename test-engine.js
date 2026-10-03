var S = require('./engine.js'), fails = 0, n = 0;
function eq(a, b, m, t) { n++; t = t === undefined ? 1e-9 : t; if (!(Math.abs(a - b) <= t) && a !== b) { fails++; console.log('FAIL', m, a, b); } }
// subscriptionindex worked example: $50 ARPU, 4% monthly churn -> LTV $1,250 (100% margin)
var u = S.unit(50, 100, 4, 300); eq(u.ltv, 1250, 'ltv 1250'); eq(u.lifetime, 25, 'lifetime 25 months'); eq(u.ratio, 1250 / 300, 'ratio'); eq(u.payback, 6, 'payback 6'); eq(u.annualChurn, 38.729, 'annual churn', 0.001);
u = S.unit(100, 80, 2, 800); eq(u.margin, 80, 'margin'); eq(u.ltv, 4000, 'ltv'); eq(u.ratio, 5, 'ratio 5'); eq(u.verdict === 'healthy' ? 1 : 0, 1, 'healthy at 5'); eq(u.payback, 10, 'payback'); eq(u.paybackOk ? 1 : 0, 1, 'payback ok'); eq(u.cacFor3, 4000 / 3, 'cac for 3'); eq(u.churnFor3, 80 / (3 * 800) * 100, 'churn for 3');
u = S.unit(100, 80, 2, 800); var v = S.unit(100, 80, u.churnFor3, 800); eq(v.ratio, 3, 'churn for 3 gives 3', 1e-9);
v = S.unit(100, 80, 2, u.cacFor3); eq(v.ratio, 3, 'cac for 3 gives 3', 1e-9);
eq(S.unit(100, 80, 2, 2000).verdict === 'below' ? 1 : 0, 1, 'below'); eq(S.unit(100, 80, 2, 4001).verdict === 'loses' ? 1 : 0, 1, 'just under 1 loses');
eq(S.unit(20, 50, 10, 500).verdict === 'loses' ? 1 : 0, 1, 'loses'); eq(S.unit(20, 50, 10, 500).ratio, 0.2, 'ratio .2');
eq(S.unit(100, 80, 1, 200).verdict === 'high' ? 1 : 0, 1, 'high'); eq(S.unit(100, 80, 2, 800).ratio, 5, 'exact 5 healthy');
eq(S.unit(100, 80, 2, 100).paybackOk ? 1 : 0, 1, 'fast payback'); eq(S.unit(100, 50, 2, 1000).payback, 20, 'slow payback'); eq(S.unit(100, 50, 2, 1000).paybackOk ? 1 : 0, 0, 'not ok');
eq(S.unit(0, 80, 2, 800), null, 'arpa0'); eq(S.unit(100, 0, 2, 800), null, 'gm0'); eq(S.unit(100, 101, 2, 800), null, 'gm101'); eq(S.unit(100, 80, 0, 800), null, 'churn0'); eq(S.unit(100, 80, 100, 800), null, 'churn100'); eq(S.unit(100, 80, 2, 0), null, 'cac0');
eq(S.unit(100, 80, 1, 800).annualChurn, (1 - Math.pow(0.99, 12)) * 100, 'annual 1%', 1e-9);
// runway
var r = S.runway(300000, 20000, 50000, 0); eq(r.burn, 30000, 'burn'); eq(r.months, 10, 'runway 10');
r = S.runway(100000, 60000, 50000, 0); eq(r.profitable ? 1 : 0, 1, 'profitable'); eq(r.months, null, 'no runway needed');
r = S.runway(100000, 50000, 50000, 0); eq(r.profitable ? 1 : 0, 1, 'break-even');
r = S.runway(0, 0, 10000, 0); eq(r.months, 0, 'no cash');
r = S.runway(300000, 20000, 50000, 10); eq(r.reachesProfit ? 1 : 0, 1, 'growth reaches profit'); eq(r.profitableAt, 10, 'at month 10');
r = S.runway(60000, 20000, 50000, 10); eq(r.months > 2 && r.months < 3 ? 1 : 0, 1, 'growth but cash out'); eq(r.reachesProfit ? 1 : 0, 0, 'not profit');
r = S.runway(60000, 20000, 50000, 0); eq(r.months, 2, 'flat 2 months');
r = S.runway(100000, 10000, 40000, 5); var flat = S.runway(100000, 10000, 40000, 0); eq(r.months > flat.months ? 1 : 0, 1, 'growth extends');
eq(S.runway(-1, 1, 1), null, 'neg cash'); eq(S.runway(1, -1, 1), null, 'neg rev'); eq(S.runway(1000, 1, 100, 100), null, 'growth 100');
r = S.runway(1e9, 1, 100, 1); eq(r.months === null && r.reachesProfit === false ? 1 : 0, 0, 'big cash ok'); 
console.log(n - fails + '/' + n + ' pass'); process.exit(fails ? 1 : 0);
