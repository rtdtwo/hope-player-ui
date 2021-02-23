const storage = window.localStorage;

export const getStreamQuality = () => {
    return storage.getItem("streamQuality");
}

export const setStreamQuality =(quality) => {
    storage.setItem("streamQuality", quality)
} 