const navbar = document.querySelector(".navbar");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateNavbar = () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 30);
};

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll(".navbar-nav .nav-link, .navbar-nav .btn").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mainNavbar");
    if (!menu || !menu.classList.contains("show")) return;
    const collapse = bootstrap.Collapse.getOrCreateInstance(menu);
    collapse.hide();
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name") || "there";
    formStatus.hidden = false;
    formStatus.textContent = `Thank you, ${name}. Your message has been submitted successfully. HBC Exports will contact you shortly.`;
    contactForm.reset();
  });
}
