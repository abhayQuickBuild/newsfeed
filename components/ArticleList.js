// components/ArticleList.js

export default function ArticleList({ articles }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {articles.map((article, index) => (
        <div key={index} className="border p-4 rounded">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p>{article.description}</p>
            <p className="text-gray-600 text-sm">{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
