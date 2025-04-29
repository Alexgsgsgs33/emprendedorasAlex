const API_URL = "https://sheetdb.io/api/v1/YOUR_API_KEY"; // Reemplaza con tu API real

// Modal de administrador
const modal = document.getElementById("adminModal");
const adminBtn = document.getElementById("adminButton");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

// Abrir/cerrar modal
adminBtn.onclick = () => modal.style.display = "flex";
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Login estático
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    window.location.href = "registro.html";
  } else {
    loginError.textContent = "Usuario o contraseña incorrectos.";
  }
});

// Cargar datos y mostrar en galería
const galeria = document.getElementById("galeria");
const sectorSelect = document.getElementById("sectorSelect");

async function cargarEmprendimientos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  mostrarEmprendimientos(data);
}

function mostrarEmprendimientos(lista) {
  galeria.innerHTML = "";
  const filtro = sectorSelect.value;

  lista.forEach(item => {
    if (filtro === "todos" || item.sector === filtro) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" />
        <div class="card-content">
          <h3>${item.nombre}</h3>
          <p><strong>Productos:</strong> ${item.productos}</p>
          <p><strong>Sector:</strong> ${item.sector}</p>
          <p><strong>Dirección:</strong> ${item.direccion}</p>
          <p><strong>Contacto:</strong> ${item.contacto}</p>
          <p><a href="${item.facebook}" target="_blank">Facebook</a> | <a href="${item.instagram}" target="_blank">Instagram</a></p>
        </div>
      `;
      card.onclick = () => card.classList.toggle("active");
      galeria.appendChild(card);
    }
  });
}

sectorSelect?.addEventListener("change", cargarEmprendimientos);

// Carga inicial
if (galeria) cargarEmprendimientos();
