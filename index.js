async function fetchData() {
  try {
    const res = await fetch(
      "https://api.thedogapi.com/v1/images/search?limit=12",
    );
    const images = await res.json();
    // ...
    const Gallery = document.getElementById("gallery");

    images.forEach((item) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("img-card");

      const img = document.createElement("img");
      img.src = item.url;
      img.loading = "lazy";

      /* img.addEventListener("click", () => {
        const cards = document.querySelectorAll(".img-card");

        cards.forEach((card) => {
          card.classList.remove("expanded");
        });

        wrapper.classList.add("expanded");

        Gallery.classList.add("has-expanded");
      }); */

images.forEach((item) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("img-card");

  const img = document.createElement("img");
  img.src = item.url;
  img.loading = "lazy";

  const label = document.createElement("p");
  label.textContent = item.id;

  wrapper.appendChild(img);
  wrapper.appendChild(label);

  img.addEventListener("click", () => {
  const cards = document.querySelectorAll(".img-card");

  cards.forEach((card) => {
    card.classList.remove("expanded");
  });

  Gallery.prepend(wrapper);

  wrapper.classList.add("expanded");
});

  Gallery.appendChild(wrapper);
});



      const label = document.createElement("p");
      label.textContent = item.id;

      wrapper.appendChild(img);
      wrapper.appendChild(label);
      Gallery.appendChild(wrapper);
    });
    console.log(images);
  } catch (err) {
    console.error("Failed:", err);
  }
}
fetchData();

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

document.getElementById("refresh-btn").addEventListener("click", () => {
  const Gallery = document.getElementById("gallery");
  Gallery.innerHTML = ""; // clear old images
  fetchData(); // fetch new ones
});
function openModal(type) {
  document.getElementById("authModal").classList.add("active");
  switchTab(type);
}

function closeModal() {
  document.getElementById("authModal").classList.remove("active");
}

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

// Role Routing Strategy
function handleAuth(event, type) {
  event.preventDefault();

  if (type === "login") {
    const role = document.getElementById("loginRole").value;
    const email = document.getElementById("loginEmail").value;

    alert(`Signed in as ${role.toUpperCase()} (${email})`);

    // Routing destinations based on role
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
