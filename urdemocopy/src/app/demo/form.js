"use client";
import React, { useEffect, useState } from "react";
import Img1 from "../../../public/assets/hero-banner/arrow-up-black.svg";
import Image from "next/image";
// import Lenis from "lenis";
// import { useSearch } from "../context/context";

const Contact_Form = () => {
  const [form, setForm] = useState(() => {
    if (typeof window != "undefined") {
      const Contact = localStorage.getItem("Contact_Us");

      return Contact
        ? JSON.parse(Contact)
        : {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        };
    }

    return {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    };
  });
  const [error, setError] = useState({});

  useEffect(() => {
    localStorage.setItem("Contact_Us", JSON.stringify(form));
  }, [form]);


  // when page refresh that form value has been removed

  useEffect(() => {
    localStorage.removeItem('Contact_Us');

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (isNaN(value)) return null;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validation = () => {
    const newError = {};
    if (!form.first_name) {
      newError.first_name = "First Name is required";
    }
    if (!form.last_name) {
      newError.last_name = "Last Name is required";
    }
    if (!form.phone) {
      newError.phone = "Phone no is required";
    } else if (!/^[0-9\s+()]*$/.test(form.phone)) {
      newError.phone = "Phone no is invalid";
    }
    else if (form.phone.length < 7 || form.phone.length > 10) {
      newError.phone = "Enter 7-10 digits";
    }
    if (!form.email) {
      newError.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
    ) {
      newError.email = "Email is invalid";
    }
    if (!form.subject) {
      newError.subject = "Subject is required";
    }
    if (!form.message) {
      newError.message = "Message is required";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validation()) {
      alert("Your form has been submitted!!!");

      setForm({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };


  return (
    <>
      <div className="xl:mt-12 mt-6 md:mt-10 w-full flex justify-between max-md:flex-col max-xs:gap-4 xs:gap-6 md:gap-0 lg:gap-10 2xl:gap-0 no-scrollbar">
        <div className="flex flex-col gap-4 sm:gap-6 md:w-[45%] lg:w-1/2 md:mt-9">
          <h2 className="max-xs:text-[22px] xs:text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px]  2xl:text-[42px]  text-white font-gothic font-normal">
            Get in touch with us today
          </h2>

          <p className="text-white text-[16px] font-archivo font-light md:w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            quibusdam itaque molestiae quas eius aperiam magni!
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-[55%] 3xl:w-[620px]! lg:w-[450px] xl:w-[500px] 2xl:w-[540px] flex flex-col gap-5 2xl:gap-[26px] rounded-[15px] 3xl:rounded-[42px] border border-[#b7b7b7] bg-[#111] 3xl:p-11! 2xl:p-8 max-sm:px-4 max-sm:py-5 sm:px-6 sm:py-7 md:p-5"
        >
          <div className="w-full flex gap-2.5 sm:gap-4 3xl:gap-[30px]!">
            <div className="w-[48%] relative">
              <input
                onChange={handleChange}
                value={form?.first_name}
                name="first_name"
                placeholder="First Name"
                className="outline-none w-full placeholder:text-white text-white text-[14px] sm:text-[16px] md:text-[14px] lg:text-[16px] font-archivo font-light px-2  py-1.5 2xl:px-5 sm:py-2.5 border border-[#b7b7b7] rounded-[8px] lg:rounded-[10px]"
              />
              {error.first_name && (
                <p className="text-[#f50514] absolute max-2xl:-bottom-[19px] 2xl:-bottom-[23px] max-2xl:text-[12px] 2xl:text-[14px] font-archivo font-normal">
                  {error.first_name}
                </p>
              )}
            </div>
            <div className="w-[48%] relative">
              <input
                onChange={handleChange}
                value={form?.last_name}
                name="last_name"
                placeholder="Last Name"
                className="outline-none w-full placeholder:text-white text-white text-[14px] sm:text-[16px] md:text-[14px] lg:text-[16px] font-archivo font-light px-2  py-1.5 2xl:px-5 sm:py-2.5  border border-[#b7b7b7] rounded-[8px] lg:rounded-[10px]"
              />
              {error.last_name && (
                <p className="text-[#f50514] absolute max-2xl:-bottom-[19px] 2xl:-bottom-[23px] max-2xl:text-[12px] 2xl:text-[14px] font-archivo font-normal">
                  {error.last_name}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex gap-2.5 sm:gap-4 3xl:gap-[30px]!">
            <div className="w-[48%] relative">
              <input
                type="tel"
                onChange={handleChange}
                value={form?.phone}
                name="phone"
                placeholder="Phone"
                className="outline-none w-full placeholder:text-white text-white text-[14px] sm:text-[16px] md:text-[14px] lg:text-[16px] font-archivo font-light px-2  py-1.5 2xl:px-5 sm:py-2.5 border border-[#b7b7b7] rounded-[8px] lg:rounded-[10px]"
              />
              {error.phone && (
                <p className="text-[#f50514] absolute max-2xl:-bottom-[19px] 2xl:-bottom-[23px] max-2xl:text-[12px] 2xl:text-[14px] font-archivo font-normal">
                  {error.phone}
                </p>
              )}
            </div>
            <div className="w-[48%] relative">
              <input
                type="email"
                onChange={handleChange}
                value={form?.email}
                name="email"
                placeholder="Email"
                className="outline-none w-full placeholder:text-white text-white text-[14px] sm:text-[16px] md:text-[14px] lg:text-[16px] font-archivo font-light px-2  py-1.5 2xl:px-5 sm:py-2.5 border border-[#b7b7b7] rounded-[8px] lg:rounded-[10px]"
              />
              {error.email && (
                <p className="text-[#f50514] absolute max-2xl:-bottom-[19px] 2xl:-bottom-[23px] max-2xl:text-[12px] 2xl:text-[14px] font-archivo font-normal">
                  {error.email}
                </p>
              )}
            </div>
          </div>
          <div className="w-full relative">
            <input
              placeholder="Subjects"
              onChange={handleChange}
              value={form?.subject}
              name="subject"
              className="outline-none w-full placeholder:text-white text-white text-[14px] sm:text-[16px] md:text-[14px] lg:text-[16px] font-archivo font-light px-2  py-1.5 2xl:px-5 sm:py-2.5 border border-[#b7b7b7] rounded-[8px] lg:rounded-[10px]"
            />
            {error.subject && (
              <p className="text-[#f50514] absolute max-2xl:-bottom-[19px] 2xl:-bottom-[23px] max-2xl:text-[12px] 2xl:text-[14px] font-archivo font-normal">
                {error.subject}
              </p>
            )}
          </div>
          <div className="w-full relative">
            <textarea
              placeholder="Message"
              onChange={handleChange}
              value={form?.message}
              name="message"
              className="outline-none w-full overflow-y-auto text-area-scroll h-22 sm:h-28 text-white 3xl:h-48! placeholder:text-white text-[14px] sm:text-[16px] md:text-[14px] lg:text-[16px] font-archivo font-light px-2  py-1.5 2xl:px-5 sm:py-2.5 border border-[#b7b7b7] rounded-[8px] lg:rounded-[10px]"
            />
            {error.message && (
              <p className="text-[#f50514] absolute max-2xl:-bottom-[15px] 2xl:-bottom-[19px] max-2xl:text-[12px] 2xl:text-[14px] font-archivo font-normal">
                {error.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center cursor-pointer justify-between bg-[#d3ed05] w-40 lg:w-47 2xl:w-50 h-10 lg:h-11 2xl:h-13 py-1 lg:py-1.5 3xl:py-2.5 px-3 lg:px-5 rounded-[10px] 2xl:rounded-[14px]"
          >
            <span className="text-[14px] lg:text-[16px] text-black font-archivo font-medium cursor-pointer">
              Send a Message
            </span>
            <span className="size-4  2xl:size-5 ">
              <Image
                src={Img1}
                alt="arrow-icon"
                className="size-full object-fill"
              />
            </span>
          </button>
        </form>
      </div>


      {/* // Location */}

      {/* <Map /> */}

      <div className="2xl:mt-[69px] relative mt-6 md:mt-10 xl:mt-12 overflow-hidden" >
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.977342259324!2d80.2528158289275!3d13.05193902097606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267ab159f64e9%3A0xb7743db9d152516b!2sIMUII%20TECHNOLOGY%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1778840228585!5m2!1sen!2sin"
          width="100%"
          className={`2xl:h-[400px] max-xs:h-[170px] xs:h-[180px] sm:h-[230px] lg:h-[280px] xl:h-[300px]  3xl:rounded-[40px] rounded-[14px] md:rounded-[20px]`}
          allowFullScreen=""
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"></iframe> */}

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7016790816883!2d80.24952207551593!3d13.05465121305108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267ab159f64e9%3A0xb7743db9d152516b!2sIMUII%20TECHNOLOGY%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1726741602708!5m2!1sen!2sin%22"
          width="100%"
          height='100%'
          className={`2xl:h-[400px] max-xs:h-[170px] xs:h-[180px] sm:h-[230px] lg:h-[280px] xl:h-[300px]  3xl:rounded-[40px] rounded-[14px] md:rounded-[20px]`}
          allowFullScreen=""
          loading={"lazy"} referrerPolicy="no-referrer-when-downgrade" title="IMUII Website" ></iframe>
      </div >


    </>
  );
};

export default Contact_Form;
