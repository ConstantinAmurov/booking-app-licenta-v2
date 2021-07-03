import React from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAuthStatus, getCurrentUser } from '../../../../selectors/selectors';
import { logOutThunk } from '../../../../user/redux/user-thunk';
import CustomLoader from '../../../loader/Loader';
import Logo from './../../../../assets/images/dashboard/profileLogo.jpg'
import './Header.css'

const Header = (props) => {

    const history = useHistory();

    const signOut = () => {
        dispatch(logOutThunk());

        history.push('/auth/login');
    }

    const user = useSelector(getCurrentUser);
    const isAuth = useSelector(getAuthStatus);

    const dispatch = useDispatch();



    return (
        <div className="header">
            <div className="header_container">
                <div className="header_options">
                        {
                            !isAuth ?
                            <CustomLoader forHeader="true"/>
                            : <div className="option">

                               <div onClick={()=>history.push('/profile')} className="header_profile">
                                     <div className="header_user_image">
                                        <img src={Logo} alt="dd"/>
                                     </div>
                                     <div className="header_profile_info">
                                         <div className="header_user_name">{`${user.name} ${user.surname}`}</div>
                                         <div className="header_status">{user?.name && "Admin" }</div>
                                     </div>
                               </div>

                            <div className="header_logout_container">
                                {<button className="logout_button" onClick={signOut} to='/auth/login'>Log out</button>}
                            </div>

                        </div>
                        }
                </div>
            </div>
        </div>
    )
}

export default Header;