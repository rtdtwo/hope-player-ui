import React, { useState, useContext, useEffect } from 'react';
import blankAlbumArt from '../assets/album_art_blank.jpg';
import nextIcon from '../assets/next.svg';
import prevIcon from '../assets/prev.svg';
import playIcon from '../assets/play.svg';
import pauseIcon from '../assets/pause.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import GlobalState from '../contexts/GlobalState';

import { getStreamingUrl } from '../api/manager'

let previousStreamUrl = ''
let audio = new Audio();
audio.autoplay = false;

const Controller = (props) => {
    const [state, setState] = useContext(GlobalState);
    const [currentTime, setCurrentTime] = useState(0);
    const [isAudioPlaying, setAudioPlaying] = useState(false);

    const song = (state.currentSong === null) ? { 'art': '', name: 'No song selected', artist: 'Select a song from your library' } : state.currentSong;

    const pauseAudio = () => {
        audio.pause();
        setAudioPlaying(false);
    }

    const playAudio = () => {
        audio.play();
        setAudioPlaying(true);
    }

    const goToNextSong = () => {
        console.log('Call next song')
        const currentIndex = state.queue.indexOf(song);
        if (currentIndex < state.queue.length - 1) {
            setState(state => ({ ...state, currentSong: state.queue[currentIndex + 1] }))
        }
    }

    const goToPreviousSong = () => {
        const currentIndex = state.queue.indexOf(song);
        if (currentIndex > 0) {
            setState(state => ({ ...state, currentSong: state.queue[currentIndex - 1] }))
        }
    }

    audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime)
    }

    audio.onended = () => {
        audio.currentTime = 0;
        pauseAudio();
        goToNextSong();
    }

    useEffect(() => {
        pauseAudio();
        getStreamingUrl(song.id).then(response => {
            if (response.status === 200) {
                const streamingUrl = response.data.result;
                if (previousStreamUrl !== streamingUrl) {
                    pauseAudio();
                    audio = new Audio(streamingUrl);
                    playAudio();
                    previousStreamUrl = streamingUrl;
                }
            }
        });
    }, [song.id])

    const albumArt = (song.art !== '') ? song.art : blankAlbumArt;

    const handleChange = (event) => {
        const selectedDuration = event.target.value;
        setCurrentTime(selectedDuration);
        audio.currentTime = selectedDuration;
    }

    return (
        <div className="controller">
            <img className="albumart" src={albumArt} alt="" />
            <input
                className="seekbar"
                type="range"
                min={0}
                max={audio.duration}
                value={currentTime}
                onChange={(event) => handleChange(event)} />
            <Row className="audio-controls text-center m-0">
                <Col>
                    <img src={prevIcon} width="14px" height="14px" alt=""
                        onClick={() => {
                            pauseAudio();
                            goToPreviousSong();
                        }} />
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
                    <img src={nextIcon} width="14px" height="14px" alt=""
                        onClick={() => {
                            pauseAudio();
                            goToNextSong();
                        }} />
                </Col>
            </Row>
            <p className="songname pl-3 pt-3 pr-3 pb-1 m-0">{song.name}</p>
            <p className="artistname pl-3 pb-3 pr-3 m-0">{song.artist}</p>
        </div>
    )
};

export default Controller;