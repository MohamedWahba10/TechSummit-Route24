import React, { useEffect, useState } from 'react';
import CustomerTable from './components/CustomerTable/CustomerTable';
import TransactionChart from './components/CustomerTable/TransactionChart/TransactionChart';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const getCustomerData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/customers');
      setCustomers(response.data);
      console.log("customers -->", response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const getTransactionData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/transactions');
      setTransactions(response.data);
      console.log("transactions -->", response.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    getCustomerData();
    getTransactionData();
  }, []);

  return (
    <>
      <CustomerTable
        customers={customers}
        transactions={transactions}
        onSelectCustomer={setSelectedCustomer} // Pass setSelectedCustomer to handle selection
      />
      {selectedCustomer && (
        <TransactionChart
          customer={selectedCustomer}
          transactions={transactions}
        />
      )}
    </>
  );
}

export default App;
