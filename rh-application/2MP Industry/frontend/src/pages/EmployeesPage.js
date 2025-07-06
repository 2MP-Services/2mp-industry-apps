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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Box,
  Typography, // Added
  LinearProgress, // Added
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import api from '../services/api';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    profession_id: '',
    cin: '',
    hire_date: '',
    profile_picture: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees');
        const transformedEmployees = response.data.map(employee => ({
          ...employee,
          profession: employee.profession ? employee.profession.name : 'N/A',
        }));
        setEmployees(transformedEmployees);
      } catch (error) {
        console.error('Erreur lors du chargement des employés:', error);
      }
    };
    fetchEmployees();
  }, []);

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

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setSelectedEmployee(employee);
      setFormData({
        first_name: employee.first_name,
        last_name: employee.last_name,
        profession_id: employee.profession_id,
        cin: employee.cin,
        hire_date: employee.hire_date,
        profile_picture: employee.profile_picture || '',
      });
      setIsEditMode(true);
    } else {
      setSelectedEmployee(null);
      setFormData({
        first_name: '',
        last_name: '',
        profession_id: '',
        cin: '',
        hire_date: '',
        profile_picture: '',
      });
      setIsEditMode(false);
    }
    setSelectedFile(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return '';

    try {
      const formData = new FormData();
      formData.append('files', selectedFile);

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data.filePaths;
    } catch (error) {
      console.error('Error uploading file:', error);
      return '';
    }
  };

  const handleSubmit = async () => {
    try {
      let profilePictureUrl = formData.profile_picture;

      if (selectedFile) {
        profilePictureUrl = await handleUpload();
      }

      const finalData = {
        ...formData,
        profile_picture: profilePictureUrl,
      };

      if (isEditMode) {
        await api.put(`/employees/${selectedEmployee.id}`, finalData);
        setEmployees(prevEmployees =>
          prevEmployees.map(e =>
            e.id === selectedEmployee.id ? { ...e, ...finalData } : e
          )
        );
      } else {
        const newEmployee = await api.post('/employees', finalData);
        const profession = professions.find(p => p.id === finalData.profession_id);
        const transformedNewEmployee = {
          ...newEmployee.data,
          profession: profession ? profession.name : 'N/A',
        };
        setEmployees(prevEmployees => [...prevEmployees, transformedNewEmployee]);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'employé:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      try {
        await api.delete(`/employees/${id}`);
        setEmployees(prevEmployees => prevEmployees.filter(e => e.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé:', error);
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'profile_picture',
      headerName: 'Photo de profil',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {params.row.profile_picture ? (
            <Avatar
              src={params.row.profile_picture}
              alt={`${params.row.first_name} ${params.row.last_name}`}
              sx={{ width: 48, height: 48 }}
            />
          ) : (
            <Avatar sx={{ width: 48, height: 48 }}>
              <PersonIcon />
            </Avatar>
          )}
        </Box>
      ),
    },
    { field: 'first_name', headerName: 'Prénom', width: 150 },
    { field: 'last_name', headerName: 'Nom', width: 150 },
    { field: 'profession', headerName: 'Profession', width: 200 },
    { field: 'cin', headerName: 'CIN', width: 150 },
    { field: 'hire_date', headerName: "Date d'embauche", width: 150 },
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
      <h2>Gestion des employés</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: '20px' }}
      >
        Ajouter un employé
      </Button>
      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={10}
        autoPageSize={false}
        getRowId={(row) => row.id}
      />
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{isEditMode ? 'Modifier l\'employé' : 'Ajouter un employé'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="first_name"
            label="Prénom"
            type="text"
            fullWidth
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="last_name"
            label="Nom"
            type="text"
            fullWidth
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Profession</InputLabel>
            <Select
              name="profession_id"
              value={formData.profession_id}
              onChange={handleChange}
              required
            >
              {professions.map((profession) => (
                <MenuItem key={profession.id} value={profession.id}>
                  {profession.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="cin"
            label="CIN"
            type="text"
            fullWidth
            value={formData.cin}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="hire_date"
            label="Date d'embauche"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.hire_date}
            onChange={handleChange}
            required
          />
          <Box mt={2}>
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
          </Box>
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

export default EmployeesPage;