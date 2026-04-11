/* ============================================================
   INDUSTRY STANDARD — Jefferson County Menu Analysis
   Application Logic: Theme · Sidebar · Nav · Render · Export
   ============================================================ */

/* ── Theme ──────────────────────────────────────────────── */
const THEME_KEY = 'is_theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  btn.innerHTML = theme === 'dark'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

/* ── Sidebar ─────────────────────────────────────────────── */
const SIDEBAR_KEY = 'is_sidebar';
let sidebarOpen = true;

function initSidebar() {
  const isMobile = window.innerWidth <= 768;
  sidebarOpen = isMobile ? false : (localStorage.getItem(SIDEBAR_KEY) !== 'closed');
  applySidebarState(false);
}

function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  if (window.innerWidth > 768) localStorage.setItem(SIDEBAR_KEY, sidebarOpen ? 'open' : 'closed');
  applySidebarState(true);
}

function applySidebarState(animate) {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('overlay');
  const mainEl   = document.getElementById('main');
  const isMobile = window.innerWidth <= 768;

  if (!animate) {
    sidebar.style.transition  = 'none';
    mainEl.style.transition   = 'none';
    setTimeout(() => {
      sidebar.style.transition  = '';
      mainEl.style.transition   = '';
    }, 50);
  }

  if (isMobile) {
    sidebar.classList.toggle('open', sidebarOpen);
    sidebar.classList.remove('closed');
    overlay.classList.toggle('visible', sidebarOpen);
    mainEl.style.marginLeft = '0';
  } else {
    sidebar.classList.toggle('closed', !sidebarOpen);
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    mainEl.style.marginLeft = sidebarOpen ? 'var(--sidebar-w)' : '0';
  }
}

/* ── Scroll Spy ─────────────────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section[id]');
  const navItems = document.querySelectorAll('.nav-item[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(n => n.classList.remove('active'));
        const target = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
        if (target) target.classList.add('active');
      }
    });
  }, { rootMargin: '-10% 0% -60% 0%', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* ── Export Dropdown ────────────────────────────────────── */
function initDropdowns() {
  document.addEventListener('click', e => {
    // Global export dropdown
    const exportWrap = document.getElementById('exportWrap');
    if (exportWrap) {
      const dropdown = exportWrap.querySelector('.export-dropdown');
      if (exportWrap.contains(e.target)) {
        dropdown.classList.toggle('open');
      } else {
        dropdown.classList.remove('open');
      }
    }

    // Section-level export menus
    document.querySelectorAll('.sec-export-btn').forEach(btn => {
      const menu = btn.querySelector('.sec-export-menu');
      if (!menu) return;
      if (btn.contains(e.target)) {
        menu.classList.toggle('open');
      } else {
        menu.classList.remove('open');
      }
    });
  });
}

/* ── Toast ──────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i><span>${msg}</span>`;
  toast.className = `show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = ''; }, 3000);
}

/* ── Catalog Search & Collapse ──────────────────────────── */
function initCatalog() {
  const input = document.getElementById('catalogSearch');
  if (input) {
    input.addEventListener('input', () => filterCatalog(input.value.toLowerCase()));
  }

  // Category toggle
  document.querySelectorAll('.catalog-category-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      header.classList.toggle('collapsed');
      body.classList.toggle('collapsed');
    });
  });
}

function filterCatalog(query) {
  document.querySelectorAll('.catalog-category').forEach(cat => {
    const rows = cat.querySelectorAll('tbody tr');
    let visibleCount = 0;
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const show = !query || text.includes(query);
      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    cat.style.display = (query && visibleCount === 0) ? 'none' : '';
    // Auto-expand on search
    if (query) {
      cat.querySelector('.catalog-category-header').classList.remove('collapsed');
      cat.querySelector('.catalog-category-body').classList.remove('collapsed');
    }
  });
}

/* ══════════════════════════════════════════════════════════
   RENDER FUNCTIONS
   ══════════════════════════════════════════════════════════ */

/* ── Overview Section ───────────────────────────────────── */
function renderOverview() {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <div class="overview-hero-top">
      <div>
        <div class="overview-title">
          <span>${DATA.meta.title}</span><br>
          ${DATA.meta.subtitle}
        </div>
        <div class="overview-subtitle">
          Prepared by ${DATA.meta.preparedBy} &mdash; ${DATA.meta.prepared}
        </div>
      </div>
      <div class="overview-meta">
        ${DATA.meta.sources.map(s => `
          <div class="overview-meta-item">
            <i class="fa-regular fa-file-lines"></i> ${s}
          </div>
        `).join('')}
      </div>
    </div>
    <div class="sources-list">
      ${DATA.meta.sources.map(s => `
        <div class="source-tag"><i class="fa-solid fa-database"></i>${s}</div>
      `).join('')}
    </div>
  `;
}

/* ── Stats Cards ─────────────────────────────────────────── */
function renderStats() {
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = DATA.stats.map(s => `
    <div class="stat-card">
      <div class="stat-icon ${s.color}">
        <i class="fa-solid ${s.icon}"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
        <div class="stat-note">${s.note}</div>
      </div>
    </div>
  `).join('');
}

/* ── Switch to Shaver Table ─────────────────────────────── */
function renderSwitchTable() {
  const tbody = document.getElementById('switchTableBody');
  tbody.innerHTML = DATA.switchToShaver.map(row => {
    const priorityClass = row.priority === 'high' ? 'row-high' : row.priority === 'med' ? 'row-med' : '';
    const savingsDisplay = row.savings
      ? `<span class="savings-val">$${row.savings.toFixed(2)}</span>`
      : `<span class="savings-val">${row.note || '—'}</span>`;
    const pillClass = row.priority === 'high' ? 'high' : row.priority === 'med' ? 'med' : 'low';
    return `
      <tr class="${priorityClass}">
        <td><span class="item-name">${row.item}</span></td>
        <td class="right"><span class="price-pfg">$${row.pfgPrice.toFixed(2)}</span></td>
        <td><span class="small text-muted">${row.pfgUnit}</span></td>
        <td class="right"><span class="price-shaver">$${row.shaverPrice.toFixed(2)}</span></td>
        <td><span class="small text-muted">${row.shaverUnit}</span></td>
        <td class="right">${savingsDisplay}</td>
        <td><span class="pill ${pillClass}">${row.priority.toUpperCase()}</span></td>
      </tr>
    `;
  }).join('');
}

/* ── Keep with PFG Table ─────────────────────────────────── */
function renderKeepTable() {
  const tbody = document.getElementById('keepTableBody');
  tbody.innerHTML = DATA.keepWithPFG.map(row => `
    <tr>
      <td><span class="item-name">${row.item}</span>${row.unitNote ? `<br><span class="small text-muted">${row.unitNote}</span>` : ''}</td>
      <td class="right"><span class="price-green text-green bold">$${row.pfgPrice.toFixed(2)}</span></td>
      <td class="right"><span class="price-pfg">$${row.shaverPrice.toFixed(2)}</span></td>
      <td class="right"><span class="savings-val">${row.pfgSavings ? `$${row.pfgSavings.toFixed(2)}` : '—'}</span></td>
    </tr>
  `).join('');
}

/* ── Monthly Savings Table ──────────────────────────────── */
function renderSavingsTable() {
  const tbody = document.getElementById('savingsTableBody');
  tbody.innerHTML = DATA.monthlySavings.map(row => `
    <tr class="${row.isTotal ? 'row-total' : ''}">
      <td><span class="${row.isTotal ? '' : 'item-name'}">${row.item}</span></td>
      <td class="right">${row.qtyPerMonth != null ? row.qtyPerMonth : ''}</td>
      <td class="right">${row.savingsPerCase != null ? `$${row.savingsPerCase.toFixed(2)}` : ''}</td>
      <td class="right"><span class="${row.isTotal ? '' : 'savings-val'}">$${row.monthlySavings.toFixed(2)}</span></td>
    </tr>
  `).join('');
}

/* ── Savings Chart ───────────────────────────────────────── */
function renderChart() {
  const ctx = document.getElementById('savingsChart').getContext('2d');
  const items = DATA.monthlySavings.filter(r => !r.isTotal);
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(59,130,246,0.8)');
  gradient.addColorStop(1, 'rgba(6,182,212,0.6)');

  if (window._savingsChart) window._savingsChart.destroy();

  window._savingsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: items.map(r => r.item.length > 22 ? r.item.substring(0,20)+'…' : r.item),
      datasets: [{
        label: 'Monthly Savings ($)',
        data: items.map(r => r.monthlySavings),
        backgroundColor: items.map(r =>
          r.monthlySavings >= 150 ? 'rgba(16,185,129,0.75)' :
          r.monthlySavings >= 50  ? 'rgba(59,130,246,0.75)' :
                                    'rgba(99,179,237,0.55)'
        ),
        borderColor: items.map(r =>
          r.monthlySavings >= 150 ? 'rgba(16,185,129,1)' :
          r.monthlySavings >= 50  ? 'rgba(59,130,246,1)' :
                                    'rgba(99,179,237,0.8)'
        ),
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#1a2540' : '#ffffff',
          titleColor: isDark ? '#f0f6ff' : '#0a1526',
          bodyColor: isDark ? '#c8d8ef' : '#2c4060',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: ctx => ` $${ctx.raw.toFixed(2)}/month`
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: isDark ? '#8ba5c0' : '#556880',
            font: { size: 11 },
            maxRotation: 45,
          },
          grid: { color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }
        },
        y: {
          ticks: {
            color: isDark ? '#8ba5c0' : '#556880',
            font: { size: 11 },
            callback: v => '$' + v
          },
          grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }
        }
      }
    }
  });
}

/* ── New Items Table ─────────────────────────────────────── */
function renderNewItemsTable() {
  const tbody = document.getElementById('newItemsTableBody');
  tbody.innerHTML = DATA.newItemsToAdd.map(row => `
    <tr>
      <td><span class="pill cat">${row.category}</span></td>
      <td><span class="item-name">${row.item}</span></td>
      <td class="right"><span class="savings-val">$${row.price.toFixed(2)}</span></td>
      <td>${row.useCase}</td>
      <td><span class="pill vendor">${row.vendor}</span></td>
    </tr>
  `).join('');
}

/* ── Menu Assessment ─────────────────────────────────────── */
function renderAssessment() {
  const working = document.getElementById('whatsWorking');
  const pain    = document.getElementById('painPoints');

  working.innerHTML = DATA.menuAssessment.whatsWorking.map(item => `
    <div class="assessment-item">
      <div class="assessment-bullet green"><i class="fa-solid fa-check"></i></div>
      <div class="assessment-text">
        <strong>${item.point}</strong>
        <p>${item.detail}</p>
      </div>
    </div>
  `).join('');

  pain.innerHTML = DATA.menuAssessment.painPoints.map(item => `
    <div class="assessment-item">
      <div class="assessment-bullet ${item.severity === 'high' ? 'red' : item.severity === 'med' ? 'amber' : 'green'}">
        ${item.number}
      </div>
      <div class="assessment-text">
        <strong>${item.issue}</strong>
        <p>${item.detail}</p>
      </div>
    </div>
  `).join('');
}

/* ── New Menu Ideas ──────────────────────────────────────── */
function renderMenuIdeas() {
  const el = document.getElementById('menuIdeas');

  const mealTypeConfig = [
    { key: 'hotLunch',  label: 'Hot Lunch Entrées',       icon: 'fa-fire',           color: 'var(--red)' },
    { key: 'breakfast', label: 'New Breakfast Options',    icon: 'fa-mug-hot',        color: 'var(--amber)' },
    { key: 'dinner',    label: 'New Dinner Options',       icon: 'fa-moon',           color: 'var(--purple)' },
    { key: 'sides',     label: 'New Dessert/Side Options', icon: 'fa-ice-cream',      color: 'var(--cyan)' }
  ];

  el.innerHTML = mealTypeConfig.map(({ key, label, icon, color }) => {
    const items = DATA.newMenuIdeas[key];
    const cards = items.map(idea => {
      if (idea.ingredients) {
        return `
          <div class="idea-card">
            <div class="idea-name">
              <i class="fa-solid fa-utensils" style="color:${color};font-size:12px"></i>
              ${idea.name}
            </div>
            <ul class="idea-ingredients">
              ${idea.ingredients.map(ing => `<li>${ing.item} <span class="text-muted">(${ing.vendor} · ${ing.price})</span></li>`).join('')}
            </ul>
            <div class="idea-note">${idea.note}</div>
          </div>
        `;
      } else {
        return `
          <div class="idea-card">
            <div class="idea-name">
              <i class="fa-solid fa-utensils" style="color:${color};font-size:12px"></i>
              ${idea.name}
            </div>
            ${idea.cost ? `<div class="idea-cost"><i class="fa-solid fa-tag"></i>${idea.cost}</div>` : ''}
            <div class="idea-detail">${idea.detail}</div>
            <div class="idea-note">${idea.note}</div>
          </div>
        `;
      }
    }).join('');

    return `
      <div class="meal-type-label" style="color:${color}">
        <i class="fa-solid ${icon}"></i> ${label}
      </div>
      <div class="ideas-grid mb-20">${cards}</div>
    `;
  }).join('');
}

/* ── Priority Actions ────────────────────────────────────── */
function renderPriority() {
  const el = document.getElementById('priorityContent');

  const tiers = [
    { key: 'immediate', label: 'Immediate — Next Order',     cls: 'immediate', icon: 'fa-bolt' },
    { key: 'nextMenuCycle', label: 'Next Menu Cycle',        cls: 'next',      icon: 'fa-calendar-alt' },
    { key: 'quarterly', label: 'Quarterly Review',           cls: 'quarterly', icon: 'fa-chart-bar' }
  ];

  el.innerHTML = tiers.map(({ key, label, cls, icon }) => `
    <div class="priority-tier">
      <div class="priority-tier-header ${cls}">
        <i class="fa-solid ${icon}"></i> ${label}
      </div>
      <div class="priority-list">
        ${DATA.priorityActions[key].map(item => `
          <div class="priority-item">
            <div class="priority-num ${cls}">${item.num}</div>
            <div class="priority-body">
              <div class="priority-action">${item.action}</div>
              <div class="priority-detail">${item.detail}</div>
            </div>
            ${item.impact ? `<div class="priority-impact">${item.impact}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ── Full Catalog ─────────────────────────────────────────── */
function renderCatalog() {
  const el = document.getElementById('catalogContent');

  const categories = [
    { key: 'bakery',        label: 'Bakery',                icon: 'fa-bread-slice' },
    { key: 'bakingMixes',   label: 'Baking Mixes',          icon: 'fa-mortar-pestle' },
    { key: 'cereals',       label: 'Cereals (Hot)',          icon: 'fa-wheat-awn' },
    { key: 'meat',          label: 'Meat & Protein (Frozen)',icon: 'fa-drumstick-bite' },
    { key: 'pasta',         label: 'Pasta',                 icon: 'fa-circle' },
    { key: 'riceAndPotato', label: 'Rice & Potato',         icon: 'fa-seedling' },
    { key: 'cannedVeggies', label: 'Canned Vegetables',     icon: 'fa-leaf' },
    { key: 'cannedFruit',   label: 'Canned Fruit',          icon: 'fa-apple-whole' },
    { key: 'frozenVeggies', label: 'Frozen Vegetables',     icon: 'fa-snowflake' },
    { key: 'dryBeans',      label: 'Dry Beans',             icon: 'fa-circle-dot' },
    { key: 'seafood',       label: 'Seafood',               icon: 'fa-fish' },
    { key: 'desserts',      label: 'Desserts',              icon: 'fa-ice-cream' },
    { key: 'condiments',    label: 'Condiments',            icon: 'fa-bottle-droplet' },
    { key: 'beverages',     label: 'Beverages',             icon: 'fa-mug-saucer' }
  ];

  el.innerHTML = categories.map(({ key, label, icon }) => {
    const items = DATA.catalog[key];
    if (!items || items.length === 0) return '';
    return `
      <div class="catalog-category" data-cat="${key}">
        <div class="catalog-category-header">
          <i class="fa-solid ${icon}"></i> ${label}
          <span class="nav-badge blue" style="margin-left:8px">${items.length}</span>
          <i class="fa-solid fa-chevron-down chevron"></i>
        </div>
        <div class="catalog-category-body">
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Pack/Unit</th>
                  <th class="right">Price</th>
                </tr>
              </thead>
              <tbody>
                ${items.map(item => `
                  <tr>
                    <td><span class="item-name">${item.item}</span></td>
                    <td><span class="small text-muted">${item.pack}</span></td>
                    <td class="right"><span class="savings-val">$${item.price.toFixed(2)}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   EXPORT FUNCTIONS
   ══════════════════════════════════════════════════════════ */

/* ── Helpers ─────────────────────────────────────────────── */
function tableToAOA(headerRow, dataRows) {
  return [headerRow, ...dataRows];
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href    = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Excel (all sheets) ──────────────────────────────────── */
function exportExcel() {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Switch to Shaver
  const s1 = tableToAOA(
    ['Item', 'PFG Price', 'PFG Unit', 'Shaver Price', 'Shaver Unit', 'Savings/Case', 'Priority'],
    DATA.switchToShaver.map(r => [
      r.item, r.pfgPrice, r.pfgUnit, r.shaverPrice, r.shaverUnit,
      r.savings || r.note || '', r.priority.toUpperCase()
    ])
  );
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(s1), 'Switch to Shaver');

  // Sheet 2: Keep with PFG
  const s2 = tableToAOA(
    ['Item', 'PFG Price', 'Shaver Price', 'PFG Savings/Case', 'Notes'],
    DATA.keepWithPFG.map(r => [
      r.item, r.pfgPrice, r.shaverPrice,
      r.pfgSavings || '', r.unitNote || ''
    ])
  );
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(s2), 'Keep with PFG');

  // Sheet 3: Monthly Savings
  const s3 = tableToAOA(
    ['Item', 'Est. Qty/Month', 'Savings/Case', 'Monthly Savings'],
    DATA.monthlySavings.map(r => [
      r.item, r.qtyPerMonth || '', r.savingsPerCase || '', r.monthlySavings
    ])
  );
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(s3), 'Monthly Savings');

  // Sheet 4: New Items to Add
  const s4 = tableToAOA(
    ['Category', 'Item', 'Price', 'Use Case', 'Vendor'],
    DATA.newItemsToAdd.map(r => [r.category, r.item, r.price, r.useCase, r.vendor])
  );
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(s4), 'New Items');

  // Sheet 5: Priority Actions
  const allActions = [
    ...DATA.priorityActions.immediate.map(r => ({ ...r, tier: 'Immediate' })),
    ...DATA.priorityActions.nextMenuCycle.map(r => ({ ...r, tier: 'Next Menu Cycle' })),
    ...DATA.priorityActions.quarterly.map(r => ({ ...r, tier: 'Quarterly' }))
  ];
  const s5 = tableToAOA(
    ['#', 'Tier', 'Action', 'Detail', 'Impact'],
    allActions.map(r => [r.num, r.tier, r.action, r.detail, r.impact || ''])
  );
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(s5), 'Priority Actions');

  // Sheet 6: Full Catalog
  const catalogRows = [];
  const catKeys = Object.keys(DATA.catalog);
  catKeys.forEach(key => {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
    DATA.catalog[key].forEach(item => {
      catalogRows.push([label, item.item, item.pack, item.price]);
    });
  });
  const s6 = tableToAOA(['Category', 'Item', 'Pack/Unit', 'Price'], catalogRows);
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(s6), 'Shaver Catalog');

  XLSX.writeFile(wb, 'Jefferson-County-Menu-Analysis.xlsx');
  showToast('Excel workbook downloaded — 6 sheets');
}

/* ── CSV (combined, comma-separated with section headers) ── */
function exportCSV() {
  const lines = [];

  lines.push('Jefferson County Menu Analysis — Industry Standard');
  lines.push(`Prepared: ${DATA.meta.prepared}`);
  lines.push('');

  lines.push('=== SWITCH TO SHAVER ===');
  lines.push('Item,PFG Price,PFG Unit,Shaver Price,Shaver Unit,Savings/Case,Priority');
  DATA.switchToShaver.forEach(r => {
    lines.push(`"${r.item}",${r.pfgPrice},"${r.pfgUnit}",${r.shaverPrice},"${r.shaverUnit}","${r.savings || r.note || ''}",${r.priority.toUpperCase()}`);
  });

  lines.push('');
  lines.push('=== KEEP WITH PFG ===');
  lines.push('Item,PFG Price,Shaver Price,PFG Savings,Notes');
  DATA.keepWithPFG.forEach(r => {
    lines.push(`"${r.item}",${r.pfgPrice},${r.shaverPrice},"${r.pfgSavings || ''}","${r.unitNote || ''}"`);
  });

  lines.push('');
  lines.push('=== MONTHLY SAVINGS ESTIMATE ===');
  lines.push('Item,Est Qty/Month,Savings/Case,Monthly Savings');
  DATA.monthlySavings.forEach(r => {
    lines.push(`"${r.item}",${r.qtyPerMonth || ''},${r.savingsPerCase || ''},${r.monthlySavings}`);
  });

  lines.push('');
  lines.push('=== NEW ITEMS TO ADD ===');
  lines.push('Category,Item,Price,Use Case,Vendor');
  DATA.newItemsToAdd.forEach(r => {
    lines.push(`"${r.category}","${r.item}",${r.price},"${r.useCase}","${r.vendor}"`);
  });

  lines.push('');
  lines.push('=== PRIORITY ACTIONS ===');
  lines.push('#,Tier,Action,Detail,Impact');
  [...DATA.priorityActions.immediate,
   ...DATA.priorityActions.nextMenuCycle,
   ...DATA.priorityActions.quarterly
  ].forEach((r, i) => {
    const tier = i < 5 ? 'Immediate' : i < 9 ? 'Next Menu Cycle' : 'Quarterly';
    lines.push(`${r.num},"${tier}","${r.action}","${r.detail}","${r.impact || ''}"`);
  });

  lines.push('');
  lines.push('=== SHAVER CATALOG ===');
  lines.push('Category,Item,Pack/Unit,Price');
  Object.keys(DATA.catalog).forEach(key => {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
    DATA.catalog[key].forEach(item => {
      lines.push(`"${label}","${item.item}","${item.pack}",${item.price}`);
    });
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, 'Jefferson-County-Menu-Analysis.csv');
  showToast('CSV file downloaded');
}

/* ── PDF ─────────────────────────────────────────────────── */
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter' });

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const BG     = isDark ? [8,12,24]   : [255,255,255];
  const HEAD   = isDark ? [14,20,37]  : [240,244,248];
  const TEXT   = isDark ? [240,246,255] : [10,21,38];
  const SUB    = isDark ? [139,165,192] : [86,104,128];
  const ACC    = [59,130,246];
  const GREEN  = [16,185,129];
  const RED    = [244,63,94];
  const AMBER  = [245,158,11];

  let y = 0;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 36;

  function newPage() {
    doc.addPage();
    y = margin;
    // Subtle header bar
    doc.setFillColor(...HEAD);
    doc.rect(0, 0, pageW, 28, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...SUB);
    doc.text('INDUSTRY STANDARD  |  Jefferson County Menu Analysis', margin, 18);
    y = 44;
  }

  function checkPage(needed = 60) {
    if (y + needed > pageH - margin) newPage();
  }

  function sectionTitle(title, color = ACC) {
    checkPage(40);
    y += 10;
    doc.setFillColor(...color);
    doc.rect(margin, y, 4, 18, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...TEXT);
    doc.text(title, margin + 12, y + 13);
    y += 28;
  }

  // ── Cover Page ──────────────────────────────────────────
  doc.setFillColor(...BG);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Accent block
  doc.setFillColor(...ACC);
  doc.rect(0, 0, pageW, 6, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...TEXT);
  doc.text('Jefferson County Jail', margin, 80);
  doc.setFontSize(20);
  doc.setTextColor(...SUB);
  doc.text('Vendor Price Comparison & Menu Analysis', margin, 110);

  // Meta box
  doc.setFillColor(...HEAD);
  doc.roundedRect(margin, 130, pageW - margin*2, 80, 6, 6, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...SUB);
  doc.text(`Prepared by: Industry Standard`, margin + 16, 155);
  doc.text(`Date: ${DATA.meta.prepared}`, margin + 16, 172);
  doc.text(`Sources: ${DATA.meta.sources.join('  ·  ')}`, margin + 16, 189);

  // KPI cards
  const kpiW = (pageW - margin*2 - 30) / 4;
  const kpiColors = [GREEN, RED, ACC, AMBER];
  DATA.stats.forEach((stat, i) => {
    const kx = margin + i * (kpiW + 10);
    const ky = 240;
    doc.setFillColor(...HEAD);
    doc.roundedRect(kx, ky, kpiW, 70, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...kpiColors[i]);
    doc.text(stat.value, kx + 12, ky + 30);
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    doc.text(stat.label, kx + 12, ky + 46);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...SUB);
    doc.text(stat.note, kx + 12, ky + 58, { maxWidth: kpiW - 16 });
  });

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...SUB);
  doc.text('CONFIDENTIAL — For internal use only', margin, pageH - 20);
  doc.text('Industry Standard © 2026', pageW - margin - 120, pageH - 20);

  // ── Page 2: Switch to Shaver ──────────────────────────
  newPage();
  sectionTitle('HEAD-TO-HEAD: Switch to Shaver', RED);

  doc.autoTable({
    startY: y,
    head: [['Item', 'PFG Price', 'PFG Unit', 'Shaver Price', 'Shaver Unit', 'Savings/Case', 'Priority']],
    body: DATA.switchToShaver.map(r => [
      r.item,
      `$${r.pfgPrice.toFixed(2)}`,
      r.pfgUnit,
      `$${r.shaverPrice.toFixed(2)}`,
      r.shaverUnit,
      r.savings ? `$${r.savings.toFixed(2)}` : (r.note || '—'),
      r.priority.toUpperCase()
    ]),
    styles: {
      fillColor: BG, textColor: TEXT,
      fontSize: 8, cellPadding: 5,
    },
    headStyles: {
      fillColor: HEAD, textColor: SUB,
      fontStyle: 'bold', fontSize: 8
    },
    bodyStyles: { lineColor: isDark ? [30,40,60] : [220,228,240], lineWidth: 0.5 },
    alternateRowStyles: { fillColor: isDark ? [12,18,32] : [248,250,252] },
    didParseCell: (data) => {
      if (data.section === 'body') {
        const priority = data.row.raw[6];
        if (data.column.index === 6) {
          data.cell.styles.textColor = priority === 'HIGH' ? RED : priority === 'MED' ? AMBER : ACC;
          data.cell.styles.fontStyle = 'bold';
        }
        if (data.column.index === 5) {
          data.cell.styles.textColor = AMBER;
          data.cell.styles.fontStyle = 'bold';
        }
        if (data.column.index === 1) data.cell.styles.textColor = RED;
        if (data.column.index === 3) data.cell.styles.textColor = GREEN;
      }
    },
    margin: { left: margin, right: margin }
  });

  y = doc.lastAutoTable.finalY + 24;

  // ── Keep with PFG ─────────────────────────────────────
  checkPage(120);
  sectionTitle('Keep with PFG — PFG Wins on Price', GREEN);

  doc.autoTable({
    startY: y,
    head: [['Item', 'PFG Price', 'Shaver Price', 'PFG Saves', 'Notes']],
    body: DATA.keepWithPFG.map(r => [
      r.item,
      `$${r.pfgPrice.toFixed(2)}`,
      `$${r.shaverPrice.toFixed(2)}`,
      r.pfgSavings ? `$${r.pfgSavings.toFixed(2)}` : '—',
      r.unitNote || ''
    ]),
    styles: { fillColor: BG, textColor: TEXT, fontSize: 8, cellPadding: 5 },
    headStyles: { fillColor: HEAD, textColor: SUB, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { lineColor: isDark ? [30,40,60] : [220,228,240], lineWidth: 0.5 },
    alternateRowStyles: { fillColor: isDark ? [12,18,32] : [248,250,252] },
    didParseCell: (data) => {
      if (data.section === 'body') {
        if (data.column.index === 1) { data.cell.styles.textColor = GREEN; data.cell.styles.fontStyle = 'bold'; }
        if (data.column.index === 2) data.cell.styles.textColor = RED;
        if (data.column.index === 3) { data.cell.styles.textColor = AMBER; data.cell.styles.fontStyle = 'bold'; }
      }
    },
    margin: { left: margin, right: margin }
  });

  y = doc.lastAutoTable.finalY + 24;

  // ── Page 3: Monthly Savings ───────────────────────────
  newPage();
  sectionTitle('Estimated Monthly Savings by Switching', AMBER);

  doc.autoTable({
    startY: y,
    head: [['Item', 'Est. Qty/Month', 'Savings/Case', 'Monthly Savings']],
    body: DATA.monthlySavings.map(r => [
      r.item,
      r.qtyPerMonth != null ? r.qtyPerMonth : '',
      r.savingsPerCase != null ? `$${r.savingsPerCase.toFixed(2)}` : '',
      `$${r.monthlySavings.toFixed(2)}`
    ]),
    styles: { fillColor: BG, textColor: TEXT, fontSize: 8, cellPadding: 5 },
    headStyles: { fillColor: HEAD, textColor: SUB, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { lineColor: isDark ? [30,40,60] : [220,228,240], lineWidth: 0.5 },
    alternateRowStyles: { fillColor: isDark ? [12,18,32] : [248,250,252] },
    didParseCell: (data) => {
      if (data.section === 'body') {
        const isTotal = data.row.raw[0] === 'TOTAL';
        if (isTotal) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = GREEN;
          data.cell.styles.fillColor = isDark ? [10,40,30] : [220,255,240];
        }
        if (!isTotal && data.column.index === 3) {
          data.cell.styles.textColor = AMBER;
          data.cell.styles.fontStyle = 'bold';
        }
      }
    },
    margin: { left: margin, right: margin }
  });

  y = doc.lastAutoTable.finalY + 24;

  // ── Page 4: New Items ─────────────────────────────────
  newPage();
  sectionTitle('New Shaver Items Worth Adding', ACC);

  doc.autoTable({
    startY: y,
    head: [['Category', 'Item', 'Price/Case', 'Use Case', 'Vendor']],
    body: DATA.newItemsToAdd.map(r => [r.category, r.item, `$${r.price.toFixed(2)}`, r.useCase, r.vendor]),
    styles: { fillColor: BG, textColor: TEXT, fontSize: 8, cellPadding: 5 },
    headStyles: { fillColor: HEAD, textColor: SUB, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { lineColor: isDark ? [30,40,60] : [220,228,240], lineWidth: 0.5 },
    alternateRowStyles: { fillColor: isDark ? [12,18,32] : [248,250,252] },
    columnStyles: { 2: { textColor: AMBER, fontStyle: 'bold' } },
    margin: { left: margin, right: margin }
  });

  y = doc.lastAutoTable.finalY + 24;

  // ── Page 5: Priority Actions ──────────────────────────
  newPage();
  sectionTitle('Priority Action Plan', ACC);

  const allActs = [
    ...DATA.priorityActions.immediate.map(r => [r.num, 'Immediate', r.action, r.detail, r.impact || '']),
    ...DATA.priorityActions.nextMenuCycle.map(r => [r.num, 'Next Cycle', r.action, r.detail, r.impact || '']),
    ...DATA.priorityActions.quarterly.map(r => [r.num, 'Quarterly', r.action, r.detail, r.impact || ''])
  ];

  doc.autoTable({
    startY: y,
    head: [['#', 'Tier', 'Action', 'Detail', 'Impact']],
    body: allActs,
    styles: { fillColor: BG, textColor: TEXT, fontSize: 8, cellPadding: 5 },
    headStyles: { fillColor: HEAD, textColor: SUB, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { lineColor: isDark ? [30,40,60] : [220,228,240], lineWidth: 0.5 },
    alternateRowStyles: { fillColor: isDark ? [12,18,32] : [248,250,252] },
    columnStyles: { 0: { halign: 'center', fontStyle: 'bold' } },
    didParseCell: (data) => {
      if (data.section === 'body') {
        const tier = data.row.raw[1];
        if (data.column.index === 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = tier === 'Immediate' ? RED : tier === 'Next Cycle' ? AMBER : ACC;
        }
        if (data.column.index === 4) { data.cell.styles.textColor = GREEN; data.cell.styles.fontStyle = 'bold'; }
      }
    },
    margin: { left: margin, right: margin }
  });

  // Page numbers
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...SUB);
    doc.text(`Page ${i} of ${totalPages}`, pageW - margin - 50, pageH - 12);
  }

  doc.save('Jefferson-County-Menu-Analysis.pdf');
  showToast('PDF downloaded — 5 pages');
}

/* ── Section-level CSV export ─────────────────────────────── */
function exportSectionCSV(sectionKey) {
  let lines = [];
  let filename = '';

  switch (sectionKey) {
    case 'switch':
      filename = 'switch-to-shaver.csv';
      lines = ['Item,PFG Price,PFG Unit,Shaver Price,Shaver Unit,Savings/Case,Priority'];
      DATA.switchToShaver.forEach(r => {
        lines.push(`"${r.item}",${r.pfgPrice},"${r.pfgUnit}",${r.shaverPrice},"${r.shaverUnit}","${r.savings || r.note || ''}",${r.priority.toUpperCase()}`);
      });
      break;
    case 'keep':
      filename = 'keep-with-pfg.csv';
      lines = ['Item,PFG Price,Shaver Price,PFG Savings,Notes'];
      DATA.keepWithPFG.forEach(r => {
        lines.push(`"${r.item}",${r.pfgPrice},${r.shaverPrice},"${r.pfgSavings || ''}","${r.unitNote || ''}"`);
      });
      break;
    case 'savings':
      filename = 'monthly-savings.csv';
      lines = ['Item,Qty/Month,Savings/Case,Monthly Savings'];
      DATA.monthlySavings.forEach(r => {
        lines.push(`"${r.item}",${r.qtyPerMonth || ''},${r.savingsPerCase || ''},${r.monthlySavings}`);
      });
      break;
    case 'newItems':
      filename = 'new-items.csv';
      lines = ['Category,Item,Price,Use Case,Vendor'];
      DATA.newItemsToAdd.forEach(r => {
        lines.push(`"${r.category}","${r.item}",${r.price},"${r.useCase}","${r.vendor}"`);
      });
      break;
    case 'catalog':
      filename = 'shaver-catalog.csv';
      lines = ['Category,Item,Pack/Unit,Price'];
      Object.keys(DATA.catalog).forEach(key => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
        DATA.catalog[key].forEach(item => {
          lines.push(`"${label}","${item.item}","${item.pack}",${item.price}`);
        });
      });
      break;
    default:
      return;
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, filename);
  showToast(`CSV downloaded: ${filename}`);
}

function exportSectionExcel(sectionKey) {
  const wb = XLSX.utils.book_new();
  let sheetName = '', rows = [], headers = [];

  switch (sectionKey) {
    case 'switch':
      sheetName = 'Switch to Shaver';
      headers = ['Item','PFG Price','PFG Unit','Shaver Price','Shaver Unit','Savings/Case','Priority'];
      rows = DATA.switchToShaver.map(r => [r.item, r.pfgPrice, r.pfgUnit, r.shaverPrice, r.shaverUnit, r.savings || r.note || '', r.priority.toUpperCase()]);
      break;
    case 'keep':
      sheetName = 'Keep with PFG';
      headers = ['Item','PFG Price','Shaver Price','PFG Savings','Notes'];
      rows = DATA.keepWithPFG.map(r => [r.item, r.pfgPrice, r.shaverPrice, r.pfgSavings || '', r.unitNote || '']);
      break;
    case 'savings':
      sheetName = 'Monthly Savings';
      headers = ['Item','Qty/Month','Savings/Case','Monthly Savings'];
      rows = DATA.monthlySavings.map(r => [r.item, r.qtyPerMonth || '', r.savingsPerCase || '', r.monthlySavings]);
      break;
    case 'newItems':
      sheetName = 'New Items';
      headers = ['Category','Item','Price','Use Case','Vendor'];
      rows = DATA.newItemsToAdd.map(r => [r.category, r.item, r.price, r.useCase, r.vendor]);
      break;
    case 'catalog':
      sheetName = 'Shaver Catalog';
      headers = ['Category','Item','Pack/Unit','Price'];
      rows = [];
      Object.keys(DATA.catalog).forEach(key => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
        DATA.catalog[key].forEach(item => rows.push([label, item.item, item.pack, item.price]));
      });
      break;
    default:
      return;
  }

  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([headers, ...rows]), sheetName);
  XLSX.writeFile(wb, `${sheetName.toLowerCase().replace(/\s+/g,'-')}.xlsx`);
  showToast(`Excel downloaded: ${sheetName}`);
}

/* ── Section export HTML helper ──────────────────────────── */
function secExportBtn(key) {
  return `
    <div class="sec-export-btn" onclick="event.stopPropagation()">
      <i class="fa-solid fa-download"></i> Export
      <i class="fa-solid fa-chevron-down" style="font-size:9px;margin-left:2px"></i>
      <div class="sec-export-menu">
        <button class="sec-export-opt" onclick="exportSectionExcel('${key}')">
          <i class="fa-solid fa-file-excel" style="color:var(--green)"></i> Excel (.xlsx)
        </button>
        <button class="sec-export-opt" onclick="exportSectionCSV('${key}')">
          <i class="fa-solid fa-file-csv" style="color:var(--cyan)"></i> CSV
        </button>
      </div>
    </div>
  `;
}

/* ── Render section export buttons ──────────────────────── */
function renderExportButtons() {
  const map = {
    'switchExport':   'switch',
    'keepExport':     'keep',
    'savingsExport':  'savings',
    'newItemsExport': 'newItems',
    'catalogExport':  'catalog'
  };
  Object.entries(map).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = secExportBtn(key);
  });
}

/* ── Chart theme update ──────────────────────────────────── */
function updateChart() {
  renderChart();
}

/* ══════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Theme
  initTheme();

  // Sidebar
  initSidebar();

  // Theme button
  document.getElementById('themeBtn').addEventListener('click', () => {
    toggleTheme();
    updateChart();
  });

  // Hamburger
  document.getElementById('hamburger').addEventListener('click', toggleSidebar);

  // Overlay click closes sidebar on mobile
  document.getElementById('overlay').addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebarOpen = false;
      applySidebarState(true);
    }
  });

  // Mobile: close sidebar when nav item is clicked
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebarOpen = false;
        applySidebarState(true);
      }
    });
  });

  // Resize handler
  window.addEventListener('resize', () => {
    applySidebarState(false);
  });

  // Render all content
  renderOverview();
  renderStats();
  renderSwitchTable();
  renderKeepTable();
  renderSavingsTable();
  renderNewItemsTable();
  renderAssessment();
  renderMenuIdeas();
  renderPriority();
  renderCatalog();
  renderExportButtons();

  // Chart
  setTimeout(renderChart, 100);

  // Scroll spy
  initScrollSpy();

  // Dropdowns
  initDropdowns();

  // Catalog search
  initCatalog();
});
