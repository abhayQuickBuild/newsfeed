// services/nytService.js

import axios from 'axios';

const API_KEY = 'akYjJ1n8slfGqmSTh2mxWYE38PE18zat';
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

export const fetchNYTArticles = async (query, filters = {}) => {
  const { date, categories, sources, authors } = filters;

  let url = `${BASE_URL}?q=${query}&api-key=${API_KEY}`;

  if (date) {
    url += `&begin_date=${date.replace(/-/g, '')}&end_date=${date.replace(/-/g, '')}`;
  }

  if (categories && categories.length > 0) {
    const formattedCategories = categories.map(category => `"${category}"`).join(' ');
    url += `&fq=news_desk:(${formattedCategories})`;
  }

  if (sources && sources.length > 0) {
    const formattedSources = sources.map(source => `"${source}"`).join(' ');
    url += `&fq=source:(${formattedSources})`;
  }

  if (authors && authors.length > 0) {
    const formattedAuthors = authors.map(author => `"${author}"`).join(' ');
    url += `&fq=byline:(${formattedAuthors})`;
  }
    try {
        const response = await axios.get(url);
        return response.data.response.docs.map((article) => ({
            title: article.headline.main,
            description: article.abstract,
            url: article.web_url,
            source: "The New York Times",
            publishedAt: article.pub_date,
            author: article.byline && article.byline.original,
        }));
    } catch (error) {
        return []
    }
};
