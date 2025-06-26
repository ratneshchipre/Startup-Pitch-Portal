import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Analytics = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="pb-[2rem] mt-[4.6rem] mini-desktop:ml-[20rem]">
        <div className="w-full px-[1.5rem] py-[1rem]">
          <h1 className="font-Bold text-txt-black text-[1.6rem]">
            Pitch Analytics
          </h1>
        </div>
        <div className="flex flex-col w-full pb-[1.5rem]">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] items-center justify-center gap-[2rem] px-[2rem] py-[1rem]">
            <div className="flex flex-col w-full bg-nav-white h-auto rounded-lg border-dash-border border-[2px]">
              <h2 className="font-Regular text-txt-gray-black text-[1.1rem]  bg-dash-border px-[1rem] py-[0.8rem]">
                Total Pitches
              </h2>
              <span className="font-Regular text-[2.6rem] text-txt-black px-[1rem] py-[0.8rem]">
                25
              </span>
            </div>
            <div className="flex flex-col w-full bg-nav-white h-auto rounded-lg border-dash-border border-[2px]">
              <h2 className="font-Regular text-txt-gray-black text-[1.1rem] px-[1rem] py-[0.8rem] bg-dash-border">
                Engagement Score
              </h2>
              <span className="font-Regular text-[2.6rem] text-txt-black px-[1rem] py-[0.8rem]">
                70%
              </span>
            </div>
            <div className="flex flex-col w-full bg-nav-white h-auto rounded-lg border-dash-border border-[2px]">
              <h2 className="font-Regular text-txt-gray-black  text-[1.1rem] px-[1rem] py-[0.8rem] bg-dash-border">
                Feedback Received
              </h2>
              <span className="font-Regular text-[2.6rem] text-txt-black px-[1rem] py-[0.8rem]">
                5
              </span>
            </div>
            <div className="flex flex-col w-full bg-nav-white h-auto rounded-lg border-dash-border border-[2px]">
              <h2 className="font-Regular text-txt-gray-black  text-[1.1rem] px-[1rem] py-[0.8rem] bg-dash-border">
                Average Rating
              </h2>
              <span className="font-Regular text-[2.6rem] text-txt-black px-[1rem] py-[0.8rem]">
                4.5
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full pb-[1.5rem]">
            <div className="flex flex-col w-full px-[2rem]">
              <div className="flex flex-col w-full ">
                <Bar
                  data={{
                    labels: ["A", "B", "C"],
                    datasets: [
                      {
                        label: "Revenue",
                        data: [200, 300, 400],
                      },
                    ],
                  }}
                />
              </div>
              <div className="flex flex-col w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
