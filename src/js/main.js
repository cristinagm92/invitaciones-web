"use strict";

console.log(">> Ready :)");

// Menú hamburguesa
const menuHamburguer = document.querySelector(".menu");
const menuDisplay = document.querySelector(".menu_overview");
const iconClose = document.querySelector(".close_window");

menuHamburguer.addEventListener("click", () => {
  menuDisplay.classList.remove("hidden");
});

iconClose.addEventListener("click", () => {
  menuDisplay.classList.add("hidden");
});

// Elementos del formulario
const mensaje = document.querySelector(".js-mensaje");
const nombre = document.querySelector(".js-nombre");
const edad = document.querySelector(".js-edad");
const fecha = document.querySelector(".js-fecha");
const direccion = document.querySelector(".js-direccion");
const hora = document.querySelector(".js-hora");
const email = document.querySelector(".js-email");
const telefono = document.querySelector(".js-telefono");
const boton = document.querySelector(".js-boton");
const homer = document.querySelector(".homer");
const alertParrafo = document.querySelector(".alert");
const tematicaSelect = document.querySelector(".js-tematica");

// Elementos del preview
const pMensaje = document.querySelector(".pmessage");
const pNombre = document.querySelector(".pname");
const pEdad = document.querySelector(".p-age");
const pFecha = document.querySelector(".pdate");
const pDireccion = document.querySelector(".paddress");
const pHora = document.querySelector(".ptime");
const pEmail = document.querySelector(".pemail");
const pTelefono = document.querySelector(".pphone");

// Función para actualizar la tarjeta
function updatePreview() {
  pMensaje.textContent = mensaje.value;
  pNombre.textContent = nombre.value;
  pEdad.textContent = edad.value;
  pFecha.textContent = fecha.value;
  pDireccion.textContent = direccion.value;
  pHora.textContent = hora.value;
  pEmail.textContent = email.value;
  pTelefono.textContent = telefono.value;
}

// Agregar eventos a todos los campos del formulario
const campos = [mensaje, nombre, edad, fecha, direccion, hora, email, telefono];
campos.forEach((campo) => {
  campo.addEventListener("input", updatePreview);
});

// Al hacer clic en enviar
boton.addEventListener("click", (event) => {
  event.preventDefault();
  homer.style.display = "none";

  alertParrafo.innerHTML = "Enviando información...";

  const info = {
    field1: parseInt(edad.value), // este tiene valor numérico
    field2: mensaje.value,
    field3: fecha.value,
    field4: direccion.value,
    field5: hora.value,
    field6: email.value,
    field7: telefono.value,
    field8: tematicaSelect.value,
    photo: "No hay fotos",
  };

  console.log("Mensaje:", mensaje.value);

  // ENVIAR INFO
  fetch("https://dev.adalab.es/api/info/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.success === false) {
        alertParrafo.innerHTML =
          "No se ha podido guardar la información porque faltan datos por rellenar.";
      } else {
        alertParrafo.innerHTML =
          "Se ha guardado la información de tu tarjeta. Ya tienes disponible el enlace para descargarla.";

        const enlace = document.querySelector(".js-enlace");
        enlace.innerHTML = `<a href="https://dev.adalab.es/api/info/${data.infoID}" target="_blank">https://dev.adalab.es/api/info/${data.infoID}</a>`;
        console.log(enlace);
      }
    });
});
// Referencia a la tarjeta
const tarjeta = document.querySelector(".tarjet");

// Función para actualizar la clase de temática
function actualizarTematica() {
  // Remueve todas las clases posibles de temática
  tarjeta.classList.remove("unicornio", "superheroe", "festivo");

  // Obtiene la temática seleccionada
  const valorSeleccionado = tematicaSelect.value;

  // Añade la clase correspondiente
  if (valorSeleccionado === "unicornio") {
    tarjeta.classList.add("unicornio");
  } else if (valorSeleccionado === "superheroe") {
    tarjeta.classList.add("superheroe");
  } else if (valorSeleccionado === "festivo") {
    tarjeta.classList.add("festivo");
  }
}

// Asigna el evento change al <select>
tematicaSelect.addEventListener("change", actualizarTematica);

// función botón reset
const resetButton = document.querySelector(".js_resetButton");

function handleClickResetBtn() {
  location.reload();
}

resetButton.addEventListener("click", handleClickResetBtn);
