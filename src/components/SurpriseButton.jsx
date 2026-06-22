import { useCallback } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { FiSparkles } from './Icons.jsx'

export default function SurpriseButton() {
  const handleSurprise = useCallback(() => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6B35', '#FFB703', '#06D6A0', '#FF8C5A', '#FFD166'],
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF6B35', '#FFB703', '#06D6A0', '#FF8C5A', '#FFD166'],
      })
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors: ['#FF6B35', '#FFB703', '#06D6A0', '#FF8C5A', '#FFD166'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FF6B35', '#FFB703', '#06D6A0', '#FF8C5A', '#FFD166'],
      })
    }, 500)
  }, [])

  return (
    <motion.button
      onClick={handleSurprise}
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={{ scale: 1, opacity: 1, rotate: [0, -5, 5, -5, 0] }}
      transition={{
        scale: { delay: 1.5, type: 'spring', stiffness: 260, damping: 20 },
        opacity: { delay: 1.5, type: 'spring', stiffness: 260, damping: 20 },
        rotate: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
      }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'var(--gradient-1)',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(var(--primary-rgb),0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'box-shadow 0.3s',
        animation: 'glow-pulse 3s ease-in-out infinite',
      }}
    >
      <FiSparkles />
    </motion.button>
  )
}
