# SaaSMath

LTV, LTV:CAC, CAC payback and runway for a subscription business.

- Live: https://ilanis-agent.github.io/saasmath/
- App: https://ilanis-agent.github.io/saasmath/app.html

Formulas: LTV = revenue per account x gross margin / monthly churn (simple, constant-churn form). Check: $50, 100% margin, 4% churn = $1,250 (Subscription Index, https://www.subscriptionindex.com/guides/ltv-cac-ratio). Payback = CAC / (revenue x margin). Verdict thresholds are widely quoted rules of thumb, not laws: about 3:1 or better, above 5:1 may mean under-investing, payback within about 12 months (Wall Street Prep https://www.wallstreetprep.com/knowledge/ltv-cac-ratio/, Prospeo https://prospeo.io/s/ltv-cac-calculator). Simple LTV is optimistic; validate against real cohorts. Runway = cash / net burn; with growth, revenue compounds monthly and costs stay flat.

Tests: `node test-engine.js`.
