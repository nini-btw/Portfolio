import { HashLink } from "react-router-hash-link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { SOCIAL_LINKS } from "../constants/social";
import "../stylesheets/homeS.sass";

export default function Home() {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-label">
              Full-Stack Developer · Oran, Algeria
            </span>
            <h1 className="hero-heading">
              Hey, I&apos;m
              <br />
              <span className="hero-heading--name">
                Mohammed
                <br />
                Denideni
              </span>
            </h1>
            <p className="hero-sub">
              I build fast, clean, full-stack web applications using the MERN
              stack. I care about performance, good UX, and writing code
              that&apos;s easy to maintain.
            </p>
            <div className="hero-actions">
              <HashLink
                smooth
                to="/#contact"
                className="hero-btn hero-btn--primary"
              >
                Hire me
              </HashLink>
              <a
                href="/cv.pdf"
                download
                className="hero-btn hero-btn--secondary"
              >
                Download CV
              </a>
            </div>
            <div className="hero-socials">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon sx={{ fontSize: 22 }} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon sx={{ fontSize: 22 }} />
              </a>
              <a href={SOCIAL_LINKS.email} aria-label="Email">
                <EmailIcon sx={{ fontSize: 22 }} />
              </a>
            </div>
          </div>

          <div className="hero-photo">
            <div className="hero-photo__frame">
              <img
                src="/images/Profile.png"
                alt="Mohammed Denideni — Full-Stack Developer"
                className="hero-photo__img"
              />
            </div>
            <div className="hero-photo__ring" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
