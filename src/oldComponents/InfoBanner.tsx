import React, { useState } from "react";
import DownChevron from "../assets/DownChevron";
import UpChevron from "../assets/UpChevron";

const InfoBanner: React.FC = () => {
  const [bannerIsVisible, setBannerIsVisible] = useState(true);

  const toggleBanner = () => setBannerIsVisible(!bannerIsVisible);

  return (
    <div className="flex items-center justify-between w-full bg-zinc-950/70 px-6 py-2 sm:pr-3.5 lg:pl-8">
      {bannerIsVisible && (
        <div>
          <div className="text-sm text-zinc-400 leading-6 flex-1">
            <p>
              This data is sourced from{" "}
              <a
                className="text-zinc-50 underline underline-offset-3"
                href="https://ww2.nycourts.gov/pretrial-release-data-33136"
              >
                nycourts.gov
              </a>{" "}
              and is updated biannually. The latest cases are from{" "}
              <span className="text-zinc-50">2023</span>, and the earliest cases
              are from <span className="text-zinc-50">October 2020</span>.
            </p>
          </div>
        </div>
      )}
      {/* Uncomment if you want to add the toggle button
      <button onClick={toggleBanner} className="ml-auto flex items-center p-3 focus-visible:outline-offset-[-4px]">
        {bannerIsVisible ? <UpChevron /> : <DownChevron />}
      </button>
      */}
    </div>
  );
};

export default InfoBanner;
