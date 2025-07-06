const { DocumentLegal } = require('../models');

// Get all documentLegals with their associated employees
exports.getAllDocumentLegals = async (req, res) => {
  try {
    const documentLegals = await DocumentLegal.findAll();
    res.json(documentLegals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Get total number of documentLegals
exports.getDocumentLegalCount = async (req, res) => {
  try {
    const documentLegals = await DocumentLegal.findAll();
    res.json(documentLegals.length);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Get documentLegal by ID with associated employees
exports.getDocumentLegalById = async (req, res) => {
  try {
    const documentLegal = await DocumentLegal.findByPk(req.params.id, );
    if (!documentLegal) {
      return res.status(404).json({ message: 'DocumentLegal non trouvée.' });
    }
    res.json(documentLegal);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Create a new documentLegal
exports.createDocumentLegal = async (req, res) => {

  try {
    const newDocumentLegal = await DocumentLegal.create(req.body);
    res.status(201).json(newDocumentLegal);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Update an existing documentLegal
exports.updateDocumentLegal = async (req, res) => {

  try {
    const documentLegal = await DocumentLegal.findByPk(req.params.id);
    if (!documentLegal) {
      return res.status(404).json({ message: 'DocumentLegal non trouvée.' });
    }
    await documentLegal.update(req.body);
    res.json(documentLegal);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Delete a documentLegal
exports.deleteDocumentLegal = async (req, res) => {
  try {
    const documentLegal = await DocumentLegal.findByPk(req.params.id);
    if (!documentLegal) {
      return res.status(404).json({ message: 'DocumentLegal non trouvée.' });
    }
    await documentLegal.destroy();
    res.json({ message: 'DocumentLegal supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};