document.addEventListener("DOMContentLoaded", () => {
  // Elementi DOM
  const ageModal = document.getElementById("ageVerificationModal");
  const cookieBanner = document.getElementById("cookieBanner");
  const heroContent = document.querySelector(".hero-content");
  const heroLogo = document.querySelector(".hero-logo");
  const heroTextMain = document.querySelector(".hero-text-main");
  const heroTextEmphasis = document.querySelector(".hero-text-emphasis");
  const subHeroText = document.querySelector(".sub-hero-text");

  // Funzione per animare la hero section
  function animateHero() {
    console.log("Animazione hero iniziata");
    heroContent.classList.add("show-hero");

    setTimeout(() => {
      heroLogo.classList.add("animate-logo");
      setTimeout(() => {
        heroTextMain.classList.add("animate-text");
        setTimeout(() => {
          heroTextEmphasis.classList.add("animate-text");
          setTimeout(() => {
            subHeroText.classList.add("animate-text");
          }, 300);
        }, 300);
      }, 1000);
    }, 500);
  }

  // Gestione verifica età
  function handleAgeVerification() {
    if (!sessionStorage.getItem("ageVerified")) {
      ageModal.style.display = "flex";
    } else {
      animateHero();
    }
  }

  // Gestione cookie banner
  function handleCookieBanner() {
    if (
      !localStorage.getItem("cookiesAccepted") &&
      sessionStorage.getItem("ageVerified")
    ) {
      cookieBanner.classList.remove("hidden");
    }
  }

  // Inizializzazione Slider
  function initializeSlider() {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const dots = document.querySelectorAll(".dot"); // Modificato questo selettore
    let currentSlide = 0;

    // Debug
    console.log("Slider wrapper:", sliderWrapper);
    console.log("Dots:", dots);

    if (!sliderWrapper || !dots.length) {
      console.log("Slider elements not found");
      return;
    }

    function showSlide(index) {
      console.log("Showing slide:", index); // Debug
      currentSlide = index;
      sliderWrapper.style.transform = `translateX(-${index * 33.333}%)`;

      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    function nextSlide() {
      let next = (currentSlide + 1) % dots.length;
      showSlide(next);
    }

    // Auto-play
    let slideInterval = setInterval(nextSlide, 4000);

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 4000);
    }

    // Click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Dot clicked:", index); // Debug
        showSlide(index);
        resetInterval();
      });
    });

    // Touch functionality
    let touchStartX = 0;

    sliderWrapper.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(slideInterval);
      },
      { passive: true }
    );

    sliderWrapper.addEventListener(
      "touchend",
      (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
          if (diff > 0 && currentSlide < dots.length - 1) {
            showSlide(currentSlide + 1);
          } else if (diff < 0 && currentSlide > 0) {
            showSlide(currentSlide - 1);
          }
        }
        resetInterval();
      },
      { passive: true }
    );

    // Start slider
    showSlide(0);
  }

  // Event Listeners
  document.getElementById("confirmAge").addEventListener("click", () => {
    sessionStorage.setItem("ageVerified", "true");
    ageModal.style.display = "none";
    setTimeout(animateHero, 300);
    handleCookieBanner();
  });

  document.getElementById("exitSite").addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });

  document.getElementById("acceptCookies")?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.classList.add("hidden");
  });

  document.getElementById("rejectCookies")?.addEventListener("click", () => {
    localStorage.setItem("cookiesRejected", "true");
    cookieBanner.classList.add("hidden");
  });

  // Newsletter Form
  const form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const successMessage = document.getElementById("success-message");
      const MAILCHIMP_URL = "http://eepurl.com/i6MtF2";
      const formData = new FormData(form);
      const email = formData.get("email");

      fetch(MAILCHIMP_URL, {
        method: "POST",
        body: JSON.stringify({
          EMAIL: email,
          status: "subscribed",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          form.reset();
          successMessage.classList.remove("hidden");
          setTimeout(() => {
            successMessage.classList.add("hidden");
          }, 5000);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Si è verificato un errore. Riprova più tardi.");
        });
    });
  }

  // Inizializzazione
  handleAgeVerification();
  handleCookieBanner();
  initializeSlider();
});
