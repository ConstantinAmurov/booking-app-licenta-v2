import React from 'react';
import './ProfileMenu.css'

import {ReactComponent as DashboardImage } from '../../../../assets/images/dashboard/Dashboard.svg';

import {ReactComponent as ServiceImage } from '../../../../assets/images/dashboard/Service.svg';
import {ReactComponent as BookingImage } from '../../../../assets/images/dashboard/Booking.svg';
import { useHistory, useLocation } from 'react-router';
import CompanyName from '../../../company-name/CompanyName';
const ProfileMenu = (props) => {
    return (
<>
            <CompanyName />

            <MenuItem  {...props} Component={DashboardImage} title="Dashboard"/>
            <MenuItem  {...props} Component={ServiceImage} title="Service" />
            <MenuItem  {...props} Component={BookingImage} title="Booking" />

       </>
    )
}


const MenuItem = ({Component,...props})=>{

    const location = useLocation();
    const thisPath = location.pathname.split('/')[2];
    const history = useHistory();
    return (

            <div onClick={() => { history.push(`/profile/${props.title.toLowerCase()}`) }} className={`menuItem ${thisPath?.toUpperCase() === props.title.toUpperCase() ? "active-menu-item" : ''}`}>
                <div className="menu_item_container">

                    <div className="item_logo">
                        <Component stroke={`${thisPath?.toUpperCase() === props.title.toUpperCase() && "#666"}`} style={{}}/>
                    </div>

                    <div className="item_text">
                        {props.title}
                    </div>
                </div>

            </div>
    )
}
export default ProfileMenu