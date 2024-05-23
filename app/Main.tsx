'use client';
import React from 'react';

const Main = () => {
  return (
    <div className="container bg-[#222222] h-[85vh] flex flex-col justify-center items-center text-white gap-10">
      <h1 className="text-6xl font-bold font-serif capitalize">
        Welcome to Blockchain Transations
      </h1>
      <p className="text-3xl font-normal capitalize">
        Empowering secure transactions
      </p>
      <div>
        <button className="bg-[#147487] text-[#ffffff] py-2 px-4 rounded-md text-lg">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Main;
