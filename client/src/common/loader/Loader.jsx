import './loader.css'
import React from 'react';

const CustomLoader = ({forHeader, ...props}) => {
    const customSpinner = {
        position: "absolute",
        width: forHeader ? "33.45px" : "133.45px" ,
        height: forHeader ? "33.45px" :  "133.45px",
        border: `${forHeader ? "3.84px" : "7.85px"} solid #EF6313`,
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "ldio-vc4po5fbyr 0.819672131147541s linear infinite",
        top: "78.5px",
        left: "78.5px",
        boxSizing: "content-box",
      }


    return (
        <div className="loadingio-spinner-rolling-phnpmm1bi8f">
            <div className="ldio-vc4po5fbyr">
                <div style={customSpinner}></div>
            </div>
        </div>
    )
}
export default CustomLoader;

