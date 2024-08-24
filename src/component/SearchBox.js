import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const SearchBox = ({ selectedItems = [], clearSelection }) => {
  let [keyword, setKeyword] = useState('');
  let [showModal, setShowModal] = useState(false);
  let dispatch = useDispatch();

  const searchName = (event) => {
    event.preventDefault();
    dispatch({ type: 'SEARCH_NAME', payload: { keyword: keyword } });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchName(event);
    }
  };

  const showAllContacts = () => {
    dispatch({ type: 'ALL_CONTACTS' });
  };

  const handleDeleteSelected = () => {
    dispatch({ type: 'DELETE_SELECTED_CONTACTS', payload: selectedItems });
    clearSelection();
    setShowModal(false); // 모달을 닫음
  };

  return (
    <>
      <Form onSubmit={searchName}>
        <Row>
          <Col lg={7}>
            <Form.Control
              type='text'
              placeholder='Enter name'
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Col>
          <Col lg={5} className='search-btn-area'>
            <Button variant='primary' type='submit'>
              Search
            </Button>
            <Button
              variant='success'
              type='button'
              className='btn-all'
              onClick={showAllContacts}
            >
              Show All
            </Button>
            <Button
              variant='danger'
              type='button'
              className='btn-delete'
              onClick={() => setShowModal(true)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Form>

      {/* 삭제 확인 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete selected contacts?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDeleteSelected}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchBox;
