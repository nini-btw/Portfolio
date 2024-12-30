import "../stylesheets/homeS.sass";
import nini from "../../public/images/20230615_182139-removebg-preview.png";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";

function Home() {
  return (
    <>
      <div className="overflow-hidden mx-2 home d-flex justify-content-around align-items-center">
        <div className="landing p-3 ps-5">
          <h1 id="landing-header">Hey, I&apos;m Mohammed Denideni</h1>
          <p id="landing-text">
            Driven Full-Stack Developer dedicated to designing and managing
            seamless web applications and robust backend systems, strategically
            aligned to ensure product success and user satisfaction.
          </p>
        </div>
        <div className="picture">
          <div className="blob">
            <div className="profile">
              <img src={nini} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="social">
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
    </>
  );
}

export default Home;
