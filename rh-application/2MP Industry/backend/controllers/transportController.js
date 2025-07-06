const { Transport } = require('../models');

// Get all transports
exports.getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.findAll();
    res.json(transports);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Get total number of transports
exports.getTransportCount = async (req, res) => {
  try {
    const transports = await Transport.findAll();
    res.json(transports.length);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Get transport by ID
exports.getTransportById = async (req, res) => {
  try {
    const transport = await Transport.findByPk(req.params.id);
    if (!transport) {
      return res.status(404).json({ message: 'Transport non trouvé.' });
    }
    res.json(transport);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Create a new transport
exports.createTransport = async (req, res) => {

  try {
    const newTransport = await Transport.create(req.body);
    res.status(201).json(newTransport);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Update an existing transport
exports.updateTransport = async (req, res) => {

  try {
    const transport = await Transport.findByPk(req.params.id);
    if (!transport) {
      return res.status(404).json({ message: 'Transport non trouvé.' });
    }
    await transport.update(req.body);
    res.json(transport);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Delete a transport
exports.deleteTransport = async (req, res) => {
  try {
    const transport = await Transport.findByPk(req.params.id);
    if (!transport) {
      return res.status(404).json({ message: 'Transport non trouvé.' });
    }
    await transport.destroy();
    res.json({ message: 'Transport supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};