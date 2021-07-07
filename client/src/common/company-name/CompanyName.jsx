import React from 'react';
import { Link } from 'react-router-dom';

import logo from "./Logo.svg"

const CompanyName = (props) => {
    return (
        <div className="companyName">
            <Link className="companyNameLink" to="/">
                <img src={logo}></img>
            </Link>
        </div>
    )
}
export default CompanyName