import React, { useState } from 'react';
import { Row, Modal, Button } from 'react-bootstrap';
import SearchBox from './SearchBox';
import ContactItem from './ContactItem';
import { useSelector, useDispatch } from 'react-redux';
import PaginationComponent from './PaginationComponent.js';

const ContactList = () => {
  const dispatch = useDispatch();

  const filteredList = useSelector((state) => state.filteredList || []);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = (email) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(email)
        ? prevSelectedItems.filter((item) => item !== email)
        : [...prevSelectedItems, email]
    );
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteSelected = () => {
    dispatch({ type: 'DELETE_SELECTED_CONTACTS', payload: selectedItems });
    clearSelection();
    setShowModal(false);
  };

  return (
    <div>
      <Row>
        <SearchBox
          selectedItems={selectedItems}
          clearSelection={clearSelection}
          setShowModal={setShowModal}
        />
      </Row>
      <Row>
        <hr className='search-hr' />
      </Row>
      <Row>
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <ContactItem
              key={item.email}
              item={item}
              index={index + 1}
              isSelected={selectedItems.includes(item.email)}
              onCheckboxChange={handleCheckboxChange}
            />
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </Row>
      {filteredList.length > 0 && (
        <div className='pagination-container'>
          <PaginationComponent
            itemsPerPage={itemsPerPage}
            totalItems={filteredList.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

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
    </div>
  );
};

export default ContactList;
