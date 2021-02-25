export const isMobile = window.innerWidth <= 768;

export const shufflePlaylist = (playlistToShuffle, currentSong) => {
    let shuffledQueue = [...playlistToShuffle];
    shuffledQueue = shuffledQueue.filter(data => data.id !== currentSong?.id);
    shuffledQueue.sort(() => Math.random() - 0.5);
    shuffledQueue.unshift(currentSong);
    return shuffledQueue;
}