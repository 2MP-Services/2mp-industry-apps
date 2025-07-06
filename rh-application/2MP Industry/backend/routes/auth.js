const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Employee, Profession } = require('../models'); // Assuming you have a User model
const authMiddleware = require('../middleware/authMiddleware'); // Import your existing auth middleware
const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Nom d\'utilisateur incorrect.' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT avec une durée de validité de 24 heures
    const token = jwt.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour récupérer les informations de l'utilisateur connecté
router.get('/whoami', authMiddleware, async (req, res) => {
  try {
    // Récupérer l'utilisateur à partir de l'ID dans le token
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] }, // Exclure le champ du mot de passe
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const employee = await Employee.findOne({ where: { user_id: user.id }, include: [{model:Profession,as:"profession"}] });

    // Retourner les informations de l'utilisateur avec son rôle
    res.json({
      id: user.id,
      username: user.username,
      role: user.role_id, // Assuming `role_id` represents the user's role
      employee
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour changer le mot de passe
router.post('/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Récupérer l'utilisateur à partir de l'ID dans le token
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérifier si le mot de passe actuel est correct
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Le mot de passe actuel est incorrect.' });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe dans la base de données
    await user.update({ password_hash: hashedPassword });

    res.json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});


module.exports = router;