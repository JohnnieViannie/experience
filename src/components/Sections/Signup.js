import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function SignupSection() {
    const [step, setStep] = useState(1);
    const [MyEmail, setMyEmail] = useState('');
    const [Code, setCode] = useState('');
    const [step1Data, setStep1Data] = useState({
        name: '',
        university: ''
    });
    
    const [step2Data, setStep2Data] = useState({
        email: '',
        phoneNumber: ''
    });
    const [step3Data, setStep3Data] = useState({
        primaryInterest: '',
        password: ''
    });
    const [step4Data, setStep4Data] = useState({
        code: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleStep1Change = (e) => {
        const { name, value } = e.target;
        setStep1Data(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleStep2Change = (e) => {
        const { name, value } = e.target;
        setStep2Data(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handlePhoneChange = (value) => {
        setStep2Data(prevData => ({
            ...prevData,
            phoneNumber: value
        }));
    };

    const handleStep3Change = (e) => {
        const { name, value } = e.target;
        setStep3Data(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleStep4Change = (e) => {
        const { name, value } = e.target;
        setStep4Data(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (parseFloat(Code) === parseFloat(step4Data.code)) {
            try {
                setLoading(true);
                setSuccess(false);
                const via = await axios.post('https://browse-index.com/server/update_verify.php', {
                    email: MyEmail,
                });

                if (via.data.code === '100') {
                    window.location.href = 'https://browse-index.com/login';
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setError('Invalid code');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
            if (step1Data.name.trim() === '' || step1Data.university.trim() === '') {
                setError('Please fill in all fields.');
                return;
            }
        } else if (step === 2) {
            if (step2Data.email.trim() === '' || step2Data.phoneNumber.trim() === '') {
                setError('Please fill in all fields.');
                return;
            }
        } else if (step === 3) {
            if (step3Data.primaryInterest.trim() === '' || step3Data.password.trim() === '') {
                setError('Please fill in all fields.');
                return;
            }
        }

        setError('');
        setSuccess(false);

        try {
            setLoading(true);

            let formData = {};

            if (step === 1) {
                formData = { ...step1Data };
            } else if (step === 2) {
                formData = { ...step1Data, ...step2Data };
            } else if (step === 3) {
                formData = { ...step1Data, ...step2Data, ...step3Data };
            }

            const response = await axios.post('https://browse-index.com/server/signup.php', formData);

            if (response.data.success === true) {
                const randomNumber = Math.floor(Math.random() * 9000) + 1000;
                localStorage.setItem('randomNumber', randomNumber.toString());
                setCode(randomNumber);

                await axios.post('https://browse-index.com/server/verify.php', {
                    code: randomNumber,
                    email: formData.email,
                    name: formData.name,
                });

                if (step === 1) setStep1Data({ name: '', university: '' });
                else if (step === 2) setStep2Data({ email: '', phoneNumber: '' });
                else if (step === 3) setStep3Data({ primaryInterest: '', password: '' });

                setStep(4);
                setLoading(false);
                setError('');
                setSuccess(true);
                setMyEmail(formData.email);
            } else {
                setError('Email or Phone number already registered');
                setLoading(false);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.log(error);
            setLoading(false);
        }
    };

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1);
    };
    const handlePreviousStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    return (
        <Wrapper id="contact">
            <div className="whiteBg darkColor auth">
                <div className="container">
                    <HeaderInfo>
                        <h1 className="font40 extraBold">Create account</h1>
                        <p className="font13">Add details to continue</p>
                    </HeaderInfo>
                    <div className="row" style={{ paddingBottom: "30px" }}>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            {step === 1 && (
                                <Form>
                                    <input type="text" name="name" value={step1Data.name} onChange={handleStep1Change} placeholder="Full name" required />
                                    <input type="text" name="university" value={step1Data.university} onChange={handleStep1Change} placeholder="University" required />
                                    <div className="button-container">
                                        <button onClick={handleNextStep} disabled={!step1Data.name || !step1Data.university}>Next</button>
                                    </div>
                                </Form>
                            )}
                            {step === 2 && (
                                <Form>
                                    <input type="email" name="email" value={step2Data.email} onChange={handleStep2Change} placeholder="Email" required />
                                    <PhoneInput
                                        country={'ug'}
                                        value={step2Data.phoneNumber}
                                        onChange={handlePhoneChange}
                                        inputStyle={{ width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #707070', height: '30px', marginBottom: '30px' }}
                                    />
                                    <div className="button-container">
                                        <button onClick={handlePreviousStep} disabled={step === 1}>Previous</button>
                                        <button onClick={handleNextStep} disabled={!step2Data.email || !step2Data.phoneNumber}>Next</button>
                                    </div>
                                </Form>
                            )}
                            {step === 3 && (
                                <Form>
                                    <select name="primaryInterest" value={step3Data.primaryInterest} onChange={handleStep3Change} required>
                                        <option value="" disabled>Select Primary Interest</option>
                                        <option value="student">I am a student looking for an industry experience.</option>
                                        <option value="academic">I am an academic looking for industry opportunities for our students.</option>
                                        <option value="industry">I am an industry representative with projects students can work on.</option>
                                    </select>
                                    <input name="password" type="password" value={step3Data.password} onChange={handleStep3Change} placeholder="Password" required />
                                    <div className="button-container">
                                        <button onClick={handlePreviousStep} disabled={step === 1}>Previous</button>
                                        <button onClick={handleSubmit} disabled={loading || !step3Data.primaryInterest || !step3Data.password}>{loading ? 'Processing...' : 'Submit'}</button>
                                    </div>
                                </Form>
                            )}
                            {step === 4 && (
                                <Form>
                                    <input type="text" name="code" value={step4Data.code} onChange={handleStep4Change} placeholder="Enter code" required />
                                    <div className="button-container">
                                        <button onClick={handleVerify} disabled={loading || !step4Data.code}>{loading ? 'Processing...' : 'Submit'}</button>
                                    </div>
                                </Form>
                            )}
                            <p>Already have an account? <Link to="/login"><span style={{ color: "red" }}>Login</span></Link></p>
                                  <br></br>                      <p>By using indEx you agree to our <Link to="/terms"><span style={{ color: "red" }}>terms of use</span></Link> and  <Link to="/privacy-policy"><span style={{ color: "red" }}>privacy policy</span></Link></p>
                            {error && <p className="red">{error}</p>}
                            {success && <p className="green">Verification code has been sent to your email</p>}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
  width: 100%;
  height: 80%;
  position: relative;
  margin-top: 100px;
  display: flex;
  padding-bottom: 40px;
  justify-content: center;
  align-items: center;
  @media (max-width: 860px) {
    margin-top: 50px;
  }
`;

const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const Form = styled.form`
  padding: 70px 0 30px 0;
  input, select, textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;
