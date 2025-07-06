const express = require('express');
const { body } = require('express-validator');
const transportController = require('../controllers/transportController');
const router = express.Router();

// GET /transports - Get all transports
// Response: Array of transport objects
router.get('/', transportController.getAllTransports);

// GET /transports/count - Get total number of transports
// Response: Number of transports (e.g., 10)
router.get('/count', transportController.getTransportCount);

// GET /transports/:id - Get transport by ID
// Response: Transport object or 404 if not found
router.get('/:id', transportController.getTransportById);

// POST /transports - Create a new transport
// Request Body: { type, brand, model, registration, purchase_date }
// Response: Created transport object or validation errors
router.post(
  '/',
  [
    body('type').notEmpty().withMessage('Le type est requis.'),
    body('brand').notEmpty().withMessage('La marque est requise.'),
    body('model').notEmpty().withMessage('Le modèle est requis.'),
    body('registration').notEmpty().withMessage('L\'immatriculation est requise.'),
    body('purchase_date').isDate().withMessage('Date d\'achat invalide.'),
  ],
  transportController.createTransport
);

// PUT /transports/:id - Update an existing transport
// Request Body: Partial transport data (e.g., { brand, model })
// Response: Updated transport object or validation errors
router.put(
  '/:id',
  [
    body('type').optional().notEmpty().withMessage('Le type est requis.'),
    body('brand').optional().notEmpty().withMessage('La marque est requise.'),
    body('model').optional().notEmpty().withMessage('Le modèle est requis.'),
    body('registration').optional().notEmpty().withMessage('L\'immatriculation est requise.'),
    body('purchase_date').optional().isDate().withMessage('Date d\'achat invalide.'),
  ],
  transportController.updateTransport
);

// DELETE /transports/:id - Delete a transport by ID
// Response: Success message or 404 if not found
router.delete('/:id', transportController.deleteTransport);

module.exports = router;