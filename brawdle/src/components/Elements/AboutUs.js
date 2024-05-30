import React from 'react';
import '../Styles/style-AboutUs.css'; // Assuming you have a CSS file for styling

const AboutUs = () => {
    return (
        <div className="about-container">
            <section className="about-us">
                <div className="about-c">
                    <img src={`${process.env.PUBLIC_URL}/media/chad.png`} alt="GigaChad" className={'pic'}/>
                    <div className="text">
                        <h2>Xiega</h2>
                        <h5>Front-end Developer & <span>Designer</span></h5>
                        <p>Hey there! I'm passionate about crafting visually stunning and interactive user interfaces that bring websites to life. With a keen eye for design and a knack for problem-solving, I specialize in turning ideas into captivating web experiences. From pixel-perfect layouts to smooth animations, I thrive on the creative challenges of front-end development. My Front-end is really Fronty.</p>
                        <div className="data">
                            <a href="#" className="hire">Hire Me</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-us">
                <div className="about-c">
                    <div className="text">
                        <h2>DajWaj</h2>
                        <h5>Back-end Developer & <span>Silly goose</span></h5>
                        <p>Hi, I'm your go-to person for all things server-side magic! Behind the scenes, I architect robust and scalable systems that power web applications with speed and efficiency. Proficient in languages like Python and Node.js, I love diving into databases, APIs, and server logic to build rock-solid back-end solutions. Does silly stuff sometimes. Knows he can do hard things, just doesn't want to. Won't elaborate.</p>
                        <div className="data">
                            <a href="#" className="hire">Hire Me</a>
                        </div>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/media/goose.png`} alt="Goose" className={'pic'}/>
                </div>
            </section>
            <section className="about-us">
                <div className="about-c">
                    <img src={`${process.env.PUBLIC_URL}/media/elon.png`} alt="Elon" className={'pic'}/>
                    <div className="text">
                        <h2>Dzilnoreq</h2>
                        <h5>Tester Master & <span>Documenter</span></h5>
                        <p>Greetings! I'm on a mission to ensure the quality and integrity of every line of code and every feature of our applications. As a meticulous tester and documentarian, I meticulously analyze, test, and document software to ensure it meets the highest standards of quality and reliability. I'm committed to uncovering bugs, glitches, and inconsistencies to ensure a seamless user experience.</p>
                        <div className="data">
                            <a href="#" className="hire">Hire Me</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
