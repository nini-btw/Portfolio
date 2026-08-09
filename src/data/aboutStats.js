import { fallbackProjects } from './fallbackProjects'
import { skills } from './skills'

// Adjust if the actual year coding began changes.
const CODING_START_YEAR = 2021

export const aboutStats = {
  yearsCoding: new Date().getFullYear() - CODING_START_YEAR,
  projectsShipped: fallbackProjects.length,
  technologiesUsed: skills.length,
}
