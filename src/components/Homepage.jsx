import React from "react";
// import Footer from "./Footer";

function Homepage() {
  return (
    <>
      <div className="bg-[#f0f6ff] text-[#1f2937] min-h-[400px] flex flex-row items-center max-[985px]:flex-col justify-between relative px-11 pt-20">
        {/* Text Section */}
        <div className="md:w-1/2 mt-24 flex flex-col gap-6">
          <h1 className="text-2xl md:text-[2.7rem] font-medium leading-tight text-[#4d80fe] overflow-y-hidden">
            Learn Smarter, Grow Faster
          </h1>
          <p className="text-lg md:text-[1.5rem] text-gray-700 overflow-hidden">
            Explore top educational videos, curated for every learner. Watch,
            learn, and excel with the best content from YouTube.
          </p> 

          <button className="Hero-button">Start Learning Today</button>
        </div>

        <img
          src="/img/pic.gif" // Ensure the path is correct
          alt="Animated Hero"
          className=" w-full max-w-[500px] md:max-w-[500px]"
        />
      </div>
      <div className="pt-9 px-14 flex flex-col min-h-[400px] gap-16 max-sm:flex justify-center items-center">
        <div>
          <p className="text-3xl overflow-y-hidden font-medium max-sm:text-[27px]  ">Learn Courses For Free</p>
        </div>

        <div className="w-full grid grid-cols-4 gap-4 max-[414px]:grid-cols-1 mb-8">
          <div className="flex flex-col gap-3 text-center justify-center items-center">
            <img src="\img\Maths.png" alt="" className="w-12" />
            <p>Mathematics</p>
            <small>
              Mathematics is the foundation of logic, problem-solving, and
              discovery. Master the numbers, and you master the world.
            </small>
          </div>
          <div className="flex flex-col gap-3 text-center justify-center items-center">
            <img src="\img\eng_5309804.png" alt="" className="w-12" />
            <p>English</p>
            <small>
              English is the bridge to global communication, creativity, and
              knowledge. Master the language, and you open doors to endless
              possibilities.
            </small>
          </div>
          <div className="flex flex-col gap-3 text-center justify-center items-center">
            <img src="\img\science.png" alt="" className="w-12" />
            <p>Science</p>
            <small>
              Science is the key to understanding the universe, from the tiniest
              atoms to the vast cosmos. Question, explore, and discover the
              wonders of the world.
            </small>
          </div>
          <div className="flex flex-col gap-3 text-center justify-center items-center">
            <img src="\img\Code.png" alt="" className="w-12" />
            <p>Coding</p>
            <small>
              Coding is the language of innovation, problem-solving, and
              creativity. Master the logic, and you can build the future
            </small>
          </div>
        </div>
      </div>

      <div className="bg-[#f0f6ff] text-[#1f2937] min-h-[250px] flex flex-row items-center max-[985px]:flex-col justify-between relative px-11 ">
        <div className="md:w-1/2 mt-24 flex flex-col gap-6">
          <p className="text-[30px] max-sm:[27px] text-start">
            77% of learners report academic and career benefits, such as
            mastering new subjects, improving skills, and advancing
            opportunities.
          </p>
          <button className="Hero-button2">Start Learning Today</button>
        </div>

        <img
          src="\img\Learning-cuate.png" // Ensure the path is correct
          alt="Animated Hero"
          className=" w-full max-w-[500px] md:max-w-[450px]"
        />
      </div>

      <div className=" mt-14 px-14 flex flex-col min-h-[400px] gap-16">
        <p className="text-[24px] max-sm:text-[20px] text-center">
          What subscribers are achieving through learning
        </p>

        <div className="w-full grid grid-cols-3 gap-3 max-[414px]:grid-cols-1">
          <div className="w-full mt-6  border flex flex-col border-black-300 p-4 gap-4">
            <div className="flex  flex-row">
              <img src="\img\profile.png" alt="" className="prof" />
              <span className="ml-3 mt-3">Abigail P.</span>
            </div>
            <p className="text-[#5B6780]">
              "I have a full-time job and 3 kids. I needed the flexibility
              offered by Coursera Plus in order to achieve my goals. My Coursera
              Plus subscription motivated me to keep learning."
            </p>
          </div>
          <div className="w-full  flex flex-col gap-4 border border-black-300 p-4 max-sm:mt-6">
            <div className="flex  flex-row">
              <img src="\img\profile.png" alt="" className="prof" />
              <span className="ml-3 mt-3">Abigail P.</span>
            </div>
            <p className="text-[#5B6780]">
              "I have a full-time job and 3 kids. I needed the flexibility
              offered by Coursera Plus in order to achieve my goals. My Coursera
              Plus subscription motivated me to keep learning."
            </p>
          </div>
          <div className="w-full mt-6  flex flex-col gap-4 border border-black-300 p-4">
            <div className="flex  flex-row">
              <img src="\img\profile.png" alt="" className="prof" />
              <span className="ml-3 mt-3">Abigail P.</span>
            </div>
            <p className="text-[#5B6780]">
              "I have a full-time job and 3 kids. I needed the flexibility
              offered by Coursera Plus in order to achieve my goals. My Coursera
              Plus subscription motivated me to keep learning."
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#0056d2] w-full p-16  flex flex-col justify-center items-center gap-2 mt-8 max-sm:px-7">
        <h1 className="text-white text-5xl font-bold tracking-wide max-sm:text-3xl overflow-hidden">
          EDUCATE YOURSELF
        </h1>
        <p className="text-white text-[18px]">
          Achieive your peak grades with Edutech
        </p>
        <button className="Hero-button2 mt-3">Start Learning today</button>
      </div>


    </>
  );
}

export default Homepage;
