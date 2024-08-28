import React from "react";
import MainHeaderWrapper from "../UI/MainHeaderWrapper";
import faq from "../../assets/images/FAQ.jpg";
import { useState } from "react";
import Tab from "../UI/Tab";
import Paragraph from "../UI/Paragraph";
const Faq = () => {
const [open1, setopen1] = useState(false);
const handleClick1 = () => {
    setopen1(!open1);
  };
const [open2, setopen2] = useState(false);
const handleClick2 = () => {
setopen2(!open2);
  };
const [open3, setopen3] = useState(false);
const handleClick3 = () => {
  setopen3(!open3);
};
const [open4, setopen4] = useState(false);
const handleClick4 = () => {
  setopen4(!open4);
};
const [open5, setopen5] = useState(false);
const handleClick5 = () => {
  setopen5(!open5);
};
const [open6, setopen6] = useState(false);
const handleClick6 = () => {
  setopen6(!open6);
};


  return (
    <>
      <div className="position-relative">
        <MainHeaderWrapper image={faq}>
          <div className="container text-center title_faq">
            <Paragraph className="title_head">FAQ</Paragraph>
          </div>
        </MainHeaderWrapper>
      </div>
      <div className="container py-5 ">
        <Tab
          title={" Make real time a health improvements ?"}
          handleClick={handleClick1}
          Open={!open1}
          desc={`Proactively envisioned multimedia based expertise crosses media
              growth strategies. Seamlessly visualize quality intelectual captal
              without superor collaboration idea sharing Holistically pontficate
              installed based portals after maintainabled products.
              Phosfluorescently engaged world wide methodologies with enabled
              Completely pursue scalable customer service through sustainable
              potentialities`}
          list={` 1. It brings the right people together with all the right
                information and tools to get work done`}
          list1={`  2. We provide operational efficiency, data security, and
                flexible scale`}
          list2={`   3. Your best work, together in one package that works seamlessly
                from your computer`}
        />
        <Tab
          title={" Make real time a health improvements ?"}
          handleClick={handleClick2}
          Open={!open2}
          desc={` Proactively envisioned multimedia based expertise crosses media
              growth strategies. Seamlessly visualize quality intelectual captal
              without superor collaboration idea sharing Holistically pontficate
              installed based portals after maintainabled products.
              Phosfluorescently engaged world wide methodologies with enabled
              Completely pursue scalable customer service through sustainable
              potentialities`}
          list={` 1. It brings the right people together with all the right
                information and tools to get work done`}
          list1={`  2. We provide operational efficiency, data security, and
                flexible scale`}
          list2={`   3. Your best work, together in one package that works seamlessly
                from your computer`}
        />
        <Tab
          title={" Make real time a health improvements ?"}
          handleClick={handleClick3}
          Open={!open3}
          desc={` Proactively envisioned multimedia based expertise crosses media
              growth strategies. Seamlessly visualize quality intelectual captal
              without superor collaboration idea sharing Holistically pontficate
              installed based portals after maintainabled products.
              Phosfluorescently engaged world wide methodologies with enabled
              Completely pursue scalable customer service through sustainable
              potentialities`}
          list={` 1. It brings the right people together with all the right
                information and tools to get work done`}
          list1={`  2. We provide operational efficiency, data security, and
                flexible scale`}
          list2={`   3. Your best work, together in one package that works seamlessly
                from your computer`}
        />
        <Tab
          title={" Make real time a health improvements ?"}
          handleClick={handleClick4}
          Open={!open4}
          desc={` Proactively envisioned multimedia based expertise crosses media
              growth strategies. Seamlessly visualize quality intelectual captal
              without superor collaboration idea sharing Holistically pontficate
              installed based portals after maintainabled products.
              Phosfluorescently engaged world wide methodologies with enabled
              Completely pursue scalable customer service through sustainable
              potentialities`}
          list={` 1. It brings the right people together with all the right
                information and tools to get work done`}
          list1={`  2. We provide operational efficiency, data security, and
                flexible scale`}
          list2={`   3. Your best work, together in one package that works seamlessly
                from your computer`}
        />
        <Tab
          title={" Make real time a health improvements ?"}
          handleClick={handleClick5}
          Open={!open5}
          desc={` Proactively envisioned multimedia based expertise crosses media
              growth strategies. Seamlessly visualize quality intelectual captal
              without superor collaboration idea sharing Holistically pontficate
              installed based portals after maintainabled products.
              Phosfluorescently engaged world wide methodologies with enabled
              Completely pursue scalable customer service through sustainable
              potentialities`}
          list={` 1. It brings the right people together with all the right
                information and tools to get work done`}
          list1={`  2. We provide operational efficiency, data security, and
                flexible scale`}
          list2={`   3. Your best work, together in one package that works seamlessly
                from your computer`}
        />
        <Tab
          title={" Make real time a health improvements ?"}
          handleClick={handleClick6}
          Open={!open6}
          desc={` Proactively envisioned multimedia based expertise crosses media
              growth strategies. Seamlessly visualize quality intelectual captal
              without superor collaboration idea sharing Holistically pontficate
              installed based portals after maintainabled products.
              Phosfluorescently engaged world wide methodologies with enabled
              Completely pursue scalable customer service through sustainable
              potentialities`}
          list={` 1. It brings the right people together with all the right
                information and tools to get work done`}
          list1={`  2. We provide operational efficiency, data security, and
                flexible scale`}
          list2={`   3. Your best work, together in one package that works seamlessly
                from your computer`}
        />
      </div>
    </>
  );
};

export default Faq;
