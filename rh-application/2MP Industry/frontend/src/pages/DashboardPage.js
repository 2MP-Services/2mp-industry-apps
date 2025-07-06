import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Skeleton,
  Box,
  Link,
  Container,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Avatar,
  LinearProgress,
  Tooltip,
  DialogActions,
  Modal
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import api from '../services/api';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCurrentUser } from '../services/auth';
import clientLogo from '../assets/client-logo.png';
import creatorLogo from '../assets/LOGO2MPSERVICESFORPROFESSIONALPERFORM.png';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    missions: 0,
    sorties: 0,
    employees: 0,
    transports: 0,
    professions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [userRole, setUserRole] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null); // State for selected PDF
  const [documentLegals, setDocumentLegals] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [errorDocuments, setErrorDocuments] = useState(null);


  useEffect(() => {
    const loadUser = async () => {
      const currentUserObject = await fetchCurrentUser();
      if (currentUserObject) {
        setUserRole(currentUserObject.role);
        setEmployee(currentUserObject.employee);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [missionsRes, sortiesRes, employeesRes, transportsRes, professionsRes] = await Promise.all([
          api.get('/mission-orders/count'),
          api.get('/exit-authorizations/count'),
          api.get('/employees/count'),
          api.get('/transports/count'),
          api.get('/professions/count'),
        ]);
        setStats({
          missions: missionsRes.data,
          sorties: sortiesRes.data,
          employees: employeesRes.data,
          transports: transportsRes.data,
          professions: professionsRes.data,
        });
        setError(null);
      } catch (error) {
        console.error('Error loading stats:', error);
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoadingDocuments(true);
        const response = await api.get('/documents-legaux'); // Assuming this endpoint returns documents
        setDocumentLegals(response.data);
        setErrorDocuments(null);
      } catch (error) {
        console.error('Error loading legal documents:', error);
        setErrorDocuments('Impossible de charger les documents légaux');
      } finally {
        setLoadingDocuments(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return '';
    try {
      const formData = new FormData();
      formData.append('files', selectedFile);

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.filePaths;
    } catch (error) {
      console.error('Error uploading file:', error);
      return '';
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const profilePictureUrl = await handleUpload();
      if (profilePictureUrl) {
        await api.put(`/employees/${employee.id}`, { profile_picture: profilePictureUrl });
        const updatedEmployee = await api.get(`/employees/${employee.id}`);
        setEmployee(updatedEmployee.data);
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleOpenModalDocuments = (pdf) => {
    setSelectedPdf(pdf);
    setIsModalOpen(true);
  };

  const handleCloseModalDocuments = () => {
    setSelectedPdf(null);
    setIsModalOpen(false);
  };

  const StatCard = ({ title, value, icon, color, to }) => (
    <Link
      to={to}
      style={{ textDecoration: 'none' }}
      component="a"
    >
      <Card
        sx={{
          backgroundColor: color,
          color: 'white',
          borderRadius: 3,
          boxShadow: theme.shadows[3],
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer',
          },
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <div>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              {loading ? (
                <Skeleton width={100} height={30} />
              ) : (
                <Typography variant="h3" fontWeight="bold">
                  {value}
                </Typography>
              )}
            </div>
            {icon}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '255,0,0'; // fallback to red if invalid hex
  };

  return (
    <Box p={3}>
      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 4 }}>
        <img
          src={clientLogo}
          alt="Client Company Logo"
          style={{ maxWidth: '250px', height: 'auto' }}
        />
      </Container>

      {userRole !== null && userRole.toString() === "1" ? (
        // Admin view remains the same
        <>
          <Box mb={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Tableau de bord
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Vue d'ensemble des statistiques système
            </Typography>
          </Box>

          {error && (
            <Box mb={4}>
              <Typography color="error">{error}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => window.location.reload()}
                startIcon={<RefreshIcon />}
              >
                Réessayer
              </Button>
            </Box>
          )}

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Missions"
                value={stats.missions}
                icon={<AssignmentIcon sx={{ fontSize: 40 }} />}
                color={theme.palette.primary.main}
                to="/mission-orders"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Sorties"
                value={stats.sorties}
                icon={<ExitToAppIcon sx={{ fontSize: 40 }} />}
                color={theme.palette.warning.main}
                to="/exit-authorizations"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Employés"
                value={stats.employees}
                icon={<PeopleIcon sx={{ fontSize: 40 }} />}
                color={theme.palette.secondary.main}
                to="/employees"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Professions"
                value={stats.professions}
                icon={<WorkIcon sx={{ fontSize: 40 }} />}
                color={theme.palette.info.main}
                to="/professions"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Transports"
                value={stats.transports}
                icon={<DirectionsCarIcon sx={{ fontSize: 40 }} />}
                color={theme.palette.success.main}
                to="/transports"
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Box textAlign="center" mt={10}>
          <Box position="relative" display="inline-block" mb={3}>
            <Avatar
              src={employee?.profile_picture}
              alt={`${employee?.firstName} ${employee?.lastName}`}
              sx={{ width: 120, height: 120, mb: 2 }}
            >
              {!employee?.profile_picture && <PersonIcon sx={{ fontSize: 60 }} />}
            </Avatar>
            <Tooltip title="Modifier la photo">
              <IconButton
                onClick={() => setOpenModal(true)}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'primary.dark' }
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="h4" gutterBottom>
            Bienvenue {employee?.firstName} {employee?.lastName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Vous êtes connecté en tant qu'employé.
          </Typography>
        </Box>
      )}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Documents Légaux
        </Typography>
        {loadingDocuments ? (
          <Skeleton variant="rectangular" width="100%" height={50} />
        ) : errorDocuments ? (
          <Typography color="error">{errorDocuments}</Typography>
        ) : documentLegals.length === 0 ? (
          <Typography color="textSecondary">Aucun document légal disponible</Typography>
        ) : (
          <Box mb={2} display="flex" flexWrap="wrap">
            {documentLegals.map((doc) => (
              <Button
                key={doc.id}
                variant="contained"
                style={{
                  backgroundColor: doc.color,
                  color: 'white',
                  fontWeight: 'bold',
                  boxShadow: `0px 4px 10px rgba(${hexToRgb(doc.color)}, 0.5)`,
                  margin: '0.5rem',
                }}
                onClick={() => window.open(doc.link, '_blank')}
              >
                {doc.name}
              </Button>
            ))}
          </Box>
        )}
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box textAlign="center">
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Powered by
        </Typography>
        <img
          src={creatorLogo}
          alt="Creator Company Logo"
          style={{ maxWidth: '100px', height: 'auto' }}
        />
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Modifier la photo de profil</DialogTitle>
        <DialogContent>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          {selectedFile && (
            <Typography variant="caption" color="textSecondary">
              {selectedFile.name}
            </Typography>
          )}
          {uploadProgress > 0 && (
            <LinearProgress variant="determinate" value={uploadProgress} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Annuler</Button>
          <Button onClick={handleUpdateProfile} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;