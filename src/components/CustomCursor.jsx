import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const TRAIL_LENGTH = 6

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorXSpring = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const cursorYSpring = useSpring(cursorY, { stiffness: 500, damping: 28 })

  const trailRef = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  )
  const [trail, setTrail] = useState(trailRef.current)

  const move = useCallback((e) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    if (!visible) setVisible(true)

    trailRef.current = [
      { x: e.clientX, y: e.clientY },
      ...trailRef.current.slice(0, -1),
    ]
    setTrail(trailRef.current)
  }, [cursorX, cursorY, visible])

  useEffect(() => {
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    const onHover = (e) => {
      setHovered(!!e.target.closest('a, button, input, textarea, select, [data-cursor]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseover', onHover)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseover', onHover)
    }
  }, [move])

  return (
    <>
      {trail.map((pos, i) => {
        if (i === 0) return null
        const size = Math.max(5 - i * 0.5, 1.5)
        const opacity = Math.max(0.25 - i * 0.035, 0.04)
        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              left: pos.x,
              top: pos.y,
              width: size,
              height: size,
              borderRadius: '50%',
              background: `hsla(${260 - i * 10}, 85%, ${65 - i * 5}%, ${opacity})`,
              pointerEvents: 'none',
              zIndex: 9998 - i,
              transform: 'translate(-50%, -50%)',
              filter: `blur(${i * 0.3}px)`,
              willChange: 'left, top',
            }}
          />
        )
      })}

      <motion.div
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          left: cursorXSpring,
          top: cursorYSpring,
          width: hovered ? 48 : 24,
          height: hovered ? 48 : 24,
          borderRadius: '50%',
          background: hovered
            ? 'rgba(var(--primary-rgb), 0.12)'
            : 'rgba(var(--primary-rgb), 0.06)',
          border: '1.5px solid rgba(var(--primary-rgb), 0.4)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background 0.2s, border-color 0.2s',
          backdropFilter: 'blur(2px)',
          opacity: visible ? 1 : 0,
          boxShadow: hovered
            ? '0 0 20px rgba(var(--primary-rgb), 0.2), inset 0 0 20px rgba(var(--primary-rgb), 0.05)'
            : 'none',
        }}
        animate={clicked ? { scale: 0.85 } : { scale: 1 }}
      />
      <motion.div
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          left: cursorXSpring,
          top: cursorYSpring,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--primary)',
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          boxShadow: '0 0 12px rgba(var(--primary-rgb), 0.6), 0 0 24px rgba(var(--primary-rgb), 0.3)',
        }}
      />
    </>
  )
}
