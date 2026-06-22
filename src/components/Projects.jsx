import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import RevealText from './RevealText'

const projects = [
  {
    title: 'E-Commerce Platform',
    desc: 'Full-featured online store with real-time inventory, payment processing, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: '#FF6B35',
    gradient: 'linear-gradient(135deg, #FF6B35, #06D6A0)',
    metric: '10k+ users',
    bento: 'wide',
  },
  {
    title: 'Real-Time Chat App',
    desc: 'Scalable messaging with real-time updates, file sharing, and group chat using Socket.io.',
    tags: ['React', 'Socket.io', 'Express', 'Redis'],
    color: '#FFB703',
    gradient: 'linear-gradient(135deg, #FFB703, #E04A1A)',
    metric: '50k+ messages',
    bento: 'tall',
  },
  {
    title: 'Task Management System',
    desc: 'Collaborative project management with Kanban boards, task tracking, and team features.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    color: '#06D6A0',
    gradient: 'linear-gradient(135deg, #06D6A0, #95D5B2)',
    metric: '5k+ tasks',
    bento: 'normal',
  },
  {
    title: 'AI Content Generator',
    desc: 'AI-powered content creation leveraging OpenAI for blog posts, social media, and more.',
    tags: ['React', 'Python', 'OpenAI', 'FastAPI'],
    color: '#FF8C5A',
    gradient: 'linear-gradient(135deg, #FF8C5A, #FFB703)',
    metric: '15k+ generations',
    bento: 'normal',
  },
  {
    title: 'Weather Dashboard',
    desc: 'Beautiful weather dashboard with interactive maps, 7-day forecasts, and weather alerts.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Chart.js'],
    color: '#95D5B2',
    gradient: 'linear-gradient(135deg, #95D5B2, #FF6B35)',
    metric: 'Live data',
    bento: 'normal',
  },
  {
    title: 'Analytics Platform',
    desc: 'Real-time analytics dashboard with interactive charts, user tracking, and reporting.',
    tags: ['React', 'D3.js', 'Node.js', 'InfluxDB'],
    color: '#FFD166',
    gradient: 'linear-gradient(135deg, #FFD166, #E04A1A)',
    metric: '1M+ events',
    bento: 'wide',
  },
]

const cardStyles = ['magazine', 'framed', 'minimal', 'bold', 'inset', 'outlined']

function TiltCard({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouse = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setTilt({ x: y * -8, y: x * 8 })
  }

  const style = cardStyles[index % cardStyles.length]
  const isSharp = style === 'minimal' || style === 'bold'
  const radius = isSharp ? 4 : 16

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: index % 2 === 0 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        cursor: 'default',
        position: 'relative',
        minHeight: project.bento === 'tall' ? 380 : 320,
        gridColumn: project.bento === 'wide' ? 'span 2' : project.bento === 'tall' ? 'span 1' : 'span 1',
        gridRow: project.bento === 'tall' ? 'span 2' : 'span 1',
      }}
      className={`${project.bento === 'tall' ? 'bento-tall' : ''} ${project.bento === 'wide' ? 'bento-wide' : ''}`}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: radius,
          background: 'var(--card-bg)',
          border: style === 'outlined'
            ? `1.5px solid ${project.color}22`
            : style === 'bold'
              ? `2px solid ${project.color}18`
              : '1px solid var(--card-border)',
          overflow: 'hidden',
          position: 'relative',
          transformStyle: 'preserve-3d',
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${project.color}15`
            : '0 8px 32px rgba(0,0,0,0.2)',
        }}
      >
        {/* Colored header strip */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: style === 'framed' ? 0 : '60%',
          height: style === 'magazine' ? 4 : style === 'bold' ? '100%' : 3,
          background: style === 'bold'
            ? `linear-gradient(180deg, ${project.color}12, transparent)`
            : project.gradient,
          opacity: style === 'bold' ? 1 : 0.6,
          width: style === 'bold' ? '3px' : 'auto',
        }} />

        {/* Content */}
        <div style={{
          padding: style === 'bold' ? '32px 28px' : '28px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          zIndex: 1,
          transformStyle: 'preserve-3d',
        }}>
          <div className="tilt-card-content" style={{ marginBottom: 'auto' }}>
            {/* Metric as large number */}
            <div style={{
              fontSize: style === 'magazine' ? '2.5rem' : '0.7rem',
              fontWeight: style === 'magazine' ? 900 : 600,
              letterSpacing: style === 'magazine' ? -1 : 1,
              textTransform: style === 'magazine' ? 'none' : 'uppercase',
              color: style === 'magazine' ? project.color : project.color,
              opacity: style === 'magazine' ? 0.3 : 1,
              lineHeight: 1,
              marginBottom: style === 'magazine' ? '0.2rem' : '0.8rem',
              fontFamily: 'var(--font-mono)',
            }}>
              {project.metric}
            </div>

            <h3 className="tilt-card-content" style={{
              fontSize: style === 'magazine' ? '1.5rem' : '1.2rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              transform: 'translateZ(20px)',
            }}>
              {project.title}
            </h3>

            <p className="tilt-card-content" style={{
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              lineHeight: 1.7,
              transform: 'translateZ(15px)',
            }}>
              {project.desc}
            </p>
          </div>

          <div>
            <div className="tilt-card-content" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              marginBottom: '0.8rem',
              transform: 'translateZ(25px)',
            }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  padding: '2px 8px',
                  background: `${project.color}12`,
                  borderRadius: style === 'minimal' ? 2 : 10,
                  fontSize: '0.65rem',
                  color: project.color,
                  fontWeight: 500,
                  border: `1px solid ${project.color}15`,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="tilt-card-content" style={{
              display: 'flex',
              gap: 8,
              transform: 'translateZ(30px)',
            }}>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: '6px 16px',
                  background: 'var(--gradient-1)',
                  color: 'white',
                  borderRadius: style === 'minimal' ? 2 : 6,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                }}
              >
                Live Demo
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: '6px 16px',
                  background: `${project.color}10`,
                  color: 'var(--text-secondary)',
                  borderRadius: style === 'minimal' ? 2 : 6,
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  border: `1px solid ${project.color}15`,
                }}
              >
                Source
              </motion.a>
            </div>
          </div>

          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: radius,
                background: `radial-gradient(circle at ${tilt.y * 5 + 50}% ${tilt.x * 5 + 50}%, ${project.color}15, transparent 60%)`,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '4rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }} className="projects-header">
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: 'var(--primary)',
              marginBottom: '0.5rem',
              padding: '4px 14px',
              borderRadius: 4,
              background: 'rgba(var(--primary-rgb), 0.08)',
              fontFamily: 'var(--font-mono)',
            }}>
              / 03 projects
            </span>
            <RevealText
              text="Featured Work"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                background: 'var(--gradient-1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            />
          </div>
          <p style={{
            color: 'var(--text-muted)',
            maxWidth: 320,
            fontSize: '0.88rem',
            lineHeight: 1.8,
            textAlign: 'right',
            flexShrink: 0,
          }}>
            Each project is a unique story — from concept to launch.
            <br />
            <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              // hover to interact
            </span>
          </p>
        </div>

        {/* Magazine-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px',
          maxWidth: 1100,
          margin: '0 auto',
        }} className="proj-grid">
          {projects.map((project, i) => {
            const spans = [
              { col: 'span 3', row: 'span 1' },
              { col: 'span 3', row: 'span 1' },
              { col: 'span 2', row: 'span 1' },
              { col: 'span 2', row: 'span 1' },
              { col: 'span 2', row: 'span 1' },
              { col: 'span 6', row: 'span 1' },
            ]
            return (
              <div key={project.title} style={{
                gridColumn: spans[i].col,
                gridRow: spans[i].row,
              }}>
                <TiltCard project={project} index={i} />
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-header { flex-direction: column !important; align-items: flex-start !important; }
          .projects-header p { text-align: left !important; }
          .proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
