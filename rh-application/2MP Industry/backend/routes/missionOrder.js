const express = require('express');
const { body } = require('express-validator');
const { getAllMissionOrders, countAllMissionOrders, createMissionOrder, getMissionOrderById, deleteMissionOrder, validateOrder, refuseOrder, missionReport } = require('../controllers/missionOrderController');
const router = express.Router();

// Middleware for validation
const validateMissionOrders = [
  body('employee_id').isInt().withMessage('ID employé invalide.'),
  body('depart_commune_id').isInt().withMessage('ID commune départ invalide.'),
  body('destination_ids').isArray().withMessage('Destinations invalides.'),
  body('transport_id').isInt().withMessage('ID transport invalide.'),
  body('validity_from').isDate().withMessage('Date de validité invalide.'),
  body('validity_to').isDate().withMessage('Date de validité invalide.'),
  body('reason').notEmpty().withMessage('Motif requis.')
];

// Routes
router.get('/', getAllMissionOrders); // Get all mission orders
router.get('/count', countAllMissionOrders); // Count all mission orders
router.post('/', validateMissionOrders, createMissionOrder); // Create a mission order
router.post('/validate', validateOrder); 
router.post('/refuse', refuseOrder); 
router.post('/report', missionReport); 
router.get('/:id', getMissionOrderById); // Get a mission order by ID
router.delete('/:id',deleteMissionOrder); // Delete a mission order

module.exports = router;