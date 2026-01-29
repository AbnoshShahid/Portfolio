/**
 * background-effect.js
 * Initializes Vanta.NET 3D background and invalidates/updates on theme change.
 */

document.addEventListener('DOMContentLoaded', () => {
    let vantaEffect = null;
    const bgElement = document.getElementById('vanta-bg');

    // Configuration for different modes
    const darkConfig = {
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3b82f6,       // Primary blue
        backgroundColor: 0x0f172a, // Dark background
        points: 12.00,
        maxDistance: 22.00,
        spacing: 18.00
    };

    const lightConfig = {
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3b82f6,       // Primary blue
        backgroundColor: 0xf8fafc, // Light background
        points: 10.00,
        maxDistance: 20.00,
        spacing: 16.00
    };

    // initialize vanta
    function initVanta(isDark) {
        if (vantaEffect) {
            vantaEffect.destroy();
        }

        const config = isDark ? darkConfig : lightConfig;

        // Verify Three.js and Vanta are loaded
        if (window.VANTA && window.VANTA.NET) {
            try {
                vantaEffect = window.VANTA.NET(config);
            } catch (e) {
                console.error("Vanta js error:", e);
            }
        }
    }

    // Check current theme
    const isDarkMode = () => !document.body.classList.contains('theme-light');

    // Initialize
    initVanta(isDarkMode());

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                initVanta(isDarkMode());
            }
        });
    });

    observer.observe(document.body, {
        attributes: true
    });
});
