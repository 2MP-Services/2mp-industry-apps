const { Employee, Profession, MissionOrder, MissionDestination, Commune, Wilaya, Pays, Transport, ExitAuthorization, DechargeArgent } = require('../models');
const { Op } = require('sequelize');

// Helper to get the first and last day of the current month
function getMonthBounds() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return { first, last };
}

exports.getDashboardStats = async (req, res) => {
  try {
    // Nombre total d'employés
    const totalEmployees = await Employee.count();

    // Répartition par profession
    const employeesByProfession = await Employee.findAll({
      attributes: ['profession_id', [Employee.sequelize.fn('COUNT', Employee.sequelize.col('id')), 'count']],
      group: ['profession_id'],
      raw: true
    });
    // Fetch profession names
    const professions = await Profession.findAll({ raw: true });
    const professionMap = Object.fromEntries(professions.map(p => [p.id, p.name]));
    const repartitionProfession = employeesByProfession.map(e => ({
      profession: professionMap[e.profession_id] || 'Inconnu',
      count: e.count
    }));

    // Nouveaux employés ce mois
    const { first, last } = getMonthBounds();
    const newEmployees = await Employee.count({
      where: {
        hire_date: {
          [Op.gte]: first,
          [Op.lte]: last
        }
      }
    });

    // Liste des employés récemment embauchés (5 derniers)
    const recentEmployees = await Employee.findAll({
      order: [['hire_date', 'DESC']],
      limit: 5,
      include: [{ model: Profession, as: 'profession' }],
      raw: true,
      nest: true
    });

    // Ancienneté moyenne
    const allEmployees = await Employee.findAll({ attributes: ['hire_date'], raw: true });
    let avgTenure = 0;
    if (allEmployees.length > 0) {
      const now = new Date();
      const totalYears = allEmployees.reduce((acc, emp) => {
        if (!emp.hire_date) return acc;
        const diff = now - new Date(emp.hire_date);
        return acc + diff / (1000 * 60 * 60 * 24 * 365.25);
      }, 0);
      avgTenure = (totalYears / allEmployees.length).toFixed(2);
    }

    // Nombre total d'ordres de mission (validated only)
    const totalMissionOrders = await MissionOrder.count({ where: { validated: true } });

    // --- Advanced Stats ---
    // 1. Top Destinations (Commune, Wilaya, Pays)
    const topDestinations = await MissionDestination.findAll({
      attributes: ['commune_id', [MissionDestination.sequelize.fn('COUNT', MissionDestination.sequelize.col('commune_id')), 'count']],
      group: ['commune_id'],
      order: [[MissionDestination.sequelize.literal('count'), 'DESC']],
      limit: 5,
      raw: true
    });
    // Fetch commune, wilaya, pays names
    const communeIds = topDestinations.map(d => d.commune_id);
    const communes = await Commune.findAll({ where: { id: communeIds }, raw: true });
    const communeMap = Object.fromEntries(communes.map(c => [c.id, c]));
    // Get wilayas and pays
    let wilayaMap = {}, paysMap = {};
    if (communes.length > 0) {
      const wilayaIds = [...new Set(communes.map(c => c.daira_id))];
      const wilayas = await Wilaya.findAll({ where: { id: wilayaIds }, raw: true });
      wilayaMap = Object.fromEntries(wilayas.map(w => [w.id, w]));
      const paysIds = [...new Set(wilayas.map(w => w.pays_id))];
      const pays = await Pays.findAll({ where: { id: paysIds }, raw: true });
      paysMap = Object.fromEntries(pays.map(p => [p.id, p]));
    }
    const destinations = topDestinations.map(d => {
      const commune = communeMap[d.commune_id] || {};
      const wilaya = wilayaMap[commune.daira_id] || {};
      const pays = paysMap[wilaya.pays_id] || {};
      return {
        commune: commune.name || 'Inconnu',
        wilaya: wilaya.name || 'Inconnu',
        pays: pays.name || 'Inconnu',
        count: d.count
      };
    });

    // 2. Most Used Transport
    const transportStats = await MissionOrder.findAll({
      attributes: ['transport_id', [MissionOrder.sequelize.fn('COUNT', MissionOrder.sequelize.col('id')), 'count']],
      group: ['transport_id'],
      order: [[MissionOrder.sequelize.literal('count'), 'DESC']],
      limit: 5,
      where: { validated: true },
      raw: true
    });
    const transportIds = transportStats.map(t => t.transport_id);
    const transports = await Transport.findAll({ where: { id: transportIds }, raw: true });
    const knownTypes = ['taxi', 'avion', 'train', 'bateau', 'bus'];
    const transportMap = Object.fromEntries(transports.map(t => {
      let label = t.type;
      if (!knownTypes.includes((t.type || '').toLowerCase())) {
        label = `${t.brand || ''} ${t.model || ''} (${t.registration || ''})`.trim();
      }
      return [t.id.toString(), label];
    }));
    const mostUsedTransports = transportStats.map(t => ({
      transport: transportMap[t.transport_id] || 'Inconnu',
      count: t.count
    }));

    // 3. Employees missing mission reports after 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const missionsNoReport = await MissionOrder.findAll({
      where: {
        rapport: { [Op.or]: [null, ''] },
        validity_to: { [Op.lte]: sevenDaysAgo },
        validated: true
      },
      include: [{ model: Employee, as: 'employee', attributes: ['id', 'first_name', 'last_name'] }],
      raw: true,
      nest: true
    });
    const employeesNoReport = missionsNoReport.map(m => m.employee);

    // 4. Employees with most exit authorizations
    const exitAuthStatsRaw = await ExitAuthorization.findAll({
      attributes: ['employee_id', [ExitAuthorization.sequelize.fn('COUNT', ExitAuthorization.sequelize.col('id')), 'count']],
      group: ['employee_id'],
      order: [[ExitAuthorization.sequelize.literal('count'), 'DESC']],
      limit: 5,
      where: { validated: true },
      raw: true
    });
    const exitEmployeeIds = exitAuthStatsRaw.map(e => e.employee_id);
    const exitEmployees = await Employee.findAll({ where: { id: exitEmployeeIds }, raw: true });
    const exitEmployeeMap = Object.fromEntries(exitEmployees.map(e => [e.id, e.first_name + ' ' + e.last_name]));
    const exitAuthStats = exitAuthStatsRaw.map(e => ({
      employee_id: e.employee_id,
      name: exitEmployeeMap[e.employee_id] || 'Inconnu',
      count: e.count
    }));

    // 5. Decharge Argent stats
    const decharges = await DechargeArgent.findAll({ where: { validated: true }, raw: true });
    const totalMoney = decharges.reduce((sum, d) => sum + parseFloat(d.somme_argent || 0), 0);
    const totalRemis = decharges.reduce((sum, d) => sum + parseFloat(d.remis || 0), 0);
    const remisCount = decharges.filter(d => d.isRemis).length;
    const probRemis = decharges.length > 0 ? (remisCount / decharges.length * 100).toFixed(2) : '0.00';
    const percentRemis = totalMoney > 0 ? (totalRemis / totalMoney * 100).toFixed(2) : '0.00';
    // Who takes the most money
    const moneyByEmployee = {};
    decharges.forEach(d => {
      if (!moneyByEmployee[d.employee_id]) moneyByEmployee[d.employee_id] = 0;
      moneyByEmployee[d.employee_id] += parseFloat(d.somme_argent || 0);
    });
    const topMoneyTakers = Object.entries(moneyByEmployee)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([employee_id, total]) => ({ employee_id, total }));

    // For acceptance rates
    const totalMissionValidated = await MissionOrder.count({ where: { validated: true } });
    const totalMissionRefused = await MissionOrder.count({ where: { validated: false, refused: true } });
    const tauxAcceptationMission = totalMissionValidated + totalMissionRefused > 0 ? ((totalMissionValidated / (totalMissionValidated + totalMissionRefused)) * 100).toFixed(2) : '0.00';

    const totalExitValidated = await ExitAuthorization.count({ where: { validated: true } });
    const totalExitRefused = await ExitAuthorization.count({ where: { validated: false, refused: true } });
    const tauxAcceptationExit = totalExitValidated + totalExitRefused > 0 ? ((totalExitValidated / (totalExitValidated + totalExitRefused)) * 100).toFixed(2) : '0.00';

    const totalDechargeValidated = await DechargeArgent.count({ where: { validated: true } });
    const totalDechargeRefused = await DechargeArgent.count({ where: { validated: false, refused: true } });
    const tauxAcceptationDecharge = totalDechargeValidated + totalDechargeRefused > 0 ? ((totalDechargeValidated / (totalDechargeValidated + totalDechargeRefused)) * 100).toFixed(2) : '0.00';

    // 6. Employee-level stats
    // Fetch all missions, exits, decharges in bulk
    const employeeIdFilter = req.query.employee_id ? parseInt(req.query.employee_id, 10) : null;
    const missionWhere = employeeIdFilter ? { employee_id: employeeIdFilter, validated: true } : { validated: true };
    const dechargeWhere = employeeIdFilter ? { employee_id: employeeIdFilter, validated: true } : { validated: true };
    const allMissions = await MissionOrder.findAll({ attributes: ['employee_id', 'id', 'validity_from', 'validity_to', 'rapport', 'transport_id'], where: missionWhere, raw: true });
    const allExits = await ExitAuthorization.findAll({ attributes: ['employee_id', 'id'], where: employeeIdFilter ? { employee_id: employeeIdFilter, validated: true } : { validated: true }, raw: true });
    const allDecharges = await DechargeArgent.findAll({ attributes: ['employee_id', 'somme_argent', 'remis'], where: dechargeWhere, raw: true });
    const employees = employeeIdFilter ? await Employee.findAll({ where: { id: employeeIdFilter }, raw: true }) : await Employee.findAll({ raw: true });
    // --- Advanced Statistics ---
    // 1. Average mission duration (in days)
    let avgMissionDuration = 0;
    if (allMissions.length > 0) {
      const totalDuration = allMissions.reduce((sum, m) => {
        if (m.validity_from && m.validity_to) {
          const from = new Date(m.validity_from);
          const to = new Date(m.validity_to);
          return sum + ((to - from) / (1000 * 60 * 60 * 24));
        }
        return sum;
      }, 0);
      avgMissionDuration = (totalDuration / allMissions.length).toFixed(2);
    }
    // 2. Mission report completion rate
    let missionReportCompletionRate = 0;
    if (allMissions.length > 0) {
      const completed = allMissions.filter(m => m.rapport && m.rapport.trim() !== '').length;
      missionReportCompletionRate = ((completed / allMissions.length) * 100).toFixed(2);
    }
    // 3. Average decharge amount
    let avgDechargeAmount = 0;
    if (allDecharges.length > 0) {
      const totalDecharge = allDecharges.reduce((sum, d) => sum + parseFloat(d.somme_argent || 0), 0);
      avgDechargeAmount = (totalDecharge / allDecharges.length).toFixed(2);
    }
    // 4. Average travel time by transport type
    let avgTravelTimeByTransport = [];
    if (allMissions.length > 0) {
      // Group by transport_id
      const transportGroups = {};
      allMissions.forEach(m => {
        if (!m.transport_id) return;
        if (!transportGroups[m.transport_id]) transportGroups[m.transport_id] = [];
        if (m.validity_from && m.validity_to) {
          const from = new Date(m.validity_from);
          const to = new Date(m.validity_to);
          // Count days: if same day, 1; else, difference in days + 1
          const days = Math.floor((to - from) / (1000 * 60 * 60 * 24));
          const duration = days >= 0 ? days + 1 : 1;
          transportGroups[m.transport_id].push(duration);
        }
      });
      const transportIds = Object.keys(transportGroups);
      const transports = await Transport.findAll({ where: { id: transportIds }, raw: true });
      const knownTypes = ['taxi', 'avion', 'train', 'bateau', 'bus'];
      const transportMap = Object.fromEntries(transports.map(t => {
        let label = t.type;
        if (!knownTypes.includes((t.type || '').toLowerCase())) {
          label = `${t.brand || ''} ${t.model || ''} (${t.registration || ''})`.trim();
        }
        return [t.id.toString(), label];
      }));
      avgTravelTimeByTransport = transportIds.map(tid => {
        const avg = transportGroups[tid].length > 0 ? (transportGroups[tid].reduce((a, b) => a + b, 0) / transportGroups[tid].length) : null;
        return {
          transport: transportMap[tid] || 'Inconnu',
          avgDuration: avg !== null ? avg : null
        };
      });
    }
    // 5. Per-employee stats
    const empStats = employees.map(emp => {
      const missions = allMissions.filter(m => m.employee_id === emp.id);
      const exits = allExits.filter(e => e.employee_id === emp.id);
      const decharge = allDecharges.filter(d => d.employee_id === emp.id);
      const moneyTaken = decharge.reduce((sum, d) => sum + parseFloat(d.somme_argent || 0), 0);
      const moneyRemis = decharge.reduce((sum, d) => sum + parseFloat(d.remis || 0), 0);
      // Average mission duration per employee
      let avgMissionDurationEmp = 0;
      if (missions.length > 0) {
        const total = missions.reduce((sum, m) => {
          if (m.validity_from && m.validity_to) {
            const from = new Date(m.validity_from);
            const to = new Date(m.validity_to);
            return sum + ((to - from) / (1000 * 60 * 60 * 24));
          }
          return sum;
        }, 0);
        avgMissionDurationEmp = (total / missions.length).toFixed(2);
      }
      // Mission report completion rate per employee
      let missionReportCompletionRateEmp = 0;
      if (missions.length > 0) {
        const completed = missions.filter(m => m.rapport && m.rapport.trim() !== '').length;
        missionReportCompletionRateEmp = ((completed / missions.length) * 100).toFixed(2);
      }
      // Average decharge amount per employee
      let avgDechargeAmountEmp = 0;
      if (decharge.length > 0) {
        avgDechargeAmountEmp = (moneyTaken / decharge.length).toFixed(2);
      }
      // Average travel time by transport type per employee
      let avgTravelTimeByTransportEmp = [];
      if (missions.length > 0) {
        const transportGroupsEmp = {};
        missions.forEach(m => {
          if (!m.transport_id) return;
          if (!transportGroupsEmp[m.transport_id]) transportGroupsEmp[m.transport_id] = [];
          if (m.validity_from && m.validity_to) {
            const from = new Date(m.validity_from);
            const to = new Date(m.validity_to);
            // Count days: if same day, 1; else, difference in days + 1
            const days = Math.floor((to - from) / (1000 * 60 * 60 * 24));
            const duration = days >= 0 ? days + 1 : 1;
            transportGroupsEmp[m.transport_id].push(duration);
          }
        });
        const transportIdsEmp = Object.keys(transportGroupsEmp);
        // Use the same transportMap as above (for names)
        avgTravelTimeByTransportEmp = transportIdsEmp.map(tid => {
          const avg = transportGroupsEmp[tid].length > 0 ? (transportGroupsEmp[tid].reduce((a, b) => a + b, 0) / transportGroupsEmp[tid].length) : null;
          return {
            transport: transportMap[tid] || 'Inconnu',
            avgDuration: avg !== null ? avg : null
          };
        });
      }
      return {
        employee_id: emp.id,
        name: emp.first_name + ' ' + emp.last_name,
        missions: missions.length,
        exits: exits.length,
        moneyTaken,
        moneyRemis,
        avgMissionDuration: avgMissionDurationEmp,
        missionReportCompletionRate: missionReportCompletionRateEmp,
        avgDechargeAmount: avgDechargeAmountEmp,
        avgTravelTimeByTransport: avgTravelTimeByTransportEmp
      };
    });
    res.json({
      totalEmployees,
      repartitionProfession,
      newEmployees,
      avgTenure,
      recentEmployees,
      totalMissionOrders,
      destinations,
      mostUsedTransports,
      employeesNoReport,
      exitAuthStats,
      totalMoney,
      topMoneyTakers,
      probRemis,
      percentRemis,
      avgMissionDuration,
      missionReportCompletionRate,
      avgDechargeAmount,
      avgTravelTimeByTransport,
      empStats: empStats.map(e => ({
        ...e,
        avgTravelTimeByTransport: e.avgTravelTimeByTransport.map(t => ({
          ...t,
          avgDuration: typeof t.avgDuration === 'number' ? t.avgDuration : (typeof t.avgDuration === 'string' && !isNaN(parseFloat(t.avgDuration)) ? parseFloat(t.avgDuration) : null)
        }))
      })),
      tauxAcceptationMission,
      tauxAcceptationExit,
      tauxAcceptationDecharge
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Modular stats endpoints
exports.employeeStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.count();
    const employeesByProfession = await Employee.findAll({
      attributes: ['profession_id', [Employee.sequelize.fn('COUNT', Employee.sequelize.col('id')), 'count']],
      group: ['profession_id'], raw: true
    });
    const professions = await Profession.findAll({ raw: true });
    const professionMap = Object.fromEntries(professions.map(p => [p.id, p.name]));
    const repartitionProfession = employeesByProfession.map(e => ({
      profession: professionMap[e.profession_id] || 'Inconnu', count: e.count
    }));
    const { first, last } = getMonthBounds();
    const newEmployees = await Employee.count({ where: { hire_date: { [Op.gte]: first, [Op.lte]: last } } });
    const recentEmployees = await Employee.findAll({ order: [['hire_date', 'DESC']], limit: 5, include: [{ model: Profession, as: 'profession' }], raw: true, nest: true });
    const allEmployees = await Employee.findAll({ attributes: ['hire_date'], raw: true });
    let avgTenure = 0;
    if (allEmployees.length > 0) {
      const now = new Date();
      const totalYears = allEmployees.reduce((acc, emp) => { if (!emp.hire_date) return acc; const diff = now - new Date(emp.hire_date); return acc + diff / (1000 * 60 * 60 * 24 * 365.25); }, 0);
      avgTenure = (totalYears / allEmployees.length).toFixed(2);
    }
    res.json({ totalEmployees, repartitionProfession, newEmployees, avgTenure, recentEmployees });
  } catch (error) { res.status(500).json({ message: 'Erreur serveur.' }); }
};

exports.missionStats = async (req, res) => {
  try {
    const totalMissionOrders = await MissionOrder.count({ where: { validated: true } });
    const topDestinations = await MissionDestination.findAll({ attributes: ['commune_id', [MissionDestination.sequelize.fn('COUNT', MissionDestination.sequelize.col('commune_id')), 'count']], group: ['commune_id'], order: [[MissionDestination.sequelize.literal('count'), 'DESC']], limit: 5, raw: true });
    const communeIds = topDestinations.map(d => d.commune_id);
    const communes = await Commune.findAll({ where: { id: communeIds }, raw: true });
    const communeMap = Object.fromEntries(communes.map(c => [c.id, c]));
    let wilayaMap = {}, paysMap = {};
    if (communes.length > 0) {
      const wilayaIds = [...new Set(communes.map(c => c.daira_id))];
      const wilayas = await Wilaya.findAll({ where: { id: wilayaIds }, raw: true });
      wilayaMap = Object.fromEntries(wilayas.map(w => [w.id, w]));
      const paysIds = [...new Set(wilayas.map(w => w.pays_id))];
      const pays = await Pays.findAll({ where: { id: paysIds }, raw: true });
      paysMap = Object.fromEntries(pays.map(p => [p.id, p]));
    }
    const destinations = topDestinations.map(d => {
      const commune = communeMap[d.commune_id] || {};
      const wilaya = wilayaMap[commune.daira_id] || {};
      const pays = paysMap[wilaya.pays_id] || {};
      return { commune: commune.name || 'Inconnu', wilaya: wilaya.name || 'Inconnu', pays: pays.name || 'Inconnu', count: d.count };
    });
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const missionsNoReport = await MissionOrder.findAll({ where: { rapport: { [Op.or]: [null, ''] }, validity_to: { [Op.lte]: sevenDaysAgo }, validated: true }, include: [{ model: Employee, as: 'employee', attributes: ['id', 'first_name', 'last_name'] }], raw: true, nest: true });
    const employeesNoReport = missionsNoReport.map(m => m.employee);
    res.json({ totalMissionOrders, destinations, employeesNoReport });
  } catch (error) { res.status(500).json({ message: 'Erreur serveur.' }); }
};

exports.exitAuthorizationStats = async (req, res) => {
  try {
    const exitAuthStatsRaw = await ExitAuthorization.findAll({ attributes: ['employee_id', [ExitAuthorization.sequelize.fn('COUNT', ExitAuthorization.sequelize.col('id')), 'count']], group: ['employee_id'], order: [[ExitAuthorization.sequelize.literal('count'), 'DESC']], limit: 5, where: { validated: true }, raw: true });
    const exitEmployeeIds = exitAuthStatsRaw.map(e => e.employee_id);
    const exitEmployees = await Employee.findAll({ where: { id: exitEmployeeIds }, raw: true });
    const exitEmployeeMap = Object.fromEntries(exitEmployees.map(e => [e.id, e.first_name + ' ' + e.last_name]));
    const exitAuthStats = exitAuthStatsRaw.map(e => ({
      employee_id: e.employee_id,
      name: exitEmployeeMap[e.employee_id] || 'Inconnu',
      count: e.count
    }));
    res.json({ exitAuthStats });
  } catch (error) { res.status(500).json({ message: 'Erreur serveur.' }); }
};

exports.dechargeStats = async (req, res) => {
  try {
    const decharges = await DechargeArgent.findAll({ where: { validated: true }, raw: true });
    const totalMoney = decharges.reduce((sum, d) => sum + parseFloat(d.somme_argent || 0), 0);
    const totalRemis = decharges.reduce((sum, d) => sum + parseFloat(d.remis || 0), 0);
    const remisCount = decharges.filter(d => d.isRemis).length;
    const probRemis = decharges.length > 0 ? (remisCount / decharges.length * 100).toFixed(2) : '0.00';
    const percentRemis = totalMoney > 0 ? (totalRemis / totalMoney * 100).toFixed(2) : '0.00';
    const moneyByEmployee = {};
    decharges.forEach(d => { if (!moneyByEmployee[d.employee_id]) moneyByEmployee[d.employee_id] = 0; moneyByEmployee[d.employee_id] += parseFloat(d.somme_argent || 0); });
    const topMoneyTakers = Object.entries(moneyByEmployee).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([employee_id, total]) => ({ employee_id, total }));
    res.json({ totalMoney, topMoneyTakers, probRemis, percentRemis });
  } catch (error) { res.status(500).json({ message: 'Erreur serveur.' }); }
};

exports.transportStats = async (req, res) => {
  try {
    const transportStats = await MissionOrder.findAll({ attributes: ['transport_id', [MissionOrder.sequelize.fn('COUNT', MissionOrder.sequelize.col('id')), 'count']], group: ['transport_id'], order: [[MissionOrder.sequelize.literal('count'), 'DESC']], limit: 3, where: { validated: true }, raw: true });
    const transportIds = transportStats.map(t => t.transport_id);
    const transports = await Transport.findAll({ where: { id: transportIds }, raw: true });
    const knownTypes = ['taxi', 'avion', 'train', 'bateau', 'bus'];
    const transportMap = Object.fromEntries(transports.map(t => {
      let label = t.type;
      if (!knownTypes.includes((t.type || '').toLowerCase())) {
        label = `${t.brand || ''} ${t.model || ''} (${t.registration || ''})`.trim();
      }
      return [t.id, label];
    }));
    const mostUsedTransports = transportStats.map(t => ({
      transport: transportMap[t.transport_id] || 'Inconnu',
      count: t.count
    }));
    res.json({ mostUsedTransports });
  } catch (error) { res.status(500).json({ message: 'Erreur serveur.' }); }
};

exports.employeeDetailStats = async (req, res) => {
  try {
    const empId = parseInt(req.params.id, 10);
    const emp = await Employee.findByPk(empId, { raw: true });
    if (!emp) return res.status(404).json({ message: 'Employé non trouvé.' });
    const missions = await MissionOrder.count({ where: { employee_id: empId, validated: true } });
    const exits = await ExitAuthorization.count({ where: { employee_id: empId, validated: true } });
    const decharges = await DechargeArgent.findAll({ where: { employee_id: empId, validated: true }, raw: true });
    const moneyTaken = decharges.reduce((sum, d) => sum + parseFloat(d.somme_argent || 0), 0);
    const moneyRemis = decharges.reduce((sum, d) => sum + parseFloat(d.remis || 0), 0);
    res.json({ employee_id: emp.id, name: emp.first_name + ' ' + emp.last_name, missions, exits, moneyTaken, moneyRemis });
  } catch (error) { res.status(500).json({ message: 'Erreur serveur.' }); }
};
