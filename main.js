const canvas = document.getElementById("realtimeChart");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

let data = [];
const maxPoints = 100;

function drawGrid() {
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;

    for (let i = 0; i < width; i += 80) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }

    for (let i = 0; i < height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }
}

function drawChart() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();

    ctx.strokeStyle = "#00ff99";
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((point, index) => {
        const x = (width / maxPoints) * index;
        const y = height - (point / 100) * height;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

function pushDataPoint(newValue) {
    if (data.length >= maxPoints) {
        data.shift();
    }
    data.push(newValue);
    drawChart();
}

// Simulate data every 100ms
setInterval(() => {
    const simulatedValue = Math.random() * 100;
    pushDataPoint(simulatedValue);
}, 100);
