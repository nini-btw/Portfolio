import { useEffect } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/projectModalS.sass'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>

        <div className="modal-header">
          <div>
            <span className="modal-category">{project.category}</span>
            <h2 className="modal-title">{project.title}</h2>
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
            {project.screenshots.slice(0, 3).map((url, i) => (
              <img key={i} src={url} alt={`${project.title} screenshot ${i + 1}`} className="modal-screenshot" />
            ))}
          </div>
        )}

        <div className="modal-meta">
          {project.myRole && (
            <div className="modal-meta__item">
              <span className="modal-meta__label">Role</span>
              <span className="modal-meta__value">{project.myRole}</span>
            </div>
          )}
          {project.duration && (
            <div className="modal-meta__item">
              <span className="modal-meta__label">Duration</span>
              <span className="modal-meta__value">{project.duration}</span>
            </div>
          )}
          {project.outcome && (
            <div className="modal-meta__item">
              <span className="modal-meta__label">Outcome</span>
              <span className="modal-meta__value">{project.outcome}</span>
            </div>
          )}
        </div>

        {project.problem && (
          <div className="modal-section">
            <h4 className="modal-section__title">Problem</h4>
            <p className="modal-section__text">{project.problem}</p>
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
      </div>
    </div>
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
