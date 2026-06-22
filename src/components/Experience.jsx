import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovators Inc.',
    period: 'Jan 2025 - Present',
    desc: 'Leading microservices architecture, mentoring juniors, implementing CI/CD pipelines.',
    highlights: [
      'Architected scalable backend services handling 10k+ requests/min',
      'Improved app performance by 40% through code optimization',
      'Led a team of 5 developers on 3 major projects',
    ],
    side: 'left',
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: 'Mar 2023 - Dec 2024',
    desc: 'Built and maintained client-facing apps with React and Node.js.',
    highlights: [
      'Built 5+ production applications from scratch',
      'Reduced bug rate by 35% through comprehensive testing',
      'Implemented responsive designs across all projects',
    ],
    side: 'right',
  },
  {
    title: 'Junior Developer',
    company: 'WebCraft Agency',
    period: 'Jun 2022 - Feb 2023',
    desc: 'Started professional journey with WordPress, transitioned to React.',
    highlights: [
      'Completed 15+ client projects on time and within budget',
      'Pioneered React adoption in the team',
      'Received "Rookie of the Year" award',
    ],
    side: 'left',
  },
]

function TimelineCard({ exp, index }) {
  const isLeft = exp.side === 'left'

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gap: 24,
      alignItems: 'center',
      marginBottom: 40,
    }} className="timeline-row">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        style={{
          gridColumn: isLeft ? '1 / 2' : '3 / 4',
          textAlign: isLeft ? 'right' : 'left',
          order: isLeft ? 1 : 3,
        }}
      >
        <motion.div
          whileHover={{ x: isLeft ? -4 : 4 }}
          style={{
            background: 'var(--card-bg)',
            borderRadius: 16,
            padding: '24px',
            border: '1px solid var(--card-border)',
            display: 'inline-block',
            textAlign: 'left',
            maxWidth: 420,
          }}
        >
          <div style={{
            display: 'inline-block',
            padding: '3px 10px',
            borderRadius: 8,
            background: 'rgba(var(--primary-rgb),0.1)',
            color: 'var(--primary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            marginBottom: 8,
          }}>
            {exp.period}
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 2 }}>
            {exp.title}
          </h3>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, marginBottom: 10 }}>
            {exp.company}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 10 }}>
            {exp.desc}
          </p>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {exp.highlights.map((h, j) => (
              <li key={j} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
              }}>
                <span style={{ color: 'var(--neon-green)', marginTop: 2 }}>▹</span>
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Center dot */}
      <div style={{
        gridColumn: '2 / 3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        order: 2,
      }}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: index * 0.15 }}
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'var(--gradient-1)',
            border: '3px solid var(--bg)',
            boxShadow: '0 0 0 2px var(--primary), 0 0 20px rgba(var(--primary-rgb),0.3)',
            zIndex: 2,
          }}
        />
        {index < experiences.length - 1 && (
          <div style={{
            width: 2,
            flex: 1,
            minHeight: 40,
            background: 'linear-gradient(to bottom, var(--primary), rgba(var(--primary-rgb),0.1))',
          }} />
        )}
      </div>

      {/* Empty space on other side */}
      <div style={{ gridColumn: isLeft ? '3 / 4' : '1 / 2', order: isLeft ? 3 : 1 }} />
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{
      padding: '120px 24px',
      position: 'relative',
      overflow: 'hidden',
      background: 'rgba(var(--primary-rgb),0.02)',
    }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: '0.75rem',
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(var(--primary-rgb), 0.1)',
            border: '1px solid rgba(var(--primary-rgb), 0.15)',
            fontFamily: 'var(--font-mono)',
          }}>
            / experience
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            background: 'var(--gradient-1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Where I've Worked
          </h2>
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          {experiences.map((exp, i) => (
            <TimelineCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-row {
            grid-template-columns: 1fr auto !important;
          }
          .timeline-row > div:first-child {
            grid-column: 1 / 2 !important;
            text-align: left !important;
            order: 2 !important;
          }
          .timeline-row > div:nth-child(2) {
            order: 1 !important;
          }
          .timeline-row > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
