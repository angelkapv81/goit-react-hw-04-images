import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContainer } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ selectedImage, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContainer>
        <img src={selectedImage} alt={tags} />
      </ModalContainer>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  selectedImage: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
