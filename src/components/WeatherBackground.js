import React, { useEffect, useRef } from 'react';

const WeatherBackground = ({ weather }) => {
  const PI2 = Math.PI * 2;

  class Particle {
    constructor(x, y, radius, rgb) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.rgb = rgb;

      this.vx = Math.random() * 5;
      this.vy = Math.random() * 5;

      this.sinValue = Math.random();
    }

    animate(ctx, stageWidth, stageHeight) {
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
      ctx.fillStyle = g
      ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
      ctx.fill();
    }
  }

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
      let colors = [];

      switch (weather.main) {
        case 'Clear':
          colors = [
            { hex: '#60c3c9' },
            { hex: '#fdb813' },
            { hex: '#f27022' },
            { hex: '#e4f6f8' },
            { hex: '#01cafe' }
          ];
          break;
        case 'Clouds':
          colors = [
            { hex: '#d9e9f5' },
            { hex: '#b9d6f0' },
            { hex: '#2698d8' },
            { hex: '#e0eef9' },
            { hex: '#8bbbe5' }
          ];
          break;
        case 'Drizzle':
          colors = [
            { hex: '#759bc8' },
            { hex: '#adc3d1' },
            { hex: '#aeaeae' },
            { hex: '#949494' },
            { hex: '#8cb4cc' }
          ];
          break;
        case 'Rain':
          colors = [
            { hex: '#36244c' },
            { hex: '#5e6c89' },
            { hex: '#34909f' },
            { hex: '#a9c6c2' },
            { hex: '#87a1b2' }
          ];
          break;
        case 'Thunderstorm':
          colors = [
            { hex: '#4b4c6a' },
            { hex: '#6c6b8d' },
            { hex: '#343855' },
            { hex: '#717171' },
            { hex: '#5d6d9c' }
          ];
          break;
        case 'Snow':
          colors = [
            { hex: '#d4e4fc' },
            { hex: '#c6f0ff' },
            { hex: '#e4ecf4' },
            { hex: '#d2e3ff' },
            { hex: '#eaeaea' }
          ];
          break;
        case 'Mist':
          colors = [
            { hex: '#dfe7ea' },
            { hex: '#bfd2d9' },
            { hex: '#a4c0c3' },
            { hex: '#96a7ae' },
            { hex: '#7c959c' }
          ];
          break;
        default:
          colors = [
            { hex: '#2D4AE3' },
            { hex: '#FAFF59' },
            { hex: '#2D4AE3' },
            { hex: '#FAFF59' },
            { hex: '#FF68F8' }
          ];
      }

      for (let i = 0; i < 10; i++) {
        const randomColorIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomColorIndex];
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
