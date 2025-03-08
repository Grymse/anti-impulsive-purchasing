import { useEffect, useRef } from 'react';

type Props = {isActive: boolean};
export default function BackgroundWave({isActive}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Animation parameters
    let offset = 0;
    let colorOffset = 0;
    let animationId = 0;
    
    // RGB color cycling function with higher brightness for dark background
    const getRainbowColor = (phase: number, opacity = 0.6) => {
      // Higher brightness colors (200-255 range instead of 128-255)
      const r = Math.sin(phase) * 55 + 200;
      const g = Math.sin(phase + 2 * Math.PI / 3) * 55 + 200;
      const b = Math.sin(phase + 4 * Math.PI / 3) * 55 + 200;
      return `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${opacity})`;
    };
    
    function animate() {
      // We've already checked that ctx and canvas are not null above
      // TypeScript needs a non-null assertion operator to understand this
      // Clear the canvas with transparent background to keep original bg color
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      // Draw the sine waves - adjusted for better visibility on dark background
      drawSineWave(ctx!, canvas!.width, canvas!.height * 0.25, 60, 0.005, colorOffset, offset, 0.7);
      drawSineWave(ctx!, canvas!.width, canvas!.height * 0.5, 70, 0.003, colorOffset + 1, offset * 0.7, 0.7);
      drawSineWave(ctx!, canvas!.width, canvas!.height * 0.75, 50, 0.007, colorOffset + 2, offset * 1.3, 0.7);
      
      // Update animation values
      offset += 0.02;
      colorOffset += 0.01;
      
      animationId = requestAnimationFrame(animate);
    }
    
    function drawSineWave(
      ctx: CanvasRenderingContext2D, 
      width: number, 
      centerY: number, 
      amplitude: number,
      frequency: number,
      colorPhase: number,
      offset: number,
      opacity: number
    ) {
      // Create a gradient for this wave
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, getRainbowColor(colorPhase, opacity));
      gradient.addColorStop(0.25, getRainbowColor(colorPhase + 1, opacity));
      gradient.addColorStop(0.5, getRainbowColor(colorPhase + 2, opacity));
      gradient.addColorStop(0.75, getRainbowColor(colorPhase + 3, opacity));
      gradient.addColorStop(1, getRainbowColor(colorPhase + 4, opacity));
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 6; // Thicker lines for better visibility
      
      // Begin the path for the sine wave
      ctx.beginPath();
      
      // Draw the sine wave from left to right
      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * frequency + offset) * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      // Stroke the path to render the wave
      ctx.stroke();
    }
    
    // Start the animation
    animationId = requestAnimationFrame(animate);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);
  
  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: 'transparent' // Transparent background to preserve original bg color
      }}
    />
  );
}