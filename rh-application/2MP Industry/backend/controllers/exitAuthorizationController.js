const { ExitAuthorization, Employee } = require('../models');

// Helper function to get employee from the logged-in user
const getEmployeeFromUser = async (req) => {
    return await Employee.findOne({ where: { user_id: req.user.id } });
};

// Get all exit authorizations
exports.getAllExitAuthorizations = async (req, res) => {
    try {
        // Define query conditions based on user role
        const whereClause = req.user.role.toString() === "1" 
            ? {} 
            : { employee_id: (await getEmployeeFromUser(req)).id };

        const exitAuthorizations = await ExitAuthorization.findAll({
            where: whereClause,
            include: [
                { model: Employee, as: 'employee', attributes: ['first_name', 'last_name'] }
            ]
        });

        res.json(exitAuthorizations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Count all exit authorizations
exports.countAllExitAuthorizations = async (req, res) => {
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
        const exitAuthorizations = await ExitAuthorization.findAll({
            where: filters,
        });

        // Return the count of exit authorizations matching the filters
        res.json(exitAuthorizations.length);
    } catch (error) {
        console.error('Error counting exit authorizations:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Create a new exit authorization
exports.createExitAuthorization = async (req, res) => {
    const { employeeId: employee_id_from_req, reason, sortie_date, sortie_time, entree_date, entree_time } = req.body;

    try {
        // Set employee ID and validation status based on role
        const employee_id = req.user.role.toString() === "1" 
            ? employee_id_from_req 
            : (await getEmployeeFromUser(req)).id;
        
        const validated = req.user.role.toString() === "1" 
            ? true 
            : false;
        
            const refused = false;

        const exitAuthorization = await ExitAuthorization.create({
            employee_id,
            reason,
            sortie_date,
            sortie_time,
            entree_date,
            entree_time,
            created_by: req.user.id,
            validated,
            refused,
            refuseReason: ''
        });

        res.status(201).json(exitAuthorization);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

// Get a single exit authorization by ID
exports.getExitAuthorizationById = async (req, res) => {
    try {
        const exitAuthorization = await ExitAuthorization.findByPk(req.params.id, {
            include: [
                { model: Employee, as: 'employee', attributes: ['first_name', 'last_name'] }
            ]
        });

        if (!exitAuthorization) {
            return res.status(404).json({ message: 'Autorisation de sortie non trouvée.' });
        }

        // Authorization check
        if (req.user.role.toString() !== "1" && exitAuthorization.employee_id !== (await getEmployeeFromUser(req)).id) {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        res.json(exitAuthorization);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Validate an exit authorization
exports.validateExitAuthorization = async (req, res) => {
    try {
        const exitAuthorization = await ExitAuthorization.findByPk(req.body.id);

        if (!exitAuthorization) {
            return res.status(404).json({ message: 'Autorisation de sortie non trouvée.' });
        }

        // Only admin users can validate
        if (req.user.role.toString() !== "1") {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        exitAuthorization.validated = true;
        await exitAuthorization.save();

        res.status(200).json(exitAuthorization);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// refuse an exit authorization
exports.refuseExitAuthorization = async (req, res) => {
    try {
        const exitAuthorization = await ExitAuthorization.findByPk(req.body.id);

        if (!exitAuthorization) {
            return res.status(404).json({ message: 'Autorisation de sortie non trouvée.' });
        }

        // Only admin users can validate
        if (req.user.role.toString() !== "1") {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        exitAuthorization.refused = true;
        if(req.body.refuseReason) {
            exitAuthorization.refuseReason = req.body.refuseReason;
        }
        await exitAuthorization.save();

        res.status(200).json(exitAuthorization);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Delete an exit authorization
exports.deleteExitAuthorization = async (req, res) => {
    try {
        const exitAuthorization = await ExitAuthorization.findByPk(req.params.id);

        if (!exitAuthorization) {
            return res.status(404).json({ message: 'Autorisation de sortie non trouvée.' });
        }

        // Authorization check for non-admin users
        if (req.user.role.toString() !== "1" && exitAuthorization.employee_id !== (await getEmployeeFromUser(req)).id) {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        await exitAuthorization.destroy();
        res.json({ message: 'Autorisation de sortie supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};