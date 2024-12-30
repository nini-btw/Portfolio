import Aboutme from "./components/Aboutme";
import Home from "./components/Home";
import NavbarP from "./components/NavBarP";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Foot from "./components/Foot";

function App() {
  return (
    <>
      <NavbarP />
      <div id="home">
        <Home />
      </div>
      <div id="aboutMe">
        <Aboutme />
      </div>
      <div id="project">
        <Project />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Foot />
    </>
  );
}

export default App;
