import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import MissionPDF from './MissionPDF';

const PDFModal = ({ missionData, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Voir PDF</DialogTitle>
      <DialogContent>
        <PDFViewer style={{ width: '100%', height: '600px' }}>
          <MissionPDF
            data={missionData}
            employeeRoot={missionData?.employee}
            transportRoot={missionData?.transport}
            communeRoot={missionData?.depart_commune}
            destinations={missionData?.destinations}
          />
        </PDFViewer>
      </DialogContent>
    </Dialog>
  );
};

export default PDFModal;