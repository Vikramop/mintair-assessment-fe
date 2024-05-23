'use client';
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <div className="container h-[10vh]">
      <div className="bg-red-300 flex justify-between">
        <div>
          <h1>Transact</h1>
        </div>
        <div className="flex gap-4">
          <p>Transactions</p>
          <p>About Us</p> 
          <p>Contact Us</p>
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
