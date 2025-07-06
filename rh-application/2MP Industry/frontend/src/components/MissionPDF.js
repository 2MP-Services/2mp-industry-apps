import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import api from '../services/api';

const MissionPDF = ({ data, employees = [], transports = [], destinations = [], communes = [], employeeRoot = null, transportRoot = null, communeRoot = null }) => {
  // State to store the mission order count
  const [missionOrderCount, setMissionOrderCount] = useState(0);

  // Fetch the mission order count when the component mounts
  useEffect(() => {
    const fetchMissionOrderCount = async () => {
      try {
        const response = await api.get('/mission-orders/count');
        if (!response.data) {
          throw new Error('Failed to fetch mission order count');
        }
        const count = response.data;
        setMissionOrderCount(count);
      } catch (error) {
        console.error('Error fetching mission order count:', error);
      }
    };

    fetchMissionOrderCount();
  }, []);

  // Format the mission order count as a 4-digit number
  const formattedMissionOrderNumber = String(missionOrderCount + 1).padStart(4, '0');

  // Get employee details from ID
  const employee = employeeRoot ? employeeRoot : employees.find(emp => emp.id === data.employeeId) || {};

  // Get transport details from ID
  const transport = transportRoot ? transportRoot : transports.find(t => t.id === data.transportId) || {};

  // Determine if transport type is in the special list
  const specialList = ['taxi', 'avion', 'bus', 'train', 'bateau'];
  const isSpecialTransportType = specialList.includes(
    transport.type?.toLowerCase()
  );

  // Get destination commune names
  let international = false;
  if (data.depart_pays.id !== 4)
    international = true;
  for (const dest of data.destinations) {
    if (dest.pays.id !== 4)
      international = true;
  }
  let destinationNames = []
  if (!international)
    destinationNames = data.depart_commune.name + ', ' +
      (data.destinations
        .map(dest => {
          return dest.commune.name ? dest.commune.name : 'N/A';
        })
        .join(', '));
  else
    destinationNames = data.depart_commune.name + " (" + data.depart_pays.name + ') - ' +
      (data.destinations
        .map(dest => {
          return (dest.commune.name ? dest.commune.name : 'N/A') + " (" + (dest.pays?.name ? dest.pays?.name : 'N/A') + ")"
        })
        .join(' - '));
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        <View style={styles.logo}>
          <Image src={require("../assets/logo.png")} style={styles.logoImage} />
        </View>

        {/* Date */}
        <Text style={styles.headerDate}>BOUFARIK LE : {new Date(data.createdAt).toLocaleDateString("fr")}</Text>

        {/* Order Number */}
        <Text style={styles.orderNumber}>
          ORDRE DE MISSION N° {data.order_number}
        </Text>

        {/* Employee Fields */}
        <View style={styles.fieldGroup}>
          <Text>
            <Text style={styles.fieldLabel}>Nom:</Text>
            <Text style={{ fontWeight: 'bold' }}> {employee.last_name}</Text>
          </Text>
        </View>
        <View style={styles.fieldGroup}>
          <Text>
            <Text style={styles.fieldLabel}>Prénom:</Text>
            <Text style={{ fontWeight: 'bold' }}> {employee.first_name}</Text>
          </Text>
        </View>
        <View style={styles.fieldGroup}>
          <Text>
            <Text style={styles.fieldLabel}>Profession:</Text>
            <Text style={{ fontWeight: 'bold' }}> {employee.profession?.name || 'N/A'}</Text>
          </Text>
        </View>

        {/* Validity Dates */}
        <View style={styles.fieldGroup}>
          <Text>
            <Text style={styles.fieldLabel}>Validité de:</Text>
            <Text style={{ fontWeight: 'bold' }}> {data.validityFrom ? data.validityFrom : new Date(data.validity_from).toISOString().split('T')[0]}</Text>
          </Text>
        </View>
        <View style={styles.fieldGroup}>
          <Text>
            <Text style={styles.fieldLabel}>Validité jusqu'à:</Text>
            <Text style={{ fontWeight: 'bold' }}> {data.validityTo ? data.validityTo : new Date(data.validity_to).toISOString().split('T')[0]}</Text>
          </Text>
        </View>

        {/* Destination */}
        <View style={styles.fieldGroup}>
          <Text>
            <Text style={styles.fieldLabel}>Destination:</Text>
            <Text style={{ fontWeight: 'bold' }}> {destinationNames}</Text>
          </Text>
        </View>

        {/* Reason */}
        <View style={styles.fieldGroup}>
          <Text>
            <Text style={styles.fieldLabel}>Motif:</Text>
            <Text style={{ fontWeight: 'bold' }}> {data.reason}</Text>
          </Text>
        </View>

        {/* Transport Details */}
        <View style={styles.fieldGroup}>
          <Text>
            <Text style={styles.fieldLabel}>Moyen de transport:</Text>
            <Text style={{ fontWeight: 'bold' }}>
              {' '}
              {specialList.includes(transport.type?.toLowerCase())
                ? transport.type
                : `${transport.brand || ''} ${transport.model || ''}`}
            </Text>
          </Text>
        </View>
        {['avion', 'bus', 'train', 'bateau'].includes(transport.type?.toLowerCase()) && (
          <View style={styles.fieldGroup}>
            <Text>
              <Text style={styles.fieldLabel}>Numero De Billet:</Text>
              <Text style={{ fontWeight: 'bold' }}> {data.billet}</Text>
            </Text>
          </View>
        )}
        {!isSpecialTransportType && (
          <View style={styles.fieldGroup}>
            <Text>
              <Text style={styles.fieldLabel}>Immatriculation:</Text>
              <Text style={{ fontWeight: 'bold' }}> {transport.registration || 'N/A'}</Text>
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>LA direction Générale,</Text>
          <Text>2MP INDUSTRY SPA</Text>
        </View>
      </Page>
    </Document>
  );
};

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
  },
  logo: {
    width: '100%',
    marginBottom: 10,
  },
  logoImage: {
    width: '100%',
  },
  headerDate: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 12,
    marginBottom: 10,
  },
  orderNumber: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginVertical: 20,
  },
  fieldGroup: {
    fontSize: 14,
    marginBottom: 15,
  },
  fieldLabel: {
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 30,
    lineHeight: 2,
    paddingLeft: 5,
  },
});

export default MissionPDF;