import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"}></Title>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:size-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, urna vel convallis malesuada, risus sapien ultrices neque,
            in gravida nulla lorem eget augue.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed euismod, urna vel convallis
            malesuada, risus sapien ultrices neque, in gravida nulla lorem eget
            augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, urna vel convallis malesuada, risus sapien ultrices neque,
            in gravida nulla lorem eget augue.
          </p>
          <p>
            Integer at nunc nec erat finibus luctus. Donec vel leo ac elit
            pulvinar vulputate sit amet at orci. Nullam at lacus vitae arcu
            rhoncus iaculis.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed euismod, urna vel convallis malesuada, risus sapien
            ultrices neque, in gravida nulla lorem eget augue.Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Sed euismod, urna vel
            convallis malesuada, risus sapien ultrices neque, in gravida nulla
            lorem eget augue.
          </p>
          <b className="text-gray-800">Our Missions</b>
          <p>
            Our mission is to empower communities by delivering innovative
            solutions that create sustainable growth, foster collaboration, and
            inspire positive change worldwide.
          </p>
          <p>
            Sed euismod, urna vel convallis malesuada, risus sapien ultrices
            neque, in gravida nulla lorem eget augue.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm md-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance :</b>
          <p className="text-gray-600">
            We meticulously ensure that every product and service goes through
            rigorous quality checks, guaranteeing reliability and excellence at
            every step.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience :</b>
          <p className="text-gray-600">
            We design our processes to be seamless and user-friendly, making
            your experience smooth, efficient, and hassle-free.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service :</b>
          <p className="text-gray-600">
            Our team is dedicated to providing personalized support, ensuring
            that every concern is addressed quickly and with care.
          </p>
        </div>
      </div>

      <NewsletterBox></NewsletterBox>
    </div>
  );
};

export default About;
