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

const ProfessionsPage = () => {
  const [professions, setProfessions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(null); // Profession being edited
  const [formData, setFormData] = useState({ name: '' });
  const [isEditMode, setIsEditMode] = useState(false); // Track if modal is in edit mode

  // Fetch professions on component mount
  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const response = await api.get('/professions');
        setProfessions(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des professions:', error);
      }
    };
    fetchProfessions();
  }, []);

  // Handle modal open/close
  const handleOpenModal = (profession = null) => {
    if (profession) {
      setSelectedProfession(profession);
      setFormData({ name: profession.name });
      setIsEditMode(true);
    } else {
      setSelectedProfession(null);
      setFormData({ name: '' });
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
        // Update existing profession
        await api.put(`/professions/${selectedProfession.id}`, formData);
        setProfessions((prevProfessions) =>
          prevProfessions.map((p) =>
            p.id === selectedProfession.id ? { ...p, ...formData } : p
          )
        );
      } else {
        // Create new profession
        const newProfession = await api.post('/professions', formData);
        setProfessions((prevProfessions) => [...prevProfessions, newProfession.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la profession:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette profession ?')) {
      try {
        await api.delete(`/professions/${id}`);
        setProfessions((prevProfessions) => prevProfessions.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de la profession:', error);
      }
    }
  };

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nom', width: 450 },
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
      <h2>Gestion des professions</h2>

      {/* Add Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: '20px' }}
      >
        Ajouter une profession
      </Button>

      {/* DataGrid */}
      <DataGrid rows={professions} columns={columns} pageSize={10} autoPageSize={false} />

      {/* Modal for Add/Edit */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{isEditMode ? 'Modifier la profession' : 'Ajouter une profession'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nom de la profession"
            type="text"
            fullWidth
            value={formData.name}
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

export default ProfessionsPage;