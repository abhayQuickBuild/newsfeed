// services/guardianService.js

import axios from 'axios';

const API_KEY = '147e3cc1-d17b-4ede-8c3d-6b8906e88a67';
const BASE_URL = 'https://content.guardianapis.com/search';

export const fetchGuardianArticles = async (query, filters = {}) => {
  const { date, categories, sources, authors } = filters;

  let url = `${BASE_URL}?q=${query}&api-key=${API_KEY}&show-fields=all`;

  if (date) url += `&from-date=${date}`;

  if (categories && categories.length > 0) {
    const formattedCategories = categories.join(',');
    url += `&section=${formattedCategories}`;
  }

  if (sources && sources.length > 0) {
    const formattedSources = sources.join(',');
    url += `&source=${formattedSources}`;
  }

  if (authors && authors.length > 0) {
    const formattedAuthors = authors.join(',');
    url += `&author=${formattedAuthors}`;
  }
  try {
    const response = await axios.get(url);
    return response.data.response.results.map((article) => ({
      title: article.webTitle,
      description: article.fields.trailText,
      url: article.webUrl,
      source: "The Guardian",
      publishedAt: article.webPublicationDate,
      author: article.fields.byline,
    }));
  } catch (error) {
    return [];
  }
};
