'use client';
import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container relative mx-auto h-[12vh] py-6 px-4 md:px-8">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <h1 className="font-inter text-white uppercase font-bold text-3xl">
              Transact
            </h1>
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div
          className={`flex-col md:flex-row md:flex gap-4 items-center ${
            isMenuOpen
              ? 'flex absolute top-12 mt-2 right-2 rounded-md bg-slate-800 p-4'
              : 'hidden'
          } md:flex`}
        >
          <Link href="/">
            <p className="text-white">Home</p>
          </Link>
          <Link href="/pages/transactions" className="text-white">
            Transactions
          </Link>
          <p className="text-white">About</p>
          <div>
            <ConnectButton showBalance={false} chainStatus="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
