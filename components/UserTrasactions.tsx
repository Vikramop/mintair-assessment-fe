import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '../utils/framer-motion/Loading';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const SPECIFIED_ADDRESS = process.env.ADDRESS;
const INITIAL_OFFSET = 25;

interface UserTransactionsProps {
  account: string;
}

const fetchTransactions = async ({ pageParam = 1, queryKey }: any) => {
  const address = queryKey[1];
  const offset = queryKey[2] || INITIAL_OFFSET;
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&page=${pageParam}&offset=${offset}&apikey=${ETHERSCAN_API_KEY}`;
  const response = await axios.get(url);
  if (response.data.status === '1') {
    return { transactions: response.data.result, nextPage: pageParam + 1 };
  } else {
    return { transactions: [], nextPage: null }; // Return empty transactions without throwing an error
  }
};

const UserTransactions: React.FC<UserTransactionsProps> = ({ account }) => {
  const [activeTab, setActiveTab] = useState('specifiedAddress'); // state to manage active tab
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const {
    data: accountTransactions,
    fetchNextPage: fetchNextAccountPage,
    hasNextPage: hasNextAccountPage,
    isLoading: accountLoading,
    isFetchingNextPage: isFetchingNextAccountPage,
    error: accountError,
  } = useInfiniteQuery({
    queryKey: ['accountTransactions', account, INITIAL_OFFSET],
    queryFn: fetchTransactions,
    getNextPageParam: (lastPage) =>
      lastPage.transactions.length ? lastPage.nextPage : undefined,
    enabled: !!account,
    initialPageParam: 1,
  });

  const {
    data: specifiedTransactions,
    fetchNextPage: fetchNextSpecifiedPage,
    hasNextPage: hasNextSpecifiedPage,
    isLoading: specifiedLoading,
    isFetchingNextPage: isFetchingNextSpecifiedPage,
    error: specifiedError,
  } = useInfiniteQuery({
    queryKey: ['specifiedTransactions', SPECIFIED_ADDRESS, INITIAL_OFFSET],
    queryFn: fetchTransactions,
    getNextPageParam: (lastPage) =>
      lastPage.transactions.length ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  const accountRef = useRef<HTMLDivElement>(null);
  const specifiedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        accountRef.current &&
        accountRef.current.getBoundingClientRect().bottom <=
          window.innerHeight + 100
      ) {
        if (
          hasNextAccountPage &&
          accountTransactions?.pages[0].transactions.length >= 15
        ) {
          fetchNextAccountPage();
        }
      }

      if (
        specifiedRef.current &&
        specifiedRef.current.getBoundingClientRect().bottom <=
          window.innerHeight + 100
      ) {
        if (
          hasNextSpecifiedPage &&
          specifiedTransactions?.pages[0].transactions.length >= 15
        ) {
          fetchNextSpecifiedPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    hasNextAccountPage,
    hasNextSpecifiedPage,
    fetchNextAccountPage,
    fetchNextSpecifiedPage,
    accountTransactions,
    specifiedTransactions,
  ]);

  const formatEtherValue = (value: any) => {
    try {
      return (parseInt(value, 16) / Math.pow(10, 18)).toFixed(3);
    } catch (error) {
      console.error('Error formatting Ether value:', error);
      return 'N/A';
    }
  };

  const toggleCard = (hash: string) => {
    setExpandedCard((prevHash) => (prevHash === hash ? null : hash));
  };

  if (accountLoading || specifiedLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (accountError) {
    return <p>No transactions found for logged-in account</p>; // Display message if no transactions found
  }

  if (specifiedError) {
    return <p>No transactions found for specified address</p>; // Display message if no transactions found
  }

  return (
    <div>
      <div className="tabs bg-red-20 flex gap-10 justify-center ">
        <button
          className={`tab text-2xl font-bold  text-white pb-3 ${
            activeTab === 'specifiedAddress' ? 'active text-purple-400' : ''
          }`}
          onClick={() => setActiveTab('specifiedAddress')}
        >
          Specified Address
        </button>
        <button
          className={`tab text-2xl font-bold  text-white pb-3 ${
            activeTab === 'loggedInAccount' ? 'active text-purple-400' : ''
          }`}
          onClick={() => setActiveTab('loggedInAccount')}
        >
          My Account
        </button>
      </div>

      {activeTab === 'loggedInAccount' && (
        <>
          {accountTransactions && accountTransactions.pages.length > 0 && (
            <ul>
              {accountTransactions.pages.map((page) =>
                page.transactions.map((tx: any) => (
                  <div
                    key={tx.hash}
                    className="card hover:border-purple-700 hover:border-4 bg-blue-300 border-4 border-blue-300 rounded-lg my-4 p-4"
                    onClick={() => toggleCard(tx.hash)}
                  >
                    <li>
                      <p className="font-bold text-xl">
                        Sender address :{' '}
                        <span className="font-semibold text-lg">
                          {tx.from}{' '}
                        </span>
                      </p>{' '}
                      <br />
                      <p className="font-bold text-xl">
                        Receiver address :{' '}
                        <span className="font-semibold text-lg">{tx.to} </span>
                      </p>{' '}
                      <br />
                      <p className="font-bold text-xl">
                        Value :{' '}
                        <span className="font-semibold text-lg">
                          {formatEtherValue(tx.value)} ETH
                        </span>
                      </p>{' '}
                      <br />
                      {expandedCard === tx.hash && (
                        <div>
                          <p className="font-bold text-xl">
                            Name:{' '}
                            <span className="font-semibold text-lg">
                              John Doe
                            </span>
                          </p>
                          <br />
                          <p className="font-bold text-xl">
                            Email:{' '}
                            <span className="font-semibold text-lg">
                              john.doe@example.com
                            </span>
                          </p>
                        </div>
                      )}
                    </li>
                  </div>
                ))
              )}
            </ul>
          )}
          <div ref={accountRef}>
            {isFetchingNextAccountPage && <p>Loading more...</p>}
          </div>
        </>
      )}

      {activeTab === 'specifiedAddress' && (
        <>
          {specifiedTransactions && specifiedTransactions.pages.length > 0 && (
            <ul>
              {specifiedTransactions.pages.map((page) =>
                page.transactions.map((tx: any) => (
                  <div
                    key={tx.hash}
                    className="glass-card bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-xl shadow-lg p-6  text-white my-4"
                    onClick={() => toggleCard(tx.hash)}
                  >
                    <li>
                      <p className="font-bold text-xl">
                        Sender address :{' '}
                        <span className="font-semibold text-lg">
                          {tx.from}{' '}
                        </span>
                      </p>{' '}
                      <br />
                      <p className="font-bold text-xl">
                        Receiver address :{' '}
                        <span className="font-semibold text-lg">{tx.to} </span>
                      </p>{' '}
                      <br />
                      <p className="font-bold text-xl">
                        Value :{' '}
                        <span className="font-semibold text-lg">
                          {formatEtherValue(tx.value)} ETH
                        </span>
                      </p>{' '}
                      <br />
                      {expandedCard === tx.hash && (
                        <div>
                          <p className="font-bold text-xl">
                            Transaction hash:{' '}
                            <span className="font-semibold text-lg">
                              {tx.hash}
                            </span>
                          </p>
                          <br />
                          <p className="font-bold text-xl">
                            Timestamp:{' '}
                            <span className="font-semibold text-lg">
                              {tx.timeStamp}
                            </span>
                          </p>
                          <br />
                          <p className="font-bold text-xl">
                            Status:{' '}
                            <span className="font-semibold text-lg">
                              {tx.txreceipt_status == 1 ? 'Success' : 'Failed'}
                            </span>
                          </p>
                        </div>
                      )}
                    </li>
                  </div>
                ))
              )}
            </ul>
          )}
          <div ref={specifiedRef}>
            {isFetchingNextSpecifiedPage && (
              <div className="flex justify-center items-center">
                <p className="bg-gray-500 rounded-full px-6 py-2 text-xl font-bold text-white">
                  Loading more...{' '}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTransactions;
