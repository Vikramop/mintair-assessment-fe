import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

const Footer = () => {
  return (
    <div className="container relative bottom-0  md:flex  gap-5 justify-between items-center h-16 mt-12 mb-12">
      <p className="text-sm font-normal text-white text-center my-4">
        All Rights Reserved @2024
      </p>
      <p className="text-sm font-normal text-white text-center my-4">
        Terms and Conditions
      </p>
      <div className="flex justify-center items-center ">
        <ConnectButton showBalance={false} chainStatus="icon" />
      </div>
    </div>
  );
};

export default Footer;
