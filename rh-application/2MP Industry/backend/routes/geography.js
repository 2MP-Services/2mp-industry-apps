const express = require('express');
const { Wilaya, Daira, Commune, Pays } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');

// GET /Pays (new route)
router.get('/pays', async (req, res) => {
  try {
    const pays = await Pays.findAll({ attributes: ['id', 'name'] });
    res.json(pays);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// GET /Pays (if pays ==! 4)
router.get('/pays/:commune_id', async (req, res) => {
  const commune_id = req.params.commune_id;
  try {
    const commune = await Commune.findByPk(commune_id);
    if (commune) {
      const daira = await Daira.findByPk(commune.daira_id);
      if (daira) {
        const wilaya = await wilaya.findByPk(daira.wilaya_id);
        if (wilaya) {
          const pays = await Pays.findByPk(wilaya.pays_id);
          if (pays)
            res.json(pays);
          else res.status(404)
        } else res.status(400)
      } else res.status(400)
    } else res.status(400)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// GET /wilayas
router.get('/wilayas', async (req, res) => {
  let { pays_id } = req.query;
  if (!pays_id) {
    pays_id = 4;
  }
  try {
    const wilayas = await Wilaya.findAll({
      where: { pays_id },
      attributes: ['id', 'name']
    });
    res.json(wilayas);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// GET /dairas?wilaya_id=...
router.get('/dairas', async (req, res) => {
  const { wilaya_id } = req.query;
  if (!wilaya_id) {
    return res.status(400).json({ message: 'Le paramètre wilaya_id est requis.' });
  }
  try {
    const dairas = await Daira.findAll({
      where: { wilaya_id },
      attributes: ['id', 'name']
    });
    res.json(dairas);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// GET /communes?daira_id=...
router.get('/communes', async (req, res) => {
  const { daira_id, pays_id } = req.query;

  if (!daira_id && !pays_id) {
    return res.status(400).json({ message: 'Le paramètre daira_id ou pays_id est requis.' });
  }

  try {
    let communes = [];

    if (daira_id) {
      // Fetch communes by daira_id
      communes = await Commune.findAll({
        where: { daira_id },
        attributes: ['id', 'name']
      });
    } else if (pays_id) {
      // Fetch wilayas by pays_id
      const wilayas = await Wilaya.findAll({
        where: { pays_id },
        attributes: ['id']
      });

      const wilayaIds = wilayas.map(wilaya => wilaya.id);

      // Fetch dairas by wilaya_ids
      const dairas = await Daira.findAll({
        where: { wilaya_id: { [Op.in]: wilayaIds } },
        attributes: ['id']
      });

      const dairaIds = dairas.map(daira => daira.id);

      // Fetch communes by daira_ids
      communes = await Commune.findAll({
        where: { daira_id: { [Op.in]: dairaIds } },
        attributes: ['id', 'name']
      });
    }

    res.json(communes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});


router.get('/commune', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Le paramètre id est requis.' });
  }
  try {
    const commune = await Commune.findByPk(id);
    res.json(commune);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});



// Create a new commune (new route)
router.post('/commune', async (req, res) => {
  const { pays_id } = req.body;
  const { name } = req.body;
  if (!pays_id) {
    return res.status(400).json({ message: 'Le paramètre pays_id est requis.' });
  }
  try {
    const newWilaya = await Wilaya.create(req.body); // name and pays_id
    const newDaira = await Daira.create({ name, wilaya_id: newWilaya.id });
    const newCommune = await Commune.create({ name, daira_id: newDaira.id });
    res.status(201).json({
      newWilaya,
      newDaira,
      newCommune
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;