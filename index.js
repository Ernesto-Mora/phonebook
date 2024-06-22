const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Contact = require('./models/Contact'); // Importar el modelo de Contact

// Middleware para parsear JSON y permitir CORS
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/phonebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
  process.exit(1);  
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send({ message: 'Error al crear el contacto', error });
  }
});


app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los contactos', error });
  }
});


app.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send({ message: 'Contacto no encontrado' });
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el contacto', error });
  }
});


app.patch('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) {
      return res.status(404).send({ message: 'Contacto no encontrado' });
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(400).send({ message: 'Error al actualizar el contacto', error });
  }
});


app.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).send({ message: 'Contacto no encontrado' });
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar el contacto', error });
  }
});
