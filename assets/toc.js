/* toc.js — 自动生成左侧固定目录（docsify 风格）
   桌面端：sidebar 常驻左侧，正文居中于右侧。
   移动端：sidebar 隐藏，点按钮以 overlay 形式弹出。
   在每个页面引入 <script src="../assets/toc.js" defer></script> 即可。 */
(function () {
  function init() {
    var headings = document.querySelectorAll('h2, h3');
    if (headings.length < 2) return;

    var sidebar = document.createElement('nav');
    sidebar.className = 'toc-sidebar';
    sidebar.id = 'tocSidebar';

    var title = document.createElement('div');
    title.className = 'toc-title';
    title.innerHTML = '本页目录 <a href="' + getHomeUrl() + '">← 首页</a>';
    sidebar.appendChild(title);

    var list = document.createElement('ul');
    list.className = 'toc-list';
    var seen = {};
    headings.forEach(function (h) {
      if (!h.id) {
        var base = h.textContent.replace(/[^\w\u4e00-\u9fa5]/g, '');
        var id = base, n = 2;
        while (seen[id]) { id = base + '_' + n; n++; }
        h.id = id;
        seen[id] = true;
      }
      var li = document.createElement('li');
      li.className = h.tagName === 'H3' ? 'toc-sub' : 'toc-main';
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });
    sidebar.appendChild(list);

    /* overlay（移动端遮罩） */
    var overlay = document.createElement('div');
    overlay.className = 'toc-overlay';

    /* toggle 按钮（仅移动端显示） */
    var toggle = document.createElement('button');
    toggle.className = 'toc-toggle';
    toggle.innerHTML = '&#9776;';
    toggle.title = '目录';

    document.body.insertBefore(sidebar, document.body.firstChild);
    document.body.appendChild(overlay);
    document.body.appendChild(toggle);

    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('show');
    }
    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    }

    toggle.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) closeSidebar();
      else openSidebar();
    });
    overlay.addEventListener('click', closeSidebar);
    sidebar.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 900) closeSidebar();
      });
    });
  }

  function getHomeUrl() {
    var depth = (window.location.pathname.match(/\//g) || []).length;
    /* lessons/*.html 是一级子目录，首页在上一级 */
    if (window.location.pathname.indexOf('/lessons/') !== -1) return '../index.html';
    return 'index.html';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
