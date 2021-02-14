import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const About = (props) => {
    return (
        <div className="m-4">
            <p>A music player built using <a href="https://github.com/facebook/react/" target="_blank">React.js</a> that lets you play YouTube videos as streaming audio.</p>
            <p>👨🏽‍💻 with ❤️ by <a href="https://github.com/tatirajurishabh" target="_blank">Rishabh Tatiraju</a> | <a href="https://github.com/tatirajurishabh/hope-player-ui" target="_blank">Source Code</a></p>
            <h5 className="headline-dark mt-4">Why <i>Hope</i>?</h5>
            <p>No particular reason. I had this project in mind for many months until I found the skills to make it a reality, but more importantly I found a reason to build it at the first place*. This reason more or less gave me some <i>hope</i> in life, hence the name. Also, partly inspired by the <i>Star Wars: Episode IV - A New Hope</i> poster on my wall.</p>
            <p><small>* Something about starred messages</small></p>
            <h5 className="headline-dark mt-4">Free and open-source</h5>
            <p>Hope Player is always free, and is open-sourced. I do not earn any royalty from it, but donations are welcome!</p>
            <h5 className="headline-dark mt-4">A word of caution</h5>
            <p>YouTube is a proprietary service by Google. This player relies on the <a href="https://github.com/ytdl-org/youtube-dl" target="_blank">Youtube-dl</a> library which was notoriously blocked sometime ago, just to be reinstated for its legitimate use  as long as the video being streamed is in public domain or published using any other copyleft license.</p>
            <p>Having said that, you are responsible for what content you stream using this tool. If YouTube comes to bite your ass, that's on you. I hereby relinquish all legal and financial responsibilities arising due to misuse of this tool.</p>
        </div>
    );
}

export default About;