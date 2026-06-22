import { motion } from 'framer-motion'
import { FiBookOpen, FiCalendar } from './Icons.jsx'

const education = [
  {
    degree: "Bachelor's in Computer Science",
    school: 'University of Rwanda',
    period: '2020 - 2024',
    description: 'Focused on software engineering, data structures, and algorithms. Graduated with honors and participated in multiple hackathons.',
    achievements: [
      'Graduated Top 10% of class',
      'Won 2 university hackathons',
      'Published research on web performance optimization',
    ],
  },
  {
    degree: 'Full Stack Web Development Bootcamp',
    school: 'ALX Africa',
    period: '2022',
    description: 'Intensive 12-month program covering modern web technologies, software engineering best practices, and real-world project experience.',
    achievements: [
      'Completed 20+ projects across the curriculum',
      'Developed a capstone project used by 100+ students',
      'Achieved top percentile in cohort assessments',
    ],
  },
  {
    degree: 'High School Diploma - Science',
    school: 'Ecole des Sciences de Kigali',
    period: '2017 - 2019',
    description: 'Specialized in mathematics, physics, and computer science foundations.',
    achievements: [
      'Best in Computer Science Department',
      'Science fair winner - 2nd place',
    ],
  },
]

export default function Education() {
  return (
    <section id="education" style={{
      padding: '120px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
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
            / education
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            background: 'var(--gradient-1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Academic Background
          </h2>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                display: 'flex',
                gap: 24,
                marginBottom: i < education.length - 1 ? 28 : 0,
                background: 'var(--card-bg)',
                borderRadius: 16,
                padding: 24,
                border: '1px solid var(--card-border)',
                transition: 'all 0.3s',
                position: 'relative',
              }}
              whileHover={{
                x: 4,
                borderColor: 'rgba(var(--primary-rgb),0.2)',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 50,
                height: 50,
                minWidth: 50,
                borderRadius: 14,
                background: 'rgba(var(--primary-rgb),0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                color: 'var(--primary)',
              }}>
                <FiBookOpen />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 6,
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                }}>
                  <FiCalendar />
                  <span>{edu.period}</span>
                </div>

                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: 2,
                }}>
                  {edu.degree}
                </h3>

                <p style={{
                  color: 'var(--primary-light)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  marginBottom: 10,
                }}>
                  {edu.school}
                </p>

                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  lineHeight: 1.7,
                  marginBottom: 12,
                }}>
                  {edu.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {edu.achievements.map((a, j) => (
                    <div key={j} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: 'var(--text-secondary)',
                      fontSize: '0.82rem',
                    }}>
                      <span style={{
                        color: 'var(--neon-green)',
                        fontSize: '0.65rem',
                      }}>▹</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
