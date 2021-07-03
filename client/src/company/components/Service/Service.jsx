import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CustomLoader from '../../../common/loader/Loader';
import { getIsLoadingCompanies, getMyCompanies } from '../../../selectors/selectors';
import CompanyWithServices from './CompanyWithServices/CompanyWithServices';


const Service = ({ ...props }) => {

    const myCompanies = useSelector(getMyCompanies);
    const isLoadingCompanies = useSelector(getIsLoadingCompanies);

    return (
        <Container fluid>

            <h2 className="section_title">Service</h2>
            {
                isLoadingCompanies ?
                    <CustomLoader />
                    :
                    <Row className="my_companies">
                        {
                            myCompanies.map(company => {
                                return (
                                    <CompanyWithServices key={company._id} company={company} />
                                )
                            })
                        }
                        {myCompanies.length === 0 && "There are no services"}
                    </Row>
            }
        </Container>

    )
}


export default Service;