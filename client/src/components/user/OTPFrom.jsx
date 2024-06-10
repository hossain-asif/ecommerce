
import React from 'react';
import UserStore from '../../store/UserStore';
import UserSubmitButton from './UserSubmitButton';
import ValidationHelper from './../../utility/ValidationHelper';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const OTPFrom = () => {

    let { OTPFormValue,OTPFormOnChange,VerifyLoginRequest } = UserStore();

    let navigate =  useNavigate();

    const onFormSubmit =async ()=>{
        if(ValidationHelper.IsEmpty(OTPFormValue.otp)){
            toast.error("Valid OTP require");
        }
        else{
            let res = await VerifyLoginRequest(OTPFormValue.otp);
            res ? navigate("/"):toast.error("Something went wrong");
        }

    }

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Verification Code</h4>
                        <p>A verification code has been sent to the email address you provide</p>
                        <input value={OTPFormValue.otp} onChange = {(e)=>{OTPFormOnChange("otp",e.target.value)}} placeholder="Verification" type="text" className="form-control" />
                        <UserSubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Submit" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPFrom;