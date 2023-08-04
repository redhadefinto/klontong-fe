import React from "react";
import { Link } from "react-router-dom";

function DataNotFound() {
  return (
    <div className="w-full top-0 left-0 min-h-[30vh] flex justify-center items-center text-2xl">
      <div className="flex flex-col gap-8">
        <p>Data Not Found</p>
        <Link
          to="/"
          className="px-12 py-8 bg-btn-yellow text-brown-cs rounded-3xl">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default DataNotFound;
