export const SET_MESSAGES = 'SET_MESSAGES';

const initialState = {
    messages: [],

}


const chatwsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        
        default:
            return {
                ...state
            }
    }
}
export default chatwsReducer;