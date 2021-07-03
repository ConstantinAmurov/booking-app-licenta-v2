import React from 'react';
import './ProfileInfo.css'
import { useSelector } from 'react-redux';
import { getAuthStatus, getProfileInfo } from '../../../selectors/selectors';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ProfileInfoForm from './common/ProfileInfoForm/ProfileInfoForm';
import ProfileIMG from '../../../assets/images/dashboard/profileLogo.jpg'
import CustomLoader from '../../../common/loader/Loader';
// import ProfileChat from '../../../common/components/ProfileChat/ProfileChat';
const ProfileInfo = (props) => {
    const { user } = useSelector(getProfileInfo);
    const isAuth = useSelector(getAuthStatus);


    return (
        <Container fluid>

            <Row>
                <Col>

                    <h2 className="section_title">About Me</h2>

                </Col>
            </Row>


            {
                !isAuth
                    ? <CustomLoader />
                    :

                    <Row className="mt-1">
                        <Col xs={5}>
                            <Card className="company_box" style={{ padding: "0" }}>

                                <Card.Img variant="top" src={ProfileIMG} />
                                <Container>

                                    <div className="about_me_item">

                                        <div className="about_me_item_title">
                                            Full Name:
                        </div>
                                        <div className="about_me_item_info" >
                                            {`${user.surname} ${user.name}`}
                                        </div>

                                    </div>

                                    <div className="about_me_item">

                                        <div className="about_me_item_title">
                                            Email:
                        </div>
                                        <div className="about_me_item_info" >
                                            {user.email}
                                        </div>

                                    </div>

                                    <div className="about_me_item">

                                        <div className="about_me_item_title">
                                            Status:
                        </div>

                                        <div className="about_me_item_info" >
                                            Admin
                        </div>

                                    </div>

                                    {
                                        user.loginMethod === 1 && <ProfileInfoForm />
                                    }

                                </Container>
                            </Card>

                        </Col>
                        {/* <Col xs={4}>
                        <ProfileChat/>
                        </Col> */}
                    </Row>
            }


        </Container>
    )
}


export default ProfileInfo;