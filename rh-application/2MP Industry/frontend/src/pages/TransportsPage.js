import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

const TransportsPage = () => {
  const [transports, setTransports] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null); // Transport being edited
  const [formData, setFormData] = useState({
    type: '',
    brand: '',
    model: '',
    registration: '',
    purchase_date: '',
  });
  const [isEditMode, setIsEditMode] = useState(false); // Track if modal is in edit mode
  const excludedTypes = ['taxi', 'avion', 'bus', 'train', 'bateau'];

  // Fetch transports on component mount
  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await api.get('/transports');
        const filteredTransports = response.data.filter(transport =>
          !excludedTypes.includes(transport.type.toLowerCase())
        );
        setTransports(filteredTransports);
      } catch (error) {
        console.error('Erreur lors du chargement des transports:', error);
      }
    };
    fetchTransports();
  }, []);

  // Handle modal open/close
  const handleOpenModal = (transport = null) => {
    if (transport) {
      setSelectedTransport(transport);
      setFormData({
        type: transport.type,
        brand: transport.brand,
        model: transport.model,
        registration: transport.registration,
        purchase_date: transport.purchase_date,
      });
      setIsEditMode(true);
    } else {
      setSelectedTransport(null);
      setFormData({
        type: '',
        brand: '',
        model: '',
        registration: '',
        purchase_date: '',
      });
      setIsEditMode(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission (create or update)
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // Update existing transport
        await api.put(`/transports/${selectedTransport.id}`, formData);
        setTransports((prevTransports) =>
          prevTransports.map((t) =>
            t.id === selectedTransport.id ? { ...t, ...formData } : t
          )
        );
      } else {
        // Create new transport
        const newTransport = await api.post('/transports', formData);
        setTransports((prevTransports) => [...prevTransports, newTransport.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du transport:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce transport ?')) {
      try {
        await api.delete(`/transports/${id}`);
        setTransports((prevTransports) => prevTransports.filter((t) => t.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression du transport:', error);
      }
    }
  };

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'brand', headerName: 'Marque', width: 150 },
    { field: 'model', headerName: 'Modèle', width: 150 },
    { field: 'registration', headerName: 'Immatriculation', width: 200 },
    { field: 'purchase_date', headerName: "Date d'achat", width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Modifier">
            <IconButton onClick={() => handleOpenModal(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Gestion des transports</h2>

      {/* Add Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: '20px' }}
      >
        Ajouter un transport
      </Button>

      {/* DataGrid */}
      <DataGrid rows={transports} columns={columns} pageSize={10} autoPageSize={false} />

      {/* Modal for Add/Edit */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{isEditMode ? 'Modifier le transport' : 'Ajouter un transport'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="type"
            label="Type"
            type="text"
            fullWidth
            value={formData.type}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="brand"
            label="Marque"
            type="text"
            fullWidth
            value={formData.brand}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="model"
            label="Modèle"
            type="text"
            fullWidth
            value={formData.model}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="registration"
            label="Immatriculation"
            type="text"
            fullWidth
            value={formData.registration}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="purchase_date"
            label="Date d'achat"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.purchase_date}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Annuler</Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditMode ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransportsPage;