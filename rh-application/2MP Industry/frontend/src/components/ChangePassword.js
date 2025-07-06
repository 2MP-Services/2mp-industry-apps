import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';
import api from '../services/api';

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Le mot de passe actuel est requis.'),
      newPassword: Yup.string()
        .required('Le nouveau mot de passe est requis.')
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
      confirmNewPassword: Yup.string()
        .required('La confirmation du mot de passe est requise.')
        .oneOf([Yup.ref('newPassword'), null], 'Les mots de passe ne correspondent pas.'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Send the change password request to the backend
        const response = await api.post('/auth/change-password', {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        // Show success message
        alert(response.data.message);

        // Reset the form after successful submission
        resetForm();
      } catch (error) {
        // Handle errors
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert('Une erreur inattendue est survenue.');
        }
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Changer le mot de passe
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Current Password */}
        <TextField
          fullWidth
          margin="normal"
          type="password"
          name="currentPassword"
          label="Mot de passe actuel"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.currentPassword && Boolean(formik.errors.currentPassword)
          }
          helperText={formik.touched.currentPassword && formik.errors.currentPassword}
        />

        {/* New Password */}
        <TextField
          fullWidth
          margin="normal"
          type="password"
          name="newPassword"
          label="Nouveau mot de passe"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />

        {/* Confirm New Password */}
        <TextField
          fullWidth
          margin="normal"
          type="password"
          name="confirmNewPassword"
          label="Confirmez le nouveau mot de passe"
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)
          }
          helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Mettre à jour le mot de passe
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;