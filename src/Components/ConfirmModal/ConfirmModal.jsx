import React from 'react';
import './ConfirmModal.scss';

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  type = 'danger',
}) {
  if (!isOpen) return null;

  return (
    <div className='ConfirmModal-overlay' onClick={onCancel}>
      <div
        className={`ConfirmModal-content ${type}`}
        onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>{title || 'Confirmation'}</h3>
        </div>
        <div className='modal-body'>
          <p>{message}</p>
        </div>
        <div className='modal-footer'>
          <button className='btn-cancel' onClick={onCancel}>
            Annuler
          </button>
          <button className={`btn-confirm ${type}`} onClick={onConfirm}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
