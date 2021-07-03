import React, { useEffect, useState } from 'react';
import './CompanyServices.css'
import { Field, FieldArray, Form, Formik, } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import ServiceAviabilityTable from '../ServiceAviabilityTable/ServiceAviabilityTable';
import { addServiceThunk, editServicesThunk } from '../../redux/company-thunk';
import FormInput from '../../../common/form-input/FormInput';
import CustomButton from '../../../common/custom-button/CustomButton';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


const CompanyServices = ({ services, editMode, companyID, ...props }) => {

    const dispatch = useDispatch();

    const [numberOfSetInitialValuesToSkip, setNumberOfInitialValuesToSkip] = useState(0);

    const [serviceAviability, setServiceAviability] = useState([[
        { mon: [] },
        { tue: [] },
        { wed: [] },
        { thu: [] },
        { fri: [] },
        { sat: [] },
        { sun: [] },
    ]]);

    useEffect(() => {
        if (editMode) {

            const list = services.map((service, index) => {
                return service.periods.byAdmin
            })
            setServiceAviability([...list]);
        }
        // eslint-disable-next-line
    }, [])

    const validationSchema = Yup.object().shape({
        services: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required("This field is requird"),
                    description: Yup.string().required("This field is requird"),
                    duration: Yup.number().min(20, "Min time is 20 min").max(480, "Max time is 480 min").required("This field is requird"),
                    space: Yup.number().min(1, "Min number of pers is 1 person").max(9, "Max guests: 9").required("This field is requird"),
                    price: Yup.number().min(1, "Min price of pers is 1 RON").required("This field is requird"),
                })
            )
    });

    const initialValues = editMode
        ? { services: [...services] }
        : {
            services: [{
                name: '',
                description: '',
                duration: 120,
                space: '',
                price: '',
                timeStart: '06:00',
                timeEnd: '23:00',
            }]
        }

    const handleChangePeriodStatus = (serviceNumber, dayOfWeek, intervalNumb, index) => {
        let serviceAviabilityCopy = [...serviceAviability];
        if (serviceAviabilityCopy[serviceNumber][index][dayOfWeek].indexOf(intervalNumb) === -1) {
            serviceAviabilityCopy[serviceNumber][index][dayOfWeek].push(intervalNumb)
            serviceAviabilityCopy[serviceNumber][index][dayOfWeek].sort((a, b) => { return a - b });

        } else {
            serviceAviabilityCopy[serviceNumber][index][dayOfWeek] = serviceAviabilityCopy[serviceNumber][index][dayOfWeek].filter((val) => {
                return val !== intervalNumb
            });
        }
        setServiceAviability(serviceAviabilityCopy)

    }

    const setInitialPeriods = (index, duration, timeStart, timeEnd) => {
        if (numberOfSetInitialValuesToSkip <= 1 && editMode) {
            setNumberOfInitialValuesToSkip(numberOfSetInitialValuesToSkip + 1);
            return 0
        }
        const periods = [];
        serviceAviability[index].forEach(dayOfWeek => {

            Object.keys(dayOfWeek).forEach(key => {
                periods.push(
                    {
                        [key]: key === "sat" || key === "sun" ? []
                            : getStartPeriods(duration, timeStart, timeEnd),
                    }
                )
            })
        });
        let list = [...serviceAviability];
        list[index] = periods
        setServiceAviability(list);
    }

    const getStartPeriods = (duration, timeStart, timeEnd) => {
        //RETURNEZ ORE PENTRU O ZI IN FUNCTIE DE NUMARUL DE ORE SI DURATIE
        let step = Number(duration) * 60000;


        const startWorkDay = new Date(`1970-01-01T${timeStart}:00`).getTime()
        const endWorkDay = new Date(`1970-01-01T${timeEnd}:00`).getTime()

        let periods = [];

        let sumOfStepAndTime = startWorkDay;
        while (true) {
            if (sumOfStepAndTime + step > endWorkDay) {
                break;
            }
            if (sumOfStepAndTime >= startWorkDay) {

                periods.push(sumOfStepAndTime)
                sumOfStepAndTime = sumOfStepAndTime + step;

            }

        }
        return periods;
    }

    const handleAddServiceClick = (push) => {

        setServiceAviability([...serviceAviability, [
            { mon: [] },
            { tue: [] },
            { wed: [] },
            { thu: [] },
            { fri: [] },
            { sat: [] },
            { sun: [] },
        ]]);
        push({
            name: '',
            description: '',
            duration: 120,
            space: '',
            price: '',
            timeStart: '06:00',
            timeEnd: '23:00',
        })
    }


    const handleSubmitServices = (value, { setErrors, ...formProps }) => {
        // debugger
        if (companyID) {

            const servicearr = value.services.map((service, index) => {
                return {
                    ...service,
                    periods: {
                        byAdmin: serviceAviability[index],
                        byGuests: [],
                    },
                }
            })

            props.setPopUpOpen(false);

            if (editMode)
                return dispatch(editServicesThunk({
                    services: servicearr,
                    servicesID: services.map(service => service._id),
                    companyID: companyID
                }))

            // debugger
            return dispatch(addServiceThunk({
                services: servicearr,
                companyID: companyID
            }))
        }
    }

    return (
        <div className="add_service_container">


            <Formik initialValues={initialValues} onSubmit={handleSubmitServices} validationSchema={validationSchema}>
                {
                    ({ values }) => {
                        return (
                            <Form className="dashboard_add_service">
                                {!companyID && <div className="error_message">Please save the company in the Profile menu if you want to add services</div>}

                                <FieldArray
                                    name="services">
                                    {
                                        ({ remove, push }) => {
                                            return (
                                                <>
                                                    {values.services.map((period, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <Row >
                                                                    <Col xs={12} lg={6}>
                                                                        
                                                                            <Field component={FormInput}
                                                                                label="Service name"
                                                                                type="text"
                                                                                name={`services.${i}.name`}
                                                                                inputname="Name"
                                                                            />
                                                                       
                                                                        
                                                                            <Field component={FormInput}
                                                                                label="Start time"
                                                                                type="time"
                                                                                name={`services.${i}.timeStart`}
                                                                                inputname="Start time" />
                                                                       
                                                                        
                                                                            <Field component={FormInput}
                                                                                label="End time"
                                                                                type="time"
                                                                                name={`services.${i}.timeEnd`}
                                                                                inputname="End time" />
                                                                       
                                                                    </Col>
                                                                    <Col xs={12} lg={6} className="service_input_container">
                                                                        <Field component={FormInput}
                                                                            label="Time in mins"
                                                                            type="number"
                                                                            name={`services.${i}.duration`}
                                                                            inputname="Duration"
                                                                        />
                                                                        <Field component={FormInput}
                                                                            label="Number of reservations for one hour"
                                                                            type="number"
                                                                            name={`services.${i}.space`}
                                                                            inputname="Space"
                                                                        />
                                                                        <Field component={FormInput}
                                                                            label="Price for service"
                                                                            type="number"
                                                                            name={`services.${i}.price`}
                                                                            inputname="Price"
                                                                        />
                                                                    </Col>
                                                                </Row>

                                                                <div>

                                                                    <Field component={FormInput}
                                                                        label="Service description"
                                                                        type="textarea"
                                                                        name={`services.${i}.description`}
                                                                        inputname="Description"
                                                                    />

                                                                </div>
                                                                <ServiceAviabilityTable setInitialPeriods={setInitialPeriods} formDataServices={period} handleChangePeriodStatus={handleChangePeriodStatus} serviceAviability={serviceAviability[i]} index={i} />

                                                            </div>
                                                        )
                                                    })}

                                                    <CustomButton type="submit" >Save Service</CustomButton>
                                                    <div className="addOtherServiceBtn">
                                                        {!editMode && serviceAviability.length < 100 && <span onClick={() => handleAddServiceClick(push)} >Add other services</span>}
                                                    </div>

                                                </>)
                                        }}

                                </FieldArray>
                            </Form>
                        )
                    }
                }
            </Formik>

        </div>
    )
}
export default CompanyServices


