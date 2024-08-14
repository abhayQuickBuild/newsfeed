// components/UserPreferences.js

import { useState, useEffect } from 'react';

export default function UserPreferences({ onSavePreferences }) {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Load preferences from localStorage or API on mount
  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem('preferences'));
    if (savedPreferences) {
      setSources(savedPreferences.sources || []);
      setCategories(savedPreferences.categories || []);
      setAuthors(savedPreferences.authors || []);
    }
  }, []);

    const savePreferences = () => {
        const preferences = { sources, categories, authors };
        console.log("save preferences", preferences);
    localStorage.setItem('preferences', JSON.stringify(preferences));
    onSavePreferences(preferences);
    };
    
    useEffect(() => {
        savePreferences();
    }, [sources, categories, authors]);

  const handleSourceBlur = (e) => {
    if (e.target.value) {
      const newSources = [...sources, e.target.value];
      setSources(newSources);
      savePreferences();
      e.target.value = '';
    }
  };

  const handleCategoryBlur = (e) => {
    if (e.target.value) {
      const newCategories = [...categories, e.target.value];
      setCategories(newCategories);
      savePreferences();
      e.target.value = '';
    }
  };

  const handleAuthorBlur = (e) => {
    if (e.target.value) {
      const newAuthors = [...authors, e.target.value];
      setAuthors(newAuthors);
      e.target.value = '';
    }
  };

  const removeSource = (sourceToRemove) => {
    const newSources = sources.filter(s => s !== sourceToRemove);
    setSources(newSources);
  };

  const removeCategory = (categoryToRemove) => {
    const newCategories = categories.filter(c => c !== categoryToRemove);
    setCategories(newCategories);
  };

  const removeAuthor = (authorToRemove) => {
    const newAuthors = authors.filter(a => a !== authorToRemove);
    setAuthors(newAuthors);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Preferences</h2>

      <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
        <div className="mb-4 lg:mb-0 lg:w-1/3">
          <h3 className="font-bold">Preferred Sources:</h3>
          <input
            type="text"
            placeholder="Add source"
            onBlur={handleSourceBlur}
            className="border p-2 m-2 w-full"
          />
          <div>
            {sources.map((source, index) => (
              <span key={index} className="p-2 m-2 border rounded bg-gray-200 inline-block">
                {source} <button onClick={() => removeSource(source)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4 lg:mb-0 lg:w-1/3">
          <h3 className="font-bold">Preferred Categories:</h3>
          <input
            type="text"
            placeholder="Add category"
            onBlur={handleCategoryBlur}
            className="border p-2 m-2 w-full"
          />
          <div>
            {categories.map((category, index) => (
              <span key={index} className="p-2 m-2 border rounded bg-gray-200 inline-block">
                {category} <button onClick={() => removeCategory(category)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3">
          <h3 className="font-bold">Preferred Authors:</h3>
          <input
            type="text"
            placeholder="Add author"
            onBlur={handleAuthorBlur}
            className="border p-2 m-2 w-full"
          />
          <div>
            {authors.map((author, index) => (
              <span key={index} className="p-2 m-2 border rounded bg-gray-200 inline-block">
                {author} <button onClick={() => removeAuthor(author)}>x</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <button onClick={savePreferences} className="bg-blue-500 text-white p-2 mt-4">
        Save Preferences
      </button>
    </div>
  );
}
