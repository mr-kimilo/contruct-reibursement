import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import ReimbursementForm from '../pages/ReimbursementForm';
import MyReimbursements from '../pages/MyReimbursements';
import ApprovalDetail from '../pages/ApprovalDetail';




import MainLayout from '../components/Layout/MainLayout';
import ArchiveQuery from '../pages/ArchiveQuery/ArchiveQuery';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/form" element={<ReimbursementForm />} />
        <Route path="/my" element={<MyReimbursements />} />
        <Route path="/approval" element={<ApprovalDetail />} />
        <Route path="/archive" element={<ArchiveQuery />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
