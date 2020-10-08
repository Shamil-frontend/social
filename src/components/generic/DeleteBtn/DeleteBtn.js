import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import SubmitBtn from '../SubmitBtn';

import './DeleteBtn.scss';


const DeleteBtn = ({ onDelete, togglerModal, onModalClose, itemId, itemParentId, itemAddressName }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleModal = () => setIsModalOpen((isModalOpen) => !isModalOpen);

  const onError = () => setIsSubmitting(true);

  const onSubmit = (evt) => {

    evt.preventDefault();

    setIsSubmitting(false);
    onDelete(onError, itemId, itemParentId, itemAddressName)
      .then((response) => {
        toast.success(response)
        setIsSubmitting(false);
      })
      .catch(onError);
  };

  useEffect(() => {
    if (!togglerModal) {
      toggleModal();
    }
    onModalClose(true)
  }, [onModalClose, togglerModal])

  return (
    <React.Fragment>
      <Modal className="delete-modal" show={isModalOpen} onHide={toggleModal} centered>
        <Modal.Body>
          <h2 className="mb-4 text-center">Удалить строку ?</h2>
          <Form onSubmit={onSubmit} noValidate>
            <div className="mt-4 text-center">
              <SubmitBtn isSubmitting={isSubmitting} text="Удалить" variant="danger" />
              <Button className="ml-2" variant="dark" onClick={toggleModal}>
                Отмена
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};


DeleteBtn.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteBtn;



// const useDeleteItem = (itemId, onDelete) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const toggleModal = React.useCallback(() =>!isModalOpen, []);

//   const deleteItem = (evt) => {

//     evt.preventDefault();

//     setIsSubmitting(true);
//     onDelete(onError, itemId)
//       .then((response) => {
//         toast.success(response)
//         toggleModal();
//       })
//       .catch(onError);
//   };

//   return [isModalOpen, isSubmitting, toggleModal, deleteItem];
// }
// const [isModalOpen, isSubmitting, toggleModal, deleteItem] = useDeleteItem(itemId, () => onDelete())