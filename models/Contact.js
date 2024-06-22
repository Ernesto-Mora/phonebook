const mongoose = require('mongoose');

// Definición del esquema del contacto
const contactSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correoElectronico: {
    type: String,
    required: true
  },
  direccion: {
    type: String
  },
  telefono: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Contact', contactSchema);
