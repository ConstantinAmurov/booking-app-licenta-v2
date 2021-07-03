import { SET_MESSAGES } from "./chatws-reducer"

export const setMessagesAC = (messages) => {
    return {
        type: SET_MESSAGES,
        messages,
    }
}

