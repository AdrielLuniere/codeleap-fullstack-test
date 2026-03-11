import React from 'react';
import PostForm from './PostForm';

import { motion } from 'framer-motion';

const EditPostModal = ({ post, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay" 
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <PostForm 
          initialData={post} 
          onSuccess={onClose} 
        />
      </motion.div>
    </motion.div>
  );
};

export default EditPostModal;
