import React, { useContext } from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import GlobalState from '../contexts/GlobalState';
import { shufflePlaylist } from '../utils/utils';


const SongList = (props) => {
    const [state, setState] = useContext(GlobalState);

    const callPlay = (song) => {
        let newQueue = [...props.playlist]
        if (state.shuffleOn) {
            newQueue = shufflePlaylist(newQueue, song);
        }
        setState(state => ({ ...state, currentSong: song, queue: newQueue, originalQueue: props.playlist }))
    }

    const playlist = props.playlist.map(song => {
        const className = (state.currentSong !== null && state.currentSong?.id === song?.id) ? 'song-listing-active' : 'song-listing';
        return <Row key={song.id} className={className + ' pt-3 pb-3 m-0'} onClick={() => callPlay(song)}>
            <Col md="auto" className="p-0 m-0 align-self-center">
                <Image src={song.art} roundedCircle className="song-listing-art mr-4" />
            </Col>
            <Col className="p-0 m-0 align-self-center">
                <div>
                    <p className="song-listing-title">{song.name}</p>
                    <p className="song-listing-artist">{song.artist}</p>
                </div>
            </Col>
            <Col md="auto" className="p-0 m-0 align-self-center">
                <div>
                    {song.tags.map(tag => {
                        return <Badge variant="dark" className="mr-2" key={tag}>{tag}</Badge>
                    })}
                </div>
            </Col>
        </Row>;
    });

    return (
        <div className="mr-4 mt-3">
            {playlist}
        </div>
    );
}

export default SongList;