import React from 'react';
import { useState, useRef } from 'react';
import { Button, Form, Row, Col, Alert, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pictures, setPictures] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  // useState to validate required fields
  const [error, setError] = useState('');
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const dispatch = useDispatch();
  const contactList = useSelector((state) => state.contactList); // contactList 가져옴

  // 이렇게 일일이 함수를 만들기엔 복잡하므로 Form control에 이벤트 핸들러를 만들어서 사용하는 것이 좋다.
  // const getFirstName = (event) => {
  //   event.preventDefault();
  //   console.log(event.target.value);
  //   setFirstName(event.target.value);
  // };

  const validateForm = () => {
    if (!firstName) {
      setError('First Name is required.');
      firstNameRef.current.focus();
      return false;
    }
    if (!lastName) {
      setError('Last Name is required.');
      lastNameRef.current.focus();
      return false;
    }
    if (!phone) {
      setError('Phone Number is required.');
      phoneRef.current.focus();
      return false;
    }
    if (!email) {
      setError('Email is required.');
      emailRef.current.focus();
      return false;
    }

    // 이메일이나 전화번호가 이미 존재하는지 확인
    const emailExists = contactList.some((contact) => contact.email === email);
    if (emailExists) {
      setError('This email is already registered.');
      emailRef.current.focus();
      return false;
    }

    // 전화번호에서 하이픈을 제거
    const phoneWithoutHyphen = (phone) => phone.replace(/-/g, '');

    // 폼 검증 로직
    const normalizedPhone = phoneWithoutHyphen(phone); // 입력된 전화번호에서 하이픈 제거
    const phoneExists = contactList.some(
      (contact) => phoneWithoutHyphen(contact.phone) === normalizedPhone
    );

    if (phoneExists) {
      setError('This phone number is already registered.');
      phoneRef.current.focus();
      return false;
    }

    setError('');
    return true;
  };

  const addContact = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    dispatch({
      type: 'ADD_CONTACT',
      payload: {
        firstName,
        lastName,
        phone,
        email,
        pictures,
        address,
        address2,
        city,
        state,
        zip
      }
    });

    // Reset the form fields
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setPictures('');
    setAddress('');
    setAddress2('');
    setCity('');
    setState('');
    setZip('');
  };

  return (
    <Card className='card'>
      <Card.Body>
        <Form onSubmit={addContact}>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridFirstName'>
              <Form.Label className='label'>First name</Form.Label>
              <Form.Control
                ref={firstNameRef}
                placeholder='First name'
                aria-label='First name'
                aria-describedby='basic-addon1'
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'First name')}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridLastName'>
              <Form.Label className='label'>Last name</Form.Label>
              <Form.Control
                ref={lastNameRef}
                placeholder='Last name'
                aria-label='Last name'
                aria-describedby='basic-addon1'
                onChange={(e) => setLastName(e.target.value)}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Last name')}
              />
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridPhone'>
              <Form.Label className='label'>Phone</Form.Label>
              <Form.Control
                ref={phoneRef}
                type='number'
                placeholder='Phone Number'
                onChange={(e) => setPhone(e.target.value)}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Phone Number')}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label className='label'>Email</Form.Label>
              <Form.Control
                ref={emailRef}
                type='email'
                placeholder='Email address'
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Email address')}
              />
            </Form.Group>
          </Row>

          <Form.Group controlId='formFileMultiple' className='mb-3'>
            <Form.Label className='label'>Pictures</Form.Label>
            <Form.Control
              type='file'
              multiple
              onChange={(e) => setPictures(e.target.files)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGridAddress1'>
            <Form.Label className='label'>Address</Form.Label>
            <Form.Control
              placeholder='1234 Main St'
              onChange={(e) => setAddress(e.target.value)}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = '1234 Main St')}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGridAddress2'>
            <Form.Label className='label'>Address 2</Form.Label>
            <Form.Control
              placeholder='Apartment, studio, or floor'
              onChange={(e) => setAddress2(e.target.value)}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) =>
                (e.target.placeholder = 'Apartment, studio, or floor')
              }
            />
          </Form.Group>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label className='label'>City</Form.Label>
              <Form.Control onChange={(e) => setCity(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label className='label'>State</Form.Label>
              <Form.Select
                defaultValue='Choose... '
                onChange={(e) => setState(e.target.value)}
              >
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridZip'>
              <Form.Label className='label'>Zip</Form.Label>
              <Form.Control onChange={(e) => setZip(e.target.value)} />
            </Form.Group>
          </Row>

          {/* <Form.Group className='mb-3' id='formGridCheckbox'>
          <Form.Check
            type='checkbox'
            label='Save this information for next time'
          />
        </Form.Group> */}

          <Button style={{ width: '100%' }} variant='primary' type='submit'>
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ContactForm;
