
import { useState, useEffect } from 'react';
import SearchFilter from '../components/SearchFilter';
import ArticleList from '../components/ArticleList';
import UserPreferences from '../components/UserPreference';
import { fetchAllArticles } from "../services/newsService"

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem('preferences'));
    if (savedPreferences) {
      setPreferences({...savedPreferences});
    }
  }, []);

  const handleSearch = async (filters) => {
    const savedPreferences = JSON.parse(localStorage.getItem('preferences'));
    const result = await fetchAllArticles(filters.query, filters, savedPreferences);
    setArticles(result);
  };
  useEffect(() => {
      handleSearch({ query: '' });
    
  }, [preferences]);
  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl font-bold my-4">News Platform</h1>
      <UserPreferences onSavePreferences={handleSavePreferences} />
      <SearchFilter onSearch={handleSearch} />
       <ArticleList articles={articles} />
    </div>
  );
}
