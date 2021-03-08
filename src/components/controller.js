import React, { useContext, useState, useEffect } from 'react';
import GlobalState from '../contexts/GlobalState';

import { Col, Image, Row, Modal } from 'react-bootstrap';

import AlbumArtBlank from '../assets/album_art_blank.jpg';
import PlayIcon from '../assets/play.svg';
import PauseIcon from '../assets/pause.svg';
import NextIcon from '../assets/next.svg';
import PrevIcon from '../assets/prev.svg';
import ShuffleIcon from '../assets/shuffle.svg';
import ShuffleOnIcon from '../assets/shuffle-active.svg';
import RepeatIcon from '../assets/repeat.svg';
import RepeatAllIcon from '../assets/repeat-all.svg';
import RepeatOneIcon from '../assets/repeat-one.svg';
import LyricsIcon from '../assets/lyrics.svg';
import GeniusLogo from '../assets/genius-logo.jpg';
import YoutubeIcon from '../assets/youtube.svg';
import LikeIcon from '../assets/like.svg';
import LikeActiveIcon from '../assets/like-active.svg';

import { REPEAT_MODE } from '../utils/constants';
import { shufflePlaylist, toHHMMSS } from '../utils/utils';
import { getStreamingUrl, getSongLyrics } from '../api/manager';
import { getStreamQuality } from '../utils/storage';

let previousStreamUrl = ''
let audio = new Audio();
audio.autoplay = false;

const Controller = (props) => {
    const [state, setState] = useContext(GlobalState);

    const song = (state.currentSong === null) ? { 'lyrics': null, 'art': AlbumArtBlank, name: 'No song playing', artist: 'Play one from your library' } : state.currentSong;

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const [isBuffering, setBuffering] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);
    const [songLyrics, setSongLyrics] = useState(song?.lyrics);

    const pauseAudio = () => {
        audio.pause();
        setPlaying(false);
    }

    const playAudio = () => {
        document.title = song?.name + ' - Hope Player';
        audio.play();
        setPlaying(true);
    }

    const restartAudio = () => {
        audio.currentTime = 0;
        playAudio()
    }

    const getCurrentSongIndex = () => {
        let currentSongIndex = -1
        for (let index = 0; index < state.queue.length; index++) {
            const element = state.queue[index];
            if (element.id === song?.id) {
                currentSongIndex = index;
                break;
            }
        }

        return currentSongIndex;
    }

    const goToNextSong = (force) => {
        const currentSongIndex = getCurrentSongIndex();
        if (currentSongIndex !== -1) {
            let nextSongIndex = currentSongIndex;
            switch (state.repeatMode) {
                case REPEAT_MODE.NONE:
                default:
                    if (currentSongIndex < state.queue.length - 1) {
                        nextSongIndex++;
                    }
                    break;
                case REPEAT_MODE.ALL:
                    if (currentSongIndex < state.queue.length - 1) {
                        nextSongIndex++;
                    } else {
                        nextSongIndex = 0;
                    }
                    break;
                case REPEAT_MODE.ONE:
                    if (force && currentSongIndex < state.queue.length - 1) {
                        nextSongIndex++;
                    } else {
                        restartAudio()
                    }
                    break;
            }

            setState(state => ({ ...state, currentSong: state.queue[nextSongIndex] }))
        }
    }

    const goToPreviousSong = () => {
        const currentSongIndex = getCurrentSongIndex()
        if (currentSongIndex !== -1) {
            let previousSongIndex = currentSongIndex;
            if (currentSongIndex > 0) {
                previousSongIndex--;
            } else if (currentSongIndex === 0 && state.repeatMode === 0) {
                previousSongIndex = state.queue.length - 1
            }

            setState(state => ({ ...state, currentSong: state.queue[previousSongIndex] }));
        }
    }

    const unshuffleQueue = () => {
        setState(state => ({ ...state, queue: state.originalQueue }));
    }

    const shuffleQueue = () => {
        const shuffledQueue = shufflePlaylist([...state.originalQueue], song);
        setState(state => ({ ...state, queue: shuffledQueue }));
    }

    const changeShuffle = () => {
        state.shuffleOn ? unshuffleQueue() : shuffleQueue()
        setState(state => ({ ...state, shuffleOn: !state.shuffleOn }))
    }

    const changeRepeat = () => {
        let currentRepeat = state.repeatMode;
        (currentRepeat < REPEAT_MODE.ONE) ? (currentRepeat++) : (currentRepeat = REPEAT_MODE.NONE);
        setState(state => ({ ...state, repeatMode: currentRepeat }))
    }

    const handleSeekbarChange = (event) => {
        const selectedDuration = event.target.value;
        setCurrentTime(selectedDuration);
        audio.currentTime = selectedDuration;
    }

    const getRepeatIcon = () => {
        switch (state.repeatMode) {
            case REPEAT_MODE.NONE:
                return RepeatIcon;
            case REPEAT_MODE.ALL:
                return RepeatAllIcon;
            case REPEAT_MODE.ONE:
                return RepeatOneIcon
        }
    }

    audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
    }

    audio.onpause = () => {
        setPlaying(false);
    }

    audio.onplay = () => {
        setPlaying(true);
    }

    audio.onended = () => {
        audio.currentTime = 0;
        pauseAudio();
        goToNextSong(false);
    }

    audio.onloadstart = () => {
        setBuffering(true);
    }

    audio.oncanplay = () => {
        setBuffering(false);
        setDuration(audio.duration);
    }


    useEffect(() => {
        audio.currentTime = 0;
        pauseAudio();
        if (song?.id !== undefined) {
            getStreamingUrl(song?.id, getStreamQuality()).then(response => {
                if (response.status === 200) {
                    const streamingUrl = response.data.result;
                    if (previousStreamUrl !== streamingUrl) {
                        pauseAudio();
                        audio = new Audio(streamingUrl);
                        playAudio();
                        previousStreamUrl = streamingUrl;
                    }
                } else {
                    goToNextSong(true);
                }
            });
        }
    },
        // eslint-disable-next-line 
        [song?.id])

    const showLyricsModal = () => {
        setShowLyrics(true)
        if (song?.lyrics !== null) {
            if (song?.lyrics === '') {
                setSongLyrics('Fetching song lyrics, please wait ...')
                getSongLyrics(song?.id).then(response => {
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
                setSongLyrics(song?.lyrics)
            }
        } else {
            setShowLyrics(false)
        }
    }


    const lyricsModal = <Modal centered show={showLyrics} onHide={() => setShowLyrics(false)}>
        <Modal.Header closeButton>
            <p className="m-0 p-0"><span className="mr-3"><img alt="" src={GeniusLogo} width="36px" /></span>Lyrics powered by Genius</p>
        </Modal.Header>
        <Modal.Body className="lyric-body">{songLyrics}</Modal.Body>
    </Modal>

    const albumArt = (song?.art !== '') ? song?.art : AlbumArtBlank;

    return (
        <div className="controls">
            <Row className="m-0">
                <Col className="p-0 m-0" md={2}>
                    <div className="controller-song-details">
                        <Image src={albumArt} roundedCircle className="controller-song-art" />
                        <p className="controller-song-title" title={song.name}>{song.name}</p>
                        <p className="controller-song-artist" title={song.artist}>{song.artist}</p>
                    </div>
                </Col>
                <Col className="p-0 m-0" md="auto">
                    <div className="controller-controls-container">
                        <img src={PrevIcon} width="16px" height="16px" className="mr-3 controller-icon" onClick={() => goToPreviousSong()} />
                        <div className="controller-play controller-icon" onClick={() => isPlaying ? pauseAudio() : playAudio()}>
                            <img src={isPlaying ? PauseIcon : PlayIcon} width="16px" height="16px" className="controller-play-icon" />
                        </div>
                        <img src={NextIcon} width="16px" height="16px" className="ml-3 controller-icon" onClick={() => goToNextSong(true)} />
                    </div>
                </Col>
                <Col className="p-0 m-0">
                    <div className="controller-seekbar-container">
                        <p className="controller-time p-0 m-0 pr-3">{toHHMMSS(currentTime)}</p>
                        <input
                            className="seekbar"
                            type="range"
                            min={0}
                            max={String(audio.duration)}
                            value={currentTime}
                            onChange={(event) => handleSeekbarChange(event)} />
                        <p className="controller-time p-0 m-0 pl-3">{toHHMMSS(duration)}</p>
                    </div>
                </Col>
                <Col className="p-0 m-0" md="auto">
                    <div className="controller-options-container">
                        <img src={state.shuffleOn ? ShuffleOnIcon : ShuffleIcon} width="16px" height="16px" className="mr-4 controller-icon" onClick={() => changeShuffle()} />
                        <img src={getRepeatIcon()} width="16px" height="16px" className="mr-4 controller-icon" onClick={() => changeRepeat()} />
                        <img src={song.liked ? LikeActiveIcon : LikeIcon} width="16px" height="16px" className="mr-5 controller-icon" />
                        <img src={YoutubeIcon} width="16px" height="16px" className="mr-3 controller-icon" />
                        <img src={LyricsIcon} width="16px" height="16px" className="controller-icon" onClick={() => showLyricsModal()} />
                    </div>
                </Col>
            </Row>
            {lyricsModal}
        </div>
    );
}

export default Controller;