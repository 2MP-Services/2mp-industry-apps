import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import api from '../services/api';
import { fetchCurrentUser } from '../services/auth';
import MissionPDF from './MissionPDF';
import { PDFViewer } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';

const MissionForm = () => {
  const navigate = useNavigate();
  const [wilayas, setWilayas] = useState([]);
  const [dairas, setDairas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [transports, setTransports] = useState([]);
  const [selectedWilaya, setSelectedWilaya] = useState(1800);
  const [selectedDaira, setSelectedDaira] = useState(1806);
  const [destinations, setDestinations] = useState([
    { pays: 4, wilaya: '', daira: '', commune: '', dairas: [], communes: [] },
    { pays: 4, wilaya: 1800, daira: 1806, commune: 1807, dairas: [], communes: [] }
  ]);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isMissionCreated, setIsMissionCreated] = useState(false); // Added missing state
  const [userRole, setUserRole] = useState(null); // 1 for admin, other values for non-admin
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);

  // Confirmation step states
  const [confirmationData, setConfirmationData] = useState(null);
  const [destinationCommunes, setDestinationCommunes] = useState([]);
  const [loadingCommunes, setLoadingCommunes] = useState(false);
  const [departCommuneName, setDepartCommuneName] = useState(''); // New state for departure commune name
  const [selectedPays, setSelectedPays] = useState(4); // Default Algeria
  const [villeCommunes, setVilleCommunes] = useState([]); // New state for non-Algerian communes
  const [newVilleName, setNewVilleName] = useState(''); // Add this line
  const [paysList, setPaysList] = useState([]); // Add this line
  const [algeriaWilayas, setAlgeriaWilayas] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wilayasResponse, paysResponse, employeesResponse, transportsResponse] = await Promise.all([
          api.get('/geography/wilayas', { params: { pays_id: 4 } }), // Explicitly filter Algeria
          api.get('/geography/pays'),
          api.get('/employees'),
          api.get('/transports')
        ]);
        setWilayas(wilayasResponse.data);
        setAlgeriaWilayas(wilayasResponse.data); // Save Algeria's wilayas for destinations
        setPaysList(paysResponse.data);
        setEmployees(employeesResponse.data);
        setTransports(transportsResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPays !== 4) {
      setSelectedWilaya(''); // Reset Wilaya when pays is not Algeria
    }
  }, [selectedPays]);

  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        const response = await api.get('/geography/wilayas', { params: { pays_id: selectedPays } });
        setWilayas(response.data);
      } catch (error) {
        console.error('Error fetching wilayas:', error);
      }
    };
    fetchWilayas();
  }, [selectedPays]);

  useEffect(() => {
    if (selectedWilaya) {
      const fetchDairas = async () => {
        try {
          const dairasResponse = await api.get(`/geography/dairas?wilaya_id=${selectedWilaya}`);
          setDairas(dairasResponse.data);
          const updatedDestinations = [...destinations];
          const destinationIndex = updatedDestinations.findIndex(d => d.wilaya === selectedWilaya);
          if (destinationIndex !== -1) {
            updatedDestinations[destinationIndex].dairas = dairasResponse.data;
            setDestinations(updatedDestinations);
          }
        } catch (error) {
          console.error('Error fetching dairas:', error);
        }
      };
      fetchDairas();
    }
  }, [selectedWilaya]);

  useEffect(() => {
    const fetchVilleCommunes = async () => {
      if (selectedPays !== 4) {
        try {
          const response = await api.get('/geography/communes', { params: { pays_id: selectedPays } }); // Use correct endpoint
          setVilleCommunes(response.data);
        } catch (error) {
          console.error('Error fetching ville communes:', error);
        }
      }
    };
    fetchVilleCommunes();
  }, [selectedPays]);

  useEffect(() => {
    if (selectedDaira) {
      const fetchCommunes = async () => {
        try {
          const communesResponse = await api.get(`/geography/communes?daira_id=${selectedDaira}`);
          setCommunes(communesResponse.data);
          formik.setFieldValue('departCommuneId', 1807);
          const updatedDestinations = [...destinations];
          const destinationIndex = updatedDestinations.findIndex(d => d.daira === selectedDaira);
          if (destinationIndex !== -1) {
            updatedDestinations[destinationIndex].communes = communesResponse.data;
            setDestinations(updatedDestinations);
          }
        } catch (error) {
          console.error('Error fetching communes:', error);
        }
      };
      fetchCommunes();
    }
  }, [selectedDaira]);

  const formik = useFormik({
    initialValues: {
      employeeId: employee?.id ? employee.id : '',
      departCommuneId: 1807,
      destinationIds: [1807],
      transportId: '',
      validityFrom: new Date().toISOString().split('T')[0],
      validityTo: '',
      reason: '',
      billet: ''
    },
    validationSchema: Yup.object({
      employeeId: Yup.number().required('Champ requis.'),
      departCommuneId: Yup.number().required('Champ requis.'),
      destinationIds: Yup.array().min(1, 'Au moins une destination est requise.'),
      transportId: Yup.number().required('Champ requis.'),
      validityFrom: Yup.date()
        .min(new Date(new Date().setHours(0, 0, 0, 0)), 'La date ne peut pas être dans le passé')
        .required('Champ requis.'),
      validityTo: Yup.date()
        .required('Champ requis.')
        .min(Yup.ref('validityFrom'), 'La date de fin doit être après la date de début.'),
      reason: Yup.string().required('Champ requis.'),
    }),
    onSubmit: (values) => {
      setConfirmationData(values);
    },
  });


  // Confirmation step effects
  useEffect(() => {
    if (confirmationData) {
      const fetchCommunes = async () => {
        setLoadingCommunes(true);
        try {
          // Fetch departure commune pays name
          const departCommuneResponse = await api.get('/geography/commune', { params: { id: confirmationData.departCommuneId } });
          setDepartCommuneName(departCommuneResponse.data.name);

          // Fetch destinations with pays information
          const formattedDestinations = await Promise.all(
            destinations.map(async (destination, index) => {
              const communeId = destination.commune;
              if (!communeId) return '';
              const communeResponse = await api.get('/geography/commune', { params: { id: communeId } });
              const communeName = communeResponse.data.name;
              const paysName = paysList.find(p => p.id === destination.pays)?.name || 'Inconnu';
              return `${communeName} (${paysName})`;
            })
          );
          setDestinationCommunes(formattedDestinations);

        } catch (error) {
          console.error('Erreur lors du chargement des communes:', error);
          setDestinationCommunes([]);
        } finally {
          setLoadingCommunes(false);
        }
      };
      fetchCommunes();
    }
  }, [confirmationData]);

  const handleConfirm = async () => {
    try {
      const response = await api.post('/mission-orders', confirmationData);
      if (response.status === 201) {
        confirmationData.order_number = response.data.order_number;
        setSubmittedData(confirmationData);
        setIsMissionCreated(true);
        setIsFormDisabled(true);
        formik.resetForm();
        //if (userRole.toString() !== "1") {
        navigate('/mission-orders');
        //}
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la création de l\'ordre de mission');
      console.error('Erreur:', error);
    } finally {
      setConfirmationData(null);
    }
  };

  const handleCancel = () => {
    setConfirmationData(null);
  };

  useEffect(() => {
    formik.setFieldValue(
      'destinationIds',
      destinations.map(d => d.commune).filter(id => id)
    );
  }, [destinations]);

  const handleDestinationChange = async (index, field, value) => {
    const updatedDestinations = [...destinations];
    const destination = { ...updatedDestinations[index] };

    if (field === 'pays') {
      destination.pays = value;
      destination.wilaya = '';
      destination.daira = '';
      destination.commune = '';
      destination.dairas = [];
      destination.communes = []; // Reset communes

      if (value !== 4) {
        // Fetch communes for pays
        const communesResponse = await api.get('/geography/communes', { params: { pays_id: value } });
        destination.communes = communesResponse.data;
      }
    } else if (field === 'wilaya') {
      destination.wilaya = value;
      destination.daira = '';
      destination.commune = '';
      destination.communes = [];
      try {
        const dairasResponse = await api.get(`/geography/dairas?wilaya_id=${value}`);
        destination.dairas = dairasResponse.data;
      } catch (error) {
        console.error('Error fetching dairas:', error);
        destination.dairas = [];
      }
    } else if (field === 'daira') {
      destination.daira = value;
      destination.commune = '';
      try {
        const communesResponse = await api.get(`/geography/communes?daira_id=${value}`);
        destination.communes = communesResponse.data;
      } catch (error) {
        console.error('Error fetching communes:', error);
        destination.communes = [];
      }
    } else if (field === 'commune') {
      destination.commune = value;
    }

    updatedDestinations[index] = destination;
    setDestinations(updatedDestinations);
  };

  const addDestination = () => {
    setDestinations([
      ...destinations,
      { wilaya: '', daira: '', commune: '', dairas: [], communes: [] },
    ]);
  };

  const removeDestination = (index) => {
    const updatedDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(updatedDestinations);
  };

  // Fetch user role on component mount
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await fetchCurrentUser();
      if (currentUser) {
        setUserRole(currentUser.role); // Set the user's role
        setEmployee(currentUser.employee); // Set the user's employee
        if (currentUser.role?.toString() !== "1" && currentUser.employee?.id) {
          formik.setFieldValue('employeeId', currentUser.employee.id);
        }
      }
      setLoading(false); // Stop loading
    };
    if (!userLoaded) {
      loadUser();
      setUserLoaded(true);
    }
  }, [formik]);

  const isSpecialTransportType = (transport) => {
    return ['taxi', 'yassir', 'careem', 'avion', 'bus', 'train', 'bateau'].includes(transport?.type?.toLowerCase());
  };


  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {!confirmationData ? (
        <form onSubmit={formik.handleSubmit} style={{ display: isFormDisabled ? "none" : "block" }}>
          {/* Employee Selector */}
          <FormControl fullWidth margin="normal" disabled={isFormDisabled} style={{ display: userRole?.toString() !== "1" ? "none" : "block" }}>
            <InputLabel>Employé</InputLabel>
            <Select
              style={{ width: '100%' }}
              name="employeeId"
              value={userRole?.toString() === "1" ? formik.values.employeeId : employee?.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
              disabled={isFormDisabled}
            >
              {userRole?.toString() === "1" ? (
                employees.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {`${emp.first_name} ${emp.last_name}`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={employee?.id}>
                  {employee ? `${employee.first_name} ${employee.last_name}` : 'Loading...'}
                </MenuItem>
              )}
            </Select>
            {/* Error message */}
          </FormControl>

          <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
            <InputLabel>Pays</InputLabel>
            <Select
              name="selectedPays"
              value={selectedPays}
              onChange={(e) => setSelectedPays(e.target.value)}
              disabled={isFormDisabled}
            >
              {paysList.map(pays => (
                <MenuItem key={pays.id} value={pays.id}>
                  {pays.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedPays === 4 && (
            <>
              <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                <InputLabel>Wilaya</InputLabel>
                <Select
                  name="wilaya"
                  value={selectedWilaya}
                  onChange={(e) => setSelectedWilaya(e.target.value)}
                  label="Wilaya"
                  disabled={isFormDisabled}
                >
                  {algeriaWilayas.map((wilaya) => ( // Use Algeria's wilayas
                    <MenuItem key={wilaya.id} value={wilaya.id}>
                      {wilaya.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                <InputLabel>Daïra</InputLabel>
                <Select
                  name="daira"
                  value={selectedDaira}
                  onChange={(e) => setSelectedDaira(e.target.value)}
                  label="Daïra"
                  disabled={isFormDisabled}
                >
                  {dairas.map((daira) => (
                    <MenuItem key={daira.id} value={daira.id}>
                      {daira.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                <InputLabel>Commune de Départ</InputLabel>
                <Select
                  name="departCommuneId"
                  value={formik.values.departCommuneId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.departCommuneId && Boolean(formik.errors.departCommuneId)}
                  disabled={isFormDisabled}
                >
                  {communes.map((commune) => (
                    <MenuItem key={commune.id} value={commune.id}>
                      {commune.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.departCommuneId && formik.errors.departCommuneId && (
                  <p style={{ color: 'red' }}>{formik.errors.departCommuneId}</p>
                )}
              </FormControl>
            </>
          )}
          {selectedPays !== 4 && (
            <div>
              <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                <InputLabel>Ville</InputLabel>
                <Select
                  name="departCommuneId"
                  value={formik.values.departCommuneId}
                  onChange={formik.handleChange}
                  disabled={isFormDisabled}
                >
                  {villeCommunes.map(commune => (
                    <MenuItem key={commune.id} value={commune.id}>
                      {commune.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Add new ville input */}
              <TextField
                name="newVilleName"
                label="Ajouter une nouvelle ville"
                onChange={(e) => setNewVilleName(e.target.value)}
              />
              <Button
                onClick={async () => {
                  if (newVilleName) {
                    try {
                      const response = await api.post('/geography/commune', {
                        pays_id: selectedPays,
                        name: newVilleName
                      });
                      setVilleCommunes([...villeCommunes, response.data.newCommune]);
                      setNewVilleName('');
                    } catch (error) {
                      console.error('Erreur création ville:', error);
                    }
                  }
                }}
              >
                Ajouter
              </Button>
            </div>
          )}

          {/* Dynamic Destinations */}
          <h3>Destinations</h3>
          {destinations.map((destination, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h4>Destination {index + 1}</h4>

              <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                <InputLabel>Pays</InputLabel>
                <Select
                  value={destination.pays}
                  onChange={(e) => handleDestinationChange(index, 'pays', e.target.value)}
                  disabled={isFormDisabled}
                >
                  {paysList.map(pays => (
                    <MenuItem key={pays.id} value={pays.id}>
                      {pays.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {destination.pays === 4 && (
                <>
                  {/* Wilaya Selector */}
                  <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                    <InputLabel>Wilaya</InputLabel>
                    <Select
                      value={destination.wilaya}
                      onChange={(e) => handleDestinationChange(index, 'wilaya', e.target.value)}
                      disabled={isFormDisabled}
                    >
                      {algeriaWilayas.map((wilaya) => ( // Use Algeria's wilayas
                        <MenuItem key={wilaya.id} value={wilaya.id}>
                          {wilaya.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* Daira Selector */}
                  <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                    <InputLabel>Daïra</InputLabel>
                    <Select
                      value={destination.daira}
                      onChange={(e) => handleDestinationChange(index, 'daira', e.target.value)}
                      disabled={isFormDisabled}
                    >
                      {destination.dairas.map((daira) => (
                        <MenuItem key={daira.id} value={daira.id}>
                          {daira.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* Commune Selector */}
                  <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                    <InputLabel>Commune</InputLabel>
                    <Select
                      value={destination.commune}
                      onChange={(e) => handleDestinationChange(index, 'commune', e.target.value)}
                      disabled={isFormDisabled}
                    >
                      {destination.communes.map((commune) => (
                        <MenuItem key={commune.id} value={commune.id}>
                          {commune.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
              {destination.pays !== 4 && (
                <div>
                  <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                    <InputLabel>Ville</InputLabel>
                    <Select
                      value={destination.commune}
                      onChange={(e) => handleDestinationChange(index, 'commune', e.target.value)}
                      disabled={isFormDisabled}
                    >
                      {destination.communes.map((commune) => (
                        <MenuItem key={commune.id} value={commune.id}>
                          {commune.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    name="newVilleName"
                    label="Ajouter une nouvelle ville"
                    onChange={(e) => setNewVilleName(e.target.value)}
                  />
                  <Button
                    onClick={async () => {
                      if (newVilleName) {
                        try {
                          const response = await api.post('/geography/commune', {
                            pays_id: destination.pays,
                            name: newVilleName
                          });
                          const updatedDestinations = [...destinations];
                          updatedDestinations[index].communes = [...destination.communes, response.data.newCommune];
                          setDestinations(updatedDestinations);
                          setNewVilleName('');
                        } catch (error) {
                          console.error('Erreur création ville:', error);
                        }
                      }
                    }}
                  >
                    Ajouter
                  </Button>
                </div>
              )}
              {/* Remove Destination Button */}
              <Button
                variant="contained"
                color="error"
                onClick={() => removeDestination(index)}
                style={{ marginTop: '10px' }}
                disabled={isFormDisabled}
              >
                Supprimer cette destination
              </Button>
            </div>
          ))}
          {/* Add Destination Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={addDestination}
            style={{ marginTop: '20px' }}
            disabled={isFormDisabled}
          >
            Ajouter une destination
          </Button>

          {/* Transport Selector */}
          <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
            <InputLabel>Moyen de Transport</InputLabel>
            <Select
              name="transportId"
              value={formik.values.transportId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.transportId && Boolean(formik.errors.transportId)}
              disabled={isFormDisabled}
            >
              {transports.map((transport) => (
                <MenuItem key={transport.id} value={transport.id}>
                  {isSpecialTransportType(transport)
                    ? transport.type
                    : `${transport.brand} ${transport.model} (${transport.registration})`}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.transportId && formik.errors.transportId && (
              <p style={{ color: 'red' }}>{formik.errors.transportId}</p>
            )}
          </FormControl>
          {transports.find(t => t.id === formik.values.transportId)?.type &&
            ['AVION', 'BUS', 'BATEAU', 'TRAIN'].includes(
              transports.find(t => t.id === formik.values.transportId)?.type?.toUpperCase()
            ) && (
              <TextField
                fullWidth
                margin="normal"
                name="billet"
                label="Billet"
                value={formik.values.billet || ''}
                onChange={formik.handleChange}
                disabled={isFormDisabled}
              />
            )}

          {/* Validity Dates */}
          <TextField
            fullWidth
            margin="normal"
            type="date"
            name="validityFrom"
            label="Date de début"
            InputLabelProps={{ shrink: true }}
            value={formik.values.validityFrom}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.validityFrom && Boolean(formik.errors.validityFrom)}
            helperText={formik.touched.validityFrom && formik.errors.validityFrom}
            inputProps={{ min: new Date().toISOString().split('T')[0] }}
            disabled={isFormDisabled}
          />
          <TextField
            fullWidth
            margin="normal"
            type="date"
            name="validityTo"
            label="Date de fin"
            InputLabelProps={{ shrink: true }}
            value={formik.values.validityTo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.validityTo && Boolean(formik.errors.validityTo)}
            helperText={formik.touched.validityTo && formik.errors.validityTo}
            inputProps={{ min: formik.values.validityFrom || new Date().toISOString().split('T')[0] }}
            disabled={isFormDisabled}
          />

          {/* Reason Textarea */}
          <TextField
            fullWidth
            margin="normal"
            multiline
            rows={4}
            name="reason"
            label="Motif"
            value={formik.values.reason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.reason && Boolean(formik.errors.reason)}
            helperText={formik.touched.reason && formik.errors.reason}
            disabled={isFormDisabled}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isFormDisabled}
          >
            Créer
          </Button>
        </form>
      ) : (
        <Dialog open={!!confirmationData} fullWidth maxWidth="md">
          <DialogTitle>Confirmation de création</DialogTitle>
          <DialogContent>
            {loadingCommunes ? (
              <LinearProgress />
            ) : (
              <>
                <Typography variant="h5">Détails de la mission</Typography>
                <div>
                  <Typography variant="h6">Employé :</Typography>
                  <Typography>
                    {employees.find(e => e.id === confirmationData.employeeId)?.last_name}{' '}
                    {employees.find(e => e.id === confirmationData.employeeId)?.first_name}
                  </Typography>
                </div>

                <div>
                  <Typography variant="h6">Dates :</Typography>
                  <Typography>
                    Du {confirmationData.validityFrom} au {confirmationData.validityTo}
                  </Typography>
                </div>

                <div>
                  <Typography variant="h6">Depart :</Typography>
                  <Typography>
                    {departCommuneName} ({paysList.find(p => p.id === selectedPays)?.name || 'Inconnu'})
                  </Typography>
                </div>

                <div>
                  <Typography variant="h6">Destinations :</Typography>
                  <Typography>{destinationCommunes.join(', ')}</Typography>
                </div>

                <div>
                  <Typography variant="h6">Motif :</Typography>
                  <Typography>{confirmationData.reason}</Typography>
                </div>

                <div>
                  <Typography variant="h6">Transport :</Typography>
                  {(() => {
                    const transport = transports.find(t => t.id === confirmationData.transportId);
                    return (
                      <>
                        <Typography>
                          {isSpecialTransportType(transport)
                            ? transport.type
                            : `${transport.brand} ${transport.model} (${transport.registration})`}
                        </Typography>
                        {isSpecialTransportType(transport) && (
                          <div>
                            {confirmationData.billet ? (
                              <Typography>Billet: {confirmationData.billet}</Typography>
                            ) : (
                              <Typography style={{ color: 'red' }}>Le billet n'a pas été spécifié.</Typography>
                            )}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleConfirm} color="primary" variant="contained">
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {isMissionCreated && userRole.toString() === "1" && (
        <div>
          <h3>Aperçu PDF</h3>
          <PDFViewer style={{ width: '100%', height: '1200px' }}>
            <MissionPDF
              data={submittedData || formik.values}
              employees={employees}
              transports={transports}
              destinations={destinations}
              communes={communes}
            />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default MissionForm;