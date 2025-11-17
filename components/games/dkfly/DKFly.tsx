import React, { useEffect, useRef, useState } from 'react';
import { X, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface DKFlyProps {
  onExit: () => void;
}

// --- ASSETS ---
const CHAR_URL = "https://res.cloudinary.com/du7i7bqna/image/upload/v1763376201/devayt_pvksfi.png";
const BGM_URL = "https://res.cloudinary.com/du7i7bqna/video/upload/v1763379845/kadu-makrani-rahdo_PZP40r1n_wzcrii.mp3";
const GAME_OVER_SFX = "https://res.cloudinary.com/du7i7bqna/video/upload/v1763379854/devayat-khavad-dialogue_A7kWbrDL_yjyko2.mp3";
// A dramatic sunset/royal background
const BG_IMAGE_URL = "https://images.unsplash.com/photo-1532979494617-42f869a1919e?q=80&w=2670&auto=format&fit=crop";

export const DKFly: React.FC<DKFlyProps> = ({ onExit }) => {
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

  // Load State Refs
  const charLoadedRef = useRef(false);
  const bgLoadedRef = useRef(false);

  // Physics Constants
  const GRAVITY = 0.3;
  const JUMP = -7;
  const SPEED = 3.5;
  const SPAWN_RATE = 110;
  const PIPE_GAP = 220;

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
    // Preload Images safely
    const charImg = new Image();
    charImg.src = CHAR_URL;
    charImg.onload = () => { charLoadedRef.current = true; };
    charImgRef.current = charImg;

    const bgImg = new Image();
    bgImg.src = BG_IMAGE_URL;
    bgImg.onload = () => { bgLoadedRef.current = true; };
    bgImgRef.current = bgImg;

    // Setup Audio
    bgmRef.current = new Audio(BGM_URL);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.6;

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
        if (gameState === 'START') {
             bgmRef.current.currentTime = 0;
        }
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
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
        bgOffsetRef.current += 0.5; // Parallax speed

        // Physics
        physicsRef.current.velocity += GRAVITY;
        physicsRef.current.y += physicsRef.current.velocity;
        
        // Rotation
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
            if (!isMuted && sfxRef.current) {
                sfxRef.current.currentTime = 0;
                sfxRef.current.play().catch(()=>{});
            }
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
      
      // 1. Background (Desi Sunset Theme)
      if (bgImgRef.current && bgLoadedRef.current) {
          const bgW = canvas.width;
          const bgH = canvas.height;
          const offset = (bgOffsetRef.current * 1) % bgW;
          
          // Draw slightly tinted image
          ctx.drawImage(bgImgRef.current, -offset, 0, bgW, bgH);
          ctx.drawImage(bgImgRef.current, bgW - offset, 0, bgW, bgH);
          
          // Saffron Tint Overlay
          ctx.fillStyle = 'rgba(255, 153, 51, 0.2)'; // Saffron tint
          ctx.fillRect(0,0, canvas.width, canvas.height);
      } else {
          // Fallback Gradient
          const grad = ctx.createLinearGradient(0,0,0,canvas.height);
          grad.addColorStop(0, '#ff9933'); // Saffron
          grad.addColorStop(1, '#800000'); // Maroon
          ctx.fillStyle = grad;
          ctx.fillRect(0,0, canvas.width, canvas.height);
      }

      // 2. Pipes (Royal Pillars)
      pipesRef.current.forEach(p => {
          // Royal texture gradient
          const grad = ctx.createLinearGradient(p.x, 0, p.x + 80, 0);
          grad.addColorStop(0, '#8B0000'); // Dark Red
          grad.addColorStop(0.3, '#FF4500'); // Orange Red
          grad.addColorStop(0.5, '#FFD700'); // Gold Highlight
          grad.addColorStop(0.7, '#FF4500');
          grad.addColorStop(1, '#8B0000');

          ctx.fillStyle = grad;
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
          ctx.shadowBlur = 10;
          
          // Top Pipe
          ctx.fillRect(p.x, 0, 80, p.topHeight);
          // Bottom Pipe
          ctx.fillRect(p.x, p.topHeight + PIPE_GAP, 80, canvas.height - (p.topHeight + PIPE_GAP));
          
          // Decorative Borders (Gold)
          ctx.fillStyle = '#FFD700';
          ctx.fillRect(p.x, p.topHeight - 20, 80, 20); // Top Cap
          ctx.fillRect(p.x, p.topHeight + PIPE_GAP, 80, 20); // Bottom Cap
          
          ctx.strokeStyle = '#FFD700'; // Gold outline
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, 0, 80, p.topHeight);
          ctx.strokeRect(p.x, p.topHeight + PIPE_GAP, 80, canvas.height);
          
          ctx.shadowBlur = 0;
      });

      // 3. Character (DK)
      const charX = 100;
      const charY = physicsRef.current.y;
      
      ctx.save();
      ctx.translate(charX, charY);
      
      if (gameState === 'PLAYING' || gameState === 'GAME_OVER') {
         ctx.rotate(physicsRef.current.rotation);
      }
      
      if (charImgRef.current && charLoadedRef.current) {
          // Glow effect
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 20;
          const size = 90; 
          ctx.drawImage(charImgRef.current, -size/2, -size/2, size, size);
      } else {
          ctx.fillStyle = 'orange';
          ctx.beginPath();
          ctx.arc(0,0, 30, 0, Math.PI*2);
          ctx.fill();
      }
      ctx.restore();

      // 4. HUD & Effects
      if (gameState === 'COUNTDOWN') {
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(0,0, canvas.width, canvas.height);
          ctx.fillStyle = '#FF9933'; // Saffron
          ctx.font = 'bold 120px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = 'black';
          ctx.shadowBlur = 10;
          ctx.fillText(countDown.toString(), canvas.width/2, canvas.height/2);
      }
      
      if (gameState === 'PLAYING') {
          ctx.fillStyle = '#FFF';
          ctx.font = 'bold 60px serif';
          ctx.textAlign = 'center';
          ctx.shadowColor = '#FF9933';
          ctx.shadowBlur = 10;
          ctx.fillText(scoreRef.current.toString(), canvas.width/2, 100);
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, countDown]);

  const checkCollision = (h: number) => {
      const y = physicsRef.current.y;
      const size = 50; // Hitbox
      
      // Ground/Ceiling
      if (y - size/2 < 0 || y + size/2 > h) return true;

      // Pipes
      for (const p of pipesRef.current) {
          if (100 + size/2 > p.x && 100 - size/2 < p.x + 80) {
              if (y - size/2 < p.topHeight || y + size/2 > p.topHeight + PIPE_GAP) {
                  return true;
              }
          }
      }
      return false;
  };

  return (
    <div 
        className="fixed inset-0 z-[200] bg-black touch-none"
        onMouseDown={handleJump}
        onTouchStart={handleJump}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* UI Layer */}
      <div className="absolute inset-0 pointer-events-none flex flex-col p-6">
         <div className="flex justify-end gap-4 pointer-events-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} 
              onTouchStart={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 z-50 hover:bg-[#FF9933]"
            >
                {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onExit(); }} 
              onTouchStart={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 hover:bg-red-600 z-50"
            >
                <X />
            </button>
         </div>

         {/* Menu Screens */}
         {(gameState === 'START' || gameState === 'GAME_OVER') && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto bg-gradient-to-br from-[#230F12]/90 to-[#5C2E36]/90 backdrop-blur-xl border-2 border-[#FF9933] p-10 rounded-3xl text-center max-w-md w-full shadow-[0_0_50px_rgba(255,153,51,0.3)] z-50">
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#FFD700] to-[#FF9933] mb-2 drop-shadow-sm" style={{ fontFamily: 'serif' }}>
                        DK FLY
                    </h1>
                    
                    {gameState === 'GAME_OVER' && (
                        <div className="my-6 animate-in zoom-in duration-300">
                            <p className="text-[#FFD700] text-sm uppercase tracking-widest font-bold">Total Score</p>
                            <p className="text-7xl font-black text-white drop-shadow-[0_0_10px_rgba(255,76,41,0.8)]">{score}</p>
                            <p className="text-[#FF9933] text-sm mt-2 font-bold">Highest: {highScore}</p>
                        </div>
                    )}
                    
                    {gameState === 'START' && <p className="text-[#FFD700] mb-8 text-lg font-medium">Show your courage. Rule the skies.</p>}

                    <button 
                        onClick={(e) => { e.stopPropagation(); startCountdown(); }}
                        onTouchStart={(e) => e.stopPropagation()}
                        className="w-full py-4 bg-gradient-to-r from-[#FF9933] to-[#FF4500] text-white font-black rounded-xl text-xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-[0_0_20px_rgba(255,153,51,0.6)]"
                    >
                        {gameState === 'START' ? <Play fill="white" /> : <RotateCcw />}
                        {gameState === 'START' ? 'START GAME' : 'TRY AGAIN'}
                    </button>
                </div>
            </div>
         )}
      </div>
    </div>
  );
};