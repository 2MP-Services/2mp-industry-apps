const express = require('express');
const { 
  getAllDechargeArgents, 
  countAllDechargeArgents, 
  createDechargeArgent, 
  getDechargeArgentById, 
  deleteDechargeArgent, 
  validateDechargeArgent, 
  refuseDechargeArgent,
  remisDecharge
} = require('../controllers/dechargeArgentController');

const router = express.Router();

// Routes
router.get('/', getAllDechargeArgents); // Get all exit authorizations
router.get('/count', countAllDechargeArgents); // Count all exit authorizations
router.post('/', createDechargeArgent); // Create a new exit authorization
router.post('/validate', validateDechargeArgent); // Validate an exit authorization
router.post('/remis', remisDecharge); // Validate an exit authorization
router.post('/refuse', refuseDechargeArgent); // Refuse an exit authorization
router.get('/:id', getDechargeArgentById); // Get an exit authorization by ID
router.delete('/:id', deleteDechargeArgent); // Delete an exit authorization

module.exports = router;