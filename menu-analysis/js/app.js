/* ============================================================
   INDUSTRY STANDARD — Jefferson County Menu Analysis
   Interactivity only: theme · sidebar · chart · exports
   ============================================================ */

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
  setTimeout(renderChart, 50);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  btn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

/* ── Sidebar ──────────────────────────────────────────────── */
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
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const mainEl  = document.getElementById('main');
  const isMobile = window.innerWidth <= 768;
  if (!animate) {
    sidebar.style.transition = 'none';
    mainEl.style.transition  = 'none';
    setTimeout(() => { sidebar.style.transition = ''; mainEl.style.transition = ''; }, 50);
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

/* ── Scroll Spy ───────────────────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section[id]');
  const navItems = document.querySelectorAll('.nav-item[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(n => n.classList.remove('active'));
        const t = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
        if (t) t.classList.add('active');
      }
    });
  }, { rootMargin: '-10% 0% -60% 0%', threshold: 0 });
  sections.forEach(s => observer.observe(s));
}

/* ── Dropdowns ────────────────────────────────────────────── */
function initDropdowns() {
  document.addEventListener('click', e => {
    const exportWrap = document.getElementById('exportWrap');
    if (exportWrap) {
      const dd = exportWrap.querySelector('.export-dropdown');
      exportWrap.contains(e.target) ? dd.classList.toggle('open') : dd.classList.remove('open');
    }
    document.querySelectorAll('.sec-export-btn').forEach(btn => {
      const menu = btn.querySelector('.sec-export-menu');
      if (!menu) return;
      btn.contains(e.target) ? menu.classList.toggle('open') : menu.classList.remove('open');
    });
  });
}

/* ── Toast ────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i><span>${msg}</span>`;
  toast.className = `show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = ''; }, 3200);
}

/* ── Catalog Search ───────────────────────────────────────── */
function initCatalog() {
  const input = document.getElementById('catalogSearch');
  if (input) input.addEventListener('input', () => filterCatalog(input.value.toLowerCase()));
  document.querySelectorAll('.catalog-category-header').forEach(h => {
    h.addEventListener('click', () => {
      h.classList.toggle('collapsed');
      h.nextElementSibling.classList.toggle('collapsed');
    });
  });
}

function filterCatalog(q) {
  document.querySelectorAll('.catalog-category').forEach(cat => {
    const rows = cat.querySelectorAll('tbody tr');
    let vis = 0;
    rows.forEach(row => {
      const show = !q || row.textContent.toLowerCase().includes(q);
      row.style.display = show ? '' : 'none';
      if (show) vis++;
    });
    cat.style.display = (q && vis === 0) ? 'none' : '';
    if (q) {
      cat.querySelector('.catalog-category-header').classList.remove('collapsed');
      cat.querySelector('.catalog-category-body').classList.remove('collapsed');
    }
  });
}

/* ── Chart ────────────────────────────────────────────────── */
function renderChart() {
  const canvas = document.getElementById('savingsChart');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const items = [
    { label: 'Drink Mix',    val: 234.56 },
    { label: 'All Pasta',    val: 208.00 },
    { label: 'Carrots',      val: 194.16 },
    { label: 'Gr. Northern', val: 102.30 },
    { label: 'Grits',        val: 96.00  },
    { label: 'Cake Mixes',   val: 64.00  },
    { label: 'Potato Flakes',val: 54.11  },
    { label: 'Oats',         val: 40.92  },
    { label: 'Onion+Garlic', val: 14.00  },
    { label: 'Jelly',        val: 19.34  },
    { label: 'Cheese Sauce', val: 13.94  },
  ];
  if (window._savingsChart) window._savingsChart.destroy();
  window._savingsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: items.map(i => i.label),
      datasets: [{
        label: 'Monthly Savings ($)',
        data: items.map(i => i.val),
        backgroundColor: items.map(i => i.val >= 150 ? 'rgba(16,185,129,0.75)' : i.val >= 50 ? 'rgba(59,130,246,0.75)' : 'rgba(99,179,237,0.5)'),
        borderColor:     items.map(i => i.val >= 150 ? 'rgba(16,185,129,1)'    : i.val >= 50 ? 'rgba(59,130,246,1)'    : 'rgba(99,179,237,0.8)'),
        borderWidth: 1.5, borderRadius: 6, borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#1a2540' : '#fff',
          titleColor: isDark ? '#f0f6ff' : '#0a1526',
          bodyColor:  isDark ? '#c8d8ef' : '#2c4060',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1, padding: 10,
          callbacks: { label: ctx => ` $${ctx.raw.toFixed(2)}/month` }
        }
      },
      scales: {
        x: { ticks: { color: isDark ? '#8ba5c0' : '#556880', font: { size: 11 }, maxRotation: 40 }, grid: { color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' } },
        y: { ticks: { color: isDark ? '#8ba5c0' : '#556880', font: { size: 11 }, callback: v => '$'+v }, grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' } }
      }
    }
  });
}

/* ══════════════════════════════════════════════════════════
   EXPORTS
   ══════════════════════════════════════════════════════════ */

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function exportExcel() {
  if (typeof XLSX === 'undefined') { showToast('Library loading, try again', 'error'); return; }
  const wb = XLSX.utils.book_new();
  const add = (name, headers, rows) => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([headers, ...rows]), name);

  add('Switch to Shaver',
    ['Item','PFG Price','PFG Unit','Shaver Price','Shaver Unit','Savings/Case','Priority'],
    DATA.switchToShaver.map(r => [r.item, r.pfgPrice, r.pfgUnit, r.shaverPrice, r.shaverUnit, r.savings || r.note || '', r.priority.toUpperCase()])
  );
  add('Keep with PFG',
    ['Item','PFG Price','Shaver Price','PFG Savings','Notes'],
    DATA.keepWithPFG.map(r => [r.item, r.pfgPrice, r.shaverPrice, r.pfgSavings || '', r.unitNote || ''])
  );
  add('Monthly Savings',
    ['Item','Est Qty/Month','Savings/Case','Monthly Savings'],
    DATA.monthlySavings.map(r => [r.item, r.qtyPerMonth || '', r.savingsPerCase || '', r.monthlySavings])
  );
  add('New Items',
    ['Category','Item','Price','Use Case','Vendor'],
    DATA.newItemsToAdd.map(r => [r.category, r.item, r.price, r.useCase, r.vendor])
  );
  const acts = [...DATA.priorityActions.immediate.map(r=>({...r,tier:'Immediate'})), ...DATA.priorityActions.nextMenuCycle.map(r=>({...r,tier:'Next Cycle'})), ...DATA.priorityActions.quarterly.map(r=>({...r,tier:'Quarterly'}))];
  add('Priority Actions', ['#','Tier','Action','Detail','Impact'], acts.map(r => [r.num, r.tier, r.action, r.detail, r.impact||'']));
  const catRows = [];
  Object.keys(DATA.catalog).forEach(k => { const lbl = k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase()); DATA.catalog[k].forEach(i => catRows.push([lbl, i.item, i.pack, i.price])); });
  add('Shaver Catalog', ['Category','Item','Pack/Unit','Price'], catRows);

  XLSX.writeFile(wb, 'Jefferson-County-Menu-Analysis.xlsx');
  showToast('Excel workbook downloaded — 6 sheets');
}

function exportCSV() {
  const lines = [
    'Jefferson County Menu Analysis — Industry Standard', `Prepared: April 11 2026`, '',
    '=== SWITCH TO SHAVER ===',
    'Item,PFG Price,PFG Unit,Shaver Price,Shaver Unit,Savings/Case,Priority',
    ...DATA.switchToShaver.map(r => `"${r.item}",${r.pfgPrice},"${r.pfgUnit}",${r.shaverPrice},"${r.shaverUnit}","${r.savings||r.note||''}",${r.priority.toUpperCase()}`),
    '','=== KEEP WITH PFG ===',
    'Item,PFG Price,Shaver Price,PFG Savings,Notes',
    ...DATA.keepWithPFG.map(r => `"${r.item}",${r.pfgPrice},${r.shaverPrice},"${r.pfgSavings||''}","${r.unitNote||''}"`),
    '','=== MONTHLY SAVINGS ===',
    'Item,Qty/Month,Savings/Case,Monthly Savings',
    ...DATA.monthlySavings.map(r => `"${r.item}",${r.qtyPerMonth||''},${r.savingsPerCase||''},${r.monthlySavings}`),
    '','=== NEW ITEMS TO ADD ===',
    'Category,Item,Price,Use Case,Vendor',
    ...DATA.newItemsToAdd.map(r => `"${r.category}","${r.item}",${r.price},"${r.useCase}","${r.vendor}"`),
    '','=== PRIORITY ACTIONS ===',
    '#,Tier,Action,Detail,Impact',
    ...DATA.priorityActions.immediate.map(r=>`${r.num},Immediate,"${r.action}","${r.detail}","${r.impact||''}"`),
    ...DATA.priorityActions.nextMenuCycle.map(r=>`${r.num},Next Cycle,"${r.action}","${r.detail}","${r.impact||''}"`),
    ...DATA.priorityActions.quarterly.map(r=>`${r.num},Quarterly,"${r.action}","${r.detail}","${r.impact||''}"`),
    '','=== SHAVER CATALOG ===',
    'Category,Item,Pack/Unit,Price',
    ...Object.keys(DATA.catalog).flatMap(k => { const lbl = k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase()); return DATA.catalog[k].map(i=>`"${lbl}","${i.item}","${i.pack}",${i.price}`); })
  ];
  downloadBlob(new Blob([lines.join('\n')], {type:'text/csv;charset=utf-8;'}), 'Jefferson-County-Menu-Analysis.csv');
  showToast('CSV downloaded');
}

function exportPDF() {
  if (typeof window.jspdf === 'undefined') { showToast('PDF library loading, try again', 'error'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter' });
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const BG=[8,12,24],HEAD=[14,20,37],TEXT=[240,246,255],SUB=[139,165,192],ACC=[59,130,246],GREEN=[16,185,129],RED=[244,63,94],AMBER=[245,158,11];
  const pageW=doc.internal.pageSize.getWidth(), pageH=doc.internal.pageSize.getHeight(), M=36;
  let y=0;

  function newPage() {
    doc.addPage(); y=M;
    doc.setFillColor(...HEAD); doc.rect(0,0,pageW,28,'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...SUB);
    doc.text('INDUSTRY STANDARD  |  Jefferson County Menu Analysis', M, 18);
    y=44;
  }
  function checkPage(n=60) { if(y+n>pageH-M) newPage(); }
  function secTitle(t, c=ACC) {
    checkPage(40); y+=10;
    doc.setFillColor(...c); doc.rect(M,y,4,18,'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.setTextColor(...TEXT);
    doc.text(t, M+12, y+13); y+=28;
  }

  // Cover
  doc.setFillColor(...BG); doc.rect(0,0,pageW,pageH,'F');
  doc.setFillColor(...ACC); doc.rect(0,0,pageW,6,'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(28); doc.setTextColor(...TEXT);
  doc.text('Jefferson County Jail', M, 80);
  doc.setFontSize(18); doc.setTextColor(...SUB);
  doc.text('Vendor Price Comparison & Menu Analysis', M, 108);
  doc.setFillColor(...HEAD); doc.roundedRect(M,126,pageW-M*2,72,6,6,'F');
  doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(...SUB);
  doc.text('Prepared by: Industry Standard  ·  April 11, 2026', M+16, 150);
  doc.text('Sources: PFG Invoice #6776963 (04/07/26)  ·  Shaver ISP Price List (03/01/26–03/31/26)', M+16, 168);
  doc.text('CONFIDENTIAL — Internal use only', M+16, 186);
  const kpiW=(pageW-M*2-30)/4, kpiColors=[GREEN,RED,ACC,AMBER];
  const kpis=[['$1,041+','Est. Monthly Savings'],['22','Switch to Shaver'],['6','Keep with PFG'],['21+','New Items Available']];
  kpis.forEach(([v,l],i) => {
    const kx=M+i*(kpiW+10), ky=228;
    doc.setFillColor(...HEAD); doc.roundedRect(kx,ky,kpiW,60,6,6,'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(20); doc.setTextColor(...kpiColors[i]); doc.text(v,kx+12,ky+28);
    doc.setFontSize(9); doc.setTextColor(...TEXT); doc.text(l,kx+12,ky+44);
  });

  newPage();
  secTitle('Switch to Shaver — Full Price Comparison', RED);
  doc.autoTable({
    startY:y, margin:{left:M,right:M},
    head:[['Item','PFG Price','PFG Unit','Shaver Price','Shaver Unit','Savings/Case','Priority']],
    body:DATA.switchToShaver.map(r=>[r.item,`$${r.pfgPrice.toFixed(2)}`,r.pfgUnit,`$${r.shaverPrice.toFixed(2)}`,r.shaverUnit,r.savings?`$${r.savings.toFixed(2)}`:(r.note||'—'),r.priority.toUpperCase()]),
    styles:{fillColor:BG,textColor:TEXT,fontSize:8,cellPadding:5},
    headStyles:{fillColor:HEAD,textColor:SUB,fontStyle:'bold',fontSize:8},
    alternateRowStyles:{fillColor:[12,18,32]},
    didParseCell:(d)=>{
      if(d.section==='body'){
        if(d.column.index===1)d.cell.styles.textColor=RED;
        if(d.column.index===3){d.cell.styles.textColor=GREEN;d.cell.styles.fontStyle='bold';}
        if(d.column.index===5){d.cell.styles.textColor=AMBER;d.cell.styles.fontStyle='bold';}
        if(d.column.index===6){const p=d.row.raw[6];d.cell.styles.textColor=p==='HIGH'?RED:p==='MED'?AMBER:ACC;d.cell.styles.fontStyle='bold';}
      }
    }
  });
  y=doc.lastAutoTable.finalY+20;
  checkPage(120);
  secTitle('Keep with PFG', GREEN);
  doc.autoTable({
    startY:y, margin:{left:M,right:M},
    head:[['Item','PFG Price','Shaver Price','PFG Saves/Case','Notes']],
    body:DATA.keepWithPFG.map(r=>[r.item,`$${r.pfgPrice.toFixed(2)}`,`$${r.shaverPrice.toFixed(2)}`,r.pfgSavings?`$${r.pfgSavings.toFixed(2)}`:'—',r.unitNote||'']),
    styles:{fillColor:BG,textColor:TEXT,fontSize:8,cellPadding:5},
    headStyles:{fillColor:HEAD,textColor:SUB,fontStyle:'bold',fontSize:8},
    alternateRowStyles:{fillColor:[12,18,32]},
    didParseCell:(d)=>{if(d.section==='body'){if(d.column.index===1){d.cell.styles.textColor=GREEN;d.cell.styles.fontStyle='bold';}if(d.column.index===2)d.cell.styles.textColor=RED;if(d.column.index===3){d.cell.styles.textColor=AMBER;d.cell.styles.fontStyle='bold';}}}
  });

  newPage();
  secTitle('Monthly Savings Estimate', AMBER);
  doc.autoTable({
    startY:y, margin:{left:M,right:M},
    head:[['Item','Est. Qty/Month','Savings/Case','Monthly Savings']],
    body:DATA.monthlySavings.map(r=>[r.item,r.qtyPerMonth||'',r.savingsPerCase?`$${r.savingsPerCase.toFixed(2)}`:'',`$${r.monthlySavings.toFixed(2)}`]),
    styles:{fillColor:BG,textColor:TEXT,fontSize:8,cellPadding:5},
    headStyles:{fillColor:HEAD,textColor:SUB,fontStyle:'bold',fontSize:8},
    alternateRowStyles:{fillColor:[12,18,32]},
    didParseCell:(d)=>{if(d.section==='body'){const isT=d.row.raw[0]==='TOTAL';if(isT){d.cell.styles.fontStyle='bold';d.cell.styles.textColor=GREEN;d.cell.styles.fillColor=[10,40,30];}if(!isT&&d.column.index===3){d.cell.styles.textColor=AMBER;d.cell.styles.fontStyle='bold';}}}
  });
  y=doc.lastAutoTable.finalY+20;
  secTitle('New Items Worth Adding', ACC);
  doc.autoTable({
    startY:y, margin:{left:M,right:M},
    head:[['Category','Item','Price/Case','Use Case','Vendor']],
    body:DATA.newItemsToAdd.map(r=>[r.category,r.item,`$${r.price.toFixed(2)}`,r.useCase,r.vendor]),
    styles:{fillColor:BG,textColor:TEXT,fontSize:8,cellPadding:5},
    headStyles:{fillColor:HEAD,textColor:SUB,fontStyle:'bold',fontSize:8},
    alternateRowStyles:{fillColor:[12,18,32]},
    columnStyles:{2:{textColor:AMBER,fontStyle:'bold'}}
  });

  newPage();
  secTitle('Priority Action Plan', ACC);
  const acts=[...DATA.priorityActions.immediate.map(r=>({...r,tier:'Immediate'})),...DATA.priorityActions.nextMenuCycle.map(r=>({...r,tier:'Next Cycle'})),...DATA.priorityActions.quarterly.map(r=>({...r,tier:'Quarterly'}))];
  doc.autoTable({
    startY:y, margin:{left:M,right:M},
    head:[['#','Tier','Action','Detail','Impact']],
    body:acts.map(r=>[r.num,r.tier,r.action,r.detail,r.impact||'']),
    styles:{fillColor:BG,textColor:TEXT,fontSize:8,cellPadding:5},
    headStyles:{fillColor:HEAD,textColor:SUB,fontStyle:'bold',fontSize:8},
    alternateRowStyles:{fillColor:[12,18,32]},
    columnStyles:{0:{halign:'center',fontStyle:'bold'}},
    didParseCell:(d)=>{if(d.section==='body'&&d.column.index===1){const t=d.row.raw[1];d.cell.styles.fontStyle='bold';d.cell.styles.textColor=t==='Immediate'?RED:t==='Next Cycle'?AMBER:ACC;}}
  });

  const total=doc.internal.getNumberOfPages();
  for(let i=1;i<=total;i++){doc.setPage(i);doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(...SUB);doc.text(`Page ${i} of ${total}`,pageW-M-60,pageH-12);}
  doc.save('Jefferson-County-Menu-Analysis.pdf');
  showToast('PDF downloaded — 4 pages');
}

function exportSectionExcel(key) {
  if (typeof XLSX === 'undefined') { showToast('Loading...','error'); return; }
  const wb = XLSX.utils.book_new();
  const configs = {
    switch:    { name:'Switch to Shaver', h:['Item','PFG Price','PFG Unit','Shaver Price','Shaver Unit','Savings/Case','Priority'], rows: DATA.switchToShaver.map(r=>[r.item,r.pfgPrice,r.pfgUnit,r.shaverPrice,r.shaverUnit,r.savings||r.note||'',r.priority.toUpperCase()]) },
    keep:      { name:'Keep with PFG',    h:['Item','PFG Price','Shaver Price','PFG Savings','Notes'], rows: DATA.keepWithPFG.map(r=>[r.item,r.pfgPrice,r.shaverPrice,r.pfgSavings||'',r.unitNote||'']) },
    savings:   { name:'Monthly Savings',  h:['Item','Qty/Month','Savings/Case','Monthly Savings'], rows: DATA.monthlySavings.map(r=>[r.item,r.qtyPerMonth||'',r.savingsPerCase||'',r.monthlySavings]) },
    newItems:  { name:'New Items',        h:['Category','Item','Price','Use Case','Vendor'], rows: DATA.newItemsToAdd.map(r=>[r.category,r.item,r.price,r.useCase,r.vendor]) },
    catalog:   { name:'Shaver Catalog',   h:['Category','Item','Pack/Unit','Price'], rows: Object.keys(DATA.catalog).flatMap(k=>{ const l=k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase()); return DATA.catalog[k].map(i=>[l,i.item,i.pack,i.price]); }) },
  };
  const c = configs[key]; if (!c) return;
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([c.h, ...c.rows]), c.name);
  XLSX.writeFile(wb, `${c.name.toLowerCase().replace(/\s+/g,'-')}.xlsx`);
  showToast(`Excel: ${c.name}`);
}

function exportSectionCSV(key) {
  const configs = {
    switch:   { file:'switch-to-shaver.csv',  h:'Item,PFG Price,PFG Unit,Shaver Price,Shaver Unit,Savings/Case,Priority', rows: DATA.switchToShaver.map(r=>`"${r.item}",${r.pfgPrice},"${r.pfgUnit}",${r.shaverPrice},"${r.shaverUnit}","${r.savings||r.note||''}",${r.priority.toUpperCase()}`) },
    keep:     { file:'keep-with-pfg.csv',     h:'Item,PFG Price,Shaver Price,PFG Savings,Notes', rows: DATA.keepWithPFG.map(r=>`"${r.item}",${r.pfgPrice},${r.shaverPrice},"${r.pfgSavings||''}","${r.unitNote||''}"`) },
    savings:  { file:'monthly-savings.csv',   h:'Item,Qty/Month,Savings/Case,Monthly Savings', rows: DATA.monthlySavings.map(r=>`"${r.item}",${r.qtyPerMonth||''},${r.savingsPerCase||''},${r.monthlySavings}`) },
    newItems: { file:'new-items.csv',         h:'Category,Item,Price,Use Case,Vendor', rows: DATA.newItemsToAdd.map(r=>`"${r.category}","${r.item}",${r.price},"${r.useCase}","${r.vendor}"`) },
    catalog:  { file:'shaver-catalog.csv',    h:'Category,Item,Pack/Unit,Price', rows: Object.keys(DATA.catalog).flatMap(k=>{ const l=k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase()); return DATA.catalog[k].map(i=>`"${l}","${i.item}","${i.pack}",${i.price}`); }) },
  };
  const c = configs[key]; if (!c) return;
  downloadBlob(new Blob([[c.h, ...c.rows].join('\n')], {type:'text/csv;charset=utf-8;'}), c.file);
  showToast(`CSV: ${c.file}`);
}

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  document.getElementById('hamburger').addEventListener('click', toggleSidebar);
  document.getElementById('overlay').addEventListener('click', () => { if(window.innerWidth<=768){sidebarOpen=false;applySidebarState(true);} });
  document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => { if(window.innerWidth<=768){sidebarOpen=false;applySidebarState(true);} }));
  window.addEventListener('resize', () => applySidebarState(false));
  setTimeout(renderChart, 150);
  initScrollSpy();
  initDropdowns();
  initCatalog();
});
