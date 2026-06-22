import { useScroll, useTransform, motion } from 'framer-motion'

export default function GeometricBackground() {
  const { scrollYProgress } = useScroll()

  // Parallax transforms based on scroll
  const ring1Rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const ring2Rotate = useTransform(scrollYProgress, [0, 1], [360, 0])
  const diamondRotate = useTransform(scrollYProgress, [0, 1], [45, 405])
  const diamondRotate2 = useTransform(scrollYProgress, [0, 1], [45, -315])
  const hexOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.3])
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.02, 0.05])
  const hexY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {/* Large rotating diamond - scroll responsive */}
      <motion.div
        style={{
          position: 'absolute',
          top: '5%',
          right: '-10%',
          width: 600,
          height: 600,
          border: '1px solid rgba(var(--primary-rgb), 0.08)',
          borderRadius: 20,
          rotate: diamondRotate,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          top: '8%',
          right: '-7%',
          width: 540,
          height: 540,
          border: '1px solid rgba(var(--primary-rgb), 0.05)',
          borderRadius: 20,
          rotate: diamondRotate2,
        }}
      />

      {/* Concentric rings top-left */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-8%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: '1.5px solid rgba(var(--primary-rgb), 0.07)',
          rotate: ring1Rotate,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-3%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: '1px dashed rgba(var(--primary-rgb), 0.06)',
          rotate: ring2Rotate,
        }}
      />
      <div style={{
        position: 'absolute',
        top: '-5%',
        left: '2%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        border: '1px dotted rgba(255, 183, 3, 0.08)',
        animation: 'geom-spin 20s linear infinite',
      }} />

      {/* Hexagon shapes - scroll reactive */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-8%',
          right: '-5%',
          width: 400,
          height: 400,
          background: 'rgba(var(--primary-rgb), 0.02)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          y: hexY,
          opacity: hexOpacity,
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: '-3%',
        right: '0%',
        width: 300,
        height: 300,
        border: '1px solid rgba(6, 214, 160, 0.06)',
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        animation: 'geom-float 14s ease-in-out infinite reverse',
      }} />

      {/* Floating triangle bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '-5%',
        width: 250,
        height: 250,
        border: '1px solid rgba(var(--primary-rgb), 0.06)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'geom-spin-slow 35s linear infinite',
        opacity: 0.5,
      }} />

      {/* Small decorative dots with scroll stagger */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: `${10 + (i * 37) % 80}%`,
            top: `${5 + (i * 23) % 90}%`,
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: i % 3 === 0
              ? 'rgba(var(--primary-rgb), 0.15)'
              : i % 3 === 1
                ? 'rgba(255, 183, 3, 0.12)'
                : 'rgba(6, 214, 160, 0.12)',
            opacity: useTransform(
              scrollYProgress,
              [i / 25, i / 25 + 0.1],
              [0, 0.6]
            ),
          }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + (i % 3),
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated grid lines */}
      <motion.svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: gridOpacity,
        }}
      >
        <defs>
          <pattern id="geom-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(var(--primary-rgb), 1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geom-grid)" />
      </motion.svg>

      {/* Floating horizontal lines */}
      {[15, 35, 55, 75].map((left, i) => (
        <div
          key={`line-${i}`}
          style={{
            position: 'absolute',
            left: `${left}%`,
            top: `${20 + i * 18}%`,
            width: `${60 + (i % 2) * 40}px`,
            height: 1,
            background: `linear-gradient(90deg, transparent, rgba(var(--primary-rgb), ${0.04 + i * 0.02}), transparent)`,
            animation: `geom-drift ${8 + i * 2}s ease-in-out infinite`,
            transform: `rotate(${i * 15 - 30}deg)`,
          }}
        />
      ))}

      <style>{`
        @keyframes geom-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes geom-spin-slow {
          0% { transform: rotate(45deg); }
          100% { transform: rotate(405deg); }
        }
        @keyframes geom-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-30px) scale(1.05); opacity: 0.8; }
        }
        @keyframes geom-pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.8); }
        }
        @keyframes geom-drift {
          0%, 100% { transform: translateX(0) rotate(var(--drift-angle, -30deg)); }
          50% { transform: translateX(40px) rotate(var(--drift-angle, -30deg)); }
        }
      `}</style>
    </div>
  )
}
