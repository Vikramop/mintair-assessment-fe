'use client';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import dynamic from 'next/dynamic';

const UserTransactions = dynamic(() => import('@/components/UserTrasactions'), {
  ssr: false,
});

const Page = () => {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <h1 className="container text-center text-white my-4 text-lg">
        Hold On!!
      </h1>
    );
  }
  return (
    <div className="container">
      <p className="text-center font-semibold text-3xl hover:text-purple-500 my-4 text-white mt-6">
        Recent Transactions
      </p>

      {isConnected ? (
        <UserTransactions account={address || ''} />
      ) : (
        <div className="h-[65vh] flex flex-col justify-center items-center">
          <p className="text-lg text-white my-6">
            Please connect Wallet to see Your transactions
          </p>
          <ConnectButton label="Connect Your  Wallet" />
        </div>
      )}
    </div>
  );
};

export default Page;
