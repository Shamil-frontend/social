import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import SubmitBtn from '../SubmitBtn';

import './DeleteBtn.css';

const DeleteBtn = ({ onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleModal = () => setIsModalOpen((isModalOpen) => !isModalOpen);

  const onError = () => setIsSubmitting(false);

  const onSubmit = (evt) => {
    const form = evt.currentTarget;

    evt.preventDefault();

    if (form.checkValidity() === false) {
      evt.stopPropagation();

      toast.warn('Напишите причину удаления');
    } else {
      setIsSubmitting(true);

      onDelete(comment, onError);
    }

    setIsValidated(true);
  };

  return (
    <React.Fragment>
      <Button onClick={toggleModal}>+</Button>
      <Modal className="delete-modal" show={isModalOpen} onHide={toggleModal} centered>
        <Modal.Body>
          <h2 className="mb-4 text-center">Удаление аренды</h2>
          <Form id="add-rent-form" validated={isValidated} onSubmit={onSubmit} noValidate>
            <Form.Group controlId="comment">
              <Form.Control
                as="textarea"
                value={comment}
                onChange={(evt) => setComment(evt.target.value)}
                placeholder="Комментарий"
                required
              />
            </Form.Group>
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
