'use client';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import UserTransactions from '@/components/UserTrasactions';
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
    return <h1 className="container">Loading</h1>; // or a loading spinner
  }
  return (
    <div className="container">
      <p className="text-center font-semibold text-3xl hover:text-purple-500 my-4">
        Recent Transactions
      </p>

      {isConnected ? <UserTransactions account={address} /> : <ConnectButton />}
    </div>
  );
};

export default Page;
