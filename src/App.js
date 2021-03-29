import React from 'react';
import ContactForm from './Phonebook/ContactForm';
import ContactList from './Phonebook/ContactList';
import Filter from './Phonebook/Filter';
import Container from './Container';
import '../src/bases.css';

const App = props => {
  return (
    <div>
      <Container>
        <ContactForm />
        <Filter />
        <ContactList />
      </Container>
    </div>
  );
};

export default App;
