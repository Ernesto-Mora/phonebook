import React from 'react';
import axios from 'axios';

const ContactList = ({ contacts, fetchContacts, setCurrentContact }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact', error);
    }
  };

  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact._id}>
          {contact.nombre} - {contact.telefono}
          <button onClick={() => setCurrentContact(contact)}>Editar</button>
          <button onClick={() => handleDelete(contact._id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
