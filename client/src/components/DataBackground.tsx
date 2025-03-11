import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function DataBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const nodes: Array<{
      x: number;
      y: number;
      size: number;
      connections: number[];
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createNode = (index: number) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 2,
      connections: Array.from({ length: 3 }, () => 
        Math.floor(Math.random() * 20)
      ).filter(n => n !== index),
    });

    const initNodes = () => {
      nodes.length = 0;
      const density = (canvas.width * canvas.height) / 20000;
      for (let i = 0; i < density; i++) {
        nodes.push(createNode(i));
      }
    };

    const drawConnection = (start: typeof nodes[0], end: typeof nodes[0], alpha: number) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`; // Light blue color
      ctx.lineWidth = 1;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    };

    const drawNode = (node: typeof nodes[0]) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(125, 211, 252, 0.8)';
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          if (connectionIndex < nodes.length) {
            const distance = Math.hypot(
              nodes[connectionIndex].x - node.x,
              nodes[connectionIndex].y - node.y
            );
            const alpha = 1 - distance / 200;
            if (alpha > 0) {
              drawConnection(node, nodes[connectionIndex], alpha * 0.2);
            }
          }
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        node.y += Math.sin(Date.now() * 0.001) * 0.5;
        node.x += Math.cos(Date.now() * 0.001) * 0.5;

        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        drawNode(node);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initNodes();
    };

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Neural Network Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
      />

      {/* Geometric Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Data Flow Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.svg 
          width="40" 
          height="40" 
          viewBox="0 0 100 100"
          className="fill-sky-400"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M50,20 L80,50 L50,80 L20,50 Z" />
          <circle cx="50" cy="50" r="5" className="fill-white" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
