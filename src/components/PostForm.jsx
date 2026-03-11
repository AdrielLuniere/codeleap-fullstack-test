import React, { useState } from 'react';
import { usePosts } from '../hooks/usePosts';

const PostForm = ({ username, initialData = null, onSuccess = null }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const { createPostMutation, updatePostMutation } = usePosts();

  const isEditing = !!initialData;
  const isLoading = createPostMutation.isPending || updatePostMutation.isPending;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (isEditing) {
      await updatePostMutation.mutateAsync({
        id: initialData.id,
        data: { title, content }
      });
    } else {
      await createPostMutation.mutateAsync({
        username,
        title,
        content
      });
      // Reset form only on creation
      setTitle('');
      setContent('');
    }

    if (onSuccess) onSuccess();
  };

  return (
    <section className={isEditing ? '' : 'modal-content'} style={isEditing ? {} : { maxWidth: '100%', marginBottom: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>{isEditing ? 'Edit item' : 'What’s on your mind?'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Hello world"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          placeholder="Content here"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ resize: 'vertical' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px' }}>
          {isEditing && (
            <button
              type="button"
              onClick={onSuccess}
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #999999',
                padding: '8px 30px'
              }}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || !title.trim() || !content.trim()}
            style={{
              backgroundColor: isEditing ? 'var(--success-color)' : 'var(--primary-color)',
              color: 'white',
              padding: '8px 30px'
            }}
          >
            {isLoading ? 'Saving...' : (isEditing ? 'Save' : 'Create')}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostForm;
