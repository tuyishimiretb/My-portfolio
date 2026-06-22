import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon } from './Icons.jsx'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <motion.button
      onClick={() => setDark(!dark)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5 }}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 100,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'var(--glass)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        color: 'var(--text)',
        fontSize: '1.2rem',
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s',
        animation: 'glow-pulse 4s ease-in-out infinite',
      }}
    >
      <motion.div
        key={dark ? 'sun' : 'moon'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <FiSun /> : <FiMoon />}
      </motion.div>
    </motion.button>
  )
}
