import React, { useEffect, useRef, useCallback } from 'react';
import Particle from './Particle';
import { colorList } from '../data/colorList';

const WeatherBackground = React.memo(({ weather }) => {

  const selectedColors = colorList[weather.main] || colorList.default;
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
  }, []);

  const frameRef= useRef(-1);
  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = new Array(5);
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((item) => {
        item.animate(ctx, canvas.width, canvas.height);
      });
      frameRef.current = requestAnimationFrame(animate);
    }
  
    createParticle(ctx, canvas.width, canvas.height, particles, selectedColors);
    frameRef.current = requestAnimationFrame(animate);
  
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(frameRef.current);
    };
  }, [createParticle, pixelRatio, selectedColors]);
  
  useEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frameRef.current);
    }
  }, [loop]);
  
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
});
export default WeatherBackground;