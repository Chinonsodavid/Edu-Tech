import React from "react";
function About() {
  return (
    <>
      <div>
        <div className="pt-60 ">
          <h1 className="text-center text-5xl font-medium text-[black] font-inter tracking-tight max-sm:font-normal">
            About Edutech
          </h1>
        </div>
        <div className="bg-[#5594f3] w-full min-h-[300px] flex flex-row px-16 py-7 justify-between mt-32 max-sm:flex-col max-sm:items-center">
          <p className="text-4xl font-normal  overflow-hidden  text-[#171717] font-inter tracking-tight">
            Our Vision
          </p>
          <div className="w-1/2 mt-9 max-sm:w-auto  ">
            <p className="tracking-wide leading-loose text-center">
              Our vision is driven by a deep commitment to empowering learners
              of all ages by providing them with curated educational videos that
              inspire curiosity, foster critical thinking, and enhance lifelong
              learning. We recognize that traditional learning methods are
              evolving, and digital education is becoming the key to acquiring
              new skills in an ever-changing world. That’s why EduWeb leverages
              the power of technology and automation to filter, categorize, and
              present the most valuable educational resources in an organized
              and accessible manner.
            </p>
          </div>
        </div>
        <div className="bg-[white] w-full min-h-[300px] flex flex-row px-16 py-7 justify-between max-sm:flex-col-reverse max-sm:items-center">
          <div className="w-1/2 mt-9  max-sm:w-auto ">
            <p className="tracking-wide leading-loose text-center">
              Our Misson is driven by a deep commitment to empowering learners
              of all ages by providing them with curated educational videos that
              inspire curiosity, foster critical thinking, and enhance lifelong
              learning. We recognize that traditional learning methods are
              evolving, and digital education is becoming the key to acquiring
              new skills in an ever-changing world. That’s why EduWeb leverages
              the power of technology and automation to filter, categorize, and
              present the most valuable educational resources in an organized
              and accessible manner.
            </p>
          </div>
          <p className="text-4xl font-normal text-[#171717] font-inter tracking-tight overflow-hidden">
            Our Mission
          </p>
        </div>

        <div className="bg-[#5594f3] w-full min-h-[300px] flex flex-col px-16 py-7 items-center gap-14">
          <p className="text-4xl font-normal text-[#171717] font-inter tracking-tight overflow-hidden">
            What we offer
          </p>
          <div className="w-full  grid grid-cols-4 gap-9 text-center max-[415px]:grid-cols-1">
            <div>
              <p>✅ Curated Educational Videos</p>
              <small >
                We organize and filter YouTube videos so you can easily find
                content that matters.
              </small>
            </div>
            <div>
              <p>✅ Diverse Learning Categories</p>
              <small>
                Whether you're into science, technology, history, or personal
                development, we have something for everyone.
              </small>
            </div>
            <div>
              <p>✅ User Contributions</p>
              <small>
              Add and share valuable educational videos with our growing community.
              </small>
            </div>
            <div>
              <p>✅ Smart Filtering System </p>
              <small>
              Our automated approval system ensures only meaningful, informative videos make it to our platform.
              </small>
            </div>
          </div>
        </div>
        <p className="fancy text-center mt-20" >Join us in transforming the way people learn online. Explore, discover, and grow with EduTech</p>
      </div>
    </>
  );
}

export default About;
