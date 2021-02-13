import config from '../config.json'

const SERVER_BASE_URL = config.serverUrl;

export const ENDPOINTS = {
    library: SERVER_BASE_URL + "/library",
    streamSong: SERVER_BASE_URL + '/stream',
    addToLibrary: SERVER_BASE_URL + '/add',
    deleteSong: SERVER_BASE_URL + '/delete'
}