import api from './api';

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/auth/whoami');
    return response.data; // Contains user details, including role_id
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
    return null;
  }
};