const { MissionOrder, Employee, Commune, Transport, Pays, Daira, Wilaya, MissionDestination } = require('../models');

const getEmployeeFromUser = async (req) => {
    return await Employee.findOne({ where: { user_id: req.user.id } });
};

const getPaysOfCommune = async (commune_id) => {
    const commune = await Commune.findByPk(commune_id);
    if (commune) {
        const daira = await Daira.findByPk(commune.daira_id);
        if (daira) {
            const wilaya = await Wilaya.findByPk(daira.wilaya_id);
            if (wilaya) {
                const pays = await Pays.findByPk(wilaya.pays_id);
                return pays
            }
        }
    }
    return null;
}

const OrderNumber = async (misOrder) => {
    const allValidatedMissionOrders = await MissionOrder.findAll({
        where: { validated: true },
        include: [
            { model: Employee, as: 'employee', attributes: ['first_name', 'last_name'] },
            { model: Commune, as: 'depart_commune', attributes: ['name'] },
            { model: Transport, as: 'transport', attributes: ['registration'] },
            //{ model: Commune, as: 'destinations', attributes: ['name'] },
            {
                model: MissionDestination,
                as: 'destinations',
                include: [
                    { model: Commune, as: 'commune', attributes: ['name'] }
                ],
                separate: true,
                order: [[ // Add this line
                    'createdAt', 'ASC' // Sort by createdAt in ascending order (oldest first)
                ]]
            }],
        // Database-level sorting
        order: [
            // Prioritize: non-validated (0), validated (1), refused (2)
            [
                MissionOrder.sequelize.literal(`
                        CASE 
                            WHEN "validated" = false AND "refused" = false THEN 0
                            WHEN "validated" = true THEN 1
                            WHEN "refused" = true THEN 2
                        END
                    `),
                'ASC'
            ],
            ['updatedAt', 'DESC'] // Newest first within the same status group
        ]
    });
    return String(allValidatedMissionOrders.length + 69).padStart(4, '0') + '/' + new Date(misOrder.createdAt).getFullYear();
}

// Get all mission orders
exports.getAllMissionOrders = async (req, res) => {
    try {
        const whereClause = req.user.role.toString() === "1"
            ? {}
            : { employee_id: (await getEmployeeFromUser(req)).id };

        const missionOrders = await MissionOrder.findAll({
            where: whereClause,
            include: [
                { model: Employee, as: 'employee', attributes: ['first_name', 'last_name'] },
                { model: Commune, as: 'depart_commune', attributes: ['name'] },
                { model: Transport, as: 'transport', attributes: ['registration'] },
                //{ model: Commune, as: 'destinations', attributes: ['name'] },
                {
                    model: MissionDestination,
                    as: 'destinations',
                    include: [
                        { model: Commune, as: 'commune', attributes: ['name'] }
                    ],
                    separate: true,
                    order: [[ // Add this line
                        'createdAt', 'ASC' // Sort by createdAt in ascending order (oldest first)
                    ]]
                }],
            // Database-level sorting
            order: [
                // Prioritize: non-validated (0), validated (1), refused (2)
                [
                    MissionOrder.sequelize.literal(`
                            CASE 
                                WHEN "validated" = false AND "refused" = false THEN 0
                                WHEN "validated" = true THEN 1
                                WHEN "refused" = true THEN 2
                            END
                        `),
                    'ASC'
                ],
                ['updatedAt', 'DESC'] // Newest first within the same status group
            ]
        });
        res.json(missionOrders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

exports.countAllMissionOrders = async (req, res) => {
    try {
        const missionOrders = await MissionOrder.findAll();
        res.json(missionOrders.length);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Create a new mission order
exports.createMissionOrder = async (req, res) => {
    const { billet, employeeId: employee_id_from_req, departCommuneId: depart_commune_id,
        destination: destination, destinationIds: destination_ids, transportId: transport_id,
        validityFrom: validity_from, validityTo: validity_to, reason } = req.body;

    try {
        // Set employee ID and validation status based on role
        const employee_id = req.user.role.toString() === "1"
            ? employee_id_from_req
            : (await getEmployeeFromUser(req)).id;

        const validated = req.user.role.toString() === "1"
            ? true
            : false;

        const refused = false;

        // Generate order number
        const year = new Date().getFullYear();
        const lastOrder = await MissionOrder.findOne({ order: [['id', 'DESC']] });
        const orderNumber = lastOrder ? parseInt(lastOrder.order_number.split('/')[0]) + 69 + 1 : 1;
        const formattedOrderNumber = `${String(orderNumber).padStart(4, '0')}/${year}`;

        const missionOrder = await MissionOrder.create({
            order_number: formattedOrderNumber,
            employee_id,
            depart_commune_id,
            transport_id,
            validity_from,
            validity_to,
            reason,
            created_by: req.user.id,
            validated,
            refused,
            refuseReason: "",
            destination,
            billet
        });

        for (const destination_id of destination_ids) {
            await MissionDestination.create({
                mission_id: missionOrder.id,
                commune_id: destination_id,
            });
        }
        if (missionOrder.validated) {
            missionOrder.order_number = await OrderNumber(missionOrder);
            missionOrder.save();
        }

        res.status(201).json(missionOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

// Get a single mission order by ID
exports.getMissionOrderById = async (req, res) => {
    try {
        const missionOrder = await MissionOrder.findByPk(req.params.id, {
            include: [
                { model: Employee, as: 'employee', attributes: ['first_name', 'last_name', 'user_id'] },
                { model: Commune, as: 'depart_commune', attributes: ['name'] },
                { model: Transport, as: 'transport', attributes: ['type', 'brand', 'model', 'registration'] },
                //{ model: Commune, as: 'destinations', attributes: ['name'] },
                {
                    model: MissionDestination,
                    as: 'destinations',
                    include: [
                        { model: Commune, as: 'commune', attributes: ['name'] }
                    ],
                    separate: true,
                    order: [[ // Add this line
                        'createdAt', 'ASC' // Sort by createdAt in ascending order (oldest first)
                    ]]
                }
            ]
        });

        if (!missionOrder) {
            return res.status(404).json({ message: 'Ordre de mission non trouvé.' });
        }

        // Authorization check
        if (req.user.role.toString() !== "1" && missionOrder.employee_id !== (await getEmployeeFromUser(req)).id) {
            return res.status(403).json({ message: 'Accès refusé.' });
        }
        const order = JSON.parse(JSON.stringify(missionOrder));
        order.depart_pays = await getPaysOfCommune(order.depart_commune_id)
        for (const destination of order.destinations) {
            destination.pays = await getPaysOfCommune(destination.commune_id);
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Validate a mission order
exports.validateOrder = async (req, res) => {
    try {
        const missionOrder = await MissionOrder.findByPk(req.body.id);
        if (!missionOrder) {
            return res.status(404).json({ message: 'Ordre de mission non trouvé.' });
        }

        if (req.user.role.toString() !== "1") {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        missionOrder.validated = true;
        missionOrder.order_number = await OrderNumber(missionOrder);
        await missionOrder.save();

        res.status(200).json(missionOrder);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// refuse a mission order
exports.refuseOrder = async (req, res) => {
    try {
        const missionOrder = await MissionOrder.findByPk(req.body.id);
        if (!missionOrder) {
            return res.status(404).json({ message: 'Ordre de mission non trouvé.' });
        }

        if (req.user.role.toString() !== "1") {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        missionOrder.refused = true;
        if (req.body.refuseReason) {
            missionOrder.refuseReason = req.body.refuseReason;
        }
        await missionOrder.save();

        res.status(200).json(missionOrder);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// refuse a mission order
exports.missionReport = async (req, res) => {
    try {
        const missionOrder = await MissionOrder.findByPk(req.body.id, {
            include: [
                { model: Employee, as: 'employee', attributes: ['first_name', 'last_name', 'user_id'] },
                { model: Commune, as: 'depart_commune', attributes: ['name'] },
                { model: Transport, as: 'transport', attributes: ['type', 'brand', 'model', 'registration'] },
                //{ model: Commune, as: 'destinations', attributes: ['name'] },
                {
                    model: MissionDestination,
                    as: 'destinations',
                    include: [
                        { model: Commune, as: 'commune', attributes: ['name'] }
                    ],
                    separate: true,
                    order: [[ // Add this line
                        'createdAt', 'ASC' // Sort by createdAt in ascending order (oldest first)
                    ]]
                }]
        });
        if (!missionOrder) {
            return res.status(404).json({ message: 'Ordre de mission non trouvé.' });
        }
        if (req.user.id.toString() !== missionOrder.employee.user_id.toString()) {
            return res.status(403).json({ message: 'Accès refusé.' });
        }
        if (req.body.missionReport) {
            // Use .update() with silent option to avoid updating timestamps
            await missionOrder.update(
                { rapport: req.body.missionReport },
                { silent: true } // Prevents updating updated_at
            );
        }
        res.status(200).json(missionOrder);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};
// Delete a mission order
exports.deleteMissionOrder = async (req, res) => {
    try {
        const missionOrder = await MissionOrder.findByPk(req.body.id);

        if (!missionOrder) {
            return res.status(404).json({ message: 'Ordre de mission non trouvé.' });
        }

        // Authorization check for non-admin users
        if (req.user.role.toString() !== "1" && missionOrder.employee_id !== (await getEmployeeFromUser(req)).id) {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        await missionOrder.destroy();
        res.json({ message: 'Ordre de mission supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};