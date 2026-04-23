import { useState, useEffect } from 'react'
import { fallbackProjects } from '../data/fallbackProjects'

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID

const QUERY = `*[_type == "project"] | order(featured desc, _createdAt desc) {
  _id,
  title,
  slug,
  category,
  shortDescription,
  problem,
  myRole,
  duration,
  outcome,
  mainFeature,
  features,
  techStack,
  liveUrl,
  githubUrl,
  featured,
  "screenshots": screenshots[].asset->url,
  "thumbnail": screenshots[0].asset->url
}`

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!PROJECT_ID) {
      setProjects(fallbackProjects)
      setLoading(false)
      return
    }

    import('../lib/sanityClient').then(({ client }) => {
      client
        .fetch(QUERY)
        .then((data) => {
          setProjects(data.length ? data : fallbackProjects)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setProjects(fallbackProjects)
          setLoading(false)
        })
    })
  }, [])

  return { projects, loading, error }
}
