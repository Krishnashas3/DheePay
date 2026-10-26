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
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent("Dheepay website enquiry — " + (data.get("product") || "Product enquiry"));
      const body = encodeURIComponent(
        "Name: " + data.get("name") + "\n" +
        "Work email: " + data.get("email") + "\n" +
        "Company: " + (data.get("company") || "Not provided") + "\n" +
        "Interested in: " + data.get("product") + "\n\n" +
        "Requirements:\n" + (data.get("message") || "Not provided")
      );
      const result = document.getElementById("formResult");
      result.textContent = "Your email draft is ready. Connect a business email address or CRM to receive enquiries directly.";
      // Replace this placeholder with your actual sales email before launch:
      const salesEmail = "YOUR-SALES-EMAIL@example.com";
      if (!salesEmail.includes("YOUR-SALES-EMAIL")) {
        window.location.href = "mailto:" + salesEmail + "?subject=" + subject + "&body=" + body;
      }
    });
  }
});