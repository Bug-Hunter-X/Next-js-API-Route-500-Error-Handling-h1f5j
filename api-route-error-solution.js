```javascript
//pages/api/data.js

export default async function handler(req, res) {
  try {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    //Simulate a database error
    if(process.env.NEXT_PUBLIC_DATABASE_ERROR){
        throw new Error('Database error')
    }
    res.status(200).json({ text: 'Data fetched successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
}
```
```javascript
//pages/about.js
import React from 'react';
export default function About() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || res.statusText);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>About Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>      
    </div>
  );
}
```