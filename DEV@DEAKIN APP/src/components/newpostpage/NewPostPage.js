import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const NewPostPage = () => {
  const location = useLocation();
  const selectedPost = location.state?.article || location.state?.tutorial;

  const [title, setTitle] = useState(selectedPost ? selectedPost.name : '');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [postType, setPostType] = useState('Question'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      abstract,
      articleText,
      postType,
      date: new Date().toLocaleDateString(),
    };
    console.log('New Post:', newPost);
   
  };

  return (
    <div style={styles.container}>
      <h2>New Post</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        
        <div style={styles.formGroup}>
          <label>Select Post Type:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                value="Question"
                checked={postType === 'Question'}
                onChange={(e) => setPostType(e.target.value)}
              />{' '}
              Question
            </label>
            <label>
              <input
                type="radio"
                value="Article"
                checked={postType === 'Article'}
                onChange={(e) => setPostType(e.target.value)}
              />{' '}
              Article
            </label>
          </div>
        </div>

        
        <div style={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            placeholder="Enter a descriptive title"
            required
          />
        </div>

        
        <div style={styles.formGroup}>
          <label htmlFor="abstract">Abstract</label>
          <textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            style={styles.textarea}
            rows="3"
            placeholder="Enter a 1-paragraph abstract"
            required
          />
        </div>

        
        <div style={styles.formGroup}>
          <label htmlFor="articleText">Article Text</label>
          <textarea
            id="articleText"
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
            style={styles.textarea}
            rows="10"
            placeholder="Enter the full text of your article"
            required
          />
        </div>

        
        <button type="submit" style={styles.button}>Post</button>
      </form>
    </div>
  );
};


const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    fontFamily: "'Arial', sans-serif",
    color: '#333',
    paddingTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default NewPostPage;
