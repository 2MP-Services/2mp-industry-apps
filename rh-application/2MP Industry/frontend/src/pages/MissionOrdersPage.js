import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate } from 'react-router-dom';
import api, { baseURL } from '../services/api';
import PDFModal from '../components/PDFModal';
import { fetchCurrentUser } from '../services/auth';

const MissionOrdersPage = () => {
  const [missionOrders, setMissionOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMission, setSelectedMission] = useState(null);
  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [theUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openRefuseModal, setOpenRefuseModal] = useState(false);
  const [refuseReason, setRefuseReason] = useState('');
  const [selectedIdToRefuse, setSelectedIdToRefuse] = useState(null);
  const [uploadFilesMap, setUploadFilesMap] = useState({});
  const [selectedRapportMap, setSelectedRapportMap] = useState({});
  const navigate = useNavigate();

  const filterOptions = [
    { value: 'all', label: 'Tous' },
    { value: 'validated', label: 'Validés' },
    { value: 'non-validated', label: 'Non Validés' },
    { value: 'refused', label: 'Refusés' },
  ];

  const filteredMissionOrders = missionOrders.filter((mo) => {
    if (filterStatus === 'validated') return mo.validated;
    if (filterStatus === 'non-validated') return !mo.validated && !mo.refused;
    if (filterStatus === 'refused') return mo.refused;
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
    const fetchMissionOrders = async () => {
      try {
        const response = await api.get('/mission-orders');
        const formattedData = response.data.map((mo) => {
          return {
            ...mo,
            order_number: mo.order_number,
            employeeName: mo.employee
              ? `${mo.employee.first_name} ${mo.employee.last_name}`
              : 'N/A',
            departCommune: mo.depart_commune?.name || 'N/A',
            transportReg: mo.transport?.registration || 'N/A',
            destinations:
              (mo.destination && mo.destination.trim() !== '') // Use mo.destination if it's not empty
                ? mo.destination
                : (mo.destinations && mo.destinations.map(d => d.commune.name).join(', ')) || 'N/A',
            validityFrom: new Date(mo.validity_from).toLocaleDateString(),
            validityTo: new Date(mo.validity_to).toLocaleDateString(),
          };
        });
        setMissionOrders(formattedData);
      } catch (error) {
        console.error('Error loading mission orders:', error);
      }
    };
    fetchMissionOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mission order?')) {
      try {
        await api.delete(`/mission-orders/${id}`);
        setMissionOrders((prev) => prev.filter((mo) => mo.id !== id));
      } catch (error) {
        console.error('Error deleting mission order:', error);
      }
    }
  };

  const handleViewPDF = async (missionId) => {
    try {
      const response = await api.get(`/mission-orders/${missionId}`);
      const employee = await api.get(`/employees/${response.data.employee_id}`);
      response.data.employee = employee.data;
      setSelectedMission(response.data);
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
      await api.post('/mission-orders/refuse', { id: selectedIdToRefuse, refuseReason });
      setMissionOrders((prev) =>
        prev.map((mo) =>
          mo.id === selectedIdToRefuse ? { ...mo, refused: true, refuseReason } : mo
        )
      );
      setOpenRefuseModal(false);
      setRefuseReason('');
      window.location.reload();
    } catch (error) {
      console.error('Error refusing mission order:', error);
    }
  };

  const handleFileUpload = async (missionId) => {
    const files = uploadFilesMap[missionId];
    if (!files || files.length === 0) {
      alert('Please select file(s) to upload.');
      return;
    }
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMissionOrders((prev) =>
        prev.map((mo) =>
          mo.id === missionId
            ? {
                ...mo,
                rapport: mo.rapport
                  ? `${mo.rapport},${response.data.filePaths}`
                  : response.data.filePaths,
              }
            : mo
        )
      );
      setUploadFilesMap((prev) => ({ ...prev, [missionId]: null }));
      alert('Files uploaded successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const columns = [
    { field: 'order_number', headerName: "L'ordre #", width: 150 },
    { field: 'employeeName', headerName: 'Employé', width: 200 },
    { field: 'departCommune', headerName: 'Depart', width: 150 },
    { field: 'transportReg', headerName: 'Transport', width: 120 },
    { field: 'destinations', headerName: 'Destinations', width: 200 },
    { field: 'validityFrom', headerName: "Validité de", width: 120 },
    { field: 'validityTo', headerName: "Validité jusqu'à", width: 120 },
    { field: 'reason', headerName: 'Motif', width: 300 },
    { field: 'refuseReason', headerName: 'Motif de Refus', width: 200 },
    {
      field: 'rapport',
      headerName: 'Rapport',
      width: 650,
      renderCell: (params) => {
        const row = params.row;
        const isOwner = theUser?.id === row.employee?.user_id;
        const rapportFiles = row.rapport ? row.rapport.split(',') : [];
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {isOwner && row.validated ? (
              <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginBottom: 8 }}>
                {rapportFiles.length > 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Select
                      value={
                        selectedRapportMap[row.id] ||
                        (rapportFiles.length > 0 ? rapportFiles[0] : '')
                      }
                      onChange={(e) =>
                        setSelectedRapportMap((prev) => ({
                          ...prev,
                          [row.id]: e.target.value,
                        }))
                      }
                      size="small"
                      style={{ minWidth: 150, maxWidth: 200, marginRight: 10 }}
                    >
                      {rapportFiles.map((file, index) => (
                        <MenuItem key={index} value={file}>
                          {file.split('/').pop()}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        const fileToOpen =
                          selectedRapportMap[row.id] ||
                          (rapportFiles.length > 0 ? rapportFiles[0] : '');
                        if (fileToOpen) window.open(fileToOpen, '_blank');
                      }}
                      disabled={rapportFiles.length === 0}
                    >
                      OUVRIR
                    </Button>
                  </div>
                ) : (
                  <Typography variant="caption">Aucun fichier</Typography>
                )}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      setUploadFilesMap((prev) => ({
                        ...prev,
                        [row.id]: e.target.files,
                      }))
                    }
                    style={{ marginRight: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleFileUpload(row.id)}
                    disabled={
                      !uploadFilesMap[row.id] || uploadFilesMap[row.id].length === 0
                    }
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
            ) : (
              <List dense>
                {rapportFiles.length > 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Select
                      value={
                        selectedRapportMap[row.id] ||
                        (rapportFiles.length > 0 ? rapportFiles[0] : '')
                      }
                      onChange={(e) =>
                        setSelectedRapportMap((prev) => ({
                          ...prev,
                          [row.id]: e.target.value,
                        }))
                      }
                      size="small"
                      style={{ minWidth: 150, maxWidth: 250, marginRight: 10 }}
                    >
                      {rapportFiles.map((file, index) => (
                        <MenuItem key={index} value={file}>
                          {file.split('/').pop()}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        const fileToOpen =
                          selectedRapportMap[row.id] ||
                          (rapportFiles.length > 0 ? rapportFiles[0] : '');
                        if (fileToOpen) window.open(fileToOpen, '_blank');
                      }}
                      disabled={rapportFiles.length === 0}
                    >
                      Open
                    </Button>
                  </div>
                ) : (
                  <Typography variant="caption">Aucun fichier</Typography>
                )}
              </List>
            )}
          </div>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        const userRole = theUser?.role?.toString();
        const mostRecentMissionOrderId = Math.max(...missionOrders.map((mo) => mo.id));
        return (
          <>
            {!params.row.validated &&
              !params.row.refused &&
              userRole === '1' && (
                <Tooltip title="Valider">
                  <IconButton
                    onClick={async () => {
                      try {
                        await api.post('/mission-orders/validate', { id: params.row.id });
                        setMissionOrders((prev) =>
                          prev.map((mo) =>
                            mo.id === params.row.id ? { ...mo, validated: true } : mo
                          )
                        );
                        window.location.reload();
                      } catch (error) {
                        console.error('Erreur lors de la validation:', error);
                      }
                    }}
                  >
                    <CheckCircleIcon sx={{ color: 'green' }} />
                  </IconButton>
                </Tooltip>
              )}
            {!params.row.validated &&
              !params.row.refused &&
              userRole === '1' && (
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
            {userRole === '1' &&
              params.row.id === mostRecentMissionOrderId &&
              false && (
                <Tooltip title="Supprimer">
                  <IconButton onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
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
      <h2>Gestion des Ordres de Mission</h2>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/create-mission')}
          style={{ marginRight: 20 }}
        >
          Créer un nouvel ordre de mission
        </Button>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          variant="outlined"
          style={{ minWidth: 150 }}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <DataGrid
        rows={filteredMissionOrders}
        columns={columns}
        pageSize={10}
        autoPageSize={false}
        disableSelectionOnClick
        getRowClassName={(params) =>
          params.row.validated
            ? 'validated-row'
            : params.row.refused
            ? 'refused-row'
            : 'non-validated-row'
        }
        sx={{
          '.validated-row': { backgroundColor: '#9cfa91' },
          '.non-validated-row': { backgroundColor: '#f7f0e6' },
          '.refused-row': { backgroundColor: '#fa9198' },
        }}
      />
      {openPDFModal && (
        <PDFModal missionData={selectedMission} onClose={() => setOpenPDFModal(false)} />
      )}
      <Dialog open={openRefuseModal} onClose={() => setOpenRefuseModal(false)}>
        <DialogTitle>Refuser Ordre de Mission</DialogTitle>
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
          <Button onClick={handleRefuse} color="error">
            Refuser
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MissionOrdersPage;