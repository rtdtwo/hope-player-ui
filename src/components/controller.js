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

    const song = (state.currentSong === null) ? { 'art': '', name: 'No song playing', artist: 'Play one from your library' } : state.currentSong;

    const pauseAudio = () => {
        audio.pause();
        setAudioPlaying(false);
    }

    const playAudio = () => {
        document.title = song.name + ' - Hope Player';
        audio.play();
        setAudioPlaying(true);
    }

    const goToNextSong = () => {
        console.log('Call next song')
        const result = state.queue.filter(filterSong => {
            return filterSong.id === song.id
        })

        let currentSongIndex = -1
        for (let index = 0; index < state.queue.length; index++) {
            const element = state.queue[index];
            if (element.id === song.id) {
                currentSongIndex = index;
                break;
            }
        }

        if (currentSongIndex < state.queue.length - 1) {
            setState(state => ({ ...state, currentSong: state.queue[currentSongIndex + 1] }))
        }
    }

    const goToPreviousSong = () => {
        let currentSongIndex = 1
        for (let index = 0; index < state.queue.length; index++) {
            const element = state.queue[index];
            if (element.id === song.id) {
                currentSongIndex = index;
                break;
            }
        }

        if (currentSongIndex > 0) {
            setState(state => ({ ...state, currentSong: state.queue[currentSongIndex - 1] }))
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
        audio.currentTime = 0;
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

    const browserView = (
        <div className="controller">
            <img className="album-art" src={albumArt} alt="" />
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
                            if (audio.currentTime < 3) {
                                pauseAudio();
                                goToPreviousSong();
                            }
                            audio.currentTime = 0;
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
                            audio.currentTime = 0;
                            pauseAudio();
                            goToNextSong();
                        }} />
                </Col>
            </Row>
            <p className="song-name pl-3 pt-3 pr-3 pb-1 m-0">{song.name}</p>
            <p className="artist-name pl-3 pb-3 pr-3 m-0">{song.artist}</p>
        </div>
    );

    const mobileView = (
        <div className="controller-mobile">
            <input
                className="seekbar"
                type="range"
                min={0}
                max={audio.duration}
                value={currentTime}
                onChange={(event) => handleChange(event)} />

            <div>
                <img className="album-art-mobile" src={albumArt} alt="" />

                <div className="song-details-mobile pt-2 pb-2 pl-3 m-0">
                    <p className="song-name-mobile p-0 m-0">{song.name}</p>
                    <p className="artist-name-mobile p-0 m-0">{song.artist}</p>
                </div>
                <img
                    className="play-button-mobile"
                    src={(isAudioPlaying) ? pauseIcon : playIcon}
                    width="14px"
                    height="14px"
                    alt=""
                    onClick={() => {
                        (isAudioPlaying) ? pauseAudio() : playAudio();
                    }}
                />
            </div>
        </div>
    );

    if (props.mobile) {
        return mobileView;
    } else {
        return browserView;
    }
};

export default Controller;