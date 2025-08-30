import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login/Login.jsx';
import ReimbursementForm from '../pages/ReimbursementForm/ReimbursementForm.jsx';
import MyReimbursement from '../pages/MyReimbursement/MyReimbursement.jsx';
import ApprovalDetail from '../pages/ApprovalDetail/ApprovalDetail.jsx';
import ArchiveQuery from '../pages/ArchiveQuery/ArchiveQuery.jsx';
import MainLayout from '../components/Layout/MainLayout';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/form" element={<ReimbursementForm />} />
      <Route path="/my" element={<MyReimbursement />} />
        <Route path="/approval" element={<ApprovalDetail />} />
        <Route path="/archive" element={<ArchiveQuery />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
