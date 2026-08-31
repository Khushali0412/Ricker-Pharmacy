/**
 * Ricker Pharmacy - Mobile Navigation & Responsive Menu Controller
 */

function getOrCreateBackdrop() {
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        const header = document.querySelector('.header');
        if (header && header.parentNode) {
            header.parentNode.insertBefore(backdrop, header);
        } else {
            document.body.appendChild(backdrop);
        }
        backdrop.addEventListener('click', closeMobileNav);
    }
    return backdrop;
}

function toggleMobileMenu(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const backdrop = getOrCreateBackdrop();

    if (mainNav) {
        const isOpen = mainNav.classList.toggle('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.toggle('active', isOpen);
        if (backdrop) backdrop.classList.toggle('active', isOpen);
        document.body.classList.toggle('no-scroll', isOpen);
    }
}

function closeMobileNav() {
    const mainNav = document.getElementById('mainNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const backdrop = document.querySelector('.nav-backdrop');
    if (mainNav) mainNav.classList.remove('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileNav = closeMobileNav;

function initMobileNav() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    getOrCreateBackdrop();

    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = toggleMobileMenu;
    }

    if (mainNav) {
        // Setup dropdown toggles
        const dropdownItems = mainNav.querySelectorAll('.has-dropdown, .lang-dropdown');
        dropdownItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                link.onclick = (e) => {
                    if (window.innerWidth <= 992) {
                        e.preventDefault();
                        e.stopPropagation();
                        item.classList.toggle('mobile-dropdown-open');
                        dropdownItems.forEach(other => {
                            if (other !== item) other.classList.remove('mobile-dropdown-open');
                        });
                    }
                };
            }
        });

        // Close on simple links
        const navLinks = mainNav.querySelectorAll('a:not(.has-dropdown > a):not(.lang-dropdown > a)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) closeMobileNav();
            });
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileNav();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) closeMobileNav();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
} else {
    initMobileNav();
}
