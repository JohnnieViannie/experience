import React from 'react';
import "../../style/partner.css";


const educationData = [
  {
    icon: "5.png",
    type: "Education",
    title: "University of technology Sydney",
    description: "The University of Technology Sydney is the top ranked young university in Australia. They are known for their innovative teaching and are committed to practical innovation and research that benefit industry and society. They believe in social change to create a more just and equal .",
    githubLink: "https://github.com/",
    viewLink: "https://www.uts.edu.au/"
  },

  {
    icon: "p6.jpg",
    type: "educator",
    title: "UNSW",
    description: "UNSW is an Australian global university with a vision to improve lives globally, through innovative research, transformative education, and a commitment to a just society.",
    githubLink: "https://github.com/",
    viewLink: "https://www.unsw.edu.au/"
  },
    {
    icon: "y6.png",
    type: "Educator",
    title: "Gulu University",
    description: "Gulu University is a Public University located in Gulu City in Northern Uganda. The University aims at producing citizens with skills, attitude, and knowledge to positively transform the Ugandan communities.",
    githubLink: "https://github.com/",
    viewLink: "https://gu.ac.ug/"
  },
  {
    icon: "m8.png",
    type: "Educator",
    title: "UCL",
    description: "UCL is London’s global university operating with a commitment to excellence, innovation, and the promotion of understanding of all their activities including research, teaching, enterprise, and community engagement.",
    githubLink: "https://github.com/",
    viewLink: "https://www.ucl.ac.uk/"
  },

  // Add more project objects as needed
];


const ServiceBox = ({ icon, title, description}) => (
  <div className="ser-box">
 
    <span className="icon">
    <img className="icon" src={icon}/>
    </span>
    <div className="ser-content">
      
      <p className="para">{description}</p>
    </div>
  </div>
);


function Psection (){
  

const services = [
  { icon: 'm4.jpg', title: 'ASEI', description: 'ASEI is a science and technology social enterprise located in Fort Portal, Uganda. Through research, innovation, and enterprise, ASEI aims to promote transformative technology and build the capacity for it to be used in underserved education, clean energy and water markets' },
  { icon: 'https://developers.cyanase.lol/image/logh.png', title: 'Cyanase', description: 'Cyanase offers a wide range of investment products and solutions. They enable consumer facing fintechs to integrate wealth management and trading into their products in a frictionless and secure way.' },

];
const govt = [
  { icon: '7.jpeg', title: 'Fort-portal city', description: 'Fort Portal City is the administrative center of Kabarole District and Tooro Kingdom located at the foothills of Mountain Rwenzori. Among other objectives, the Fort Portal government aims to promote economic development through promotion of local tourism, culture, health, good environmental management and good governance.' },

];

const education= [
  {
    icon: "5.png",
    type: "Education",
    title: "UTS",
    description: "The University of Technology Sydney is the top ranked young university in Australia. They are known for their innovative teaching and are committed to practical innovation and research that benefit industry and society. They believe in social change to create a more just and equal world.",
    githubLink: "https://github.com/",
    viewLink: "https://www.uts.edu.au/"
  },

  {
    icon: "p6.jpg",
    type: "educator",
    title: "UNSW",
    description: "UNSW is an Australian global university with a vision to improve lives globally, through innovative research, transformative education, and a commitment to a just society.",
    githubLink: "https://github.com/",
    viewLink: "https://www.unsw.edu.au/"
  },
    {
    icon: "y6.png",
    type: "Educator",
    title: "Gulu University",
    description: "Gulu University is a Public University located in Gulu City in Northern Uganda. The University aims at producing citizens with skills, attitude, and knowledge to positively transform the Ugandan communities.",
    githubLink: "https://github.com/",
    viewLink: "https://gu.ac.ug/"
  },
  {
    icon: "m8.png",
    type: "Educator",
    title: "UCL",
    description: "UCL is London’s global university operating with a commitment to excellence, innovation, and the promotion of understanding of all their activities including research, teaching, enterprise, and community engagement.",
    githubLink: "https://github.com/",
    viewLink: "https://www.ucl.ac.uk/"
  },

  // Add more project objects as needed
];
return (
  <div className="serv">
  
    <div className="container">
    <p className="para">We are proud to engage with a range of businesses, education providers, governments, and a suite of other organisations to collaborate on delivering real world, immersive education experiences with the successful outcomes of each project having positive tangible benefits to the communities where the project operates. 
    </p>
                <h2 className="h2">Industry</h2>
      <div className="row">
        {services.map((service, index) => (
          <div className="col-md-4" key={index}>
            <ServiceBox {...service} />
          </div>
        ))}
      </div>
                  <h2 className="h2">Educators</h2>
            <div className="row">
        {education.map((service, index) => (
          <div className="col-md-4" key={index}>
            <ServiceBox {...service} />
          </div>
        ))}
      </div>

            <h2 className="h2">Government</h2>
            <div className="row">
        {govt.map((service, index) => (
          <div className="col-md-4" key={index}>
            <ServiceBox {...service} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default Psection;