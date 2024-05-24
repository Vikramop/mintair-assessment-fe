import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const ETHERSCAN_API_KEY = 'I8NJ69KQRR7NV5SYYDT1393C5R1YZ2N5NC';
const SPECIFIED_ADDRESS = '0xa83114A443dA1CecEFC50368531cACE9F37fCCcb';
const INITIAL_OFFSET = 20;

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
      return ethers.utils.formatEther(value);
    } catch (error) {
      console.error('Error formatting Ether value:', error);
      return 'N/A';
    }
  };

  if (accountLoading || specifiedLoading) {
    return <p>Loading transactions...</p>;
  }

  if (accountError) {
    return <p>No transactions found for logged-in account</p>; // Display message if no transactions found
  }

  if (specifiedError) {
    return <p>No transactions found for specified address</p>; // Display message if no transactions found
  }

  return (
    <div>
      <h2>Transactions for Logged In Account</h2>
      {accountTransactions && accountTransactions.pages.length > 0 && (
        <ul>
          {accountTransactions.pages.map((page) =>
            page.transactions.map((tx: any) => (
              <li key={tx.hash}>
                <strong>Hash:</strong> {tx.hash} <br />
                <strong>From:</strong> {tx.from} <br />
                <strong>To:</strong> {tx.to} <br />
                <strong>Value:</strong>
                {formatEtherValue(tx.value)} ETH
              </li>
            ))
          )}
        </ul>
      )}
      <div ref={accountRef}>
        {isFetchingNextAccountPage && <p>Loading more...</p>}
      </div>

      <h2>Transactions for Specified Address</h2>
      {specifiedTransactions && specifiedTransactions.pages.length > 0 && (
        <ul>
          {specifiedTransactions.pages.map((page) =>
            page.transactions.map((tx: any) => (
              <li key={tx.hash}>
                <strong>Hash:</strong> {tx.hash} <br />
                <strong>From:</strong> {tx.from} <br />
                <strong>To:</strong> {tx.to} <br />
                <strong>Value:</strong>{' '}
                {(parseInt(tx.value, 16) / Math.pow(10, 18)).toFixed(3)} ETH
              </li>
            ))
          )}
        </ul>
      )}
      <div ref={specifiedRef}>
        {isFetchingNextSpecifiedPage && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export default UserTransactions;
