import React, { use, useState } from 'react'
import headLogo from "../assets/headLogo(black).png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../contexts/Firebase';

const OtpVerification = () => {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [condition, setCondition] = useState("");
    const [otpSent, setOtpSent] = useState("Send OTP");
    const [counter, setCounter] = useState(0);
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [heading, setHeading] = useState("Verify your OTP");


    const sendOtp = () => {
        setCondition("Sending OTP...");

        try {
            const savedForm = localStorage.getItem("form");
            if (!savedForm) throw new Error("Form not found");

            const { email1 } = JSON.parse(savedForm);
            if (!email1) throw new Error("Email not found in form");

            if (!window.emailjs) throw new Error("EmailJS not loaded");
            window.emailjs.init('PNgXxZA71sWtcQHbm');

            const generated = Math.floor(100000 + Math.random() * 900000);
            setGeneratedOtp(generated);

            const form = document.createElement("form");
            [
                { name: "passcode", value: generated },
                { name: "time", value: new Date().toLocaleTimeString() },
                { name: "user_email", value: email1 }
            ].forEach(({ name, value }) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = name;
                input.value = value;
                form.appendChild(input);
            });

            window.emailjs.sendForm("service_3jx715u", "template_o6jxdkh", form)
                .then(() => {
                    setCondition("OTP Sent Successfully!");
                    setCounter(prev => prev + 1);
                    setOtpSent("Verify OTP");
                })
                .catch(() => setCondition("Failed to send OTP"));
        } catch (e) {
            console.error("OTP Error:", e);
            setCondition(e.message);
        }
    };

    const checkOtp = () => {
        if (otp === String(generatedOtp)) {
            setCounter(null);
            setHeading("OTP Verified!");

            try {
                const { email1, password1, name1, lastName1 } = JSON.parse(localStorage.getItem("form"));
                firebase.signupUserWithEmailAndPassword(email1, password1, name1, lastName1, navigate);
            } catch (error) {
                console.error("Signup after OTP error:", error);
                alert("Something went wrong.");
            }
        } else {
            alert("Invalid OTP");
        }
    };

    return (
        <div className='flex flex-col justify-center items-center px-[2rem]'>
            <div className='w-full tablet:w-[25rem] mx-auto bg-signin flex flex-col justify-center items-center py-[1.5rem] px-[2rem] mb-[2rem] mt-[7rem] shadow-lg rounded-2xl border-border border-[1px]'>
                <Link to='/account/signup' className='w-full flex flex-col'>
                    <div>
                        <FontAwesomeIcon icon={faArrowLeft} className='text-txt-black text-[1.3rem]' />
                    </div>
                </Link>
                <div className='flex flex-col items-center'>
                    <img src={headLogo} alt="logo" className='w-[6rem]' />
                </div>
                <div className='flex flex-col justify-center items-center text-center'>
                    <h2 className='font-Bold text-txt-black text-[1.4rem]'>{heading}</h2>
                    {heading != 'OTP Verified!' &&
                        <span className={`font-Regular text-center ${condition.includes("Successfully") ? "text-green-500" : "text-red-500"}`}>{condition}</span>
                    }
                </div>

                {counter !== 0 && counter !== null && (
                    <input
                        type="text"
                        className='font-Regular border-border w-full border-[1px] mt-[1rem] rounded-lg px-[0.8rem] py-[0.5rem] outline-txt-gray-black-black'
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                )}

                {heading != 'OTP Verified!' &&
                    <button
                        className='font-Regular mt-[1rem] bg-btn-blue hover:bg-hover-blue text-nav-white w-full py-[0.5rem] text-center cursor-pointer rounded-lg transition'
                        onClick={otpSent === "Send OTP" ? sendOtp : checkOtp}
                    >
                        {otpSent}
                    </button>
                }

                <Link
                    to={condition === "Otp Sent Successfully!!" ? ((JSON.parse(localStorage.getItem("form"))).role1 === "Founder" ? "/user/founder/profile" : "/user/investor/find-pitches") : `/account/signup`}
                    className={`w-full bg-btn-blue rounded-lg hover:bg-hover-blue text-center mt-[1rem] transition-all ${counter === null ? 'flex' : 'hidden'}`}
                >
                    <button
                        className='text-center mx-auto text-nav-white font-Medium py-[0.5rem] px-[1rem]'
                        onClick={() => localStorage.setItem("email", JSON.parse(localStorage.getItem("form"))?.email1)}>
                        {condition === "OTP Sent Successfully!" ? 'Continue' : 'Return to Signup'}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default OtpVerification