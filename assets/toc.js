/* toc.js — 自动生成可折叠左侧目录
   扫描页面中的 h2/h3，生成侧边栏 TOC，带切换按钮。
   在每个页面引入 <script src="../assets/toc.js" defer></script> 即可。 */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var headings = document.querySelectorAll('h2, h3');
    if (headings.length < 2) return;

    var sidebar = document.createElement('nav');
    sidebar.className = 'toc-sidebar';
    sidebar.id = 'tocSidebar';

    var title = document.createElement('div');
    title.className = 'toc-title';
    title.textContent = '目录';
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
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 1100) sidebar.classList.remove('open');
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

    document.body.appendChild(sidebar);
    document.body.appendChild(toggle);

    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    if (window.innerWidth > 1100) sidebar.classList.add('open');

    window.addEventListener('resize', function () {
      if (window.innerWidth <= 1100) sidebar.classList.remove('open');
      else sidebar.classList.add('open');
    });
  });
})();
