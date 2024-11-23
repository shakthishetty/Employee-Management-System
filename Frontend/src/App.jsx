import React from 'react';
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateEmployee from './components/CreateEmployee';
import Dashboard from './components/Dashboard';
import EditEmployee from './components/EditEmployee'; // Import the EditEmployee component
import EmployeeList from './components/EmployeeList';
import Home from './components/Home';
import LoginForm from './components/Login';

function App() {
  return (
    <>
     <Toaster
    position="top-right"
    reverseOrder={false}
  />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />}>
         
          <Route index element={<Home />} />
          <Route path="employee-list" element={<EmployeeList />} />
         
          <Route path="edit-employee/:id" element={<EditEmployee />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
    
    </>
   
  );
}

export default App;
