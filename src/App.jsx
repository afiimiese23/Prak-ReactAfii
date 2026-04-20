import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
        <div id="layout-wrapper" className="flex flex-row flex-1">
            <Sidebar/>
            <div id="main-content" className="flex-1 p-4">
                <Header />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<Customers />} />
                    
                    {/* Error Routes */}
                    <Route path="/error-400" element={<ErrorPage code="400" title="Bad Request" description="Permintaan tidak dapat diproses oleh server." image="https://illustrations.popsy.co/gray/falling.svg" />} />
                    <Route path="/error-401" element={<ErrorPage code="401" title="Unauthorized" description="Anda harus login terlebih dahulu." image="https://illustrations.popsy.co/gray/shaking-hands.svg" />} />
                    <Route path="/error-403" element={<ErrorPage code="403" title="Forbidden" description="Anda tidak memiliki akses ke halaman ini." image="https://illustrations.popsy.co/gray/stop.svg" />} />
                    <Route path="*" element={<ErrorPage code="404" title="Page Not Found" description="Halaman yang anda cari raib entah kemana." />} />
                </Routes>
            </div>
        </div>
    </div>
  );
}