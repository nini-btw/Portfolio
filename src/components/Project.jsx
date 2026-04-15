import SectionHeader from './subComponents/SectionHeader'
import ProjectGrid from './ProjectGrid'
import '../stylesheets/projectS.sass'

export default function Project() {
  return (
    <section id="project" className="project-section">
      <div className="container">
        <SectionHeader
          title="My Projects"
          subtitle="A selection of things I've built"
        />
        <ProjectGrid />
      </div>
    </section>
  )
}
