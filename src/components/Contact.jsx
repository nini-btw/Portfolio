import { useState } from 'react'
import emailjs from 'emailjs-com'
import SectionHeader from './subComponents/SectionHeader'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import { SOCIAL_LINKS } from '../constants/social'
import { PRIMARY_COLOR, PRIMARY_HOVER } from '../constants/theme'
import '../stylesheets/contactS.sass'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [sending, setSending] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  function validateForm() {
    const { name, email, subject, message } = formData
    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields.')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }
    return true
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validateForm()) return
    setSending(true)
    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSending(false)
      })
      .catch(() => {
        setError('Something went wrong. Please try again or email me directly.')
        setSending(false)
      })
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <SectionHeader title="Contact Me" subtitle="Let&apos;s work together" />
        <div className="contact-card">
          <div className="contact-info">
            <div>
              <h3 className="contact-info__heading">Get in touch</h3>
              <p className="contact-info__lead">
                Have a project in mind or just want to say hi? I&apos;m always open to
                discussing new projects, creative ideas or opportunities.
              </p>
            </div>

            <div className="contact-info__list">
              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <PhoneIcon sx={{ fontSize: 18 }} />
                </span>
                <div>
                  <span className="contact-info__label">Phone</span>
                  <span className="contact-info__value">06 68 87 77 82</span>
                </div>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <EmailIcon sx={{ fontSize: 18 }} />
                </span>
                <div>
                  <span className="contact-info__label">Email</span>
                  <span className="contact-info__value">denidenimohammed@gmail.com</span>
                </div>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <LocationOnIcon sx={{ fontSize: 18 }} />
                </span>
                <div>
                  <span className="contact-info__label">Location</span>
                  <span className="contact-info__value">Oran, Algeria</span>
                </div>
              </div>
            </div>

            <div className="contact-info__socials">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon sx={{ fontSize: 18 }} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon sx={{ fontSize: 18 }} />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                <TwitterIcon sx={{ fontSize: 18 }} />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookIcon sx={{ fontSize: 18 }} />
              </a>
            </div>
          </div>

          <div className="contact-form-panel">
            {success ? (
              <div className="contact-success">
                <span className="contact-success__icon">✓</span>
                <h4>Message sent!</h4>
                <p>Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button onClick={() => setSuccess(false)} className="contact-success__reset">
                  Send another message
                </button>
              </div>
            ) : (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    required
                    type="email"
                  />
                </div>
                <TextField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={5}
                  required
                  sx={{ mb: 2 }}
                />
                {error && <p className="contact-form__error" role="alert">{error}</p>}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={sending}
                  fullWidth
                  sx={{ py: 1.5, backgroundColor: PRIMARY_COLOR, '&:hover': { backgroundColor: PRIMARY_HOVER } }}
                >
                  {sending ? 'Sending…' : 'Send message'}
                </Button>
              </Box>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
