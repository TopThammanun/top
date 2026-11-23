import { particleAlpha, type Field, type Particle, type Tone } from "@/lib/atmosphere";
import type { Size } from "@/lib/dot-field";

export type Tones = Record<Tone, string>;

const FADE_IN_S = 0.8;
const HALO_SCALE = 3.6;
const HALO_ALPHA = 0.2;
const STREAK_WIDTH = 1;
const FLAKE_SPIN = 1.6;
const FLAKE_ASPECT = 0.6;

export function readTones(el: Element): Tones {
  const style = getComputedStyle(el);
  return {
    ink: style.getPropertyValue("--mote").trim(),
    accent: style.getPropertyValue("--accent-fill").trim(),
    violet: style.getPropertyValue("--violet").trim(),
  };
}

function fillCircle(ctx: CanvasRenderingContext2D, particle: Particle, radius: number): void {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void {
  const { x, y, size } = particle;
  ctx.globalAlpha = alpha;
  switch (particle.shape) {
    case "streak": {
      const speed = Math.hypot(particle.vx, particle.vy) || 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - (particle.vx / speed) * size, y - (particle.vy / speed) * size);
      ctx.stroke();
      return;
    }
    case "flake":
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(particle.phase + particle.age * FLAKE_SPIN);
      ctx.fillRect(-size, -size * FLAKE_ASPECT, size * 2, size * 2 * FLAKE_ASPECT);
      ctx.restore();
      return;
    case "glow":
      ctx.globalAlpha = alpha * HALO_ALPHA;
      fillCircle(ctx, particle, size * HALO_SCALE);
      ctx.globalAlpha = alpha;
      fillCircle(ctx, particle, size);
      return;
    case "dot":
      fillCircle(ctx, particle, size);
  }
}

export function drawField(ctx: CanvasRenderingContext2D, field: Field, tones: Tones, size: Size): void {
  const fade = Math.min(1, field.age / FADE_IN_S);
  ctx.clearRect(0, 0, size.width, size.height);
  ctx.lineWidth = STREAK_WIDTH;
  ctx.lineCap = "round";
  for (const particle of field.particles) {
    ctx.fillStyle = tones[particle.tone];
    ctx.strokeStyle = tones[particle.tone];
    drawParticle(ctx, particle, particleAlpha(particle) * fade);
  }
  ctx.globalAlpha = 1;
}
