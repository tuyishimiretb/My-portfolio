import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import RevealText from './RevealText'
import {
  SiReact, SiJavascript, SiTypescript, SiNodedotjs, SiPython,
  SiTailwindcss, SiMongodb, SiPostgresql, SiGit, SiDocker,
  SiFigma, SiNextdotjs, SiExpress, SiFirebase, SiVuedotjs,
} from './Icons.jsx'

const allSkills = [
  { name: 'React', icon: SiReact, color: '#61dafb' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: '#ffffff' },
  { name: 'Python', icon: SiPython, color: '#3776ab' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
  { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4fc08d' },
  { name: 'Git', icon: SiGit, color: '#f05032' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed' },
  { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
]

const categories = [
  { label: 'Frontend', skills: allSkills.slice(0, 6) },
  { label: 'Backend', skills: allSkills.slice(6, 11) },
  { label: 'Tools', skills: allSkills.slice(11) },
]

function TechOrbit() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let angle = 0
    const items = container.querySelectorAll('.orbit-item')

    const animate = () => {
      angle += 0.15
      items.forEach((item, i) => {
        const theta = (i / items.length) * Math.PI * 2 + angle * 0.01
        const phi = Math.cos(i * 1.2) * 0.5
        const radius = 180
        const x = Math.cos(theta) * radius * Math.cos(phi)
        const y = Math.sin(phi) * radius * 0.6
        const z = Math.sin(theta) * radius * Math.cos(phi)
        const scale = (z + radius) / (radius * 2)
        item.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`
        item.style.opacity = 0.3 + scale * 0.7
        item.style.zIndex = Math.round(scale * 100)
      })
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <div ref={containerRef} style={{
      width: 380,
      height: 380,
      position: 'relative',
      transformStyle: 'preserve-3d',
      perspective: 800,
      margin: '0 auto',
    }}>
      {allSkills.map((skill, i) => {
        const SkillIcon = skill.icon
        return (
          <div key={skill.name} className="orbit-item" style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 52,
            height: 52,
            marginLeft: -26,
            marginTop: -26,
            borderRadius: 14,
            background: 'var(--card-bg)',
            border: '1px solid rgba(var(--primary-rgb),0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            color: skill.color,
            transition: 'opacity 0.1s',
            boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
            backdropFilter: 'blur(8px)',
            willChange: 'transform',
          }}>
            <SkillIcon />
          </div>
        )
      })}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" style={{
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
            / skills
          </span>
          <RevealText
            text="Tech Arsenal"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              background: 'var(--gradient-1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              justifyContent: 'center',
            }}
          />
        </div>

        {/* 3D Orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '5rem' }}
        >
          <TechOrbit />
        </motion.div>

        {/* Marquee banner */}
        <div style={{
          overflow: 'hidden',
          padding: '20px 0',
          borderTop: '1px solid rgba(var(--primary-rgb),0.08)',
          borderBottom: '1px solid rgba(var(--primary-rgb),0.08)',
        }}>
          <div className="marquee-track" style={{ display: 'flex', gap: 0 }}>
            {[...allSkills, ...allSkills].map((skill, i) => {
              const SkillIcon = skill.icon
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 24px',
                  whiteSpace: 'nowrap',
                  color: skill.color,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderRight: '1px solid rgba(var(--primary-rgb),0.08)',
                }}>
                  <SkillIcon />
                  {skill.name}
                </div>
              )
            })}
          </div>
        </div>

        {/* Category cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          marginTop: '4rem',
        }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                background: 'var(--card-bg)',
                borderRadius: 20,
                padding: '28px',
                border: '1px solid var(--card-border)',
              }}
            >
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--primary)',
                marginBottom: '1.2rem',
                fontFamily: 'var(--font-mono)',
              }}>
                {cat.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cat.skills.map((skill) => {
                  const SkillIcon = skill.icon
                  return (
                    <div key={skill.name} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'rgba(var(--primary-rgb),0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.1rem', color: skill.color,
                      }}>
                        <SkillIcon />
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
