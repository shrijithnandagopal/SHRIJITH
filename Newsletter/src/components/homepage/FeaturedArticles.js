import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const articles = [
  {
    name: 'React vs Vue',
    description: 'Comparison of React and Vue',
    author: 'John Doe',
    imageUrl: 'https://th.bing.com/th/id/OIP.fUmll4sejxCcQrfmoizxPwAAAA?rs=1&pid=ImgDetMain',
  },
  {
    name: 'NodeJS Basics',
    description: 'Introduction to NodeJS',
    author: 'Jane Smith',
    imageUrl: 'https://th.bing.com/th/id/OIP.EAl7KTiyy-iuBmCNKg8NdgHaEE?rs=1&pid=ImgDetMain',
  },
  {
    name: 'React Hooks',
    description: 'Understanding React Hooks',
    author: 'Chris Lee',
    imageUrl: 'https://tsh.io/wp-content/uploads/2020/10/react-hooks-best-practices-lead_.jpg',
  },
];

const initialTutorials = [
  {
    name: 'JS6 Basics',
    description: 'Learn the basics of JS6',
    username: 'Dev Guru',
    imageUrl: 'https://dsfaisal.com/static/images/articles/js-basics.png',
  },
  {
    name: 'React Router',
    description: 'Routing in React',
    username: 'Frontend Expert',
    imageUrl: 'https://i.ytimg.com/vi/I4LRs_blKdI/maxresdefault.jpg',
  },
  {
    name: 'Express 4.9',
    description: 'Express framework tutorial',
    username: 'Backend Pro',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:365/1*Jr3NFSKTfQWRUyjblBSKeg.png',
  },
];

const CombinedPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [hasAccount, setHasAccount] = useState(true);
  const [error, setError] = useState('');

  const [tutorials, setTutorials] = useState(initialTutorials);

  const [newTutorialName, setNewTutorialName] = useState('');
  const [newTutorialDescription, setNewTutorialDescription] = useState('');
  const [newTutorialUsername, setNewTutorialUsername] = useState('');
  const [newTutorialImageUrl, setNewTutorialImageUrl] = useState('');

  
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();

    const newTutorial = {
      name: newTutorialName,
      description: newTutorialDescription,
      username: newTutorialUsername,
      imageUrl: newTutorialImageUrl,
    };

    setTutorials([...tutorials, newTutorial]);

    setNewTutorialName('');
    setNewTutorialDescription('');
    setNewTutorialUsername('');
    setNewTutorialImageUrl('');
  };

  const handleNewsletterSubscription = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
        setSubscriptionMessage('shrijithn2004@gmail.com');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: newsletterEmail }),
        });

        
        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Subscription failed:', errorText); 
            throw new Error(`Subscription failed: ${errorText}`);
        }

        const data = await response.text(); 
        setSubscriptionMessage(data); 
    } catch (error) {
        console.error('Error during subscription:', error); 
        setSubscriptionMessage(`Error subscribing: ${error.message}`); 
    } finally {
        setNewsletterEmail(''); 
    }
};

  return (
    <div style={styles.container}>
      <section style={styles.authSection}>
        {user ? (
          <div style={styles.welcomeContainer}>
            <h2>Welcome to Dev Deakin, {user.email}!</h2>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </div>
        ) : (
          <div style={styles.authContainer}>
            <h2>{hasAccount ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={hasAccount ? handleLogin : handleSignUp} style={styles.form}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button}>
                {hasAccount ? 'Login' : 'Sign Up'}
              </button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.toggleText}>
              <p>
                {hasAccount ? "Don't have an account?" : 'Already have an account?'}{' '}
                <span
                  onClick={() => setHasAccount(!hasAccount)}
                  style={styles.toggleLink}
                >
                  {hasAccount ? 'Sign Up' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        )}
      </section>

      {user && (
        <div>
          
          <section style={styles.section}>
            <h2 style={styles.title}>Featured Articles</h2>
            <div style={styles.cardContainer}>
              {articles.map((article, index) => (
                <div key={index} style={styles.card}>
                  <img src={article.imageUrl} alt={article.name} style={styles.image} />
                  <h3 style={styles.cardTitle}>{article.name}</h3>
                  <p>{article.description}</p>
                  <p>By {article.author}</p>
                </div>
              ))}
            </div>
          </section>

          
          <section style={styles.section}>
            <h2 style={styles.title}>Featured Tutorials</h2>
            <div style={styles.cardContainer}>
              {tutorials.map((tutorial, index) => (
                <div key={index} style={styles.card}>
                  <img src={tutorial.imageUrl} alt={tutorial.name} style={styles.image} />
                  <h3 style={styles.cardTitle}>{tutorial.name}</h3>
                  <p>{tutorial.description}</p>
                  <p>By {tutorial.username}</p>
                </div>
              ))}
            </div>
          </section>

          
          <section style={styles.section}>
            <h2 style={styles.title}>New Tutorial Post</h2>
            <form onSubmit={handleNewPostSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Tutorial Name"
                value={newTutorialName}
                onChange={(e) => setNewTutorialName(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newTutorialDescription}
                onChange={(e) => setNewTutorialDescription(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Author/Username"
                value={newTutorialUsername}
                onChange={(e) => setNewTutorialUsername(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newTutorialImageUrl}
                onChange={(e) => setNewTutorialImageUrl(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button}>Add Tutorial</button>
            </form>
          </section>

          
          <section style={styles.section}>
            <h2 style={styles.title}>Subscribe to our Newsletter</h2>
            <form onSubmit={handleNewsletterSubscription} style={styles.form}>
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button}>Subscribe</button>
            </form>
            {subscriptionMessage && <p style={styles.success}>{subscriptionMessage}</p>}
          </section>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    fontFamily: "'Arial', sans-serif",
    color: '#333',
  },
  authSection: {
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  welcomeContainer: {
    textAlign: 'center',
  },
  authContainer: {
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
  toggleText: {
    marginTop: '10px',
  },
  toggleLink: {
    color: '#007BFF',
    cursor: 'pointer',
  },
  section: {
    marginBottom: '40px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    width: '30%',
    padding: '10px',
    marginBottom: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
};

export default CombinedPage;
