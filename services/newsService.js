// services/newsService.js

import { fetchNewsAPIArticles } from './newsApiService';
import { fetchGuardianArticles } from './gurdianApiService';
import { fetchNYTArticles } from './newsCredService';

// services/newsService.js

export const fetchAllArticles = async (query, filters = {}, preferences = {}) => {
  const { sources, categories, authors } = preferences;
    console.log("fetch all articles",sources, categories, authors);
  const [newsAPIArticles, nytArticles, guardianArticles] = await Promise.all([
    fetchNewsAPIArticles(query, { ...filters, sources, categories }),
    fetchNYTArticles(query, { ...filters, categories }),
    fetchGuardianArticles(query, { ...filters, categories }),
  ]);

  // Filter by preferred authors if needed
  let allArticles = [...newsAPIArticles, ...nytArticles, ...guardianArticles];
  if (authors && authors.length > 0) {
    allArticles = allArticles.filter(article =>
      authors.some(author => article.author && article.author.includes(author))
    );
  }

  return allArticles;
};
