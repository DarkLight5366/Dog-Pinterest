// =========================
// GALLERY
// =========================

const gallery = document.getElementById("gallery");
const refreshButton = document.getElementById("refresh-btn");

async function fetchData() {
  try {
    const response = await fetch(
      "https://api.thedogapi.com/v1/images/search?limit=12",
    );

    const images = await response.json();

    gallery.innerHTML = "";

    images.forEach((item) => {
      createImageCard(item);
    });

    console.log(images);
  } catch (error) {
    console.error("Failed to fetch images:", error);
  }
}

// =========================
// CREATE IMAGE CARD
// =========================

function createImageCard(item) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("img-card");

  const image = document.createElement("img");

  image.src = item.url;
  image.loading = "lazy";
  image.alt = "Dog image";

  const label = document.createElement("p");
  label.textContent = item.id;

  wrapper.appendChild(image);
  wrapper.appendChild(label);

  // Click image
  image.addEventListener("click", () => {
    toggleExpanded(wrapper);
  });

  gallery.appendChild(wrapper);
}

// =========================
// EXPAND / COLLAPSE
// =========================

function toggleExpanded(card) {
  // --------------------------------
  // CLICKING THE ALREADY EXPANDED IMAGE
  // --------------------------------

  if (card.classList.contains("expanded")) {
    // Put it back where it originally was
    if (card.originalPosition) {
      gallery.insertBefore(card, card.originalPosition.nextSibling);
    }

    // Remove expanded state
    card.classList.remove("expanded");

    // Remove saved position
    card.originalPosition = null;

    gallery.classList.remove("has-expanded");

    return;
  }

  // --------------------------------
  // REMOVE ANY CURRENTLY EXPANDED CARD
  // --------------------------------

  const expandedCard = document.querySelector(".img-card.expanded");

  if (expandedCard) {
    // Return old card to its original position
    if (expandedCard.originalPosition) {
      gallery.insertBefore(
        expandedCard,
        expandedCard.originalPosition.nextSibling,
      );
    }

    expandedCard.classList.remove("expanded");
    expandedCard.originalPosition = null;
  }

  // --------------------------------
  // REMEMBER CURRENT POSITION
  // --------------------------------

  const previousCard = card.previousElementSibling;

  card.originalPosition = previousCard;

  // --------------------------------
  // MOVE CARD TO FIRST POSITION
  // --------------------------------

  gallery.prepend(card);

  // --------------------------------
  // EXPAND CARD
  // --------------------------------

  card.classList.add("expanded");

  gallery.classList.add("has-expanded");
}

// =========================
// REFRESH
// =========================

refreshButton.addEventListener("click", () => {
  gallery.classList.remove("has-expanded");

  fetchData();
});

// Load images
fetchData();

// =========================
// IMAGE VIEWER
// =========================

const imageModal = document.getElementById("imageModal");
const imageClose = document.getElementById("imageClose");

imageClose.addEventListener("click", () => {
  imageModal.classList.remove("active");
});

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    imageModal.classList.remove("active");
  }
});

// =========================
// AUTH MODAL
// =========================

const authModal = document.getElementById("authModal");

function openModal(type) {
  authModal.classList.add("active");
  switchTab(type);
}

function closeModal() {
  authModal.classList.remove("active");
}

// =========================
// AUTH TABS
// =========================

function switchTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  if (tab === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    registerTab.classList.add("active");
    loginTab.classList.remove("active");
  }
}

// =========================
// AUTHENTICATION
// =========================

function handleAuth(event, type) {
  event.preventDefault();

  if (type === "login") {
    const role = document.getElementById("loginRole").value;

    const email = document.getElementById("loginEmail").value;

    alert(`Signed in as ${role.toUpperCase()} (${email})`);

    if (role === "admin") {
      console.log("Redirecting to /admin/dashboard...");
    } else if (role === "staff") {
      console.log("Redirecting to /staff/orders...");
    } else {
      console.log("Redirecting to /customer/menu...");
    }
  } else {
    const role = document.getElementById("registerRole").value;

    const name = document.getElementById("regName").value;

    alert(`Account created for ${name} as ${role.toUpperCase()}`);
  }

  closeModal();
}
