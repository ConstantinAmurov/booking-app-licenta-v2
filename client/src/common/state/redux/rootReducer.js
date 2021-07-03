import { combineReducers } from "redux";
import companyReducer from "../../../company/redux/company-reducer";
import guestReducer from "../../../guest/redux/guest-reducer";
import userReducer from "../../../user/redux/user-reducer";
import chatwsReducer from "../../components/ProfileChat/redux/chatws-reducer";

const rootReducer = combineReducers({
    profileInfo: userReducer,
    companies: companyReducer, 
    guest: guestReducer,
    chatws: chatwsReducer,
});

export default rootReducer
