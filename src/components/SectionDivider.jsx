import { motion } from 'framer-motion'

export default function SectionDivider() {
  return (
    <div style={{
      position: 'relative',
      height: 80,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '50%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.15), rgba(255, 183, 3, 0.15), transparent)',
          transformOrigin: 'left center',
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          left: '20%',
          right: '20%',
          top: '50%',
          marginTop: -6,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(6, 214, 160, 0.1), transparent)',
          transformOrigin: 'right center',
        }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--primary)',
          transform: 'translate(-50%, -50%)',
          marginTop: -3,
          boxShadow: '0 0 12px rgba(var(--primary-rgb), 0.5)',
        }}
      />
    </div>
  )
}
