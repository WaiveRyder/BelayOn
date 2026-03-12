import React, { useEffect } from 'react';
import './about.css';

export function About() {
    const [source, updateSource] = React.useState(null);

    async function getQuote() {
        //Replaced by API call later
        return {
            quote: "\"If you want to make the world a better place, take a look at yourself and make a change. Hooo\"",
            author: "-Lego Batman"
        }
    }

    const channelIDs = "UCMuDqExNJkCJpOHsX4VKY9g";

    async function getVideo() {
        const response = await fetch("/api/youtube");

        if (response.status === 200) {
            const data = await response.json();
            updateSource(data.videoUrl);
        }
    }

    useEffect(() => {
        getVideo();
    }, []);

  return (
    <main>
            <h1>About</h1>

            <div className="accordion" id="about-accordion">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            What is BelayOn? 
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#about-accordion">
                        <div className="accordion-body">
                            To put it simply, BelayOn is a member management tool designed for the modern climbing gym.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Purpose
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#about-accordion">
                        <div className="accordion-body">
                            BelayOn's purpose is to help staff keep track of their members and guests 
                            efficiently, allowing guests to spend more time climbing and staff more time working.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Benefits
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#about-accordion">
                        <div className="accordion-body">
                            BelayOn's purpose is to help staff keep track of their members and guests 
                            efficiently, allowing guests to spend more time climbing and staff more time working.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Quote of the Day
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#about-accordion">
                        <div className="accordion-body">
                            {getQuote().quote}
                            <p>{getQuote().author}</p>
                        </div>
                    </div>
                </div>
            </div>

            <img id="ondra" src="AdamOndraSilence.jpg" alt="Adam Ondra climbing the route Silence." />
            <iframe width="560" height="315" src={source} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </main>
  );
}