import React, { useState, useRef, useEffect } from 'react';
import { Gamepad2, Play, RotateCcw } from 'lucide-react';

export const GameApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'won'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1200);

  const gameLoopRef = useRef<number | null>(null);

  // Game Engine Parameters
  const ballRef = useRef({ x: 250, y: 350, dx: 4, dy: -4, radius: 6 });
  const paddleRef = useRef({ x: 200, width: 90, height: 10 });
  const bricksRef = useRef<{ x: number; y: number; width: number; height: number; status: number; color: string }[]>([]);

  const initBricks = () => {
    const rows = 4;
    const cols = 7;
    const brickW = 60;
    const brickH = 16;
    const padding = 8;
    const offsetLeft = 20;
    const offsetTop = 30;

    const colors = ['#ff0080', '#00f0ff', '#aa3bff', '#00ff66'];

    const newBricks = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newBricks.push({
          x: offsetLeft + c * (brickW + padding),
          y: offsetTop + r * (brickH + padding),
          width: brickW,
          height: brickH,
          status: 1,
          color: colors[r % colors.length]
        });
      }
    }
    bricksRef.current = newBricks;
  };

  const startGame = () => {
    ballRef.current = { x: 250, y: 350, dx: 4, dy: -4, radius: 6 };
    paddleRef.current.x = 200;
    setScore(0);
    initBricks();
    setGameState('playing');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleRef.current.x = relativeX - paddleRef.current.width / 2;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const update = () => {
      if (gameState !== 'playing') return;

      const ball = ballRef.current;
      const paddle = paddleRef.current;

      // Ball movement
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collision
      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
      }
      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
      } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        // Paddle collision check
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball.dy = -ball.dy;
        } else {
          setGameState('gameover');
          return;
        }
      }

      // Brick collision check
      let allCleared = true;
      bricksRef.current.forEach((b) => {
        if (b.status === 1) {
          allCleared = false;
          if (
            ball.x > b.x &&
            ball.x < b.x + b.width &&
            ball.y > b.y &&
            ball.y < b.y + b.height
          ) {
            ball.dy = -ball.dy;
            b.status = 0;
            setScore((prev) => {
              const newScore = prev + 50;
              if (newScore > highScore) setHighScore(newScore);
              return newScore;
            });
          }
        }
      });

      if (allCleared) {
        setGameState('won');
        return;
      }

      // Render Frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Bricks
      bricksRef.current.forEach((b) => {
        if (b.status === 1) {
          ctx.fillStyle = b.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = b.color;
          ctx.fillRect(b.x, b.y, b.width, b.height);
          ctx.shadowBlur = 0;
        }
      });

      // Draw Paddle
      ctx.fillStyle = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00f0ff';
      ctx.fillRect(paddle.x, canvas.height - paddle.height - 10, paddle.width, paddle.height);
      ctx.shadowBlur = 0;

      // Draw Ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00f0ff';
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;

      gameLoopRef.current = requestAnimationFrame(update);
    };

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(update);
    }

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, highScore]);

  return (
    <div className="h-full flex flex-col items-center justify-between font-sans text-slate-200 p-4 select-none overflow-auto">
      {/* Header Info */}
      <div className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-orbitron text-xs">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white">CYBER BRICK BREAKER</span>
        </div>
        <div className="flex items-center gap-4 font-tech">
          <span>SCORE: <strong className="text-cyan-400">{score}</strong></span>
          <span>HIGH SCORE: <strong className="text-amber-400">{highScore}</strong></span>
        </div>
      </div>

      {/* Arcade Canvas Screen */}
      <div className="relative my-auto rounded-xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.2)] bg-black">
        <canvas ref={canvasRef} width={500} height={380} className="block cursor-none" />

        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 font-orbitron p-6 text-center">
            {gameState === 'idle' && (
              <>
                <h3 className="font-black text-2xl text-cyan-400 text-glow-cyan">CYBER ARCADE</h3>
                <p className="text-xs text-slate-400 max-w-xs">Move your mouse to control the paddle and break all neural bricks!</p>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(0,240,255,0.8)] flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" /> START GAME
                </button>
              </>
            )}

            {gameState === 'gameover' && (
              <>
                <h3 className="font-black text-2xl text-rose-500">SYSTEM FAILURE (GAME OVER)</h3>
                <p className="text-xs text-slate-300 font-tech">FINAL SCORE: {score}</p>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(0,240,255,0.8)] flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> PLAY AGAIN
                </button>
              </>
            )}

            {gameState === 'won' && (
              <>
                <h3 className="font-black text-2xl text-emerald-400">STAGE CLEARED!</h3>
                <p className="text-xs text-slate-300 font-tech">EXCELLENT WORK DEPLOYING NEURAL BREAKER</p>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-lg bg-emerald-500 text-black font-extrabold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" /> NEXT STAGE
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
