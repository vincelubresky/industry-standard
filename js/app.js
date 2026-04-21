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
  if (localStorage.getItem(TAB_KEY) === 'report') setTimeout(renderReportCharts, 80);
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
    { label: 'Grits',        val: 192.84 },
    { label: 'Cake Mixes',   val: 64.00  },
    { label: 'Potato Flakes',val: 54.11  },
    { label: 'Oats',         val: 40.92  },
    { label: 'Onion+Garlic', val: 22.48  },
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
    'Industry Standard — Food Service Management — Jefferson County Jail', `Prepared: April 2026`, '',
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
    doc.text('INDUSTRY STANDARD  |  Food Service Management  |  Jefferson County Jail', M, 18);
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
  doc.text('Industry Standard', M, 80);
  doc.setFontSize(18); doc.setTextColor(...SUB);
  doc.text('Jefferson County Jail — Food Service Management', M, 108);
  doc.setFillColor(...HEAD); doc.roundedRect(M,126,pageW-M*2,72,6,6,'F');
  doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(...SUB);
  doc.text('Prepared by: Industry Standard  ·  April 2026', M+16, 150);
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

/* ── Shaver Order List Exports ───────────────────────────── */
const ORDER_LIST_SWITCH = [
  { item: 'Grape Drink Mix',          unit: '1000/1gm',    price: 20.63, savings: 'saves $29.32' },
  { item: 'Grits Quick',              unit: '50 LB',       price: 28.00, savings: 'saves ~$16.07 (per 40 LB eq.)' },
  { item: 'Great Northern Beans Dry', unit: '50 LB',       price: 39.00, savings: 'saves $17.05' },
  { item: 'Gravy Mix (Country)',       unit: '6/3 LB',      price: 37.82, savings: 'saves ~$17.31 (per 6 LB eq.)' },
  { item: 'Rotini Pasta',             unit: '2/10 LB',     price: 13.73, savings: 'saves $10.10' },
  { item: 'Onion Powder',             unit: '6/1 LB',      price: 24.64, savings: 'saves ~$11.73 (per 5 LB eq.)' },
  { item: 'Garlic Powder',            unit: '6/1 LB',      price: 24.02, savings: 'saves ~$10.75 (per 5 LB eq.)' },
  { item: 'Jelly Assorted 200ct',     unit: '200 LC',      price: 9.53,  savings: 'saves $9.67' },
  { item: 'Carrots Sliced Frozen',    unit: '20 LB',       price: 14.34, savings: 'saves $8.09' },
  { item: 'Ziti Pasta',               unit: '2/10 LB',     price: 13.73, savings: 'saves $8.04' },
  { item: 'Potato Flakes Dehydrated', unit: '40 LB',       price: 51.62, savings: 'saves $7.73' },
  { item: 'Cheese Sauce',             unit: '6/10',        price: 48.12, savings: 'saves $6.97' },
  { item: 'Oats / Oatmeal',           unit: '50 LB',       price: 28.33, savings: 'saves $6.82' },
  { item: 'Elbow Macaroni',           unit: '2/10 LB',     price: 13.10, savings: 'saves $6.71' },
];

function exportOrderExcel() {
  if (typeof XLSX === 'undefined') { showToast('Loading...','error'); return; }
  const wb = XLSX.utils.book_new();

  const switchRows = ORDER_LIST_SWITCH.map(r => [r.item, r.unit, `$${r.price.toFixed(2)}`, r.savings]);
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
    ['SHAVER ORDER LIST — Jefferson County Jail', '', '', ''],
    ['Prepared by Industry Standard  ·  $5+ savings items only', '', '', ''],
    [''],
    ['SWITCH FROM PFG TO SHAVER  (14 items)'],
    ['Item', 'Unit', 'Shaver Price', 'vs PFG'],
    ...switchRows,
    [''],
    ['NEW ITEMS TO ADD FROM SHAVER  (18 items)'],
    ['Category', 'Item', 'Price', 'Use'],
    ...DATA.newItemsToAdd.map(r => [r.category, r.item, `$${r.price.toFixed(2)}`, r.useCase])
  ]), 'Shaver Order List');

  XLSX.writeFile(wb, 'Shaver-Order-List-Jefferson-County.xlsx');
  showToast('Excel downloaded');
}

function exportOrderCSV() {
  const switchRows = ORDER_LIST_SWITCH.map(r =>
    `"${r.item}","${r.unit}",$${r.price.toFixed(2)},"${r.savings}"`
  );
  const newRows = DATA.newItemsToAdd.map(r =>
    `"${r.category}","${r.item}",${r.price},"${r.useCase}"`
  );
  const lines = [
    'SHAVER ORDER LIST — Jefferson County Jail',
    'Prepared by Industry Standard — $5+ savings items only',
    '',
    'SWITCH FROM PFG TO SHAVER (14 items)',
    'Item,Unit,Shaver Price,vs PFG',
    ...switchRows,
    '',
    'NEW ITEMS TO ADD FROM SHAVER',
    'Category,Item,Price,Use',
    ...newRows
  ];
  downloadBlob(new Blob([lines.join('\n')], {type:'text/csv;charset=utf-8;'}), 'Shaver-Order-List-Jefferson-County.csv');
  showToast('CSV downloaded');
}

function exportOrderPDF() {
  if (typeof jspdf === 'undefined') { showToast('Loading...','error'); return; }
  const { jsPDF } = jspdf;
  const doc = new jsPDF({ orientation:'portrait', unit:'pt', format:'letter' });
  const M = 40, pageW = doc.internal.pageSize.getWidth();
  const DARK = [10,21,38], MID = [44,64,96], SUB = [85,104,128], GRN = [16,185,129], AMB = [245,158,11];

  doc.setFillColor(...DARK); doc.rect(0,0,pageW,72,'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(18); doc.setTextColor(240,246,255);
  doc.text('Shaver Order List', M, 32);
  doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(...SUB);
  doc.text('Jefferson County Jail  ·  Industry Standard  ·  April 2026', M, 52);

  let y = 90;
  const sectionHeader = (title, color) => {
    doc.setFillColor(...color); doc.roundedRect(M, y, pageW-M*2, 22, 3, 3, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(255,255,255);
    doc.text(title, M+10, y+15); y += 30;
  };

  sectionHeader('SWITCH FROM PFG TO SHAVER  (14 items · $5+ savings · ~$1,130/mo)', GRN);
  doc.autoTable({
    startY: y,
    head: [['Item','Unit','Shaver Price','vs PFG']],
    body: ORDER_LIST_SWITCH.map(r => [r.item, r.unit, `$${r.price.toFixed(2)}`, r.savings]),
    margin: {left:M, right:M},
    styles: {fontSize:9, cellPadding:4},
    headStyles: {fillColor:[16,185,129], textColor:255},
    alternateRowStyles: {fillColor:[240,248,245]},
    columnStyles: {2:{halign:'right'}, 3:{halign:'right'}},
    theme:'grid'
  });

  y = doc.lastAutoTable.finalY + 20;
  if (y > doc.internal.pageSize.getHeight() - 80) { doc.addPage(); y = 40; }
  sectionHeader('NEW ITEMS TO ADD FROM SHAVER  (18 items)', [59,130,246]);
  doc.autoTable({
    startY: y,
    head: [['Category','Item','Price','Use']],
    body: DATA.newItemsToAdd.map(r => [r.category, r.item, `$${r.price.toFixed(2)}`, r.useCase]),
    margin: {left:M, right:M},
    styles: {fontSize:9, cellPadding:4},
    headStyles: {fillColor:[59,130,246], textColor:255},
    alternateRowStyles: {fillColor:[240,244,255]},
    columnStyles: {2:{halign:'right'}},
    theme:'grid'
  });

  const total = doc.internal.getNumberOfPages();
  for(let i=1;i<=total;i++){doc.setPage(i);doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(...SUB);doc.text(`Page ${i} of ${total}`,pageW-M-40,doc.internal.pageSize.getHeight()-12);}
  doc.save('Shaver-Order-List-Jefferson-County.pdf');
  showToast('PDF downloaded');
}

/* ── Weekly Report Charts ────────────────────────────────── */
function renderReportCharts() {
  if (typeof Chart === 'undefined') return;
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const textColor  = isDark ? '#8ba5c0' : '#556880';
  const gridColor  = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
  const tooltipBg  = isDark ? '#1a2540' : '#fff';
  const tooltipTxt = isDark ? '#f0f6ff' : '#0a1526';

  // Revenue comparison chart
  const revCtx = document.getElementById('revChart');
  if (revCtx) {
    if (revCtx._chart) revCtx._chart.destroy();
    const bham = REPORT.locations.birmingham;
    const bess = REPORT.locations.bessemer;
    const cats    = ['Population','Cafe / Academy / JBS','Soft Trays','Milk','JBS / Other'];
    const bhamRev = [50447.63, 9654.60, 5460.00, 2130.00, 0];
    const bessRev = [14665.38, 3181.50, 1890.00,  600.00, 0];
    revCtx._chart = new Chart(revCtx, {
      type: 'bar',
      data: {
        labels: ['Population','Cafe+Acad+JBS','Soft Trays','Milk'],
        datasets: [
          { label: 'Birmingham', data: [50447.63, 9654.60, 5460.00, 2130.00], backgroundColor: 'rgba(59,130,246,0.75)', borderColor: 'rgba(59,130,246,1)', borderWidth: 1.5, borderRadius: 5 },
          { label: 'Bessemer',   data: [14665.38, 3181.50, 1890.00,  600.00], backgroundColor: 'rgba(167,139,250,0.75)', borderColor: 'rgba(167,139,250,1)', borderWidth: 1.5, borderRadius: 5 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor, font: { size: 11 } } },
          tooltip: { backgroundColor: tooltipBg, titleColor: tooltipTxt, bodyColor: textColor, borderColor: gridColor, borderWidth: 1, padding: 10, callbacks: { label: c => ` $${c.raw.toLocaleString('en-US', {minimumFractionDigits:2})}` } }
        },
        scales: {
          x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } },
          y: { ticks: { color: textColor, font: { size: 11 }, callback: v => '$' + (v >= 1000 ? (v/1000).toFixed(0)+'K' : v) }, grid: { color: gridColor } }
        }
      }
    });
  }

  // COGS % chart
  const cogsCtx = document.getElementById('cogsChart');
  if (cogsCtx) {
    if (cogsCtx._chart) cogsCtx._chart.destroy();
    const cats    = ['Population','Cafe / Acad / JBS','Soft Trays','Milk'];
    const bhamPct = [29.01, 44.52, 47.07, 65.00];
    const bessPct = [44.81, 69.75, 47.07, 65.00];
    cogsCtx._chart = new Chart(cogsCtx, {
      type: 'bar',
      data: {
        labels: cats,
        datasets: [
          { label: 'Birmingham %', data: bhamPct, backgroundColor: 'rgba(59,130,246,0.70)', borderColor: 'rgba(59,130,246,1)', borderWidth: 1.5, borderRadius: 5 },
          { label: 'Bessemer %',   data: bessPct, backgroundColor: 'rgba(167,139,250,0.70)', borderColor: 'rgba(167,139,250,1)', borderWidth: 1.5, borderRadius: 5 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor, font: { size: 11 } } },
          tooltip: { backgroundColor: tooltipBg, titleColor: tooltipTxt, bodyColor: textColor, borderColor: gridColor, borderWidth: 1, padding: 10, callbacks: { label: c => ` ${c.raw.toFixed(2)}% COGS` } }
        },
        scales: {
          x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } },
          y: { min: 0, max: 80, ticks: { color: textColor, font: { size: 11 }, callback: v => v + '%' }, grid: { color: gridColor } }
        }
      }
    });
  }
}

/* ── Weekly Report Exports ───────────────────────────────── */
function exportReportExcel() {
  if (typeof XLSX === 'undefined') { showToast('Loading…', 'error'); return; }
  const wb = XLSX.utils.book_new();
  const add = (name, headers, rows) => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([headers, ...rows]), name);

  add('Revenue', ['Category','Birmingham $','Bham %','Bessemer $','Bess %'],
    [...REPORT.locations.birmingham.revenue.items.map(r => {
      const b = REPORT.locations.bessemer.revenue.items.find(x => x.cat === r.cat);
      return [r.cat, r.amount, r.pct + '%', b ? b.amount : 0, b ? b.pct + '%' : '—'];
    }),
    ['TOTAL', REPORT.locations.birmingham.revenue.total, '', REPORT.locations.bessemer.revenue.total, '']]
  );
  add('COGS', ['Category','Birmingham $','Bham %','Bessemer $','Bess %'],
    [...REPORT.locations.birmingham.materialCOGS.items.map((r,i) => {
      const b = REPORT.locations.bessemer.materialCOGS.items[i] || {};
      return [r.cat, r.amount, r.pct + '%', b.amount || '', b.pct ? b.pct + '%' : ''];
    }),
    ['Total Material', REPORT.locations.birmingham.materialCOGS.total, REPORT.locations.birmingham.materialCOGS.totalPct + '%', REPORT.locations.bessemer.materialCOGS.total, REPORT.locations.bessemer.materialCOGS.totalPct + '%'],
    ['Labor', REPORT.locations.birmingham.labor.amount, REPORT.locations.birmingham.labor.pct + '%', REPORT.locations.bessemer.labor.amount, REPORT.locations.bessemer.labor.pct + '%'],
    ['Total COGS', REPORT.locations.birmingham.totalCOGS.amount, REPORT.locations.birmingham.totalCOGS.pct + '%', REPORT.locations.bessemer.totalCOGS.amount, REPORT.locations.bessemer.totalCOGS.pct + '%']]
  );
  add('Payroll & Net', ['Line','Birmingham $','% Rev.','Bessemer $','% Rev.'],
    [['Salaries', REPORT.locations.birmingham.payroll.salaries.amount, REPORT.locations.birmingham.payroll.salaries.pct + '%', REPORT.locations.bessemer.payroll.salaries.amount, REPORT.locations.bessemer.payroll.salaries.pct + '%'],
    ['Employer Taxes', REPORT.locations.birmingham.payroll.taxes.amount, REPORT.locations.birmingham.payroll.taxes.pct + '%', REPORT.locations.bessemer.payroll.taxes.amount, REPORT.locations.bessemer.payroll.taxes.pct + '%'],
    ['NET / Location', REPORT.locations.birmingham.netLocation.amount, REPORT.locations.birmingham.netLocation.pct + '%', REPORT.locations.bessemer.netLocation.amount, REPORT.locations.bessemer.netLocation.pct + '%'],
    ['TOTAL WEEKLY NET', REPORT.weeklyNet, REPORT.netMarginPct + '%', '', '']]
  );
  XLSX.writeFile(wb, `Weekly-Report-${REPORT.week.replace(/[–,\s]+/g,'-')}.xlsx`);
  showToast('Weekly Report Excel downloaded — 3 sheets');
}

function exportReportCSV() {
  const lines = [
    `Industry Standard — Weekly Report — ${REPORT.week}`, '',
    '=== REVENUE ===',
    'Category,Birmingham $,Bham %,Bessemer $,Bess %',
    ...REPORT.locations.birmingham.revenue.items.map(r => {
      const b = REPORT.locations.bessemer.revenue.items.find(x => x.cat === r.cat);
      return `"${r.cat}",${r.amount},${r.pct}%,${b ? b.amount : ''},${b ? b.pct + '%' : ''}`;
    }),
    `"TOTAL",${REPORT.locations.birmingham.revenue.total},,${REPORT.locations.bessemer.revenue.total},`,
    '', '=== COGS ===',
    'Category,Birmingham $,Bham %,Bessemer $,Bess %',
    ...REPORT.locations.birmingham.materialCOGS.items.map((r,i) => {
      const b = REPORT.locations.bessemer.materialCOGS.items[i] || {};
      return `"${r.cat}",${r.amount},${r.pct}%,${b.amount||''},${b.pct ? b.pct+'%' : ''}`;
    }),
    `"Total Material COGS",${REPORT.locations.birmingham.materialCOGS.total},${REPORT.locations.birmingham.materialCOGS.totalPct}%,${REPORT.locations.bessemer.materialCOGS.total},${REPORT.locations.bessemer.materialCOGS.totalPct}%`,
    `"Labor",${REPORT.locations.birmingham.labor.amount},${REPORT.locations.birmingham.labor.pct}%,${REPORT.locations.bessemer.labor.amount},${REPORT.locations.bessemer.labor.pct}%`,
    `"Total COGS",${REPORT.locations.birmingham.totalCOGS.amount},${REPORT.locations.birmingham.totalCOGS.pct}%,${REPORT.locations.bessemer.totalCOGS.amount},${REPORT.locations.bessemer.totalCOGS.pct}%`,
    '', '=== PAYROLL & NET ===',
    'Line,Birmingham $,% Rev,Bessemer $,% Rev',
    `"Salaries",${REPORT.locations.birmingham.payroll.salaries.amount},${REPORT.locations.birmingham.payroll.salaries.pct}%,${REPORT.locations.bessemer.payroll.salaries.amount},${REPORT.locations.bessemer.payroll.salaries.pct}%`,
    `"Employer Taxes",${REPORT.locations.birmingham.payroll.taxes.amount},${REPORT.locations.birmingham.payroll.taxes.pct}%,${REPORT.locations.bessemer.payroll.taxes.amount},${REPORT.locations.bessemer.payroll.taxes.pct}%`,
    `"NET / Location",${REPORT.locations.birmingham.netLocation.amount},${REPORT.locations.birmingham.netLocation.pct}%,${REPORT.locations.bessemer.netLocation.amount},${REPORT.locations.bessemer.netLocation.pct}%`,
    `"TOTAL WEEKLY NET",${REPORT.weeklyNet},${REPORT.netMarginPct}%,,`
  ];
  downloadBlob(new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' }), `Weekly-Report-${REPORT.week.replace(/[–,\s]+/g,'-')}.csv`);
  showToast('Weekly Report CSV downloaded');
}

/* ── Tabs ─────────────────────────────────────────────────── */
const TAB_KEY = 'is_tab';

function switchTab(tab, persist = true) {
  if (persist) localStorage.setItem(TAB_KEY, tab);

  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  // Show/hide sections
  document.querySelectorAll('.analysis-section').forEach(s => {
    s.style.display = (tab === 'analysis') ? 'block' : 'none';
  });
  const calcSection = document.getElementById('cost-calculator');
  if (calcSection) calcSection.style.display = (tab === 'calculator') ? 'block' : 'none';

  document.querySelectorAll('.report-section').forEach(s => {
    s.style.display = (tab === 'report') ? 'block' : 'none';
  });

  document.querySelectorAll('.cafe-section').forEach(s => {
    s.style.display = (tab === 'cafe') ? 'block' : 'none';
  });
  document.querySelectorAll('.pop-section').forEach(s => {
    s.style.display = (tab === 'pop') ? 'block' : 'none';
  });
  // CEO tab: show only summary by default; sub-sections shown via showCeoSection()
  document.querySelectorAll('.ceo-section').forEach(s => s.style.display = 'none');
  if (tab === 'ceo') {
    const sumSection = document.getElementById('ceo-summary');
    if (sumSection) sumSection.style.display = 'block';
  }

  // Show/hide bid tracker
  const bidWrap = document.getElementById('bid-tracker-wrap');
  if (bidWrap) bidWrap.style.display = (tab === 'bids') ? 'block' : 'none';

  // Show/hide financials
  const finWrap = document.getElementById('financials-wrap');
  if (finWrap) finWrap.style.display = (tab === 'financials') ? 'block' : 'none';

  // Show/hide menus
  const menusWrap = document.getElementById('menus-wrap');
  if (menusWrap) menusWrap.style.display = (tab === 'menus') ? 'block' : 'none';

  // Show/hide tab-specific nav labels and items
  document.querySelectorAll('.nav-section-label[data-tab="report"], .nav-item[data-tab="report"]').forEach(el => {
    el.style.display = (tab === 'report') ? '' : 'none';
  });
  document.querySelectorAll('.nav-section-label[data-tab="bids"], .nav-item[data-tab="bids"]').forEach(el => {
    el.style.display = (tab === 'bids') ? '' : 'none';
  });
  document.querySelectorAll('.nav-section-label[data-tab="menus"], .nav-item[data-tab="menus"]').forEach(el => {
    el.style.display = (tab === 'menus') ? '' : 'none';
  });
  document.querySelectorAll('.nav-section-label[data-tab="cafe"], .nav-item[data-tab="cafe"]').forEach(el => {
    el.style.display = (tab === 'cafe') ? '' : 'none';
  });
  document.querySelectorAll('.nav-section-label[data-tab="pop"], .nav-item[data-tab="pop"]').forEach(el => {
    el.style.display = (tab === 'pop') ? '' : 'none';
  });
  document.querySelectorAll('.nav-section-label[data-tab="ceo"], .nav-item[data-tab="ceo"]').forEach(el => {
    el.style.display = (tab === 'ceo') ? '' : 'none';
  });
  document.querySelectorAll('.nav-section-label[data-tab="analysis"], .nav-item[data-tab="analysis"]').forEach(el => {
    el.style.display = (tab === 'analysis') ? '' : 'none';
  });
  document.querySelectorAll('.nav-section-label[data-tab="financials"], .nav-item[data-tab="financials"]').forEach(el => {
    el.style.display = (tab === 'financials') ? '' : 'none';
  });

  // Sync active nav item
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (tab === 'calculator') {
    const el = document.querySelector('.nav-item[data-tab="calculator"]');
    if (el) el.classList.add('active');
  }
  if (tab === 'report') {
    const el = document.querySelector('.nav-item[href="#report-overview"]');
    if (el) el.classList.add('active');
  }
  if (tab === 'bids') {
    const el = document.querySelector('.nav-item[href="#bids-open"]');
    if (el) el.classList.add('active');
  }
  if (tab === 'cafe') {
    const el = document.querySelector('.nav-item[href="#cafe-overview"]');
    if (el) el.classList.add('active');
  }
  if (tab === 'pop') {
    const el = document.querySelector('.nav-item[href="#pop-overview"]');
    if (el) el.classList.add('active');
  }
  if (tab === 'ceo') {
    const el = document.querySelector('.nav-item[href="#ceo-summary"]');
    if (el) el.classList.add('active');
  }
  if (tab === 'analysis') {
    const el = document.querySelector('.nav-item[data-tab="analysis"]');
    if (el) el.classList.add('active');
  }

  // Render report charts when switching to report tab
  if (tab === 'report') setTimeout(renderReportCharts, 80);

  // Scroll to top on switch
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── CEO Section Navigation ───────────────────────────────── */
function showCeoSection(id) {
  // Hide all CEO sections, show only the target
  document.querySelectorAll('.ceo-section').forEach(s => s.style.display = 'none');
  const target = document.getElementById(id);
  if (target) {
    target.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update sidebar active state
  document.querySelectorAll('.nav-item[data-tab="ceo"]').forEach(n => n.classList.remove('active'));
  const navLink = document.querySelector(`.nav-item[href="#${id}"]`);
  if (navLink) navLink.classList.add('active');
}

function initTabs() {
  // v6: Nav cleanup — analysis sidebar items now tab-gated
  const VER_KEY = 'is_tab_ver';
  if (localStorage.getItem(VER_KEY) !== '6') {
    localStorage.removeItem(TAB_KEY);
    localStorage.setItem(VER_KEY, '6');
  }
  const saved = localStorage.getItem(TAB_KEY) || 'ceo';
  switchTab(saved, false);

  // Tab-switching nav links — switches tab and optionally scrolls to anchor
  document.querySelectorAll('.nav-item[data-tab]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchTab(el.dataset.tab);
      const href = el.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.getElementById(href.slice(1));
        if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 140);
      }
      if (window.innerWidth <= 768) { sidebarOpen = false; applySidebarState(true); }
    });
  });

  // Report nav links — also scroll within report pane
  document.querySelectorAll('.nav-item[href^="#report-"]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchTab('report');
      const target = document.getElementById(el.getAttribute('href').slice(1));
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      if (window.innerWidth <= 768) { sidebarOpen = false; applySidebarState(true); }
    });
  });

  // CEO nav links
  document.querySelectorAll('.nav-item[href^="#ceo-"]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchTab('ceo');
      const target = document.getElementById(el.getAttribute('href').slice(1));
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      if (window.innerWidth <= 768) { sidebarOpen = false; applySidebarState(true); }
    });
  });

  // Café nav links — switch to café tab then scroll to section
  document.querySelectorAll('.nav-item[href^="#cafe-"]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchTab('cafe');
      const target = document.getElementById(el.getAttribute('href').slice(1));
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      if (window.innerWidth <= 768) { sidebarOpen = false; applySidebarState(true); }
    });
  });

  // Population nav links — switch to population tab then scroll to section
  document.querySelectorAll('.nav-item[href^="#pop-"]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchTab('pop');
      const target = document.getElementById(el.getAttribute('href').slice(1));
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      if (window.innerWidth <= 768) { sidebarOpen = false; applySidebarState(true); }
    });
  });

  // Fallback: any remaining anchor nav items without data-tab → analysis tab
  document.querySelectorAll('.nav-item[href^="#"]:not([data-tab])').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchTab('analysis');
      const id = el.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 140);
      if (window.innerWidth <= 768) { sidebarOpen = false; applySidebarState(true); }
    });
  });
}

/* ══════════════════════════════════════════════════════════
   MEAL COST CALCULATOR
   ══════════════════════════════════════════════════════════ */

const CALC_MEALS = {
  breakfast: [
    { id: 'b0', name: 'Oatmeal (plain)',          cost: 0.24 },
    { id: 'b1', name: 'Oatmeal + Raisins',        cost: 0.31 },
    { id: 'b2', name: 'Grits Bowl + Jelly',       cost: 0.28 },
    { id: 'b3', name: 'Pancakes + Syrup',         cost: 0.35 },
    { id: 'b4', name: 'Waffles + Syrup',          cost: 0.35 },
    { id: 'b5', name: 'French Toast',             cost: 0.43 },
    { id: 'b6', name: 'Biscuits & Gravy',         cost: 0.34 },
    { id: 'b7', name: 'Eggs + Sausage + Bread',   cost: 0.45 },
  ],
  lunch: [
    { id: 'l0',  name: 'Navy Bean Soup + Cornbread',  cost: 0.32 },
    { id: 'l1',  name: 'Pinto Beans & Rice',          cost: 0.35 },
    { id: 'l2',  name: 'Southern Beans & Rice',       cost: 0.38 },
    { id: 'l3',  name: 'Mac & Cheese + Veg',          cost: 0.39 },
    { id: 'l4',  name: 'Lentil Soup + Cornbread',     cost: 0.40 },
    { id: 'l5',  name: 'Pasta + Tomato Sauce + TVP',  cost: 0.44 },
    { id: 'l6',  name: 'Chili Mac',                   cost: 0.49 },
    { id: 'l7',  name: 'Beef & Veg Stew (TVP)',       cost: 0.52 },
    { id: 'l8',  name: 'Tuna Noodle Casserole',       cost: 0.56 },
    { id: 'l9',  name: 'Fish Patty + Rice + Veg',     cost: 0.59 },
    { id: 'l10', name: 'Bean & Cheese Burrito Plate', cost: 0.64 },
    { id: 'l11', name: 'Turkey Meatball Marinara',    cost: 0.68 },
    { id: 'l12', name: 'Chicken Corn Dog + Veg',      cost: 0.80 },
  ],
  dinner: [
    { id: 'd0', name: 'PB&J Sandwich',          cost: 0.28 },
    { id: 'd1', name: 'Tuna Salad Sandwich',    cost: 0.30 },
    { id: 'd2', name: 'Bologna Sandwich',       cost: 0.32 },
    { id: 'd3', name: 'Turkey Sandwich',        cost: 0.35 },
    { id: 'd4', name: 'Salami Sandwich',        cost: 0.38 },
    { id: 'd5', name: 'Lentil Soup + Bread',    cost: 0.38 },
    { id: 'd6', name: 'Fish Sandwich',          cost: 0.40 },
    { id: 'd7', name: 'Chicken Patty Sandwich', cost: 0.45 },
  ],
};

const PLANNER_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

// Default 7-day plan: [breakfastId, lunchId, dinnerId]
const DEFAULT_PLAN = [
  ['b1', 'l1',  'd0'],  // Mon
  ['b3', 'l3',  'd2'],  // Tue
  ['b2', 'l8',  'd1'],  // Wed
  ['b4', 'l6',  'd3'],  // Thu
  ['b0', 'l10', 'd4'],  // Fri
  ['b6', 'l0',  'd5'],  // Sat
  ['b5', 'l9',  'd6'],  // Sun
];

function initCalculator() {
  const grid = document.getElementById('plannerGrid');
  if (!grid) return;

  const types = ['breakfast', 'lunch', 'dinner'];
  const labels = ['🌅 Breakfast', '☀️ Lunch', '🌙 Dinner'];
  const rowClasses = ['breakfast', 'lunch', 'dinner'];

  let html = '<div class="planner-header-cell"></div>';
  PLANNER_DAYS.forEach(d => { html += `<div class="planner-header-cell">${d}</div>`; });

  types.forEach((type, ti) => {
    html += `<div class="planner-row-label ${rowClasses[ti]}-label">${labels[ti]}</div>`;
    PLANNER_DAYS.forEach((d, di) => {
      const defaultId = DEFAULT_PLAN[di][ti];
      const opts = CALC_MEALS[type].map(m =>
        `<option value="${m.id}"${m.id === defaultId ? ' selected' : ''}>${m.name} — $${m.cost.toFixed(2)}</option>`
      ).join('');
      html += `<div class="planner-cell"><select class="planner-select ${rowClasses[ti]}-select" data-day="${di}" data-type="${type}" onchange="calcUpdate()">${opts}</select></div>`;
    });
  });

  html += '<div class="planner-row-label total-label">Day Total</div>';
  PLANNER_DAYS.forEach((d, di) => {
    html += `<div class="planner-cell planner-total-cell" id="dayTotal_${di}">—</div>`;
  });

  grid.innerHTML = html;
  calcUpdate();
}

function calcUpdate() {
  const inmateCount = parseInt(document.getElementById('inmateInput').value) || 1150;
  const target = parseFloat(document.getElementById('targetInput').value) || 0.65;
  const types = ['breakfast', 'lunch', 'dinner'];

  const plan = PLANNER_DAYS.map(() => ({ breakfast: null, lunch: null, dinner: null }));
  document.querySelectorAll('.planner-select').forEach(sel => {
    const di = parseInt(sel.dataset.day);
    const type = sel.dataset.type;
    plan[di][type] = CALC_MEALS[type].find(m => m.id === sel.value) || CALC_MEALS[type][0];
  });

  const fmt  = n => `$${Math.round(n).toLocaleString('en-US')}`;
  const fmtC = n => `$${n.toFixed(2)}`;

  let weeklyServingCost = 0;
  const tbody = document.getElementById('calcBreakdownBody');
  if (tbody) tbody.innerHTML = '';

  PLANNER_DAYS.forEach((day, di) => {
    const b = plan[di].breakfast, l = plan[di].lunch, d = plan[di].dinner;
    const dayCostPP = (b?.cost || 0) + (l?.cost || 0) + (d?.cost || 0);
    const dayTotal  = dayCostPP * inmateCount;
    weeklyServingCost += dayCostPP;

    const cell = document.getElementById(`dayTotal_${di}`);
    if (cell) cell.textContent = fmt(dayTotal);

    if (tbody) {
      const blended = dayCostPP / 3;
      const rowCls  = blended > target * 1.05 ? 'row-over' : blended < target * 0.90 ? 'row-under' : '';
      tbody.innerHTML += `<tr class="${rowCls}">
        <td><strong>${day}</strong></td>
        <td>${b?.name || '—'}</td><td class="right"><span class="price-shaver">${fmtC(b?.cost || 0)}</span></td>
        <td>${l?.name || '—'}</td><td class="right"><span class="price-shaver">${fmtC(l?.cost || 0)}</span></td>
        <td>${d?.name || '—'}</td><td class="right"><span class="price-shaver">${fmtC(d?.cost || 0)}</span></td>
        <td class="right"><span class="savings-val">${fmt(dayTotal)}</span></td>
      </tr>`;
    }
  });

  const weeklyTotal  = weeklyServingCost * inmateCount;
  const monthlyTotal = weeklyTotal * 4.33;
  const blendedAvg   = weeklyServingCost / 7 / 3;
  const vsTarget     = blendedAvg - target;

  function setKpi(id, val, colorClass) {
    const el = document.getElementById(id);
    if (!el) return;
    const lbl = el.querySelector('.calc-kpi-lbl').textContent;
    el.innerHTML = `<span class="calc-kpi-val ${colorClass}">${val}</span><span class="calc-kpi-lbl">${lbl}</span>`;
  }

  setKpi('kpiDailyTotal',   fmt(weeklyTotal / 7),  '');
  setKpi('kpiWeeklyTotal',  fmt(weeklyTotal),       '');
  setKpi('kpiMonthlyTotal', fmt(monthlyTotal),      '');
  setKpi('kpiBlendedAvg',   fmtC(blendedAvg),       blendedAvg > target ? 'kpi-over' : blendedAvg < target * 0.90 ? 'kpi-under' : 'kpi-good');

  const absV = Math.abs(vsTarget);
  const statusText  = absV < 0.005 ? 'On Target' : vsTarget > 0 ? `+${fmtC(vsTarget)} over` : `${fmtC(absV)} under`;
  const statusClass = vsTarget > 0.02 ? 'kpi-over' : vsTarget < -0.05 ? 'kpi-under' : 'kpi-good';
  setKpi('kpiBudgetStatus', statusText, statusClass);

  const tfoot = document.getElementById('calcBreakdownFoot');
  if (tfoot) {
    tfoot.innerHTML = `
      <tr class="calc-tfoot-row">
        <td colspan="7" style="text-align:right;font-weight:700">Weekly Total &nbsp;<span style="color:var(--text-400);font-weight:400">(${inmateCount.toLocaleString()} inmates × 3 meals × 7 days)</span></td>
        <td class="right"><span class="savings-val" style="color:var(--green)">${fmt(weeklyTotal)}</span></td>
      </tr>
      <tr class="calc-tfoot-row">
        <td colspan="7" style="text-align:right;font-weight:700">Monthly Estimate &nbsp;<span style="color:var(--text-400);font-weight:400">(× 4.33 weeks)</span></td>
        <td class="right"><span class="savings-val" style="color:var(--green)">${fmt(monthlyTotal)}</span></td>
      </tr>
      <tr class="calc-tfoot-row">
        <td colspan="7" style="text-align:right;font-weight:700">Blended Avg / Meal &nbsp;<span style="color:var(--text-400);font-weight:400">target: ${fmtC(target)}</span></td>
        <td class="right"><span class="savings-val" style="${vsTarget > 0.02 ? 'color:var(--red)' : 'color:var(--green)'}">${fmtC(blendedAvg)}</span></td>
      </tr>`;
  }
}

function resetPlanner() {
  PLANNER_DAYS.forEach((d, di) => {
    document.querySelectorAll(`.planner-select[data-day="${di}"]`).forEach(sel => {
      const ti = ['breakfast','lunch','dinner'].indexOf(sel.dataset.type);
      sel.value = DEFAULT_PLAN[di][ti];
    });
  });
  calcUpdate();
  showToast('Planner reset to defaults');
}

/* ── Print Menu ───────────────────────────────────────────── */
function printMenu() {
  renderPrintMenu();
  window.print();
}

function renderPrintMenu() {
  const wrap = document.getElementById('print-menu-wrap');
  if (!wrap || typeof MENU_ROTATION === 'undefined') return;

  const DAYS_FULL = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const prepared  = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  let html = '';

  MENU_ROTATION.forEach((week, wi) => {
    const allMeals  = week.days.flatMap(d => [d.breakfast, d.lunch, d.dinner]);
    const avgCost   = (allMeals.reduce((s,m) => s + parseFloat(m.cost.replace('$','')), 0) / allMeals.length).toFixed(2);
    const avgCal    = Math.round(allMeals.reduce((s,m) => s + (m.cal||0), 0) / allMeals.length);
    const isLast    = wi === MENU_ROTATION.length - 1;

    html += `<div class="pm-page${isLast ? '' : ' pm-break'}">

      <!-- Page header -->
      <div class="pm-header">
        <div class="pm-header-left">
          <div class="pm-facility">Jefferson County Jail</div>
          <div class="pm-doc-title">2-Week Menu Rotation &mdash; <strong>${week.label}</strong></div>
          <div class="pm-prepared">Prepared by Industry Standard &bull; ${prepared}</div>
        </div>
        <div class="pm-header-right">
          <div class="pm-week-badge">Week ${week.week} of 2</div>
        </div>
      </div>

      <!-- Menu table -->
      <table class="pm-table">
        <thead>
          <tr>
            <th class="pm-th pm-th-meal">Meal</th>
            ${DAYS_FULL.map(d => `<th class="pm-th">${d}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${['breakfast','lunch','dinner'].map(key => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return `<tr>
              <td class="pm-row-label pm-${key}">${label}</td>
              ${week.days.map(day => {
                const meal    = day[key];
                const sides   = (meal.sides || []).join(', ');
                return `<td class="pm-cell pm-${key}">
                  <div class="pm-main">${meal.main}</div>
                  <div class="pm-protein">${meal.protein}</div>
                  <div class="pm-sides">${sides}</div>
                  <div class="pm-nums">${meal.cost}<span class="pm-cal-sep">&nbsp;&middot;&nbsp;</span>${meal.cal}&thinsp;cal</div>
                </td>`;
              }).join('')}
            </tr>`;
          }).join('')}
          <tr class="pm-totals-row">
            <td class="pm-row-label pm-totals-lbl">Daily<br>Total</td>
            ${week.days.map(day => {
              const cal  = (day.breakfast.cal||0) + (day.lunch.cal||0) + (day.dinner.cal||0);
              const cost = (parseFloat(day.breakfast.cost.replace('$','')) +
                            parseFloat(day.lunch.cost.replace('$',''))    +
                            parseFloat(day.dinner.cost.replace('$',''))).toFixed(2);
              return `<td class="pm-total-cell">
                <span class="pm-total-cal ${cal >= 2500 ? 'pm-ok' : 'pm-low'}">${cal.toLocaleString()}&thinsp;cal</span>
                <span class="pm-total-cost">$${cost}</span>
              </td>`;
            }).join('')}
          </tr>
        </tbody>
      </table>

      <!-- Summary bar -->
      <div class="pm-summary">
        <span class="pm-sum-item">&#10003; Protein in every meal</span>
        <span class="pm-sum-item">Avg cost: <strong>$${avgCost}</strong> / meal</span>
        <span class="pm-sum-item">Avg calories: <strong>${avgCal.toLocaleString()}</strong> / meal</span>
        <span class="pm-sum-right">Industry Standard &bull; Jefferson County Jail</span>
      </div>

    </div>`;
  });

  wrap.innerHTML = html;
}

/* ── Menu Rotation ────────────────────────────────────────── */
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function renderMenuRotation() {
  showMenuWeek(0);
  renderMealIdeas();
  renderProteinComparison();
  renderProteinVendors();
  renderBigDaddyInvoice();
}

function getBdInmateCount() {
  const el = document.getElementById('bdInmateInput');
  return (el ? parseInt(el.value) : 0) || 1400;
}

function renderBigDaddyInvoice() {
  const container = document.getElementById('bdInvoiceContainer');
  if (!container || typeof BIG_DADDY_INVOICE === 'undefined') return;
  const inv = BIG_DADDY_INVOICE;
  const inmateCount = getBdInmateCount();
  const f  = v  => v  != null ? '$' + v.toFixed(2) : '—';
  const fc = v  => v  != null ? '$' + v.toFixed(3) : '—';
  const fn = v  => v  != null ? v.toLocaleString() : '—';

  // ── Invoice header ──────────────────────────────────────────
  let html = `<div class="bd-inv-header">
    <div class="bd-inv-brand">
      <div class="bd-inv-name">Big Daddy Foods, Inc.</div>
      <div class="bd-inv-pills">
        <span class="bd-pill"><strong>S.O.#</strong> ${inv.soNumber}</span>
        <span class="bd-pill"><strong>Invoice Date</strong> ${inv.invoiceDate}</span>
        <span class="bd-pill"><strong>Ship Date</strong> ${inv.shipDate}</span>
        <span class="bd-pill"><strong>Due</strong> ${inv.dueDate}</span>
        <span class="bd-pill"><strong>Terms</strong> ${inv.terms}</span>
      </div>
    </div>
    <div class="bd-inv-total-box">
      <div class="bd-inv-total-lbl">Invoice Total</div>
      <div class="bd-inv-total-val">${f(inv.total)}</div>
      <div class="bd-inv-total-sub">${inv.items.length} line items</div>
    </div>
  </div>`;

  // ── Line-items table ────────────────────────────────────────
  html += `<div class="bd-table-scroll"><table class="bd-table">
    <thead><tr>
      <th>Item Code</th><th>Description</th><th>Pack</th>
      <th class="r">Cases</th><th class="r">$/Case</th><th class="r">Line Total</th>
      <th class="r">Total LB</th><th class="r">$/LB</th>
      <th class="r">$/2 oz</th><th class="r">$/3 oz</th><th class="r">$/4 oz</th>
      <th>Menu Use</th>
    </tr></thead>
    <tbody>`;

  inv.items.forEach(item => {
    const isPatty = item.perUnit != null && !item.per2oz;
    html += `<tr>
      <td class="bd-code">${item.code}</td>
      <td class="bd-desc">${item.description}</td>
      <td class="bd-pack">${item.pack}</td>
      <td class="r">${item.casesOrdered}</td>
      <td class="r">${f(item.casePrice)}</td>
      <td class="r bd-linetotal">${f(item.lineTotal)}</td>
      <td class="r">${fn(item.totalLbs)}</td>
      <td class="r">${fc(item.perLb)}</td>
      <td class="r">${item.per2oz != null ? f(item.per2oz) : (item.perUnit != null ? f(item.perUnit)+'/ea' : '—')}</td>
      <td class="r">${item.per3oz != null ? f(item.per3oz) : (item.per2pc != null ? f(item.per2pc)+'/2pc' : '—')}</td>
      <td class="r">${item.per4oz != null ? f(item.per4oz) : (item.per3pc != null ? f(item.per3pc)+'/3pc' : '—')}</td>
      <td class="bd-use">${item.menuUse}</td>
    </tr>`;
  });

  html += `</tbody><tfoot><tr class="bd-grand">
    <td colspan="5" class="r" style="font-weight:800">Grand Total</td>
    <td class="r bd-linetotal" style="font-size:15px;font-weight:900">${f(inv.total)}</td>
    <td colspan="6"></td>
  </tr></tfoot></table></div>`;

  // ── Per-item detail cards ────────────────────────────────────
  html += `<div class="bd-detail-grid">`;
  inv.items.forEach(item => {
    const hasPortions = item.per2oz != null || item.per2pc != null || item.perUnit != null;

    // Portion rows
    let portionRows = '';
    if (item.per2oz  != null) portionRows += `<tr><td>2 oz serving</td><td class="r bd-price-em">${f(item.per2oz)}</td><td class="r">${fn(item.servPerCase['2oz'])}/case · ${fn(item.totalServings['2oz'])} total</td></tr>`;
    if (item.per3oz  != null) portionRows += `<tr><td>3 oz serving</td><td class="r bd-price-em">${f(item.per3oz)}</td><td class="r">${fn(item.servPerCase['3oz'])}/case · ${fn(item.totalServings['3oz'])} total</td></tr>`;
    if (item.per4oz  != null) portionRows += `<tr><td>4 oz serving</td><td class="r bd-price-em">${f(item.per4oz)}</td><td class="r">${fn(item.servPerCase['4oz'])}/case · ${fn(item.totalServings['4oz'])} total</td></tr>`;
    if (item.per2pc  != null) portionRows += `<tr><td>2 pancakes</td><td class="r bd-price-em">${f(item.per2pc)}</td><td class="r">${fn(item.servPerCase['2pc'])}/case · ${fn(item.totalServings['2pc'])} total</td></tr>`;
    if (item.per3pc  != null) portionRows += `<tr><td>3 pancakes</td><td class="r bd-price-em">${f(item.per3pc)}</td><td class="r">${fn(item.servPerCase['3pc'])}/case · ${fn(item.totalServings['3pc'])} total</td></tr>`;
    if (item.perUnit != null) portionRows += `<tr><td>1 patty (3.2 oz)</td><td class="r bd-price-em">${f(item.perUnit)}</td><td class="r">${fn(item.servPerCase['1 patty'])}/case · ${fn(item.totalServings['1 patty'])} total</td></tr>`;

    // Savings rows
    let savingsHtml = '';
    if (item.vs && item.vs.length) {
      item.vs.filter(v => v.savings > 0).forEach(v => {
        savingsHtml += `<div class="bd-savings-row">
          <div class="bd-savings-label">vs ${v.label}</div>
          <div class="bd-savings-nums">
            <span class="bd-save-chip">-${f(v.savings)}/serving</span>
            <span class="bd-save-chip">${v.pct}% cheaper</span>
            ${v.annual300 > 0 ? `<span class="bd-save-chip bd-save-annual">~$${Math.round(v.annual300 / 300 * inmateCount).toLocaleString()}/yr at ${inmateCount.toLocaleString()} inmates</span>` : ''}
          </div>
        </div>`;
      });
    }

    html += `<div class="bd-detail-card">
      <div class="bd-detail-header">
        <div class="bd-detail-code">${item.code}</div>
        <div class="bd-detail-desc">${item.description}</div>
        <div class="bd-detail-meta">${item.pack} · ${item.casesOrdered} cases · ${f(item.lineTotal)} total</div>
      </div>
      <div class="bd-detail-body">
        <div class="bd-portion-wrap">
          <table class="bd-portion-table">
            <thead><tr><th>Portion</th><th class="r">$/Serving</th><th class="r">Servings</th></tr></thead>
            <tbody>${portionRows}</tbody>
          </table>
        </div>
        <div class="bd-detail-right">
          <div class="bd-kpi-row">
            <div class="bd-kpi"><div class="bd-kpi-val">${f(item.casePrice)}</div><div class="bd-kpi-lbl">Per Case</div></div>
            <div class="bd-kpi"><div class="bd-kpi-val">${fc(item.perLb)}</div><div class="bd-kpi-lbl">Per LB</div></div>
            <div class="bd-kpi"><div class="bd-kpi-val">${fn(item.totalLbs)}</div><div class="bd-kpi-lbl">Total LB</div></div>
          </div>
          <div class="bd-use-note"><i class="fa-solid fa-utensils" style="opacity:.5;margin-right:5px"></i>${item.menuUse}</div>
          ${savingsHtml}
        </div>
      </div>
    </div>`;
  });
  html += `</div>`;

  // ── Savings summary banner ───────────────────────────────────
  const allSavings = inv.items.flatMap(i => (i.vs || []).filter(v => v.annual300 > 0));
  if (allSavings.length) {
    const totalAnnual300 = allSavings.reduce((s, v) => s + v.annual300, 0);
    const totalAnnualDynamic = Math.round(totalAnnual300 / 300 * inmateCount);
    html += `<div class="bd-savings-banner">
      <div class="bd-savings-banner-icon"><i class="fa-solid fa-piggy-bank"></i></div>
      <div>
        <div class="bd-savings-banner-title">Estimated Annual Savings at ${inmateCount.toLocaleString()} Inmates</div>
        <div class="bd-savings-banner-detail">Switching chicken protein to Big Daddy (PP90377) vs current vendors</div>
      </div>
      <div class="bd-savings-banner-val">~$${totalAnnualDynamic.toLocaleString()}/yr</div>
    </div>`;
  }

  container.innerHTML = html;
}

function renderProteinVendors() {
  const container = document.getElementById('proteinVendorsContainer');
  if (!container || typeof PROTEIN_VENDORS === 'undefined') return;

  let html = '';
  PROTEIN_VENDORS.forEach(item => {
    html += `<div class="vendor-card">
      <div class="vendor-card-header">
        <div class="vendor-card-title">${item.name}</div>
        <div class="vendor-card-meta">
          <span class="vendor-card-used"><i class="fa-solid fa-utensils" style="opacity:.5;margin-right:4px"></i>${item.usedIn}</span>
          <span class="vendor-card-serving">Serving: ${item.servingSize}</span>
        </div>
      </div>
      <div class="vendor-tiles">`;

    ['pfg', 'shaver', 'bigDaddy'].forEach(key => {
      const v = item.vendors[key];
      const isBest    = v.status === 'best';
      const isCurrent = v.status === 'current';
      const isQuote   = v.status === 'quote';

      let badge = '';
      if (isBest)    badge = '<span class="vendor-badge best">Best Price</span>';
      else if (isCurrent) badge = '<span class="vendor-badge current">Current</span>';
      else if (isQuote)   badge = '<span class="vendor-badge quote">Get Quote</span>';
      else               badge = '<span class="vendor-badge avail">Available</span>';

      const priceHtml = v.perServing != null
        ? `<div class="vendor-tile-price">$${v.perServing.toFixed(2)}<span class="vendor-tile-unit">/serving</span></div>
           <div class="vendor-tile-meal">~$${(v.perServing + 0.25).toFixed(2)}<span class="vendor-tile-unit"> est/meal</span></div>`
        : `<div class="vendor-tile-price tbd">—</div>`;

      const packHtml = v.pack
        ? `<div class="vendor-tile-pack">${v.pack}${v.casePrice ? ` · $${v.casePrice.toFixed(2)}/case` : ''}</div>`
        : '';

      html += `<div class="vendor-tile${isBest ? ' tile-best' : ''}${isQuote ? ' tile-quote' : ''}">
          <div class="vendor-tile-label">${v.label}</div>
          ${badge}
          ${priceHtml}
          ${packHtml}
          <div class="vendor-tile-note">${v.note}</div>
        </div>`;
    });

    html += `</div></div>`;
  });

  container.innerHTML = html;
}

/* ── Price Reference Modal ────────────────────────────────── */
function showPriceRef(refKey) {
  const data = window._pvtRefs && window._pvtRefs[refKey];
  if (!data) return;

  const modal   = document.getElementById('price-ref-modal');
  const overlay = document.getElementById('price-ref-overlay');
  const content = document.getElementById('price-ref-content');
  if (!modal || !content) return;

  const { protein, serving, vendorKey, vendorLabel, pack, casePrice, perLb, perServing, note, status, priceVerified, ref } = data;

  const VENDOR_COLORS = { pfg: '#60a5fa', shaver: '#34d399', bigDaddy: '#f59e0b' };
  const color = VENDOR_COLORS[vendorKey] || 'var(--accent)';

  const fmtD = v => v != null ? '$' + v.toFixed(2) : '—';
  const fmtT = v => v != null ? '$' + v.toFixed(3) : '—';

  // Verification badge
  const verifiedBadge = priceVerified
    ? `<span class="prf-badge prf-verified"><i class="fa-solid fa-circle-check"></i> Verified from source document</span>`
    : `<span class="prf-badge prf-unverified"><i class="fa-solid fa-triangle-exclamation"></i> Estimated — confirm before use</span>`;

  // Source block
  const sourceBlock = ref ? `
    <div class="prf-source-block">
      <div class="prf-source-label">Source Document</div>
      <div class="prf-source-doc"><i class="fa-solid fa-file-invoice" style="margin-right:8px;opacity:.6"></i>${ref.sourceDoc}</div>
      <div class="prf-source-date"><i class="fa-solid fa-calendar" style="margin-right:8px;opacity:.5"></i>${ref.sourceDate}</div>
    </div>
    <div class="prf-item-block">
      <div class="prf-source-label">Item Description</div>
      <div class="prf-item-desc">${ref.itemDesc}</div>
    </div>
    <div class="prf-calc-block">
      <div class="prf-source-label">Price Calculation</div>
      <div class="prf-calc-detail"><i class="fa-solid fa-calculator" style="margin-right:8px;opacity:.5"></i>${ref.calcDetail}</div>
      ${ref.invoiceLineTotal ? `<div class="prf-line-total"><i class="fa-solid fa-receipt" style="margin-right:8px;opacity:.5"></i>Invoice line total: <strong>${ref.invoiceLineTotal}</strong></div>` : ''}
    </div>
    ${ref.caveat ? `<div class="prf-caveat"><i class="fa-solid fa-circle-exclamation" style="margin-right:7px;color:var(--amber)"></i>${ref.caveat}</div>` : ''}
    ${ref.bdInvoiceSection ? `<div class="prf-bd-link"><i class="fa-solid fa-file-invoice-dollar" style="margin-right:7px;color:var(--amber)"></i>Full invoice detail available in the <strong>Big Daddy Invoice</strong> section of this report.</div>` : ''}
  ` : `<div class="prf-no-ref"><i class="fa-solid fa-circle-info" style="margin-right:7px;color:var(--text-400)"></i>No source document on file. A quote has been requested.</div>`;

  // Price tiles
  const priceRows = [];
  if (pack)       priceRows.push(`<div class="prf-kpi"><div class="prf-kpi-val">${pack}</div><div class="prf-kpi-lbl">Pack Size</div></div>`);
  if (casePrice)  priceRows.push(`<div class="prf-kpi"><div class="prf-kpi-val">${fmtD(casePrice)}</div><div class="prf-kpi-lbl">Per Case</div></div>`);
  if (perLb)      priceRows.push(`<div class="prf-kpi"><div class="prf-kpi-val">${fmtT(perLb)}</div><div class="prf-kpi-lbl">Per LB</div></div>`);
  if (perServing) priceRows.push(`<div class="prf-kpi prf-kpi-serving"><div class="prf-kpi-val" style="color:${color}">${fmtD(perServing)}</div><div class="prf-kpi-lbl">Per Serving<br><small>(${serving})</small></div></div>`);

  content.innerHTML = `
    <div class="prf-header" style="border-left:4px solid ${color}">
      <div class="prf-header-top">
        <div>
          <div class="prf-protein-name">${protein}</div>
          <div class="prf-vendor-name" style="color:${color}">${vendorLabel}</div>
        </div>
        ${verifiedBadge}
      </div>
      ${priceRows.length ? `<div class="prf-kpi-row">${priceRows.join('')}</div>` : ''}
    </div>
    <div class="prf-body">
      ${sourceBlock}
    </div>`;

  overlay.classList.add('open');
  modal.classList.add('open');
  // Trap focus
  setTimeout(() => modal.querySelector('.prf-close').focus(), 50);
}

function closePriceRef() {
  document.getElementById('price-ref-modal').classList.remove('open');
  document.getElementById('price-ref-overlay').classList.remove('open');
}

// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePriceRef(); });

function renderProteinComparison() {
  const container = document.getElementById('pfgSummaryContainer');
  if (!container || typeof PROTEIN_VENDORS === 'undefined') return;

  const VENDOR_KEYS   = ['pfg', 'shaver', 'bigDaddy'];
  const VENDOR_LABELS = { pfg: 'PFG', shaver: 'Shaver', bigDaddy: 'Big Daddy' };

  // Build a lookup table so onclick can find the right data
  window._pvtRefs = {};
  PROTEIN_VENDORS.forEach(item => {
    VENDOR_KEYS.forEach(key => {
      const v = item.vendors[key];
      const refKey = `${item.name}||${key}`;
      window._pvtRefs[refKey] = {
        protein:       item.name,
        serving:       item.servingSize,
        usedIn:        item.usedIn,
        vendorKey:     key,
        vendorLabel:   v.label,
        pack:          v.pack,
        casePrice:     v.casePrice,
        perLb:         v.perLb,
        perServing:    v.perServing,
        note:          v.note,
        status:        v.status,
        priceVerified: v.priceVerified || false,
        ref:           v.ref || null
      };
    });
  });

  let html = `<div class="pvt-wrap">
    <div class="pvt-header">
      <div class="pvt-title"><i class="fa-solid fa-table" style="margin-right:8px;opacity:.6"></i>Full Vendor Comparison — All Proteins at a Glance</div>
      <div class="pvt-subtitle">Every protein in the current rotation &nbsp;&middot;&nbsp; per-serving cost &nbsp;&middot;&nbsp; <strong>click any price</strong> to see source document &amp; calculation</div>
    </div>
    <div class="pvt-scroll">
    <table class="pvt-table">
      <thead>
        <tr>
          <th class="pvt-th pvt-th-name">Protein</th>
          <th class="pvt-th pvt-th-srv">Serving</th>
          <th class="pvt-th pvt-th-pfg">PFG <span class="pvt-th-hint">click $</span></th>
          <th class="pvt-th pvt-th-shaver">Shaver ISP <span class="pvt-th-hint">click $</span></th>
          <th class="pvt-th pvt-th-bd">Big Daddy <span class="pvt-th-hint">click $</span></th>
          <th class="pvt-th pvt-th-best">Best Price</th>
          <th class="pvt-th pvt-th-use">Menu Use</th>
        </tr>
      </thead>
      <tbody>`;

  PROTEIN_VENDORS.forEach(item => {
    const prices    = VENDOR_KEYS.map(k => item.vendors[k].perServing);
    const validPrices = prices.filter(p => p != null);
    const minPrice  = validPrices.length ? Math.min(...validPrices) : null;
    const bestKey   = minPrice != null ? VENDOR_KEYS.find(k => item.vendors[k].perServing === minPrice) : null;

    const fmtCell = (key) => {
      const v = item.vendors[key];
      const refKey = `${item.name}||${key}`.replace(/'/g, "\\'");
      if (v.perServing == null) {
        return `<td class="pvt-td pvt-tbd" onclick="showPriceRef('${refKey}')" title="Click for details">
          <span class="pvt-nd">—</span>
          <div class="pvt-quote-btn">View Details</div>
        </td>`;
      }
      const isBest    = v.perServing === minPrice;
      const isVerified = v.priceVerified;
      return `<td class="pvt-td pvt-price-cell${isBest ? ' pvt-best-cell' : ''}" onclick="showPriceRef('${refKey}')" title="Click to view source &amp; calculation">
        <span class="pvt-price-val">$${v.perServing.toFixed(2)}</span>${isBest ? '<span class="pvt-best-star">★</span>' : ''}
        ${isVerified ? '<span class="pvt-verified-dot" title="Verified from source document"></span>' : '<span class="pvt-unverified-dot" title="Estimated — click to see notes"></span>'}
        <div class="pvt-click-hint">See source</div>
      </td>`;
    };

    const savingVsPfg = (item.vendors.pfg.perServing != null && item.vendors.bigDaddy.perServing != null)
      ? (item.vendors.pfg.perServing - item.vendors.bigDaddy.perServing) : null;
    const savingTag = savingVsPfg != null && savingVsPfg > 0.005
      ? `<span class="pvt-save-tag">-$${savingVsPfg.toFixed(2)} vs PFG</span>` : '';

    html += `<tr class="pvt-row">
      <td class="pvt-td pvt-td-name">${item.name}</td>
      <td class="pvt-td pvt-td-srv">${item.servingSize}</td>
      ${fmtCell('pfg')}
      ${fmtCell('shaver')}
      ${fmtCell('bigDaddy')}
      <td class="pvt-td pvt-td-best">
        <span class="pvt-best-chip pvt-best-${bestKey || 'none'}">${bestKey ? VENDOR_LABELS[bestKey] : '—'}</span>
        ${savingTag}
      </td>
      <td class="pvt-td pvt-td-use">${item.usedIn}</td>
    </tr>`;
  });

  html += `</tbody></table></div>
    <div class="pvt-legend">
      <span class="pvt-leg-item"><span class="pvt-verified-dot"></span> Verified from invoice/price list</span>
      <span class="pvt-leg-item"><span class="pvt-unverified-dot"></span> Estimated — confirm before use</span>
      <span class="pvt-leg-item"><span class="pvt-best-star" style="font-size:12px">★</span> Lowest price in row</span>
      <span class="pvt-leg-item pvt-leg-click"><i class="fa-solid fa-hand-pointer" style="margin-right:4px"></i>Click any price to see source document &amp; calculation</span>
    </div>
  </div>`;
  container.innerHTML = html;
}

/* ── PDF Export ───────────────────────────────────────────── */
function downloadMenuPDF() {
  if (typeof window.jspdf === 'undefined') { showToast('PDF library loading — try again in a moment', 'error'); return; }
  const { jsPDF } = window.jspdf;
  const doc       = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter' });
  const DAYS_FULL = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const prepared  = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const pageW     = doc.internal.pageSize.getWidth();   // 792 pt
  const pageH     = doc.internal.pageSize.getHeight();  // 612 pt
  const mg        = 36;

  MENU_ROTATION.forEach((week, wi) => {
    if (wi > 0) doc.addPage('letter', 'landscape');

    // ── Header band ──────────────────────────────────────────
    doc.setFillColor(30, 58, 95);
    doc.rect(mg, mg, pageW - mg * 2, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Jefferson County Jail', mg + 12, mg + 18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(`2-Week Menu Rotation \u2014 ${week.label}`, mg + 12, mg + 33);
    doc.text(`Prepared by Industry Standard  \u00b7  ${prepared}`, mg + 12, mg + 46);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Week ${week.week} of 2`, pageW - mg - 12, mg + 32, { align: 'right' });

    // ── Menu table ───────────────────────────────────────────
    const BF_CLR = [255, 251, 235];
    const LN_CLR = [239, 246, 255];
    const DN_CLR = [240, 253, 244];
    const TL_CLR = [243, 244, 246];

    const bodyRows = ['breakfast', 'lunch', 'dinner'].map((key) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      return [label, ...week.days.map(day => {
        const m    = day[key];
        const side = (m.sides || []).slice(0, 2).join(', ');
        return `${m.main}\n${m.protein}${side ? '\n' + side : ''}\n${m.cost}  ${m.cal} cal`;
      })];
    });

    const totalsRow = ['Daily\nTotal', ...week.days.map(day => {
      const cal  = (day.breakfast.cal||0) + (day.lunch.cal||0) + (day.dinner.cal||0);
      const cost = (parseFloat(day.breakfast.cost.replace('$','')) +
                    parseFloat(day.lunch.cost.replace('$',''))    +
                    parseFloat(day.dinner.cost.replace('$',''))).toFixed(2);
      return `${cal.toLocaleString()} cal\n$${cost}`;
    })];
    bodyRows.push(totalsRow);

    doc.autoTable({
      startY: mg + 56,
      margin: { left: mg, right: mg },
      head: [['Meal', ...DAYS_FULL]],
      body: bodyRows,
      tableWidth: pageW - mg * 2,
      styles: {
        fontSize: 7, overflow: 'linebreak', valign: 'top',
        cellPadding: { top: 4, bottom: 3, left: 4, right: 3 },
        lineColor: [210, 210, 210], lineWidth: 0.4
      },
      headStyles: {
        fillColor: [30, 58, 95], textColor: 255,
        fontSize: 8, fontStyle: 'bold', halign: 'center', cellPadding: 5
      },
      columnStyles: {
        0: { cellWidth: 46, fontStyle: 'bold', halign: 'center', valign: 'middle', fillColor: [245, 247, 250] }
      },
      didParseCell: function(data) {
        if (data.section !== 'body' || data.column.index === 0) return;
        const clrs = [BF_CLR, LN_CLR, DN_CLR, TL_CLR];
        data.cell.styles.fillColor = clrs[data.row.index];
        if (data.row.index === 3) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.halign    = 'center';
          data.cell.styles.fontSize  = 8;
        }
      }
    });

    // ── Footer bar ───────────────────────────────────────────
    const allMeals = week.days.flatMap(d => [d.breakfast, d.lunch, d.dinner]);
    const avgCost  = (allMeals.reduce((s,m) => s + parseFloat(m.cost.replace('$','')), 0) / allMeals.length).toFixed(2);
    const avgCal   = Math.round(allMeals.reduce((s,m) => s + (m.cal||0), 0) / allMeals.length);
    const footY    = doc.lastAutoTable.finalY + 8;

    doc.setDrawColor(30, 58, 95);
    doc.setLineWidth(1.2);
    doc.line(mg, footY, pageW - mg, footY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(70, 70, 70);
    doc.text('\u2713 Protein in every meal', mg, footY + 11);
    doc.text(`Avg cost: $${avgCost} / meal`, mg + 145, footY + 11);
    doc.text(`Avg calories: ${avgCal.toLocaleString()} / meal`, mg + 300, footY + 11);
    doc.setTextColor(170, 170, 170);
    doc.text('Industry Standard  \u00b7  Jefferson County Jail', pageW - mg, footY + 11, { align: 'right' });

    doc.setFontSize(6.5);
    doc.text(`Page ${wi + 1} of ${MENU_ROTATION.length}`, pageW - mg, pageH - 18, { align: 'right' });
  });

  doc.save('Jefferson-County-2-Week-Menu.pdf');
  showToast('Menu PDF downloaded \u2014 4 pages', 'success');
}

function showMenuWeek(weekIdx) {
  // Update buttons
  document.querySelectorAll('.menu-week-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.week) === weekIdx);
  });

  const week = MENU_ROTATION[weekIdx];
  const grid = document.getElementById('menuGrid');
  if (!grid || !week) return;

  const mealTypes = [
    { key: 'breakfast', label: 'Breakfast', cls: 'breakfast b-cell' },
    { key: 'lunch',     label: 'Lunch',     cls: 'lunch l-cell' },
    { key: 'dinner',    label: 'Dinner',    cls: 'dinner d-cell' }
  ];

  let html = '<div class="menu-grid-scroll"><div class="menu-grid">';

  // Header row
  html += '<div class="menu-grid-header">Meal</div>';
  DAYS.forEach(d => {
    html += `<div class="menu-grid-header">${d.slice(0,3)}</div>`;
  });

  // One row per meal type
  mealTypes.forEach(({ key, label, cls }) => {
    const [labelCls, cellCls] = cls.split(' ');
    html += `<div class="menu-row-label ${labelCls}">${label}</div>`;
    const alts = (typeof MEAL_ALTS !== 'undefined' && MEAL_ALTS[key]) ? MEAL_ALTS[key] : [];
    week.days.forEach(day => {
      const meal = day[key];
      const sidesStr = meal.sides && meal.sides.length ? meal.sides.join(' · ') : '';
      const seenProteins = new Set([meal.protein]);
      const altOpts = alts.filter(a => {
        if (a.main === meal.main) return false;
        if (seenProteins.has(a.protein)) return false;
        seenProteins.add(a.protein);
        return true;
      });
      const altHtml = altOpts.length
        ? `<div class="menu-cell-alts">
            <span class="menu-cell-alt-label">Options:</span>
            ${altOpts.slice(0,5).map(a =>
              `<span class="menu-cell-alt-chip${a.vendor === 'BD' ? ' chip-bd' : ''}" title="${a.main}">
                ${a.protein}<span class="chip-cost">${a.cost}</span>
              </span>`
            ).join('')}
          </div>`
        : '';
      html += `<div class="menu-cell ${cellCls}">
        <div class="menu-cell-main">${meal.main}</div>
        ${meal.protein ? `<span class="menu-cell-protein"><i class="fa-solid fa-drumstick-bite"></i> ${meal.protein}</span>` : ''}
        ${sidesStr ? `<div class="menu-cell-sides">${sidesStr}</div>` : ''}
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:5px">
          <span class="menu-cell-cost">${meal.cost}</span>
          <span class="menu-cell-cal">${meal.cal} cal</span>
        </div>
        ${altHtml}
      </div>`;
    });
  });

  // Daily totals row
  html += '<div class="menu-row-label" style="color:var(--text-400);font-size:9px;line-height:1.3">Daily<br>Total</div>';
  week.days.forEach(day => {
    const totalCal  = (day.breakfast.cal || 0) + (day.lunch.cal || 0) + (day.dinner.cal || 0);
    const totalCost = (parseFloat(day.breakfast.cost.replace('$','')) +
                       parseFloat(day.lunch.cost.replace('$','')) +
                       parseFloat(day.dinner.cost.replace('$',''))).toFixed(2);
    const calColor  = totalCal >= 2500 ? 'var(--success)' : 'var(--amber)';
    html += `<div class="menu-cell" style="text-align:center;padding:10px 6px;border-bottom:none">
      <div style="font-size:12px;font-weight:800;color:${calColor}">~${totalCal.toLocaleString()}</div>
      <div style="font-size:10px;color:var(--text-400);margin-bottom:4px">cal</div>
      <div style="font-size:12px;font-weight:800;color:var(--text-200)">$${totalCost}</div>
      <div style="font-size:10px;color:var(--text-400)">/ day</div>
    </div>`;
  });

  html += '</div></div>'; // close .menu-grid + .menu-grid-scroll

  // Weekly summary bar
  const allMeals = week.days.flatMap(d => [d.breakfast, d.lunch, d.dinner]);
  const weekAvgCost = (allMeals.reduce((s,m) => s + parseFloat(m.cost.replace('$','')), 0) / allMeals.length).toFixed(2);
  const weekAvgCal  = Math.round(allMeals.reduce((s,m) => s + (m.cal||0), 0) / allMeals.length);
  html += `<div class="menu-week-summary">
    <span><i class="fa-solid fa-drumstick-bite" style="color:var(--success);margin-right:5px"></i>Protein in every meal</span>
    <span><i class="fa-solid fa-dollar-sign" style="color:var(--accent);margin-right:4px"></i>Avg <strong>$${weekAvgCost}</strong> / meal</span>
    <span><i class="fa-solid fa-fire" style="color:var(--amber);margin-right:4px"></i>Avg <strong>${weekAvgCal.toLocaleString()}</strong> cal / meal</span>
  </div>`;
  grid.innerHTML = html;
}

function renderMealIdeas() {
  const container = document.getElementById('mealIdeasContainer');
  if (!container || typeof MEAL_IDEAS === 'undefined') return;

  const categories = [
    { key: 'breakfast', label: 'Breakfast Ideas', icon: 'fa-sun',       color: 'var(--amber)' },
    { key: 'lunch',     label: 'Lunch Ideas',      icon: 'fa-bowl-food', color: 'var(--accent)' },
    { key: 'dinner',    label: 'Dinner / Sandwich Ideas', icon: 'fa-bread-slice', color: 'var(--success)' },
    { key: 'sides',     label: 'Sides & Desserts', icon: 'fa-apple-whole', color: 'var(--text-300)' }
  ];

  let html = '';
  categories.forEach(({ key, label, icon, color }) => {
    const items = MEAL_IDEAS[key] || [];
    html += `<div class="ideas-category-label"><i class="fa-solid ${icon}" style="color:${color};margin-right:6px"></i>${label}</div>`;
    html += '<div class="ideas-grid">';
    items.forEach(item => {
      html += `<div class="idea-card">
        <div class="idea-card-top">
          <div class="idea-card-name">${item.name}</div>
          <div class="idea-card-cost">${item.cost}</div>
        </div>
        <div class="idea-card-note">${item.note}</div>
      </div>`;
    });
    html += '</div>';
  });

  container.innerHTML = html;
}

/* ── Bid Tracker ──────────────────────────────────────────── */
function renderBidTracker() {
  const myStatusMeta = {
    won:         { label: 'Active Contract', cls: '#22c55e',  bg: 'rgba(34,197,94,0.12)'   },
    prospecting: { label: 'Prospecting',     cls: '#f59e0b',  bg: 'rgba(245,158,11,0.12)'  },
    contacted:   { label: 'Contacted',       cls: '#22d3ee',  bg: 'rgba(34,211,238,0.12)'  },
    submitted:   { label: 'Bid Submitted',   cls: '#60a5fa',  bg: 'rgba(96,165,250,0.12)'  },
    monitoring:  { label: 'Monitoring',      cls: '#a78bfa',  bg: 'rgba(167,139,250,0.12)' },
    lost:        { label: 'Not Awarded',     cls: '#f87171',  bg: 'rgba(248,113,113,0.12)' }
  };

  function myStatusBadge(s) {
    const m = myStatusMeta[s] || { label: s, cls: '#94a3b8', bg: 'rgba(148,163,184,0.12)' };
    return `<span style="font-size:10px;font-weight:700;letter-spacing:.05em;padding:2px 10px;border-radius:20px;background:${m.bg};color:${m.cls};border:1px solid ${m.cls}33;white-space:nowrap">${m.label}</span>`;
  }

  function contactLine(c) {
    if (!c) return '';
    const parts = [];
    if (c.name) parts.push(`<span><i class="fa-solid fa-user" style="color:var(--accent);margin-right:4px"></i><strong>${c.name}</strong>${c.title ? ' — ' + c.title : ''}</span>`);
    if (c.phone) parts.push(`<span><i class="fa-solid fa-phone" style="color:var(--accent);margin-right:4px"></i><a href="tel:${c.phone.replace(/\D/g,'')}" style="color:var(--accent)">${c.phone}</a></span>`);
    if (c.email) parts.push(`<span><i class="fa-solid fa-envelope" style="color:var(--accent);margin-right:4px"></i><a href="mailto:${c.email}" style="color:var(--accent)">${c.email}</a></span>`);
    if (c.url)   parts.push(`<span><i class="fa-solid fa-globe" style="color:var(--accent);margin-right:4px"></i><a href="https://${c.url.replace(/^https?:\/\//,'')}" target="_blank" style="color:var(--accent)">${c.url}</a></span>`);
    if (!parts.length) return '';
    return `<div style="display:flex;flex-wrap:wrap;gap:5px 18px;font-size:12px;color:var(--text-300)">${parts.join('')}</div>`;
  }

  function countdownHtml(actionDate) {
    if (!actionDate) return '';
    const target = new Date(actionDate + 'T00:00:00');
    const today = new Date(); today.setHours(0,0,0,0);
    const diff = Math.ceil((target - today) / 86400000);
    const txt = diff > 0 ? diff + ' days' : diff === 0 ? 'Today' : Math.abs(diff) + ' days ago';
    const col = diff <= 0 ? '#ef4444' : diff <= 30 ? '#f59e0b' : '#60a5fa';
    return `<div style="text-align:center;padding:0 4px"><div style="font-size:10px;color:var(--text-400);text-transform:uppercase;letter-spacing:.06em">Days Away</div><div style="font-size:15px;font-weight:800;color:${col}">${txt}</div></div>`;
  }

  function metaPills(b) {
    const pills = [];
    if (b.population) pills.push(`<span class="bid-pill"><i class="fa-solid fa-users"></i> ~${b.population.toLocaleString()}/day</span>`);
    if (b.estimatedValue) pills.push(`<span class="bid-pill"><i class="fa-solid fa-dollar-sign"></i> ${b.estimatedValue}</span>`);
    if (b.bid && b.bid !== 'Research needed' && b.bid !== 'Unknown — Sheriff discretion') pills.push(`<span class="bid-pill mono">${b.bid}</span>`);
    return pills.length ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">${pills.join('')}</div>` : '';
  }

  function buildCard(b, borderColor, showCountdown) {
    const noteIcon  = b.status === 'verify' ? 'fa-triangle-exclamation' : 'fa-lightbulb';
    const noteColor = b.status === 'verify' ? 'var(--amber)' : '#60a5fa';
    const expiryRow = (b.contractExpires && b.contractExpires !== 'Unknown') ? `
      <div style="display:flex;align-items:center;gap:8px;background:var(--bg-2);border-radius:8px;padding:8px 14px;margin-bottom:12px;flex-wrap:wrap">
        <div style="text-align:center"><div style="font-size:10px;color:var(--text-400);text-transform:uppercase;letter-spacing:.06em">Contract Expires</div><div style="font-size:13px;font-weight:600;color:var(--text-200)">${b.contractExpires}</div></div>
        ${b.expectedRFP ? `<i class="fa-solid fa-arrow-right" style="color:var(--text-400);font-size:11px"></i><div style="text-align:center"><div style="font-size:10px;color:var(--text-400);text-transform:uppercase;letter-spacing:.06em">Expected RFP</div><div style="font-size:13px;font-weight:600;color:#60a5fa">${b.expectedRFP}</div></div>` : ''}
        ${showCountdown && b.actionDate ? `<i class="fa-solid fa-arrow-right" style="color:var(--text-400);font-size:11px"></i>${countdownHtml(b.actionDate)}` : ''}
      </div>` : '';
    return `
      <div class="card" style="border-top:3px solid ${borderColor};margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:10px">
          <div>
            <div style="font-size:18px;font-weight:700;color:var(--text-100)">${b.agency}</div>
            <div style="font-size:13px;color:var(--text-400);margin-top:2px">${b.facility} &nbsp;·&nbsp; ${b.location}</div>
          </div>
          ${myStatusBadge(b.myStatus)}
        </div>
        ${metaPills(b)}
        ${expiryRow}
        ${b.scope ? `<div style="font-size:13px;color:var(--text-200);margin-bottom:10px"><strong>Scope:</strong> ${b.scope}</div>` : ''}
        ${b.note ? `<div style="background:var(--bg-2);border-radius:6px;padding:10px 14px;font-size:12px;color:var(--text-300);margin-bottom:12px;line-height:1.6"><i class="fa-solid ${noteIcon}" style="color:${noteColor};margin-right:6px"></i>${b.note}</div>` : ''}
        ${contactLine(b.contact)}
        <div style="margin-top:8px;font-size:10px;color:var(--text-400)"><i class="fa-regular fa-clock" style="margin-right:4px"></i>Updated: ${b.lastUpdated || '—'}</div>
      </div>`;
  }

  function sectionHead(badge, badgeStyle, subtitle, extra) {
    return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
      <span style="${badgeStyle}">${badge}</span>
      <span style="font-size:13px;font-weight:600;color:var(--text-200)">${subtitle}</span>
      ${extra || ''}
    </div>`;
  }

  // WON
  const wonEl = document.getElementById('bids-won');
  if (wonEl && BIDS.won && BIDS.won.length) {
    wonEl.innerHTML = `<div class="section bid-section">
      ${sectionHead('ACTIVE CONTRACT','background:rgba(34,197,94,0.15);color:#22c55e;border:1px solid rgba(34,197,94,0.3);font-size:11px;font-weight:800;letter-spacing:.08em;padding:3px 10px;border-radius:20px','Current operations')}
      ${BIDS.won.map(b => buildCard(b,'#22c55e',false)).join('')}
    </div>`;
  }

  // VERIFY
  const verifyEl = document.getElementById('bids-open');
  if (verifyEl) {
    verifyEl.innerHTML = `<div class="section bid-section">
      ${sectionHead('VERIFY STATUS','background:rgba(245,158,11,0.15);color:var(--amber);border:1px solid rgba(245,158,11,0.3);font-size:11px;font-weight:800;letter-spacing:.08em;padding:3px 10px;border-radius:20px','Call Today')}
      ${BIDS.verify.map(b => buildCard(b,'var(--amber)',false)).join('')}
    </div>`;
  }

  // UPCOMING
  const upcomingEl = document.getElementById('bids-upcoming');
  if (upcomingEl) {
    upcomingEl.innerHTML = `<div class="section bid-section">
      ${sectionHead('COMING UP','background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid rgba(59,130,246,0.3);font-size:11px;font-weight:800;letter-spacing:.08em;padding:3px 10px;border-radius:20px','Start Positioning Now')}
      ${BIDS.upcoming.map(b => buildCard(b,'#3b82f6',true)).join('')}
    </div>`;
  }

  // RADAR
  const radarEl = document.getElementById('bids-radar');
  if (radarEl) {
    radarEl.innerHTML = `<div class="section bid-section">
      ${sectionHead('ON RADAR','background:rgba(139,92,246,0.12);color:#a78bfa;border:1px solid rgba(139,92,246,0.25);font-size:11px;font-weight:800;letter-spacing:.08em;padding:3px 10px;border-radius:20px',
        'Research contract expirations',
        `<span style="font-size:12px;color:var(--text-400)">${BIDS.radar.length} opportunities tracked</span>`)}
      <div class="bid-radar-grid">
        ${BIDS.radar.map(b => {
          const reYear = (b.expectedRFP && b.expectedRFP !== 'Research needed') ? b.expectedRFP : '?';
          return `
            <div class="card" style="border-top:3px solid rgba(139,92,246,0.5)">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                <span style="font-size:11px;background:rgba(139,92,246,0.1);color:#a78bfa;padding:2px 10px;border-radius:20px;font-weight:700">${reYear}</span>
                ${myStatusBadge(b.myStatus)}
              </div>
              <div style="font-size:15px;font-weight:700;color:var(--text-100);margin-bottom:2px">${b.agency}</div>
              <div style="font-size:12px;color:var(--text-400);margin-bottom:6px">${b.facility} &nbsp;·&nbsp; ${b.location}</div>
              ${metaPills(b)}
              <div style="font-size:12px;color:var(--text-300);line-height:1.5;margin-bottom:8px">${b.note}</div>
              ${contactLine(b.contact)}
              <div style="margin-top:8px;font-size:10px;color:var(--text-400)"><i class="fa-regular fa-clock" style="margin-right:4px"></i>Updated: ${b.lastUpdated || '—'}</div>
            </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  // PORTALS
  const portalsEl = document.getElementById('bids-portals');
  if (portalsEl) {
    portalsEl.innerHTML = `<div class="section bid-section">
      <div style="font-size:13px;font-weight:600;color:var(--text-300);margin-bottom:12px;text-transform:uppercase;letter-spacing:.06em"><i class="fa-solid fa-link" style="margin-right:8px;color:var(--accent)"></i>Procurement Portals — Check These Regularly</div>
      <div class="bid-portals-grid">
        ${BIDS.portals.map(p => `
          <a href="${p.url}" target="_blank" class="bid-portal-card">
            <i class="fa-solid ${p.icon}" style="font-size:20px;color:var(--accent)"></i>
            <div style="font-size:12px;font-weight:600;color:var(--text-200);text-align:center">${p.name}</div>
            <div style="font-size:10px;color:var(--text-400)">${p.subtitle}</div>
          </a>`).join('')}
      </div>
    </div>`;
  }

  // Update nav badge counts
  const vBadge = document.querySelector('.nav-item[href="#bids-open"] .nav-badge');
  const uBadge = document.querySelector('.nav-item[href="#bids-upcoming"] .nav-badge');
  const rBadge = document.querySelector('.nav-item[href="#bids-radar"] .nav-badge');
  if (vBadge) vBadge.textContent = BIDS.verify.length;
  if (uBadge) uBadge.textContent = BIDS.upcoming.length;
  if (rBadge) rBadge.textContent = BIDS.radar.length;
}

function initBidTracker() {
  renderBidTracker();
  bidRefresh(false);
}

/* ── Financials Dashboard ─────────────────────────────────── */
function renderFinancials() {
  if (typeof FINANCIALS === 'undefined') return;
  _renderFinSnapshot();
  _renderFinPL();
  _renderFinCashFlow();
  _renderFinAR();
  _renderFinAP();
}

function _renderFinSnapshot() {
  const el = document.getElementById('fin-snapshot');
  if (!el) return;
  const F = FINANCIALS;

  const $k = n => '$' + Math.abs(Math.round(n)).toLocaleString('en-US');
  const netWC = F.ar.total - F.ap.total;
  const annualizedRev = F.pl2026.qtdRevenue * 4;
  const gm2026 = F.pl2026.grossMarginPct * 100;
  const gm2025 = F.pl2025.grossMarginPct * 100;
  const gmDelta = (gm2026 - gm2025).toFixed(1);
  const nm2026 = (F.pl2026.netIncome / F.pl2026.qtdRevenue * 100).toFixed(1);
  const nm2025 = (F.pl2025.netIncome / F.pl2025.annualRevenue * 100).toFixed(1);
  const nmDelta = (parseFloat(nm2026) - parseFloat(nm2025)).toFixed(1);
  const jeffcoGrowth = ((annualizedRev - F.pl2025.jeffcoRevenue) / F.pl2025.jeffcoRevenue * 100).toFixed(1);
  // DSO: A/R / daily revenue (Q1 / 90 days)
  const dso = Math.round(F.ar.total / (F.pl2026.qtdRevenue / 90));
  // DPO: A/P / daily COGS (Q1 / 90 days)
  const dpo = Math.round(F.ap.total / (F.pl2026.qtdCogs / 90));

  const riskMap = { high: { cls: 'high', tag: 'ACTION REQUIRED' }, med: { cls: 'watch', tag: 'WATCH' }, low: { cls: 'pos', tag: 'POSITIVE' } };

  el.innerHTML = `
    <!-- Executive banner -->
    <div class="fin-exec-banner">
      <div>
        <div class="fin-exec-banner-title">Industry Standard · Financial Overview</div>
        <div class="fin-exec-banner-sub">Jefferson County Jail · Food Service Management · P&amp;L, A/R &amp; A/P as of ${F.asOf}</div>
      </div>
      <div class="fin-exec-banner-date">As of ${F.asOf}</div>
    </div>

    <!-- Hero KPIs — top-line metrics -->
    <div class="fin-hero-grid">
      <div class="fin-hero-card blue">
        <div class="fin-hero-label">Revenue Run-Rate</div>
        <div class="fin-hero-value">${$k(annualizedRev)}</div>
        <div class="fin-hero-sub">Q1 2026 · Annualized</div>
        <div class="fin-hero-delta pos"><i class="fa-solid fa-arrow-trend-up" style="font-size:9px"></i> Core JeffCo +${jeffcoGrowth}% YoY</div>
      </div>
      <div class="fin-hero-card ${parseFloat(gmDelta) >= 5 ? 'green' : 'amber'}">
        <div class="fin-hero-label">Gross Margin</div>
        <div class="fin-hero-value">${gm2026.toFixed(1)}%</div>
        <div class="fin-hero-sub">Q1 2026 · vs 38.8% in 2025</div>
        <div class="fin-hero-delta pos"><i class="fa-solid fa-arrow-trend-up" style="font-size:9px"></i> +${gmDelta}pp improvement</div>
      </div>
      <div class="fin-hero-card ${parseFloat(nm2026) >= 10 ? 'green' : 'amber'}">
        <div class="fin-hero-label">Net Margin</div>
        <div class="fin-hero-value">${nm2026}%</div>
        <div class="fin-hero-sub">Q1 2026 · vs ${nm2025}% in 2025</div>
        <div class="fin-hero-delta pos"><i class="fa-solid fa-arrow-trend-up" style="font-size:9px"></i> +${nmDelta}pp improvement</div>
      </div>
      <div class="fin-hero-card ${F.cash.balance < 75000 ? 'amber' : 'green'}">
        <div class="fin-hero-label">Cash on Hand</div>
        <div class="fin-hero-value">${$k(F.cash.balance)}</div>
        <div class="fin-hero-sub">${F.cash.accountName}</div>
        <div class="fin-hero-delta neu"><i class="fa-solid fa-minus" style="font-size:9px"></i> Flat despite net income</div>
      </div>
    </div>

    <!-- Working Capital row -->
    <div class="fin-wc-grid">
      <div class="fin-wc-card" style="border-top:3px solid #f59e0b">
        <div class="fin-wc-label">Accounts Receivable</div>
        <div class="fin-wc-value" style="color:#f59e0b">${$k(F.ar.total)}</div>
        <div class="fin-wc-sub"><span style="color:#ef4444;font-weight:700">${$k(F.ar.pastDue)} past due</span> · ${$k(F.ar.current)} current</div>
      </div>
      <div class="fin-wc-card" style="border-top:3px solid #ef4444">
        <div class="fin-wc-label">Accounts Payable</div>
        <div class="fin-wc-value" style="color:#ef4444">${$k(F.ap.total)}</div>
        <div class="fin-wc-sub"><span style="color:#ef4444;font-weight:700">${$k(F.ap.pastDue)} past due to PFG</span> · ${$k(F.ap.current)} current</div>
      </div>
      <div class="fin-wc-card" style="border-top:3px solid ${netWC >= 0 ? '#22c55e' : '#ef4444'}">
        <div class="fin-wc-label">Net Working Capital</div>
        <div class="fin-wc-value" style="color:${netWC >= 0 ? '#22c55e' : '#ef4444'}">${netWC >= 0 ? '+' : '-'}${$k(Math.abs(netWC))}</div>
        <div class="fin-wc-sub">A/R minus A/P · ${netWC >= 0 ? 'Positive — thin margin' : 'Negative — act now'}</div>
      </div>
    </div>

    <!-- Quick ratios -->
    <div class="fin-ratios-grid">
      <div class="fin-ratio-card">
        <div class="fin-ratio-label">Days Sales Outstanding</div>
        <div class="fin-ratio-value">${dso} days</div>
        <div class="fin-ratio-context">Target &lt;30 · Healthy collection rate</div>
      </div>
      <div class="fin-ratio-card">
        <div class="fin-ratio-label">Days Payable Outstanding</div>
        <div class="fin-ratio-value">${dpo} days</div>
        <div class="fin-ratio-context">PFG bills running 11+ days late</div>
      </div>
      <div class="fin-ratio-card">
        <div class="fin-ratio-label">2025 Full-Year Revenue</div>
        <div class="fin-ratio-value">${$k(F.pl2025.annualRevenue)}</div>
        <div class="fin-ratio-context">Incl. $669K MCDF (ended Jun '25)</div>
      </div>
      <div class="fin-ratio-card">
        <div class="fin-ratio-label">Gross Margin Trend</div>
        <div class="fin-ratio-value" style="color:#22c55e">+${gmDelta}pp</div>
        <div class="fin-ratio-context">38.8% (2025 FY) → 47.5% (Q1 2026)</div>
      </div>
    </div>

    <!-- Priority actions / risk register -->
    <div class="fin-section-label">Priority Actions &amp; Key Insights</div>
    <div class="fin-risk-register">
      ${F.alerts.map(a => {
        const r = riskMap[a.severity];
        return `
          <div class="fin-risk-item ${r.cls}">
            <span class="fin-risk-tag">${r.tag}</span>
            <div>
              <div class="fin-risk-title">${a.label}</div>
              <div class="fin-risk-body">${a.detail}</div>
            </div>
          </div>`;
      }).join('')}
    </div>
  `;
}

function _renderFinPL() {
  const el = document.getElementById('fin-pl');
  if (!el) return;
  const F = FINANCIALS;

  const pct = (n, d) => d ? ((n/d)*100).toFixed(1)+'%' : '—';
  const fmt = n => '$'+Math.round(n).toLocaleString('en-US');
  const months25 = F.pl2025.months;
  const months26 = F.pl2026.months;
  const maxExp = Math.max(...F.pl2026.topExpenses.map(e => e.amount));

  el.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-title-group">
          <div class="section-icon" style="background:rgba(59,130,246,0.12)"><i class="fa-solid fa-chart-line" style="color:var(--accent)"></i></div>
          <div>
            <div class="section-title">Profit &amp; Loss</div>
            <div class="section-subtitle">Year-over-year comparison · Monthly trend · Operating expense breakdown</div>
          </div>
        </div>
      </div>

      <!-- YoY comparison cards -->
      <div class="fin-comp-grid">
        <div class="fin-comp-card">
          <div class="fin-comp-year" style="color:var(--text-400)">2025 Full Year</div>
          ${[
            ['Revenue',           fmt(F.pl2025.annualRevenue), ''],
            ['  Jefferson Co.',   fmt(F.pl2025.jeffcoRevenue), 'active'],
            ['  MCDF',            fmt(F.pl2025.mcdfRevenue),   'ended Jun 2025'],
            ['COGS',              fmt(F.pl2025.annualCogs),    pct(F.pl2025.annualCogs, F.pl2025.annualRevenue)+' of rev'],
            ['Gross Profit',      fmt(F.pl2025.grossProfit),   pct(F.pl2025.grossProfit, F.pl2025.annualRevenue)+' margin'],
            ['Operating Expenses',fmt(F.pl2025.annualExpenses),pct(F.pl2025.annualExpenses, F.pl2025.annualRevenue)+' of rev'],
            ['Net Income',        fmt(F.pl2025.netIncome),     pct(F.pl2025.netIncome, F.pl2025.annualRevenue)+' margin'],
            ['Partner Distrib.',  '($'+F.pl2025.partnerDistributions.toLocaleString()+')', '71% of net income'],
          ].map(([l,v,n]) => `
            <div class="fin-comp-row">
              <span class="fin-comp-row-label">${l}</span>
              <span class="fin-comp-row-val">${v}<span class="fin-comp-row-note">${n}</span></span>
            </div>`).join('')}
        </div>
        <div class="fin-comp-card" style="border-top:3px solid var(--accent)">
          <div class="fin-comp-year" style="color:var(--accent)">2026 Q1 (Jan–Mar) · Annualized: ${fmt(F.pl2026.qtdRevenue * 4)}</div>
          ${[
            ['Revenue (Q1)',      fmt(F.pl2026.qtdRevenue),   'JeffCo only'],
            ['  Birmingham',      fmt(F.pl2026.birmRevenue),  ''],
            ['  Bessemer',        fmt(F.pl2026.besRevenue),   ''],
            ['COGS (Q1)',         fmt(F.pl2026.qtdCogs),      pct(F.pl2026.qtdCogs, F.pl2026.qtdRevenue)+' of rev'],
            ['Gross Profit',      fmt(F.pl2026.grossProfit),  pct(F.pl2026.grossProfit, F.pl2026.qtdRevenue)+' margin ▲'],
            ['Operating Expenses',fmt(F.pl2026.qtdExpenses),  pct(F.pl2026.qtdExpenses, F.pl2026.qtdRevenue)+' of rev'],
            ['Net Income',        fmt(F.pl2026.netIncome),    pct(F.pl2026.netIncome, F.pl2026.qtdRevenue)+' margin ▲'],
            ['YTD Distrib.',      '($212,586)',               'exceeds Q1 net income'],
          ].map(([l,v,n]) => `
            <div class="fin-comp-row">
              <span class="fin-comp-row-label">${l}</span>
              <span class="fin-comp-row-val">${v}<span class="fin-comp-row-note">${n}</span></span>
            </div>`).join('')}
        </div>
      </div>

      <!-- Q1 2026 expense breakdown -->
      <div class="fin-section-label">Q1 2026 — Operating Expense Breakdown</div>
      <div class="card" style="padding:18px 20px;margin-bottom:20px">
        <div class="fin-bar-list">
          ${F.pl2026.topExpenses.map(e => `
            <div class="fin-bar-item">
              <span class="fin-bar-label">${e.label}</span>
              <div class="fin-bar-track"><div class="fin-bar-fill" style="width:${Math.round(e.amount/maxExp*100)}%"></div></div>
              <span class="fin-bar-amount">${fmt(e.amount)}</span>
            </div>`).join('')}
          <div class="fin-bar-item" style="margin-top:6px;border-top:1px solid var(--border);padding-top:10px">
            <span class="fin-bar-label" style="font-weight:700;color:var(--text-200)">Total Expenses</span>
            <div class="fin-bar-track"><div class="fin-bar-fill" style="width:100%;background:var(--text-300)"></div></div>
            <span class="fin-bar-amount" style="font-weight:700">${fmt(F.pl2026.qtdExpenses)}</span>
          </div>
        </div>
      </div>

      <!-- 2025 monthly table -->
      <div class="fin-section-label">2025 Monthly P&amp;L</div>
      <div class="table-wrap" style="margin-bottom:20px">
        <table class="cafe-ing-table">
          <thead><tr><th>Month</th><th class="right">Revenue</th><th class="right">COGS</th><th class="right">Gross Profit</th><th class="right">GP%</th><th class="right">Expenses</th><th class="right">Net Income</th><th class="right">Net%</th></tr></thead>
          <tbody>
            ${months25.map(m => `
              <tr style="${m.netIncome < 0 ? 'background:rgba(239,68,68,0.05)' : ''}">
                <td style="font-weight:600">${m.month}</td>
                <td class="right">${fmt(m.revenue)}</td>
                <td class="right">${fmt(m.cogs)}</td>
                <td class="right">${fmt(m.grossProfit)}</td>
                <td class="right" style="color:${m.grossProfit/m.revenue > 0.40 ? '#22c55e' : '#f59e0b'}">${pct(m.grossProfit,m.revenue)}</td>
                <td class="right">${fmt(m.expenses)}</td>
                <td class="right" style="font-weight:700;color:${m.netIncome < 0 ? '#ef4444' : '#22c55e'}">${fmt(m.netIncome)}</td>
                <td class="right" style="color:${m.netIncome < 0 ? '#ef4444' : 'var(--text-300)'}">${pct(m.netIncome,m.revenue)}</td>
              </tr>`).join('')}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--bg-2)">
              <td>Full Year</td>
              <td class="right">${fmt(F.pl2025.annualRevenue)}</td>
              <td class="right">${fmt(F.pl2025.annualCogs)}</td>
              <td class="right">${fmt(F.pl2025.grossProfit)}</td>
              <td class="right" style="color:#22c55e">${pct(F.pl2025.grossProfit,F.pl2025.annualRevenue)}</td>
              <td class="right">${fmt(F.pl2025.annualExpenses)}</td>
              <td class="right" style="color:#22c55e">${fmt(F.pl2025.netIncome)}</td>
              <td class="right">${pct(F.pl2025.netIncome,F.pl2025.annualRevenue)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- 2026 Q1 monthly table -->
      <div class="fin-section-label">2026 Monthly P&amp;L (Q1)</div>
      <div class="table-wrap">
        <table class="cafe-ing-table">
          <thead><tr><th>Month</th><th class="right">Revenue</th><th class="right">COGS</th><th class="right">Gross Profit</th><th class="right">GP%</th><th class="right">Expenses</th><th class="right">Net Income</th><th class="right">Net%</th><th>Note</th></tr></thead>
          <tbody>
            ${months26.map(m => `
              <tr>
                <td style="font-weight:600">${m.month}</td>
                <td class="right">${fmt(m.revenue)}</td>
                <td class="right">${fmt(m.cogs)}</td>
                <td class="right">${fmt(m.grossProfit)}</td>
                <td class="right" style="color:${m.grossProfit/m.revenue > 0.45 ? '#22c55e' : '#f59e0b'}">${pct(m.grossProfit,m.revenue)}</td>
                <td class="right">${fmt(m.expenses)}</td>
                <td class="right" style="font-weight:700;color:${m.netIncome < 0 ? '#ef4444' : '#22c55e'}">${fmt(m.netIncome)}</td>
                <td class="right">${pct(m.netIncome,m.revenue)}</td>
                <td style="font-size:11px;color:var(--text-400)">${m.note || ''}</td>
              </tr>`).join('')}
          </tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--bg-2)">
              <td>Q1 Total</td>
              <td class="right">${fmt(F.pl2026.qtdRevenue)}</td>
              <td class="right">${fmt(F.pl2026.qtdCogs)}</td>
              <td class="right">${fmt(F.pl2026.grossProfit)}</td>
              <td class="right" style="color:#22c55e">${pct(F.pl2026.grossProfit,F.pl2026.qtdRevenue)}</td>
              <td class="right">${fmt(F.pl2026.qtdExpenses)}</td>
              <td class="right" style="color:#22c55e">${fmt(F.pl2026.netIncome)}</td>
              <td class="right">${pct(F.pl2026.netIncome,F.pl2026.qtdRevenue)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>`;
}

function _renderFinAR() {
  const el = document.getElementById('fin-ar');
  if (!el) return;
  const F = FINANCIALS;
  const fmt = n => (n < 0 ? '-' : '') + '$' + Math.abs(n).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2});

  const arRows = F.ar.items.map(i => {
    const isPast = i.aging === '1-30 days';
    const isCredit = i.amount < 0;
    const rowBg = isPast && !isCredit ? 'background:rgba(239,68,68,0.04)' : '';
    const amtColor = isCredit ? '#22c55e' : isPast ? '#ef4444' : 'var(--text-100)';
    const badgeBg = isCredit ? 'rgba(34,197,94,0.12)' : isPast ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)';
    const badgeColor = isCredit ? '#22c55e' : isPast ? '#ef4444' : '#22c55e';
    const badgeLabel = isCredit ? 'Payment' : isPast ? 'Past Due' : 'Current';
    return '<tr style="' + rowBg + '">' +
      '<td style="font-family:monospace;font-size:11px">' + i.inv + '</td>' +
      '<td style="font-size:12px">' + i.customer + '</td>' +
      '<td style="font-size:12px;color:var(--text-400)">' + i.location + '</td>' +
      '<td style="font-size:11px;color:var(--text-400)">' + i.date + '</td>' +
      '<td style="font-size:11px;color:var(--text-400)">' + i.due + '</td>' +
      '<td class="right" style="font-weight:700;color:' + amtColor + '">' + fmt(i.amount) + '</td>' +
      '<td><span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:' + badgeBg + ';color:' + badgeColor + '">' + badgeLabel + '</span></td>' +
      '</tr>';
  }).join('');

  el.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-title-group">
          <div class="section-icon" style="background:rgba(245,158,11,0.12)"><i class="fa-solid fa-arrow-down-to-bracket" style="color:var(--amber)"></i></div>
          <div>
            <div class="section-title">A/R Aging — Accounts Receivable</div>
            <div class="section-subtitle">As of ${F.asOf} · Total outstanding: ${fmt(F.ar.total)}</div>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:14px;margin-bottom:16px;flex-wrap:wrap">
        <div class="card" style="flex:1;min-width:160px;border-top:3px solid #ef4444;text-align:center;padding:14px">
          <div style="font-size:10px;color:var(--text-400);text-transform:uppercase;letter-spacing:.06em">Past Due</div>
          <div style="font-size:22px;font-weight:800;color:#ef4444">${fmt(F.ar.pastDue)}</div>
        </div>
        <div class="card" style="flex:1;min-width:160px;border-top:3px solid #22c55e;text-align:center;padding:14px">
          <div style="font-size:10px;color:var(--text-400);text-transform:uppercase;letter-spacing:.06em">Current</div>
          <div style="font-size:22px;font-weight:800;color:#22c55e">${fmt(F.ar.current)}</div>
        </div>
        <div class="card" style="flex:1;min-width:160px;border-top:3px solid var(--accent);text-align:center;padding:14px">
          <div style="font-size:10px;color:var(--text-400);text-transform:uppercase;letter-spacing:.06em">Total Outstanding</div>
          <div style="font-size:22px;font-weight:800;color:var(--accent)">${fmt(F.ar.total)}</div>
        </div>
      </div>
      <div class="table-wrap">
        <table class="cafe-ing-table">
          <thead><tr><th>Invoice</th><th>Customer</th><th>Location</th><th>Date</th><th>Due</th><th class="right">Amount</th><th>Status</th></tr></thead>
          <tbody>${arRows}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--bg-2)">
              <td colspan="5">Total</td>
              <td class="right" style="color:var(--accent)">${fmt(F.ar.total)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>`;
}

function _renderFinAP() {
  const el = document.getElementById('fin-ap');
  if (!el) return;
  const F = FINANCIALS;
  const fmt = n => (n < 0 ? '-' : '') + '$' + Math.abs(n).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2});

  // Group by vendor
  const vendors = [...new Set(F.ap.items.map(i => i.vendor))];
  const byVendor = vendors.map(v => ({
    vendor: v,
    total: F.ap.items.filter(i => i.vendor === v).reduce((s,i) => s+i.amount, 0),
    items: F.ap.items.filter(i => i.vendor === v)
  })).sort((a,b) => Math.abs(b.total) - Math.abs(a.total));

  const vendorColors = { PFG: '#ef4444', 'Big Daddy': '#f59e0b', 'Forest Wood': '#22c55e', HireQuest: '#60a5fa', EMC: '#a78bfa' };

  const vendorCards = byVendor.map(v => {
    const vcol = vendorColors[v.vendor] || 'var(--accent)';
    const valColor = v.total < 0 ? '#22c55e' : vcol;
    const sign = v.total < 0 ? '-' : '';
    const valStr = sign + '$' + Math.abs(v.total).toLocaleString('en-US', {minimumFractionDigits:0,maximumFractionDigits:0});
    return '<div class="card" style="border-top:3px solid ' + vcol + '">' +
      '<div style="font-size:12px;font-weight:700;color:var(--text-200);margin-bottom:4px">' + v.vendor + '</div>' +
      '<div style="font-size:20px;font-weight:800;color:' + valColor + '">' + valStr + '</div>' +
      '<div style="font-size:11px;color:var(--text-400)">' + v.items.length + ' bill' + (v.items.length !== 1 ? 's' : '') + '</div>' +
      '</div>';
  }).join('');

  const apRows = F.ap.items.map(i => {
    const isPast = i.aging === '1-30 days';
    const isCredit = i.aging === 'credit';
    const col = vendorColors[i.vendor] || 'var(--accent)';
    const rowBg = isPast ? 'background:rgba(239,68,68,0.04)' : '';
    const dueColor = isPast ? '#ef4444' : 'var(--text-400)';
    const amtColor = isCredit ? '#22c55e' : isPast ? '#ef4444' : 'var(--text-100)';
    const badgeBg = isCredit ? 'rgba(167,139,250,0.12)' : isPast ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)';
    const badgeColor = isCredit ? '#a78bfa' : isPast ? '#ef4444' : '#22c55e';
    const badgeLabel = isCredit ? 'Credit' : isPast ? 'Past Due' : 'Current';
    return '<tr style="' + rowBg + '">' +
      '<td style="font-weight:600;color:' + col + '">' + i.vendor + '</td>' +
      '<td style="font-family:monospace;font-size:11px">' + i.bill + '</td>' +
      '<td style="font-size:12px;color:var(--text-400)">' + i.location + '</td>' +
      '<td style="font-size:11px;color:' + dueColor + '">' + (i.due || '—') + '</td>' +
      '<td class="right" style="font-weight:700;color:' + amtColor + '">' + fmt(i.amount) + '</td>' +
      '<td><span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:' + badgeBg + ';color:' + badgeColor + '">' + badgeLabel + '</span></td>' +
      '</tr>';
  }).join('');

  el.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-title-group">
          <div class="section-icon" style="background:rgba(239,68,68,0.12)"><i class="fa-solid fa-arrow-up-from-bracket" style="color:#ef4444"></i></div>
          <div>
            <div class="section-title">A/P Aging — Accounts Payable</div>
            <div class="section-subtitle">As of ${F.asOf} · Total outstanding: ${fmt(F.ap.total)}</div>
          </div>
        </div>
      </div>

      <!-- Vendor summary cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:20px">
        ${vendorCards}
      </div>

      <!-- Full detail table -->
      <div class="table-wrap">
        <table class="cafe-ing-table">
          <thead><tr><th>Vendor</th><th>Bill #</th><th>Location</th><th>Due Date</th><th class="right">Amount</th><th>Status</th></tr></thead>
          <tbody>${apRows}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--bg-2)">
              <td colspan="4">Total</td>
              <td class="right" style="color:#ef4444">${fmt(F.ap.total)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>`;
}

function _renderFinCashFlow() {
  const el = document.getElementById('fin-cashflow');
  if (!el) return;
  const F = FINANCIALS;
  const fmt = n => (n < 0 ? '(' : '') + '$' + Math.abs(Math.round(n)).toLocaleString('en-US') + (n < 0 ? ')' : '');

  const { y2025, ytd2026 } = F.cashFlow;
  const dist2025Pct = Math.round(Math.abs(y2025.distributions) / y2025.netIncome * 100);
  const dist2026Pct = Math.round(Math.abs(ytd2026.distributions) / ytd2026.netIncome * 100);
  const distOver2026 = ytd2026.distributions + ytd2026.netIncome; // negative = distributions exceed earnings

  el.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-title-group">
          <div class="section-icon" style="background:rgba(34,197,94,0.12)"><i class="fa-solid fa-water" style="color:#22c55e"></i></div>
          <div>
            <div class="section-title">Cash Flow</div>
            <div class="section-subtitle">Operating cash generation · Partner distributions · Net cash position</div>
          </div>
        </div>
      </div>

      <div class="fin-cf-grid">
        <!-- 2025 -->
        <div class="fin-cf-card">
          <div class="fin-cf-year" style="color:var(--text-400)">2025 Full Year</div>
          <div class="fin-cf-row">
            <span class="fin-cf-label">Net Income</span>
            <span style="font-weight:700;color:#22c55e">${fmt(y2025.netIncome)}</span>
          </div>
          <div class="fin-cf-row">
            <span class="fin-cf-label">Operating Cash Flow</span>
            <span style="font-weight:700;color:var(--text-100)">${fmt(y2025.operatingCF)}</span>
          </div>
          <div class="fin-cf-row">
            <span class="fin-cf-label">Partner Distributions</span>
            <span style="font-weight:700;color:#ef4444">${fmt(y2025.distributions)}</span>
          </div>
          <div class="fin-cf-row" style="border-bottom:none;padding-top:10px;margin-top:6px;border-top:2px solid var(--border)">
            <span class="fin-cf-label" style="font-weight:700;color:var(--text-200)">Ending Cash</span>
            <span style="font-weight:900;font-size:18px;color:var(--text-100)">${fmt(y2025.cashEnd)}</span>
          </div>
          <div style="margin-top:14px">
            <div style="font-size:11px;color:var(--text-400);margin-bottom:6px">Distributions as % of Net Income</div>
            <div style="background:var(--bg-2);border-radius:4px;height:10px;overflow:hidden;margin-bottom:4px">
              <div style="background:#ef4444;height:10px;border-radius:4px;width:${Math.min(dist2025Pct,100)}%"></div>
            </div>
            <div style="font-size:11px;color:var(--text-400)">${dist2025Pct}% distributed · $${Math.round((y2025.netIncome + y2025.distributions)/1000)}K retained</div>
          </div>
        </div>

        <!-- 2026 YTD -->
        <div class="fin-cf-card" style="border-top:3px solid ${distOver2026 < 0 ? '#f59e0b' : 'var(--accent)'}">
          <div class="fin-cf-year" style="color:var(--accent)">2026 YTD (through April)</div>
          <div class="fin-cf-row">
            <span class="fin-cf-label">Net Income</span>
            <span style="font-weight:700;color:#22c55e">${fmt(ytd2026.netIncome)}</span>
          </div>
          <div class="fin-cf-row">
            <span class="fin-cf-label">Operating Cash Flow</span>
            <span style="font-weight:700;color:var(--text-100)">${fmt(ytd2026.operatingCF)}</span>
          </div>
          <div class="fin-cf-row">
            <span class="fin-cf-label">Partner Distributions</span>
            <span style="font-weight:700;color:#ef4444">${fmt(ytd2026.distributions)}</span>
          </div>
          <div class="fin-cf-row" style="border-bottom:none;padding-top:10px;margin-top:6px;border-top:2px solid var(--border)">
            <span class="fin-cf-label" style="font-weight:700;color:var(--text-200)">Ending Cash</span>
            <span style="font-weight:900;font-size:18px;color:var(--text-100)">${fmt(ytd2026.cashEnd)}</span>
          </div>
          <div style="margin-top:14px">
            <div style="font-size:11px;color:var(--text-400);margin-bottom:6px">Distributions as % of Net Income</div>
            <div style="background:var(--bg-2);border-radius:4px;height:10px;overflow:hidden;margin-bottom:4px">
              <div style="background:#ef4444;height:10px;border-radius:4px;width:100%"></div>
            </div>
            ${distOver2026 < 0
              ? `<div style="font-size:11px;font-weight:700;color:#f59e0b">⚠ Distributions exceed net income by $${Math.abs(Math.round(distOver2026)).toLocaleString('en-US')} — drawing down reserves</div>`
              : `<div style="font-size:11px;color:var(--text-400)">${dist2026Pct}% distributed</div>`
            }
          </div>
        </div>
      </div>

      <!-- Year-over-year cash summary -->
      <div class="fin-section-label">Cash Position Summary</div>
      <div class="table-wrap">
        <table class="cafe-ing-table">
          <thead>
            <tr><th>Period</th><th class="right">Net Income</th><th class="right">Operating CF</th><th class="right">Distributions</th><th class="right">Distrib. Rate</th><th class="right">Ending Cash</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight:600">2025 Full Year</td>
              <td class="right" style="color:#22c55e">${fmt(y2025.netIncome)}</td>
              <td class="right">${fmt(y2025.operatingCF)}</td>
              <td class="right" style="color:#ef4444">${fmt(y2025.distributions)}</td>
              <td class="right">${dist2025Pct}% of NI</td>
              <td class="right" style="font-weight:700">${fmt(y2025.cashEnd)}</td>
            </tr>
            <tr style="background:rgba(59,130,246,0.04)">
              <td style="font-weight:600">2026 YTD (Apr)</td>
              <td class="right" style="color:#22c55e">${fmt(ytd2026.netIncome)}</td>
              <td class="right">${fmt(ytd2026.operatingCF)}</td>
              <td class="right" style="color:#ef4444">${fmt(ytd2026.distributions)}</td>
              <td class="right" style="${distOver2026 < 0 ? 'color:#f59e0b;font-weight:700' : ''}">${dist2026Pct}% of NI${distOver2026 < 0 ? ' ⚠' : ''}</td>
              <td class="right" style="font-weight:700">${fmt(ytd2026.cashEnd)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

/* ── Menu Order List ──────────────────────────────────────── */
function renderMenuOrderList() {
  const container = document.getElementById('mol-container');
  if (!container || typeof MENU_ORDER_LIST === 'undefined') return;
  const data = MENU_ORDER_LIST;

  const vendorColor = { shaver: 'green', bigDaddy: 'amber', pfg: 'accent' };
  const vendorIcon  = { shaver: 'fa-truck-fast', bigDaddy: 'fa-boxes-stacked', pfg: 'fa-handshake' };

  let html = `
    <div class="mol-basis-bar">
      <span><i class="fa-solid fa-users"></i>&nbsp;${data.basis.inmates} inmates</span>
      <span class="mol-sep">·</span>
      <span><i class="fa-solid fa-calendar-week"></i>&nbsp;${data.basis.days}-day cycle</span>
      <span class="mol-sep">·</span>
      <span><i class="fa-solid fa-dollar-sign"></i>&nbsp;~$${data.basis.perInmatePerDay.toFixed(2)}/inmate/day</span>
      <span class="mol-sep">·</span>
      <span class="mol-grand-total"><i class="fa-solid fa-calculator"></i>&nbsp;<strong>$${data.basis.grandTotal.toLocaleString('en-US',{minimumFractionDigits:2})}</strong>&nbsp;total</span>
    </div>
    <div class="mol-vendor-summary">
      ${data.vendors.map(v => {
        const itemCount = v.categories.reduce((s,c) => s + c.items.length, 0);
        const col = vendorColor[v.key] || 'accent';
        return `
          <div class="mol-vs-card mol-vs-${v.key}">
            <div class="mol-vs-name"><i class="fa-solid ${vendorIcon[v.key] || 'fa-truck'}"></i>&nbsp;${v.label}</div>
            <div class="mol-vs-amount" style="color:var(--${col})">$${v.total.toLocaleString('en-US',{minimumFractionDigits:2})}</div>
            <div class="mol-vs-meta">${itemCount} line items</div>
          </div>`;
      }).join('')}
    </div>`;

  data.vendors.forEach(v => {
    const col = vendorColor[v.key] || 'accent';
    const itemCount = v.categories.reduce((s,c) => s + c.items.length, 0);
    html += `
    <div class="card mol-vendor-block" style="margin-bottom:20px">
      <div class="mol-vb-header" style="border-left:4px solid var(--${col})">
        <div class="mol-vb-title">
          <i class="fa-solid ${vendorIcon[v.key] || 'fa-truck'}" style="color:var(--${col})"></i>
          &nbsp;${v.label}
          <span class="mol-vb-doc">${v.subtitle}</span>
        </div>
        <div class="mol-vb-total" style="color:var(--${col})">$${v.total.toLocaleString('en-US',{minimumFractionDigits:2})}</div>
      </div>`;
    v.categories.forEach(cat => {
      const catTotal = cat.items.reduce((s,i) => s + i.total, 0);
      html += `
      <div class="mol-cat-section">
        <div class="mol-cat-label">
          <i class="fa-solid ${cat.icon}" style="color:var(--${col});opacity:.7"></i>&nbsp;${cat.name}
          <span class="mol-cat-subtotal">$${catTotal.toLocaleString('en-US',{minimumFractionDigits:2})}</span>
        </div>
        <div class="table-wrap">
          <table class="mol-table">
            <thead><tr>
              <th>Item</th><th>Pack</th>
              <th class="right">Qty</th>
              <th class="right">$/Unit</th>
              <th class="right">Line Total</th>
              <th class="mol-basis-col">Basis</th>
            </tr></thead>
            <tbody>
              ${cat.items.map(item => `
                <tr${item.caveat ? ' class="mol-row-est"' : ''}>
                  <td class="item-name">${item.name}${item.caveat ? ` <span class="mol-est-badge" title="${item.caveat}">est.</span>` : ''}</td>
                  <td class="small text-muted">${item.pack}</td>
                  <td class="right"><strong>${item.qty}</strong> <span class="small text-muted">${item.unit}</span></td>
                  <td class="right">$${item.casePrice.toFixed(2)}</td>
                  <td class="right savings-val">$${item.total.toLocaleString('en-US',{minimumFractionDigits:2})}</td>
                  <td class="mol-basis-col small text-muted">${item.basis}</td>
                </tr>`).join('')}
            </tbody>
            <tfoot>
              <tr class="pl-subtotal-row">
                <td colspan="4"><strong>${cat.name} subtotal</strong></td>
                <td class="right"><strong>$${catTotal.toLocaleString('en-US',{minimumFractionDigits:2})}</strong></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>`;
    });
    html += `
      <div class="mol-vb-footer">
        <span>${v.label} &mdash; ${itemCount} items</span>
        <span class="mol-vb-footer-total" style="color:var(--${col})">$${v.total.toLocaleString('en-US',{minimumFractionDigits:2})}</span>
      </div>
    </div>`;
  });

  html += `
    <div class="weekly-net-banner" style="margin-top:4px">
      <div class="wn-label">Grand Total — 2-Week Cycle</div>
      <div class="wn-amount">$${data.basis.grandTotal.toLocaleString('en-US',{minimumFractionDigits:2})}</div>
      <div class="wn-pct">~$${data.basis.perInmatePerDay.toFixed(2)} / inmate / day</div>
      <div class="wn-sub">Shaver $18,934 &nbsp;+&nbsp; Big Daddy $1,080 &nbsp;+&nbsp; PFG $3,208</div>
    </div>
    <p class="small text-muted" style="margin-top:10px;padding:0 4px">
      <i class="fa-solid fa-circle-info" style="color:var(--accent)"></i>
      &nbsp;Quantities from 2-week rotation at 300 inmates. PFG items marked
      <span class="mol-est-badge">est.</span> use unconfirmed or market prices — verify before ordering.
      Margarine, oil, and gravy quantities are estimates; adjust to your kitchen usage.
    </p>`;

  container.innerHTML = html;
}

function bidRefresh(announce = true) {
  const el = document.getElementById('bid-last-checked');
  if (el) {
    const now = new Date();
    el.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' at ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  if (announce) {
    const btn = document.querySelector('#bid-tracker-wrap button[onclick="bidRefresh()"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Updated';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  }
}

/* ── CEO Executive Dashboard ──────────────────────────────── */

function renderCeoSummary() {
  const el = document.getElementById('ceo-summary-container');
  if (!el) return;
  const d = CEO_DATA;
  const fmt  = n => '$' + Math.round(n).toLocaleString();
  const fmtM = n => '$' + (n / 1e6).toFixed(2) + 'M';

  const bestWeek  = d.weeklyTrend.reduce((a, b) => b.pct > a.pct ? b : a);
  const worstWeek = d.weeklyTrend.reduce((a, b) => b.pct < a.pct ? b : a);

  el.innerHTML = `
    <div class="ceo-hero">
      <div class="ceo-hero-header">
        <div class="ceo-hero-title">
          <i class="fa-solid fa-briefcase"></i>
          Executive Dashboard
        </div>
        <div class="ceo-hero-meta">Industry Standard · Jefferson County &amp; Bessemer · ${d.asOf}</div>
      </div>
      <div class="ceo-hero-sub">Based on ${d.period}</div>

      <div class="ceo-kpi-grid">
        <div class="ceo-kpi-card">
          <div class="ceo-kpi-label">Annualized Revenue</div>
          <div class="ceo-kpi-value">${fmtM(d.kpis.annualRevenue)}</div>
          <div class="ceo-kpi-note">${fmt(d.kpis.weeklyRevAvg)} / week avg</div>
        </div>
        <div class="ceo-kpi-card">
          <div class="ceo-kpi-label">Annualized Net</div>
          <div class="ceo-kpi-value" style="color:#16a34a">${fmtM(d.kpis.annualNet)}</div>
          <div class="ceo-kpi-note">${(d.kpis.avgNetPct * 100).toFixed(1)}% avg net margin</div>
        </div>
        <div class="ceo-kpi-card ceo-kpi-alert">
          <div class="ceo-kpi-label">Café Food Cost</div>
          <div class="ceo-kpi-value" style="color:#dc2626">72.6%</div>
          <div class="ceo-kpi-note">Avg COGS · target 30% · critical</div>
        </div>
        <div class="ceo-kpi-card">
          <div class="ceo-kpi-label">Identified Savings</div>
          <div class="ceo-kpi-value" style="color:#0369a1">${fmt(d.kpis.totalSavingsOpp)}+</div>
          <div class="ceo-kpi-note">Annual · all opportunities combined</div>
        </div>
      </div>

      <div class="ceo-hero-context">
        <div class="ceo-context-item">
          <i class="fa-solid fa-arrow-trend-up" style="color:#16a34a"></i>
          <span>Best week: ${bestWeek.week} — ${fmt(bestWeek.net)} net (${(bestWeek.pct*100).toFixed(1)}%)</span>
        </div>
        <div class="ceo-context-item">
          <i class="fa-solid fa-arrow-trend-down" style="color:#dc2626"></i>
          <span>Worst week: ${worstWeek.week} — ${fmt(worstWeek.net)} net (${(worstWeek.pct*100).toFixed(1)}%)</span>
        </div>
        <div class="ceo-context-item">
          <i class="fa-solid fa-building" style="color:#6366f1"></i>
          <span>2 locations: Birmingham (primary) + Bessemer · 5 revenue lines</span>
        </div>
      </div>
    </div>

    <div class="ceo-nav-grid">
      <div class="ceo-nav-card" onclick="showCeoSection('ceo-scorecard')">
        <div class="ceo-nav-icon" style="background:linear-gradient(135deg,#1e3a8a,#2563eb)">
          <i class="fa-solid fa-table-cells-large"></i>
        </div>
        <div class="ceo-nav-body">
          <div class="ceo-nav-title">Profitability Scorecard</div>
          <div class="ceo-nav-sub">Revenue line performance vs target COGS% · 5 lines analyzed</div>
        </div>
        <i class="fa-solid fa-chevron-right ceo-nav-arrow"></i>
      </div>

      <div class="ceo-nav-card" onclick="showCeoSection('ceo-actions')">
        <div class="ceo-nav-icon" style="background:linear-gradient(135deg,#7f1d1d,#dc2626)">
          <i class="fa-solid fa-list-check"></i>
        </div>
        <div class="ceo-nav-body">
          <div class="ceo-nav-title">Strategic Action Plan</div>
          <div class="ceo-nav-sub">Ranked by priority · owner-assigned · estimated financial impact</div>
        </div>
        <i class="fa-solid fa-chevron-right ceo-nav-arrow"></i>
      </div>

      <div class="ceo-nav-card" onclick="showCeoSection('ceo-trend')">
        <div class="ceo-nav-icon" style="background:linear-gradient(135deg,#065f46,#059669)">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div class="ceo-nav-body">
          <div class="ceo-nav-title">Net Margin Trend</div>
          <div class="ceo-nav-sub">15 weeks · weekly net after materials + labor · Jan 5 – Apr 19, 2026</div>
        </div>
        <i class="fa-solid fa-chevron-right ceo-nav-arrow"></i>
      </div>

      <div class="ceo-nav-card" onclick="showCeoSection('ceo-findings')">
        <div class="ceo-nav-icon" style="background:linear-gradient(135deg,#92400e,#d97706)">
          <i class="fa-solid fa-magnifying-glass-chart"></i>
        </div>
        <div class="ceo-nav-body">
          <div class="ceo-nav-title">COGS Findings &amp; Discrepancies</div>
          <div class="ceo-nav-sub">Anomalies identified in 15-week financial data · requires follow-up</div>
        </div>
        <i class="fa-solid fa-chevron-right ceo-nav-arrow"></i>
      </div>
    </div>`;
}

function renderCeoScorecard() {
  const el = document.getElementById('ceo-scorecard-container');
  if (!el) return;
  const fmt = n => '$' + Math.round(n).toLocaleString();

  const statusConfig = {
    ok:       { label: 'Healthy',  color: '#16a34a', bg: '#dcfce7', bar: '#16a34a' },
    watch:    { label: 'Watch',    color: '#ca8a04', bg: '#fef9c3', bar: '#ca8a04' },
    poor:     { label: 'Poor',     color: '#ea580c', bg: '#ffedd5', bar: '#ea580c' },
    critical: { label: 'Critical', color: '#dc2626', bg: '#fee2e2', bar: '#dc2626' }
  };

  const totalAnnualSavings = CEO_DATA.lines.reduce((s, l) => s + l.annualSavings, 0);

  el.innerHTML = `
    <div class="ceo-back-btn" onclick="showCeoSection('ceo-summary')"><i class="fa-solid fa-arrow-left"></i> Back to Summary</div>
    <div class="ceo-scorecard-grid">
      ${CEO_DATA.lines.map(line => {
        const cfg = statusConfig[line.status];
        const cogsGap = line.cogsPct - line.target;
        const barWidth = Math.min(100, line.cogsPct * 100);
        const targetPos = Math.min(100, line.target * 100);
        return `
          <div class="ceo-sc-card" style="border-top:3px solid ${cfg.color}">
            <div class="ceo-sc-header">
              <div class="ceo-sc-icon" style="background:${cfg.color}18;color:${cfg.color}"><i class="fa-solid ${line.icon}"></i></div>
              <div class="ceo-sc-title-wrap">
                <div class="ceo-sc-name">${line.name}</div>
                <div class="ceo-sc-rev">${(line.pctOfTotal*100).toFixed(0)}% of revenue &nbsp;·&nbsp; ${fmt(line.weeklyRev * 52)}/yr</div>
              </div>
              <span class="ceo-sc-badge" style="background:${cfg.bg};color:${cfg.color}">${cfg.label}</span>
            </div>

            <div class="ceo-sc-cogs-row">
              <div class="ceo-sc-cogs-nums">
                <span class="ceo-sc-cogs-actual" style="color:${cfg.color}">${(line.cogsPct*100).toFixed(1)}%</span>
                <span class="ceo-sc-cogs-label">actual COGS</span>
                <span class="ceo-sc-cogs-sep">vs</span>
                <span class="ceo-sc-cogs-target">${(line.target*100).toFixed(0)}%</span>
                <span class="ceo-sc-cogs-label">target</span>
                ${cogsGap > 0 ? `<span class="ceo-sc-cogs-gap" style="color:${cfg.color}">+${(cogsGap*100).toFixed(1)}pp over</span>` : '<span class="ceo-sc-cogs-gap ok">On target</span>'}
              </div>
              <div class="ceo-sc-bar-wrap">
                <div class="ceo-sc-bar-bg">
                  <div class="ceo-sc-bar-fill" style="width:${barWidth}%;background:${cfg.color}"></div>
                  <div class="ceo-sc-bar-target" style="left:${targetPos}%"></div>
                </div>
                <div class="ceo-sc-bar-labels"><span>0%</span><span style="left:${targetPos}%" class="ceo-sc-bar-tgt-label">target</span><span>100%</span></div>
              </div>
            </div>

            <p class="ceo-sc-detail">${line.detail}</p>

            <div class="ceo-sc-footer">
              <span class="ceo-sc-note">${line.note}</span>
              ${line.annualSavings > 0 ? `<span class="ceo-sc-savings"><i class="fa-solid fa-piggy-bank"></i> ${fmt(line.annualSavings)}+ / yr opportunity</span>` : ''}
            </div>
          </div>`;
      }).join('')}
    </div>
    <div class="ceo-sc-total-bar">
      <i class="fa-solid fa-circle-dollar-to-slot"></i>
      Total identified annual savings across all lines: <strong>${fmt(totalAnnualSavings)}+</strong>
    </div>`;
}

function renderCeoActions() {
  const el = document.getElementById('ceo-actions-container');
  if (!el) return;

  const priCfg = {
    critical: { label: 'Critical', color: '#dc2626', bg: '#fee2e2' },
    high:     { label: 'High',     color: '#ea580c', bg: '#ffedd5' },
    med:      { label: 'Medium',   color: '#ca8a04', bg: '#fef9c3' }
  };
  const statusCfg = {
    urgent:   { label: 'Act Now',    color: '#dc2626' },
    ready:    { label: 'Ready',      color: '#16a34a' },
    planning: { label: 'In Planning',color: '#2563eb' },
    review:   { label: 'Under Review',color:'#7c3aed' },
    monitor:  { label: 'Monitor',    color: '#6b7280' }
  };

  el.innerHTML = `
    <div class="ceo-back-btn" onclick="showCeoSection('ceo-summary')"><i class="fa-solid fa-arrow-left"></i> Back to Summary</div>
    <div class="ceo-actions-list">
      ${CEO_DATA.actions.map(a => {
        const pc = priCfg[a.priority];
        const sc = statusCfg[a.status];
        return `
          <div class="ceo-action-card">
            <div class="ceo-ac-left">
              <div class="ceo-ac-num" style="background:${pc.bg};color:${pc.color}">${a.id}</div>
            </div>
            <div class="ceo-ac-body">
              <div class="ceo-ac-top">
                <div class="ceo-ac-category">${a.category}</div>
                <div class="ceo-ac-badges">
                  <span class="ceo-ac-badge" style="background:${pc.bg};color:${pc.color}">${pc.label}</span>
                  <span class="ceo-ac-badge" style="background:${sc.color}18;color:${sc.color}">${sc.label}</span>
                </div>
              </div>
              <div class="ceo-ac-title"><i class="fa-solid ${a.icon}" style="color:${pc.color};margin-right:7px;font-size:14px"></i>${a.title}</div>
              <p class="ceo-ac-detail">${a.detail}</p>
              <div class="ceo-ac-meta">
                <div class="ceo-ac-meta-item"><i class="fa-solid fa-circle-dollar-to-slot"></i> <strong>${a.impact}</strong></div>
                <div class="ceo-ac-meta-item"><i class="fa-solid fa-clock"></i> ${a.timeline}</div>
                <div class="ceo-ac-meta-item"><i class="fa-solid fa-user-tie"></i> ${a.owner}</div>
              </div>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderCeoTrend() {
  const el = document.getElementById('ceo-trend-container');
  if (!el) return;
  const weeks = CEO_DATA.weeklyTrend;
  const maxNet = Math.max(...weeks.map(w => w.net));
  const minNet = Math.min(...weeks.map(w => w.net));
  const avgNet = weeks.reduce((s, w) => s + w.net, 0) / weeks.length;
  const avgPct = weeks.reduce((s, w) => s + w.pct, 0) / weeks.length;
  const fmt = n => '$' + Math.round(n).toLocaleString();

  // SVG sparkline
  const W = 800, H = 140, PAD = 30;
  const xStep = (W - PAD * 2) / (weeks.length - 1);
  const yRange = maxNet - minNet || 1;
  const toY = v => PAD + (1 - (v - minNet) / yRange) * (H - PAD * 2);
  const toX = i => PAD + i * xStep;

  const linePath = weeks.map((w, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(w.net).toFixed(1)}`).join(' ');
  const areaPath = linePath + ` L${toX(weeks.length-1).toFixed(1)},${H-PAD} L${toX(0).toFixed(1)},${H-PAD} Z`;
  const avgY = toY(avgNet).toFixed(1);

  const dots = weeks.map((w, i) => {
    const isLow  = w.net === minNet;
    const isHigh = w.net === maxNet;
    const col = isLow ? '#dc2626' : isHigh ? '#16a34a' : '#3b82f6';
    const r   = isLow || isHigh ? 5 : 3.5;
    return `<circle cx="${toX(i).toFixed(1)}" cy="${toY(w.net).toFixed(1)}" r="${r}" fill="${col}" stroke="white" stroke-width="1.5"/>`;
  }).join('');

  el.innerHTML = `
    <div class="ceo-back-btn" onclick="showCeoSection('ceo-summary')"><i class="fa-solid fa-arrow-left"></i> Back to Summary</div>
    <div class="ceo-trend-stats">
      <div class="ceo-trend-stat"><div class="ceo-trend-stat-v">${fmt(avgNet)}</div><div class="ceo-trend-stat-l">Avg Weekly Net</div></div>
      <div class="ceo-trend-stat"><div class="ceo-trend-stat-v" style="color:#16a34a">${fmt(maxNet)}</div><div class="ceo-trend-stat-l">Best Week (${weeks.find(w=>w.net===maxNet).week})</div></div>
      <div class="ceo-trend-stat"><div class="ceo-trend-stat-v" style="color:#dc2626">${fmt(minNet)}</div><div class="ceo-trend-stat-l">Worst Week (${weeks.find(w=>w.net===minNet).week})</div></div>
      <div class="ceo-trend-stat"><div class="ceo-trend-stat-v">${(avgPct*100).toFixed(1)}%</div><div class="ceo-trend-stat-l">Avg Net Margin</div></div>
    </div>

    <div class="ceo-trend-chart-wrap">
      <svg viewBox="0 0 ${W} ${H}" class="ceo-trend-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.02"/>
          </linearGradient>
        </defs>
        <path d="${areaPath}" fill="url(#netGrad)"/>
        <line x1="${PAD}" y1="${avgY}" x2="${W-PAD}" y2="${avgY}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
        <text x="${W-PAD+4}" y="${parseFloat(avgY)+4}" font-size="9" fill="#94a3b8">avg</text>
        <path d="${linePath}" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
        ${dots}
      </svg>
      <div class="ceo-trend-x-labels">
        ${weeks.map(w => `<span>${w.week}</span>`).join('')}
      </div>
    </div>

    <div class="ceo-trend-table-wrap">
      <table class="ceo-trend-table">
        <thead><tr><th>Week</th><th>Net</th><th>Net %</th><th>vs Avg</th></tr></thead>
        <tbody>
          ${weeks.map(w => {
            const diff = w.net - avgNet;
            const isLow = w.net === minNet, isHigh = w.net === maxNet;
            const cls = isLow ? 'ceo-tr-low' : isHigh ? 'ceo-tr-high' : '';
            return `<tr class="${cls}">
              <td>${w.week}</td>
              <td><strong>${fmt(w.net)}</strong>${isHigh ? ' <span class="ceo-tr-flag high">Best</span>' : isLow ? ' <span class="ceo-tr-flag low">Worst</span>' : ''}</td>
              <td>${(w.pct*100).toFixed(1)}%</td>
              <td style="color:${diff>=0?'#16a34a':'#dc2626'}">${diff>=0?'+':''}${fmt(diff)}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderCeoFindings() {
  const el = document.getElementById('ceo-findings-container');
  if (!el) return;
  const findings = CEO_DATA.findings || [];
  const sevColor = { critical: '#dc2626', high: '#ea580c', med: '#ca8a04' };
  const sevLabel = { critical: 'Critical', high: 'High', med: 'Medium' };
  const flagColor = { bad: '#dc2626', flag: '#ca8a04', ok: '#16a34a' };

  el.innerHTML = `
    <div class="ceo-back-btn" onclick="showCeoSection('ceo-summary')"><i class="fa-solid fa-arrow-left"></i> Back to Summary</div>
    <div class="ceo-findings-intro">
      The following discrepancies were identified by analyzing 15 weeks of actual P&amp;L data.
      Each item requires a management response — either explanation, correction, or documented follow-up.
    </div>
    <div class="ceo-findings-list">
      ${findings.map(f => `
        <div class="ceo-finding-card" style="border-left:4px solid ${sevColor[f.severity]}">
          <div class="ceo-finding-header">
            <div class="ceo-finding-icon" style="background:${sevColor[f.severity]}18;color:${sevColor[f.severity]}">
              <i class="fa-solid ${f.icon}"></i>
            </div>
            <div class="ceo-finding-title-wrap">
              <div class="ceo-finding-title">${f.title}</div>
              <div class="ceo-finding-meta">
                <span class="ceo-finding-badge" style="background:${sevColor[f.severity]}18;color:${sevColor[f.severity]}">${sevLabel[f.severity]}</span>
                <span class="ceo-finding-loc"><i class="fa-solid fa-location-dot"></i> ${f.location}</span>
              </div>
            </div>
          </div>
          <div class="ceo-finding-detail">${f.detail}</div>
          <div class="ceo-finding-numbers">
            ${f.numbers.map(n => `
              <div class="ceo-finding-num">
                <div class="ceo-finding-num-val" style="color:${flagColor[n.flag]}">${n.value}</div>
                <div class="ceo-finding-num-lbl">${n.label}</div>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>`;
}

function renderCeoDashboard() {
  renderCeoSummary();
  renderCeoScorecard();
  renderCeoActions();
  renderCeoTrend();
  renderCeoFindings();
}

/* ── Café Analysis ─────────────────────────────────────────── */

function cafeCogsColor(pct) {
  if (pct <= 0.35) return '#16a34a';
  if (pct <= 0.50) return '#ca8a04';
  if (pct <= 0.65) return '#ea580c';
  return '#dc2626';
}

function cafeCogsLabel(pct) {
  if (pct <= 0.35) return 'Good';
  if (pct <= 0.50) return 'High';
  if (pct <= 0.65) return 'Very High';
  return 'Critical';
}

function renderCafeStats() {
  const el = document.getElementById('cafe-stats-container');
  if (!el) return;
  const d = CAFE_DATA;
  const weeks = d.weeklyFinancials;
  const birmAvg = weeks.reduce((s,w) => s + w.birmPct, 0) / weeks.length;
  const besAvg  = weeks.reduce((s,w) => s + w.besPct,  0) / weeks.length;

  const combinedRevWeekly = d.revWeekly.birmingham + d.revWeekly.bessemer;
  const targetCogsWeekly  = combinedRevWeekly * d.targetFoodCostPct;
  const actualCogsWeekly  = (d.revWeekly.birmingham * birmAvg) + (d.revWeekly.bessemer * besAvg);
  const weeklyOverspend   = Math.max(0, actualCogsWeekly - targetCogsWeekly);
  const annualOpportunity = Math.round(weeklyOverspend * 52);

  const totalMealsWeekly = (d.mealsPerDay.birmingham + d.mealsPerDay.bessemer) * 7;
  const costPerMealActual = actualCogsWeekly / totalMealsWeekly;

  const stats = [
    { label: "Birmingham Avg Food Cost",  value: (birmAvg*100).toFixed(1)+'%', icon: "fa-chart-pie",        color: "#dc2626",   note: "15-week avg · target 30%",    badge: "Critical" },
    { label: "Bessemer Avg Food Cost",    value: (besAvg*100).toFixed(1)+'%',  icon: "fa-chart-pie",        color: "#ea580c",   note: "15-week avg · target 30%",    badge: "High" },
    { label: "Actual Cost Per Meal",      value: '$'+costPerMealActual.toFixed(2), icon: "fa-utensils",     color: "#1d4ed8",   note: 'at $'+d.ratePerMeal+'/meal rate · '+(costPerMealActual > d.ratePerMeal ? 'over rate' : 'thin margin') },
    { label: "Annual Savings @ 30% Target", value: '$'+annualOpportunity.toLocaleString(), icon: "fa-piggy-bank", color: "#166534", note: "Combined Birmingham + Bessemer" }
  ];

  el.innerHTML = `
    <div class="cafe-stats-grid">
      ${stats.map(s => `
        <div class="cafe-stat-card">
          <div class="cafe-stat-icon" style="background:${s.color}20;color:${s.color}"><i class="fa-solid ${s.icon}"></i></div>
          <div class="cafe-stat-body">
            <div class="cafe-stat-value" style="color:${s.color}">${s.value}</div>
            <div class="cafe-stat-label">${s.label}</div>
            <div class="cafe-stat-note">${s.note}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="cafe-alert-banner">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <strong>Bessemer averaging ${(besAvg*100).toFixed(1)}% · Birmingham averaging ${(birmAvg*100).toFixed(1)}%</strong> — both above the 30% target. At $${weeklyOverspend.toLocaleString(undefined,{maximumFractionDigits:0})}/week over target combined, Bessemer is the primary concern: 59.1% on flat revenue with extreme week-to-week variance driven by ordering discipline. The top 3 opportunities (ordering cap, produce contract, Shaver switches) could recover $12,000–$18,000 at Bessemer alone.
      </div>
    </div>`;
}

function renderCafeFinancials() {
  const el = document.getElementById('cafe-financials-container');
  if (!el) return;
  const weeks = CAFE_DATA.weeklyFinancials;
  const birmAvg = weeks.reduce((s,w) => s + w.birmPct, 0) / weeks.length;
  const besAvg  = weeks.reduce((s,w) => s + w.besPct,  0) / weeks.length;

  el.innerHTML = `
    <div class="cafe-table-wrap">
      <table class="cafe-fin-table">
        <thead>
          <tr>
            <th>Week</th>
            <th>Birmingham COGS</th>
            <th>Birm %</th>
            <th>Bessemer COGS</th>
            <th>Bes %</th>
            <th>Combined</th>
          </tr>
        </thead>
        <tbody>
          ${weeks.map(w => {
            const combinedCogs = w.birmCogs + w.besCogs;
            const combinedRev  = CAFE_DATA.revWeekly.birmingham + CAFE_DATA.revWeekly.bessemer;
            const combinedPct  = combinedCogs / combinedRev;
            return `<tr>
              <td class="cafe-week-cell">${w.week}</td>
              <td>$${w.birmCogs.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
              <td><span class="cafe-pct-badge" style="background:${cafeCogsColor(w.birmPct)}20;color:${cafeCogsColor(w.birmPct)};border-color:${cafeCogsColor(w.birmPct)}40">${(w.birmPct*100).toFixed(1)}% <span class="cafe-pct-lbl">${cafeCogsLabel(w.birmPct)}</span></span></td>
              <td>$${w.besCogs.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
              <td><span class="cafe-pct-badge" style="background:${cafeCogsColor(w.besPct)}20;color:${cafeCogsColor(w.besPct)};border-color:${cafeCogsColor(w.besPct)}40">${(w.besPct*100).toFixed(1)}% <span class="cafe-pct-lbl">${cafeCogsLabel(w.besPct)}</span></span></td>
              <td><span class="cafe-pct-badge" style="background:${cafeCogsColor(combinedPct)}20;color:${cafeCogsColor(combinedPct)};border-color:${cafeCogsColor(combinedPct)}40">${(combinedPct*100).toFixed(1)}%</span></td>
            </tr>`;
          }).join('')}
        </tbody>
        <tfoot>
          <tr class="cafe-fin-avg">
            <td><strong>14-Week Average</strong></td>
            <td></td>
            <td><span class="cafe-pct-badge" style="background:#dc262620;color:#dc2626;border-color:#dc262640"><strong>${(birmAvg*100).toFixed(1)}%</strong></span></td>
            <td></td>
            <td><span class="cafe-pct-badge" style="background:#ea580c20;color:#ea580c;border-color:#ea580c40"><strong>${(besAvg*100).toFixed(1)}%</strong></span></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="cafe-legend">
      <span class="cafe-leg-item" style="color:#16a34a"><i class="fa-solid fa-circle" style="font-size:8px"></i> ≤35% Good</span>
      <span class="cafe-leg-item" style="color:#ca8a04"><i class="fa-solid fa-circle" style="font-size:8px"></i> 36–50% High</span>
      <span class="cafe-leg-item" style="color:#ea580c"><i class="fa-solid fa-circle" style="font-size:8px"></i> 51–65% Very High</span>
      <span class="cafe-leg-item" style="color:#dc2626"><i class="fa-solid fa-circle" style="font-size:8px"></i> >65% Critical</span>
    </div>`;
}

function renderCafeOpportunities() {
  const el = document.getElementById('cafe-opportunities-container');
  if (!el) return;

  const priorityColor = { critical: '#dc2626', high: '#ea580c', med: '#ca8a04', low: '#4b5563' };
  const priorityLabel = { critical: 'Critical', high: 'High Impact', med: 'Medium', low: 'Low' };

  const totalAnnualLow  = CAFE_DATA.opportunities.reduce((s,o) => s + o.annualLow,  0);
  const totalAnnualHigh = CAFE_DATA.opportunities.reduce((s,o) => s + o.annualHigh, 0);

  el.innerHTML = `
    <div class="cafe-opp-summary">
      <div class="cafe-opp-summary-inner">
        <span class="cafe-opp-summary-label">Total Annual Savings Opportunity</span>
        <span class="cafe-opp-summary-range">$${totalAnnualLow.toLocaleString()} – $${totalAnnualHigh.toLocaleString()}</span>
        <span class="cafe-opp-summary-note">across all 6 opportunities · Birmingham + Bessemer combined</span>
      </div>
    </div>
    <div class="cafe-opp-list">
      ${CAFE_DATA.opportunities.map(o => `
        <div class="cafe-opp-card">
          <div class="cafe-opp-rank" style="background:${priorityColor[o.priority]}15;color:${priorityColor[o.priority]};border-color:${priorityColor[o.priority]}30">
            <i class="fa-solid ${o.icon}"></i>
            <span class="cafe-opp-rank-num">#${o.rank}</span>
          </div>
          <div class="cafe-opp-body">
            <div class="cafe-opp-header">
              <span class="cafe-opp-title">${o.title}</span>
              <span class="cafe-opp-priority" style="background:${priorityColor[o.priority]}15;color:${priorityColor[o.priority]}">${priorityLabel[o.priority]}</span>
            </div>
            <p class="cafe-opp-detail">${o.detail}</p>
            <div class="cafe-opp-impact">
              <div class="cafe-opp-impact-item">
                <span class="cafe-opp-impact-label">Weekly</span>
                <span class="cafe-opp-impact-value">$${o.weeklyLow.toLocaleString()}–$${o.weeklyHigh.toLocaleString()}</span>
              </div>
              <div class="cafe-opp-impact-sep"></div>
              <div class="cafe-opp-impact-item">
                <span class="cafe-opp-impact-label">Annual</span>
                <span class="cafe-opp-impact-value" style="font-weight:700;color:#166534">$${o.annualLow.toLocaleString()}–$${o.annualHigh.toLocaleString()}</span>
              </div>
              <div class="cafe-opp-action"><i class="fa-solid fa-arrow-right"></i> ${o.action}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>`;
}

function renderCafeIngredients() {
  const el = document.getElementById('cafe-ingredients-container');
  if (!el) return;

  const cats = [...new Set(CAFE_DATA.ingredients.map(i => i.category))];
  const knownCount      = CAFE_DATA.ingredients.filter(i => i.status === 'known').length;
  const needsCount      = CAFE_DATA.ingredients.filter(i => i.status === 'needsPrice').length;
  const shaverSwitch    = CAFE_DATA.ingredients.filter(i => i.shaverSavings > 0).length;
  const forestWoodCount = CAFE_DATA.ingredients.filter(i => i.status === 'forestWood').length;

  el.innerHTML = `
    <div class="cafe-ing-summary-bar">
      <span class="cafe-ing-bar-item green"><i class="fa-solid fa-circle-check"></i> ${knownCount} Items Priced</span>
      <span class="cafe-ing-bar-item orange"><i class="fa-solid fa-truck"></i> ${forestWoodCount} Forest Wood Quoted</span>
      <span class="cafe-ing-bar-item red"><i class="fa-solid fa-circle-question"></i> ${needsCount} Need Pricing</span>
      <span class="cafe-ing-bar-item blue"><i class="fa-solid fa-arrows-rotate"></i> ${shaverSwitch} Shaver Switch Available</span>
    </div>
    ${cats.map(cat => {
      const items = CAFE_DATA.ingredients.filter(i => i.category === cat);
      return `
        <div class="cafe-ing-category">
          <div class="cafe-ing-cat-title">${cat}</div>
          <table class="cafe-ing-table">
            <thead><tr><th>Item</th><th>Frequency</th><th>PFG $/serving</th><th>Shaver $/serving</th><th>Forest Wood $/serving</th><th>Status</th></tr></thead>
            <tbody>
              ${items.map(i => {
                const pfgDisplay        = i.pfgCost        ? '$'+i.pfgCost.toFixed(3)        : i.estimated ? '~$'+i.estimated.toFixed(2)+' est.' : '—';
                const shaverDisplay     = i.shaverCost     ? '$'+i.shaverCost.toFixed(3)     : '—';
                const forestWoodDisplay = i.forestWoodCost ? '$'+i.forestWoodCost.toFixed(3) : '—';
                const savings = i.shaverSavings ? `<span class="cafe-shaver-save">Shaver saves $${i.shaverSavings.toFixed(3)}/serving</span>` : '';
                const statusBadge = i.status === 'known'
                  ? '<span class="cafe-status-badge known">Priced</span>'
                  : i.status === 'forestWood'
                  ? '<span class="cafe-status-badge forestwood">Forest Wood</span>'
                  : '<span class="cafe-status-badge needs">Needs Quote</span>';
                const rowClass = i.status === 'needsPrice' ? 'cafe-ing-row needs' : 'cafe-ing-row';
                const flagNote = i.note ? `<div class="cafe-ing-note"><i class="fa-solid fa-circle-info"></i> ${i.note}</div>` : '';
                return `<tr class="${rowClass}">
                  <td>${i.item}${flagNote}</td>
                  <td class="cafe-ing-freq">${i.frequency}</td>
                  <td class="cafe-ing-cost">${pfgDisplay}</td>
                  <td class="cafe-ing-cost">${shaverDisplay}${savings}</td>
                  <td class="cafe-ing-cost">${forestWoodDisplay}</td>
                  <td>${statusBadge}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`;
    }).join('')}
    <div class="cafe-ing-footnote"><i class="fa-solid fa-info-circle"></i> Estimated costs based on typical institutional food service pricing. All items marked "Needs Quote" should be confirmed with PFG and Shaver before ordering. Forest Wood pricing as of April 2026 — confirm case sizes before placing standing order.</div>`;
}

function renderCafeRotation() {
  const el = document.getElementById('cafe-rotation-container');
  if (!el) return;

  // High-cost keywords to highlight
  const flagItems = ['chicken tender','tenders','fish','wings','bacon','pork chop','salad bar','fresh fruit','fruit','cobbler','pudding'];

  function flagMeal(text) {
    const lower = text.toLowerCase();
    const isFlagged = flagItems.some(f => lower.includes(f));
    return isFlagged ? `<span class="cafe-rot-flagged">${text}</span>` : text;
  }

  el.innerHTML = CAFE_DATA.rotation.map(wk => `
    <div class="cafe-rot-week">
      <div class="cafe-rot-week-title">Week ${wk.week}</div>
      <div class="cafe-rot-scroll">
        <table class="cafe-rot-table">
          <thead>
            <tr>
              <th>Day</th>
              <th><i class="fa-solid fa-sun" style="color:#f59e0b"></i> Breakfast</th>
              <th><i class="fa-solid fa-cloud-sun" style="color:#3b82f6"></i> Lunch</th>
              <th><i class="fa-solid fa-moon" style="color:#6366f1"></i> Dinner</th>
            </tr>
          </thead>
          <tbody>
            ${wk.days.map(d => `<tr>
              <td class="cafe-rot-day">${d.day}</td>
              <td class="cafe-rot-meal">${flagMeal(d.bfast)}</td>
              <td class="cafe-rot-meal">${flagMeal(d.lunch)}</td>
              <td class="cafe-rot-meal">${flagMeal(d.dinner)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `).join('') + `
    <div class="cafe-rot-legend">
      <span class="cafe-rot-leg-item"><span class="cafe-rot-flagged" style="display:inline">Example</span> = High-cost item (protein/produce/daily salad bar)</span>
    </div>`;
}

function renderCafeProfitabilityRoadmap() { /* replaced by renderLocationPlan */ }

function renderLocationPlan(loc) {
  const containerId = loc === 'birmingham' ? 'cafe-birmingham-plan-container' : 'cafe-bessemer-plan-container';
  const el = document.getElementById(containerId);
  if (!el) return;
  const plan = CAFE_DATA.locationPlans[loc];
  const col = plan.color;

  function fmtWk(n) { return '$' + n.toLocaleString() + '/wk'; }
  function fmtYr(n) { return '$' + n.toLocaleString() + '/yr'; }

  // ── Financial snapshot ──
  const phaseColors = ['#dc2626','#ea580c','#16a34a'];
  const totalSavingsYr = plan.phases.reduce((s,p) => s + p.savingsYr, 0);

  const snapshotHtml = `
    <div class="lp-snapshot">
      <div class="lp-snap-card lp-snap-current">
        <div class="lp-snap-label">Current Food Cost</div>
        <div class="lp-snap-val" style="color:#dc2626">${(plan.currentPct*100).toFixed(1)}%</div>
        <div class="lp-snap-sub">$${plan.currentCogsWk.toLocaleString()}/wk avg · 15-week actual</div>
      </div>
      <div class="lp-snap-arrow"><i class="fa-solid fa-arrow-right-long"></i></div>
      <div class="lp-snap-card lp-snap-target">
        <div class="lp-snap-label">90-Day Target</div>
        <div class="lp-snap-val" style="color:#16a34a">${(plan.targetPct*100).toFixed(1)}%</div>
        <div class="lp-snap-sub">$${plan.targetCogsWk.toLocaleString()}/wk max · on $${plan.revWeekly.toLocaleString()} revenue</div>
      </div>
      <div class="lp-snap-arrow"><i class="fa-solid fa-equals"></i></div>
      <div class="lp-snap-card lp-snap-gap">
        <div class="lp-snap-label">Annual Opportunity</div>
        <div class="lp-snap-val" style="color:${col}">$${totalSavingsYr.toLocaleString()}</div>
        <div class="lp-snap-sub">$${plan.gapWeekly}/wk gap to close</div>
      </div>
    </div>
    <div class="lp-rev-note"><i class="fa-solid fa-circle-info"></i> Revenue basis: ${plan.revNote}</div>
  `;

  // ── Insight banner ──
  const insightHtml = `
    <div class="lp-insight" style="border-left:4px solid ${col}">
      <i class="fa-solid fa-lightbulb" style="color:${col}"></i>
      <span>${plan.insight}</span>
    </div>
  `;

  // ── Benchmark weeks (Bessemer only) ──
  const benchHtml = plan.benchmarkWeeks ? `
    <div class="lp-bench">
      <div class="lp-bench-hdr"><i class="fa-solid fa-circle-check" style="color:#16a34a"></i> Proof of Concept — These Weeks Already Hit the Target</div>
      <div class="cafe-table-wrap">
        <table class="cafe-fin-table">
          <thead><tr><th>Week</th><th>COGS Spent</th><th>Food Cost %</th></tr></thead>
          <tbody>
            ${plan.benchmarkWeeks.map(w => `
              <tr>
                <td>${w.week}</td>
                <td>$${w.cogs.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                <td><span class="cafe-pct-badge" style="background:#16a34a20;color:#16a34a;border-color:#16a34a40">${(w.pct*100).toFixed(1)}%</span></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p class="lp-bench-note">The kitchen and menu can already hit the 42% target. The only variable is ordering consistency.</p>
    </div>
  ` : '';

  // ── Phase cards ──
  const phaseHtml = plan.phases.map((ph, pi) => {
    const actionRows = ph.actions.map(a => `
      <div class="lp-action">
        <div class="lp-action-num" style="background:${ph.color}15;color:${ph.color};border:1px solid ${ph.color}30">${a.num}</div>
        <div class="lp-action-body">
          <div class="lp-action-title">${a.title}</div>
          <div class="lp-action-detail">${a.detail}</div>
          <div class="lp-action-impact" style="color:#16a34a"><i class="fa-solid fa-arrow-trend-down"></i> ${a.impact}</div>
        </div>
      </div>
    `).join('');

    return `
      <div class="lp-phase">
        <div class="lp-phase-header" style="background:${ph.color}08;border-left:4px solid ${ph.color}">
          <div class="lp-phase-icon" style="background:${ph.color}20;color:${ph.color}"><i class="fa-solid ${ph.icon}"></i></div>
          <div class="lp-phase-meta">
            <div class="lp-phase-tag" style="color:${ph.color}">Phase ${ph.phase} · ${ph.timeline}</div>
            <div class="lp-phase-title">${ph.title}</div>
            <div class="lp-phase-note">${ph.timelineNote}</div>
          </div>
          <div class="lp-phase-savings">
            <div class="lp-phase-sav-wk" style="color:${ph.color}">$${ph.savingsWk.toLocaleString()}/wk</div>
            <div class="lp-phase-sav-yr">$${ph.savingsYr.toLocaleString()}/yr</div>
          </div>
        </div>
        <div class="lp-actions-list">${actionRows}</div>
      </div>
    `;
  }).join('');

  // ── Progress bar ──
  const progressHtml = `
    <div class="lp-progress">
      <div class="lp-progress-label">COGS Reduction Trajectory</div>
      <div class="lp-progress-track">
        ${[[plan.currentPct,'Now','#dc2626'],
           [plan.phases[0] ? plan.currentPct - (plan.phases[0].savingsWk / plan.revWeekly) : plan.currentPct, 'Phase 1','#ea580c'],
           [plan.phases[1] ? plan.currentPct - ((plan.phases[0].savingsWk + plan.phases[1].savingsWk) / plan.revWeekly) : plan.currentPct, 'Phase 2','#ca8a04'],
           [plan.targetPct,'Phase 3','#16a34a']
          ].map(([pct,lbl,c]) => `
          <div class="lp-prog-step">
            <div class="lp-prog-bar-wrap">
              <div class="lp-prog-bar" style="width:${Math.min(100,(pct/plan.currentPct)*100).toFixed(0)}%;background:${c}">
                <span class="lp-prog-pct">${(pct*100).toFixed(1)}%</span>
              </div>
            </div>
            <div class="lp-prog-lbl">${lbl}</div>
          </div>`).join('')}
      </div>
    </div>
  `;

  el.innerHTML = snapshotHtml + insightHtml + progressHtml + `<div class="lp-phases-list">${phaseHtml}</div>` + benchHtml;
}

function renderBessemerPlan() { /* replaced by renderLocationPlan('bessemer') */ }

function renderCafeAnalysis() {
  renderCafeStats();
  renderCafeFinancials();
  renderCafeOpportunities();
  renderLocationPlan('birmingham');
  renderLocationPlan('bessemer');
  renderCafeIngredients();
  renderCafeRotation();
}

/* ── Population Analysis ──────────────────────────────────── */
function renderPopulationOverview() {
  const el = document.getElementById('pop-overview-container');
  if (!el) return;

  const birm = REPORT.locations.birmingham;
  const bes  = REPORT.locations.bessemer;
  const birmPopCogs = birm.materialCOGS.items.find(i => i.cat === 'Population');
  const besPopCogs  = bes.materialCOGS.items.find(i => i.cat === 'Population');
  const birmRevPop  = birm.revenue.items.find(i => i.cat === 'Population');
  const besRevPop   = bes.revenue.items.find(i => i.cat === 'Population');

  const totalRev  = birmRevPop.amount + besRevPop.amount;
  const totalCogs = birmPopCogs.amount + besPopCogs.amount;
  const combinedPct = (totalCogs / totalRev) * 100;

  // Birmingham: ~1,150/day · Bessemer: ~350/day · 3 meals each = 31,500 meals/week
  const dailyPopBirm = 1150;
  const dailyPopBess = 350;
  const dailyPop = dailyPopBirm + dailyPopBess;
  const weeklyMeals = dailyPop * 3 * 7;
  const costPerMeal = totalCogs / weeklyMeals;
  const targetPerMeal = 0.54;

  const cogsBirmColor = birmPopCogs.pct <= 35 ? '#16a34a' : birmPopCogs.pct <= 45 ? '#ca8a04' : '#dc2626';
  const cogsBeColor   = besPopCogs.pct  <= 35 ? '#16a34a' : besPopCogs.pct  <= 45 ? '#ca8a04' : '#dc2626';

  const stats = [
    { label: "Birmingham Food Cost",  value: birmPopCogs.pct.toFixed(1)+'%',  icon: "fa-building",   color: cogsBirmColor, note: "week of Apr 13–19 · target ≤35%" },
    { label: "Bessemer Food Cost",    value: besPopCogs.pct.toFixed(1)+'%',   icon: "fa-store",      color: cogsBeColor,  note: "week of Apr 13–19 · target ≤35%" },
    { label: "Actual Cost Per Meal",  value: '$'+costPerMeal.toFixed(2),       icon: "fa-utensils",   color: "#dc2626",    note: 'vs $'+targetPerMeal.toFixed(2)+' target · '+dailyPopBirm.toLocaleString()+' Bham + '+dailyPopBess+' Bess · 3 meals/day' },
    { label: "Annual Shaver Savings", value: '$'+CEO_DATA.lines[0].annualSavings.toLocaleString(), icon: "fa-piggy-bank", color: "#16a34a", note: "23 items confirmed cheaper · full vendor transition" }
  ];

  el.innerHTML = `
    <div class="cafe-stats-grid">
      ${stats.map(s => `
        <div class="cafe-stat-card">
          <div class="cafe-stat-icon" style="background:${s.color}20;color:${s.color}"><i class="fa-solid ${s.icon}"></i></div>
          <div class="cafe-stat-body">
            <div class="cafe-stat-value" style="color:${s.color}">${s.value}</div>
            <div class="cafe-stat-label">${s.label}</div>
            <div class="cafe-stat-note">${s.note}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="cafe-alert-banner">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <strong>Population is the business anchor — 73% of total revenue · $${totalRev.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/week combined.</strong>
        Birmingham sits at a healthy ${birmPopCogs.pct.toFixed(1)}% COGS. Bessemer at ${besPopCogs.pct.toFixed(1)}% remains above the 35% target.
        At $${costPerMeal.toFixed(2)}/meal actual vs $${targetPerMeal.toFixed(2)} target, the primary lever is completing the Shaver vendor transition —
        23 confirmed items with $1,146+/month in savings.
      </div>
    </div>`;
}

function renderPopulationLocationBreakdown() {
  const el = document.getElementById('pop-location-container');
  if (!el) return;

  const birm = REPORT.locations.birmingham;
  const bes  = REPORT.locations.bessemer;
  const birmPopCogs = birm.materialCOGS.items.find(i => i.cat === 'Population');
  const besPopCogs  = bes.materialCOGS.items.find(i => i.cat === 'Population');
  const birmRevPop  = birm.revenue.items.find(i => i.cat === 'Population');
  const besRevPop   = bes.revenue.items.find(i => i.cat === 'Population');
  const birmNet     = birm.detailedNet.find(i => i.cat === 'Population');
  const besNet      = bes.detailedNet.find(i => i.cat === 'Population');

  const totalRev  = birmRevPop.amount + besRevPop.amount;
  const totalCogs = birmPopCogs.amount + besPopCogs.amount;
  const totalNet  = birmNet.amount + besNet.amount;
  const combinedCogsPct = (totalCogs / totalRev) * 100;
  const combinedNetPct  = (totalNet  / totalRev) * 100;

  const fmt = n => '$'+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
  const pctBadge = (pct, threshold=35) => {
    const color = pct <= threshold ? '#16a34a' : pct <= 45 ? '#ca8a04' : '#dc2626';
    const label = pct <= threshold ? 'Healthy' : pct <= 45 ? 'Watch' : 'High';
    return `<span class="cafe-pct-badge" style="background:${color}20;color:${color};border-color:${color}40">${pct.toFixed(1)}% <span class="cafe-pct-lbl">${label}</span></span>`;
  };
  const netBadge = pct => `<span class="cafe-pct-badge" style="background:#16a34a20;color:#16a34a;border-color:#16a34a40">${pct.toFixed(1)}%</span>`;

  el.innerHTML = `
    <div class="cafe-table-wrap">
      <table class="cafe-fin-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Weekly Revenue</th>
            <th>Food Cost (COGS)</th>
            <th>COGS %</th>
            <th>Net Income</th>
            <th>Net %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="cafe-week-cell"><i class="fa-solid fa-building" style="color:#1d4ed8;margin-right:6px"></i><strong>Birmingham</strong></td>
            <td>${fmt(birmRevPop.amount)}</td>
            <td>${fmt(birmPopCogs.amount)}</td>
            <td>${pctBadge(birmPopCogs.pct)}</td>
            <td>${fmt(birmNet.amount)}</td>
            <td>${netBadge(birmNet.pct)}</td>
          </tr>
          <tr>
            <td class="cafe-week-cell"><i class="fa-solid fa-store" style="color:#ea580c;margin-right:6px"></i><strong>Bessemer</strong></td>
            <td>${fmt(besRevPop.amount)}</td>
            <td>${fmt(besPopCogs.amount)}</td>
            <td>${pctBadge(besPopCogs.pct)}</td>
            <td>${fmt(besNet.amount)}</td>
            <td>${netBadge(besNet.pct)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="cafe-fin-avg">
            <td><strong>Combined</strong></td>
            <td><strong>${fmt(totalRev)}</strong></td>
            <td><strong>${fmt(totalCogs)}</strong></td>
            <td>${pctBadge(combinedCogsPct)}</td>
            <td><strong>${fmt(totalNet)}</strong></td>
            <td>${netBadge(combinedNetPct)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="cafe-legend" style="margin-top:16px">
      <span class="cafe-leg-item" style="color:#16a34a"><i class="fa-solid fa-circle" style="font-size:8px"></i> ≤35% Healthy</span>
      <span class="cafe-leg-item" style="color:#ca8a04"><i class="fa-solid fa-circle" style="font-size:8px"></i> 36–45% Watch</span>
      <span class="cafe-leg-item" style="color:#dc2626"><i class="fa-solid fa-circle" style="font-size:8px"></i> >45% High</span>
    </div>
    <div class="cafe-alert-banner" style="margin-top:20px;background:#1d4ed815;border-color:#1d4ed830">
      <i class="fa-solid fa-circle-info" style="color:#1d4ed8"></i>
      <div>
        <strong>Birmingham carries ${((birmRevPop.amount/totalRev)*100).toFixed(0)}% of population revenue</strong> and is the more cost-efficient operation at ${birmPopCogs.pct.toFixed(1)}% COGS.
        Bessemer's higher COGS% (${besPopCogs.pct.toFixed(1)}%) on a smaller revenue base ($${(besRevPop.amount/1000).toFixed(0)}K/week) creates the most addressable savings opportunity.
        The Shaver switch list targets both locations with no menu changes required.
      </div>
    </div>`;
}

function renderPopulationVendorSwitches() {
  const el = document.getElementById('pop-vendor-container');
  if (!el) return;

  const highItems = DATA.switchToShaver.filter(i => i.priority === 'high');
  const medItems  = DATA.switchToShaver.filter(i => i.priority === 'med');
  const lowItems  = DATA.switchToShaver.filter(i => i.priority === 'low');
  const totalMonthly = DATA.monthlySavings.find(i => i.isTotal);

  const renderItem = i => {
    const savings = i.savings
      ? `<span style="color:#16a34a;font-weight:600">−$${i.savings.toFixed(2)}/cs</span>`
      : (i.note ? `<span style="color:#16a34a;font-weight:600">${i.note.split('—')[0].trim()}</span>` : '—');
    const noteHtml = i.note ? `<div class="cafe-ing-note"><i class="fa-solid fa-circle-info"></i> ${i.note}</div>` : '';
    const priorityColor = { high: '#dc2626', med: '#ca8a04', low: '#4b5563' };
    const rowStyle = i.priority === 'high' ? 'background:var(--bg-card-hover,#f8fafc)' : '';
    return `<tr style="${rowStyle}">
      <td>${i.item}${noteHtml}</td>
      <td>$${i.pfgPrice.toFixed(2)} / ${i.pfgUnit}</td>
      <td>$${i.shaverPrice.toFixed(2)} / ${i.shaverUnit}</td>
      <td>${savings}</td>
      <td><span style="background:${priorityColor[i.priority]}15;color:${priorityColor[i.priority]};border:1px solid ${priorityColor[i.priority]}30;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;white-space:nowrap">${i.priority === 'high' ? 'High' : i.priority === 'med' ? 'Med' : 'Low'}</span></td>
    </tr>`;
  };

  el.innerHTML = `
    <div class="cafe-opp-summary">
      <div class="cafe-opp-summary-inner">
        <span class="cafe-opp-summary-label">Total Monthly Savings — Full Shaver Transition</span>
        <span class="cafe-opp-summary-range">$${totalMonthly.monthlySavings.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}+/month</span>
        <span class="cafe-opp-summary-note">23 items confirmed cheaper · $${CEO_DATA.lines[0].annualSavings.toLocaleString()}/year</span>
      </div>
    </div>
    <div class="cafe-table-wrap" style="margin-top:20px">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px">
        <span style="background:#dc262615;color:#dc2626;border:1px solid #dc262630;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600">High Impact (${highItems.length})</span>
        <span style="background:#ca8a0415;color:#ca8a04;border:1px solid #ca8a0430;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600">Medium (${medItems.length})</span>
        <span style="background:#4b556315;color:#4b5563;border:1px solid #4b556330;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:600">Low (${lowItems.length})</span>
      </div>
      <table class="cafe-fin-table">
        <thead>
          <tr><th>Item</th><th>PFG Price</th><th>Shaver Price</th><th>Savings</th><th>Priority</th></tr>
        </thead>
        <tbody>
          ${[...highItems, ...medItems, ...lowItems].map(renderItem).join('')}
        </tbody>
      </table>
    </div>
    <div class="cafe-ing-footnote" style="margin-top:16px">
      <i class="fa-solid fa-info-circle"></i> Prices from PFG Invoice #6776963 (04/07/26) and Shaver ISP (03/01–03/31/26). Verify current Shaver pricing before placing order.
    </div>`;
}

function renderPopulationMenu() {
  const el = document.getElementById('pop-menu-container');
  if (!el) return;

  el.innerHTML = `
    <div style="margin-bottom:20px">
      <a href="population-menu.html" target="_blank" style="display:inline-flex;align-items:center;gap:8px;background:var(--accent,#2563eb);color:#fff;border-radius:8px;padding:10px 20px;font-size:14px;font-weight:600;text-decoration:none">
        <i class="fa-solid fa-file-alt"></i> Full Printable Menu
        <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:10px;opacity:0.8"></i>
      </a>
    </div>
    <div class="cafe-alert-banner" style="background:#1d4ed815;border-color:#1d4ed830;margin-bottom:24px">
      <i class="fa-solid fa-circle-info" style="color:#1d4ed8"></i>
      <div>
        <strong>2-week rotating menu · 3 meals/day · ~1,150 daily population.</strong>
        Breakfast: fortified beverage + hot protein + bread. Lunch: sandwich + vegetable + starch + dessert.
        Dinner: hot entrée + vegetable side + dessert.
      </div>
    </div>
    <div class="cafe-table-wrap">
      <table class="cafe-fin-table">
        <thead>
          <tr><th>Meal</th><th>Components</th><th>Key Proteins / Entrées</th><th>Cost Control</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Breakfast</strong></td>
            <td>Hot protein · Bread · Condiment · Fortified beverage</td>
            <td>Eggs, Grits, Oatmeal, Toast</td>
            <td><span class="cafe-status-badge known">Controlled</span></td>
          </tr>
          <tr>
            <td><strong>Lunch</strong></td>
            <td>Sandwich protein · Bread · Condiment · Vegetable · Starch · Beverage · Dessert</td>
            <td>Turkey, PB&amp;J, Salami, Chicken Patty, Beef Patty</td>
            <td><span class="cafe-status-badge known">Controlled</span></td>
          </tr>
          <tr>
            <td><strong>Dinner</strong></td>
            <td>Hot entrée · Vegetable · Fortified beverage · Dessert</td>
            <td>Spaghetti w/ Meat Sauce, Lasagna, Beef Mac, Chicken Rice Casserole, Mexican Beef Bowl</td>
            <td><span class="cafe-pct-badge" style="background:#ca8a0415;color:#ca8a04;border-color:#ca8a0430">Protein Cost</span></td>
          </tr>
        </tbody>
      </table>
    </div>`;
}

function renderPopulationAnalysis() {
  renderPopulationOverview();
  renderPopulationLocationBreakdown();
  renderPopulationVendorSwitches();
  renderPopulationMenu();
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
  initTabs();
  initBidTracker();
  renderFinancials();
  renderMenuRotation();
  renderMenuOrderList();
  renderCafeAnalysis();
  renderPopulationAnalysis();
  renderCeoDashboard();
  initScrollSpy();
  initDropdowns();
  initCatalog();
  initCalculator();
  document.getElementById('inmateSlider').addEventListener('input', e => {
    document.getElementById('inmateInput').value = e.target.value;
    calcUpdate();
  });
  document.getElementById('inmateInput').addEventListener('input', e => {
    const v = Math.min(1500, Math.max(900, parseInt(e.target.value) || 900));
    document.getElementById('inmateSlider').value = v;
    calcUpdate();
  });
  document.getElementById('targetInput').addEventListener('input', calcUpdate);

  const bdInmateEl = document.getElementById('bdInmateInput');
  if (bdInmateEl) bdInmateEl.addEventListener('input', () => renderBigDaddyInvoice());

  // CEO sidebar nav — intercept anchor clicks to use single-section view
  document.querySelectorAll('.nav-item[data-tab="ceo"][href^="#ceo-"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      showCeoSection(id);
    });
  });
});
