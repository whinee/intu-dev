(function () {
  var ROOT = window.DOC_ROOT || '.';
  var PAGE = window.DOCS_PAGE || '';

  var NAV = [
    { title: 'Getting Started', href: '/index.html', id: 'getting-started' },
    { title: 'CLI Reference', href: '/cli.html', id: 'cli' },
    { title: 'Configuration', href: '/configuration.html', id: 'configuration' },
    {
      title: 'Sources',
      id: 'sources',
      children: [
        { title: 'HTTP', href: '/sources/http.html', id: 'source-http' },
        { title: 'TCP / MLLP', href: '/sources/tcp.html', id: 'source-tcp' },
        { title: 'File', href: '/sources/file.html', id: 'source-file' },
        { title: 'Kafka', href: '/sources/kafka.html', id: 'source-kafka' },
        { title: 'Database', href: '/sources/database.html', id: 'source-database' },
        { title: 'SFTP', href: '/sources/sftp.html', id: 'source-sftp' },
        { title: 'Channel', href: '/sources/channel.html', id: 'source-channel' },
        { title: 'Email', href: '/sources/email.html', id: 'source-email' },
        { title: 'DICOM', href: '/sources/dicom.html', id: 'source-dicom' },
        { title: 'SOAP', href: '/sources/soap.html', id: 'source-soap' },
        { title: 'FHIR', href: '/sources/fhir.html', id: 'source-fhir' },
        { title: 'IHE', href: '/sources/ihe.html', id: 'source-ihe' }
      ]
    },
    { title: 'Validators', href: '/validators.html', id: 'validators' },
    { title: 'Transformers', href: '/transformers.html', id: 'transformers' },
    {
      title: 'Destinations',
      id: 'destinations',
      children: [
        { title: 'HTTP', href: '/destinations/http.html', id: 'dest-http' },
        { title: 'Kafka', href: '/destinations/kafka.html', id: 'dest-kafka' },
        { title: 'TCP', href: '/destinations/tcp.html', id: 'dest-tcp' },
        { title: 'File', href: '/destinations/file.html', id: 'dest-file' },
        { title: 'Database', href: '/destinations/database.html', id: 'dest-database' },
        { title: 'SFTP', href: '/destinations/sftp.html', id: 'dest-sftp' },
        { title: 'SMTP', href: '/destinations/smtp.html', id: 'dest-smtp' },
        { title: 'Channel', href: '/destinations/channel.html', id: 'dest-channel' },
        { title: 'DICOM', href: '/destinations/dicom.html', id: 'dest-dicom' },
        { title: 'JMS', href: '/destinations/jms.html', id: 'dest-jms' },
        { title: 'FHIR', href: '/destinations/fhir.html', id: 'dest-fhir' },
        { title: 'Direct', href: '/destinations/direct.html', id: 'dest-direct' }
      ]
    },
    { title: 'Schema Reference', href: '/schema.html', id: 'schema' },
    { title: 'Contributing', href: '/contributing.html', id: 'contributing' }
  ];

  var FAVICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%230ea5e9'/><path d='M50 15C50 15 52 30 65 32C52 34 50 49 50 49C50 49 48 34 35 32C48 30 50 15 50 15Z' fill='white'/><rect x='42' y='55' width='16' height='30' rx='5' fill='white'/></svg>";

  function setFavicon() {
    var link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    }
    link.href = FAVICON;
  }

  function isActive(item) {
    if (item.id === PAGE) return true;
    if (item.children) return item.children.some(function (c) { return c.id === PAGE; });
    return false;
  }

  function href(path) {
    return ROOT + path;
  }

  function buildTopnav() {
    var nav = document.createElement('nav');
    nav.className = 'docs-topnav';
    nav.innerHTML =
      '<div style="display:flex;align-items:center;gap:16px;">' +
        '<button class="mobile-menu-btn" id="menu-toggle" aria-label="Toggle menu">&#9776;</button>' +
        '<a href="' + href('/../index.html') + '" class="logo">' +
          '<svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<rect width="100" height="100" rx="24" fill="#0ea5e9"/>' +
            '<path d="M50 15C50 15 52 30 65 32C52 34 50 49 50 49C50 49 48 34 35 32C48 30 50 15 50 15Z" fill="white"/>' +
            '<rect x="42" y="55" width="16" height="30" rx="5" fill="white"/>' +
          '</svg>' +
          '<span>intu<span class="logo-accent">.dev</span></span>' +
        '</a>' +
      '</div>' +
      '<div class="nav-links">' +
        '<a href="' + href('/../index.html') + '">Home</a>' +
        '<a href="' + href('/index.html') + '" class="active">Docs</a>' +
      '</div>' +
      '<a href="https://github.com/intuware/intu" target="_blank" class="github-btn">' +
        '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>' +
        'GitHub' +
      '</a>';
    document.body.prepend(nav);
  }

  function buildSidebar() {
    var aside = document.createElement('aside');
    aside.className = 'docs-sidebar';
    aside.id = 'docs-sidebar';

    var html = '';
    NAV.forEach(function (item) {
      if (item.children) {
        var expanded = item.children.some(function (c) { return c.id === PAGE; });
        html += '<div class="sidebar-section">';
        html += '<div class="sidebar-section-title' + (expanded ? ' expanded' : '') + '" data-toggle="' + item.id + '">';
        html += item.title;
        html += '<span class="chevron">&#9656;</span>';
        html += '</div>';
        html += '<div class="sidebar-children' + (expanded ? ' expanded' : '') + '" id="children-' + item.id + '">';
        item.children.forEach(function (child) {
          html += '<a class="sidebar-link sidebar-child-link' + (child.id === PAGE ? ' active' : '') + '" href="' + href(child.href) + '">' + child.title + '</a>';
        });
        html += '</div></div>';
      } else {
        html += '<a class="sidebar-link' + (item.id === PAGE ? ' active' : '') + '" href="' + href(item.href) + '">' + item.title + '</a>';
      }
    });

    aside.innerHTML = html;
    document.body.prepend(aside);

    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebar-overlay';
    document.body.prepend(overlay);

    aside.querySelectorAll('.sidebar-section-title').forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.getAttribute('data-toggle');
        var children = document.getElementById('children-' + id);
        el.classList.toggle('expanded');
        children.classList.toggle('expanded');
      });
    });
  }

  function initMobile() {
    var toggle = document.getElementById('menu-toggle');
    var sidebar = document.getElementById('docs-sidebar');
    var overlay = document.getElementById('sidebar-overlay');
    if (!toggle) return;

    function close() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    }

    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });

    overlay.addEventListener('click', close);
  }

  function addCopyButtons() {
    document.querySelectorAll('.code-block').forEach(function (block) {
      var header = block.querySelector('.code-block-header');
      var pre = block.querySelector('pre');
      if (!pre) return;

      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';

      btn.addEventListener('click', function () {
        var code = pre.querySelector('code') || pre;
        navigator.clipboard.writeText(code.textContent).then(function () {
          btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Copied!';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      });

      if (header) {
        header.appendChild(btn);
      } else {
        pre.style.position = 'relative';
        btn.style.position = 'absolute';
        btn.style.top = '8px';
        btn.style.right = '8px';
        pre.appendChild(btn);
      }
    });
  }

  function initTabs() {
    document.querySelectorAll('.tabs').forEach(function (tabGroup) {
      var id = tabGroup.getAttribute('data-tabs');
      var buttons = tabGroup.querySelectorAll('.tab-btn');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab');
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          document.querySelectorAll('.tab-content[data-tabs="' + id + '"]').forEach(function (c) {
            c.classList.remove('active');
          });
          var el = document.querySelector('.tab-content[data-tabs="' + id + '"][data-tab="' + target + '"]');
          if (el) el.classList.add('active');
        });
      });
    });
  }

  setFavicon();
  buildTopnav();
  buildSidebar();
  initMobile();
  addCopyButtons();
  initTabs();
})();
