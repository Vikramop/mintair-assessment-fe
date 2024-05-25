'use client';
import Link from 'next/link';
import React from 'react';

const Main = () => {
  return (
    <div className="container  h-[85vh] flex flex-col justify-center items-center text-white gap-10">
      <h1 className="text-5xl font-semibold  capitalize">
        Welcome to Blockchain Transations
      </h1>
      <p className="text-3xl font-normal capitalize">
        Empowering secure transactions
      </p>
      <div>
        <Link href="/pages/transactions">
          <button className="bg-[#0FAE96] text-[#ffffff] py-4 px-6 rounded-md text-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
