import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ContactForm from './component/ContactForm';
import ContactList from './component/ContactList';

function App() {
  return (
    <div>
      <h1 className='title'>Contact Lists</h1>
      <Container>
        <Row className='d-flex flex-column flex-md-row'>
          {/* create contact form */}
          <Col lg={5}>
            <ContactForm />
          </Col>
          {/* contact list */}
          <Col lg={7}>
            <ContactList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
