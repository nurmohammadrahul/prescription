import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrescriptionEntry from './pages/PrescriptionEntry';
import PrescriptionView from './pages/PrescriptionView';
import PrescriptionpdfView from './pages/PrescriptionpdfView';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './Layout/MainLayout';
import AddMedicineForm from './pages/AddMedicineForm';
import PatientRecords from './pages/PatientRecords';
import PatientHistory from './pages/PatientHistory';
import PatientReport from './pages/PatientReport';
import ReportUpload from './pages/ReportUpload';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PDF view (no layout) */}
        <Route path="/prescriptionpdfview" element={<PrescriptionpdfView />} />

        {/* Protected routes with layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<PrescriptionEntry />} />
          <Route path="/prescriptionview" element={<PrescriptionView />} />
          <Route path='/addmedicine' element={<AddMedicineForm />} />
          <Route path='/patientrecords' element={<PatientRecords />} />
          <Route path="/patienthistory" element={<PatientHistory />} />
          <Route path="/patientreport" element={<PatientReport />} />
          <Route path="/reportupload" element={<ReportUpload />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
