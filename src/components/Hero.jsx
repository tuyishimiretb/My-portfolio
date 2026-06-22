import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const roles = [
  'Full Stack Developer',
  'UI/UX Designer',
  'Software Engineer',
  'Problem Solver',
]

function MagneticWrap({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPos({ x, y })
  }

  const handleLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let ci = 0
    let ri = 0
    let deleting = false
    let timer

    const tick = () => {
      const currentRole = roles[ri]
      if (deleting) {
        setDisplayText(currentRole.substring(0, ci - 1))
        ci--
        if (ci === 0) {
          deleting = false
          ri = (ri + 1) % roles.length
        }
        timer = setTimeout(tick, 40)
      } else {
        setDisplayText(currentRole.substring(0, ci + 1))
        ci++
        if (ci === currentRole.length) {
          timer = setTimeout(() => { deleting = true; tick() }, 2000)
        } else {
          timer = setTimeout(tick, 80)
        }
      }
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" ref={heroRef} style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '100px 24px 60px',
      background: 'var(--bg)',
    }}>
      {/* Large background number */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.04, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(20rem, 50vw, 50rem)',
          fontWeight: 900,
          color: 'var(--primary)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        01
      </motion.div>

      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '60px',
          alignItems: 'center',
        }} className="hero-split">
          {/* Left: Label and decorative */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 18px 6px 8px',
                borderRadius: 100,
                background: 'rgba(var(--primary-rgb), 0.1)',
                border: '1px solid rgba(var(--primary-rgb), 0.2)',
                fontSize: '0.8rem',
                color: 'var(--primary-light)',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--neon-green)',
                boxShadow: '0 0 8px var(--neon-green)',
                display: 'inline-block',
              }} />
              Available
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                lineHeight: 1.8,
                maxWidth: 400,
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>//</span> Building digital experiences
              <br />
              <span style={{ color: 'var(--text-secondary)' }}>//</span> with modern web technologies
            </motion.p>

            {/* Scroll indicator as part of layout */}
            <motion.button
              onClick={scrollToAbout}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                marginTop: '3rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: '0.75rem',
                letterSpacing: 3,
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                padding: 0,
              }}
            >
              <span style={{
                width: 30,
                height: 1,
                background: 'var(--primary)',
                display: 'inline-block',
              }} />
              <span>Scroll</span>
            </motion.button>
          </motion.div>

          {/* Right: Main content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontSize: '0.85rem',
                marginBottom: '0.25rem',
                letterSpacing: 3,
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Hello, I'm
            </motion.p>

            <div style={{ marginBottom: '0.5rem' }}>
              {/* First name: letter by letter */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-2px',
                gap: '0.02em',
              }}>
                {'TUYISHIMIRE'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.6 + i * 0.04,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{
                      display: 'inline-block',
                      color: 'var(--text)',
                      transformStyle: 'preserve-3d',
                      textShadow: '0 2px 40px rgba(var(--primary-rgb), 0.05)',
                    }}
                  >
                    {letter === 'I' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        I
                        {/* Dot above I as tiny accent */}
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.04 + 0.1, duration: 0.3 }}
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            display: 'inline-block',
                            marginLeft: -1,
                            verticalAlign: 'super',
                            fontSize: '0.4em',
                          }}
                        />
                      </span>
                    ) : (
                      letter
                    )}
                  </motion.span>
                ))}
              </div>

              {/* Last name: massive with outline + gradient */}
              <div style={{ position: 'relative', marginTop: '-0.05em' }}>
                {/* Outline version behind */}
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    fontSize: 'clamp(4rem, 12vw, 8.5rem)',
                    fontWeight: 900,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(var(--primary-rgb), 0.08)',
                    lineHeight: 1,
                    letterSpacing: '-3px',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  Bosco
                </motion.span>

                {/* Gradient version */}
                <motion.span
                  initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    display: 'block',
                    fontSize: 'clamp(4rem, 12vw, 8.5rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-3px',
                    background: 'var(--gradient-1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 40px rgba(var(--primary-rgb), 0.3))',
                  }}
                >
                  Bosco
                </motion.span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0,
                padding: '8px 20px 8px 16px',
                borderRadius: 10,
                background: 'rgba(var(--primary-rgb), 0.06)',
                border: '1px solid rgba(var(--primary-rgb), 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
                minHeight: '2.6rem',
                marginBottom: '2rem',
                marginTop: '0.8rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '15%',
                bottom: '15%',
                width: 3,
                borderRadius: 2,
                background: 'var(--gradient-1)',
              }} />

              {/* Role text */}
              <span style={{
                color: 'var(--text-secondary)',
                fontWeight: 500,
                marginLeft: 8,
              }}>
                {displayText}
              </span>

              {/* Blinking cursor */}
              <span style={{
                display: 'inline-block',
                width: 2,
                height: '1.1em',
                background: 'var(--primary)',
                marginLeft: 6,
                animation: 'type-blink 0.8s step-end infinite',
                borderRadius: 1,
              }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                maxWidth: 520,
                lineHeight: 1.9,
                marginBottom: '2rem',
              }}
            >
              Passionate about crafting elegant digital experiences. I build full-stack web applications
              with modern technologies, focusing on performance, accessibility, and beautiful design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <MagneticWrap strength={0.25}>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '12px 32px',
                    background: 'var(--gradient-1)',
                    color: 'white',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 25px rgba(var(--primary-rgb), 0.4)',
                    display: 'inline-block',
                  }}
                >
                  Get In Touch
                </motion.a>
              </MagneticWrap>
              <MagneticWrap strength={0.25}>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '12px 32px',
                    background: 'transparent',
                    color: 'var(--text)',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    border: '1px solid rgba(var(--primary-rgb), 0.25)',
                    display: 'inline-block',
                  }}
                >
                  View Projects
                </motion.a>
              </MagneticWrap>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{ display: 'flex', gap: '8px', marginTop: '2rem' }}
            >
              {[
                { name: 'GitHub', href: 'https://github.com/tuyishimiretb/tb' },
                { name: 'Instagram', href: 'https://www.instagram.com/__i.a.mtb' },
                { name: 'Email', href: 'mailto:tuyishimireboscotb@gmail.com' },
              ].map(({ name, href }, i) => (
                <MagneticWrap key={i} strength={0.2}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      border: '1px solid rgba(var(--primary-rgb), 0.12)',
                      color: 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                    }}
                  >
                    {name}
                  </motion.a>
                </MagneticWrap>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes type-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          .hero-split { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  )
}
