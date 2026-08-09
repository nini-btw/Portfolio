import StatCounter from './StatCounter'
import { aboutStats } from '../../data/aboutStats'
import { useProjects } from '../../hooks/useProjects'
import '../../stylesheets/subStyle/statsRow.sass'

export default function StatsRow() {
  const { projects, loading } = useProjects()
  // Fall back to the static fallback-dataset count while loading (or if Sanity
  // isn't configured/errors) so the counter never flashes 0.
  const projectsShipped = !loading && projects.length > 0 ? projects.length : aboutStats.projectsShipped

  return (
    <div className="stats-row">
      <StatCounter value={projectsShipped} label="Projects Shipped" />
      <StatCounter value={aboutStats.technologiesUsed} label="Technologies" />
    </div>
  )
}
