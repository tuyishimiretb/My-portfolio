import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 600)
          return 100
        }
        const increment = Math.random() * 15 + 2
        return Math.min(prev + increment, 100)
      })
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              fontSize: '3rem',
              fontWeight: 900,
              background: 'var(--gradient-1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TB
          </motion.div>

          <div style={{
            width: 200,
            height: 3,
            background: 'rgba(var(--primary-rgb), 0.1)',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <motion.div
              layout
              style={{
                height: '100%',
                borderRadius: 2,
                background: 'var(--gradient-1)',
                width: `${progress}%`,
                transition: 'width 0.3s ease-out',
              }}
            />
          </div>

          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: 2, fontFamily: 'var(--font-mono)' }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
