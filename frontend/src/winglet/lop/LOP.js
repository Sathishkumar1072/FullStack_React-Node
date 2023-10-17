import React from "react";
import "./LOP.css";
import projectIcon from "../../assets/Project-icon.svg";
import POC from "../../assets/POC.svg";
import headset_Supportfrom from "../../assets/headset-Support.svg";

const LOP = () => {
  return (
    <div className="lop-container">
      <div className="headline">Level of papers</div>
      <div className="sublines">
        All categories augue interdum velit euismod in pellentesque massa
        placerat duis ultricies
      </div>
      <div className="service-container">
        <div className="service-box-items">
          <div className="service-box">
            <div className="service-icon">
              <img src={projectIcon} alt="serviceICon" />
            </div>
            <div className="service-headline">Project</div>
            <div className="service-sublines">
              Interdum velit euismod in pellentesque placerat augue
            </div>
          </div>
        </div>
        <div className="service-box-items">
          <div className="service-box">
            <div className="service-icon">
              <img src={POC} alt="serviceICon" />
            </div>
            <div className="service-headline">POC</div>
            <div className="service-sublines">
              Interdum velit euismod in pellentesque placerat augue
            </div>
          </div>
        </div>
        <div className="service-box-items">
          <div className="service-box">
            <div className="service-icon">
              <img src={headset_Supportfrom} alt="serviceICon" />
            </div>
            <div className="service-headline">Support</div>
            <div className="service-sublines">
              Interdum velit euismod in pellentesque placerat augue
            </div>
          </div>
        </div>
        {/* <div>POC</div>
        <div>Support</div> */}
      </div>
    </div>
  );
};

export default LOP;
