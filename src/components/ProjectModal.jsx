import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import '../stylesheets/projectModalS.sass'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    previouslyFocused.current = document.activeElement
    document.body.style.overflow = 'hidden'

    const panel = panelRef.current
    const focusable = panel ? panel.querySelectorAll(FOCUSABLE_SELECTOR) : []
    focusable[0]?.focus()

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
      previouslyFocused.current?.focus?.()
    }
  }, [onClose])

  return (
      <motion.div
        className="modal-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="modal-panel"
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>

          <div className="modal-header">
            <div>
              <span className="modal-category">{project.category}</span>
              <h2 className="modal-title">{project.title}</h2>
              {(project.myRole || project.duration) && (
                <div className="modal-badges">
                  {project.myRole && <span className="modal-badge">{project.myRole}</span>}
                  {project.duration && <span className="modal-badge">{project.duration}</span>}
                </div>
              )}
            </div>
            <div className="modal-links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="modal-link modal-link--primary">
                  Live demo ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="modal-link">
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          {project.screenshots && project.screenshots.length > 0 && (
            <div className="modal-screenshots">
              {project.screenshots.map((url, i) => (
                <img key={i} src={url} alt={`${project.title} screenshot ${i + 1}`} className="modal-screenshot" />
              ))}
            </div>
          )}

          {(project.problem || project.outcome) && (
            <div className={`modal-split ${project.problem && project.outcome ? 'modal-split--both' : ''}`}>
              {project.problem && (
                <div className="modal-split__col">
                  <h4 className="modal-section__title">Problem</h4>
                  <p className="modal-section__text">{project.problem}</p>
                </div>
              )}
              {project.outcome && (
                <div className="modal-split__col">
                  <h4 className="modal-section__title">Solution</h4>
                  <p className="modal-section__text">{project.outcome}</p>
                </div>
              )}
            </div>
          )}

          {project.techStack && project.techStack.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section__title">Tech stack</h4>
              <div className="modal-stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="modal-tech">{tech}</span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
  )
}

ProjectModal.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    liveUrl: PropTypes.string,
    githubUrl: PropTypes.string,
    screenshots: PropTypes.arrayOf(PropTypes.string),
    myRole: PropTypes.string,
    duration: PropTypes.string,
    outcome: PropTypes.string,
    problem: PropTypes.string,
    techStack: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}
