import React, { useState, useEffect } from 'react';
import styles from './CustomerTable.module.css';

/**
 * CustomerTable component displays a table of customers with transaction data
 * and allows filtering by customer name and transaction amount.
 * 
 * @param {Array} customers - List of customers to display in the table.
 * @param {Array} transactions - List of transactions associated with the customers.
 * @param {Function} onSelectCustomer - Function to handle selection of a customer row.
 */
const CustomerTable = ({ customers, transactions, onSelectCustomer }) => {
  // State variables for handling filters
  const [filterName, setFilterName] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  /**
   * Handles changes in the customer name filter input.
   * Updates the filterName state.
   * 
   * @param {Object} event - The event object from the input change.
   */
  const handleNameFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterName(value);
  };

  /**
   * Handles changes in the transaction amount filter input.
   * Updates the filterAmount state.
   * 
   * @param {Object} event - The event object from the input change.
   */
  const handleAmountFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterAmount(value);
  };

  /**
   * useEffect hook to filter customers based on filterName and filterAmount.
   * Updates filteredCustomers state with the filtered result.
   */
  useEffect(() => {
    const filtered = customers.filter(customer => {
      const customerName = customer.name.toLowerCase();
      const totalAmount = transactions
        .filter(t => t.customer_id === customer.id)
        .reduce((sum, t) => sum + t.amount, 0);

      const nameMatch = customerName.includes(filterName);
      const amountMatch = totalAmount.toString().includes(filterAmount);

      return nameMatch && amountMatch;
    });

    setFilteredCustomers(filtered);
  }, [customers, transactions, filterName, filterAmount]);

  // JSX to render the component
  return (
    <div className={styles.tableContainer}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Customer Name"
          style={{ padding: '8px 12px', margin: '0 5px', borderRadius: '4px', fontSize: '14px', border: '1px solid #ccc' }}
          value={filterName}
          onChange={handleNameFilterChange}
        />
        <input
          type="text"
          placeholder="Transaction Amount"
          style={{ padding: '8px 12px', margin: '0 5px', borderRadius: '4px', fontSize: '14px', border: '1px solid #ccc' }}
          value={filterAmount}
          onChange={handleAmountFilterChange}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.id} onClick={() => onSelectCustomer(customer)}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>
                {/* Calculate total transaction amount for the customer */}
                {transactions
                  .filter(t => t.customer_id === customer.id)
                  .reduce((sum, t) => sum + t.amount, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
