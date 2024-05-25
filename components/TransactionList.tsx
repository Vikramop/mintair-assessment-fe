import React, { useEffect, useRef } from 'react';
import Loading from '@/utils/framer-motion/Loading';
import TransactionCard from './TransactionCard';

interface TransactionListProps {
  transactions: any;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  hasNextPage,
  fetchNextPage,
  isLoading,
  isFetchingNextPage,
}) => {
  const listRef = useRef<HTMLUListElement>(null); 

  useEffect(() => {
    const handleScroll = () => {
      if (
        listRef.current &&
        listRef.current.getBoundingClientRect().bottom <=
          window.innerHeight + 100
      ) {
        if (hasNextPage && transactions?.pages[0].transactions.length >= 15) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, fetchNextPage, transactions]);

  return (
    <>
      {transactions && transactions.pages.length > 0 && (
        <ul ref={listRef}>
          {transactions.pages.map((page: any) =>
            page.transactions.map((tx: any) => (
              <TransactionCard key={tx.hash} transaction={tx} />
            ))
          )}
        </ul>
      )}
      {isLoading && <Loading />}
      {isFetchingNextPage && (
        <div className="flex justify-center items-center">
          <p className="bg-gray-500 rounded-full px-6 py-2 text-xl font-bold text-white">
            Loading more...
          </p>
        </div>
      )}
    </>
  );
};

export default TransactionList;
