/* PDFOX.io — tools.js */
var TOOLS = [
  { slug: 'pdf-to-word', name: 'PDF vers Word', desc: 'Convertissez vos PDF en .docx editables.', icon: '📄', color: 'ci-blue', cat: 'conversion' },
  { slug: 'word-to-pdf', name: 'Word vers PDF', desc: 'Transformez vos fichiers Word en PDF professionnel.', icon: '📝', color: 'ci-orange', cat: 'conversion' },
  { slug: 'compress', name: 'Compresser PDF', desc: 'Reduisez la taille jusqu\'a 90% sans perte visible.', icon: '🗜️', color: 'ci-green', cat: 'edition' },
  { slug: 'merge', name: 'Fusionner PDF', desc: 'Combinez plusieurs PDF en un seul document.', icon: '🔗', color: 'ci-purple', cat: 'edition' },
  { slug: 'split', name: 'Diviser PDF', desc: 'Extrayez des pages ou divisez en plusieurs fichiers.', icon: '✂️', color: 'ci-pink', cat: 'edition' },
  { slug: 'pdf-to-jpg', name: 'PDF vers JPG', desc: 'Convertissez chaque page en image JPG haute qualite.', icon: '🖼️', color: 'ci-teal', cat: 'image' },
  { slug: 'jpg-to-pdf', name: 'JPG vers PDF', desc: 'Transformez vos photos en PDF partageable.', icon: '📸', color: 'ci-yellow', cat: 'image' },
  { slug: 'pdf-to-pptx', name: 'PDF vers PowerPoint', desc: 'Convertissez vos presentations PDF en .pptx.', icon: '📊', color: 'ci-orange', cat: 'conversion' },
  { slug: 'pdf-to-excel', name: 'PDF vers Excel', desc: 'Extrayez tableaux et donnees vers Excel.', icon: '📈', color: 'ci-green', cat: 'conversion' },
  { slug: 'sign', name: 'Signer PDF', desc: 'Ajoutez votre signature electronique legale.', icon: '✍️', color: 'ci-blue', cat: 'securite' },
  { slug: 'protect', name: 'Proteger PDF', desc: 'Securisez vos documents avec un mot de passe.', icon: '🔒', color: 'ci-red', cat: 'securite' },
  { slug: 'unlock', name: 'Deverrouiller PDF', desc: 'Supprimez les restrictions d\'un PDF.', icon: '🔓', color: 'ci-purple', cat: 'securite' },
  { slug: 'ocr', name: 'OCR PDF', desc: 'Rendez vos scans cherchables et editables.', icon: '🔍', color: 'ci-teal', cat: 'edition' },
  { slug: 'rotate', name: 'Pivoter PDF', desc: 'Corrigez l\'orientation de vos pages PDF.', icon: '🔄', color: 'ci-yellow', cat: 'edition' },
  { slug: 'watermark', name: 'Filigrane PDF', desc: 'Ajoutez un watermark texte ou image.', icon: '💧', color: 'ci-pink', cat: 'edition' },
  { slug: 'html-to-pdf', name: 'HTML vers PDF', desc: 'Convertissez n\'importe quelle page web en PDF.', icon: '🌐', color: 'ci-indigo', cat: 'conversion', isNew: true }
];

function renderTools(list) {
  var g = document.getElementById('toolsGrid');
  if (!g) return;
  var tools = list || TOOLS;
  g.innerHTML = tools.map(function(t) {
    return '<a class="tool-card fade-up" href="pages/tool.html?tool=' + t.slug + '" data-cat="' + t.cat + '">' +
      (t.isNew ? '<span class="t-new">Nouveau</span>' : '') +
      '<div class="t-ico ' + t.color + '">' + t.icon + '</div>' +
      '<div class="t-name">' + t.name + '</div>' +
      '<div class="t-desc">' + t.desc + '</div>' +
      '<span class="t-arr">→</span>' +
      '</a>';
  }).join('');
  observeAll();
}

function filterTools(cat, btn) {
  document.querySelectorAll('.f-btn').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  renderTools(cat === 'all' ? TOOLS : TOOLS.filter(function(t) { return t.cat === cat; }));
}

function searchTool() {
  var el = document.getElementById('searchInput');
  var q = (el ? el.value : '').toLowerCase().trim();
  var toolsSection = document.getElementById('tools');
  if (!q) { if (toolsSection) toolsSection.scrollIntoView({ behavior: 'smooth' }); return; }
  var r = TOOLS.filter(function(t) { return t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q); });
  renderTools(r.length ? r : TOOLS);
  if (toolsSection) toolsSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
  renderTools();
  var inp = document.getElementById('searchInput');
  if (inp) inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') searchTool(); });
});
