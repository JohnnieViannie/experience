import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

export default function VerifySection() {
    const [step4Data, setStep4Data] = useState({
        code: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [randomCode, setRandomCode] = useState('');

    useEffect(() => {
        // Function to generate and send verification code to user's email
        async function sendVerificationCode() {
          const myData = localStorage.getItem('loginData');
const loginData = JSON.parse(myData);

            try {
                setLoading(true);
                // Generate random code
                const randomCode = Math.floor(Math.random() * 9000) + 1000;
                setRandomCode(randomCode);
                // Send code to user's email (not implemented in this example)
                setLoading(false);
                setSuccess(true); 

                
                        const via = await axios.post('https://browse-index.com/server/verify.php', {
            code: randomCode,
            email: loginData.email,
            name: loginData.name,
        });
        
                
                
            } catch (error) {
                setError('Failed to send verification code. Please try again.');
                console.log(error)
                setLoading(false);
            }
        }
        sendVerificationCode(); // Trigger function when component mounts
    }, []);

    const handleStep4Change = (e) => {
        const { name, value } = e.target;
        setStep4Data(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (parseInt(step4Data.code) === randomCode) {
                // Code entered by user matches the generated code
                const myData = localStorage.getItem('loginData');
const loginData = JSON.parse(myData);
                const res = await axios.post('https://browse-index.com/server/update_verify.php', {
                    email: loginData.email,
                    // Include any necessary data to identify the user

                });

                if (res.data.code === '100') {
                    // Verification successful, redirect user
                   window.location.href = 'https://browse-index.com/login';
                } else {
                    setError('Verification failed. Please try again.');
                }
            } else {
                setError('Invalid code');
            }
            setLoading(false);
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
                        <h1 className="font40 textCenter extraBold">Verify </h1>
                        <p className="font13 textCenter">
                            Verify your account to continue
                        </p>
                    </HeaderInfo>
                    <div className="row" style={{ paddingBottom: "30px" }}>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <Form>
                                <input type="text" name="code" value={step4Data.code} onChange={handleStep4Change} placeholder="Enter code" required />
                                <div className="button-container">
                                    <button onClick={handleVerify} disabled={loading || !step4Data.code}>{loading ? 'Processing...' : 'Submit'}</button>
                                </div>
                            </Form>
                            {error && <p className="red">{error}</p>}

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