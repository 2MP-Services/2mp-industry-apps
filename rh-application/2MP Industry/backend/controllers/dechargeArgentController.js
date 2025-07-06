const { DechargeArgent, Employee } = require('../models');

// Helper function to get employee from the logged-in user
const getEmployeeFromUser = async (req) => {
    return await Employee.findOne({ where: { user_id: req.user.id } });
};

// Get all exit authorizations
exports.getAllDechargeArgents = async (req, res) => {
    try {
        // Define query conditions based on user role
        const whereClause = req.user.role.toString() === "1" 
            ? {} 
            : { employee_id: (await getEmployeeFromUser(req)).id };

        const dechargeArgents = await DechargeArgent.findAll({
            where: whereClause,
            include: [
                { model: Employee, as: 'employee', attributes: ['first_name', 'last_name'] }
            ]
        });

        res.json(dechargeArgents);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Count all exit authorizations
exports.countAllDechargeArgents = async (req, res) => {
    try {
        // Extract filters from the request body
        const { validated, refused, notResponded } = req.params;

        // Build the filter object dynamically based on the provided filters
        const filters = {};
        if (validated !== undefined) filters.validated = validated; // Validated filter
        if (refused !== undefined) filters.refused = refused; // Refused filter
        if (notResponded !== undefined) {
            // "Not yet responded" means neither validated nor refused
            filters.validated = false;
            filters.refused = false;
        }

        // Query the database with the filters
        const dechargeArgents = await DechargeArgent.findAll({
            where: filters,
        });

        // Return the count of exit authorizations matching the filters
        res.json(dechargeArgents.length);
    } catch (error) {
        console.error('Error counting exit authorizations:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Create a new exit authorization
exports.createDechargeArgent = async (req, res) => {
    const { employeeId: employee_id_from_req, reason, use_cni, somme_argent, unite_argent } = req.body;

    try {
        // Set employee ID and validation status based on role
        const employee_id = req.user.role.toString() === "1" 
            ? employee_id_from_req 
            : (await getEmployeeFromUser(req)).id;
        
        const validated = req.user.role.toString() === "1" 
            ? true 
            : false;
        
            const refused = false;

        const dechargeArgent = await DechargeArgent.create({
            employee_id,
            reason,
            use_cni,
            somme_argent,
            unite_argent,
            created_by: req.user.id,
            validated,
            refused,
            refuseReason: ''
        });

        res.status(201).json(dechargeArgent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

// Get a single exit authorization by ID
exports.getDechargeArgentById = async (req, res) => {
    try {
        const dechargeArgent = await DechargeArgent.findByPk(req.params.id, {
            include: [
                { model: Employee, as: 'employee', attributes: ['first_name', 'last_name'] }
            ]
        });

        if (!dechargeArgent) {
            return res.status(404).json({ message: 'Decharge d\'argent non trouvée.' });
        }

        // Authorization check
        if (req.user.role.toString() !== "1" && dechargeArgent.employee_id !== (await getEmployeeFromUser(req)).id) {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        res.json(dechargeArgent);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};



// Validate an exit authorization
exports.remisDecharge = async (req, res) => {
    try {
        const dechargeArgent = await DechargeArgent.findByPk(req.body.id);

        if (!dechargeArgent) {
            return res.status(404).json({ message: 'Decharge d\'argent non trouvée.' });
        }

        // Only admin users can validate
        if (req.user.role.toString() !== "1") {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        dechargeArgent.isRemis = true;
        dechargeArgent.remis = req.body.remisValue
        await dechargeArgent.save();

        res.status(200).json(dechargeArgent);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Validate an exit authorization
exports.validateDechargeArgent = async (req, res) => {
    try {
        const dechargeArgent = await DechargeArgent.findByPk(req.body.id);

        if (!dechargeArgent) {
            return res.status(404).json({ message: 'Decharge d\'argent non trouvée.' });
        }

        // Only admin users can validate
        if (req.user.role.toString() !== "1") {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        dechargeArgent.validated = true;
        await dechargeArgent.save();

        res.status(200).json(dechargeArgent);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// refuse an exit authorization
exports.refuseDechargeArgent = async (req, res) => {
    try {
        const dechargeArgent = await DechargeArgent.findByPk(req.body.id);

        if (!dechargeArgent) {
            return res.status(404).json({ message: 'Decharge d\'argent non trouvée.' });
        }

        // Only admin users can validate
        if (req.user.role.toString() !== "1") {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        dechargeArgent.refused = true;
        if(req.body.refuseReason) {
            dechargeArgent.refuseReason = req.body.refuseReason;
        }
        await dechargeArgent.save();

        res.status(200).json(dechargeArgent);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Delete an exit authorization
exports.deleteDechargeArgent = async (req, res) => {
    try {
        const dechargeArgent = await DechargeArgent.findByPk(req.params.id);

        if (!dechargeArgent) {
            return res.status(404).json({ message: 'Decharge d\'argent non trouvée.' });
        }

        // Authorization check for non-admin users
        if (req.user.role.toString() !== "1" && dechargeArgent.employee_id !== (await getEmployeeFromUser(req)).id) {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        await dechargeArgent.destroy();
        res.json({ message: 'Decharge d\'argent supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};