// Shared language switch for the static pages (same key as the demos).
(function () {
  var KEY = 'site-lang';
  function initial() {
    try { var s = localStorage.getItem(KEY); if (s === 'en' || s === 'de' || s === 'ru') return s; } catch (e) {}
    var b = (navigator.language || 'en').slice(0, 2);
    return b === 'ru' || b === 'de' ? b : 'en';
  }
  function apply(lang) {
    var dict = window.TEXT[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) { el.innerHTML = dict[el.getAttribute('data-t')]; });
    if (dict._title) document.title = dict._title;
    document.querySelectorAll('.langs button').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('on', on); b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-lang')); });
  });
  apply(initial());
})();
