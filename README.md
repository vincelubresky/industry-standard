# Industry Standard Food Service — Menu Analysis Dashboard

A live operations dashboard for Industry Standard Food Service, Jefferson County contract.
Built for internal use by operations, procurement, and executive leadership.

## Live Sites

| Platform | URL |
|----------|-----|
| **Render (primary)** | https://menu-analysis.onrender.com |
| **GitHub Pages (mirror)** | https://vincelubresky.github.io/industry-standard/ |

Both URLs serve the same product. Render auto-deploys on every push to `main`. GitHub Pages deploys via GitHub Actions on every push to `main`.

---

## What's Inside

### Dashboard Tabs

| Tab | Description |
|-----|-------------|
| **Vendor Analysis** | PFG vs Shaver price comparison — 23+ items identified for cost reduction |
| **Menus** | 4-week population menu rotation, meal ideas, protein sourcing |
| **Weekly Report** | 14-week financial P&L — revenue, COGS, and net by location |
| **Executive View** | CEO dashboard — profitability scorecard, action plan, COGS findings |
| **Café Analysis** | Birmingham & Bessemer café food cost analysis and cost reduction roadmap |

### Standalone Print Pages

| Page | URL |
|------|-----|
| **Printable Population Menu** | `/population-menu.html` |
| **Lunch Protein Reference** | `/lunch-proteins.html` |

---

## Key Findings (as of April 2026)

- **$247,000+** in identified annual savings across all lines
- **23 items** confirmed cheaper at Shaver vs PFG — $13,752+/yr on population alone
- **Birmingham Café** averaging **42.6% food COGS** (vs Café + Academy + JBS revenue) · Bessemer at 59.1% — both above 30% target
- **Weekly net average**: $23,131 (26.0% margin) across 14 weeks
- **Milk**: 65% apparent COGS — backend stipend exists, true margin TBD

---

## File Structure

```
industry-standard/
├── menu-analysis/          # Full static site (served by Render + GitHub Pages)
│   ├── index.html          # Main dashboard
│   ├── population-menu.html  # Printable 4-week menu
│   ├── lunch-proteins.html   # Lunch protein reference
│   ├── css/styles.css      # All styles
│   └── js/
│       ├── app.js          # Rendering logic
│       └── data.js         # All data constants
├── render.yaml             # Render deployment config
├── CHANGELOG.md            # Full change history
└── .github/workflows/
    └── deploy.yml          # GitHub Pages auto-deploy
```

---

## Deployment

Every `git push origin main` automatically:
1. Triggers Render to redeploy (via `render.yaml`)
2. Triggers GitHub Actions to deploy to GitHub Pages (via `.github/workflows/deploy.yml`)

No manual deployment steps required.

---

*Industry Standard Food Service · Jefferson County & Bessemer · Internal Use Only*
