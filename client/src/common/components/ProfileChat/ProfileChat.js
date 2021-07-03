import { Field, Form, Formik } from 'formik';
import './profilechat.css'
import React, { useEffect } from 'react';
import CustomButton from '../../custom-button/CustomButton';
import FormInput from '../../form-input/FormInput';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Image, Row } from 'react-bootstrap';
import { sendMessageThunk, startMessagesListeningThunk, stopMessagesListeningThunk } from './redux/chatws-thunk';
import userImg from '../../../assets/images/dashboard/profileLogo.jpg'

const ProfileChat = ({ ...props }) => {

    const dispatch = useDispatch();

    const messages = useSelector((state) => state.chatws.messages);
    console.log(messages);

    useEffect(() => {
        dispatch(startMessagesListeningThunk())
        return () => {
            dispatch(stopMessagesListeningThunk());
        }
        // eslint-disable-next-line
    }, [])


    const validationSchema = Yup.object().shape({
        message: Yup
            .string()
    })

    const initialValues = {
        message: '',
    }


    const handleSubmit = ({ message }, { setErrors, resetForm }) => {
        dispatch(sendMessageThunk(message));
        resetForm();
    }


    return (
        <div className="company_box profile_chat h-100 position-relative">

            <div className="messages_ws_container custom_scrollbar">
                <div className="messages_ws">
                    {
                        messages.map((message,ind) =>{
                            return (
                                <div key={ind} className="message">
                                    <Row>
                                        <Col xs={2}>
                                            <Image  className="img-responsive small_img_user" src={message.photo ? message.photo : userImg } alt="User Photo"/>
                                        
                                        </Col>
                                        <Col>
                                        {
                                            message.userName
                                        }
                                        </Col>
                                        <Col xs={12}>
                                        {
                                            message.message
                                        }
                                        </Col>
                                    </Row>
                                  
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="position-absolute bottom-0 start-50 translate-middle-x w-100">

                <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                    {
                        formProps => (
                            <Form>
                                <Row>
                                    <Col xs={12}>
                                        <Field
                                            component={FormInput}
                                            label="Your Message"
                                            type="text"
                                            name="message"
                                        />
                                    </Col>

                                    <Col xs={3}>
                                        <CustomButton type="submit">Send</CustomButton>
                                    </Col>
                                </Row>

                            </Form>
                        )

                    }


                </Formik>
            </div>
        </div>
    )
}

export default ProfileChat;