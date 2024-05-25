import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

const Footer = () => {
  return (
    <div className="container  flex justify-between items-center h-16 mt-12 mb-6">
      <p className="text-sm font-normal text-white">
        All Rights Reserved @2024
      </p>
      <p className="text-sm font-normal text-white">Terms and Conditions</p>
      <ConnectButton showBalance={false} chainStatus="icon" />
    </div>
  );
};

export default Footer;
