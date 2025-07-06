import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import DechargeArgentPDF from './DechargeArgentPDF';

const PDFModalDecharge = ({ missionData, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Voir PDF</DialogTitle>
      <DialogContent>
        <PDFViewer style={{ width: '100%', height: '600px' }}>
          <DechargeArgentPDF
            data={missionData}
          />
        </PDFViewer>
      </DialogContent>
    </Dialog>
  );
};

export default PDFModalDecharge;