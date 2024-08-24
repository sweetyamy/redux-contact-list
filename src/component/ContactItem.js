import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const ContactItem = ({ item, index, isSelected, onCheckboxChange }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const defaultImage =
    'https://tse4.mm.bing.net/th?id=OIP.W8ud2BkTufVc7lhyTykthgHaE7&pid=Api&P=0&h=180';

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumberString; // 만약 매치되지 않으면 원래 전화번호 반환
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = () => {
    dispatch({ type: 'DELETE_CONTACT', payload: { email: item.email } });
    handleClose(); // 모달을 닫음
  };

  return (
    <div className='contact-list--item'>
      <Row className='align-items-center'>
        <Col lg={1}>
          <Form.Check
            type='checkbox'
            checked={isSelected}
            onChange={() => onCheckboxChange(item.email)}
          />
        </Col>
        <Col lg={1}>
          <div className='contact-list--index'>
            {index} {/* 번호 표시 */}
          </div>
        </Col>
        <Col lg={1}>
          <img
            className='user-picture'
            src={item?.pictures ? item.pictures : defaultImage}
            alt='user-picture'
          />
        </Col>
        <Col lg={2}>
          <div className='contact-list--fullname'>
            {item?.firstName.charAt(0).toUpperCase() + item?.firstName.slice(1)}{' '}
            {item?.lastName.charAt(0).toUpperCase() + item?.lastName.slice(1)}
          </div>
          <div className='contact-list--phone'>
            {formatPhoneNumber(item?.phone)}
          </div>
        </Col>
        <Col lg={3} className='contact-list--email'>
          <a href={`mailto:${item?.email}`}>{item?.email}</a>
        </Col>
        <Col lg={3} className='contact-list--address'>
          {item?.address ? item.address + ', ' : ''}
          {item?.address2 ? item.address2 + ', ' : ''}
        </Col>
        <Col lg={1} className='contact-list--ico'>
          <Button variant='danger' size='sm' onClick={handleShow}>
            -
          </Button>
        </Col>
      </Row>
      <hr className='contact-list-divider' />

      {/* 삭제 확인 모달 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactItem;
