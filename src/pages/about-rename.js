import React from 'react';
import Logo from '../assets/logo-light.svg';
import HopeLeiaGif from '../assets/gifs/hope-leia.gif';
import DangerousKevinGif from '../assets/gifs/dangerous-kevin.gif';


const About = () => {
    return (
        <div className="page-root about-container p-5">
            <h1 className="bold-text mb-4">An open music experience!</h1>
            <p className="regular-text"><img alt="" src={Logo} height="20px" /> is a music player built using <a rel="noreferrer" href="https://github.com/facebook/react/" target="_blank">React.js</a> that lets you play YouTube videos as streaming audio.</p>
            <br />
            <p className="regular-text">👨🏽‍💻 with ❤️ by <a rel="noreferrer" href="https://github.com/tatirajurishabh" target="_blank">Rishabh Tatiraju</a> | <a rel="noreferrer" href="https://github.com/tatirajurishabh/hope-player-ui" target="_blank">Source Code</a></p>
            <br />
            <h4 className="bold-text">The story behind it</h4>
            <p className="regular-text">I had envisioned this project a couple of years ago, but by the time it manifested into something meaningful, Youtube-Dl was blocked, and with its future unclear, I decided to shelve the project. Once the library was reinstated, I resurrected the project again, this time building it with React.js. However, the main reason was to serve as a gift for my best friend - a mixtape of sorts!</p>
            <br />
            <h4 className="bold-text">Why <i>Hope</i>?</h4>
            <img src={HopeLeiaGif} width="450px" className="mt-2 mb-2"/>
            <p className="regular-text">This project, and the reason why I built it, brings a lot of hope in my life. Also, I sometimes tend to name things based on the things around me <i>(read: lazy)</i>, so the name is partly inspired by the <i>Star Wars: Episode IV - A New Hope</i> poster on my wall as well.</p>
            <br />
            <h4 className="bold-text">Its FOSS!</h4>
            <p className="regular-text">Hope Player is always free, and is open-sourced. I do not earn any royalty from it, but donations are welcome!</p>
            <br />
            <h4 className="bold-text">Words of caution</h4>
            <img src={DangerousKevinGif} width="450px" className="mt-2 mb-2"/>
            <p className="regular-text">YouTube is a proprietary service by Google. This player relies on the <a rel="noreferrer" href="https://github.com/ytdl-org/youtube-dl" target="_blank">Youtube-dl</a> library which was notoriously blocked sometime ago, just to be reinstated for its legitimate use  as long as the video being streamed is in public domain or published using any other copyleft license. Having said that, you are responsible for what content you stream using this tool. I hereby relinquish all legal and financial responsibilities arising due to misuse of this tool.</p>
        </div>
    );
}

export default About;