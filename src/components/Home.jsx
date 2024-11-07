import '../stylesheets/homeS.sass'
import nini from '../../images/png/20230615_182139-removebg-preview.png'


function Home(){
    return(
        <>
        <div className="overflow-hidden mx-2 home d-flex justify-content-around align-items-center">
            <div className="landing">
                <h1 id='landing-header'>
                    Hey, I&apos;m Mohammed Denideni
                </h1>
                <p id='landing-text'>
                    Driven Full-Stack Developer dedicated to designing and managing seamless web applications and robust backend systems, strategically aligned to ensure product success and user satisfaction.
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
            
        </div>
        </>
    )
}

export default Home;