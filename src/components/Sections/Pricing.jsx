import React from "react";
import styled from "styled-components";
// Components
import PricingTable from "../Elements/PricingTable";

export default function Pricing() {
  return (
    <Wrapper id="pricing">
      <div className="whiteBg">
        <div className="container">

          <TablesWrapper className="flexSpaceNull">
          <TableBox>
                        <PricingTable
                action="contact@gmail.com"
               actionText="Email us"
                price=""
                title="IndEx Economy"
                text="Paid per individual project you work on"
                offers={[
                  { name: "Access to project resources i.e., project briefs, links, and explainer videos where available", cheked: true },
                  { name: "Team of up to 5 students", cheked: true },
                  { name: "Brainstorm ideas and develop mock-ups or designs.", cheked: true },
                  { name: "Upload and share designs or mock-ups with industry.", cheked: true },
                  { name: "Students receive comments and/or feedback from industry and academic supervisors.", cheked: true },
                ]}
                 
              />
            </TableBox>
            <TableBox>
              <PricingTable
               action="contact@gmail.com"
               actionText="Email us"
                price=""
                title="IndEx plus"
                text="Everything in the Economy Plan and:"
                offers={[
                  { name: "Limited student team and or students", cheked: true },
                  { name: "Students receive 2-4 hours of industry engagement via Teams or Zoom", cheked: true },
                  { name: "Ratings of the student industry experience through surveys", cheked: true },
                  { name: "Regular monitoring of the student progress against expectations", cheked: true },
                  { name: "Students present final output to industry.", cheked: true },



                ]}
                 
              />
          </TableBox>
        
            <TableBox>
<PricingTable
  
  price=""
  title="IndEx Enterprise"
  action ="https://ni-experiences.com/support@ni-experiences.com"
  actionText= "Email us"
  text="Everything in the Plus Plan and"
  offers={[
    { name: "Custom student teams", cheked: true },
    { name: "Project collaboration with students from another education provider or country or culture", cheked: true },
    { name: "Students and academics work on projects of their choice.", cheked: true },
    { name: "On-ground student project support through user research", cheked: true },
    { name: "Custom in-person or remote experiences.", cheked: true },
  ]}
   
/>
</TableBox>
          </TablesWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 50px 0;
`;
const HeaderInfo = styled.div`
  margin-bottom: 50px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const TablesWrapper = styled.div`
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const TableBox = styled.div`
  width: 31%;
  @media (max-width: 860px) {
    width: 100%;
    max-width: 370px;
    margin: 0 auto
  }
`;




