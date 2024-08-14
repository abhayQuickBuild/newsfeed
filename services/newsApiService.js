// services/newsAPIService.js

import axios from 'axios';

const API_KEY = 'ff6a135001634116a49f71d7ba20803b';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsAPIArticles = async (query = 'latest', filters = {}) => {
  const { date, sources, categories, authors } = filters;

  let url = `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`;

  if (date) url += `&from=${date}`;

  if (categories && categories.length > 0) {
    const formattedCategories = categories.join(',');
    url += `&category=${formattedCategories}`;
  }

  if (sources && sources.length > 0) {
    const formattedSources = sources.join(',');
    url += `&sources=${sources}`;
  }

  if (authors && authors.length > 0) {
    const formattedAuthors = authors.join(',');
    url += `&author=${formattedAuthors}`;
  }
    try {
        const response = await axios.get(url);
        return response.data.articles.map(article => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: article.source.name,
    publishedAt: article.publishedAt,
    author: article.author,
  }));
    } catch (error) {
        console.error(error);
        return []
    }
  
};
