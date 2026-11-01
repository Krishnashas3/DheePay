document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "✕" : "☰";
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const result = document.getElementById("formResult");
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;

      if (result) result.textContent = "Sending your enquiry…";
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          form.reset();
          if (result) result.textContent = "Thank you. Your enquiry has been sent successfully. The DheePay team will get back to you.";
        } else {
          let message = "We couldn't send your enquiry. Please try again or email sales@dheepay.com.";
          try {
            const payload = await response.json();
            if (payload.errors && payload.errors.length) {
              message = payload.errors.map((item) => item.message).join(" ");
            }
          } catch (_) {}
          if (result) result.textContent = message;
        }
      } catch (error) {
        if (result) result.textContent = "A connection issue prevented submission. Please try again or email sales@dheepay.com.";
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    });
  }
});