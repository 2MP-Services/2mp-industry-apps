const express = require('express');
const { body } = require('express-validator');
const { 
  getAllExitAuthorizations, 
  countAllExitAuthorizations, 
  createExitAuthorization, 
  getExitAuthorizationById, 
  deleteExitAuthorization, 
  validateExitAuthorization, 
  refuseExitAuthorization
} = require('../controllers/exitAuthorizationController');

const router = express.Router();

// Middleware for validation
const validateExitAuthorizations = [
  body('employee_id').isInt().withMessage('ID employé invalide.'),
  body('reason').notEmpty().withMessage('Motif requis.'),
  body('sortie_date').isDate().withMessage('Date de sortie invalide.'),
  body('sortie_time').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Heure de sortie invalide (format: HH:mm:ss).'),
  body('entree_date').isDate().withMessage('Date d\'entrée invalide.'),
  body('entree_time').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Heure d\'entrée invalide (format: HH:mm:ss).'),
  body('created_by').isInt().withMessage('ID créateur invalide.')
];

// Routes
router.get('/', getAllExitAuthorizations); // Get all exit authorizations
router.get('/count', countAllExitAuthorizations); // Count all exit authorizations
router.post('/', validateExitAuthorizations, createExitAuthorization); // Create a new exit authorization
router.post('/validate', validateExitAuthorization); // Validate an exit authorization
router.post('/refuse', refuseExitAuthorization); // Refuse an exit authorization
router.get('/:id', getExitAuthorizationById); // Get an exit authorization by ID
router.delete('/:id', deleteExitAuthorization); // Delete an exit authorization

module.exports = router;