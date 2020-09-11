import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import SubmitBtn from '../SubmitBtn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './DeleteBtn.css';

const DeleteBtn = ({ onDelete, itemId, groupId }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleModal = () => setIsModalOpen((isModalOpen) => !isModalOpen);

  const onError = () => setIsSubmitting(false);

  const onSubmit = (evt) => {

    evt.preventDefault();

    setIsSubmitting(true);
    onDelete(onError, itemId, groupId);
  };

  return (
    <React.Fragment>
      <Button className="btn-danger" onClick={toggleModal} title="Удалить"><FontAwesomeIcon icon={faTrashAlt} /></Button>
      <Modal className="delete-modal" show={isModalOpen} onHide={toggleModal} centered>
        <Modal.Body>
          <h2 className="mb-4 text-center">Удалить строку ?</h2>
          <Form onSubmit={onSubmit} noValidate>
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
