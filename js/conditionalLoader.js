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

let isElementsLoading = false;
let isElementsLoaded = false;

async function loadTailwindPlusElements() {
  // Ελέγχει αν το custom element έχει ήδη φορτώσει
  if (window.customElements.get('el-dialog')) {
    isElementsLoaded = true;
    return Promise.resolve();
  }

  // Αν φορτώνεται ήδη, περιμένουμε
  if (isElementsLoading) {
    return new Promise((resolve) => {
      const checkLoaded = setInterval(() => {
        if (isElementsLoaded) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 50);
      // Timeout μετά από 3 δευτερόλεπτα
      setTimeout(() => {
        clearInterval(checkLoaded);
        resolve();
      }, 3000);
    });
  }

  isElementsLoading = true;

  try {
    await import('https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1');
    // Περιμένουμε να ολοκληρωθεί η registration του custom element
    await new Promise(resolve => setTimeout(resolve, 150));
    isElementsLoaded = true;
    isElementsLoading = false;
    // console.log('✅ TailwindPlus Elements loaded');
  } catch (error) {
    console.error('❌ Failed to load TailwindPlus Elements:', error);
    isElementsLoading = false;
  }
}

function setupMobileMenuButton() {
  const mobileMenuBtn = document.querySelector('[commandfor="mobile-menu"]');
  
  if (!mobileMenuBtn) {
    return; // Δεν υπάρχει button
  }

  // Αν είναι mobile, φορτώνουμε αμέσως
  if (isMobileDevice()) {
    loadTailwindPlusElements();
    
    // Προσθέτουμε fallback handler για click/touch
    mobileMenuBtn.addEventListener('click', async (e) => {
      // Αν δεν έχει φορτώσει ακόμα, περιμένουμε
      if (!window.customElements.get('el-dialog')) {
        e.preventDefault();
        e.stopPropagation();
        await loadTailwindPlusElements();
        // Περιμένουμε λίγο και μετά εκτελούμε το command
        setTimeout(() => {
          // Δημιουργούμε νέο click event
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          mobileMenuBtn.dispatchEvent(clickEvent);
        }, 200);
      }
    }, { passive: false });
    
    return;
  }

  // Desktop: Lazy load με hover/touch
  mobileMenuBtn.addEventListener('pointerenter', loadTailwindPlusElements, { once: true });
  mobileMenuBtn.addEventListener('touchstart', loadTailwindPlusElements, { once: true, passive: true });
}

// Εκτελείται όταν το DOM είναι έτοιμο
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupMobileMenuButton);
} else {
  setupMobileMenuButton();
}

