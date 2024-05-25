'use client';
import Link from 'next/link';
import React from 'react';
import { motion as m } from 'framer-motion';
import Image from 'next/image';

const Main = () => {
  return (
    <m.div
      className="container relative h-[50vh] sm:h-[85vh] flex flex-col justify-center items-center text-white gap-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <m.h1
        className="md:text-5xl font-semibold  capitalize text-center sm:text-3xl text-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', delay: 1 }}
        viewport={{ once: true }}
      >
        Welcome to Blockchain Transations
      </m.h1>
      <m.p
        className="md:text-3xl font-normal capitalize sm:text-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', delay: 1.2 }}
        viewport={{ once: true }}
      >
        Empowering secure transactions
      </m.p>
      <m.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', delay: 1.4 }}
        viewport={{ once: true }}
      >
        <Link href="/pages/transactions">
          <button className="bg-[#0FAE96] text-[#ffffff] py-4 px-6 rounded-md text-lg">
            Get Started
          </button>
        </Link>
      </m.div>
      <div>
        <m.div
          className="absolute  
          bottom-10 right-20 md:right-52
          "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 14,
            mass: 10,
            damping: 0.2,
          }}
        >
          <Image src="/bitcoin.svg" width={60} height={60} alt="" />
        </m.div>
        <m.div
          className="absolute  
          top-10 right-20 md:right-40
          "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 4,
            mass: 10,
            damping: 0.2,
          }}
        >
          <Image src="/ethereum.svg" width={60} height={60} alt="" />
        </m.div>
        <m.div
          className="absolute hidden sm:block
          bottom-14
          "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 18,
            mass: 10,
            damping: 0.2,
          }}
        >
          <Image src="/tether.svg" width={60} height={60} alt="" />
        </m.div>
        <m.div
          className="absolute 
          bottom-10 left-20 md:left-32
          "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 20,
            mass: 10,
            damping: 0.2,
          }}
        >
          <Image src="/filecoin.svg" width={60} height={60} alt="" />
        </m.div>
        <m.div
          className="absolute hidden sm:block 
          top-28
          "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 20,
            mass: 10,
            damping: 0.2,
          }}
        >
          <Image src="/usdc.svg" width={60} height={60} alt="" />
        </m.div>
        <m.div
          className="absolute top-10 left-20 md:left-60
         
          "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 12,
            mass: 10,
            damping: 0.2,
          }}
        >
          <Image src="/polygon.svg" width={60} height={60} alt="" />
        </m.div>
      </div>
    </m.div>
  );
};

export default Main;
