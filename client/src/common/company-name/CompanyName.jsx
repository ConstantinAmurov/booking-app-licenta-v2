import React from 'react';
import { Link } from 'react-router-dom';

const CompanyName = (props)=>{
    return (
        <div className="companyName">
                    <Link className="companyNameLink" to="/">
                    <div className="company_symbol">
                    B
                    </div>
                    Booking.app
            </Link>
                </div>
    )
}
export default CompanyName