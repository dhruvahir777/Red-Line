import React, { useEffect, useRef, useState } from 'react';
import { X, Trophy, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface FunFlyProps {
  onExit: () => void;
}

// --- ASSETS ---
// Using reliable, royalty-free sounds
const BGM_URL = "https://cdn.pixabay.com/audio/2021/11/24/audio_87540a3826.mp3"; // Cyberpunk/Synthwave loop
const CRASH_SFX_URL = "https://cdn.pixabay.com/audio/2022/03/10/audio_c230d77d81.mp3"; // Funny cartoon bonk/crash

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export const FunFly: React.FC<FunFlyProps> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game States
  const [gameState, setGameState] = useState<'START' | 'COUNTDOWN' | 'PLAYING' | 'GAME_OVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [countDown, setCountDown] = useState(3);
  const [isMuted, setIsMuted] = useState(false);

  // Audio Refs
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  // Physics Constants (Jetpack Mechanics)
  const GRAVITY = 0.6;
  const THRUST = -1.2; // Upward force while holding
  const MAX_VELOCITY = 10;
  const PIPE_SPEED = 5;
  const PIPE_SPAWN_RATE = 90; 
  const PIPE_GAP = 220; 

  // Mutable Game State (Refs for performance)
  const birdRef = useRef({ y: 300, velocity: 0, x: 100, size: 30, rotation: 0 });
  const pipesRef = useRef<{ x: number; topHeight: number; passed: boolean }[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const isPressingRef = useRef(false); // Tracks touch/mouse hold

  // --- AUDIO SETUP ---
  useEffect(() => {
    bgmRef.current = new Audio(BGM_URL);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.4;

    sfxRef.current = new Audio(CRASH_SFX_URL);
    sfxRef.current.volume = 0.8;

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.muted = isMuted;
      if (gameState === 'PLAYING' && !isMuted) {
        bgmRef.current.play().catch(() => {});
      } else {
        bgmRef.current.pause();
      }
    }
  }, [gameState, isMuted]);

  const resetGame = () => {
    const canvas = canvasRef.current;
    const h = canvas ? canvas.height : window.innerHeight;
    
    birdRef.current = { y: h / 2, velocity: 0, x: 100, size: 30, rotation: 0 };
    pipesRef.current = [];
    particlesRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    frameRef.current = 0;
    isPressingRef.current = false;
  };

  const startCountdown = () => {
    resetGame();
    setGameState('COUNTDOWN');
    setCountDown(3);
    
    let count = 3;
    const timer = setInterval(() => {
      count--;
      setCountDown(count);
      if (count <= 0) {
        clearInterval(timer);
        setGameState('PLAYING');
      }
    }, 1000);
  };

  // --- INPUT HANDLERS (Jetpack Logic) ---
  const handleStartPress = () => { isPressingRef.current = true; };
  const handleEndPress = () => { isPressingRef.current = false; };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') isPressingRef.current = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') isPressingRef.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Removed global touch preventDefault as it breaks UI
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // --- GAME LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for speed
    if (!ctx) return;

    let animationFrameId: number;

    const loop = () => {
      // Handle Canvas Resize
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      }

      // Clear Screen
      ctx.fillStyle = '#230F12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx, canvas);

      if (gameState === 'START' || gameState === 'COUNTDOWN') {
        // Floating idle animation
        const hoverY = canvas.height / 2 + Math.sin(Date.now() / 300) * 15;
        drawBird(ctx, 100, hoverY, 0, false);
        
        if (gameState === 'COUNTDOWN') {
            drawOverlay(ctx, canvas, countDown.toString(), '120px');
        }
      } 
      else if (gameState === 'PLAYING') {
        frameRef.current++;

        // --- PHYSICS ---
        // Apply Thrust or Gravity
        if (isPressingRef.current) {
            birdRef.current.velocity += THRUST;
            // Spawn Particles
            if (frameRef.current % 3 === 0) {
                particlesRef.current.push({
                    x: birdRef.current.x - 15,
                    y: birdRef.current.y + 10,
                    vx: -Math.random() * 2 - 2,
                    vy: Math.random() * 2 - 1,
                    life: 1.0,
                    color: `rgba(255, ${76 + Math.random() * 100}, 41,`
                });
            }
        } else {
            birdRef.current.velocity += GRAVITY;
        }

        // Cap terminal velocity
        birdRef.current.velocity = Math.max(Math.min(birdRef.current.velocity, MAX_VELOCITY), -MAX_VELOCITY);
        
        birdRef.current.y += birdRef.current.velocity;
        
        // Rotation based on velocity
        const targetRotation = birdRef.current.velocity * 0.05;
        birdRef.current.rotation = targetRotation;

        // --- PIPES ---
        if (frameRef.current % PIPE_SPAWN_RATE === 0) {
          const minPipeHeight = 100;
          const maxPipeHeight = canvas.height - PIPE_GAP - minPipeHeight;
          const randomHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight);
          pipesRef.current.push({
            x: canvas.width,
            topHeight: randomHeight,
            passed: false
          });
        }

        pipesRef.current.forEach(pipe => pipe.x -= PIPE_SPEED);
        if (pipesRef.current.length > 0 && pipesRef.current[0].x < -80) pipesRef.current.shift();

        // --- COLLISION ---
        const hit = checkCollision(canvas.height);
        if (hit) {
            if (!isMuted && sfxRef.current) sfxRef.current.play().catch(()=>{});
            setGameState('GAME_OVER');
            if (scoreRef.current > highScore) setHighScore(scoreRef.current);
        }

        // --- SCORE ---
        pipesRef.current.forEach(pipe => {
            if (!pipe.passed && birdRef.current.x > pipe.x + 60) {
                pipe.passed = true;
                scoreRef.current += 1;
                setScore(scoreRef.current);
            }
        });

        // --- DRAWING ---
        drawPipes(ctx, pipesRef.current, canvas.height);
        drawParticles(ctx);
        drawBird(ctx, birdRef.current.x, birdRef.current.y, birdRef.current.rotation, isPressingRef.current);
        
        // Draw Score HUD
        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(scoreRef.current.toString(), canvas.width / 2, 100);
      }
      else if (gameState === 'GAME_OVER') {
          drawPipes(ctx, pipesRef.current, canvas.height);
          drawBird(ctx, birdRef.current.x, birdRef.current.y, 0.5, false); // Dead bird rotation
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, countDown]);

  // --- LOGIC HELPERS ---
  const checkCollision = (height: number) => {
      const bird = birdRef.current;
      // Floor/Ceiling
      if (bird.y + bird.size/2 >= height || bird.y - bird.size/2 <= 0) return true;

      // Pipes
      const hitBoxPadding = 8; // Forgive pixels
      for (let pipe of pipesRef.current) {
          if (
              bird.x + bird.size/2 - hitBoxPadding > pipe.x && 
              bird.x - bird.size/2 + hitBoxPadding < pipe.x + 60
          ) {
              if (
                  bird.y - bird.size/2 + hitBoxPadding < pipe.topHeight || 
                  bird.y + bird.size/2 - hitBoxPadding > pipe.topHeight + PIPE_GAP
              ) {
                  return true;
              }
          }
      }
      return false;
  };

  // --- DRAWING HELPERS ---
  const drawOverlay = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, text: string, size: string) => {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0,0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.font = `900 ${size} Outfit`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.shadowColor = '#FF4C29';
      ctx.shadowBlur = 30;
      ctx.fillText(text, 0, 0);
      ctx.restore();
  };

  const drawBird = (ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number, isThrusting: boolean) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    // Glow Effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#FF4C29';
    
    // Main Body (Futuristic Pod)
    ctx.fillStyle = '#F2EBE9';
    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cockpit
    ctx.fillStyle = '#00E5FF';
    ctx.beginPath();
    ctx.ellipse(5, -2, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Thruster
    if (isThrusting) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFA500';
        ctx.fillStyle = '#FF4C29';
        ctx.beginPath();
        ctx.moveTo(-15, -5);
        ctx.lineTo(-30 + Math.random() * 5, 0); // Flicker
        ctx.lineTo(-15, 5);
        ctx.fill();
    }
    
    ctx.restore();
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.05;
          
          if (p.life <= 0) {
              particlesRef.current.splice(i, 1);
              continue;
          }

          ctx.globalAlpha = p.life;
          ctx.fillStyle = `${p.color} ${p.life})`;
          ctx.fillRect(p.x, p.y, 4, 4);
          ctx.globalAlpha = 1.0;
      }
  };

  const drawPipes = (ctx: CanvasRenderingContext2D, pipes: any[], canvasHeight: number) => {
    const pipeW = 60;
    pipes.forEach(pipe => {
        // Styles
        const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeW, 0);
        gradient.addColorStop(0, '#3A1A20');
        gradient.addColorStop(0.5, '#5C2E36');
        gradient.addColorStop(1, '#3A1A20');
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = '#FF4C29'; 
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 76, 41, 0.4)';

        // Top Pipe
        ctx.fillRect(pipe.x, 0, pipeW, pipe.topHeight);
        ctx.strokeRect(pipe.x, 0, pipeW, pipe.topHeight);
        
        // Bottom Pipe
        const bottomY = pipe.topHeight + PIPE_GAP;
        const bottomH = canvasHeight - bottomY;
        ctx.fillRect(pipe.x, bottomY, pipeW, bottomH);
        ctx.strokeRect(pipe.x, bottomY, pipeW, bottomH);

        // Neon connectors
        ctx.fillStyle = '#FF4C29';
        ctx.fillRect(pipe.x - 2, pipe.topHeight - 10, pipeW + 4, 10);
        ctx.fillRect(pipe.x - 2, bottomY, pipeW + 4, 10);
    });
  };

  const drawBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Parallax Stars
      const time = Date.now() * 0.001;
      ctx.fillStyle = 'white';
      
      // 3 Layers of stars
      [0.5, 1, 2].forEach((speed, layerIdx) => {
          for(let i=0; i<20; i++) {
              const x = (i * 100 + time * 50 * speed) % canvas.width;
              const y = (i * 67 + layerIdx * 100) % canvas.height;
              ctx.globalAlpha = 0.2 * speed;
              ctx.fillRect(x, y, 2 * speed, 2 * speed);
          }
      });
      ctx.globalAlpha = 1.0;

      // Grid Floor Illusion
      ctx.strokeStyle = 'rgba(255, 76, 41, 0.1)';
      ctx.beginPath();
      const gridSize = 50;
      const offset = (Date.now() * 0.1) % gridSize;
      
      for(let i=0; i<canvas.width + gridSize; i+=gridSize) {
          ctx.moveTo(i - offset, 0);
          ctx.lineTo(i - offset - 100, canvas.height);
      }
      ctx.stroke();
  };

  return (
    <div 
      className="fixed inset-0 z-[200] bg-[#230F12] flex flex-col select-none touch-none"
      onMouseDown={handleStartPress}
      onMouseUp={handleEndPress}
      onMouseLeave={handleEndPress}
      onTouchStart={handleStartPress}
      onTouchEnd={handleEndPress}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
         {/* Header */}
         <div className="flex justify-between items-start">
            <div className="flex flex-col">
                <div className="bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                    <span className="text-nexus-muted text-[10px] uppercase tracking-widest block">Score</span>
                    <span className="text-3xl font-bold text-white font-mono leading-none">{score}</span>
                </div>
            </div>
            <div className="flex gap-2 pointer-events-auto">
                 <button 
                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} 
                    onTouchStart={(e) => e.stopPropagation()}
                    className="p-3 rounded-full bg-black/20 text-white hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-md"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onExit(); }} 
                    onTouchStart={(e) => e.stopPropagation()}
                    className="p-3 rounded-full bg-black/20 text-white hover:bg-nexus-accent transition-colors border border-white/10 backdrop-blur-md"
                >
                    <X size={20} />
                </button>
            </div>
         </div>

         {/* Modals */}
         {(gameState === 'START' || gameState === 'GAME_OVER') && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                 <div className="pointer-events-auto bg-nexus-glass backdrop-blur-2xl border border-nexus-glassBorder p-8 rounded-[2rem] shadow-glass flex flex-col items-center max-w-sm w-full mx-6 animate-in fade-in zoom-in duration-300">
                     
                     {gameState === 'GAME_OVER' && (
                         <div className="mb-8 flex flex-col items-center w-full">
                             <span className="text-nexus-accent font-bold text-xl tracking-widest mb-4 animate-pulse">CRITICAL FAILURE</span>
                             
                             <div className="flex justify-around w-full mb-2">
                                 <div className="flex flex-col items-center">
                                     <span className="text-xs text-nexus-muted uppercase">Score</span>
                                     <span className="text-4xl font-bold text-white">{score}</span>
                                 </div>
                                 <div className="w-px h-12 bg-white/10"></div>
                                 <div className="flex flex-col items-center">
                                     <span className="text-xs text-nexus-muted uppercase">Best</span>
                                     <span className="text-4xl font-bold text-nexus-accent">{highScore}</span>
                                 </div>
                             </div>
                         </div>
                     )}

                     {gameState === 'START' && (
                         <div className="mb-10 text-center">
                             <h1 className="text-5xl font-black text-white mb-2 italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,76,41,0.5)]">
                                FUNFLY
                             </h1>
                             <div className="space-y-2 mt-4">
                                <p className="text-nexus-muted text-sm flex items-center justify-center gap-2">
                                    <span>🖱️</span> HOLD to Fly
                                </p>
                                <p className="text-nexus-muted text-sm flex items-center justify-center gap-2">
                                    <span>👆</span> RELEASE to Fall
                                </p>
                             </div>
                         </div>
                     )}

                     <button 
                        onClick={(e) => { e.stopPropagation(); startCountdown(); }}
                        onTouchStart={(e) => e.stopPropagation()}
                        className="w-full py-4 bg-gradient-to-r from-nexus-accent to-[#FF2E00] text-white font-bold rounded-xl shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                     >
                         {gameState === 'START' ? <Play size={24} fill="currentColor" /> : <RotateCcw size={24} />}
                         <span className="tracking-wider">{gameState === 'START' ? 'LAUNCH MISSION' : 'RETRY SYSTEM'}</span>
                     </button>
                 </div>
             </div>
         )}
      </div>
    </div>
  );
};