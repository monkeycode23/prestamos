import React from "react";

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.364A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.574zM12 20a8 8 0 008-8h-4a4 4 0 01-4 4v4zm6.364-2.93A7.962 7.962 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.636-1.868zM20.07 6.364A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3.93 1.574zM12 .07a8.003 8.003 0 00-8 8h4a4.002 4.002 0 014-4V0z"
    ></path>
  </svg>
);


export default Spinner