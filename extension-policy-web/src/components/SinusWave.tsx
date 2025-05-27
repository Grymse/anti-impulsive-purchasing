import { useEffect, useRef } from 'react';

interface SinusWaveProps {
  width?: number;
  height?: number;
  frequency?: number;
  amplitude?: number;
  speed?: number;
  colorSpeed?: number;
  withFrame?: boolean;
}

export default function SinusWave({
  width = 300,
  height = 100,
  frequency = 0.02,
  amplitude = 30,
  speed = 0.05,
  colorSpeed = 0.01,
  withFrame = true
}: SinusWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<{
    offset: number;
    colorOffset: number;
    animationId: number | null;
  }>({ offset: 0, colorOffset: 0, animationId: null });
  
  // RGB color cycling function
  const getRainbowColor = (phase: number) => {
    const r = Math.sin(phase) * 127 + 128;
    const g = Math.sin(phase + 2 * Math.PI / 3) * 127 + 128;
    const b = Math.sin(phase + 4 * Math.PI / 3) * 127 + 128;
    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize animation state
    if (animationRef.current.animationId) {
      cancelAnimationFrame(animationRef.current.animationId);
    }
    
    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw the sine wave as a continuous path
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.moveTo(0, height / 2);
      
      // Draw the continuous curve with animation
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin((x * frequency) + animationRef.current.offset) * amplitude;
        ctx.lineTo(x, y);
      }
      
      // Create a gradient for the path
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      const numStops = 8;
      for (let i = 0; i <= numStops; i++) {
        const phase = animationRef.current.colorOffset + (i / numStops) * 2;
        gradient.addColorStop(i / numStops, getRainbowColor(phase));
      }
      
      ctx.strokeStyle = gradient;
      ctx.stroke();
      
      // Update the offsets for animation
      animationRef.current.offset += speed;
      animationRef.current.colorOffset += colorSpeed;
      
      // Continue the animation loop
      animationRef.current.animationId = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animationRef.current.animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current.animationId) {
        cancelAnimationFrame(animationRef.current.animationId);
      }
    };
  }, [width, height, frequency, amplitude, speed, colorSpeed]);
  
  return (
    <div className={`relative mx-auto my-4 ${withFrame ? 'p-4' : ''}`}>
      {withFrame && (
        <div className="absolute inset-0 rounded-lg border-2 border-primary/30 bg-background/50 backdrop-blur-sm shadow-md"></div>
      )}
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
        className={`relative z-10 ${withFrame ? 'p-2' : ''}`}
      />
    </div>
  );
}