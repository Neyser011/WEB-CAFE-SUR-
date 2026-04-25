// =============================================
// MENÚ MÓVIL TOGGLE
// =============================================
document.addEventListener('DOMContentLoaded', function () {

    // Obtener elementos del DOM
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    // Verificar que los elementos existen
    if (menuToggle && navLinks) {

        // Evento click para mostrar/ocultar menú
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');

            // Cambiar icono del botón
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

    }

});


// =============================================
// CIERRE DE MENÚ AL HACER CLICK EN UN ENLACE
// =============================================
document.addEventListener('DOMContentLoaded', function () {

    // Obtener todos los enlaces de navegación
    const navItems = document.querySelectorAll('.nav-links a');
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menuToggle');

    // Agregar evento a cada enlace
    navItems.forEach(function (item) {
        item.addEventListener('click', function () {

            // Solo cerrar en móvil (cuando el menú está activo)
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');

                // Restaurar icono del botón
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }

        });
    });

});


// =============================================
// SCROLL SUAVE PARA ANCLAS INTERNAS
// =============================================
document.addEventListener('DOMContentLoaded', function () {

    // Seleccionar todos los enlaces que comienzan con #
    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Obtener el destino
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll suave hacia el elemento
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

        });
    });

});


// =============================================
// ANIMACIÓN DE APARICIÓN AL HACER SCROLL
// =============================================
document.addEventListener('DOMContentLoaded', function () {

    // Crear el observador de intersección
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Elementos a observar
    const animElements = document.querySelectorAll('.about-text, .about-images, .horarios-card');

    animElements.forEach(function (element) {
        // Estado inicial
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        // Observar elemento
        observer.observe(element);
    });

});


// =============================================
// SISTEMA DE RESERVAS - PÁGINA DEDICADA
// =============================================
document.addEventListener('DOMContentLoaded', function () {

    const formReservaPage = document.getElementById('reservaPageForm');
    const divSuccessPage = document.getElementById('reservaPageSuccess');

    // Enviar Formulario (Integración con WhatsApp)
    if (formReservaPage) {
        formReservaPage.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // 1. Recopilar datos del formulario
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const personas = document.getElementById('personas').value;
            const motivo = document.getElementById('motivo').value;
            const mensaje = document.getElementById('mensaje').value;

            // 2. Número de WhatsApp de Café Sur (Código Perú 51 + número)
            const numeroCafeSur = "51904322426"; 

            // 3. Formatear el mensaje
            let textoWhatsApp = `☕ *NUEVA SOLICITUD DE RESERVA - CAFÉ SUR* ☕%0A%0A`;
            textoWhatsApp += `*👤 Nombre:* ${nombre}%0A`;
            textoWhatsApp += `*📱 Teléfono:* ${telefono}%0A`;
            textoWhatsApp += `*📅 Fecha:* ${fecha}%0A`;
            textoWhatsApp += `*⏰ Hora:* ${hora}%0A`;
            textoWhatsApp += `*👥 Personas:* ${personas}%0A`;
            textoWhatsApp += `*🎉 Motivo:* ${motivo}%0A`;
            
            if (mensaje.trim() !== "") {
                textoWhatsApp += `*💬 Petición Especial:* ${mensaje}%0A`;
            }
            
            textoWhatsApp += `%0A_Por favor, confírmenme la disponibilidad. ¡Gracias!_`;

            // 4. Crear URL de WhatsApp
            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroCafeSur}&text=${textoWhatsApp}`;

            // 5. Animación de carga y redirección
            const btnSubmit = formReservaPage.querySelector('.btn-submit');
            btnSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Redirigiendo a WhatsApp...';
            btnSubmit.disabled = true;
            btnSubmit.style.background = "#25D366"; // Color oficial de WhatsApp

            setTimeout(function() {
                // Abrir WhatsApp en nueva pestaña
                window.open(urlWhatsApp, '_blank');
                
                // Ocultar formulario y mostrar éxito en la web
                formReservaPage.classList.add('hidden');
                divSuccessPage.classList.remove('hidden');
            }, 1500); 
        });
    }

});

// =============================================
// EFECTO DE ESCRITURA (TYPEWRITER / WORD ROTATION)
// =============================================
class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    
    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
});