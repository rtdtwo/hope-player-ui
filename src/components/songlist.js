import React from 'react';
import Table from 'react-bootstrap/Table';
import noSongsIcon from '../assets/music_color.svg'

const songlist = (props) => {
    const data = props.data.map(song => {
        const date = new Date(song.added * 1000)
        const formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()

        return (
            <tr onClick={() => props.handleSongClick(song)}>
                <td>{song.name}</td>
                <td>{song.artist}</td>
                <td>{formattedDate}</td>
            </tr>
        )
    });

    if(data != null && data.length > 0) {
        return (
            <Table striped hover variant="dark" className="mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Added</th>
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
                <img src={noSongsIcon} width="100px" alt="" className="mt-5"/>
                <h3 className="mt-4 text-white">Nothing Much Here!</h3>
                <p className="text-light">Add some songs and start listening!</p>
            </div>
        )
    }
    
};

export default songlist;