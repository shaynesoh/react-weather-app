import React, { useEffect, useRef } from 'react';

const PI2 = Math.PI * 2;

function Particle(x, y, radius, rgb) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.rgb = rgb;

  this.vx = Math.random() * 5;
  this.vy = Math.random() * 5;

  this.sinValue = Math.random();
}

Particle.prototype.animate = function (ctx, stageWidth, stageHeight) {
  this.sinValue += 0.01;

  this.radius += Math.sin(this.sinValue);

  this.x += this.vx;
  this.y += this.vy;

  if (this.x < 0) {
    this.vx *= -1;
    this.x += 10;
  } else if (this.x > stageWidth) {
    this.vx *= -1;
    this.x -= 10;
  }

  if (this.y < 0) {
    this.vy *= -1;
    this.y += 10;
  } else if (this.y > stageHeight) {
    this.vy *= -1;
    this.y -= 10;
  }

  ctx.beginPath();
  const g = ctx.createRadialGradient(
    this.x,
    this.y,
    this.radius * 0.01,
    this.x,
    this.y,
    this.radius
  );
  g.addColorStop(0, `${this.rgb.hex}FF`);
  g.addColorStop(1, `${this.rgb.hex}00`);
  ctx.fillStyle = g;
  ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
  ctx.fill();
};

const WeatherBackground = ({ weather }) => {

  const canvasRef = useRef(null);
  const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    canvas.width = stageWidth * pixelRatio;
    canvas.height = stageHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    ctx.globalCompositeOperation = 'soft-light';

    createParticle();
    animate();

    function createParticle() {
      particles = [];
      const colors = {
        Clear: [
          { hex: '#60c3c9' },
          { hex: '#fdb813' },
          { hex: '#f27022' },
          { hex: '#e4f6f8' },
          { hex: '#01cafe' }
        ],
        Clouds: [
          { hex: '#a4e8fd' },
          { hex: '#ecf4fc' },
          { hex: '#e3e0eb' },
          { hex: '#c6c7db' },
          { hex: '#26c6f8' }
        ],
        Drizzle: [
          { hex: '#f4f4f4' },
          { hex: '#5c7c85' },
          { hex: '#acd1e4' },
          { hex: '#d5dade' },
          { hex: '#8cb4cc' }
        ],
        Rain: [
          { hex: '#457694' },
          { hex: '#5c759e' },
          { hex: '#96b9cd' },
          { hex: '#468f84' },
          { hex: '#a4bfac' }
        ],
        Thunderstorm: [
          { hex: '#4b4c6a' },
          { hex: '#6c6b8d' },
          { hex: '#343855' },
          { hex: '#717171' },
          { hex: '#5d6d9c' }
        ],
        Snow: [
          { hex: '#dfe8e7' },
          { hex: '#c3d6d4' },
          { hex: '#f0e6e4' },
          { hex: '#d2e3ff' },
          { hex: '#f4f4f4' }
        ],
        Mist: [
          { hex: '#dfe7ea' },
          { hex: '#bfd2d9' },
          { hex: '#a4c0c3' },
          { hex: '#96a7ae' },
          { hex: '#7c959c' }
        ],
        default: []
      };

      const selectedColors = colors[weather.main] || colors.default;

      for (let i = 0; i < 10; i++) {
        const randomColorIndex = Math.floor(Math.random() * selectedColors.length);
        const randomColor = selectedColors[randomColorIndex];
        const item = new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * (900) + 400,
          randomColor
        );
        particles.push(item);
      }

    }

    function animate() {
      window.requestAnimationFrame(animate);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const item = particles[i];
        item.animate(ctx, canvas.width, canvas.height);
      }
    }

  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default WeatherBackground;
