import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Le nom d\'utilisateur est requis.'),
      password: Yup.string().required('Le mot de passe est requis.')
    }),
    onSubmit: async (values) => {
      const success = await login(values);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect.');
      }
    }
  });

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            {...formik.getFieldProps('username')}
            style={{ width: '100%', padding: '8px' }}
          />
          {formik.touched.username && formik.errors.username ? (
            <p style={{ color: 'red' }}>{formik.errors.username}</p>
          ) : null}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Mot de passe</label>
          <input
            type="password"
            {...formik.getFieldProps('password')}
            style={{ width: '100%', padding: '8px' }}
          />
          {formik.touched.password && formik.errors.password ? (
            <p style={{ color: 'red' }}>{formik.errors.password}</p>
          ) : null}
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;