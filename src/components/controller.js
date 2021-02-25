import React, { useState, useContext, useEffect } from 'react';
import blankAlbumArt from '../assets/album_art_blank.jpg';
import geniusLogo from '../assets/genius-logo.jpg';
import nextIcon from '../assets/next.svg';
import prevIcon from '../assets/prev.svg';
import playIcon from '../assets/play.svg';
import pauseIcon from '../assets/pause.svg';
import repeatIcon from '../assets/repeat.svg';
import shuffleIcon from '../assets/shuffle.svg';
import shuffleOnIcon from '../assets/shuffle-active.svg';
import lyricsIcon from '../assets/lyrics.svg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import GlobalState from '../contexts/GlobalState';

import { getStreamingUrl, getSongLyrics } from '../api/manager'

import { getStreamQuality } from '../utils/storage'


let previousStreamUrl = ''
let audio = new Audio();
audio.autoplay = false;

const Controller = (props) => {
    const [state, setState] = useContext(GlobalState);

    const song = (state.currentSong === null) ? { 'lyrics': null, 'art': '', name: 'No song playing', artist: 'Play one from your library' } : state.currentSong;

    const [currentTime, setCurrentTime] = useState(0);
    const [isAudioPlaying, setAudioPlaying] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);
    const [songLyrics, setSongLyrics] = useState(song.lyrics);

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
            setState(state => ({ ...state, currentSong: state.queue[currentSongIndex - 1] }));
        }
    }

    const unshuffleQueue = () => {
        setState(state => ({ ...state, queue: state.originalQueue }));
    }

    const shuffleQueue = () => {
        let shuffledQueue = [...state.originalQueue];
        shuffledQueue.sort(() => Math.random() - 0.5);
        setState(state => ({ ...state, queue: shuffledQueue }));
    }

    audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
    }

    audio.onpause = () => {
        setAudioPlaying(false);
    }

    audio.onplay = () => {
        setAudioPlaying(true);
    }

    audio.onended = () => {
        audio.currentTime = 0;
        pauseAudio();
        goToNextSong();
    }

    useEffect(() => {
        audio.currentTime = 0;
        pauseAudio();
        if (song.id !== undefined) {
            getStreamingUrl(song.id, getStreamQuality()).then(response => {
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
        }
    },
        // eslint-disable-next-line 
        [song.id])

    const albumArt = (song.art !== '') ? song.art : blankAlbumArt;

    const handleChange = (event) => {
        const selectedDuration = event.target.value;
        setCurrentTime(selectedDuration);
        audio.currentTime = selectedDuration;
    }

    const showLyricsModal = () => {
        setShowLyrics(true)
        if (song.lyrics !== null) {
            if (song.lyrics === '') {
                setSongLyrics('Fetching song lyrics, please wait ...')
                getSongLyrics(song.id).then(response => {
                    if (response.status === 200) {
                        const lyrics = response.data.result
                        if (lyrics != null) {
                            setSongLyrics(lyrics)
                        } else {
                            setSongLyrics('Song lyrics unavailable.')
                        }
                        song.lyrics = lyrics
                    } else {
                        setSongLyrics('Song lyrics unavailable. Please try later.')
                    }
                })
            } else {
                console.log(song.lyrics)
                setSongLyrics(song.lyrics)
            }
        } else {
            setShowLyrics(false)
        }
    }

    const changeShuffle = () => {
        state.shuffleOn ? unshuffleQueue() : shuffleQueue()
        setState(state => ({ ...state, shuffleOn: !state.shuffleOn }))
    }

    const lyricsModal = <Modal centered show={showLyrics} onHide={() => setShowLyrics(false)}>
        <Modal.Header closegit status
            Button>
            <p className="m-0 p-0"><span className="mr-3"><img alt="" src={geniusLogo} width="36px" /></span>Lyrics powered by Genius</p>
        </Modal.Header>
        <Modal.Body className="lyric-body">{songLyrics}</Modal.Body>
    </Modal>

    const browserView = (
        <div className="controller">
            <img className="album-art" src={albumArt} alt="" />
            <input
                className="seekbar"
                type="range"
                min={0}
                max={String(audio.duration)}
                value={currentTime}
                onChange={(event) => handleChange(event)} />
            <Row className="audio-controls text-center m-0">
                <Col>
                    <img src={prevIcon}
                        width="14px"
                        height="14px"
                        alt=""
                        title="Previous Track"
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
                        title={isAudioPlaying ? "Pause" : "Play"}
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
                    <img src={nextIcon}
                        width="14px"
                        height="14px"
                        alt=""
                        title="Next Track"
                        onClick={() => {
                            audio.currentTime = 0;
                            pauseAudio();
                            goToNextSong();
                        }} />
                </Col>
            </Row>
            <Row className="audio-controls text-center m-0 pt-2">
                <Col>
                    <img src={repeatIcon}
                        width="16px"
                        height="16px"
                        alt=""
                        title="Repeat" />
                </Col>
                <Col className="text-center">
                    <img
                        title="Shuffle"
                        src={state.shuffleOn ? shuffleOnIcon : shuffleIcon}
                        width="16px"
                        height="16px"
                        alt=""
                        onClick={() => changeShuffle()}
                    />
                </Col>
                <Col className="text-center">
                    <img src={lyricsIcon}
                        width="16px"
                        height="16px"
                        alt=""
                        title="Lyrics"
                        onClick={() => {
                            showLyricsModal();
                        }} />
                </Col>
            </Row>
            <p className="song-name pl-3 pt-3 pr-3 pb-1 m-0">{song.name}</p>
            <p className="artist-name pl-3 pb-3 pr-3 m-0">{song.artist}</p>
            {lyricsModal}
        </div>
    );

    const mobileView = (
        <div className="controller-mobile">
            <input
                className="seekbar"
                type="range"
                min={0}
                max={String(audio.duration)}
                value={currentTime}
                onChange={(event) => handleChange(event)} />

            <div>
                <img className="album-art-mobile" src={albumArt} alt="" />

                <div className="song-details-mobile pt-2 pb-2 pl-3 m-0">
                    <p className="song-name-mobile p-0 m-0">{song.name}</p>
                    <p className="artist-name-mobile p-0 m-0">{song.artist}</p>
                </div>
                <img
                    title={isAudioPlaying ? "Pause" : "Play"}
                    className="play-button-mobile"
                    src={isAudioPlaying ? pauseIcon : playIcon}
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