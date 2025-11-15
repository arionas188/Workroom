// Page Loader Script - Hides loader when page is ready -->
(function () {
  let loaderHidden = false;
  
  // Wait for DOM to be ready to access elements
  function getElements() {
    return {
      loader: document.getElementById("page-loader"),
      body: document.body
    };
  }

  // Function to hide loader
  function hideLoader() {
    if (loaderHidden) {
      return;
    }
    const { loader, body } = getElements();
    if (!loader || !body || !body.classList.contains("loading")) {
      return;
    }
    loaderHidden = true;
    loader.classList.add("hidden");
    // Remove loading class after transition completes
    setTimeout(() => {
      body.classList.remove("loading");
      loader.style.display = "none";
    }, 400); // Match CSS transition duration
  }

  // Improved Android-compatible loading detection
  function initLoader() {
    // Ensure DOM is ready first
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startLoaderDetection, { once: true });
    } else {
      startLoaderDetection();
    }
  }
  
  function startLoaderDetection() {
    // Strategy 1: Try fonts.ready (fastest if available)
    if (document.fonts && document.fonts.ready) {
      Promise.race([
        document.fonts.ready,
        new Promise(resolve => setTimeout(resolve, 1000)) // Max 1s wait for fonts
      ]).then(() => {
        setTimeout(hideLoader, 100);
      }).catch(() => {
        // Fonts failed, use DOMContentLoaded fallback
        if (document.readyState === "complete") {
          setTimeout(hideLoader, 200);
        } else {
          window.addEventListener("load", hideLoader, { once: true });
        }
      });
    } else {
      // Strategy 2: Wait for DOMContentLoaded + images
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          // Wait a bit for critical images, then hide
          setTimeout(hideLoader, 300);
        }, { once: true });
      } else {
        // DOM already loaded, hide soon
        setTimeout(hideLoader, 300);
      }
      
      // Also listen to window.load as backup
      window.addEventListener("load", hideLoader, { once: true });
    }
  }

  // Start loader detection
  initLoader();

  // Critical fallback: Hide loader after max 2 seconds (prevents stuck loader)
  // Reduced from 3s for faster user experience on slow devices
  setTimeout(() => {
    hideLoader();
  }, 2000);
})();
