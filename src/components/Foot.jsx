import "../stylesheets/footS.sass";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";

function Foot() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>
          Made with <span className="heart">❤️</span> by Mohammed Denideni
        </p>
      </div>
      <div className="footer-right">
        <a
          href="https://www.facebook.com/profile.php?id=100080031691371"
          target="_blank"
          rel="noopener noreferrer"
          className="facebook"
        >
          <Facebook />
        </a>
        <a
          href="https://x.com/denimohammedela"
          target="_blank"
          rel="noopener noreferrer"
          className="twitter"
        >
          <Twitter />
        </a>
        <a
          href="https://www.linkedin.com/in/mohammed-denideni-48a9522b6/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin"
        >
          <LinkedIn />
        </a>
        <a
          href="https://github.com/nini-btw"
          target="_blank"
          rel="noopener noreferrer"
          className="github"
        >
          <GitHub />
        </a>
      </div>
    </footer>
  );
}

export default Foot;
