document.addEventListener('DOMContentLoaded', () => {
    // Clock Functionality
    const updateClock = () => {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        timeElement.textContent = `${hours}:${minutes}:${seconds}`;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    };

    setInterval(updateClock, 1000);
    updateClock();

    // Carousel Functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const progressBar = document.getElementById('hero-progress');
    let currentSlide = 0;
    const slideDuration = 8000; // 8 seconds per slide

    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        resetProgressBar();
    };

    const resetProgressBar = () => {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = `width ${slideDuration}ms linear`;
            progressBar.style.width = '100%';
        }, 50);
    };

    setInterval(nextSlide, slideDuration);
    resetProgressBar();

    // KPI & Metrics Animation (Simulated Updates)
    const kpiValues = document.querySelectorAll('.kpi-value');
    const chartBars = document.querySelectorAll('.chart-bar');

    const updateMetrics = () => {
        // Update Visitor Traffic
        const visitorKpi = kpiValues[1];
        let currentVisitors = parseInt(visitorKpi.textContent.replace(',', ''));
        const change = Math.floor(Math.random() * 5) + 1;
        currentVisitors += change;
        visitorKpi.textContent = currentVisitors.toLocaleString();

        // Update Network Status slightly
        const networkKpi = kpiValues[0];
        if (Math.random() > 0.9) {
            networkKpi.textContent = (99.8 + Math.random() * 0.19).toFixed(1) + '%';
        }

        // Update Chart Bars
        chartBars.forEach(bar => {
            const newHeight = Math.floor(Math.random() * 60) + 30; // 30% to 90%
            bar.style.height = `${newHeight}%`;
        });
    };

    setInterval(updateMetrics, 5000);

    // Weather Simulation
    const conditions = ['Sunny', 'Partly Cloudy', 'Clear Skies', 'Light Breeze'];
    const weatherIconElement = document.getElementById('weather-icon');
    const tempElement = document.querySelector('.temp');
    const conditionElement = document.querySelector('.condition');

    const updateWeather = () => {
        const randomTemp = Math.floor(Math.random() * 5) + 70; // 70-75
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

        tempElement.textContent = `${randomTemp}°F`;
        conditionElement.textContent = randomCondition;

        // Update icon based on condition (simplified)
        if (randomCondition.includes('Cloudy')) {
            weatherIconElement.setAttribute('data-lucide', 'cloud-sun');
        } else {
            weatherIconElement.setAttribute('data-lucide', 'sun');
        }
        lucide.createIcons();
    };

    setInterval(updateWeather, 300000); // Every 5 minutes

    // Add a bit of mouse-parallax effect for the background (optional but cool)
    // Non-interactive app, so we'll just do a subtle auto-float
    const bgImage = document.querySelector('.bg-image');
    let angle = 0;
    const animateBg = () => {
        angle += 0.005;
        const x = Math.sin(angle) * 20;
        const y = Math.cos(angle) * 20;
        bgImage.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        requestAnimationFrame(animateBg);
    };
    animateBg();
});
