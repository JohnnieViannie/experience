import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

export default function ChangeSection() {
    const [step4Data, setStep4Data] = useState({
        npassword: '', 
        cpassword: '', 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState(''); // Changed from Email to email

    const handleStep4Change = (e) => {
        const { name, value } = e.target;
        setStep4Data(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email'); // Changed from Email to emailParam
        if (emailParam) {
            setEmail(emailParam);
        }
    }, []);
    
    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            // Check if password and confirm password match
            if (step4Data.npassword !== step4Data.cpassword) {
                setError('Password and confirm password must match.');
                setLoading(false);
                return; // Stop further execution
            }

            const res = await axios.post('https://browse-index.com/server/change_password.php', {
                email: email,
                nPassword: step4Data.npassword
            });
            console.log(res)
 window.location.href ='/login';
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <Wrapper id="contact">
            <div className="whiteBg darkColor auth">
                <div className="container">
                    <HeaderInfo>
                        <h1 className="font40 textCenter extraBold">Password  recovery</h1>
                        <p className="font13 textCenter">
                            Add details to continue
                        </p>
                    </HeaderInfo>
                    <div className="row" style={{ paddingBottom: "30px" }}>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <Form>
                                <input type="password" name="npassword" value={step4Data.npassword} onChange={handleStep4Change} placeholder="Enter password" required />
                                <input type="password" name="cpassword" value={step4Data.cpassword} onChange={handleStep4Change} placeholder="Confirm password" required />
                                <div className="button-container">
                                    <button onClick={handleVerify} disabled={loading || !step4Data.npassword || !step4Data.cpassword}>{loading ? 'Processing...' : 'Submit'}</button>
                                </div>
                            </Form>
                            {success && <p className="green">Password reset instructions have been sent to your email</p>}
                        <p className="red">{error}</p>
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
    marginTop: 50px;
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