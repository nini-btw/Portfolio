import PropTypes from 'prop-types'

export default function ProjectNavDots({ count, activeIndex, onSelect }) {
  return (
    <div className="project-nav-dots" aria-label="Project navigation">
      <span className="project-nav-dots__counter">
        {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </span>
      <div className="project-nav-dots__list">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`project-nav-dots__dot ${i === activeIndex ? 'is-active' : ''}`}
            aria-label={`Go to project ${i + 1}`}
            aria-current={i === activeIndex}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  )
}

ProjectNavDots.propTypes = {
  count: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
}
