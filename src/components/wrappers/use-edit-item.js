import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

const useEditItem = (editItemAction, getItemsAction) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = React.useCallback(() => setIsModalOpen(true), []);
  const closeModal = React.useCallback(() => setIsModalOpen(false), []);

  const editItem = (values) => {
    dispatch(editItemAction(values))
      .then(response => {
        toast.success(response);
        dispatch(getItemsAction());
      })
      .catch(() => toast.error('Не удалось изменить'));
  };

  return [isModalOpen, openModal, closeModal, editItem];
};

export default useEditItem;