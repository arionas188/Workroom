window.addEventListener('scroll', function loadAnalyticsOnce() {
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-7YXCDDKZC9';
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    gtagScript.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-7YXCDDKZC9');
    };

    window.removeEventListener('scroll', loadAnalyticsOnce);
  }, { once: true });