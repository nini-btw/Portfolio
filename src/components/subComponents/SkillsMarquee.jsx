import { motion } from 'framer-motion'
import { skills } from '../../data/skills'
import '../../stylesheets/subStyle/skillsMarquee.sass'

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  testing: 'Testing',
  monitoring: 'Monitoring',
  tools: 'Tooling',
  design: 'Design',
  ai: 'AI',
}

const CATEGORY_ORDER = ['frontend', 'backend', 'testing', 'monitoring', 'tools', 'design', 'ai']

function groupByCategory() {
  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: skills.filter((s) => s.category === category),
  })).filter((group) => group.items.length > 0)
  return groups
}

export default function SkillsMarquee() {
  const groups = groupByCategory()

  return (
    <motion.div
      className="skills-marquee-group"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {groups.map((group, i) => (
        <div className="skills-marquee" key={group.category}>
          <span className="skills-marquee__label">{group.label}</span>
          <div className="marquee-viewport">
            <div
              className={`marquee-track ${i % 2 === 1 ? 'marquee-track--reverse' : ''}`}
            >
              {[...group.items, ...group.items].map((skill, j) => (
                <span
                  className={`marquee-chip ${j >= group.items.length ? 'marquee-chip--dup' : ''}`}
                  key={`${skill.name}-${j}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
