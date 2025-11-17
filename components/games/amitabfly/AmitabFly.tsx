import React, { useEffect, useRef, useState } from 'react';
import { X, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface AmitabFlyProps {
  onExit: () => void;
}

// --- ASSETS ---
const CHAR_URL = "https://res.cloudinary.com/du7i7bqna/image/upload/v1763367714/Adobe_Express_-_file_v5et7y.png";
const BGM_URL = "https://res.cloudinary.com/du7i7bqna/video/upload/v1763367474/retro-arcade-game-music-297305_nae9s4.mp3";
const GAME_OVER_SFX = "https://res.cloudinary.com/du7i7bqna/video/upload/v1763375766/mkb-aag_3BdJWFa4_vhbrf5.mp3";
const BG_IMAGE_URL = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop"; // Realistic City Skyline

export const AmitabFly: React.FC<AmitabFlyProps> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game States
  const [gameState, setGameState] = useState<'START' | 'COUNTDOWN' | 'PLAYING' | 'GAME_OVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [countDown, setCountDown] = useState(3);
  const [isMuted, setIsMuted] = useState(false);

  // Assets Refs
  const charImgRef = useRef<HTMLImageElement | null>(null);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  // Physics Constants
  const GRAVITY = 0.25;
  const JUMP = -6;
  const SPEED = 3;
  const SPAWN_RATE = 120;
  const PIPE_GAP = 200;

  // Mutable Game State
  const physicsRef = useRef({
    y: 300,
    velocity: 0,
    rotation: 0
  });
  const pipesRef = useRef<{ x: number; topHeight: number; passed: boolean }[]>([]);
  const frameRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const bgOffsetRef = useRef(0);

  // --- INITIALIZATION ---
  useEffect(() => {
    // Preload Images
    const charImg = new Image();
    charImg.src = CHAR_URL;
    charImgRef.current = charImg;

    const bgImg = new Image();
    bgImg.src = BG_IMAGE_URL;
    bgImgRef.current = bgImg;

    // Setup Audio
    bgmRef.current = new Audio(BGM_URL);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.5;

    sfxRef.current = new Audio(GAME_OVER_SFX);
    sfxRef.current.volume = 1.0;

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  // Audio Manager
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
    
    physicsRef.current = { y: h / 2, velocity: 0, rotation: 0 };
    pipesRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    frameRef.current = 0;
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

  // --- CONTROLS ---
  const handleJump = () => {
    if (gameState === 'PLAYING') {
      physicsRef.current.velocity = JUMP;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') handleJump();
    };
    window.addEventListener('keydown', handleKeyDown);
    const preventDefault = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('touchstart', preventDefault, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', preventDefault);
    };
  }, [gameState]);

  // --- GAME LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;

    const loop = () => {
      // Resize
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // --- UPDATE ---
      if (gameState === 'PLAYING') {
        frameRef.current++;
        bgOffsetRef.current += 0.5; // Slow parallax

        // Physics
        physicsRef.current.velocity += GRAVITY;
        physicsRef.current.y += physicsRef.current.velocity;
        
        // Rotation (Tilt up when jumping, down when falling)
        physicsRef.current.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (physicsRef.current.velocity * 0.1)));

        // Pipes
        if (frameRef.current % SPAWN_RATE === 0) {
           const minH = 100;
           const maxH = canvas.height - PIPE_GAP - minH;
           const h = Math.floor(Math.random() * (maxH - minH + 1) + minH);
           pipesRef.current.push({ x: canvas.width, topHeight: h, passed: false });
        }
        pipesRef.current.forEach(p => p.x -= SPEED);
        if (pipesRef.current.length > 0 && pipesRef.current[0].x < -100) pipesRef.current.shift();

        // Collision
        if (checkCollision(canvas.height)) {
            if (!isMuted && sfxRef.current) sfxRef.current.play().catch(()=>{});
            setGameState('GAME_OVER');
            if (scoreRef.current > highScore) setHighScore(scoreRef.current);
        }

        // Score
        pipesRef.current.forEach(p => {
            if (!p.passed && 100 > p.x + 80) {
                p.passed = true;
                scoreRef.current++;
                setScore(scoreRef.current);
            }
        });
      }

      // --- DRAW ---
      // 1. Realistic Background
      if (bgImgRef.current) {
          // Parallax scrolling
          const bgW = canvas.width;
          const bgH = canvas.height;
          const offset = (bgOffsetRef.current * 2) % bgW;
          
          ctx.drawImage(bgImgRef.current, -offset, 0, bgW, bgH);
          ctx.drawImage(bgImgRef.current, bgW - offset, 0, bgW, bgH);
          
          // Dark Overlay for contrast
          ctx.fillStyle = 'rgba(0,0,0,0.3)';
          ctx.fillRect(0,0, canvas.width, canvas.height);
      } else {
          ctx.fillStyle = '#1a1a1a';
          ctx.fillRect(0,0, canvas.width, canvas.height);
      }

      // 2. Pipes (Realistic Golden Pillars)
      pipesRef.current.forEach(p => {
          // Gradients for metallic 3D look
          const grad = ctx.createLinearGradient(p.x, 0, p.x + 80, 0);
          grad.addColorStop(0, '#B8860B'); // Dark Gold
          grad.addColorStop(0.5, '#FFD700'); // Gold
          grad.addColorStop(1, '#B8860B');

          ctx.fillStyle = grad;
          ctx.shadowColor = 'black';
          ctx.shadowBlur = 10;
          
          // Top
          ctx.fillRect(p.x, 0, 80, p.topHeight);
          // Bottom
          ctx.fillRect(p.x, p.topHeight + PIPE_GAP, 80, canvas.height - (p.topHeight + PIPE_GAP));
          
          // Borders
          ctx.strokeStyle = '#FFFACD';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, 0, 80, p.topHeight);
          ctx.strokeRect(p.x, p.topHeight + PIPE_GAP, 80, canvas.height);
          
          ctx.shadowBlur = 0;
      });

      // 3. Character (Amitabh)
      const charX = 100;
      const charY = physicsRef.current.y;
      
      ctx.save();
      ctx.translate(charX, charY);
      
      if (gameState === 'PLAYING' || gameState === 'GAME_OVER') {
         ctx.rotate(physicsRef.current.rotation);
      }
      
      if (charImgRef.current) {
          // Draw shadow
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
          ctx.shadowBlur = 15;
          const size = 80; // Character Size
          ctx.drawImage(charImgRef.current, -size/2, -size/2, size, size);
      } else {
          // Fallback
          ctx.fillStyle = 'red';
          ctx.fillRect(-20, -20, 40, 40);
      }
      ctx.restore();

      // 4. HUD
      if (gameState === 'COUNTDOWN') {
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.fillRect(0,0, canvas.width, canvas.height);
          ctx.fillStyle = '#FFF';
          ctx.font = 'bold 100px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(countDown.toString(), canvas.width/2, canvas.height/2);
      }
      
      if (gameState === 'PLAYING') {
          ctx.fillStyle = '#FFF';
          ctx.font = 'bold 60px sans-serif';
          ctx.textAlign = 'center';
          ctx.shadowColor = 'black';
          ctx.shadowBlur = 4;
          ctx.fillText(scoreRef.current.toString(), canvas.width/2, 100);
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, countDown]);

  const checkCollision = (h: number) => {
      const y = physicsRef.current.y;
      const size = 50; // Hitbox approximation
      
      // Ground/Ceiling
      if (y - size/2 < 0 || y + size/2 > h) return true;

      // Pipes
      for (const p of pipesRef.current) {
          // X overlap
          if (100 + size/2 > p.x && 100 - size/2 < p.x + 80) {
              // Y overlap (Gap check)
              if (y - size/2 < p.topHeight || y + size/2 > p.topHeight + PIPE_GAP) {
                  return true;
              }
          }
      }
      return false;
  };

  return (
    <div 
        className="fixed inset-0 z-[200] bg-black"
        onMouseDown={handleJump}
        onTouchStart={handleJump}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* UI Layer */}
      <div className="absolute inset-0 pointer-events-none flex flex-col p-6">
         <div className="flex justify-end gap-4 pointer-events-auto">
            <button onClick={() => setIsMuted(!isMuted)} className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20">
                {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
            <button onClick={onExit} className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 hover:bg-red-500/50">
                <X />
            </button>
         </div>

         {/* Start / Game Over Screen */}
         {(gameState === 'START' || gameState === 'GAME_OVER') && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/10 p-10 rounded-3xl text-center max-w-md w-full shadow-2xl">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
                        AMITABH FLY
                    </h1>
                    
                    {gameState === 'GAME_OVER' && (
                        <div className="my-6">
                            <p className="text-gray-300 text-sm uppercase tracking-widest">Score</p>
                            <p className="text-6xl font-bold text-white">{score}</p>
                            <p className="text-yellow-500 text-sm mt-2">Best: {highScore}</p>
                        </div>
                    )}
                    
                    {gameState === 'START' && <p className="text-gray-300 mb-8">Tap to Fly! Avoid the Golden Pillars.</p>}

                    <button 
                        onClick={startCountdown}
                        className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl text-xl flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
                    >
                        {gameState === 'START' ? <Play fill="black" /> : <RotateCcw />}
                        {gameState === 'START' ? 'START GAME' : 'TRY AGAIN'}
                    </button>
                </div>
            </div>
         )}
      </div>
    </div>
  );
};