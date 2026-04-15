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
        <div id="home"><Home /></div>
        <div id="aboutMe"><Aboutme /></div>
        <div id="project"><Project /></div>
        <div id="contact"><Contact /></div>
      </main>
      <Foot />
    </>
  )
}
