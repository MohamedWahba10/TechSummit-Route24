import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './TransactionChart.modules.css'; 

/**
 * TransactionChart component displays a bar chart of transaction amounts 
 * per date for a selected customer.
 * 
 * @param {Object} customer - The selected customer object.
 * @param {Array} transactions - List of transactions associated with the customer.
 */
const TransactionChart = ({ customer, transactions }) => {
  // Filter transactions for the selected customer
  const customerTransactions = transactions.filter(transaction => transaction.customer_id === customer.id);

  // Prepare data for the chart
  const data = customerTransactions.map(transaction => ({
    date: transaction.date,
    amount: transaction.amount,
  }));

  /**
   * JSX structure for rendering the TransactionChart component.
   */
  return (
    <div className={styles.chartContainer}>
      <div className='titleContainer'>
        <h2 className={styles.chartTitle}>
          Transaction Chart for <span className='customerName'>{customer.name}</span>
        </h2>
      </div>
    
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionChart;
