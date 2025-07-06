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
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import api from '../services/api';
import { fetchCurrentUser } from '../services/auth';
import DechargeArgentPDF from './DechargeArgentPDF';
import { PDFViewer } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';

const DechargeArgentForm = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);

  // Confirmation step states
  const [confirmationData, setConfirmationData] = useState(null);
  const [loadingConfirmation, setLoadingConfirmation] = useState(false);

  // Fetch employees
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await api.get('/employees');
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      employeeId: '',
      reason: '',
      somme_argent: 0,
      unite_argent: 'DA',
      use_cni: false,
    },
    validationSchema: Yup.object({
      employeeId: Yup.number().required('Champ requis.'),
      reason: Yup.string().required('Champ requis.'),
      somme_argent: Yup.number().required('Champ requis.'),
      unite_argent: Yup.string().required('Champ requis.'),
      use_cni: Yup.boolean().required('Champ requis.'),
    }),
    onSubmit: (values) => {
      setConfirmationData(values);
    },
  });

  // Handle confirmation step
  const handleConfirm = async () => {
    try {
      setLoadingConfirmation(true);
      const response = await api.post('/decharge-argents', confirmationData);
      if (response.status === 201) {
        const updatedData = {
          ...response.data,
          employee: employees.find((emp) => emp.id === response.data.employee_id),
        };
        setSubmittedData(updatedData);
        setIsFormDisabled(true);
        formik.resetForm();
        navigate('/decharge-argents');
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la création de l'autorisation de sortie");
      console.error('Erreur:', error);
    } finally {
      setLoadingConfirmation(false);
      setConfirmationData(null);
    }
  };

  const handleCancel = () => {
    setConfirmationData(null);
  };

  // Fetch user role on component mount
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await fetchCurrentUser();
      if (currentUser) {
        setUserRole(currentUser.role);
        setEmployee(currentUser.employee);
        if (currentUser.role?.toString() !== "1" && currentUser.employee?.id) {
          formik.setFieldValue('employeeId', currentUser.employee.id);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [formik]);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {/* Form or Confirmation Modal */}
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
          </FormControl>

          {/* Motif */}
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

          <Grid container spacing={2} alignItems="center">
            {/* Somme */}
            <Grid item xs={8}>
              <TextField
                fullWidth
                margin="normal"
                type="number"
                name="somme_argent"
                label="Somme"
                value={parseFloat(formik.values.somme_argent).toFixed(2)} // Ensures 2 decimal places
                onChange={(e) => {
                  const value = parseFloat(e.target.value).toFixed(2);
                  formik.setFieldValue('somme_argent', isNaN(value) ? '' : value); // Handles NaN cases
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.somme_argent && Boolean(formik.errors.somme_argent)}
                helperText={formik.touched.somme_argent && formik.errors.somme_argent}
                disabled={isFormDisabled}
                inputProps={{
                  step: '0.01', // Allows input in increments of 0.01
                  maxLength: 13, // Ensures the total length doesn't exceed 10 digits + 2 decimals + 1 dot
                }}
              />
            </Grid>

            {/* Monnaie */}
            <Grid item xs={4}>
              <FormControl fullWidth margin="normal" disabled={isFormDisabled}>
                <InputLabel>Monnaie</InputLabel>
                <Select
                  name="unite_argent"
                  value={formik.values.unite_argent}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.unite_argent && Boolean(formik.errors.unite_argent)}
                >
                  <MenuItem value="DA">DA</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* CNI/Griffe */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.use_cni}
                onChange={formik.handleChange}
                name="use_cni"
                color="primary"
              />
            }
            label="Utiliser CNI"
            style={{ marginLeft: 16, marginBottom: 16 }}
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
            {loadingConfirmation ? (
              <LinearProgress />
            ) : (
              <>
                <Typography variant="h5">Détails de l'autorisation de sortie</Typography>
                <div>
                  <Typography variant="h6">Employé :</Typography>
                  <Typography>
                    {employees.find(e => e.id === confirmationData.employeeId)?.first_name}{' '}
                    {employees.find(e => e.id === confirmationData.employeeId)?.last_name}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6">Motif :</Typography>
                  <Typography>{confirmationData.reason}</Typography>
                </div>
                <div>
                  <Typography variant="h6">Somme :</Typography>
                  <Typography>{confirmationData.somme_argent}</Typography>
                </div>
                <div>
                  <Typography variant="h6">Monnaie :</Typography>
                  <Typography>{confirmationData.unite_argent}</Typography>
                </div>
                <div>
                  <Typography variant="h6">CNI / Griffe :</Typography>
                  <Typography>{confirmationData.use_cni ? 'CNI' : 'Griffe'}</Typography>
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

      {/* PDF Preview */}
      {submittedData && (
        <div>
          <h3>Aperçu PDF</h3>
          <PDFViewer style={{ width: '100%', height: '1200px' }}>
            <DechargeArgentPDF data={submittedData} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default DechargeArgentForm;