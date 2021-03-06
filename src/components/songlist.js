import React from 'react';
import Image from 'react-bootstrap/Image';

const SongList = (props) => {
    const playlist = props.playlist.map(song => {
        return <div key={song.id} className="song-listing">
            <Image src={song.art} roundedCircle className="song-listing-art" />
            <div>
                <p className="song-listing-title">{song.name}</p>
                <p className="song-listing-artist">{song.artist}</p>
            </div>
        </div>;
    });

    return (
        <div>
            {playlist}
        </div>
    );
}

export default SongList;