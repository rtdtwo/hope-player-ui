import React, { useContext, useState } from 'react';
import GlobalState from '../contexts/GlobalState';
import { Col, Image, Row } from 'react-bootstrap';
import AlbumArtBlank from '../assets/album_art_blank.jpg'

import PlayIcon from '../assets/play.svg';
import PauseIcon from '../assets/pause.svg';
import NextIcon from '../assets/next.svg';
import PrevIcon from '../assets/prev.svg';
import ShuffleIcon from '../assets/shuffle.svg';
import RepeatIcon from '../assets/repeat.svg';
import LyricsIcon from '../assets/lyrics.svg';

const Controller = (props) => {
    const [state, setState] = useContext(GlobalState);

    const song = (state.currentSong === null) ? { 'lyrics': null, 'art': AlbumArtBlank, name: 'No song playing', artist: 'Play one from your library' } : state.currentSong;

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const [isBuffering, setBuffering] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);
    const [songLyrics, setSongLyrics] = useState(song?.lyrics);

    return (
        <Row className="m-0 controls">
            <Col className="p-0 m-0" md={3}>
                <div className="controller-song-details">
                    <Image src={song.art} roundedCircle className="controller-song-art" />
                    <p className="controller-song-title">{song.name}</p>
                    <p className="controller-song-artist">{song.artist}</p>
                </div>
            </Col>
            <Col className="p-0 m-0" md="auto">
                <div className="controller-controls-container">
                    <img src={ShuffleIcon} width="16px" height="16px" className="mr-3 controller-icon" />
                    <img src={PrevIcon} width="16px" height="16px" className="mr-3 controller-icon" />
                    <div className="controller-play controller-icon">
                        <img src={PlayIcon} width="16px" height="16px" className="controller-play-icon" />
                    </div>
                    <img src={NextIcon} width="16px" height="16px" className="ml-3 controller-icon" />
                    <img src={RepeatIcon} width="16px" height="16px" className="ml-3 controller-icon" />
                </div>
            </Col>
            <Col className="p-0 m-0">
                <div className="controller-seekbar-container">
                    <p className="controller-time p-0 m-0 pr-3">00:00</p>
                    <input
                        className="seekbar"
                        type="range"
                        min={0}
                        value={currentTime} />
                    <p className="controller-time p-0 m-0 pl-3">00:00</p>
                </div>
            </Col>
            <Col className="p-0 m-0" md="auto">
                <div className="controller-options-container">
                    <img src={LyricsIcon} width="16px" height="16px" className="controller-icon" />
                </div>
            </Col>
        </Row>
    );
}

export default Controller;