const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.static('public'));
app.use(express.json());

// Helper to read count
function getCount() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data).count || 0;
        }
    } catch (err) {
        console.error("Error reading data file:", err);
    }
    return 0;
}

// Helper to save count
function saveCount(count) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ count }), 'utf8');
    } catch (err) {
        console.error("Error writing data file:", err);
    }
}

app.get('/api/count', (req, res) => {
    res.json({ count: getCount() });
});

app.post('/api/increment', (req, res) => {
    let count = getCount();
    count++;
    saveCount(count);
    res.json({ count });
});

app.post('/api/reset', (req, res) => {
    saveCount(0);
    res.json({ count: 0 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
