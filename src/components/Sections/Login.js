import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { Link } from 'react-router-dom';


export default function LoginSection() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (
        formData.email.trim() === '' ||
        formData.password.trim() === ''
    ) {
        setError('Please fill in all fields.');
        return; // Prevent submission
    }

    setError('');
    setSuccess(false);

    try {
        setLoading(true);

        const response = await axios.post('https://browse-index.com/server/login.php', formData);
const zana = response.data.login;
const code = response.data.code;
const note = response.data.note;

localStorage.setItem('loginData', JSON.stringify(response.data));
        if (zana === "success") {
                      window.location.href = "/dashboard";
            setLoading(false);
            setError('');
            
            setFormData({
                email: '',
                password: '',
            });

        }else if(code=== '50'){
          
          window.location.href= "https://browse-index.com/verify";
        } else {
            setLoading(false);
            setError(note);
        }
        
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
            <h1 className="font40 flexCenter extraBold">Login</h1>
            <p className="font13 flexCenter">
             Explore different services we offer by logging 
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form>
                            <label className="font13">Email:</label>
            <input type="email" name="email" onChange={handleChange}  required/>
            
                <label className="font13">Enter Password:</label>
                            <input type="password" name="password"  onChange={handleChange} required />
              <Link to ="/forgot">
<p> forgot password? </p>
</Link>
              </Form>
              <SumbitWrapper className="flex">
            <button
            onClick ={handleSubmit}
                type="submit"
                className='bo'
                disabled={loading}
            >
                {loading ? 'Processing...' : "Login"}
            </button>
            {/* Error Message */}

              </SumbitWrapper>
                          <p> Don't have an account? <Link to = "/signup"><span style={{color:"red"}}>Signup</span></Link></p>
                          <br></br>  <br></br>
                          <p> <Link to="/terms"><span style={{ color: "red", float:"left" }}>Terms of use</span></Link>   <Link to="/privacy-policy"><span style={{ color: "red", float:"right" }}>Privacy policy</span></Link></p>
                          <br></br>
            {error && <p className="red">{error}</p>}
            {/* Success Message */}
            {success && <p className="green">Message sent successfully!</p>}
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
  input{
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
   
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;

const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;









