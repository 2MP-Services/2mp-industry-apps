const { Profession, Employee } = require('../models');
const { MissionOrder } = require('../models');

const updateOrderNumbers = async () => {
    try {
        // Get all validated orders sorted by validation date (updatedAt)
        const validatedOrders = await MissionOrder.findAll({
            where: { validated: true },
            order: [['createdAt', 'ASC']] // Oldest first
        });

        let count = 70;
        const year = new Date().getFullYear();

        for (const order of validatedOrders) {
            const newOrderNumber = String(count).padStart(4, '0') + `/${year}`;
            await MissionOrder.update(
                { order_number: newOrderNumber },
                { where: { id: order.id } }
            );
            count++;
        }

        console.log('Order numbers updated successfully');
    } catch (error) {
        console.error('Error updating order numbers:', error);
    }
};
// Get all professions with their associated employees
exports.getAllProfessions = async (req, res) => {
  try {
    const professions = await Profession.findAll();
    res.json(professions);
    //await updateOrderNumbers()
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Get total number of professions
exports.getProfessionCount = async (req, res) => {
  try {
    const professions = await Profession.findAll();
    res.json(professions.length);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Get profession by ID with associated employees
exports.getProfessionById = async (req, res) => {
  try {
    const profession = await Profession.findByPk(req.params.id, );
    if (!profession) {
      return res.status(404).json({ message: 'Profession non trouvée.' });
    }
    res.json(profession);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Create a new profession
exports.createProfession = async (req, res) => {

  try {
    const newProfession = await Profession.create(req.body);
    res.status(201).json(newProfession);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Update an existing profession
exports.updateProfession = async (req, res) => {

  try {
    const profession = await Profession.findByPk(req.params.id);
    if (!profession) {
      return res.status(404).json({ message: 'Profession non trouvée.' });
    }
    await profession.update(req.body);
    res.json(profession);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Delete a profession
exports.deleteProfession = async (req, res) => {
  try {
    const profession = await Profession.findByPk(req.params.id);
    if (!profession) {
      return res.status(404).json({ message: 'Profession non trouvée.' });
    }
    await profession.destroy();
    res.json({ message: 'Profession supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};