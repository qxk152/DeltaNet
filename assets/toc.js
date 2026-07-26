/* toc.js — 自动生成左侧固定目录（模仿 docsify 切换方式）
   桌面端：sidebar 默认显示，点左下角汉堡按钮隐藏，再点恢复。
   移动端：sidebar 默认隐藏，点按钮以 overlay 形式弹出。
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

    /* 汉堡按钮（docsify 风格：左下角，三横线） */
    var toggle = document.createElement('div');
    toggle.className = 'sidebar-toggle';
    toggle.innerHTML = '<div class="sidebar-toggle-button"><span></span><span></span><span></span></div>';

    document.body.insertBefore(sidebar, document.body.firstChild);
    document.body.appendChild(overlay);
    document.body.appendChild(toggle);

    var isMobile = window.innerWidth <= 900;

    function openSidebar() {
      document.body.classList.remove('toc-closed');
      overlay.classList.add('show');
    }
    function closeSidebar() {
      document.body.classList.add('toc-closed');
      overlay.classList.remove('show');
    }

    toggle.addEventListener('click', function () {
      if (isMobile) {
        if (document.body.classList.contains('toc-closed')) openSidebar();
        else closeSidebar();
      } else {
        document.body.classList.toggle('toc-closed');
      }
    });
    overlay.addEventListener('click', closeSidebar);
    sidebar.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (isMobile) closeSidebar();
      });
    });

    /* 初始状态：桌面端显示，移动端隐藏 */
    if (isMobile) closeSidebar();

    window.addEventListener('resize', function () {
      var nowMobile = window.innerWidth <= 900;
      if (nowMobile !== isMobile) {
        isMobile = nowMobile;
        if (isMobile) closeSidebar();
        else { document.body.classList.remove('toc-closed'); overlay.classList.remove('show'); }
      }
    });
  }

  function getHomeUrl() {
    if (window.location.pathname.indexOf('/lessons/') !== -1) return '../index.html';
    return 'index.html';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
