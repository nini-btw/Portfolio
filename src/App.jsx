import NavBarP from './components/NavBarP'
import Home from './components/Home'
import Aboutme from './components/Aboutme'
import Project from './components/Project'
import Contact from './components/Contact'
import Foot from './components/Foot'

export default function App() {
  return (
    <>
      <NavBarP />
      <main>
        <Home />
        <div id="aboutMe"><Aboutme /></div>
        <Project />
        <Contact />
      </main>
      <Foot />
    </>
  )
}
