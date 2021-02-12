import React, { useContext, useEffect } from 'react';
import SongList from '../components/songlist';
import { getLibrary } from '../api/manager';

import GlobalState from '../contexts/GlobalState';

const Library = (props) => {
    const [state, setState] = useContext(GlobalState);

    const getSongs = () => {
        getLibrary().then(response => {
            if (response.status === 200) {
                const data = response.data;
                setState(state => ({...state, queue: data}));
            }
        });
    };

    useEffect(() => {
        getSongs()
    }, []);

    
    return (
        <div>
            <SongList/>
        </div>
    )

}

export default Library;