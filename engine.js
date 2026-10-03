(function (root) {
  // arpa: monthly revenue per account; gm, churn in percent; cac currency per new account
  function unit(arpa, gm, churn, cac) {
    if (!(arpa > 0) || !(gm > 0 && gm <= 100) || !(churn > 0 && churn < 100) || !(cac > 0)) return null;
    var c = churn / 100, margin = arpa * gm / 100;
    var ltv = margin / c, ratio = ltv / cac, payback = cac / margin;
    var cacFor3 = ltv / 3;
    var churnFor3 = margin / (3 * cac) * 100;
    return {
      margin: margin, lifetime: 1 / c, ltv: ltv, ratio: ratio, payback: payback,
      annualChurn: (1 - Math.pow(1 - c, 12)) * 100,
      cacFor3: cacFor3, churnFor3: churnFor3,
      verdict: ratio < 1 ? 'loses' : ratio < 3 ? 'below' : ratio <= 5 ? 'healthy' : 'high',
      paybackOk: payback <= 12
    };
  }
  // cash, monthly revenue, monthly costs; growth: monthly revenue growth in percent (0 = flat)
  function runway(cash, revenue, costs, growth) {
    if (!(cash >= 0) || !(revenue >= 0) || !(costs >= 0)) return null;
    growth = growth || 0;
    var burn = costs - revenue;
    var r = { burn: burn, months: null, profitable: burn <= 0 };
    if (burn <= 0) return r;
    if (!(growth > -100 && growth < 100)) return null;
    if (growth === 0) { r.months = cash / burn; return r; }
    var g = growth / 100, c = cash, rev = revenue, m = 0;
    while (m < 600) { var b = costs - rev; if (b <= 0) { r.profitableAt = m; r.months = null; r.reachesProfit = true; return r; } if (c < b) { r.months = m + c / b; return r; } c -= b; rev *= 1 + g; m++; }
    r.months = null; r.reachesProfit = false; r.over = true; return r;
  }
  var api = { unit: unit, runway: runway };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.SaasMath = api;
})(typeof window !== 'undefined' ? window : this);
