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
    s.style.display = (tab === 'analysis') ? '' : 'none';
  });
  const calcSection = document.getElementById('cost-calculator');
  if (calcSection) calcSection.style.display = (tab === 'calculator') ? '' : 'none';

  document.querySelectorAll('.report-section').forEach(s => {
    s.style.display = (tab === 'report') ? '' : 'none';
  });

  // Show/hide report nav labels
  document.querySelectorAll('.nav-section-label[data-tab="report"], .nav-item[data-tab="report"]').forEach(el => {
    el.style.display = (tab === 'report') ? '' : 'none';
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

  // Render report charts when switching to report tab
  if (tab === 'report') setTimeout(renderReportCharts, 80);

  // Scroll to top on switch
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initTabs() {
  const saved = localStorage.getItem(TAB_KEY) || 'analysis';
  switchTab(saved, false);

  // Tab-switching nav links (calculator + all report links)
  document.querySelectorAll('.nav-item[data-tab]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchTab(el.dataset.tab);
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

  // Analysis links → ensure analysis tab is active first
  document.querySelectorAll('.nav-item[href^="#"]:not([data-tab])').forEach(el => {
    el.addEventListener('click', () => {
      if (localStorage.getItem(TAB_KEY) !== 'analysis') switchTab('analysis');
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
});
