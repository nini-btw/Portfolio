import { motion } from 'framer-motion'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import '../../stylesheets/subStyle/cvButton.sass'

export default function CvButton() {
  return (
    <motion.a
      href="./cv.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="cv-button"
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <span className="cv-button__shine" aria-hidden="true" />
      <FileDownloadIcon className="cv-button__icon" fontSize="small" />
      <span>Download CV</span>
    </motion.a>
  )
}
