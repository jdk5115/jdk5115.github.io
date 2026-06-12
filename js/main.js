// ===== Config: set your Cal.com username here after creating the account =====
const CAL_USERNAME = "jonathan-kelly"; // TODO: replace with real Cal.com username

// Booking modal
const modal = document.getElementById("booking-modal");
const frame = document.getElementById("booking-frame");
document.querySelectorAll(".book-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const slug = btn.dataset.cal;
    frame.src = `https://cal.com/${CAL_USERNAME}/${slug}?theme=dark&hide_event_type_details=0`;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});
function closeModal() {
  modal.classList.remove("open");
  frame.src = "about:blank";
  document.body.style.overflow = "";
}
document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// Architecture pattern tabs
document.querySelectorAll(".pattern-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".pattern-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".pattern-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`panel-${tab.dataset.panel}`).classList.add("active");
  });
});

// Mobile nav
const navLinks = document.querySelector(".nav-links");
document.querySelector(".nav-toggle").addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
