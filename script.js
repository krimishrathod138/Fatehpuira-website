document.addEventListener('DOMContentLoaded', () => {
    // Intro Animation Sequence
    const introOverlay = document.getElementById('intro-overlay');
    const introLogo = document.getElementById('intro-logo-container');
    const introMap = document.getElementById('intro-map-container');
    const introText = document.getElementById('intro-text');

    if (introOverlay) {
        // Check if intro has already been shown in this session
        if (sessionStorage.getItem('introShown')) {
            introOverlay.style.display = 'none';
            document.body.classList.remove('intro-active');
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 100);
            }
        } else {
            document.body.classList.add('intro-active');
            
            // 1. Show Logo
            setTimeout(() => {
                introLogo.classList.add('show');
            }, 500);

            // 2. Transition to Map
            setTimeout(() => {
                introLogo.style.opacity = '0';
                introLogo.style.transform = 'translateY(-20px) scale(0.8)';
                
                setTimeout(() => {
                    introMap.classList.add('show');
                }, 500);
            }, 2500);

            // 3. Show Intro Text
            setTimeout(() => {
                introText.classList.add('show');
            }, 4000);

            // 4. Reveal Website
            setTimeout(() => {
                introOverlay.classList.add('hide');
                document.body.classList.remove('intro-active');
                
                // Mark intro as shown in session storage
                sessionStorage.setItem('introShown', 'true');
                
                // Re-initialize AOS after intro to ensure animations trigger correctly
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }, 7000);
        }
    }

    // Custom Cursor Logic
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    const cursorOutline = document.createElement('div');
    cursorOutline.id = 'custom-cursor-outline';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .hover-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2.5)';
            cursor.style.background = 'rgba(37, 99, 235, 0.2)';
            cursorOutline.style.borderColor = 'rgba(37, 99, 235, 0.5)';
            cursorOutline.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
            cursor.style.background = '#2563eb';
            cursorOutline.style.borderColor = '#2563eb';
            cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
        });
    });

    // Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = mobileMenu ? mobileMenu.querySelector('div') : null;
    const header = document.querySelector('header');

    if (menuBtn && mobileMenu) {
        const toggleMenu = (open) => {
            if (open) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.add('opacity-100');
                    if (mobileMenuContent) mobileMenuContent.classList.remove('-translate-x-full');
                }, 10);
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('opacity-100');
                if (mobileMenuContent) mobileMenuContent.classList.add('-translate-x-full');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                document.body.style.overflow = '';
            }
        };

        menuBtn.addEventListener('click', () => toggleMenu(true));
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMenu(false));
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) toggleMenu(false);
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-xl', 'py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('shadow-xl', 'py-2');
            header.classList.add('py-4');
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-corporate, .magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            btn.style.transition = 'none';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // Hero Title & Subtitle Reveal Animation
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('section p[data-aos-delay="200"]');
    
    if (heroTitle) {
        const text = heroTitle.innerText;
        heroTitle.innerHTML = text.split(' ').map((word, i) => 
            `<span style="transition-delay: ${i * 100}ms">${word}</span>`
        ).join(' ');
        
        setTimeout(() => {
            heroTitle.querySelectorAll('span').forEach(span => span.classList.add('reveal'));
        }, 300);
    }

    if (heroSubtitle) {
        const text = heroSubtitle.innerText;
        heroSubtitle.innerHTML = text.split('').map((char, i) => 
            `<span class="char" style="transition-delay: ${i * 15}ms">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        setTimeout(() => {
            heroSubtitle.querySelectorAll('.char').forEach(span => span.classList.add('reveal'));
        }, 800);
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            once: true,
            offset: 150,
            easing: 'ease-out-quint'
        });
    }

    // Parallax effect for blobs and images
    document.addEventListener('mousemove', (e) => {
        const elements = document.querySelectorAll('.blob, .floating-shape, .parallax-img');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        elements.forEach((el, index) => {
            const speed = el.classList.contains('parallax-img') ? 30 : (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Particle Generation
    const createParticles = () => {
        const containers = document.querySelectorAll('.particles-container');
        containers.forEach(container => {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.setProperty('--tw-translate-x', `${(Math.random() - 0.5) * 200}px`);
                particle.style.setProperty('--tw-translate-y', `${(Math.random() - 0.5) * 200}px`);
                particle.style.animationDelay = `${Math.random() * 10}s`;
                particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
                container.appendChild(particle);
            }
        });
    };
    createParticles();

    // Tilt Effect for Speciality Cards with Glare
    const tiltCards = document.querySelectorAll('.tilt-card, .hover-card');
    tiltCards.forEach(card => {
        const glare = card.querySelector('.glare');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            
            if (glare) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.transform = `translate(${glareX - 50}%, ${glareY - 50}%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // SVG Line Drawing Animation
    const drawingLines = document.querySelectorAll('.drawing-line');
    const drawingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                drawingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    drawingLines.forEach(line => drawingObserver.observe(line));

    // Scroll-triggered background shift
    window.addEventListener('scroll', () => {
        const scrollFraction = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const bgColor = `rgba(255, 255, 255, ${1 - scrollFraction * 0.1})`;
        // document.body.style.backgroundColor = bgColor; // Subtle shift
    });

    // Number counting animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            if (stat.classList.contains('animated')) return;
            stat.classList.add('animated');

            const target = parseFloat(stat.getAttribute('data-target'));
            if (isNaN(target)) return;
            
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.innerText = formatNumber(count, stat.getAttribute('data-suffix') || '');
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = formatNumber(target, stat.getAttribute('data-suffix') || '');
                }
            };
            updateCount();
        });
    };

    const formatNumber = (num, suffix) => {
        if (suffix === '%') return num.toFixed(1) + suffix;
        return Math.floor(num) + suffix;
    };

    // Trigger stats animation when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) statsObserver.observe(statsContainer);

    // Image reveal effect
    const revealImages = document.querySelectorAll('img[data-reveal]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                const overlay = entry.target.parentElement.querySelector('.reveal-overlay');
                if (overlay) overlay.classList.add('loaded');
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealImages.forEach(img => imageObserver.observe(img));

    // Logistics Flow Section Reveal
    const flowSection = document.getElementById('logistics-flow-section');
    if (flowSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    flowSection.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(flowSection);
    }

    // Ecosystem Network Reveal Animation
    const networkSection = document.getElementById('ecosystem-network');
    if (networkSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start reveal sequence
                    setTimeout(() => {
                        networkSection.classList.add('revealed');
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(networkSection);
    }

    // Location Card Click Toggle
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            // Optional: Close other cards when one is opened
            locationCards.forEach(c => {
                if (c !== this) c.classList.remove('active');
            });
            this.classList.toggle('active');
        });
    });

    console.log('Fatehpuria Website Corporate Upgrade Initialized.');
});
