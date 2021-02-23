import axios from 'axios';
import { ENDPOINTS } from './constants';

export const getLibrary = () => {
    try {
        return axios.get(ENDPOINTS.library);
    } catch (error) {
        console.log(error);
    }
};

export const getArtists = () => {
    try {
        return axios.get(ENDPOINTS.artists);
    } catch (error) {
        console.log(error);
    }
}

export const getStreamingUrl = (songId, quality) => {
    try {
        return axios.get(ENDPOINTS.streamSong, { params: { id: songId, quality: quality } });
    } catch (error) {
        console.log(error);
    }
};

export const addToLibrary = (addSongDetails) => {
    try {
        return axios.post(ENDPOINTS.addToLibrary, addSongDetails);
    } catch (error) {
        console.log(error);
    }
}

export const editSong = (editSongDetails) => {
    try {
        return axios.put(ENDPOINTS.editSong, editSongDetails);
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