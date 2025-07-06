import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Tooltip, Select, MenuItem, LinearProgress, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PDFModalExit from '../components/PDFModalExit';
import { fetchCurrentUser } from '../services/auth';

const ExitAuthorizationsPage = () => {
  const [exitAuthorizations, setExitAuthorizations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedExitAuth, setSelectedExitAuth] = useState(null);
  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [theUser, setCurrentUser] = useState(null); // 1 for admin, other values for non-admin
  const [loading, setLoading] = useState(true);
  const [openRefuseModal, setOpenRefuseModal] = useState(false);
  const [refuseReason, setRefuseReason] = useState('');
  const [selectedIdToRefuse, setSelectedIdToRefuse] = useState(null);
  const navigate = useNavigate();

  const filterOptions = [
    { value: 'all', label: 'Tous' },
    { value: 'validated', label: 'Validés' },
    { value: 'non-validated', label: 'Non Validés' },
    { value: 'refused', label: 'Refusés' },
  ];

  const filteredExitAuthorizations = exitAuthorizations.filter((ea) => {
    if (filterStatus === 'validated') return ea.validated;
    if (filterStatus === 'non-validated') return !ea.validated && !ea.refused;
    if (filterStatus === 'refused') return ea.refused;
    return true;
  });

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await fetchCurrentUser();
      if (currentUser) {
        setCurrentUser(currentUser);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  useEffect(() => {
    const fetchExitAuthorizations = async () => {
      try {
        const response = await api.get('/exit-authorizations');
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        const formattedData = sortedData.map(ea => ({
          ...ea,
          employeeName: ea.employee ? `${ea.employee.first_name} ${ea.employee.last_name}` : 'N/A',
          sortieDateTime: `${new Date(ea.sortie_date).toLocaleDateString()} ${ea.sortie_time}`,
          entreeDateTime: `${new Date(ea.entree_date).toLocaleDateString()} ${ea.entree_time}`,
        }));
        setExitAuthorizations(formattedData);
      } catch (error) {
        console.error('Error loading exit authorizations:', error);
      }
    };
    fetchExitAuthorizations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exit authorization?')) {
      try {
        await api.delete(`/exit-authorizations/${id}`);
        setExitAuthorizations(prev => prev.filter(ea => ea.id !== id));
      } catch (error) {
        console.error('Error deleting exit authorization:', error);
      }
    }
  };

  const handleViewPDF = async (authId) => {
    try {
      const response = await api.get(`/exit-authorizations/${authId}`);
      console.log('Exit Auth:', response.data);
      const employee = await api.get(`/employees/${response.data.employee_id}`);
      console.log('Employee:', employee.data);
      response.data.employee = employee.data;
      setSelectedExitAuth(response.data);
      setOpenPDFModal(true);
    } catch (error) {
      console.error('Erreur lors du chargement du PDF:', error);
    }
  };

  const handleRefuse = async () => {
    if (!refuseReason.trim()) {
      alert('Please provide a refusal reason.');
      return;
    }

    try {
      await api.post('/exit-authorizations/refuse', { id: selectedIdToRefuse, refuseReason });
      setExitAuthorizations(prev =>
        prev.map(ea =>
          ea.id === selectedIdToRefuse ? { ...ea, refused: true, refuseReason } : ea
        )
      );
      setOpenRefuseModal(false);
      setRefuseReason('');
    } catch (error) {
      console.error('Error refusing exit authorization:', error);
    }
  };

  const columns = [
    { field: 'employeeName', headerName: 'Employé', width: 200 },
    { field: 'reason', headerName: 'Motif', width: 700 },
    { field: 'sortieDateTime', headerName: 'Date et Heure de Sortie', width: 200 },
    { field: 'entreeDateTime', headerName: 'Date et Heure d’Entrée', width: 200 },
    { field: 'refuseReason', headerName: 'Motif de Refus', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        const userRole = theUser?.role.toString(); // Example admin role (1 = admin)

        return (
          <>
            {!params.row.validated && !params.row.refused && userRole === "1" && (
              <Tooltip title="Valider">
                <IconButton
                  onClick={async () => {
                    try {
                      await api.post('/exit-authorizations/validate', { id: params.row.id });
                      setExitAuthorizations(prev =>
                        prev.map(ea =>
                          ea.id === params.row.id ? { ...ea, validated: true } : ea
                        )
                      );
                    } catch (error) {
                      console.error('Erreur lors de la validation:', error);
                    }
                  }}
                >
                  <CheckCircleIcon sx={{ color: 'green' }} />
                </IconButton>
              </Tooltip>
            )}

            {!params.row.validated && !params.row.refused && userRole === "1" && (
              <Tooltip title="Refuser">
                <IconButton
                  onClick={() => {
                    setSelectedIdToRefuse(params.row.id);
                    setOpenRefuseModal(true);
                  }}
                >
                  <CancelIcon sx={{ color: 'red' }} />
                </IconButton>
              </Tooltip>
            )}

            {params.row.validated && (
              <Tooltip title="Voir PDF">
                <IconButton onClick={() => handleViewPDF(params.row.id)}>
                  <PictureAsPdfIcon sx={{ color: 'blue' }} />
                </IconButton>
              </Tooltip>
            )}
          </>
        );
      },
    },
  ];

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Gestion des autorisations de sortie</h2>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/create-exit-auth')}
          style={{ marginRight: 20 }}
        >
          Créer une nouvelle autorisation de sortie
        </Button>

        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          variant="outlined"
          style={{ minWidth: 150 }}
        >
          {filterOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>

      <DataGrid
        rows={filteredExitAuthorizations}
        columns={columns}
        pageSize={10} autoPageSize={false}
        disableSelectionOnClick
        getRowClassName={(params) =>
          params.row.validated ? 'validated-row' :
          params.row.refused ? 'refused-row' : 'non-validated-row'
        }
        sx={{
          '.validated-row': { backgroundColor: '#9cfa91' },
          '.non-validated-row': { backgroundColor: '#f7f0e6' },
          '.refused-row': { backgroundColor: '#fa9198' },
        }}
      />

      {openPDFModal && (
        <PDFModalExit
          missionData={selectedExitAuth}
          onClose={() => setOpenPDFModal(false)}
        />
      )}

      <Dialog open={openRefuseModal} onClose={() => setOpenRefuseModal(false)}>
        <DialogTitle>Refuser Autorisation de Sortie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Motif de Refus"
            fullWidth
            multiline
            rows={3}
            value={refuseReason}
            onChange={(e) => setRefuseReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRefuseModal(false)}>Annuler</Button>
          <Button onClick={handleRefuse} color="error">Refuser</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExitAuthorizationsPage;