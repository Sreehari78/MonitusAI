"use client";

import Image from "next/image";
import Exclude from "../../public/exclude.svg";
import Underline from "../../public/Underline.svg";
import RightArrow from "../../public/Arrow-forward.svg";
import Features1 from "../../public/Features-1.png";
import Features2 from "../../public/Features-2.png";
import Features3 from "../../public/Features-3.png";
import { motion as m } from "framer-motion";
import "./styles/Features.css";

const Features = () => {
  return (
    <>
      <div className='features overflow-x-hidden'>
        <div className='f-heading'>Key Features</div>
        <div className='Underline'>
          <Image src={Underline} alt='Underline' />
        </div>
        <div className='Feature-1'>
          <div className='f-content'>
            <div className='f-head'>Predict Possible ADR's</div>
            <div className='f-text'>
              <ul>
                <li>
                  <Image src={Exclude} alt='Exclude Icon' /> Give prescription
                  predict ADR's
                </li>
                <li>
                  <Image src={Exclude} alt='Exclude Icon' /> Predict possible
                  Drug-Drug Interactions
                </li>
                <li>
                  <Image src={Exclude} alt='Exclude Icon' /> Predict the
                  severity of ADR's
                </li>
              </ul>
              <button className='f-btn'>
                Predict <Image src={RightArrow} alt='Right Arrow' />
              </button>
            </div>
          </div>
          <m.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='f-image'>
            <Image src={Features1} alt='Features1' />
          </m.div>
        </div>
        <div className='Feature-2'>
          <m.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='f-image'>
            <Image src={Features2} alt='Features2' />
          </m.div>
          <div className='f-content'>
            <div className='f-head'>Report ADR's</div>
            <div className='f-text'>
              <ul>
                <li>
                  <Image src={Exclude} alt='Exclude Icon' /> Report observed
                  ADR's in patients.
                </li>
                <li>
                  <Image src={Exclude} alt='Exclude Icon' /> Report ADR's in
                  observed ADR's
                </li>
              </ul>
              <button className='f-btn'>
                Report <Image src={RightArrow} alt='Right Arrow' />
              </button>
            </div>
          </div>
        </div>
        <div className='Feature-1'>
          <div className='f-content'>
            <div className='f-head'>Upload EHR and predict ADR's</div>
            <div className='f-text'>
              <ul>
                <li>
                  <Image src={Exclude} alt='Exclude Icon' /> Give prescription
                  and predict ADR's
                </li>
                <li>
                  <Image src={Exclude} alt='Exclude Icon' /> Predict possible
                  Drug-Drug Interactions
                </li>
                <li>
                  <Image src={Exclude} alt='Exclude Icon' /> Predict the
                  severity of ADR's
                </li>
              </ul>
              <button className='f-btn'>
                Upload <Image src={RightArrow} alt='Right Arrow' />
              </button>
            </div>
          </div>
          <m.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='f-image'>
            <Image src={Features3} alt='Features3' />
          </m.div>
        </div>
      </div>
    </>
  );
};

export default Features;
