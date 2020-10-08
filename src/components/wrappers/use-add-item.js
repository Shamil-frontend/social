import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

const useAddItem = (addItemAction, getItemsAction, secondValue) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = React.useCallback(() => setIsModalOpen(true), []);
  const closeModal = React.useCallback(() => setIsModalOpen(false), []);

  const addItem = (values) => {
    dispatch(addItemAction(values, secondValue))
      .then(response => {
        toast.success(response);
        dispatch(getItemsAction());
        closeModal();
      })
      .catch(() => toast.error('Не удалось добавить'));
  };

  return [isModalOpen, openModal, closeModal, addItem];
}

export default useAddItem;