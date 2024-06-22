import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [nombre, setNombre] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contact = {
      nombre,
      correoElectronico,
      direccion,
      telefono,
    };

    try {
      const response = await axios.post('http://localhost:3001/contacts', contact);
      console.log('Contacto guardado:', response.data);
      // Limpiar los campos del formulario después del envío exitoso
      setNombre('');
      setCorreoElectronico('');
      setDireccion('');
      setTelefono('');
      setError(null);
      setSuccess('Contacto guardado exitosamente.');
    } catch (error) {
      console.error('Error al guardar el contacto:', error);
      setError('Error al guardar el contacto. Por favor, revisa los datos e inténtalo de nuevo.');
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <button type="submit">Guardar Contacto</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default ContactForm;
