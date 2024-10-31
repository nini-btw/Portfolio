import '../stylesheets/homeS.sass'
import blob from '../../images/svg/blob.svg'
//import nini from '../../images/png/20230615_182139-removebg-preview.png'
//import ClippedImage from './ClippedImage';


function Home(){
    return(
        <>
        <div className="overflow-hidden home d-flex justify-content-center align-items-center">
            <div className="landing">
                <h1 id='landing-header'>
                    Hey, I&apos;m Mohammed Denideni
                </h1>
                <p id='landing-text'>
                    Driven Full-Stack Developer dedicated to designing and managing seamless web applications and robust backend systems, strategically aligned to ensure product success and user satisfaction.
                </p>
            </div>
            <div className="picture">
               <img id='blob' src={blob} alt="" />
            </div>
        </div>
        <div className="social">
            
        </div>
        </>
    )
}

export default Home;