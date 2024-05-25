import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import TransactionList from './TransactionList';
import axios from 'axios';
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
    return { transactions: [], nextPage: null };
  }
};

const UserTransactions: React.FC<UserTransactionsProps> = ({ account }) => {
  const [activeTab, setActiveTab] = useState('specifiedAddress');
  // const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

  if (accountLoading || specifiedLoading) {
    return <Loading />;
  }

  if (accountError) {
    return <p>No transactions found for logged-in account</p>;
  }

  if (specifiedError) {
    return <p>No transactions found for specified address</p>;
  }

  return (
    <div>
      <div className="tabs bg-red-20 flex gap-10 justify-center my-6">
        <button
          className={`tab text-2xl font-semibold  text-white pb-3 ${
            activeTab === 'specifiedAddress' ? 'active text-orange-400' : ''
          }`}
          onClick={() => setActiveTab('specifiedAddress')}
        >
          Specified Address
        </button>
        <button
          className={`tab text-2xl font-semibold  text-white pb-3 ${
            activeTab === 'loggedInAccount' ? 'active text-orange-400' : ''
          }`}
          onClick={() => setActiveTab('loggedInAccount')}
        >
          My Account
        </button>
      </div>

      {activeTab === 'specifiedAddress' && (
        <TransactionList
          transactions={specifiedTransactions}
          hasNextPage={hasNextSpecifiedPage}
          fetchNextPage={fetchNextSpecifiedPage}
          isLoading={specifiedLoading}
          isFetchingNextPage={isFetchingNextSpecifiedPage}
        />
      )}

      {activeTab === 'loggedInAccount' && (
        <TransactionList
          transactions={accountTransactions}
          hasNextPage={hasNextAccountPage}
          fetchNextPage={fetchNextAccountPage}
          isLoading={accountLoading}
          isFetchingNextPage={isFetchingNextAccountPage}
        />
      )}
    </div>
  );
};

export default UserTransactions;
