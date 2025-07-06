import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import spell from 'spell-it';
Font.register({
  family: 'Amiri',
  src: require("../assets/Amiri.ttf")
});

function spellNumberInFrench(number) {
  const locale = 'fr';

  // Convert the number to a string and split into integer and fractional parts
  const [integerPart, fractionalPart] = number.toString().split('.');

  // Spell out the integer part
  let result = spell(locale)(parseInt(integerPart, 10));

  // Handle the fractional part
  if (fractionalPart) {
    result += ' virgule'; // Add "virgule" for the decimal point

    if (fractionalPart.startsWith('0')) {
      // If fractional part starts with 0, spell out each digit individually
      for (const digit of fractionalPart) {
        result += ' ' + spell(locale)(parseInt(digit, 10));
      }
    } else {
      // Otherwise, spell the fractional part directly
      result += ' ' + spell(locale)(parseInt(fractionalPart, 10));
    }
  }

  return result;
}

const DechargeArgentPDF = ({
  data
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image src={require("../assets/logo.png")} style={styles.logoImage} />
          </View>



          <Text style={styles.mainTitle}>
            DECHARGE
          </Text>

          <View style={styles.formGroup}>
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                Je Soussignée MR : {data.employee.last_name + " " + data.employee.first_name} avoir reçu de la part de
                2MP INDUSTRY SPA
              </Text>
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                La somme de : {spellNumberInFrench(parseFloat(data.somme_argent)) + " " + data.unite_argent + " (" + data.somme_argent + " " + data.unite_argent + ")" + ((data.isRemis === true && parseFloat(data.remis) > 0) ? (" , remis : " + spellNumberInFrench(parseFloat(data.remis)) + " " + data.unite_argent + " (" + data.remis + " " + data.unite_argent + ")") : "")}
              </Text>
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                Qui représente : {data.reason}
              </Text>
            </View>
            <Text style={styles.headerDate}>Le : {new Date(data.createdAt).toLocaleDateString("fr")}</Text>


            <View style={styles.fieldRow}>
              <Text style={styles.field}>
                {data.use_cni ? " Signature et N° CNI : " + data.employee.cin : " Signature et Griffe : "}
              </Text>
            </View>
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

export default DechargeArgentPDF;