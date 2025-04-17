import { useRef, useState, useEffect } from "react";

export const FlappyBirdGame = function () {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Canvas & game constants
  const canvasWidth = 800;
  const canvasHeight = 800;
  const birdX = 50; // fixed horizontal position for the bird
  const birdRadius = 12;
  const gravity = 0.5;
  const jumpStrength = -8;
  const pipeWidth = 60;
  const pipeGap = 150;
  const pipeSpeed = 2;
  const pipeFrequency = 90; // add a new pipe every 90 frames

  // Mutable game state using refs (avoids re-rendering every frame)
  const birdYRef = useRef(canvasHeight / 2);
  const birdVelocityRef = useRef(0);
  const pipesRef = useRef([]);
  const frameCountRef = useRef(0);
  const animationFrameIdRef = useRef(null);

  // Reset game state for a new game
  const resetGame = () => {
    birdYRef.current = canvasHeight / 2;
    birdVelocityRef.current = 0;
    pipesRef.current = [];
    frameCountRef.current = 0;
    setScore(0);
    setGameOver(false);
  };

  // Listen for spacebar or click to "flap" the bird.
  const handleSpace = (e) => {
    if (e.key === " " || e.type === "click") {
      if (gameOver) {
        resetGame();
      } else {
        birdVelocityRef.current = jumpStrength;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpace);
    window.addEventListener("click", handleSpace);

    return () => {
      window.removeEventListener("keydown", handleSpace);
      window.removeEventListener("click", handleSpace);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the bird as a simple circle
    function drawBird() {
      ctx.beginPath();
      ctx.arc(birdX, birdYRef.current, birdRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ff0";
      ctx.fill();
      ctx.closePath();
    }

    // Draw pipes (top and bottom)
    function drawPipes() {
      pipesRef.current.forEach((pipe) => {
        ctx.fillStyle = "#228B22";
        // top pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.gapY);
        // bottom pipe
        ctx.fillRect(
          pipe.x,
          pipe.gapY + pipeGap,
          pipeWidth,
          canvasHeight - (pipe.gapY + pipeGap)
        );
      });
    }

    // Update pipe positions and add new pipes periodically
    function updatePipes() {
      if (frameCountRef.current % pipeFrequency === 0) {
        const minGapY = 50;
        const maxGapY = canvasHeight - pipeGap - 50;
        const gapY =
          Math.floor(Math.random() * (maxGapY - minGapY + 1)) + minGapY;
        pipesRef.current.push({ x: canvasWidth, gapY });
      }
      // Move each pipe to the left
      pipesRef.current = pipesRef.current.map((pipe) => ({
        ...pipe,
        x: pipe.x - pipeSpeed,
      }));
      // Remove pipes that have gone off-screen
      pipesRef.current = pipesRef.current.filter(
        (pipe) => pipe.x + pipeWidth > 0
      );
    }

    // Check for collisions with pipes or the canvas boundaries
    function checkCollision() {
      // Collision with top or bottom of canvas
      if (
        birdYRef.current - birdRadius < 0 ||
        birdYRef.current + birdRadius > canvasHeight
      ) {
        return true;
      }
      // Collision with pipes
      for (let pipe of pipesRef.current) {
        if (
          birdX + birdRadius > pipe.x &&
          birdX - birdRadius < pipe.x + pipeWidth
        ) {
          if (
            birdYRef.current - birdRadius < pipe.gapY ||
            birdYRef.current + birdRadius > pipe.gapY + pipeGap
          ) {
            return true;
          }
        }
      }
      return false;
    }

    // Update score when the bird passes a pipe
    function updateScore() {
      pipesRef.current.forEach((pipe) => {
        if (!pipe.passed && pipe.x + pipeWidth < birdX) {
          pipe.passed = true;
          setScore((prev) => prev + 1);
        }
      });
    }

    // Main game loop using requestAnimationFrame
    function gameLoop() {
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
      frameCountRef.current++;

      // Update bird physics
      birdVelocityRef.current += gravity;
      birdYRef.current += birdVelocityRef.current;

      updatePipes();

      if (checkCollision()) {
        setGameOver(true);
        cancelAnimationFrame(animationFrameIdRef.current);
        return;
      }

      updateScore();

      // Clear the canvas for re-drawing
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      drawPipes();
      drawBird();
    }

    gameLoop();

    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, [gameOver]);

  return (
    <div id="game-container" style={{ width: "100vw", height: "100vh" }}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ width: "100%", height: "100%" }}
      ></canvas>
      <div className="score">Score: {score}</div>
      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0.7)",
            padding: "20px",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          Game Over <br />
          Click or Press Space to Restart
        </div>
      )}
    </div>
  );
};
