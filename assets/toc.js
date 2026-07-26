/* toc.js — 自动生成可折叠左侧目录
   扫描页面中的 h2/h3，生成侧边栏 TOC，带切换按钮。
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
    title.textContent = '本页目录';
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
      a.addEventListener('click', function () {
        if (window.innerWidth <= 1100) {
          sidebar.classList.remove('open');
          toggle.classList.remove('active');
          document.body.classList.remove('toc-shifted');
        }
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    sidebar.appendChild(list);

    var toggle = document.createElement('button');
    toggle.className = 'toc-toggle';
    toggle.id = 'tocToggle';
    toggle.innerHTML = '&#9776;';
    toggle.title = '显示/隐藏目录';

    /* 插到 body 最前面，避免被正文布局影响 */
    document.body.insertBefore(sidebar, document.body.firstChild);
    document.body.appendChild(toggle);

    function setOpen(open) {
      if (open) {
        sidebar.classList.add('open');
        toggle.classList.add('active');
        document.body.classList.add('toc-shifted');
      } else {
        sidebar.classList.remove('open');
        toggle.classList.remove('active');
        document.body.classList.remove('toc-shifted');
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!sidebar.classList.contains('open'));
    });

    /* 首次加载：桌面默认展开，移动默认收起 */
    setOpen(window.innerWidth > 1100);

    /* 跨断点切换时重置为该断点的默认状态 */
    var wasDesktop = window.innerWidth > 1100;
    window.addEventListener('resize', function () {
      var isDesktop = window.innerWidth > 1100;
      if (isDesktop !== wasDesktop) {
        setOpen(isDesktop);
        wasDesktop = isDesktop;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
