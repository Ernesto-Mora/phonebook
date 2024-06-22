// src/Service/contactService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/contacts';

export const fetchContacts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};
