const express = require('express');
const router = express.Router();
const rhDashboardController = require('../controllers/rhDashboardController');

// GET /api/rh-dashboard/stats
router.get('/stats', rhDashboardController.getDashboardStats);

// Modular endpoints for each stats feature
router.get('/stats/employees', rhDashboardController.employeeStats);
router.get('/stats/missions', rhDashboardController.missionStats);
router.get('/stats/exit-authorizations', rhDashboardController.exitAuthorizationStats);
router.get('/stats/decharges', rhDashboardController.dechargeStats);
router.get('/stats/transports', rhDashboardController.transportStats);
router.get('/stats/employees/:id', rhDashboardController.employeeDetailStats);

module.exports = router;
