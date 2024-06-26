import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
// Assets


export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        university: '',
        email: '',
        message: '',
        phoneNumber: '',
        primaryInterest: ''
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
        formData.name.trim() === '' ||
        formData.email.trim() === '' ||
        formData.university.trim() === '' ||
        formData.primaryInterest.trim() === '' ||
        formData.message.trim() === ''
    ) {
        setError('Please fill in all fields.');
        return; // Prevent submission
    }
 setError('');
 setSuccess(false)
    try {
        setLoading(true);

    const response =   await axios.post('https://browse-index.com/server/contact.php', formData);

        setFormData({
            name: '',
            university: '',
            email: '',
            message: '',
            phoneNumber: '',
            primaryInterest: ''
        });

        setLoading(false);
        setError('');
        setSuccess(true);
        console.log(response)
    } catch (error) {
        setError('An error occurred. Please try again.');
        setLoading(false);
    }
};
    
  
  
  
  
  return (
    <Wrapper id="contact">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Let's get in touch</h1>
            <p className="font20">
              Contact us via email <a  className=" extraBold" href="hello@browse-index.com">hello@browse-index.com</a> or use the form  below, as we'd love to talk with you to see how we can support you and collaborate.

            </p>

          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form>
                <label className="font20">Full name:</label>
            <input type="text" name="name" onChange={handleChange}
            required/>

                <label className="font20">Email:</label>
                            <input type="email" name="email"  onChange={handleChange} required />
                                            <label className="font20">Institution:</label>
            <input type="text" name="university"  onChange={handleChange} required/>
                
                <select
                    name="primaryInterest"
                    
                    style={{fontSize:"1rem"}}
                    onChange={handleChange}
                    className='border-none rounded-lg outline-none w-full h-[50px] focus:outline-none text-color3 pr-4 pl-9 py-1'
                    required
                >
                    <option value="" disabled selected hidden>Primary Interest*</option>
                    <option value="student">I am a student looking for an industry experience.</option>
                    <option value="academic">I am an academic looking for industry opportunities for our students.</option>
                    <option value="industry">I am an industry representative with projects students can work on.</option>
                </select>
                                <label className="font20">Subject:</label>
<textarea
    rows="4"
    cols="50"
    id="message"
    name="message"
    className="font20 extraBold"
    // Bind value to formData.message
    onChange={handleChange}   // Add onChange event handler
/>
              </Form>
              <SumbitWrapper className="flex">
            <button
            onClick ={handleSubmit}
                type="submit"
                className='bo'
                disabled={loading}
            >
                {loading ? 'Processing...' : "submit"}
            </button>
            {/* Error Message */}

              </SumbitWrapper>
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
  margin-top: 100px;
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
  input,select,
  textarea {
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

const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;









