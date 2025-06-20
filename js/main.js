// script.js

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 30; // Adjust for more/fewer "blobs"
const maxRadius = 80;
const minRadius = 30;
const speed = 0.5;

// Function to resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-initialize particles to fit new size if needed, or adjust positions
    if (particles.length === 0) { // Only on initial load
        initParticles();
    }
}

// Particle Class (simplified)
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.vy *= -1;
        }
    }
}

function initParticles() {
    particles = []; // Clear existing particles
    for (let i = 0; i < numParticles; i++) {
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        // Subtle white/grey with transparency for overlapping effect
        const alpha = 0.02 + Math.random() * 0.03; // Low alpha for blending
        particles.push(new Particle(x, y, radius, `rgba(255, 255, 255, ${alpha})`));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // This makes the trails. Don't clear all, just apply a semi-transparent overlay
    ctx.fillStyle = 'rgba(26, 26, 26, 0.1)'; // Background color with some transparency
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply a blur filter if desired (performance heavy on many browsers)
    // ctx.filter = 'blur(10px)'; // This affects the whole canvas context

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Reset filter if used
    // ctx.filter = 'none';
}

// Initial setup
resizeCanvas(); // Set canvas size and initialize particles
animate(); // Start animation