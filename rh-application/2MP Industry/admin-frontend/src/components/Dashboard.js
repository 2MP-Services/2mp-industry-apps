import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import {
  GlobalSection,
  EmployeesSection,
  MissionsSection,
  TransportsSection,
  ExitsSection,
  DechargesSection
} from './DashboardSections';
import { Group, RocketLaunch, AccountTree, Paid, DirectionsCar } from '@mui/icons-material';

// FIX: Use working backend API address as in old version
const API = 'http://192.168.10.31:1000/api/rh-dashboard/stats';

const CYBER_COLORS = [
  { color: '#4facfe', accent: '#e0e7ef' },
  { color: '#43e97b', accent: '#c7f9cc' },
  { color: '#ff512f', accent: '#ffe5d9' },
  { color: '#928dab', accent: '#e0e7ef' },
  { color: '#ffd200', accent: '#fff3cd' },
  { color: '#eaafc8', accent: '#e0e7ef' },
];

function dechargePieData(stats) {
  // Cool stat: split decharge total by remis vs non remis
  const remis = Number(stats.percentRemis) || 0;
  const nonRemis = 100 - remis;
  return [
    { name: 'Remis', value: Math.round((remis / 100) * (stats.totalMoney || 0)) },
    { name: 'Non remis', value: Math.round((nonRemis / 100) * (stats.totalMoney || 0)) }
  ];
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [section, setSection] = useState('global');

  useEffect(() => {
    axios.get(API)
      .then(res => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <DashboardLayout section={section} setSection={setSection}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress color="primary" /></Box>
    </DashboardLayout>
  );
  if (!stats) return (
    <DashboardLayout section={section} setSection={setSection}>
      <Box sx={{ color: 'red', mt: 10 }}>Erreur lors du chargement des statistiques.</Box>
    </DashboardLayout>
  );

  return (
    <DashboardLayout section={section} setSection={setSection}>
      {section === 'global' && <GlobalSection stats={stats} />}
      {section === 'employees' && <EmployeesSection stats={stats} />}
      {section === 'missions' && <MissionsSection stats={stats} />}
      {section === 'transports' && <TransportsSection stats={stats} />}
      {section === 'exits' && <ExitsSection stats={stats} />}
      {section === 'decharges' && <DechargesSection stats={stats} />}
    </DashboardLayout>
  );
}
