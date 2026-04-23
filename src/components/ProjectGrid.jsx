import { useState } from 'react'
import PropTypes from 'prop-types'
import { useProjects } from '../hooks/useProjects'
import ProjectModal from './ProjectModal'
import '../stylesheets/projectGridS.sass'

const TECH_COLORS = {
  React: 'badge-blue',
  Node: 'badge-green',
  MongoDB: 'badge-gray',
  Express: 'badge-green',
  JavaScript: 'badge-amber',
  TypeScript: 'badge-blue',
  HTML: 'badge-amber',
  CSS: 'badge-blue',
  Sass: 'badge-pink',
  Pug: 'badge-gray',
  default: 'badge-gray',
}

function TechBadge({ tech }) {
  const colorClass = TECH_COLORS[tech] || TECH_COLORS.default
  return <span className={`tech-badge ${colorClass}`}>{tech}</span>
}

function ProjectCard({ project, onOpen }) {
  return (
    <div className="project-card" onClick={() => onOpen(project)}>
      <div className="project-card__thumb">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} />
        ) : (
          <div className="project-card__thumb-placeholder">
            {project.title.charAt(0)}
          </div>
        )}
        {project.featured && <span className="project-card__featured">Featured</span>}
      </div>
      <div className="project-card__body">
        <div className="project-card__category">{project.category}</div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.shortDescription}</p>
        <div className="project-card__stack">
          {(project.techStack || []).slice(0, 4).map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
        <div className="project-card__footer">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="project-card__link"
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
              className="project-card__link"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub
            </a>
          )}
          <button className="project-card__cta">Case study →</button>
        </div>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="project-card project-card--skeleton">
      <div className="skeleton-thumb" />
      <div className="project-card__body">
        <div className="skeleton-line skeleton-line--short" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-line--med" />
      </div>
    </div>
  )
}

TechBadge.propTypes = {
  tech: PropTypes.string.isRequired,
}

ProjectCard.propTypes = {
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
  onOpen: PropTypes.func.isRequired,
}

export default function ProjectGrid() {
  const { projects, loading, error } = useProjects()
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="project-grid-section">
      {error && (
        <p className="project-grid__error">
          Could not load projects. Check your Sanity configuration.
        </p>
      )}

      <div className="project-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onOpen={setSelectedProject}
              />
            ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
