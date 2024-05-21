import { useEffect, useState } from 'react';
import { createClient } from 'urql';
import './App.css';

function App() {
  const [transfers, setTransfers] = useState([]);

  const QueryURL= "https://api.studio.thegraph.com/query/63494/the-graph-india_/v0.0.1";

  const client = createClient({
    url: QueryURL
  });

  const query = `{
    approvals(first: 5) {
      id
      owner
      spender
      value
    }
    transfers(first: 5) {
      id
      from
      to
      value
    }
  }`

useEffect(() => {
  const getTransfers = async () => {
    const { data } = await client.query(query).toPromise();
    console.log(data);
    setTransfers(data.transfers);
  }
  getTransfers();
}, [])

return (
    <>
      <div>
        <h1>Information</h1>
        {transfers !== null && transfers.length > 0 && transfers.map((transfer) => {
          return (
            <div key={transfer.id}>
              <div><b>Id: </b>{transfer.id}</div>
              <div><b>Value: </b>{transfer.value}</div>
              <div><b>From: </b>{transfer.from}</div>
              <div><b>To: </b>{transfer.to}</div>
              <br></br>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;