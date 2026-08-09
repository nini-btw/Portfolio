import PropTypes from 'prop-types'

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

export default function TechBadge({ tech }) {
  const colorClass = TECH_COLORS[tech] || TECH_COLORS.default
  return <span className={`tech-badge ${colorClass}`}>{tech}</span>
}

TechBadge.propTypes = {
  tech: PropTypes.string.isRequired,
}
