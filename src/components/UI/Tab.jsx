import React from 'react'
import Paragraph from './Paragraph';
import { useState } from "react";

function Tab(props) {
    // const [Open, setOpen] = useState(false);
    // const handleClick = () => {
    //   setOpen(!Open);
    // };
    return (
      <>
        <div className=" row py-2">
          <div className="col-xl-12 tabs_faq">
            <Paragraph className="m-0 title">{props.title}</Paragraph>
            <button className="none_button" onClick={props.handleClick}>
              {props.Open ? (
                <svg
                  className="none_button"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3.75 12H20.25"
                    stroke="#BDBDBD"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 3.75V20.25"
                    stroke="#BDBDBD"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="none_button"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3.75 12H20.25"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={
              props.Open ? "faq_dropdown py-4" : "faq_dropdown py-4 open"
            }
          >
            <Paragraph className="faq_desc">{props.desc}</Paragraph>
            <div className="py-2">
              <Paragraph className="faq_desc">{props.list}</Paragraph>
              <Paragraph className="faq_desc">{props.list1}</Paragraph>
              <Paragraph className="faq_desc">{props.list2}</Paragraph>
            </div>
          </div>
        </div>
      </>
    );
}

export default Tab
