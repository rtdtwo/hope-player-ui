import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

import { deleteSong } from '../api/manager';

import noSongsIcon from '../assets/music_color.svg';
import equalizerAnimation from '../assets/equalizer_anim.gif';
import youtubeIcon from '../assets/youtube.svg';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/pencil.svg';
import playIcon from '../assets/play-button.svg';

import GlobalState from '../contexts/GlobalState';
import { isMobile, shufflePlaylist } from '../utils/utils';
import config from '../config.json';

const SongList = (props) => {
    const [state, setState] = useContext(GlobalState);

    const deleteTheSong = (songId) => {
        const goForDelete = window.confirm("Are you sure you wish to delete this song?");
        if (goForDelete) {
            deleteSong(songId).then(response => {
                if (response.status === 200) {
                    alert("Deleted")
                }
            });
        }
    }

    const callPlay = (song) => {
        let newQueue = [...props.playlist]
        if (state.shuffleOn) {
            newQueue = shufflePlaylist(newQueue, song);
        }
        setState(state => ({ ...state, currentSong: song, queue: newQueue, originalQueue: props.playlist }))
    }

    const data = props.playlist.map(song => {
        if (song !== null && song !== undefined ) {
            const equalizerAnim = (state.currentSong !== null && state.currentSong?.id === song?.id) ? equalizerAnimation : playIcon
            const tags = song?.tags.map(tag => {
                return (
                    <Badge key={tag} pill variant="secondary" className="mr-1">{tag}</Badge>
                )
            })
            const classNameRoot = (state.currentSong !== null && state.currentSong?.id === song?.id) ? 'current-song' : ''

            return (
                <tr key={song.id} className={classNameRoot}>
                    <td><img title="Play" src={equalizerAnim} height="24px" alt="" onClick={() => callPlay(song)} /></td>
                    <td>{song.name}</td>
                    <td>{song.artist}</td>
                    <td><div>{tags}</div></td>
                    {!isMobile ? (
                        <td>
                            <a title="Watch on YouTube" href={song.url} target="_blank" rel="noreferrer"><img src={youtubeIcon} height="18px" alt="" /></a>
                            {config.editAccess ? (
                                <img title="Edit Song" src={editIcon} height="16px" alt="" className="ml-4" onClick={() => props.showEditModal(song)} />
                            ) : (<div />)}
                            {config.editAccess ? (
                                <img title="Delete Song" src={deleteIcon} height="16px" alt="" className="ml-4" onClick={() => deleteTheSong(song.id)} />
                            ) : (<div />)}
                        </td>
                    ) : <p />}

                </tr>
            )
        } else {
            return ''
        }
    });

    if (data != null && data.length > 0) {
        return (
            <Table striped borderless className="table text-light">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Tags</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </Table>
        )
    } else {
        return (
            <div className="text-center">
                <img src={noSongsIcon} width="100px" alt="" className="mt-5" />
                <h3 className="mt-4 text-white">Nothing Much Here!</h3>
                <p className="text-light">Add some songs and start listening.</p>
            </div>
        )
    }

};

export default SongList;