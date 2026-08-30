import PropTypes from 'prop-types'
import { motion, useReducedMotion } from 'framer-motion'
import TechBadge from './subComponents/TechBadge'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const reducedContainerVariants = { hidden: {}, visible: {} }
const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

function ProjectPanel({ project, index, isActive, onOpen, onImageClick }) {
  const shouldReduceMotion = useReducedMotion()
  const cVariants = shouldReduceMotion ? reducedContainerVariants : containerVariants
  const iVariants = shouldReduceMotion ? reducedItemVariants : itemVariants
  const mediaVariants = shouldReduceMotion ? reducedItemVariants : imageVariants

  return (
    <div className={`project-panel ${isActive ? 'is-active' : ''}`} aria-hidden={!isActive}>
      <span className="project-panel__watermark" aria-hidden="true">
        {index + 1}
      </span>

      <motion.div
        className="project-panel__content"
        variants={cVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <motion.div className="project-panel__info" variants={iVariants}>
          <motion.div className="project-panel__category" variants={iVariants}>
            {project.category}
          </motion.div>
          <motion.h3 className="project-panel__title" variants={iVariants}>
            {project.title}
          </motion.h3>
          <motion.p className="project-panel__desc" variants={iVariants}>
            {project.shortDescription}
          </motion.p>
          <motion.div className="project-panel__stack" variants={iVariants}>
            {(project.techStack || []).slice(0, 4).map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </motion.div>
          <motion.div className="project-panel__footer" variants={iVariants}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="project-panel__link"
                onClick={(e) => e.stopPropagation()}
              >
                Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="project-panel__link"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            )}
            <button className="project-panel__cta" onClick={() => onOpen(project)}>
              Case study →
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className={`project-panel__media ${project.thumbnail ? 'project-panel__media--clickable' : ''}`}
          variants={mediaVariants}
          onClick={() => project.thumbnail && onImageClick(project)}
          role={project.thumbnail ? 'button' : undefined}
          tabIndex={project.thumbnail ? 0 : undefined}
          aria-label={project.thumbnail ? `View ${project.title} screenshots full screen` : undefined}
          onKeyDown={(e) => {
            if (project.thumbnail && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              onImageClick(project)
            }
          }}
        >
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} />
          ) : (
            <div className="project-panel__media-placeholder">
              {project.title.charAt(0)}
            </div>
          )}
          {project.featured && <span className="project-panel__featured">Featured</span>}
        </motion.div>
      </motion.div>
    </div>
  )
}

ProjectPanel.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    techStack: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string,
    featured: PropTypes.bool,
    liveUrl: PropTypes.string,
    githubUrl: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
}

export default ProjectPanel

export function ProjectPanelSkeleton() {
  return (
    <div className="project-panel project-panel--skeleton">
      <div className="project-panel__content">
        <div className="project-panel__info">
          <div className="skeleton-line skeleton-line--short" />
          <div className="skeleton-line skeleton-line--med" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
        <div className="project-panel__media">
          <div className="skeleton-thumb" />
        </div>
      </div>
    </div>
  )
}
