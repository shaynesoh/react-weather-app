import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import Particle from './Particle';

const WeatherBackground = React.memo(({ weather }) => {

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
    default: [
      { hex: '#ffffff' },
      { hex: '#ffffff' },
      { hex: '#ffffff' },
      { hex: '#ffffff' },
      { hex: '#ffffff' }
    ]
  };

  const selectedColors = useMemo(() => colors[weather.main] || colors.default, [weather.main]);
  const canvasRef = useRef(null);
  const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

  const createParticle = useCallback((ctx, canvasWidth, canvasHeight, particles, selectedColors) => {
    for (let i = 0; i < 5; i++) {
      const randomColorIndex = Math.floor(Math.random() * selectedColors.length);
      const randomColor = selectedColors[randomColorIndex];
      const item = new Particle(
        Math.random() * canvasWidth - canvasWidth / 2,
        Math.random() * canvasHeight - canvasHeight / 2,
        Math.random() * (900) + 400,
        randomColor
      );
      particles[i] = item;
    }
  }, [Particle]);  

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = new Array(5);

    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;

    canvas.width = canvasWidth * pixelRatio;
    canvas.height = canvasHeight * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);

    ctx.translate(canvasWidth / 2, canvasHeight / 2);

    function animate() {
      ctx.clearRect(-canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);
    
      particles.forEach((item) => {
        item.animate(ctx, canvasWidth, canvasHeight);
      });
    
      requestAnimationFrame(animate);
    }

    createParticle(ctx, canvasWidth, canvasHeight, particles, selectedColors);
    requestAnimationFrame(animate);
  }, [selectedColors, createParticle]);

  return <canvas key={weather.id} ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
});

export default WeatherBackground;