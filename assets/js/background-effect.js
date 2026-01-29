/**
 * background-effect.js
 * Initializes Vanta.NET 3D background globally.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Helper to check if Vanta is loaded
    const checkVanta = () => {
        if (window.VANTA && window.VANTA.NET) {
            initVantaEffect();
        } else {
            console.warn("Vanta.js not loaded, retrying...");
            setTimeout(checkVanta, 100);
        }
    };

    let vantaEffect = null;
    const bgElement = document.getElementById('vanta-bg');

    if (!bgElement) {
        console.error("Vanta BG element (#vanta-bg) not found!");
        return;
    }

    // DEBUG: Log execution
    console.log("Looking for Vanta.js...");

    const baseConfig = {
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00
    };

    const darkConfig = {
        ...baseConfig,
        color: 0x3b82f6,
        backgroundColor: 0x0f172a,
        points: 12.00,
        maxDistance: 22.00,
        spacing: 18.00
    };

    const lightConfig = {
        ...baseConfig,
        color: 0x2563eb,
        backgroundColor: 0xf8fafc,
        points: 10.00,
        maxDistance: 20.00,
        spacing: 16.00
    };

    const isDarkMode = () => !document.body.classList.contains('theme-light');

    function initVantaEffect() {
        if (vantaEffect) vantaEffect.destroy();

        try {
            console.log("Initializing Vanta.NET...", isDarkMode() ? "Dark Mode" : "Light Mode");
            vantaEffect = window.VANTA.NET({
                ...(isDarkMode() ? darkConfig : lightConfig)
            });
            console.log("Vanta Initialized Successfully!");
        } catch (error) {
            console.error("Vanta Init Error:", error);
        }
    }

    // Start checking
    checkVanta();

    // Theme Observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                initVantaEffect();
            }
        });
    });

    observer.observe(document.body, {
        attributes: true
    });
});
