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
  DialogActions,
} from '@mui/material';
import api from '../services/api';
import { fetchCurrentUser } from '../services/auth';
import ExitAuthorizationPDF from './ExitAuthorizationPDF';
import { PDFViewer } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';

const ExitAuthorizationForm = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isExitAuthCreated, setIsExitAuthCreated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 1 for admin, other values for non-admin
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
      sortie_date: new Date().toISOString().split('T')[0],
      sortie_time: '09:00',
      entree_date: new Date().toISOString().split('T')[0],
      entree_time: '17:00',
    },
    validationSchema: Yup.object({
      employeeId: Yup.number().required('Champ requis.'),
      reason: Yup.string().required('Champ requis.'),
      sortie_date: Yup.date()
        .min(new Date(new Date().setHours(0, 0, 0, 0)), 'La date ne peut pas être dans le passé')
        .required('Champ requis.'),
      sortie_time: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format HH:mm requis.')
        .required('Champ requis.'),
      entree_date: Yup.date()
        .min(Yup.ref('sortie_date'), "La date d'entrée doit être après la date de sortie.")
        .required('Champ requis.'),
      entree_time: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format HH:mm requis.')
        .required('Champ requis.'),
    }),
    onSubmit: (values) => {
      setConfirmationData(values);
    },
  });

  // Handle confirmation step
  const handleConfirm = async () => {
    try {
      setLoadingConfirmation(true);
      const response = await api.post('/exit-authorizations', confirmationData);
      if (response.status === 201) {
        response.data.employee = employees.find((emp) => emp.id === response.data.employee_id);
        setSubmittedData(response.data);
        setIsExitAuthCreated(true);
        setIsFormDisabled(true);
        formik.resetForm();
        //if (userRole.toString() !== "1") {
          navigate('/exit-authorizations');
        //}
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
        setUserRole(currentUser.role); // Set the user's role
        setEmployee(currentUser.employee); // Set the user's employee
        if (currentUser.role?.toString() !== "1" && currentUser.employee?.id) {
          formik.setFieldValue('employeeId', currentUser.employee.id);
        }
      }
      setLoading(false); // Stop loading
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

          {/* Sortie Date and Time */}
          <TextField
            fullWidth
            margin="normal"
            type="date"
            name="sortie_date"
            label="Date de Sortie"
            InputLabelProps={{ shrink: true }}
            value={formik.values.sortie_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.sortie_date && Boolean(formik.errors.sortie_date)}
            helperText={formik.touched.sortie_date && formik.errors.sortie_date}
            inputProps={{ min: new Date().toISOString().split('T')[0] }}
            disabled={isFormDisabled}
          />
          <TextField
            fullWidth
            margin="normal"
            type="time"
            name="sortie_time"
            label="Heure de Sortie"
            InputLabelProps={{ shrink: true }}
            value={formik.values.sortie_time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.sortie_time && Boolean(formik.errors.sortie_time)}
            helperText={formik.touched.sortie_time && formik.errors.sortie_time}
            disabled={isFormDisabled}
          />

          {/* Entrée Date and Time */}
          <TextField
            fullWidth
            margin="normal"
            type="date"
            name="entree_date"
            label="Date d’Entrée"
            InputLabelProps={{ shrink: true }}
            value={formik.values.entree_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.entree_date && Boolean(formik.errors.entree_date)}
            helperText={formik.touched.entree_date && formik.errors.entree_date}
            inputProps={{ min: formik.values.sortie_date || new Date().toISOString().split('T')[0] }}
            disabled={isFormDisabled}
          />
          <TextField
            fullWidth
            margin="normal"
            type="time"
            name="entree_time"
            label="Heure d’Entrée"
            InputLabelProps={{ shrink: true }}
            value={formik.values.entree_time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.entree_time && Boolean(formik.errors.entree_time)}
            helperText={formik.touched.entree_time && formik.errors.entree_time}
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
                  <Typography variant="h6">Sortie :</Typography>
                  <Typography>
                    Le {confirmationData.sortie_date} à {confirmationData.sortie_time}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6">Entrée :</Typography>
                  <Typography>
                    Le {confirmationData.entree_date} à {confirmationData.entree_time}
                  </Typography>
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
      {isExitAuthCreated && userRole.toString() === "1" && (
        <div>
          <h3>Aperçu PDF</h3>
          <PDFViewer style={{ width: '100%', height: '1200px' }}>
            <ExitAuthorizationPDF
              data={submittedData || formik.values}
            />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default ExitAuthorizationForm;