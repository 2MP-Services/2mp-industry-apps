const express = require('express');
const { body } = require('express-validator');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// GET /employees - Get all employees with their professions
// Response: Array of employees with profession details
router.get('/', employeeController.getAllEmployees);

// GET /employees/count - Get total number of employees
// Response: Number of employees (e.g., 42)
router.get('/count', employeeController.getEmployeeCount);

// GET /employees/:id - Get employee by ID with profession details
// Response: Employee object or 404 if not found
router.get('/:id', employeeController.getEmployeeById);

// POST /employees - Create a new employee
// Request Body: { first_name, last_name, profession_id, cin, hire_date }
// Response: Created employee object or validation errors
router.post(
  '/',
  [
    body('first_name').notEmpty().withMessage('Le prénom est requis.'),
    body('last_name').notEmpty().withMessage('Le nom est requis.'),
    body('profession_id').isInt().withMessage('ID de profession invalide.'),
    body('cin').notEmpty().withMessage('CIN est requis.'),
    body('hire_date').isDate().withMessage('Date d\'embauche invalide.'),
  ],
  employeeController.createEmployee
);

// PUT /employees/:id - Update an existing employee
// Request Body: Partial employee data (e.g., { first_name, profession_id })
// Response: Updated employee object or validation errors
router.put(
  '/:id',
  [
    body('first_name').optional().notEmpty().withMessage('Le prénom est requis.'),
    body('last_name').optional().notEmpty().withMessage('Le nom est requis.'),
    body('profession_id').optional().isInt().withMessage('ID de profession invalide.'),
    body('cin').optional().notEmpty().withMessage('CIN est requis.'),
    body('hire_date').optional().isDate().withMessage('Date d\'embauche invalide.'),
  ],
  employeeController.updateEmployee
);

// DELETE /employees/:id - Delete an employee by ID
// Response: Success message or 404 if not found
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;