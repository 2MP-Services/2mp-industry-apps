const express = require('express');
const documentLegalController = require('../controllers/documentLegalController');
const router = express.Router();

// GET /documentLegals - Get all documentLegals with their associated employees
// Response: Array of documentLegals with employee details
router.get('/', documentLegalController.getAllDocumentLegals);

// GET /documentLegals/count - Get total number of documentLegals
// Response: Number of documentLegals (e.g., 10)
router.get('/count', documentLegalController.getDocumentLegalCount);

// GET /documentLegals/:id - Get documentLegal by ID with associated employees
// Response: DocumentLegal object or 404 if not found
router.get('/:id', documentLegalController.getDocumentLegalById);

// POST /documentLegals - Create a new documentLegal
// Request Body: { name }
// Response: Created documentLegal object or validation errors
router.post(
  '/',
  documentLegalController.createDocumentLegal
);

// PUT /documentLegals/:id - Update an existing documentLegal
// Request Body: Partial documentLegal data (e.g., { name })
// Response: Updated documentLegal object or validation errors
router.put(
  '/:id',
  documentLegalController.updateDocumentLegal
);

// DELETE /documentLegals/:id - Delete a documentLegal by ID
// Response: Success message or 404 if not found
router.delete('/:id', documentLegalController.deleteDocumentLegal);

module.exports = router;