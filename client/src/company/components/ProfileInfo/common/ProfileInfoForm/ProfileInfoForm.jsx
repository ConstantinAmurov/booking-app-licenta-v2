import { Field, Form, Formik } from 'formik';
import React from 'react';
import CustomButton from '../../../../../common/custom-button/CustomButton';
import FormInput from '../../../../../common/form-input/FormInput';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { changePasswordThunk } from '../../../../../user/redux/user-thunk';

const ProfileInfoForm = ({...props})=>{
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        newPassword: Yup
        .string()
        .required('Please Enter your password')
        .min(6, 'Min length: 6 Characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain: One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        oldPassword: Yup
            .string()
            .required('Please Enter your password')
            .min(6, 'Min length: 6 Characters')
    })

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        auth:'',
    }


    const handleSubmit =  ({newPassword,oldPassword}, {setErrors,resetForm}) => {
        dispatch(changePasswordThunk(newPassword,oldPassword)).then(response=>{
            alert(response.data.data);
            console.log(response);
            resetForm();
           
        }).catch(err =>{
            const error = err?.response?.data?.error
            setErrors({oldPassword: error});
            
        })
        
    }

    
    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {
                formProps =>(
                    <Form>

                        <Field
                            component={FormInput}
                            label="+6 Character"
                            type="password"
                            forpassword="true"
                            name="oldPassword"
                            inputname="Old password:"
                        />

                        <Field
                            component={FormInput}
                            label="+6 Character"
                            type="password"
                            forpassword="true"
                            name="newPassword"
                            inputname="New password:"
                        />
                        <CustomButton type="submit">Change password</CustomButton>

                    </Form>
                    )
                
            }

            
        </Formik>
    )
}

export default ProfileInfoForm;