import React, { useEffect, useRef } from 'react';

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes in the network
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7 + height * 0.15,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.52;

      // 1. Draw Subtle Light Rays from Center Core
      const rayCount = 12;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i * Math.PI * 2) / rayCount + time * 0.08;
        const rayLength = Math.min(width, height) * 0.85;
        const grad = ctx.createRadialGradient(
          centerX,
          centerY,
          50,
          centerX + Math.cos(angle) * rayLength,
          centerY + Math.sin(angle) * rayLength,
          rayLength
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.008)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, rayLength, angle - 0.06, angle + 0.06);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // 2. Draw 3D-like Perspective Terrain / Flowing Digital Wave Lines
      const cols = 36;
      const rows = 20;
      const horizon = height * 0.36;
      const bottom = height * 0.98;

      ctx.save();
      ctx.lineWidth = 1;

      // Longitudinal lines
      for (let c = 0; c <= cols; c++) {
        const normCol = (c - cols / 2) / (cols / 2);
        const colSpread = Math.pow(Math.abs(normCol), 1.2) * Math.sign(normCol);

        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const tRow = r / rows;
          const y = horizon + tRow * (bottom - horizon);
          const spreadFactor = 0.25 + tRow * 1.35;
          const xOffset = ((mouseX - centerX) / width) * 40 * tRow;

          // Wave elevation
          const wave =
            Math.sin(c * 0.4 + time * 1.5 + r * 0.3) * 12 * tRow +
            Math.cos(r * 0.4 - time * 0.8) * 8 * tRow;

          const x = centerX + colSpread * (width * 0.52) * spreadFactor + xOffset;
          const curY = y + wave;

          if (r === 0) {
            ctx.moveTo(x, curY);
          } else {
            ctx.lineTo(x, curY);
          }
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + (1 - Math.abs(normCol)) * 0.07})`;
        ctx.stroke();
      }

      // Latitudinal wave rows
      for (let r = 0; r <= rows; r++) {
        const tRow = r / rows;
        const y = horizon + tRow * (bottom - horizon);
        const spreadFactor = 0.25 + tRow * 1.35;
        const xOffset = ((mouseX - centerX) / width) * 40 * tRow;

        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const normCol = (c - cols / 2) / (cols / 2);
          const colSpread = Math.pow(Math.abs(normCol), 1.2) * Math.sign(normCol);
          const wave =
            Math.sin(c * 0.4 + time * 1.5 + r * 0.3) * 12 * tRow +
            Math.cos(r * 0.4 - time * 0.8) * 8 * tRow;

          const x = centerX + colSpread * (width * 0.52) * spreadFactor + xOffset;
          const curY = y + wave;

          if (c === 0) {
            ctx.moveTo(x, curY);
          } else {
            ctx.lineTo(x, curY);
          }
        }
        const alpha = Math.min(0.22, 0.04 + tRow * 0.16);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.stroke();
      }
      ctx.restore();

      // 3. Floating Network Particle Nodes & Interconnects
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < height * 0.2 || p.y > height * 0.85) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.6})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 90) * 0.08})`;
            ctx.stroke();
          }
        }
      }

      // 4. Central Glowing Verification Core
      const coreRadius = Math.min(width, height) * 0.14;
      const pulse = Math.sin(time * 2) * 4;

      // Outer Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        coreRadius * 0.4,
        centerX,
        centerY,
        coreRadius * 2.2
      );
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
      glowGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.07)');
      glowGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.015)');
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Rotating Concentric Security Rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1 (Outer segmented)
      ctx.rotate(time * 0.3);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 14]);
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius + 22 + pulse * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 2 (Middle fine counter-rotating)
      ctx.rotate(-time * 0.55);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([30, 20, 10, 20]);
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius + 8, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 3 (Inner crisp circle)
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Solid glass center backing
      const innerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRadius);
      innerGrad.addColorStop(0, 'rgba(15, 15, 18, 0.95)');
      innerGrad.addColorStop(0.85, 'rgba(8, 8, 10, 0.88)');
      innerGrad.addColorStop(1, 'rgba(255, 255, 255, 0.12)');
      ctx.fillStyle = innerGrad;
      ctx.fill();

      // Center Verification Glyph (✓ VERIFY)
      ctx.restore();

      // Draw Checkmark and Text
      ctx.save();
      ctx.translate(centerX, centerY);

      // Neon checkmark
      ctx.beginPath();
      const checkScale = coreRadius * 0.36;
      ctx.moveTo(-checkScale * 0.6, 0);
      ctx.lineTo(-checkScale * 0.1, checkScale * 0.5);
      ctx.lineTo(checkScale * 0.7, -checkScale * 0.4);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Small subtitle under the checkmark
      ctx.font = '600 10px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '3px';
      ctx.fillText('VERIFY', 0, checkScale * 1.05);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] md:h-[580px] overflow-hidden select-none pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Top and bottom fade masks for seamless cinematic blending */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#000000] via-[#000000]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent pointer-events-none" />
    </div>
  );
};
