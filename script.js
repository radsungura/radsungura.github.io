// script.js - Améliorations pour un portfolio moderne

document.addEventListener('DOMContentLoaded', function() {
    
    // ============ MENU MOBILE ============
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
            
            // Animation d'apparition des liens
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach((link, index) => {
                if (navMenu.classList.contains('active')) {
                    link.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1 + 0.3}s`;
                } else {
                    link.style.animation = 'none';
                }
            });
        });
        
        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }
    
    // ============ SCROLL ANIMATIONS ============
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animation spécifique pour les cartes de formation
                if (entry.target.classList.contains('education-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, 100);
                }
                
                // Animation pour les catégories de compétences
                if (entry.target.classList.contains('skill-category')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, 150);
                }
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.education-card, .skill-category, .timeline-item, .interest-item').forEach(el => {
        observer.observe(el);
    });
    
    // ============ FORMULAIRE DE CONTACT AVEC VALIDATION ============
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !subject || !message) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Désactiver le bouton pendant l'envoi
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            try {
                // Simuler un envoi (à remplacer par votre backend)
                await simulateApiCall();
                
                // Succès
                showNotification(`Merci ${name}! Votre message a été envoyé. Je vous répondrai bientôt.`, 'success');
                contactForm.reset();
                
                // Animation de succès
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.classList.add('success-animation');
                    setTimeout(() => group.classList.remove('success-animation'), 1000);
                });
                
            } catch (error) {
                showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Effet de focus sur les champs du formulaire
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    // ============ ANIMATION DES COMPÉTENCES AU SURVOL ============
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 15px rgba(37, 99, 235, 0.2)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // ============ FILTRE PAR CATÉGORIE DE COMPÉTENCES (OPTIONNEL) ============
    const filterButtons = document.createElement('div');
    filterButtons.className = 'skill-filters';
    filterButtons.innerHTML = `
        <button class="filter-btn active" data-filter="all">Toutes</button>
        <button class="filter-btn" data-filter="frontend">Frontend</button>
        <button class="filter-btn" data-filter="backend">Backend</button>
        <button class="filter-btn" data-filter="database">Bases de données</button>
        <button class="filter-btn" data-filter="tools">Outils</button>
    `;
    
    const skillsSection = document.querySelector('.skills .container');
    if (skillsSection) {
        const sectionTitle = skillsSection.querySelector('.section-title');
        skillsSection.insertBefore(filterButtons, sectionTitle.nextSibling);
        
        // Gestion des filtres
        const filterBtns = document.querySelectorAll('.filter-btn');
        const skillCategories = document.querySelectorAll('.skill-category');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                skillCategories.forEach(category => {
                    if (filter === 'all' || category.querySelector('h3').textContent.toLowerCase().includes(filter)) {
                        category.style.display = 'block';
                        setTimeout(() => {
                            category.style.opacity = '1';
                            category.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        category.style.opacity = '0';
                        category.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            category.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ============ COMPTEUR ANIMÉ (EXEMPLE - POUR FUTURES STATISTIQUES) ============
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // ============ MODE CLAIR/SOMBRE (FONCTIONNALITÉ AVANCÉE) ============
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Changer de thème';
    
    const navbar = document.querySelector('.navbar .container');
    if (navbar) {
        navbar.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Charger le thème sauvegardé
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // ============ EFFET DE TYPING DANS LE HERO ============
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        const words = text.split(' ');
        heroTitle.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            heroTitle.appendChild(span);
        });
    }
    
    // ============ ANIMATION DES PROGRESS BARS (POUR FUTURES COMPÉTENCES) ============
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 500);
        });
    }
    
    // ============ FONCTIONS UTILITAIRES ============
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        `;
        
        // Ajouter au body
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Fermer la notification
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        // Fermeture automatique après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    function simulateApiCall() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simuler un succès 90% du temps
                Math.random() > 0.1 ? resolve() : reject(new Error('API Error'));
            }, 1500);
        });
    }
    
    // ============ AJOUTER DES ANIMATIONS CSS DYNAMIQUEMENT ============
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .education-card, .skill-category {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .education-card.animate, .skill-category.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-group.focused input,
        .form-group.focused textarea {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .success-animation input,
        .success-animation textarea {
            border-color: #10b981 !important;
            background-color: rgba(16, 185, 129, 0.05);
        }
        
        .skill-filters {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 8px 20px;
            background: #f3f4f6;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .filter-btn.active {
            background: #2563eb;
            color: white;
        }
        
        .filter-btn:hover {
            transform: translateY(-2px);
        }
        
        #themeToggle {
            background: none;
            border: none;
            font-size: 1.2rem;
            color: #1f2937;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        .dark-mode #themeToggle {
            color: #f9fafb;
        }
        
        #themeToggle:hover {
            background: #f3f4f6;
        }
        
        .dark-mode #themeToggle:hover {
            background: #374151;
        }
        
        .dark-mode {
            background-color: #111827;
            color: #f9fafb;
        }
        
        .dark-mode .navbar,
        .dark-mode .skill-category,
        .dark-mode .education-card,
        .dark-mode .timeline-content,
        .dark-mode .contact-info,
        .dark-mode .contact-form,
        .dark-mode .about-info,
        .dark-mode .interest-item {
            background-color: #1f2937;
            color: #f9fafb;
        }
        
        .dark-mode .section-title {
            color: #f9fafb;
        }
        
        .dark-mode .skill-tag {
            background-color: #374151;
            color: #f9fafb;
        }
        
        .dark-mode .quality-tag {
            background-color: #1e40af;
            color: #f9fafb;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 300px;
            max-width: 400px;
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background-color: #10b981;
        }
        
        .notification.error {
            background-color: #ef4444;
        }
        
        .notification.info {
            background-color: #3b82f6;
        }
        
        .close-notification {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: 15px;
        }
        
        /* Effet de vague au clic */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ============ EFFET RIPPLE SUR LES BOUTONS ============
    document.querySelectorAll('.btn, .filter-btn, #themeToggle').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ============ ANIMATION AU SCROLL ============
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Navbar transparente en haut
        const navbar = document.querySelector('.navbar');
        if (scrolled > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // ============ PRELOADER (OPTIONNEL) ============
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Chargement du portfolio...</p>
        </div>
    `;
    
    document.body.prepend(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }, 1000);
    });
    
    // ============ INITIALISATION ============
    console.log('Portfolio Aimé RUKUNDO chargé avec succès!');
});

// ============ FONCTIONS GLOBALES ============
// Partage sur les réseaux sociaux
function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareOnTwitter() {
    const text = encodeURIComponent("Découvrez le portfolio d'Aimé RUKUNDO - Développeur Full Stack");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// Téléchargement du CV avec tracking
function downloadCV() {
    // Ici vous pouvez ajouter Google Analytics ou autre tracking
    console.log('CV téléchargé');
    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer.push({'event': 'cv_download'});
}