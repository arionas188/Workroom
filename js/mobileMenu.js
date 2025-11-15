(function () {
  // Ελέγχει αν το μέγεθος οθόνης είναι mobile (< 768px)
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

  if (isMobile) {
    // Φορτώνει το TailwindPlus Elements αμέσως για mobile (non-blocking)
    // Αν αποτύχει, δεν μπλοκάρει την φόρτωση της σελίδας
    try {
      const script = document.createElement('script');
      script.type = 'module';
      script.async = true; // Non-blocking
      script.textContent = `
        if (!window.customElements || !window.customElements.get('el-dialog')) {
          // Timeout για να μην περιμένει για πάντα σε slow connections
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Import timeout')), 5000)
          );
          
          Promise.race([
            import('https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1'),
            timeoutPromise
          ]).then(() => {
            // console.log('✅ TailwindPlus Elements preloaded for mobile');
          }).catch(err => {
            // Silent fail - δεν μπλοκάρει την σελίδα
            // console.warn('⚠️ TailwindPlus Elements preload failed (will load on demand):', err);
          });
        }
      `;
      document.head.appendChild(script);
    } catch (err) {
      // Silent fail - δεν μπλοκάρει την φόρτωση
      // console.warn('⚠️ Could not create mobile preload script:', err);
    }
  }
})();
