const ready = (callback) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
        callback();
    }
};

ready(() => {
    const body = document.body;
    const page = body.dataset.page;
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('primary-menu');

    const handleScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    if (navMenu) {
        const navLinks = navMenu.querySelectorAll('a[data-nav]');
        navLinks.forEach((link) => {
            if (link.dataset.nav === page) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isExpanded));
            navMenu.classList.toggle('is-open', !isExpanded);
        });

        navMenu.addEventListener('click', (event) => {
            if (event.target instanceof HTMLAnchorElement) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-open');
            }
        });
    }

    const revealables = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealables.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18,
            rootMargin: '0px 0px -40px 0px'
        });

        revealables.forEach((element) => observer.observe(element));
    } else {
        revealables.forEach((element) => element.classList.add('is-visible'));
    }

    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || link.hasAttribute('data-modal-open')) {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const modal = document.getElementById('info-modal');
    const modalTitle = modal?.querySelector('.modal-title');
    const modalBody = modal?.querySelector('.modal-body');
    const modalActions = modal?.querySelectorAll('[data-close-modal]');
    const modalOpeners = document.querySelectorAll('[data-modal-open]');

    const openModal = (title, content) => {
        if (!modal || !modalTitle || !modalBody) return;
        modalTitle.textContent = title;
        modalBody.textContent = content;
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('active');
        body.classList.add('modal-open');
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn?.focus();
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open');
    };

    modalOpeners.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const button = event.currentTarget;
            if (!(button instanceof HTMLElement)) return;
            const title = button.dataset.modalTitle ?? 'Detalle';
            const content = button.dataset.modalContent ?? '';
            openModal(title, content);
        });
    });

    modalActions?.forEach((button) => {
        button.addEventListener('click', closeModal);
    });

    modal?.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.hasAttribute('data-close-modal')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    const slider = document.querySelector('[data-slider]');
    if (slider) {
        const testimonials = Array.from(slider.querySelectorAll('.testimonial'));
        let index = 0;
        if (testimonials.length) {
            testimonials[index].classList.add('is-active');
        }

        setInterval(() => {
            if (!testimonials.length) return;
            testimonials[index].classList.remove('is-active');
            index = (index + 1) % testimonials.length;
            testimonials[index].classList.add('is-active');
        }, 5500);
    }

    const filterButtons = document.querySelectorAll('[data-filter]');
    const catalogItems = document.querySelectorAll('[data-collection-item]');
    if (filterButtons.length && catalogItems.length) {
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                filterButtons.forEach((btn) => {
                    btn.classList.remove('is-active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('is-active');
                button.setAttribute('aria-selected', 'true');

                const filter = button.dataset.filter ?? 'todos';
                catalogItems.forEach((item) => {
                    const categories = (item.dataset.collectionItem ?? '').split(' ');
                    const shouldShow = filter === 'todos' || categories.includes(filter);
                    item.toggleAttribute('hidden', !shouldShow);
                });
            });
        });
    }

    const swatches = document.querySelectorAll('.swatch');
    const boardSlots = document.querySelectorAll('.drop-slot');
    const builderFeedback = document.querySelector('.builder-feedback');
    if (swatches.length && boardSlots.length && builderFeedback) {
        const lookbookData = {
            minimal: ['Vestido slip de seda reciclada', 'Blazer perla estructurado', 'Collar lumínico modulable'],
            boho: ['Caftán con bordado constelación', 'Chal vaporoso en lurex', 'Aretes celestiales artesanales'],
            urbano: ['Top técnico respirable', 'Chaqueta reversible metálica', 'Bolso modular magnético'],
            eco: ['Mono en cáñamo orgánico', 'Kimono vegetal en tintes botánicos', 'Pulsera bioluminiscente']
        };

        swatches.forEach((swatch) => {
            swatch.addEventListener('click', () => {
                swatches.forEach((button) => button.classList.remove('is-active'));
                swatch.classList.add('is-active');
                const key = swatch.dataset.swatch;
                const suggestions = key ? lookbookData[key] : undefined;
                if (suggestions) {
                    builderFeedback.textContent = 'Así combinaríamos este estilo:';
                    boardSlots.forEach((slot, index) => {
                        slot.textContent = suggestions[index] ?? '';
                    });
                } else {
                    builderFeedback.textContent = 'Selecciona un estilo para ver sus recomendaciones.';
                    boardSlots.forEach((slot) => {
                        slot.textContent = '';
                    });
                }
            });
        });
    }

    const tabButtons = document.querySelectorAll('[data-tab-target]');
    const tabPanels = document.querySelectorAll('[data-tab-panel]');
    if (tabButtons.length && tabPanels.length) {
        tabButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const target = button.dataset.tabTarget;
                if (!target) return;

                tabButtons.forEach((btn) => {
                    btn.classList.remove('is-active');
                    btn.setAttribute('aria-selected', 'false');
                });
                tabPanels.forEach((panel) => panel.classList.remove('is-active'));

                button.classList.add('is-active');
                button.setAttribute('aria-selected', 'true');
                const panel = document.querySelector(`[data-tab-panel="${target}"]`);
                panel?.classList.add('is-active');
            });
        });
    }

    const accordions = document.querySelectorAll('[data-accordion]');
    accordions.forEach((item) => {
        const trigger = item.querySelector('[data-accordion-trigger]');
        const answer = item.querySelector('.faq-answer');
        if (!trigger || !answer) return;

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.toggle('is-open');
            trigger.setAttribute('aria-expanded', String(isOpen));
        });
    });

    const enhancedForms = document.querySelectorAll('[data-enhanced-form]');
    enhancedForms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!(form instanceof HTMLFormElement)) return;
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const feedback = form.querySelector('.form-feedback');
            if (feedback) {
                feedback.textContent = '¡Gracias! Te contactaremos en menos de 12 horas.';
            }
            form.reset();
            setTimeout(() => {
                if (feedback) {
                    feedback.textContent = '';
                }
            }, 5000);
        });
    });
});
