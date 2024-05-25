'use client';
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="container h-[12vh]  py-6 ">
      <div className=" flex justify-between items-center ">
        <div>
          <Link href="/">
            <h1 className="font-inter text-white uppercase font-bold text-3xl">
              Transact
            </h1>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/">
            <p className="text-white">Home</p>
          </Link>
          <Link href="./pages/transactions" className="text-white">
            Transactions
          </Link>
          <p className="text-white">About </p>
        </div>
        <div>
          <ConnectButton showBalance={false} chainStatus="icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
