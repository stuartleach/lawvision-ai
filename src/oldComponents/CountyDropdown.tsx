import React, { useState, useEffect } from "react";
import { County } from "../types/frontendTypes"; // Adjust import path as needed

interface CountyDropdownProps {
  allCounties: County[];
  onCountySelect: (countyName: string | null) => void;
}

const CountyDropdown: React.FC<CountyDropdownProps> = ({
  allCounties,
  onCountySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountyName, setSelectedCountyName] =
    useState<string>("All Counties");

  // Check if allCounties is a valid array before sorting
  const sortedCounties = Array.isArray(allCounties)
    ? [...allCounties].sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectCounty = (county: County) => {
    setSelectedCountyName(county.name);
    onCountySelect(county.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedCountyName("All Counties");
    onCountySelect(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("dropdown-button");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="relative flex flex-row align-middle h-12">
        {selectedCountyName !== "All Counties" && (
          <button
            type="button"
            className="text-zinc-300 hover:text-gray-50 shadow outline outline-neutral-700 outline-[0.5px] bg-zinc-400/10 hover:bg-zinc-600/10 transition mr-4 px-4"
            onClick={handleClear}
          >
            Clear
          </button>
        )}
        <button
          type="button"
          id="dropdown-button"
          className="relative w-full cursor-default rounded-md bg-zinc-700 py-1.5 pl-3 pr-10 text-left text-zinc-400 shadow-sm ring-1 ring-inset ring-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          <span className="block truncate">{selectedCountyName}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-[1000000] max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
          >
            {sortedCounties.map((county) => (
              <li
                key={county.name}
                className="relative z-[100000] cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                role="option"
                aria-selected={selectedCountyName === county.name}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => selectCounty(county)}
                >
                  <span className="block truncate font-normal">
                    {county.name}
                  </span>
                  {selectedCountyName === county.name && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CountyDropdown;
