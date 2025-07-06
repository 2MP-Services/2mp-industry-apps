const express = require('express');
const cors = require('cors');
const app = express();

allowedOrigins = [];

for (let i = 1; i <= 254; i++) {
  const ip = `192.168.10.${i}`;
  [3000, 3002, 18498].forEach(port => {
      allowedOrigins.push(`http://${ip}:${port}`);
      allowedOrigins.push(`https://${ip}:${port}`);
  });
}

const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
require('dotenv').config();
const PORT = 1000;
const authMiddleware = require('./middleware/authMiddleware');
app.use(express.json());

// Serve uploaded files statically
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const employeeRoutes = require('./routes/employee');
app.use('/api/employees', authMiddleware/*, roleMiddleware(["1"])*/, employeeRoutes);
const transportRoutes = require('./routes/transport');
app.use('/api/transports', authMiddleware/*, roleMiddleware(["1"])*/, transportRoutes);
const missionOrderRoutes = require('./routes/missionOrder');
app.use('/api/mission-orders', authMiddleware/*, roleMiddleware(["1"])*/, missionOrderRoutes);
const professionRoutes = require('./routes/profession');
app.use('/api/professions', authMiddleware/*, roleMiddleware(["1"])*/, professionRoutes);
const documentLegalRoutes = require('./routes/documentlegal');
app.use('/api/documents-legaux', authMiddleware/*, roleMiddleware(["1"])*/, documentLegalRoutes);
const exitAuthorizationsRoutes = require('./routes/exitAuthorization');
app.use('/api/exit-authorizations', authMiddleware/*, roleMiddleware(["1"])*/, exitAuthorizationsRoutes);
const dechargeArgentsRoutes = require('./routes/dechargeArgent');
app.use('/api/decharge-argents', authMiddleware/*, roleMiddleware(["1"])*/, dechargeArgentsRoutes);
const geographyRoutes = require('./routes/geography');
app.use('/api/geography', geographyRoutes); // Accessible sans authentification
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', authMiddleware, uploadRoutes);
const rhDashboardRoutes = require('./routes/rhDashboard');
app.use('/api/rh-dashboard', rhDashboardRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

