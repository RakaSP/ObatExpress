import './App.css'
import { Routes, Route } from 'react-router-dom'
import EmployeeLayout from './common/EmployeeLayout'
import Admin from './pages/Admin'

import LoginPage from './pages/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import AddEmployee from './pages/Admin/AddEmployee'
import EmployeeList from './pages/Admin/EmployeeList'

import ShipmentList from './pages/Admin/ShipmentList'
import ShipmentDetail from './pages/Admin/ShipmentDetail'
import OrderDetail from './pages/Admin/OrderDetail'
import Vehicles from './pages/Admin/Vehicles'
import Troubles from './pages/Admin/Troubles'

import Driver from './pages/Driver'
import DriverDashboard from './pages/Driver/Dashboard'
import DriverReport from './pages/Driver/Report'
import DriverProfile from './pages/Driver/Profile'

import Packer from './pages/Packer'
import PackerVehicle from './pages/Packer/Vehicle'
import PackerCardboard from './pages/Packer/Cardboard'
import OrderList from './pages/Admin/OrderList'

import Solver from './pages/Solver'
import SolverMain from './pages/Solver/Solver'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/" element={<EmployeeLayout />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="employees" element={<EmployeeList />}>
              <Route path="list" element={<EmployeeList />} />
              <Route path="add" element={<AddEmployee />} />
            </Route>
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="shipment" element={<ShipmentList />} />
            <Route path="shipment/:id" element={<ShipmentDetail />} />
            <Route path="order" element={<OrderList />} />
            <Route path="order/:id" element={<OrderDetail />} />
            <Route path="trouble" element={<Troubles />}></Route>
          </Route>
          <Route path="/driver" element={<Driver />}>
            <Route path="" element={<DriverDashboard />}></Route>
            <Route path="report" element={<DriverReport />}></Route>
            <Route path="profile" element={<DriverProfile />}></Route>
          </Route>
          <Route path="packer" element={<Packer />}>
            <Route path="vehicle/:id" element={<PackerVehicle />} />
            <Route path="cardboard/:id" element={<PackerCardboard />} />
          </Route>
          <Route path="solver" element={<Solver />}>
            <Route path="" element={<SolverMain />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
