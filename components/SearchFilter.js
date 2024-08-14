// components/SearchFilter.js

import { useEffect, useState } from 'react';

export default function SearchFilter({ onSearch }) {
  const today = new Date();
  const [query, setQuery] = useState('');
  const [date, setDate] = useState(today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2));
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');

  const handleSearch = () => {
    onSearch({ query, date, category, source });
  };
 
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => { setDate(e.target.value); console.log(e.target.value); }}
        className="border p-2 m-2"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 m-2">Search</button>
    </div>
  );
}
