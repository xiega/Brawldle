import React from 'react';
import '../Styles/style-AboutUs.css'; // Assuming you have a CSS file for styling

const AboutUs = () => {
    return (
        <div className="about-container">
            <section className="about-us">
                <div className="about-c">
                    <img src={`${process.env.PUBLIC_URL}/media/chad.png`} alt="GigaChad" className={'pic'}/>
                    <div className="text">
                        <h2>About Us</h2>
                        <h5>Front-end Developer & <span>Designer</span></h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita natus ad sed harum itaque ullam enim quas, veniam accusantium, quia animi id eos adipisci iusto molestias asperiores explicabo cum vero atque amet corporis! Soluta illum facere consequuntur magni. Ullam dolorem repudiandae cumque voluptate consequatur consectetur, eos provident necessitatibus reiciendis corrupti!</p>
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
