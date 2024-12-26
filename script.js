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
    console.log("Animazione hero iniziata"); // Debug

    // Rendi visibile il contenitore hero
    heroContent.classList.add("show-hero");

    // Sequenza di animazioni
    setTimeout(() => {
      heroLogo.classList.add("animate-logo");

      // Anima il primo testo dopo l'animazione del logo
      setTimeout(() => {
        heroTextMain.classList.add("animate-text");

        // Anima il secondo testo
        setTimeout(() => {
          heroTextEmphasis.classList.add("animate-text");

          // Anima il terzo testo
          setTimeout(() => {
            subHeroText.classList.add("animate-text");
          }, 300);
        }, 300);
      }, 1000);
    }, 500);
  }

  // Gestione verifica età
  function handleAgeVerification() {
    console.log("Verifica età iniziata"); // Debug
    if (!sessionStorage.getItem("ageVerified")) {
      ageModal.style.display = "flex";
    } else {
      console.log("Età già verificata, avvio animazione"); // Debug
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

  // Event Listener per il pulsante di conferma età
  document.getElementById("confirmAge").addEventListener("click", () => {
    console.log("Età confermata"); // Debug
    sessionStorage.setItem("ageVerified", "true");
    ageModal.style.display = "none";

    // Avvia l'animazione con un piccolo ritardo
    setTimeout(() => {
      animateHero();
    }, 300);

    handleCookieBanner();
  });

  // Rest of the code remains the same...
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

  // Inizializzazione
  handleAgeVerification();
  handleCookieBanner();
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsletter-form");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Sostituisci con il tuo URL Mailchimp
    const MAILCHIMP_URL = "http://eepurl.com/i6MtF2";

    const formData = new FormData(form);
    const email = formData.get("email");

    // Configura i dati per Mailchimp
    const data = {
      EMAIL: email,
      status: "subscribed",
    };

    fetch(MAILCHIMP_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
});
