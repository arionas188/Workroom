window.addEventListener('scroll', function loadAnalyticsOnce() {
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-2SYFJ7QR4Q';
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    gtagScript.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-2SYFJ7QR4Q');
    };

    window.removeEventListener('scroll', loadAnalyticsOnce);
  }, { once: true });