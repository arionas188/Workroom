// Conditional Loader - Lazy loading for non-critical scripts
// Author: WorkRoom W
// Date: 2025-10-11

/**
 * TailwindPlus Elements Conditional Loading
 * Φορτώνει το TailwindPlus Elements νωρίτερα για mobile compatibility
 * Στα mobile φορτώνει αμέσως, στα desktop με hover/touch
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
}

async function loadTailwindPlusElements() {
  // Ελέγχει αν το custom element έχει ήδη φορτώσει
  if (window.customElements.get('el-dialog')) {
    return; // Έχει φορτώσει ήδη
  }

  const mobileMenuBtn = document.querySelector('[commandfor="mobile-menu"]');
  
  if (!mobileMenuBtn) {
    return; // Δεν υπάρχει button
  }

  const loadElements = async () => {
    if (!window.customElements.get('el-dialog')) {
      try {
        await import('https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1');
        //  console.log('✅ TailwindPlus Elements loaded');
      } catch (error) {
        console.error('❌ Failed to load TailwindPlus Elements:', error);
      }
    }
  };

  // Αν είναι mobile, φόρτωση αμέσως στο DOMContentLoaded
  if (isMobileDevice()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadElements);
    } else {
      loadElements();
    }
    return;
  }

  // Desktop: Lazy load με hover/touch
  mobileMenuBtn.addEventListener('pointerenter', loadElements, { once: true });
  mobileMenuBtn.addEventListener('touchstart', loadElements, { once: true, passive: true });
}

// Initialize conditional loaders
loadTailwindPlusElements();

