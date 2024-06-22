// src/App.jsx
import React, { useState, useEffect } from 'react';
import { fetchContacts } from './services/contactService';
import ContactForm from './components/ContactForm';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [error, setError] = useState('');

  const getContacts = async () => {
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Error al obtener los contactos. Inténtalo de nuevo más tarde.');
      setTimeout(() => setError(''), 3000);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="container">
      <h1>Directorio de Contactos</h1>
      {error && <div className="error-message">{error}</div>}
      <ContactForm fetchContacts={getContacts} currentContact={currentContact} setCurrentContact={setCurrentContact} />
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.phone} - {contact.email}
            <button onClick={() => setCurrentContact(contact)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
