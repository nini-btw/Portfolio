import { GitHubCalendar } from 'react-github-calendar'
import { motion } from 'framer-motion'
import { GITHUB_USERNAME } from '../../constants/social'
import { PRIMARY_COLOR } from '../../constants/theme'
import '../../stylesheets/subStyle/githubContributions.sass'

const calendarTheme = {
  light: ['#ebedf0', '#b8d9f2', '#5aa3dd', '#1a7fcc', PRIMARY_COLOR],
}

export default function GithubContributions() {
  return (
    <motion.div
      className="github-contributions"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h4>GitHub Activity</h4>
      <div className="github-contributions__calendar">
        <GitHubCalendar
          username={GITHUB_USERNAME}
          colorScheme="light"
          theme={calendarTheme}
          blockSize={11}
          blockMargin={4}
          fontSize={14}
        />
      </div>
    </motion.div>
  )
}
