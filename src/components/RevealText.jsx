import { motion } from 'framer-motion'

export default function RevealText({ text, as = 'h2', style, delay = 0 }) {
  const words = text.split(' ')
  const Tag = as

  return (
    <Tag style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
