
import React from 'react';

const articles = [
  {
    name: 'React vs Vue',
    description: 'Comparison of React and Vue',
    author: '',
    imageUrl: 'https://th.bing.com/th/id/OIP.fUmll4sejxCcQrfmoizxPwAAAA?rs=1&pid=ImgDetMain', 
  },
  {
    name: 'NodeJS Basics',
    description: 'Introduction to NodeJS',
    author: '',
    imageUrl: 'https://th.bing.com/th/id/OIP.EAl7KTiyy-iuBmCNKg8NdgHaEE?rs=1&pid=ImgDetMain', 
  },
  {
    name: 'React Hooks',
    description: 'Understanding React Hooks',
    author: '',
    imageUrl: 'https://tsh.io/wp-content/uploads/2020/10/react-hooks-best-practices-lead_.jpg', 
  },
];
function FeaturedArticles() {
  return (
    <div className="featured-section">
      <h2>Featured Articles</h2>
      <div className="card-container">
        {articles.map((article, index) => (
          <div key={index} className="card">
            <img src={article.imageUrl} alt={article.name} />
            <h3>{article.name}</h3>
            <p>{article.description}</p>
            <p>By {article.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedArticles;
