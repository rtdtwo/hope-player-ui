import axios from 'axios';
import { ENDPOINTS } from './constants';

export const getLibrary = () => {
    try {
        return axios.get(ENDPOINTS.library);
    } catch (error) {
        console.log(error);
    }
};

export const getStreamingUrl = (song_id) => {
    try {
        return axios.get(ENDPOINTS.streamSong, { params: { id: song_id } });
    } catch (error) {
        console.log(error);
    }
};

export const addToLibrary = (songName, artist, url) => {
    try {
        return axios.post(ENDPOINTS.addToLibrary, { name: songName, artist: artist, url: url });
    } catch(error) {
        console.log(error);
    }
}