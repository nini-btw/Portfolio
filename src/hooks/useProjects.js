import { useState, useEffect } from 'react'
import { fallbackProjects } from '../data/fallbackProjects'

// Same descending-order rule as the live GROQ query, applied here too so
// the offline/fallback path (used when Sanity isn't configured or the
// fetch fails) stays consistent regardless of how fallbackProjects.js
// happens to be ordered.
const sortedFallbackProjects = [...fallbackProjects].sort((a, b) => b.order - a.order)

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID

// Descending by "order": the highest number displays first. This means a
// newly added project just needs an order value higher than the current
// max to automatically become the first one shown — no renumbering of
// existing projects required.
const QUERY = `*[_type == "project"] | order(order desc) {
  _id,
  title,
  slug,
  category,
  shortDescription,
  problem,
  myRole,
  duration,
  outcome,
  techStack,
  liveUrl,
  githubUrl,
  featured,
  order,
  "screenshots": screenshots[].asset->url,
  "thumbnail": screenshots[0].asset->url
}`

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!PROJECT_ID) {
      setProjects(sortedFallbackProjects)
      setLoading(false)
      return
    }

    import('../lib/sanityClient').then(({ client }) => {
      client
        .fetch(QUERY)
        .then((data) => {
          setProjects(data.length ? data : sortedFallbackProjects)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setProjects(sortedFallbackProjects)
          setLoading(false)
        })
    })
  }, [])

  return { projects, loading, error }
}
