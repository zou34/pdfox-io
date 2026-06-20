/* PDFOX.io — main.js */

function toggleMenu() {
  var l = document.getElementById('navLinks');
  var b = document.getElementById('hamburger');
  if (l) l.classList.toggle('open');
  if (b) b.classList.toggle('open');
  document.body.style.overflow = l && l.classList.contains('open') ? 'hidden' : '';
}

document.querySelectorAll('.nav-links a').forEach(function(a) {
  a.addEventListener('click', function() {
    var l = document.getElementById('navLinks');
    var b = document.getElementById('hamburger');
    if (l) l.classList.remove('open');
    if (b) b.classList.remove('open');
    document.body.style.overflow = '';
  });
});

function acceptCookie() { localStorage.setItem('pdfox_ck', '1'); hideCookie(); }
function declineCookie() { localStorage.setItem('pdfox_ck', '0'); hideCookie(); }
function hideCookie() {
  var b = document.getElementById('cookieBanner');
  if (b) { b.style.opacity = '0'; setTimeout(function() { b.style.display = 'none'; }, 300); }
}

window.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('pdfox_ck')) {
    var b = document.getElementById('cookieBanner');
    if (b) b.style.display = 'none';
  }
  observeAll();
});

function observeAll() {
  if (!window.IntersectionObserver) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(function(el) {
    el.style.animationPlayState = 'paused';
    obs.observe(el);
  });
}

window.addEventListener('scroll', function() {
  var n = document.getElementById('navbar');
  if (n) n.style.background = window.scrollY > 20 ? 'rgba(6,12,34,.99)' : 'rgba(6,12,34,.95)';
});

function toggleFaq(el) {
  var a = el.nextElementSibling;
  var open = el.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(function(q) {
    q.classList.remove('open');
    if (q.nextElementSibling) q.nextElementSibling.classList.remove('open');
  });
  if (!open) {
    el.classList.add('open');
    if (a) a.classList.add('open');
  }
}

function startProgress(bId, fId, dur) {
  var b = document.getElementById(bId);
  var f = document.getElementById(fId);
  if (!b || !f) return {};
  b.style.display = 'block'; f.style.width = '0%';
  var st = null;
  var d = dur || 2200;
  var step = function(ts) {
    if (!st) st = ts;
    var p = Math.min(((ts - st) / d) * 90, 90);
    f.style.width = p + '%';
    if (p < 90) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return { b: b, f: f };
}

function finishProgress(bId, fId, cb) {
  var b = document.getElementById(bId);
  var f = document.getElementById(fId);
  if (f) f.style.width = '100%';
  setTimeout(function() {
    if (b) b.style.display = 'none';
    if (f) f.style.width = '0%';
    if (cb) cb();
  }, 400);
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' o';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / 1048576).toFixed(2) + ' Mo';
}

function fileToDataURL(file) {
  return new Promise(function(res, rej) {
    var r = new FileReader();
    r.onload = function() { res(r.result); };
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise(function(res, rej) {
    var i = new Image();
    i.onload = function() { res(i); };
    i.onerror = rej;
    i.src = src;
  });
}

function initDragDrop(zoneId, inputId, cb) {
  var z = document.getElementById(zoneId);
  var i = document.getElementById(inputId);
  if (!z || !i) return;
  z.addEventListener('click', function() { i.click(); });
  z.addEventListener('dragover', function(e) { e.preventDefault(); z.classList.add('dragover'); });
  z.addEventListener('dragleave', function(e) {
    if (!z.contains(e.relatedTarget)) z.classList.remove('dragover');
  });
  z.addEventListener('drop', function(e) {
    e.preventDefault(); z.classList.remove('dragover');
    if (e.dataTransfer.files.length) cb(e.dataTransfer.files);
  });
  i.addEventListener('change', function() { if (i.files.length) cb(i.files); });
}
