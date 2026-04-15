# Industry Standard — Change Log

All changes to the Menu Analysis dashboard are logged here in reverse-chronological order.
This file is updated alongside every commit so nothing is lost between sessions.

---

## [2026-04-15] — COGS Findings & Milk Stipend Fix

**Executive Dashboard — Findings Section**
- Added new "COGS Findings" tab (orange badge · 4 items) to CEO Executive view
- Finding 1: Week of Jan 19 — Weather Prep Double-Order (explained, medium severity, data flagged as low-reliability for trend analysis)
- Finding 2: $8,908 in unlabeled population COGS credits (Feb 16: $6,708 · Feb 23: $2,200) — requires Finance verification
- Finding 3: Bessemer Café COGS 54-point swing (35.3% → 89.9%) on fixed $3,182/week revenue — ordering inconsistency
- Finding 4: Net margin declining since Feb 16 peak ($30,113 → $18,703 low on Mar 30) — 5 of last 6 weeks below average

**Milk Scorecard Fix**
- Milk line status changed from "Poor" → "Watch"
- Note updated: "65% apparent COGS · backend stipend exists · true net margin not yet quantified"
- Detail updated: stipend not visible in WEEKLY tab — recommend verifying in Cash Flow before any renegotiation
- Milk action item reframed: "Document Milk Backend Stipend" — pull from Cash Flow, document as formal credit line

---

## [2026-04-14] — Lunch Protein Reference Page

**New: `menu-analysis/lunch-proteins.html`**
- Standalone print-ready reference for population lunch proteins across the full 4-week rotation
- Screen view: dark print bar with "← Dashboard" and "Print / Save PDF" controls
- Summary bar: Sausage Hot Link $0.26/serving · Bologna $0.20/serving · Burger Patty $0.45/serving · $0.65 avg lunch
- Vendor legend: 4 entries with case specs and per-serving cost calculations
- 28-day rotation table: Day / Meal Name / Protein / Pack Spec / $/Serving / Vendor / Total Meal Cost
- Options grid: 8 cards covering all current proteins + alternatives with vendor badges and status flags
- Full `@media print` CSS — clean Letter portrait output

---

## [2026-04-13] — CEO Executive Dashboard Tab

**New tab: Executive View**
- Hero card: Annualized Revenue ($4.55M), Annualized Net ($1.2M), Café Food Cost (72.6%), Identified Savings ($247K+)
- Profitability Scorecard: 5 revenue lines (Population, Café, Soft Trays, Milk, Academy/JBS) with actual COGS vs target bar charts
- Action Plan: 6 prioritized items (PFG→Shaver transition, Produce contract, Protein swap, Rate review, Bessemer standardization, Milk stipend)
- Net Margin Trend: SVG sparkline + 14-week table with best/worst week callouts
- Financial data sourced from `Weekly - 2026 (1).xlsx` — 14 weeks Jan 5 – Apr 12, 2026
- Average weekly net: $23,131 · Average net margin: 26.0%

---

## [2026-04-13] — Café Analysis Tab

**New tab: Café Analysis**
- Overview: 14-week food cost trend (Birmingham avg 80.8% COGS · Bessemer avg 59.1% COGS · target 30%)
- Food Cost Trend: week-by-week chart for both locations
- Cost Reduction: 6 ranked opportunities — combined annual savings $65K–$83K
  1. Produce contract for daily breakfast fruit — $35K–$47K/yr
  2. Protein swap (chicken tenders → Shaver patty) + salad bar restriction — $24K–$36K/yr
  3. Café meal rate renegotiation ($3.03/meal at 72.6% food cost = $0.83 gross before labor)
  4. Bessemer ordering standardization — $8K–$15K/yr
  5. Breakfast pastry contract — $4K–$7K/yr
  6. Milk stipend documentation (see above)
- Ingredient Costs: 31 items with PFG vs Shaver comparison and status flags
- 4-Week Menu: full café rotation for Birmingham and Bessemer

---

## [2026-04-12] — PFG → Shaver Comparison Updates

- Added okra to `switchToShaver` array: Okra Cut Breaded Frozen · PFG $1.725/lb vs Shaver $1.338/lb · saves $0.39/lb
- Updated count badge from 22 → 23 items
- Price references with source citations added for all protein vendors

---

## [2026-04-11] — PDF Export & Menu Enhancements

- PDF export button added to population menu report
- Dynamic inmate count field
- Protein comparison table added to population analysis
- Big Daddy invoice data integrated (TVP burger patty pricing)
- Burger patty rotation logic added
- Fixed horizontal scroll on menu grid

---

## [2026-04-10] — Initial Dashboard Launch

- Base dashboard deployed to Render at https://menu-analysis.onrender.com
- Population menu analysis (4-week rotation, 28 days)
- Vendor comparison: PFG vs Shaver pricing across all population items
- Weekly financial report tab
- Print layout for population menus
- Sidebar navigation with tab persistence

---

## Key Vendor Contacts & Pricing Reference

| Vendor | Type | Notes |
|--------|------|-------|
| Shaver Foods (ISP) | Proteins, dry goods, frozen | Primary target for PFG switchovers |
| PFG (Performance Food Group) | Current primary vendor | 23+ items identified for Shaver switch |
| Big Daddy | Burger patties (TVP-20-3.2) | 100ct · $45.00/cs · $0.45/patty |

## Financial Benchmarks (as of Apr 12, 2026)

| Metric | Value |
|--------|-------|
| Weekly Revenue Avg | $87,500 |
| Weekly Net Avg | $23,131 |
| Net Margin Avg | 26.0% |
| Birmingham Café COGS Avg | 80.8% |
| Bessemer Café COGS Avg | 59.1% |
| Milk COGS (contract) | 65.0% (backend stipend not yet quantified) |
| Population COGS Avg | ~32–38% (Birmingham) |
| Identified Annual Savings | $247,000+ |
