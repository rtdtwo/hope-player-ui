export const editAccess = () => {
    return process.env.HOPE_PLAYER_EDIT_ACCESS === 1
}

export const serverUrl = () => {
    return process.env.HOPE_PLAYER_SERVER_URL
}