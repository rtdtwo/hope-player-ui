import React from 'react';
import logo from '../assets/logo.svg';

const About = () => {
    return (
        <div className="m-4 text-light">
            <img src={logo} height="50px"className="mb-4"/>
            <p>A music player built using <a rel="noreferrer" href="https://github.com/facebook/react/" target="_blank">React.js</a> that lets you play YouTube videos as streaming audio.</p>
            <p>👨🏽‍💻 with ❤️ by <a rel="noreferrer" href="https://github.com/tatirajurishabh" target="_blank">Rishabh Tatiraju</a> | <a rel="noreferrer" href="https://github.com/tatirajurishabh/hope-player-ui" target="_blank">Source Code</a></p>
            <h5 className="headline-light mt-4">Why <i>Hope</i>?</h5>
            <p>I had shelved this project for many months until I found the skills to make it a reality, but more importantly I found a reason to finally build it, and that reason brings a lot of <i>hope</i> in my life!</p>
            <p>I sometimes tend to name things based on the things around me (less effort to think about it), so it is also partly inspired by the <i>Star Wars: Episode IV - A New Hope</i> poster on my wall.</p>
            <h5 className="headline-light mt-4">Free and open-source</h5>
            <p>Hope Player is always free, and is open-sourced. I do not earn any royalty from it, but donations are welcome!</p>
            <h5 className="headline-light mt-4">A word of caution</h5>
            <p>YouTube is a proprietary service by Google. This player relies on the <a rel="noreferrer" href="https://github.com/ytdl-org/youtube-dl" target="_blank">Youtube-dl</a> library which was notoriously blocked sometime ago, just to be reinstated for its legitimate use  as long as the video being streamed is in public domain or published using any other copyleft license.</p>
            <p>Having said that, you are responsible for what content you stream using this tool. I hereby relinquish all legal and financial responsibilities arising due to misuse of this tool.</p>
        </div>
    );
}

export default About;