import React from 'react';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  main: {
    height: 800,
    width: 1024
  }
});

// ReactPDF.render(<PrinterDAM />, `${__dirname}/example.pdf`);

// Create Document Component
const PrinterDAM = () => (
  <PDFViewer style={styles.main}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PrinterDAM;
