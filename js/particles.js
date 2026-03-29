/* ============================================
   PARTICLE NETWORK ANIMATION
   ============================================
   Canvas-based interconnected dots that react
   to mouse movement. Rendered on #particle-canvas.
   ============================================ */

class ParticleNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.config = {
      particleCount: 80,
      maxDistance: 150,
      particleSize: { min: 1, max: 2.5 },
      speed: 0.3,
      colors: ["#00f0ff", "#3b82f6", "#8b5cf6", "#00ff88"],
      mouseRadius: 200,
    };
    this.init();
    this.addEventListeners();
    this.animate();
  }

  init() {
    this.resize();
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const colorIndex = Math.floor(Math.random() * this.config.colors.length);
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * this.config.speed,
      vy: (Math.random() - 0.5) * this.config.speed,
      size:
        Math.random() *
          (this.config.particleSize.max - this.config.particleSize.min) +
        this.config.particleSize.min,
      color: this.config.colors[colorIndex],
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    };
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addEventListeners() {
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener("mouseout", () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  drawParticle(p, time) {
    const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color;
    this.ctx.globalAlpha = p.opacity * pulse;
    this.ctx.fill();
    // Glow
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size * pulse * 3, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color;
    this.ctx.globalAlpha = p.opacity * 0.1 * pulse;
    this.ctx.fill();
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.config.maxDistance) {
          const opacity = (1 - dist / this.config.maxDistance) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = "#00f0ff";
          this.ctx.globalAlpha = opacity;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  updateParticles() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (this.mouse.x && this.mouse.y) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.config.mouseRadius) {
          const force =
            (this.config.mouseRadius - dist) / this.config.mouseRadius;
          p.vx += (dx / dist) * force * 0.02;
          p.vy += (dy / dist) * force * 0.02;
        }
      }
      p.vx *= 0.999;
      p.vy *= 0.999;
      if (p.x < -50) p.x = this.canvas.width + 50;
      if (p.x > this.canvas.width + 50) p.x = -50;
      if (p.y < -50) p.y = this.canvas.height + 50;
      if (p.y > this.canvas.height + 50) p.y = -50;
    });
  }

  animate() {
    const time = Date.now();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalAlpha = 1;
    this.updateParticles();
    this.drawConnections();
    this.particles.forEach((p) => this.drawParticle(p, time));
    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}
