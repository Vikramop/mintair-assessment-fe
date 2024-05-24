import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const ETHERSCAN_API_KEY = 'I8NJ69KQRR7NV5SYYDT1393C5R1YZ2N5NC';
const SPECIFIED_ADDRESS = '0xa83114A443dA1CecEFC50368531cACE9F37fCCcb';

interface UserTransactionsProps {
  account: string;
}

const UserTransactions: React.FC<UserTransactionsProps> = ({ account }) => {
  const [accountTransactions, setAccountTransactions] = useState<any[]>([]);
  const [specifiedTransactions, setSpecifiedTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async (
      address: string,
      setTransactions: React.Dispatch<React.SetStateAction<any[]>>
    ) => {
      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

      try {
        const response = await axios.get(url);
        if (response.data.status === '1') {
          setTransactions(response.data.result);
        } else {
          console.error('Error fetching transactions:', response.data.message);
        }
      } catch (error) {
        console.error('Error making API request:', error);
      }
    };

    if (account) {
      setLoading(true);
      fetchTransactions(account, setAccountTransactions).then(() =>
        setLoading(false)
      );
    }
    fetchTransactions(SPECIFIED_ADDRESS, setSpecifiedTransactions);
  }, [account]);

  const formatEtherValue = (value: any) => {
    try {
      return ethers.utils.formatEther(value);
    } catch (error) {
      console.error('Error formatting Ether value:', error);
      return 'N/A';
    }
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div>
      <h2>Transactions for Logged In Account</h2>
      <ul>
        {accountTransactions.map((tx) => (
          <li key={tx.hash}>
            <strong>Hash:</strong> {tx.hash} <br />
            <strong>From:</strong> {tx.from} <br />
            <strong>To:</strong> {tx.to} <br />
            <strong>Value:</strong>{' '}
            {tx.value ? formatEtherValue(tx.value) : '0'} ETH
          </li>
        ))}
      </ul>
      <h2>Transactions for Specified Address</h2>
      <ul>
        {specifiedTransactions.map((tx) => (
          <li key={tx.hash}>
            <strong>Hash:</strong> {tx.hash} <br />
            <strong>From:</strong> {tx.from} <br />
            <strong>To:</strong> {tx.to} <br />
            <strong>Value:</strong>{' '}
            {tx.value ? formatEtherValue(tx.value) : '0'} ETH
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTransactions;
