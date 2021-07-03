import { chatApi } from "../../../../api/chatApi";
import { setMessagesAC } from "./chatws-action-creator";

let _newMessageHandler = null;

const newMessageHandlerCreator = (dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {

            dispatch(setMessagesAC(messages))
        }
        return _newMessageHandler;
    }
}


export const startMessagesListeningThunk = () => async (dispatch) => {
    chatApi.start();
    chatApi.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListeningThunk = () => async (dispatch) => {

    chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
    // chatApi.stop();
}
export const sendMessageThunk = (message) => async (dispatch) => {

    chatApi.sendMessage(message);
}
