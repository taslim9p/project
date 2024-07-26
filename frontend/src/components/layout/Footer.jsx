import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Footer() {
  return (
    <>
      <div
        className="text-white  flex flex-col md:flex-row items-center justify-center mt-4 p-4"
        style={{
          height: "auto",
          width: "100%",
          background:
            "linear-gradient(135deg,rgba(0, 0, 0, 1),rgba(76, 76, 75, 0.4))",
        }}
      >
        {/* <div className="flex flex-row md:flex-row items-center md:mr-48 mt-2 md:mt-0">
          <div className="flex flex-col items-center ">
          <FontAwesomeIcon icon={faDesktop} className="text-5xl" />
          <h1 className="text-3xl ml-2 mt-2 md:mt-5 underline">PCREX</h1>
          <div className="mt-16 font-light text-center">
            "trusted source for computer hardware"
          </div>
          </div>
        </div> */}

        <div className="md:mr-96  flex flex-col">
          <div className="flex flex-row md:flex-row md:mr-80 mr-8 justify-center">
            <FontAwesomeIcon icon={faDesktop} className="text-5xl ml-5" />

            <h1 className="text-3xl ml-1 mt-5 border-b-2">PCREX</h1>
          </div>
          <div className="md:mt-1 mt-4  md:ml-32  font-light">
            "trusted source for computer hardware "
          </div>
        </div>

        <div className="mt-4  text-center md:text-left">
          <h1 className="  text-2xl mb-4 font-light border-b-2">Contact Us</h1>
          <ul className="list-disc flex md:flex-col md:gap-1 flex-row gap-5 flex-wrap  justify-evenly items-start">
            <li>
              <h1 className="font-light">6356235698</h1>
            </li>
            <li>
              <h1 className="font-light">GANDHINAGAR</h1>
            </li>
            <li>
              <h1 className="font-light">ABC@GMAIL.COM</h1>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
