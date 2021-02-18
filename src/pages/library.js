import React, { useContext, useEffect, useState } from 'react';
import SongList from '../components/songlist';
import { getLibrary } from '../api/manager';

import GlobalState from '../contexts/GlobalState';

const Library = (props) => {
    // eslint-disable-next-line
    const [state, setState] = useContext(GlobalState);

    const getSongs = () => {
        getLibrary().then(response => {
            if (response.status === 200) {
                const data = response.data;
                setState(state => ({ ...state, queue: data }));
            }
        });
    };

    useEffect(() => {
        getSongs()
    },
        // eslint-disable-next-line
        []);


    return (
        <div>
            <SongList showEditModal={props.showEditModal} />
        </div>
    )

}

export default Library;