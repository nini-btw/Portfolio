import { useRef, useEffect, useState } from 'react'
import { useInView, useMotionValue, animate, useReducedMotion } from 'framer-motion'
import PropTypes from 'prop-types'

export default function StatCounter({ value, label, suffix = '', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)
  const motionValue = useMotionValue(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return undefined
    if (shouldReduceMotion) {
      setDisplay(value)
      return undefined
    }
    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [isInView, value, motionValue, shouldReduceMotion])

  return (
    <div className={`stat-counter ${className}`.trim()} ref={ref}>
      <span className="stat-counter__value">
        {display}
        {suffix}
      </span>
      <span className="stat-counter__label">{label}</span>
    </div>
  )
}

StatCounter.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  suffix: PropTypes.string,
  className: PropTypes.string,
}
