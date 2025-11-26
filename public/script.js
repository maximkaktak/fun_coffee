const counterEl = document.getElementById('counter');
const btn = document.getElementById('drink-btn');
const cup = document.getElementById('coffee-cup');

// Fetch initial count
async function fetchCount() {
    try {
        const res = await fetch('/api/count');
        const data = await res.json();
        counterEl.textContent = data.count;
    } catch (err) {
        console.error("Failed to fetch count:", err);
    }
}

// Increment count
async function incrementCount() {
    try {
        const res = await fetch('/api/increment', { method: 'POST' });
        const data = await res.json();

        // Update number
        counterEl.textContent = data.count;

        // Play GIF
        cup.src = 'coffee.gif';

        // Reset to static after duration (5500ms)
        // Clear any existing timeout to prevent early resetting if clicked rapidly
        if (window.cupTimeout) clearTimeout(window.cupTimeout);

        window.cupTimeout = setTimeout(() => {
            cup.src = 'coffee_static.png';
        }, 5500);

    } catch (err) {
        console.error("Failed to increment:", err);
    }
}

btn.addEventListener('click', incrementCount);

// Initial load
fetchCount();

// Optional: Poll for updates every 5 seconds to keep in sync with others
setInterval(fetchCount, 5000);

const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', async () => {
    if (confirm('Вы уверены, что хотите сбросить счетчик? Это действие нельзя отменить.')) {
        try {
            const res = await fetch('/api/reset', { method: 'POST' });
            const data = await res.json();
            counterEl.textContent = data.count;
        } catch (err) {
            console.error("Failed to reset:", err);
        }
    }
});
