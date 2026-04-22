document.addEventListener('DOMContentLoaded', () => {
    // Clock and Date Logic
    const updateTime = () => {
        const now = new Date();
        const clockElement = document.getElementById('clock');
        const dateElement = document.getElementById('date');

        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        clockElement.textContent = now.toLocaleTimeString('en-GB', timeOptions);

        const dateOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        };
        dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    };

    setInterval(updateTime, 1000);
    updateTime();

    // Departure Data Logic
    const destinations = [
        { name: 'Tokyo-Narita', code: 'NRT' },
        { name: 'London Heathrow', code: 'LHR' },
        { name: 'New York JFK', code: 'JFK' },
        { name: 'Paris CDG', code: 'CDG' },
        { name: 'Singapore Changi', code: 'SIN' },
        { name: 'Dubai Intl', code: 'DXB' },
        { name: 'Berlin-Brandenburg', code: 'BER' },
        { name: 'Sydney Kingsford', code: 'SYD' },
        { name: 'Hong Kong Intl', code: 'HKG' },
        { name: 'Seoul Incheon', code: 'ICN' }
    ];

    const statuses = [
        { text: 'ON TIME', class: 'status-on-time' },
        { text: 'DELAYED', class: 'status-delayed' },
        { text: 'BOARDING', class: 'status-boarding' },
        { text: 'CANCELLED', class: 'status-cancelled' }
    ];

    const generateDepartures = () => {
        const departures = [];
        const now = new Date();

        for (let i = 0; i < 7; i++) {
            const departureTime = new Date(now.getTime() + (i * 20 + Math.random() * 10) * 60000);
            const destination = destinations[Math.floor(Math.random() * destinations.length)];
            const status = i === 0 ? statuses[2] : (Math.random() > 0.8 ? statuses[1] : statuses[0]);

            departures.push({
                time: departureTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                flight: `JA${Math.floor(100 + Math.random() * 899)}`,
                destination: destination.name,
                gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 5))}${Math.floor(Math.random() * 20) + 1}`,
                status: status.text,
                statusClass: status.class
            });
        }
        return departures;
    };

    const renderBoard = () => {
        const rowsContainer = document.getElementById('departure-rows');
        const departures = generateDepartures();

        rowsContainer.innerHTML = '';
        departures.forEach((dep, index) => {
            const row = document.createElement('div');
            row.className = 'row';
            row.style.animationDelay = `${index * 0.1}s`;
            row.innerHTML = `
                <div class="col time">${dep.time}</div>
                <div class="col flight">${dep.flight}</div>
                <div class="col destination">${dep.destination}</div>
                <div class="col gate">${dep.gate}</div>
                <div class="col status ${dep.statusClass}">${dep.status}</div>
            `;
            rowsContainer.appendChild(row);
        });
    };

    renderBoard();
    setInterval(renderBoard, 30000); // Refresh board every 30 seconds

    // Simulation for Capacity and Weather
    let capacity = 64;
    const updateStats = () => {
        // Update Capacity
        const capChange = (Math.random() - 0.5) * 4;
        capacity = Math.min(Math.max(capacity + capChange, 40), 95);
        const capacityFill = document.querySelector('.capacity-bar .fill');
        const capacityLabel = document.querySelector('.occupancy-card .label');
        if (capacityFill) capacityFill.style.width = `${capacity}%`;
        if (capacityLabel) capacityLabel.textContent = `${Math.round(capacity)}% OCCUPIED`;

        // Update Weather
        if (Math.random() > 0.7) {
            const temps = [19, 20, 21, 22, 23, 24];
            const newTemp = temps[Math.floor(Math.random() * temps.length)];
            const tempEl = document.querySelector('.weather-mini .temp');
            if (tempEl) tempEl.textContent = `${newTemp}°C`;
        }
    };

    setInterval(updateStats, 5000);
});
