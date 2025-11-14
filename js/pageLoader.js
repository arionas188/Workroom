// Page Loader Script - Hides loader when page is ready -->
(function () {
  const loader = document.getElementById("page-loader");
  const body = document.body;

  // Function to hide loader
  function hideLoader() {
    if (loader && body.classList.contains("loading")) {
      loader.classList.add("hidden");
      // Remove loading class after transition completes
      setTimeout(() => {
        body.classList.remove("loading");
        loader.style.display = "none";
      }, 400); // Match CSS transition duration
    }
  }

  // Hide loader when DOM and critical assets are ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      // Wait for critical images/fonts to load, then hide loader
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          // Small delay to ensure smooth transition
          setTimeout(hideLoader, 100);
        });
      } else {
        // Fallback if fonts API not available
        window.addEventListener("load", hideLoader);
      }
    });
  } else {
    // DOM already ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTimeout(hideLoader, 100);
      });
    } else {
      window.addEventListener("load", hideLoader);
    }
  }

  // Fallback: Hide loader after max 3 seconds (prevents stuck loader)
  setTimeout(() => {
    if (loader && body.classList.contains("loading")) {
      hideLoader();
    }
  }, 3000);
})();
