import { motion } from 'framer-motion'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import SchoolIcon from '@mui/icons-material/School'
import '../../stylesheets/subStyle/aboutFacts.sass'

const FACTS = [
  { icon: WorkOutlineIcon, label: 'Role', value: 'Full Stack Developer' },
  { icon: SchoolIcon, label: 'Education', value: "Bachelor's in Computer Science" },
]

export default function AboutFacts() {
  return (
    <motion.div
      className="about-facts"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
    >
      {FACTS.map(({ icon: Icon, label, value }) => (
        <div className="about-facts__item" key={label}>
          <span className="about-facts__icon">
            <Icon sx={{ fontSize: 18 }} />
          </span>
          <div>
            <span className="about-facts__label">{label}</span>
            <span className="about-facts__value">{value}</span>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
