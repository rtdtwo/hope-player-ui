import React, { useContext } from 'react';
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
        return <div key={song.id} className={className}>
            <div onClick={() => callPlay(song)}>
                <Image src={song.art} roundedCircle className="song-listing-art" />
                <div>
                    <p className="song-listing-title">{song.name}</p>
                    <p className="song-listing-artist">{song.artist}</p>
                </div>
            </div>

        </div>;
    });

    return (
        <div className="mr-4 mt-3">
            {playlist}
        </div>
    );
}

export default SongList;