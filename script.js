const navbar = document.getElementById('navbar');
const revealElements = document.querySelectorAll('.reveal');
const modal = document.getElementById('info-modal');
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.querySelector('.modal-body');
const modalLinks = document.querySelectorAll('.link[data-modal]');
const closeModalTriggers = document.querySelectorAll('[data-close-modal]');
const body = document.body;
const ctaForm = document.querySelector('.cta-form');
const formStatus = document.querySelector('.form-status');

function onScroll() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => observer.observe(el));

function openModal(title, description) {
    modalTitle.textContent = title;
    modalBody.textContent = description;
    modal.classList.add('active');
    body.classList.add('modal-open');
    const focusable = modal.querySelector('.modal-close');
    if (focusable) {
        focusable.focus();
    }
}

function closeModal() {
    modal.classList.remove('active');
    body.classList.remove('modal-open');
}

modalLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const { modal: title, description } = event.currentTarget.dataset;
        openModal(title, description);
    });
});

closeModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        closeModal();
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

modal.addEventListener('click', (event) => {
    if (event.target.dataset.closeModal !== undefined) {
        closeModal();
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || anchor.dataset.modal) return;

        const target = document.querySelector(href);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

if (ctaForm && formStatus) {
    ctaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        formStatus.textContent = '¡Gracias! Nos pondremos en contacto contigo en menos de 24 horas.';
        ctaForm.reset();
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', () => {
    onScroll();
});
