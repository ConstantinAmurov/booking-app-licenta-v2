import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import ReserveTable from '../ReserveTable/ReserveTable';
import FormInput from '../../../common/form-input/FormInput';
import * as Yup from 'yup';
import CustomButton from '../../../common/custom-button/CustomButton';
import { Col, Container, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enGb from 'date-fns/locale/en-GB';
import { registerLocale } from 'react-datepicker';
registerLocale('en-gb', enGb);

const MainPageReservation = ({companyWithService,handleSubmitTableReservation, isPopUpOpen,setPopUpForUserInfo,trigger, setPopUpOpen,...props}) =>{
    
    const initialValues = {
        guestNumber: 1,
    }
    
    const validationSchema = Yup.object().shape({
        guestNumber: Yup.number().min(1, 'Min number of clinets is 1').required('This field is required'),
    })
    const [periodReservedTime,setPeriodReservedTime] = useState(-1);

    const [selectedDay,setSelectedDay] = useState(new Date());

    const isWeekday = date => {
        const day = new Date(date).getDay() - 1 === -1 ? 6 : new Date(date).getDay() - 1;
        const dayofWeekString = Object.keys(companyWithService.servicePeriods.byAdmin[day])[0];
        const selectedbyAdmin = [...companyWithService.servicePeriods.byAdmin[day][dayofWeekString]];


        return selectedbyAdmin.length !== 0;

    };


    return (

        <Container fluid>
            {companyWithService && <Formik onSubmit={(val,formProps)=>handleSubmitTableReservation({guestNumber:val.guestNumber,time:periodReservedTime},formProps)} validationSchema={validationSchema} initialValues={initialValues}>
                {
                    formProps =>{
                         
                        return (

                            <Form >
                            <div className="main_date_picker">

                                <div className="react_date_piker_container">
                                <div className="input_name">Chose a date</div>
                                    <DatePicker

                                        selected={selectedDay}
                                        onChange={date => setSelectedDay(date)}
                                        minDate={new Date()}
                                        locale="en-gb"
                                        
                                        filterDate={isWeekday}
                                        className="react_date_piker"
                                        placeholderText="Select a date other than today or yesterday"
                                        />
                                </div>

                                <Field
                                    component={FormInput}
                                    inputname="Number of clients"
                                    type="number"
                                    min="1"
                                    max="10"
                                    name="guestNumber"
                               />
                            </div>
                            <ReserveTable formProps={formProps} nrOfGuestsSelectedFromClient={formProps.values.guestNumber} periodReservedTime={periodReservedTime} setPeriodReservedTime={setPeriodReservedTime} selectedDay={selectedDay} companyWithService={companyWithService}/>
                            
                            { formProps.errors.time && <div className="error_message_reservation">{formProps.errors.time}</div>}
                            <Row className="mt-4">

                            <Col xs={12} sm={6} className="mb-2">
                            <CustomButton onClick={()=>{setPopUpOpen(false)}}>Go Back</CustomButton>
                            </Col>
                            <Col xs={12} sm={6} className="mb-2">

                            <CustomButton type="submit">Send Booking</CustomButton>

                           </Col>
                            </Row>
                        
                            </Form>
                        )
                    }
                }
            </Formik>}
        </Container>

    )
}

export default MainPageReservation;