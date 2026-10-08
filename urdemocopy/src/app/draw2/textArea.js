"use client";

import React, { useState } from "react";

const TextArea = () => {
  const [value, setValue] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <form className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg">
        <label className="block mb-2 text-sm font-medium text-gray-500">
          Message
        </label>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          className="
            w-full
            h-40
            p-4
            border
            rounded-lg
            resize-none
            overflow-y-auto
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            custom-scrollbar
          "
        />

        <button
          type="submit"
          className="mt-4 px-5 py-2 rounded-lg bg-black text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TextArea;
