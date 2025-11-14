(function() {
    // Ελέγχει αν είναι mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
    
    if (isMobile) {
      // Φορτώνει το TailwindPlus Elements αμέσως για mobile
      const script = document.createElement('script');
      script.type = 'module';
      script.textContent = `
        if (!window.customElements.get('el-dialog')) {
          import('https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1').then(() => {
            // console.log('✅ TailwindPlus Elements preloaded for mobile');
          }).catch(err => console.error('❌ Failed to preload TailwindPlus Elements:', err));
        }
      `;
      document.head.appendChild(script);
    }
  })();
