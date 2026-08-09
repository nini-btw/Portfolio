import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useProjects } from '../hooks/useProjects'
import { useScrollPin } from '../hooks/useScrollPin'
import SectionHeader from './subComponents/SectionHeader'
import ProjectPanel, { ProjectPanelSkeleton } from './ProjectPanel'
import ProjectNavDots from './subComponents/ProjectNavDots'
import ProjectModal from './ProjectModal'
import '../stylesheets/projectShowcaseS.sass'

const SKELETON_COUNT = 3

export default function ProjectShowcase() {
  const { projects, loading, error } = useProjects()
  const [selectedProject, setSelectedProject] = useState(null)
  const wrapperRef = useRef(null)

  const panelCount = loading ? SKELETON_COUNT : Math.max(projects.length, 1)
  const { activeIndex, scrollToIndex } = useScrollPin(wrapperRef, panelCount)

  return (
    <div
      className="project-pin-wrapper"
      ref={wrapperRef}
      style={{ height: `${panelCount * 100}vh` }}
    >
      <section id="project" className="project-section">
        <SectionHeader
          title="My Projects"
          subtitle="A selection of things I've built"
        />

        {error && (
          <p className="project-showcase__error">
            Could not load projects. Check your Sanity configuration.
          </p>
        )}

        <div className="project-track">
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <ProjectPanelSkeleton key={i} />)
            : projects.map((project, i) => (
                <ProjectPanel
                  key={project._id}
                  project={project}
                  index={i}
                  isActive={i === activeIndex}
                  onOpen={setSelectedProject}
                />
              ))}
        </div>

        {!loading && projects.length > 0 && (
          <ProjectNavDots
            count={projects.length}
            activeIndex={activeIndex}
            onSelect={scrollToIndex}
          />
        )}
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject._id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
