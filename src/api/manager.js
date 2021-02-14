import axios from 'axios';
import { ENDPOINTS } from './constants';

export const getLibrary = () => {
    try {
        return axios.get(ENDPOINTS.library);
    } catch (error) {
        console.log(error);
    }
};

export const getStreamingUrl = (songId) => {
    try {
        return axios.get(ENDPOINTS.streamSong, { params: { id: songId } });
    } catch (error) {
        console.log(error);
    }
};

export const addToLibrary = (songName, artist, url, tags) => {
    try {
        return axios.post(ENDPOINTS.addToLibrary, { name: songName, artist: artist, url: url, tags: tags });
    } catch (error) {
        console.log(error);
    }
}

export const editSong = (songName, artist, url, tags) => {
    try {
        return axios.post(ENDPOINTS.editSong, { name: songName, artist: artist, url: url, tags: tags });
    } catch (error) {
        console.log(error);
    }
}

export const deleteSong = (songId) => {
    try {
        return axios.delete(ENDPOINTS.deleteSong, { params: { id: songId } });
    } catch (error) {
        console.log(error);
    }
}