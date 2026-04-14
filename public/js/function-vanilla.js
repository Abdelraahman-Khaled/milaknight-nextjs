(function() {
    "use strict";

    // Sticky Header
    const handleStickyHeader = () => {
        const header = document.querySelector('header.main-header');
        const stickyHeader = document.querySelector('header .header-sticky');
        
        if (!header) return;

        window.addEventListener('scroll', () => {
            const topScroll = window.scrollY;

            // Header state based on scroll
            if (topScroll > 100) {
                header.classList.add('active');
            } else {
                header.classList.remove('active');
            }

            if (stickyHeader) {
                // Fixed active state at threshold
                if (topScroll > 600) {
                    stickyHeader.classList.add('active');
                } else {
                    stickyHeader.classList.remove('active');
                }
            }
        });
    };

    // Scroll to Top
    const handleScrollTop = () => {
        const topBtn = document.querySelector("a[href='#top']");
        if (topBtn) {
            topBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    };

    // GSAP Text Animations (SplitText)
    const initTextAnimations = () => {
        if (typeof SplitText === 'undefined' || typeof gsap === 'undefined') return;

        // Type 1
        document.querySelectorAll(".text-anime-style-1").forEach((el) => {
            if (el.classList.contains("split-text-initialized")) return;
            el.classList.add("split-text-initialized");
            let ts = new SplitText(el, { type: "chars, words" });
            if (ts.words) {
                gsap.from(ts.words, {
                    duration: 1,
                    delay: 0.5,
                    x: 20,
                    autoAlpha: 0,
                    stagger: 0.05,
                    scrollTrigger: { trigger: el, start: "top 85%" },
                });
            }
        });

        // Type 2
        document.querySelectorAll(".text-anime-style-2").forEach((el) => {
            if (el.classList.contains("split-text-initialized")) return;
            el.classList.add("split-text-initialized");
            let ts = new SplitText(el, { type: "chars, words" });
            if (ts.chars) {
                gsap.from(ts.chars, {
                    duration: 1,
                    delay: 0.1,
                    x: 20,
                    autoAlpha: 0,
                    stagger: 0.03,
                    ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 85%" },
                });
            }
        });

        // Type 3
        document.querySelectorAll(".text-anime-style-3").forEach((el) => {
            if (el.animation) {
                el.animation.progress(1).kill();
                el.split.revert();
            }
            el.split = new SplitText(el, { type: "lines,words,chars", linesClass: "split-line" });
            gsap.set(el, { perspective: 400 });
            if (el.split.chars) {
                gsap.set(el.split.chars, { opacity: 0, x: "50" });
                el.animation = gsap.to(el.split.chars, {
                    scrollTrigger: { trigger: el, start: "top 90%" },
                    x: "0",
                    y: "0",
                    rotateX: "0",
                    opacity: 1,
                    duration: 1,
                    ease: "back.out",
                    stagger: 0.02,
                });
            }
        });
    };

    // Project Filtering (Simplified replacement for Isotope)
    const handleProjectFiltering = () => {
        const navLinks = document.querySelectorAll(".our-Project-nav a");
        const items = document.querySelectorAll(".project-item-box, .col-lg-4, .col-md-6");
        
        if (!navLinks.length) return;

        const filterItems = (filterVal) => {
            const f = filterVal === "*" ? "*" : filterVal.startsWith(".") ? filterVal.slice(1) : filterVal;
            items.forEach((item) => {
                if (f === "*" || item.classList.contains(f)) {
                    item.style.display = 'block';
                    item.classList.remove("post-hidden");
                } else {
                    item.style.display = 'none';
                    item.classList.add("post-hidden");
                }
            });
        };

        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const filterVal = link.getAttribute('data-filter') || "*";
                navLinks.forEach((l) => l.classList.remove("active-btn"));
                link.classList.add("active-btn");
                filterItems(filterVal);
            });
        });
    };

    // Preloader
    const handlePreloader = () => {
        const preloader = document.querySelector(".preloader");
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 500);
        }
    };

    // Initialize all
    const init = () => {
        handleStickyHeader();
        handleScrollTop();
        initTextAnimations();
        handleProjectFiltering();
        handlePreloader();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export to window for manual re-init if needed
    window.initMilaknightFunctionsVanilla = init;

})();
