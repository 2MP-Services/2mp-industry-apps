const { Employee, Profession, User } = require('../models');
const bcrypt = require('bcryptjs');

// Get all employees with professions
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({ include: [{ model: Profession, as: "profession" }] });
    res.json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Get total number of employees
exports.getEmployeeCount = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees.length);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Get employee by ID with profession details
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, { include: [{ model: Profession, as: "profession" }] });
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé.' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    const profession = await Profession.findByPk(newEmployee.profession_id);
    newEmployee.profession_id = profession.name;

    // Construct the username
    const lastName = newEmployee.last_name.toLowerCase();
    const firstNames = newEmployee.first_name.replace(/\s+/g, '_').toLowerCase();
    const username = `${lastName}_${firstNames}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash("test123", 10);

    // Create the user
    const user = await User.create({
      username: username,
      password_hash: hashedPassword,
      role_id: 2
    });

    newEmployee.user_id= user.id;
    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Update an existing employee
exports.updateEmployee = async (req, res) => {

  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé.' });
    }
    await employee.update(req.body);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé.' });
    }
    const user = await User.findByPk(employee.user_id);
    await employee.destroy();
    res.json({ message: 'Employé supprimé avec succès.' });
    if(user)
      await user.destroy();
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};