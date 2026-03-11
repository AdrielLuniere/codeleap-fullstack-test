import React, { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import PostCard from './components/PostCard';
import { usePosts } from './hooks/usePosts';
import { LogOut } from 'lucide-react';

const App = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [tempUsername, setTempUsername] = useState('');
  const { postsQuery } = usePosts();

  const handleLogin = (e) => {
    e.preventDefault();
    if (tempUsername.trim()) {
      localStorage.setItem('username', tempUsername.trim());
      setUsername(tempUsername.trim());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
  };

  if (!username) {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ maxWidth: '500px' }}>
          <h2 style={{ marginBottom: '24px' }}>Welcome to CodeLeap network!</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Please enter your username</label>
            <input
              id="username"
              type="text"
              placeholder="John Doe"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button
                type="submit"
                disabled={!tempUsername.trim()}
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  padding: '10px 30px',
                  textTransform: 'uppercase'
                }}
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <header className="header">
        <h1>CodeLeap Network</h1>
        <button
          onClick={handleLogout}
          style={{ background: 'transparent', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </header>

      <main className="content-wrapper">
        <PostForm username={username} />

        <div style={{ marginTop: '24px' }}>
          {postsQuery.data?.pages.map((page) =>
            page.results.map((post) => (
              <PostCard key={post.id} post={post} currentUsername={username} />
            ))
          )}

          {postsQuery.isFetchingNextPage && (
            <p style={{ textAlign: 'center', padding: '20px' }}>Loading more posts...</p>
          )}

          <div
            style={{ height: '20px' }}
            ref={(el) => {
              if (el && postsQuery.hasNextPage && !postsQuery.isFetchingNextPage) {
                const observer = new IntersectionObserver(([entry]) => {
                  if (entry.isIntersecting) {
                    postsQuery.fetchNextPage();
                  }
                });
                observer.observe(el);
              }
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
