import React, { useState } from 'react';

interface TransactionCardProps {
  transaction: any;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const formatEtherValue = (value: any) => {
    try {
      return (parseInt(value, 16) / Math.pow(10, 18)).toFixed(3);
    } catch (error) {
      console.error('Error formatting Ether value:', error);
      return 'N/A';
    }
  };

  return (
    <div
      className="glass-card cursor-pointer bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-xl shadow-lg p-6  text-white my-4"
      onClick={toggleExpanded}
    >
      <li>
        <p className="font-bold text-xl">
          Sender address :{' '}
          <span className="font-semibold text-lg">{transaction.from} </span>
        </p>{' '}
        <br />
        <p className="font-bold text-xl">
          Receiver address :{' '}
          <span className="font-semibold text-lg">{transaction.to} </span>
        </p>{' '}
        <br />
        <p className="font-bold text-xl">
          Value :{' '}
          <span className="font-semibold text-lg">
            {formatEtherValue(transaction.value)} ETH
          </span>
        </p>{' '}
        <br />
        {expanded && (
          <>
            <p className="font-bold text-xl">
              Transaction hash:{' '}
              <span className="font-semibold text-lg">{transaction.hash}</span>
            </p>
            <br />
            <p className="font-bold text-xl">
              Timestamp:{' '}
              <span className="font-semibold text-lg">
                {transaction.timeStamp}
              </span>
            </p>
            <br />
            <p className="font-bold text-xl">
              Status:{' '}
              <span className="font-semibold text-lg">
                {transaction.txreceipt_status === 1 ? 'Success' : 'Failed'}
              </span>
            </p>
          </>
        )}
      </li>
    </div>
  );
};

export default TransactionCard;
