import React from 'react';

const tutorials = [
  {
    name: 'JS6 Basics',
    description: 'Learn the basics of JS6',
    username: '',
    imageUrl: 'https://dsfaisal.com/static/images/articles/js-basics.png', 
  },
  {
    name: 'React Router',
    description: 'Routing in React',
    username: '',
    imageUrl: 'https://i.ytimg.com/vi/I4LRs_blKdI/maxresdefault.jpg',
  },
  {
    name: 'Express 4.9',
    description: 'Express framework tutorial',
    username: '',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:365/1*Jr3NFSKTfQWRUyjblBSKeg.png',
  },
];

function FeaturedTutorials() {
  return (
    <div className="featured-section">
      <h2>Featured Tutorials</h2>
      <div className="card-container">
        {tutorials.map((tutorial, index) => (
          <div key={index} className="card">
            <img src={tutorial.imageUrl} alt={tutorial.name} />
            <h3>{tutorial.name}</h3>
            <p>{tutorial.description}</p>
            <p>By {tutorial.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedTutorials;
