import React from 'react';
import { Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import CyberpunkCard from './CyberpunkCard';
import { Group, RocketLaunch, AccountTree, Paid, DirectionsCar } from '@mui/icons-material';

function safeValue(val, fallback = '-') {
  return val !== undefined && val !== null && val !== '' ? val : fallback;
}

function toNumber(val) {
  if (typeof val === 'number') return val;
  if (typeof val === 'string' && val.trim() !== '') return Number(val);
  return 0;
}

// Helper: group employees without report by id and count occurrences
function groupNoReport(employees) {
  const map = new Map();
  for (const e of employees || []) {
    const key = e.id;
    if (!map.has(key)) {
      map.set(key, { ...e, count: 1 });
    } else {
      map.get(key).count++;
    }
  }
  return Array.from(map.values());
}

export function GlobalSection({ stats }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2, color: '#1976d2' }}>Vue Globale</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={2.4}><CyberpunkCard title="Employés" value={safeValue(stats.totalEmployees, 0)} icon={<Group />} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><CyberpunkCard title="Missions" value={safeValue(stats.totalMissionOrders, 0)} icon={<RocketLaunch />} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><CyberpunkCard title="Autorisations" value={safeValue(stats.exitAuthStats?.reduce((a, b) => a + toNumber(b.count), 0), 0)} icon={<AccountTree />} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><CyberpunkCard title="Argent sorti" value={`${safeValue(stats.totalMoney, 0)} DA`} icon={<Paid />} /></Grid>
        <Grid item xs={12} sm={6} md={2.4}><CyberpunkCard title="Transport favori" value={safeValue(stats.mostUsedTransports?.[0]?.transport, '-')} icon={<DirectionsCar />} /></Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>Répartition par profession</Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Profession</TableCell>
              <TableCell>Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(stats.repartitionProfession) && stats.repartitionProfession.length ? stats.repartitionProfession.map((p, i) => (
              <TableRow key={i}>
                <TableCell>{safeValue(p.profession)}</TableCell>
                <TableCell>{toNumber(p.count)}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={2}>Aucune donnée</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>Derniers employés</Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Profession</TableCell>
              <TableCell>Date d'embauche</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(stats.recentEmployees) && stats.recentEmployees.length ? stats.recentEmployees.map((e, i) => (
              <TableRow key={i}>
                <TableCell>{safeValue(e.first_name)} {safeValue(e.last_name)}</TableCell>
                <TableCell>{safeValue(e.profession?.name)}</TableCell>
                <TableCell>{safeValue(e.hire_date)}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={3}>Aucune donnée</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" sx={{ color: '#1a1a1a' }}>Ancienneté moyenne: <b>{safeValue(stats.avgTenure, 0)} ans</b></Typography>
      <Typography variant="body2" sx={{ color: '#1a1a1a' }}>Nouveaux employés: <b>{safeValue(stats.newEmployees, 0)}</b></Typography>
    </Box>
  );
}

export function EmployeesSection({ stats }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2, color: '#1976d2' }}>Détail par Employé</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Employé</TableCell>
              <TableCell>Missions</TableCell>
              <TableCell>Autorisations</TableCell>
              <TableCell>Argent pris</TableCell>
              <TableCell>Argent remis</TableCell>
              <TableCell>Durée moyenne mission</TableCell>
              <TableCell>Taux complétion rapport</TableCell>
              <TableCell>Montant moyen décharge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(stats.empStats) && stats.empStats.length ? stats.empStats.map((e, i) => (
              <TableRow key={i}>
                <TableCell>{safeValue(e.name)}</TableCell>
                <TableCell>{toNumber(e.missions)}</TableCell>
                <TableCell>{toNumber(e.exits)}</TableCell>
                <TableCell>{toNumber(e.moneyTaken)} DA</TableCell>
                <TableCell>{toNumber(e.moneyRemis)} DA</TableCell>
                <TableCell>{toNumber(e.avgMissionDuration)} j</TableCell>
                <TableCell>{toNumber(e.missionReportCompletionRate)}%</TableCell>
                <TableCell>{toNumber(e.avgDechargeAmount)} DA</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={8}>Aucune donnée</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function MissionsSection({ stats }) {
  // Group employees without report by id
  const groupedNoReport = groupNoReport(stats.employeesNoReport);
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2, color: '#1976d2' }}>Missions</Typography>
      <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>Top Villes</Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ville</TableCell>
              <TableCell>Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(stats.destinations) && stats.destinations.length ? stats.destinations.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{safeValue(d.commune)}</TableCell>
                <TableCell>{toNumber(d.count)}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={2}>Aucune donnée</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>Employés sans rapport</Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableBody>
            {groupedNoReport.length ? groupedNoReport.map((e, i) => (
              <TableRow key={i}>
                <TableCell>{safeValue(e.first_name)} {safeValue(e.last_name)}</TableCell>
                <TableCell>{e.count}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={2}>Aucune donnée</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" sx={{ color: '#1a1a1a' }}>Durée moyenne mission: <b>{safeValue(stats.avgMissionDuration, 0)} j</b></Typography>
      <Typography variant="body2" sx={{ color: '#1a1a1a' }}>Taux d’acceptation mission: <b>{safeValue(stats.tauxAcceptationMission, 0)}%</b></Typography>
      <Typography variant="body2" sx={{ color: '#1a1a1a' }}>Taux de complétion rapport: <b>{safeValue(stats.missionReportCompletionRate, 0)}%</b></Typography>
    </Box>
  );
}

export function TransportsSection({ stats }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2, color: '#1976d2' }}>Transports</Typography>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={Array.isArray(stats.mostUsedTransports) ? stats.mostUsedTransports.map(t => ({ ...t, count: toNumber(t.count) })) : []} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <XAxis dataKey="transport" />
          <YAxis />
          <RechartsTooltip formatter={(v) => v + ' missions'} />
          <Legend />
          <Bar dataKey="count" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Transport</TableCell>
              <TableCell>Nombre de missions</TableCell>
              <TableCell>Durée moyenne</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(stats.mostUsedTransports) && stats.mostUsedTransports.length ? stats.mostUsedTransports.map((t, i) => {
              const avg = (stats.avgTravelTimeByTransport || []).find(a => a.transport === t.transport);
              return (
                <TableRow key={i}>
                  <TableCell>{safeValue(t.transport)}</TableCell>
                  <TableCell>{toNumber(t.count)}</TableCell>
                  <TableCell>{avg ? toNumber(avg.avgDuration) + ' j' : '-'}</TableCell>
                </TableRow>
              );
            }) : (
              <TableRow><TableCell colSpan={3}>Aucune donnée</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function ExitsSection({ stats }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2, color: '#1976d2' }}>Autorisations de sortie</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Employé</TableCell>
              <TableCell>Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(stats.exitAuthStats) && stats.exitAuthStats.length ? stats.exitAuthStats.map((e, i) => (
              <TableRow key={i}>
                <TableCell>{safeValue(e.name)}</TableCell>
                <TableCell>{toNumber(e.count)}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={2}>Aucune donnée</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" sx={{ color: '#1a1a1a' }}>Taux d’acceptation sortie: <b>{safeValue(stats.tauxAcceptationExit, 0)}%</b></Typography>
    </Box>
  );
}

export function DechargesSection({ stats }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2, color: '#1976d2' }}>Décharges Argent</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                dataKey="value"
                data={[
                  { name: 'Remis', value: toNumber(stats.percentRemis) * toNumber(stats.totalMoney) / 100 },
                  { name: 'Non remis', value: (100 - toNumber(stats.percentRemis)) * toNumber(stats.totalMoney) / 100 }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                <Cell fill="#1976d2" stroke="#fff" strokeWidth={2} />
                <Cell fill="#bdbdbd" stroke="#fff" strokeWidth={2} />
              </Pie>
              <RechartsTooltip formatter={(v) => v + ' DA'} />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Employé</TableCell>
                  <TableCell>Total pris</TableCell>
                  <TableCell>Total remis</TableCell>
                  <TableCell>% remis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(stats.topMoneyTakers) && stats.topMoneyTakers.length ? stats.topMoneyTakers.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell>{safeValue(e.name, `Employé ID ${safeValue(e.employee_id, '-')}`)}</TableCell>
                    <TableCell>{toNumber(e.total)} DA</TableCell>
                    <TableCell>{toNumber(e.returned)} DA</TableCell>
                    <TableCell>{toNumber(e.percentReturned)}%</TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={4}>Aucune donnée</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ mt: 1, color: '#1a1a1a' }}>Total sorti: <b>{safeValue(stats.totalMoney, 0)} DA</b></Typography>
          <Typography variant="body2" sx={{ color: '#1a1a1a' }}>% remis: <b>{safeValue(stats.percentRemis, 0)}%</b> | Probabilité remise: <b>{safeValue(stats.probRemis, 0)}%</b></Typography>
          <Typography variant="body2" sx={{ color: '#1a1a1a' }}>Taux acceptation décharge: <b>{safeValue(stats.tauxAcceptationDecharge, 0)}%</b></Typography>
          <Typography variant="body2" sx={{ color: '#1a1a1a' }}>Montant moyen décharge: <b>{safeValue(stats.avgDechargeAmount, 0)} DA</b></Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
