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
  LinearProgress,
  Typography,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

const DocumentLegalsPage = () => {
  const [documentLegals, setDocumentLegals] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDocumentLegal, setSelectedDocumentLegal] = useState(null);
  const [formData, setFormData] = useState({ name: '', link: '', color: '' }); // Added color
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploadFilesMap, setUploadFilesMap] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchDocumentLegals = async () => {
      try {
        const response = await api.get('/documents-legaux');
        setDocumentLegals(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des documents légaux:', error);
      }
    };
    fetchDocumentLegals();
  }, []);

  const handleOpenModal = (documentLegal = null) => {
    if (documentLegal) {
      setSelectedDocumentLegal(documentLegal);
      setFormData({
        name: documentLegal.name,
        link: documentLegal.link,
        color: documentLegal.color, // Added color
      });
      setIsEditMode(true);
    } else {
      setSelectedDocumentLegal(null);
      setFormData({ name: '', link: '', color: '' });
      setIsEditMode(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUploadProgress(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileSelect = (e, documentId) => {
    const files = e.target.files;
    setUploadFilesMap((prev) => ({
      ...prev,
      [documentId]: files,
    }));
  };

  const handleFileUpload = async (documentId) => {
    const files = uploadFilesMap[documentId];
    if (!files || files.length === 0) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }
    try {
      const formDataUpload = new FormData();
      Array.from(files).forEach((file) => {
        formDataUpload.append('files', file);
      });

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      };

      const response = await api.post('/upload', formDataUpload, config);
      const newLink = response.data.filePaths;

      if (isEditMode) {
        setDocumentLegals((prev) =>
          prev.map((doc) =>
            doc.id === documentId ? { ...doc, link: newLink } : doc
          )
        );
      } else {
        setFormData((prev) => ({ ...prev, link: newLink }));
      }

      setUploadFilesMap((prev) => ({ ...prev, [documentId]: null }));
      alert('Fichier téléchargé avec succès !');
      setUploadProgress(0);
    } catch (error) {
      console.error('Erreur lors du téléchargement des fichiers:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await api.put(
          `/documents-legaux/${selectedDocumentLegal.id}`,
          formData
        );
        setDocumentLegals((prev) =>
          prev.map((doc) =>
            doc.id === selectedDocumentLegal.id ? { ...doc, ...formData } : doc
          )
        );
      } else {
        const newDocumentLegal = await api.post(
          '/documents-legaux',
          formData
        );
        setDocumentLegals((prev) => [...prev, newDocumentLegal.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du document:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      try {
        await api.delete(`/documents-legaux/${id}`);
        setDocumentLegals((prev) =>
          prev.filter((doc) => doc.id !== id)
        );
      } catch (error) {
        console.error('Erreur lors de la suppression du document:', error);
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nom', width: 450 },
    {
      field: 'link',
      headerName: 'Fichier',
      width: 450,
      renderCell: (params) => (
        <a
          href={params.row.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          Télécharger
        </a>
      ),
    },
    {
      field: 'color',
      headerName: 'Couleur Bouton',
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: params.row.color || '#000000',
            borderRadius: '4px',
            display: 'inline-block',
            marginLeft: '5px',
          }}
        />
      ),
    },
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
      <h2>Gestion des documents légaux</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: '20px' }}
      >
        Ajouter un document
      </Button>
      <DataGrid
        rows={documentLegals}
        columns={columns}
        pageSize={10}
        autoPageSize={false}
      />
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {isEditMode ? 'Modifier le document' : 'Ajouter un document'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nom du document"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formData.link && (
            <Typography variant="body2" color="textSecondary">
              Lien actuel : {formData.link}
            </Typography>
          )}
          <input
            type="file"
            onChange={(e) =>
              handleFileSelect(e, selectedDocumentLegal?.id || 'new')
            }
            style={{ marginTop: '1rem' }}
          />
          <Button
            variant="contained"
            onClick={() =>
              handleFileUpload(selectedDocumentLegal?.id || 'new')
            }
            style={{ marginTop: '0.5rem' }}
          >
            Télécharger le fichier
          </Button>
          {uploadProgress > 0 && (
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              style={{ marginTop: '0.5rem' }}
            />
          )}
          {/* Added color picker */}
          <div style={{ marginTop: '1rem' }}>
            <InputLabel htmlFor="colorPicker">Couleur du Bouton</InputLabel>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              style={{ marginLeft: '10px', height: '30px' }}
            />
          </div>
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

export default DocumentLegalsPage;