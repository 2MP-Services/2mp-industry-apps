const express = require('express');
const { body } = require('express-validator');
const professionController = require('../controllers/professionController');
const router = express.Router();

// GET /professions - Get all professions with their associated employees
// Response: Array of professions with employee details
router.get('/', professionController.getAllProfessions);

// GET /professions/count - Get total number of professions
// Response: Number of professions (e.g., 10)
router.get('/count', professionController.getProfessionCount);

// GET /professions/:id - Get profession by ID with associated employees
// Response: Profession object or 404 if not found
router.get('/:id', professionController.getProfessionById);

// POST /professions - Create a new profession
// Request Body: { name }
// Response: Created profession object or validation errors
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Le nom de la profession est requis.'),
  ],
  professionController.createProfession
);

// PUT /professions/:id - Update an existing profession
// Request Body: Partial profession data (e.g., { name })
// Response: Updated profession object or validation errors
router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Le nom de la profession est requis.'),
  ],
  professionController.updateProfession
);

// DELETE /professions/:id - Delete a profession by ID
// Response: Success message or 404 if not found
router.delete('/:id', professionController.deleteProfession);

module.exports = router;