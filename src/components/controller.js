import React, { useState } from 'react';
import blankAlbumArt from '../assets/album_art_blank.jpg'
import nextIcon from '../assets/next.svg'
import prevIcon from '../assets/prev.svg'
import playIcon from '../assets/play.svg'
import pauseIcon from '../assets/pause.svg'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let previousStreamUrl = ''
let audio = new Audio();
audio.autoplay = false;

const Controller = (props) => {
    const song = props.song;

    const [currentTime, setCurrentTime] = useState(0);
    const [isAudioPlaying, setAudioPlaying] = useState(false);

    const pauseAudio = () => {
        audio.pause();
        setAudioPlaying(false);
    }

    const playAudio = () => {
        audio.play();
        setAudioPlaying(true);
    }

    if (previousStreamUrl !== props.streamUrl) {
        pauseAudio();
        audio = new Audio(props.streamUrl);
        playAudio();
        previousStreamUrl = props.streamUrl

        audio.ontimeupdate = () => {
            setCurrentTime(audio.currentTime)
        }

        audio.onended = () => {
            audio.currentTime = 0;
            pauseAudio();
        }
    }

    const albumArt = (song.art !== '') ? song.art : blankAlbumArt;

    const handleChange = (event) => {
        const selectedDuration = event.target.value;
        setCurrentTime(selectedDuration);
        audio.currentTime = selectedDuration;
    }

    return (
        <div>
            <img className="albumart" src={albumArt} alt="" />
            <input
                className="seekbar"
                type="range"
                min={0}
                max={audio.duration}
                value={currentTime}
                onChange={(event) => handleChange(event)} />
            <Row>
                <Col className="text-center">
                    <img src={prevIcon} width="14px" height="14px" alt=""/>
                </Col>
                <Col className="text-center">
                    <img
                        src={(isAudioPlaying) ? pauseIcon : playIcon}
                        width="14px"
                        height="14px"
                        alt=""
                        onClick={() => {
                            (isAudioPlaying) ? pauseAudio() : playAudio();
                        }}
                        
                    />
                </Col>
                <Col className="text-center">
                    <img src={nextIcon} width="14px" height="14px" alt=""/>
                </Col>
            </Row>
            <p className="songname ml-3 mt-3 mr-3 mb-1">{song.name}</p>
            <p className="artistname ml-3 mb-3 mr-3">{song.artist}</p>
        </div>
    )
};

export default Controller;