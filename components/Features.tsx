import Image from 'next/image';
import React from 'react';

const Features = () => {
  return (
    <div className="container my-16 mb-24">
      <h1 className="text-5xl font-semibold  capitalize text-center mb-20 text-white">
        Our Features
      </h1>
      <div className="grid grid-cols-2 gap-10">
        <Card
          Title="Secure Transactions"
          Desc="All transactions are securely encrypted and recorded on the
                     blockchain."
        />
        <Card
          Title="Real-time Updates"
          Desc="Users can view real-time updates of their recent transactions
instantly."
        />
        <Card
          Title="User-Friendly Interface"
          Desc="Intuitive interface for easy navigation and seamless user
experience."
        />
        <Card
          Title="24/7 Customer Support"
          Desc="Dedicated customer support available round the clock to
assist users."
        />
      </div>
    </div>
  );
};

export default Features;

interface CardProps {
  Title: string;
  Desc: string;
}

const Card: React.FC<CardProps> = ({ Title, Desc }) => {
  return (
    <div className="flex gap-5 bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-xl shadow-lg p-6  text-white">
      <div>
        <Image src="/cube.svg" width={40} height={40} alt="cube" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2"> {Title}</h2>
        <p className="text-gray-300 mb-4"> {Desc}</p>
      </div>
    </div>
  );
};
