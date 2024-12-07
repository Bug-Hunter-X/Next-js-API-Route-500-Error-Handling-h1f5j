```javascript
//pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app</h1>
      <Link href='/about'>
        <a>Go to About page</a>
      </Link>
    </div>
  );
}
```
```javascript
//pages/about.js

export default function About() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>About Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>      
    </div>
  );
}
```
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
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
```