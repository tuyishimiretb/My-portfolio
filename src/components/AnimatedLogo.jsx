import { useState, useRef } from 'react'

export default function AnimatedLogo({ size = 32, showText = true }) {
  const [hover, setHover] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setMouse({ x: 0, y: 0 }) }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (rect) {
          setMouse({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
          })
        }
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
      }}
    >
      {/* Animated geometric mark */}
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transform: `perspective(400px) rotateY(${mouse.x * 10}deg) rotateX(${-mouse.y * 10}deg)`,
          transition: 'transform 0.15s ease-out',
          flexShrink: 0,
        }}
      >
        {/* Outer diamond */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: hover
            ? 'linear-gradient(135deg, #FF6B35, #FFB703, #06D6A0)'
            : 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
          animation: 'logo-morph 4s ease-in-out infinite',
          opacity: hover ? 1 : 0.9,
          filter: hover ? 'blur(1px) brightness(1.2)' : 'none',
          transition: 'all 0.3s',
        }} />

        {/* Inner shape */}
        <div style={{
          position: 'absolute',
          inset: '20%',
          borderRadius: '60% 40% 40% 60% / 60% 40% 60% 40%',
          background: 'var(--bg)',
          animation: 'logo-morph 5s ease-in-out infinite reverse',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontSize: size * 0.35,
            fontWeight: 900,
            color: 'var(--text)',
            lineHeight: 1,
          }}>
            T
          </span>
        </div>

        {/* Glow ring on hover */}
        {hover && (
          <div style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            border: '1px solid rgba(255,107,53,0.3)',
            animation: 'logo-ring 1s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* Text */}
      {showText && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1,
        }}>
          <span style={{
            fontSize: size * 0.55,
            fontWeight: 800,
            letterSpacing: '-0.5px',
            background: hover
              ? 'linear-gradient(135deg, #FF6B35, #FFB703, #06D6A0)'
              : 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'all 0.3s',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite',
          }}>
            TB
          </span>
          <span style={{
            fontSize: size * 0.25,
            color: 'var(--text-muted)',
            letterSpacing: 1,
            opacity: hover ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }}>
            dev
          </span>
        </div>
      )}

      <style>{`
        @keyframes logo-morph {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
        }
        @keyframes logo-ring {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
