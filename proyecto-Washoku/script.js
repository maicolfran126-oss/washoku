/* =======================================================
   DROPDOWN IDIOMA - HOVER EN PC / CLICK EN CELULARES
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const dropdown = document.querySelector(".dropdown");
  const dropBtn = document.querySelector(".drop-btn");

  if (!dropdown || !dropBtn) return;

  const isTouch = ("ontouchstart" in window) || navigator.maxTouchPoints > 0;

  if (!isTouch) {
    dropdown.addEventListener("mouseover", () => dropdown.classList.add("open"));
    dropdown.addEventListener("mouseout", () => dropdown.classList.remove("open"));
  } else {
    dropBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    document.addEventListener("click", () => dropdown.classList.remove("open"));
  }
});


/* ==========================================================
   CAMBIO CULTURAL SEGÚN IDIOMA + NOTIFICACIÓN
========================================================== */

window.cambiarIdioma = function (lang) {

  const textos = {
    es: "Bienvenido a la gastronomía japonesa",
    en: "Discover the harmony of Japanese cuisine",
    jp: "ようこそ。和食の世界へ",
    fr: "Découvrez l'art culinaire du Japon",
    de: "Entdecken Sie die Harmonie der japanischen Küche",
    it: "Scopri l'armonia della cucina giapponese",
    pt: "Descubra a harmonia da culinária japonesa",
    ru: "Откройте гармонию японской кухни",
    ko: "일본 요리의 조화를 발견하세요",
    ar: "اكتشف تناغم المطبخ الياباني"
  };

  const imagenes = {
    es: "../images/ramen.jpg",
    en: "../images/ramen.jpg",
    jp: "../images/sushi.jpg",
    fr: "../images/tempura.jpg",
    de: "../images/ramen.jpg",
    it: "../images/tempura.jpg",
    pt: "../images/ramen.jpg",
    ru: "../images/sushi.jpg",
    ko: "../images/ramen.jpg",
    ar: "../images/te.jpg"
  };

  const textoElemento = document.getElementById("texto-idioma");
  if (textoElemento) textoElemento.textContent = textos[lang];

  const primeraImagen = document.querySelector(".slider img.slide");
  if (primeraImagen) primeraImagen.src = imagenes[lang];

  document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));

  const nombres = {
    es: "Español", en: "Inglés", jp: "Japonés", fr: "Francés",
    de: "Alemán", it: "Italiano", pt: "Portugués",
    ru: "Ruso", ko: "Coreano", ar: "Árabe"
  };

  mostrarNotificacion(`Idioma cambiado a ${nombres[lang]}`);
  console.log(`✔ Usuario cambió el idioma a: ${nombres[lang]} (${lang})`);
};


/* ======================================================
   NOTIFICACIÓN ELEGANTE
====================================================== */

function mostrarNotificacion(texto) {
  const box = document.getElementById("notificacion");
  if (!box) return;

  box.textContent = texto;
  box.classList.add("visible");

  setTimeout(() => box.classList.remove("visible"), 2500);
}


/* ======================================================
   SLIDER AUTOMÁTICO - SOLO SI EXISTE
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

  let slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return; // ← IMPORTANTE

  let currentIndex = 0;
  let intervalo;

  function mostrarSlide(index) {
    slides.forEach(s => s.classList.remove("visible"));
    slides[index].classList.add("visible");
  }

  function siguienteSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    mostrarSlide(currentIndex);
  }

  function anteriorSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    mostrarSlide(currentIndex);
  }

  function iniciarAuto() {
    intervalo = setInterval(siguienteSlide, 3500);
  }

  function reiniciarAuto() {
    clearInterval(intervalo);
    iniciarAuto();
  }

  const btnPrev = document.querySelector(".slider-btn.prev");
  const btnNext = document.querySelector(".slider-btn.next");

  if (btnPrev && btnNext) {
    btnPrev.addEventListener("click", () => {
      anteriorSlide();
      reiniciarAuto();
    });

    btnNext.addEventListener("click", () => {
      siguienteSlide();
      reiniciarAuto();
    });
  }

  iniciarAuto();

});


/* ======================================================
   MENSAJE POR HORA
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const mensaje = document.getElementById("mensaje-hora");
  if (!mensaje) return;

  const hora = new Date().getHours();
  let saludo = "";
  let frase = "";

  if (hora >= 5 && hora < 12) {
    saludo = "🌅 Buenos días —";
    frase = "Un nuevo amanecer lleno de tradición japonesa.";
  }
  else if (hora >= 12 && hora < 18) {
    saludo = "🌤️ Buenas tardes —";
    frase = "Que la armonía del Washoku ilumine tu día.";
  }
  else {
    saludo = "🌙 Buenas noches —";
    frase = "La calma japonesa acompaña cada sabor.";
  }

  mensaje.textContent = `${saludo} ${frase}`;
});
/* ================================
   EFECTO FADE-IN AL CARGAR PÁGINA
================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  // Al hacer clic en enlaces, aplicar fade-out
  document.querySelectorAll("a").forEach(link => {
    if (link.href && !link.href.includes("#")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location = link.href;
        }, 400);
      });
    }
  });
});
/* ================================
   BOTÓN VOLVER ARRIBA
================================ */

const btnTop = document.getElementById("btn-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTop.style.display = "flex";
  } else {
    btnTop.style.display = "none";
  }
});

btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
/* ====================================
   PARALLAX SUAVE EN IMÁGENES
==================================== */

document.addEventListener("scroll", () => {
  const imgs = document.querySelectorAll(".parallax");
  let offset = window.scrollY * 0.08;

  imgs.forEach(img => {
    img.style.transform = `translateY(${offset}px)`;
  });
});
/* ====================================
   EFECTO DE ESCRITURA
==================================== */

document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.getElementById("titulo-animado");
  if (!titulo) return;

  const texto = "El arte del Washoku";
  let i = 0;

  function escribir() {
    if (i < texto.length) {
      titulo.textContent += texto.charAt(i);
      i++;
      setTimeout(escribir, 80);
    }
  }

  escribir();
});
/* ====================================
   MODO CLARO / OSCURO MANUAL
==================================== */

document.addEventListener("DOMContentLoaded", () => {
  const btnTema = document.getElementById("toggle-tema");
  if (!btnTema) return;

  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("claro");

    // Cambiar icono
    if (document.body.classList.contains("claro")) {
      btnTema.textContent = "🌙";
    } else {
      btnTema.textContent = "☀️";
    }
  });
});
