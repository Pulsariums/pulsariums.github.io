import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  // Track if we are on a mobile device to skip heavy effects
  const isMobileRef = useRef(false);

  useEffect(() => {
    // Determine if mobile based on width initially
    isMobileRef.current = window.innerWidth < 768;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    // Only listen to mouse move on non-touch devices to save resources
    if (!isMobileRef.current) {
        window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false helps performance if full opaque
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      isMobileRef.current = width < 768;
    };
    
    setSize();
    // Debounce resize slightly or just accept it. Standard resize is okay.
    window.addEventListener('resize', setSize);

    // Star properties
    const stars: { x: number; y: number; z: number; prevZ: number; baseAlpha: number }[] = [];
    
    // PERFORMANCE OPTIMIZATION: 
    // Desktop: 300, Tablet: 150, Mobile: 60
    // Drastically reducing objects on mobile is key to 60fps
    const numStars = width < 768 ? 60 : (width < 1024 ? 150 : 300);
    const speed = 2; 
    
    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: Math.random() * width,
        prevZ: Math.random() * width,
        baseAlpha: 0.1 + Math.random() * 0.5
      });
    }

    let animationId: number;

    const draw = () => {
      // Clear with black fill - faster than clearRect if we are redrawing full bg
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // OPTIMIZATION: Only draw the mouse gradient on Desktop.
      // Calculating a full-screen radial gradient every frame is very expensive on mobile GPUs.
      if (!isMobileRef.current) {
        const gradient = ctx.createRadialGradient(
            mouseRef.current.x, 
            mouseRef.current.y, 
            0, 
            mouseRef.current.x, 
            mouseRef.current.y, 
            600 
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw Stars
      // Batch setting styles to minimize state changes
      ctx.lineWidth = 1.5;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Move star closer
        star.z -= speed;

        // Reset if it passes screen
        if (star.z <= 0) {
          star.z = width;
          star.prevZ = width;
          star.x = (Math.random() - 0.5) * width;
          star.y = (Math.random() - 0.5) * height;
        }

        // Project 3D position to 2D
        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 128.0 / star.prevZ;
        const ppx = star.x * pk + cx;
        const ppy = star.y * pk + cy;

        // Only draw if within bounds
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          // Calculate brightness
          let alpha = (1 - star.z / width);
          
          // Spotlight calculation only on desktop
          if (!isMobileRef.current) {
             const dx = px - mouseRef.current.x;
             const dy = py - mouseRef.current.y;
             const dist = Math.sqrt(dx * dx + dy * dy);
             const spotlight = Math.max(0, 1 - dist / 500);
             alpha = Math.min(1, (alpha * star.baseAlpha) + (spotlight * 0.8 * alpha));
          } else {
             alpha = alpha * star.baseAlpha;
          }

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        star.prevZ = star.z;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default Background;