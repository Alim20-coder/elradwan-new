        // ══════════════════════════════════════
        // LANGUAGE SYSTEM
        // ══════════════════════════════════════
        let currentLang = 'ar';

        function toggleLang() {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            applyLang();
        }

        function applyLang() {
            const html = document.getElementById('html-root');
            const lbl = document.getElementById('lang-label');
            const ldTxt = document.getElementById('ld-txt');

            if (currentLang === 'en') {
                html.setAttribute('lang', 'en');
                html.setAttribute('dir', 'ltr');
                lbl.textContent = 'عربي';
                document.title = 'AL Radwan International Investment | Steel Construction';
            } else {
                html.setAttribute('lang', 'ar');
                html.setAttribute('dir', 'rtl');
                lbl.textContent = 'EN';
                document.title = 'الرضوان العالمية للاستثمار | حلول البناء الفولاذي';
            }

            // Translate all data-ar / data-en elements
            document.querySelectorAll('[data-ar][data-en]').forEach(el => {
                const txt = el.getAttribute('data-' + currentLang);
                if (!txt) return;
                // Use innerHTML only for elements that may contain HTML tags (h2 with spans)
                if (el.tagName === 'H2' || el.tagName === 'H1') {
                    el.innerHTML = txt;
                } else {
                    el.textContent = txt;
                }
            });

            // Update form placeholders
            updatePlaceholders();

            // Update filter tab text
            document.querySelectorAll('.ftab').forEach(btn => {
                const t = btn.getAttribute('data-' + currentLang);
                if (t) btn.textContent = t;
            });

            // Translate select options
            document.querySelectorAll('select option').forEach(opt => {
                const t = opt.getAttribute('data-' + currentLang);
                if (t) opt.textContent = t;
            });
        }

        function updatePlaceholders() {
            const placeholders = {
                'inp-name': { ar: 'الاسم الكامل', en: 'Full Name' },
                'inp-phone': { ar: 'رقم الهاتف', en: 'Phone Number' },
                'inp-email': { ar: 'البريد الإلكتروني', en: 'Email Address' },
                'inp-msg': { ar: 'رسالتك هنا...', en: 'Your message here...' },
            };
            for (const [id, vals] of Object.entries(placeholders)) {
                const el = document.getElementById(id);
                if (el) el.placeholder = vals[currentLang];
            }
        }

        // Set initial placeholders
        updatePlaceholders();

        // ══════════════════════════════════════
        // LOADER
        // ══════════════════════════════════════
      function hideLoader() {
        const ld = document.getElementById('loader');
        const body = document.body;
        
        if (ld) ld.classList.add('out');
        if (body) body.classList.remove('loading');
        startCounters();
    }
    if (document.readyState === 'complete') {
        hideLoader();
    } 
    else {
        window.addEventListener('load', hideLoader);
    }

    setTimeout(() => {
        hideLoader();
    }, 3000);

        // ══════════════════════════════════════
        // NAVBAR SCROLL
        // ══════════════════════════════════════
        const nav = document.getElementById('nav');
        const btt = document.getElementById('btt');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                nav.classList.add('scrolled');
                btt.classList.add('show');
            } else {
                nav.classList.remove('scrolled');
                btt.classList.remove('show');
            }
            highlightNav();
        });

        // ══════════════════════════════════════
        // ACTIVE NAV
        // ══════════════════════════════════════
        function highlightNav() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 120;
            sections.forEach(s => {
                const top = s.offsetTop;
                const bot = top + s.offsetHeight;
                const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
                if (link) {
                    if (scrollPos >= top && scrollPos < bot) link.classList.add('active');
                    else link.classList.remove('active');
                }
            });
        }

        // ══════════════════════════════════════
        // SCROLL REVEAL
        // ══════════════════════════════════════
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('visible'), i * 80);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => revealObserver.observe(el));

        // ══════════════════════════════════════
        // COUNTER ANIMATION
        // ══════════════════════════════════════
        function animateCount(el, target, duration = 1800) {
            let start = 0;
            const step = target / (duration / 16);
            const timer = setInterval(() => {
                start += step;
                if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
                else el.textContent = Math.floor(start);
            }, 16);
        }

        function startCounters() {
            document.querySelectorAll('[data-count]').forEach(el => {
                const target = parseInt(el.getAttribute('data-count'));
                animateCount(el, target);
            });
        }

        // Also trigger counters when achievement section is visible
        const achObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.querySelectorAll('[data-count]').forEach(el => {
                        if (el.textContent === '0') animateCount(el, parseInt(el.getAttribute('data-count')));
                    });
                }
            });
        }, { threshold: 0.3 });
        const achSec = document.getElementById('achievements');
        if (achSec) achObserver.observe(achSec);

        // ══════════════════════════════════════
        // PORTFOLIO FILTER
        // ══════════════════════════════════════
        document.querySelectorAll('.ftab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        document.querySelectorAll('.port-group').forEach(group => {
            const cat = group.getAttribute('data-cat');
            
            if (filter === 'all' || cat === filter) {
                group.style.display = 'block';
                group.classList.remove('hidden');
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translateY(0)';
                    group.style.pointerEvents = 'auto';
                }, 10);
            } else {
                group.style.opacity = '0';
                group.style.transform = 'translateY(20px)';
                group.style.pointerEvents = 'none';
                setTimeout(() => {
                    group.style.display = 'none';
                    group.classList.add('hidden');
                }, 400);
            }
        });

        document.querySelectorAll('#portGrid > .port-card').forEach(card => {
            const cat = card.getAttribute('data-cat');
            
            if (filter === 'all' || cat === filter) {
                card.style.display = 'block';
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.pointerEvents = 'auto';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85)';
                card.style.pointerEvents = 'none';
                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }, 350);
            }
        });
    });
});
        // ══════════════════════════════════════
        // PARTICLES CANVAS
        // ══════════════════════════════════════
        (function () {
            const canvas = document.getElementById('cnv');
            const ctx = canvas.getContext('2d');
            let W, H, particles = [];

            function resize() {
                W = canvas.width = window.innerWidth;
                H = canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            // Updated colors for particles (Sand and Green)
            const colors = ['rgba(193,158,80,', 'rgba(58,139,85,', 'rgba(189,195,199,'];

            class Particle {
                constructor() { this.reset(); }
                reset() {
                    this.x = Math.random() * W;
                    this.y = Math.random() * H;
                    this.r = Math.random() * 1.8 + 0.3;
                    this.vx = (Math.random() - 0.5) * 0.35;
                    this.vy = (Math.random() - 0.5) * 0.35;
                    this.alpha = Math.random() * 0.5 + 0.1;
                    this.col = colors[Math.floor(Math.random() * colors.length)];
                }
                update() {
                    this.x += this.vx; this.y += this.vy;
                    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                    ctx.fillStyle = this.col + this.alpha + ')';
                    ctx.fill();
                }
            }

            for (let i = 0; i < 90; i++) particles.push(new Particle());

            function loop() {
                ctx.clearRect(0, 0, W, H);
                particles.forEach(p => { p.update(); p.draw(); });
                // Draw connections
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(193,158,80,${0.06 * (1 - dist / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
                requestAnimationFrame(loop);
            }
            loop();
        })();

        // ══════════════════════════════════════
        // SMOOTH SCROLL FOR NAV LINKS
        // ══════════════════════════════════════
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu
                    const menu = document.getElementById('navmenu');
                    if (menu.classList.contains('show')) {
                        document.querySelector('.navbar-toggler').click();
                    }
                }
            });
        });

        // ══════════════════════════════════════
        // FORM SEND (MOCK)
        // ══════════════════════════════════════
        function sendForm() {
            const btn = event.currentTarget;
            const origHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>' + (currentLang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') + '</span>';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>' + (currentLang === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent Successfully!') + '</span>';
                btn.style.background = 'linear-gradient(135deg, #3A8B55, #5CBA75)'; // Green success
                setTimeout(() => {
                    btn.innerHTML = origHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1800);
        }

        // ══════════════════════════════════════
        // GLOWING CURSOR TRAIL (optional subtle)
        // ══════════════════════════════════════
        document.addEventListener('mousemove', e => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
    position:fixed; left:${e.clientX}px; top:${e.clientY}px;
    width:6px; height:6px; background:rgba(193,158,80,.4);
    border-radius:50%; pointer-events:none; z-index:9990;
    transform:translate(-50%,-50%);
    animation:cursorFade .6s ease forwards;
  `;
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        // Inject cursor fade keyframe
        const style = document.createElement('style');
        style.textContent = '@keyframes cursorFade{from{opacity:.6;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(2.5)}}';
        document.head.appendChild(style);

        // ══════════════════════════════════════
        // VIDEO MODAL LOGIC
        // ══════════════════════════════════════
        const vmodal = document.getElementById('videoModal');
        const mvideo = document.getElementById('modalVideo');
        const vclose = document.getElementById('closeVideoModal');

        if (vmodal && mvideo && vclose) {
            // Target all portfolio cards containing a video
            document.querySelectorAll('.pgcard, .port-card').forEach(card => {
                const video = card.querySelector('video');
                if (video) {
                    card.addEventListener('click', () => {
                        mvideo.src = video.src;
                        vmodal.classList.add('show');
                        mvideo.play();
                    });
                }
            });

            // Close modal
            const closeModal = () => {
                vmodal.classList.remove('show');
                mvideo.pause();
                mvideo.src = '';
            };

            vclose.addEventListener('click', closeModal);
            vmodal.addEventListener('click', (e) => {
                if (e.target === vmodal) closeModal();
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && vmodal.classList.contains('show')) closeModal();
            });
        }