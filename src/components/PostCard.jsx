import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Edit } from 'lucide-react';
import DeletePostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';

import { motion, AnimatePresence } from 'framer-motion';

const PostCard = ({ post, currentUsername }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const isOwner = post.username === currentUsername;
  const formattedDate = formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true });

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="modal-content" 
      style={{ maxWidth: '100%', marginBottom: '24px', padding: 0, overflow: 'hidden' }}
    >
      <header className="header" style={{ padding: '16px 24px' }}>
        <h2 style={{ fontSize: '1.4rem' }}>{post.title}</h2>
        {isOwner && (
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={() => setIsDeleteModalOpen(true)} style={{ background: 'transparent', color: 'white' }}>
              <Trash2 size={22} />
            </button>
            <button onClick={() => setIsEditModalOpen(true)} style={{ background: 'transparent', color: 'white' }}>
              <Edit size={22} />
            </button>
          </div>
        )}
      </header>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#777777', marginBottom: '16px', fontWeight: '700' }}>
          <span>@{post.username}</span>
          <span>{formattedDate}</span>
        </div>
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
      </div>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <DeletePostModal 
            id={post.id} 
            onClose={() => setIsDeleteModalOpen(false)} 
          />
        )}

        {isEditModalOpen && (
          <EditPostModal 
            post={post} 
            onClose={() => setIsEditModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default PostCard;
