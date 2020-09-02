import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import SubmitBtn from '../SubmitBtn';

import './DeleteBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { delLivingWages } from '../../../redux/LivingWages/actions';

const DeleteBtn = ({ onDelete, itemId, groupId }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleModal = () => setIsModalOpen((isModalOpen) => !isModalOpen);

  const onError = () => setIsSubmitting(false);

  const onSubmit = (evt) => {
    console.log("event :", evt.currentTarget)
    const form = evt.currentTarget;

    evt.preventDefault();

    if (form.checkValidity() === false) {
      evt.stopPropagation();

      toast.warn('Напишите причину удаления');
    } else {
      setIsSubmitting(true);

      onDelete(onError);
    }
    setIsValidated(true);
    dispatch(delLivingWages(itemId, groupId));
  };

  return (
    <React.Fragment>
      <Button className="btn-danger" onClick={toggleModal}><FontAwesomeIcon icon={faTrashAlt} /></Button>
      <Modal className="delete-modal" show={isModalOpen} onHide={toggleModal} centered>
        <Modal.Body>
          <h2 className="mb-4 text-center">Удаление аренды</h2>
          <Form id="add-rent-form" validated={isValidated} onSubmit={onSubmit} noValidate>
            <div className="mt-4 text-center">
              <SubmitBtn isSubmitting={isSubmitting} text="Удалить" variant="danger" />
              <Button className="ml-2" variant="light" onClick={toggleModal}>
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
