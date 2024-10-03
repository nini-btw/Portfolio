import Aboutme from "./components/Aboutme"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Project from "./components/Project"
import Contact from "./components/Contact"
import Foot from "./components/Foot"
import "./stylesheets/test.css"

function App() {
  return (
    <>
      <Navbar />
        <div id="home">
          <Home/>
        </div>
        <div id="aboutMe">
          <Aboutme/>
        </div>
        <div id="project">
          <Project/>
        </div>
        <div id="contact">
          <Contact/>
        </div>
      <Foot/>
    </>
  )
}

export default App
