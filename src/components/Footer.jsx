import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedLogo from './AnimatedLogo'

const techStack = ['React', 'Framer Motion', 'Node.js', 'TypeScript', 'CSS3', 'Vite', 'JavaScript', 'MongoDB', 'Git', 'Docker']

const socials = [
  { name: 'GitHub', icon: '⌘', href: 'https://github.com/tuyishimiretb/tb', color: '#FF6B35' },
  { name: 'Instagram', icon: '◐', href: 'https://www.instagram.com/__i.a.mtb', color: '#FFB703' },
  { name: 'Email', icon: '✉', href: 'mailto:tuyishimireboscotb@gmail.com', color: '#06D6A0' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const [hoveredSocial, setHoveredSocial] = useState(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 24px 0',
      background: 'linear-gradient(180deg, transparent, rgba(var(--primary-rgb),0.02) 50%, rgba(8,6,5,1) 100%)',
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        border: '1px solid rgba(var(--primary-rgb),0.04)',
        animation: 'footer-orbit 30s linear infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        border: '1px solid rgba(var(--primary-rgb),0.03)',
        animation: 'footer-orbit 25s linear infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* Animated gradient top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(var(--primary-rgb),0.03) 15%, #FF6B35 30%, #FFB703 50%, #06D6A0 70%, rgba(var(--primary-rgb),0.03) 85%, transparent 100%)',
        backgroundSize: '200% 100%',
        animation: 'footer-glow 4s ease-in-out infinite',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top section: Logo + Tagline + Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 40,
          paddingBottom: 40,
          borderBottom: '1px solid rgba(var(--primary-rgb),0.06)',
        }} className="footer-top">
          {/* Brand */}
          <div>
            <a href="#home" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <AnimatedLogo size={36} />
            </a>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              lineHeight: 1.8,
              maxWidth: 340,
              marginTop: 14,
            }}>
              Crafting digital experiences at the intersection of
              design and engineering. Based in Rwanda, building
              for the world.
            </p>

            {/* Animated stats */}
            <div style={{ display: 'flex', gap: 28, marginTop: 20 }}>
              {[
                { value: '20+', label: 'Projects' },
                { value: '10+', label: 'Clients' },
                { value: '3+', label: 'Years' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    background: 'var(--gradient-1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginTop: 2,
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick links + Social */}
          <div style={{ textAlign: 'right' }} className="footer-right">
            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 20px 8px 16px',
                borderRadius: 30,
                background: 'rgba(var(--primary-rgb),0.06)',
                border: '1px solid rgba(var(--primary-rgb),0.1)',
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                marginBottom: 20,
              }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'var(--gradient-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                }}
              >
                ↑
              </motion.div>
              Back to top
            </motion.button>

            {/* Social links */}
            <div style={{
              display: 'flex',
              gap: 6,
              justifyContent: 'flex-end',
              marginBottom: 14,
            }}>
              {socials.map(({ name, icon, href, color }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color: hoveredSocial === name ? color : 'var(--text-muted)',
                    border: `1px solid ${
                      hoveredSocial === name
                        ? `${color}50`
                        : 'rgba(var(--primary-rgb),0.08)'
                    }`,
                    background: hoveredSocial === name
                      ? `${color}08`
                      : 'transparent',
                    transition: 'all 0.25s',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <motion.span
                    animate={hoveredSocial === name ? { rotate: [0, -15, 15, -15, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: '0.9rem' }}
                  >
                    {icon}
                  </motion.span>
                  {name}
                </motion.a>
              ))}
            </div>

            {/* Quick nav links */}
            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'flex-end',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
            }}>
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-light)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: Tech marquee */}
        <div style={{
          padding: '28px 0',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(var(--primary-rgb),0.04)',
        }}>
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 20px',
                    margin: '0 4px',
                    borderRadius: 20,
                    background: 'rgba(var(--primary-rgb),0.04)',
                    border: '1px solid rgba(var(--primary-rgb),0.06)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: i % 2 === 0 ? '#FF6B35' : '#06D6A0',
                    display: 'inline-block',
                  }} />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            flexWrap: 'wrap',
            gap: 10,
          }}
          className="footer-bottom"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              style={{ color: 'var(--neon-green)', fontSize: '0.5rem' }}
            >
              ●
            </motion.span>
            &copy; {year} TUYISHIMIRE Bosco. All rights reserved.
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ color: '#FF6B35' }}
            >
              ♥
            </motion.span>
            <span>using React + Vite</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes footer-orbit {
          0% { transform: rotate(0deg) translateX(20px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        @keyframes footer-glow {
          0%, 100% { background-position: 0% 50%; opacity: 0.5; }
          50% { background-position: 100% 50%; opacity: 1; }
        }
        .marquee-wrapper {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .marquee-content {
          display: flex;
          animation: marquee-scroll 20s linear infinite;
          width: fit-content;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @media (max-width: 600px) {
          .footer-top { flex-direction: column; }
          .footer-right { text-align: left; width: 100%; }
          .footer-right > div:first-child { justify-content: flex-start; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  )
}
