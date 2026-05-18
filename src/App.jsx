import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
// import Loading from './components/Loading';

const Dashboard = React.lazy(() => import("./pages/main/Dashboard"))
const Orders = React.lazy(() => import("./pages/main/Orders"))
const Customers = React.lazy(() => import("./pages/main/Customers"))
const CustomerDetail = React.lazy(() => import("./pages/main/CustomersDetail"))
const ErrorPage = React.lazy(() => import("./pages/main/ErrorPage"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const Loading = React.lazy(() => import("./components/Loading"))
const Components = React.lazy(() => import("./pages//main/Components"))
const Products = React.lazy(() => import("./pages/main/Products"))

export default function App() {
  return (
    <Suspense fallback={<Loading />}> 
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/:id" element={<CustomerDetail />} />
                <Route path="/components" element={<Components />} />
                <Route path="/products" element={<Products />} />
            </Route>

            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/forgot" element={<Forgot/>} />
            </Route>  

            {/* Error Routes */}
            <Route path="/error-400" element={<ErrorPage code="400" title="Bad Request" description="Permintaan tidak dapat diproses oleh server." image="https://illustrations.popsy.co/gray/falling.svg" />} />
            <Route path="/error-401" element={<ErrorPage code="401" title="Unauthorized" description="Anda harus login terlebih dahulu." image="https://illustrations.popsy.co/gray/shaking-hands.svg" />} />
            <Route path="/error-403" element={<ErrorPage code="403" title="Forbidden" description="Anda tidak memiliki akses ke halaman ini." image="https://illustrations.popsy.co/gray/stop.svg" />} />
            <Route path="*" element={<ErrorPage code="404" title="Page Not Found" description="Halaman yang anda cari raib entah kemana." />} />
        </Routes>
    </Suspense>
  );
}