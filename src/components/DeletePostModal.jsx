import React from 'react';
import { usePosts } from '../hooks/usePosts';

import { motion } from 'framer-motion';

const DeletePostModal = ({ id, onClose }) => {
  const { deletePostMutation } = usePosts();

  const handleDelete = async () => {
    await deletePostMutation.mutateAsync(id);
    onClose();
  };

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
        <h2 style={{ marginBottom: '24px' }}>Are you sure you want to delete this item?</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid #999999',
              padding: '8px 30px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deletePostMutation.isPending}
            style={{
              backgroundColor: 'var(--error-color)',
              color: 'white',
              padding: '8px 30px'
            }}
          >
            {deletePostMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeletePostModal;
