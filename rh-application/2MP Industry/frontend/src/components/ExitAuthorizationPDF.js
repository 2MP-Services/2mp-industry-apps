import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Amiri',
  src: require("../assets/Amiri.ttf")
});

const ExitAuthorizationPDF = ({
  data
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image src={require("../assets/logo.png")} style={styles.logoImage} />
          </View>

          <Text style={styles.headerDate}>Boufarik le : {new Date(data.createdAt).toLocaleDateString("fr")}</Text>

          <Text style={styles.mainTitleArabic}>
            رخصة خروج
          </Text>
          <br></br>
          <Text style={styles.mainTitle}>
            AUTORISATION DE SORTIE Personnel / Professionnel
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.fieldArticle}>
              Suivant article N°33 du règlement intérieur, nous vous autorisons de sortir.
            </Text>

            {/* NOM */}
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                NOM : <Text style={styles.fieldValue}>{data.employee.last_name || 'N/A'}</Text>
              </Text>
              <Text style={styles.arabicLabel}>اللقب</Text>
            </View>

            {/* PRENOM */}
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                PRENOM : <Text style={styles.fieldValue}>{data.employee.first_name || 'N/A'}</Text>
              </Text>
              <Text style={styles.arabicLabel}>الاسم</Text>
            </View>

            {/* FONCTION */}
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                FONCTION : <Text style={styles.fieldValue}>{data.employee.profession.name || 'N/A'}</Text>
              </Text>
              <Text style={styles.arabicLabel}>المهنة</Text>
            </View>

            {/* MOTIF */}
            <View style={styles.fieldRow}>
              <View style={styles.fieldContainer}>
                <Text style={styles.field}>
                  MOTIF : <Text style={styles.fieldValue}>{data.reason || 'N/A'}</Text>
                </Text>
              </View>
              <Text style={styles.arabicLabel}>السبب</Text>
            </View>

            {/* DATE DE SORTIE */}
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                DATE DE SORTIE : <Text style={styles.fieldValue}>{data.sortie_date || 'N/A'}</Text>
              </Text>
              <Text style={styles.arabicLabel}>تار  يخ الخروج</Text>
            </View>

            {/* HEURE DE SORTIE */}
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                HEURE DE SORTIE : <Text style={styles.fieldValue}>{data.sortie_time || 'N/A'}</Text>
              </Text>
              <Text style={styles.arabicLabel}>توقيت الخروج</Text>
            </View>

            {/* DATE D’ENTREE */}
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                DATE D’ENTREE : <Text style={styles.fieldValue}>{data.entree_date || 'N/A'}</Text>
              </Text>
              <Text style={styles.arabicLabel}>تار  يخ الدخول</Text>
            </View>

            {/* HEURE D’ENTREE */}
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                HEURE D’ENTREE : <Text style={styles.fieldValue}>{data.entree_time || 'N/A'}</Text>
              </Text>
              <Text style={styles.arabicLabel}>توقيت الدخول</Text>
            </View>
          </View>

          <View style={styles.spacer} />

          <View style={styles.footer}>
            <Text style={styles.signature}>La Direction Générale,                                                                  L’employé(e)</Text>
            <View style={styles.spacer} />
            <View style={styles.spacer} />
            <View style={styles.spacer} />
            <Text style={styles.field}>
              N.B : <Text style={styles.fieldValueFooter}>la présente doit être remis à la direction.             </Text>
              <Text style={styles.fieldArabic}>.ملاحظة</Text>
              <Text style={styles.fieldValueArabic}>:يجب ارجاع رخصة الخروج الى الإدارة</Text>
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
    display: 'flex', // Ensure flex layout
    flexDirection: 'column', // Arrange children vertically
  },
  container: {
    flexGrow: 1, // Allow the container to grow and fill available space
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    width: '100%',
    marginBottom: 10,
  },
  logoImage: {
    width: '100%',
  },
  headerDate: {
    fontSize: 11,
    textAlign: 'right',
    marginBottom: 18,
  },
  arabicTitle: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    textAlign: 'right',
    textDecoration: 'underline',
    marginBottom: 10,
  },
  mainTitleArabic: {
    fontFamily: 'Amiri',
    fontSize: 22,
    textAlign: 'center',
    textDecoration: 'underline',
    fontWeight: 'bold',
    marginBottom: 13,
  },
  mainTitle: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    textDecoration: 'underline',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    paddingLeft: 30,
    marginBottom: 10,
  },
  fieldArabic: {
    fontSize: 14,
    fontFamily: 'Amiri',
  },
  fieldValue: {
    fontSize: 15,
    fontFamily: 'Amiri',
    fontWeight: 'normal',
  },
  fieldValueFooter: {
    fontFamily: 'Amiri',
    fontWeight: 'normal',
  },
  fieldValueArabic: {
    fontFamily: 'Amiri',
    fontWeight: 'normal',
  },
  spacer: {
    flexGrow: 1, // Pushes the footer to the bottom
  },
  footer: {
    marginTop: 20,
    paddingLeft: 30,
  },
  signature: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 80,
  },
  note: {
    fontSize: 12,
  },
  fieldContainer: {
    flex: 1, // Allow the container to grow and take available space
    marginRight: 10, // Add some spacing between the field and the Arabic label
  },
  arabicLabel: {
    fontFamily: 'Amiri',
    fontSize: 15,
    marginTop: 0, // Align the label with the top of the field
    alignSelf: 'flex-start', // Align the label to the top of the row
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top of the row
    justifyContent: 'space-between', // Ensure space between the field and the label
    marginBottom: 9,
  },
  // Update existing field style to remove marginBottom
  field: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  fieldArticle: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 15,
  },
});

export default ExitAuthorizationPDF;