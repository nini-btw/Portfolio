import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import '../stylesheets/imageLightboxS.sass'

export default function ImageLightbox({ images, initialIndex = 0, title = '', onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!images || images.length === 0) return null

  return (
    <motion.div
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} images` : 'Image viewer'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Close image viewer">
        ✕
      </button>

      <Swiper
        modules={[Navigation, Pagination, Keyboard, Zoom]}
        initialSlide={initialIndex}
        navigation
        pagination={{ type: 'fraction' }}
        keyboard={{ enabled: true }}
        zoom={{ maxRatio: 3 }}
        className="lightbox-swiper"
        onClick={(swiper, e) => {
          // close only when the tap lands on the slide's empty backdrop area
          if (e.target?.classList?.contains('swiper-slide')) onClose()
        }}
      >
        {images.map((url, i) => (
          <SwiperSlide key={`${url}-${i}`} zoom>
            <div className="swiper-zoom-container">
              <img
                src={url}
                alt={title ? `${title} screenshot ${i + 1}` : `Screenshot ${i + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  )
}

ImageLightbox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialIndex: PropTypes.number,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
