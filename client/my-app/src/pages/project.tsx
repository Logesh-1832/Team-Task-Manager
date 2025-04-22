import React, { useEffect, useState } from 'react';

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((cust, index) => (
          <li key={index}>{cust.users}</li> // assuming there's a 'name' column
        ))}
      </ul>
    </div>
  );
}

export default App;
