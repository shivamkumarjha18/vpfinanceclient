// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Layout from "../Layout/Layout";
// import DashboardCards from "../Components/Dashbord/DashboardCards";
// import AppointmentComponent from "../Components/EmployeeDashboard/TelecallerDashboard/Appointment";
// // Master Components
// import Composite from "../Components/Masters/Composite/Composite";
// import Area from "../Components/Masters/Leads/Area";
// import City from "../Components/Masters/Leads/City";
// import LeadSource from "../Components/Masters/Leads/LeadSource";
// import SubArea from "../Components/Masters/Leads/SubArea";
// import MarketingTask from "../Components/Masters/Marketing/MarketingTask";
// import ServicingTask from "../Components/Masters/Servicing/ServicingTask";
// import LeadType from "../Components/Masters/Leads/LeadType";
// import LeadOccupation from "../Components/Masters/Leads/LeadOccupation";
// import OccupationType from "../Components/Masters/Leads/OccupationType";

// // Customer Components
// import CustomerDetail from "../Components/Customer/Client/CustomerDetail";
// import ProspectDetail from "../Components/Customer/Prospect/ProspectDetail";
// import SuspectDetail from "../Components/Customer/Suspect/SuspectDetail";
// import ClientFirstFrom from "../Components/Customer/Client/ClientFirstFrom";
// import ProspectFirstForm from "../Components/Customer/Prospect/ProspectFirstForm";
// import SuspectFirstForm from "../Components/Customer/Suspect/SuspectFirstForm";
// import ClientLeadTabs from "../Components/Customer/Client/ClientLeadTabs";
// import SuspectLeadsTabs from "../Components/Customer/Suspect/SuspectLeadTabs";
// import ProspectLeadTabs from "../Components/Customer/Prospect/ProspectLeadTabs";
// import ImportLead from "../Components/Customer/ImportLead";
// import KYCtabs from "../Components/Customer/KYC/KYCtabs";

// // Employee Components
// import EmployeeAddForm from "../Components/Employee/OfficeAdmin/EmployeeAddForm";
// import CareerEnquiry from "../Components/Employee/OfficeAdmin/CareerEnquiry";
// import ResumesShortlist from "../Components/Employee/OfficeAdmin/ResumesShortlist";
// import SelectedInterviewTable from "../Components/Employee/OfficeAdmin/SelectedInterviewTable";
// import JoiningData from "../Components/Employee/OfficeAdmin/JoiningData";
// import Kycdocument from "../Components/Masters/kycdocument/Kycdocument";
// // Office Components
// import FinancialProduct from "../Components/Offices/Financlal/FinancialProduct";
// import CompanyTabs from "../Components/Offices/Financlal/CompanyTabs";
// import RegistrarTabs from "../Components/Offices/Mutual Funds/Registrar/RegistrarTabs";
// import AMCtabs from "../Components/Offices/Mutual Funds/AMC/AMCtabs";
// import OfficeDiaryTabs from "../Components/Offices/OfficeRecord/Office Diary/OfficeDiaryTabs";
// import OfficePurchase from "../Components/Offices/Other/OfficePurchase";
// import ImpDocument from "../Components/Offices/Other/ImportantDocument/ImpDocument";
// import Registertelecaller from "../pages/telecaller/Register";
// import TelecallerPanel from "../Components/EmployeeDashboard/TelecallerDashboard/telecallerDashboard"; 
// import LoginTelecaller from "../pages/telecaller/login";
// import Registertelemarketer from "../pages/telemarketer/Register";
// import RegisterOE from "../pages/OE/Register";
// import RegisterOA from "../pages/OA/Register";
// import RegisterHR from "../pages/HR/Register";
// import LoginOE from "../pages/OE/Login";
// import LoginOA from "../pages/OA/Login";
// import LoginHR from "../pages/HR/Login";
// import LoginTelemarketer from "../pages/telemarketer/Login";
// import Login from "../pages/COMMONLOGIN/Login";
// import AddSuspect from "../Components/EmployeeDashboard/TelecallerDashboard/AddSuspect";
// import DashboardPage from "../Components/EmployeeDashboard/TelecallerDashboard/Dashboard";

// const AppRoutes = () => {



//   return (
//     <Routes>
//        <Route path="/telecaller/register" element={<Registertelecaller/>} />
//       <Route path="/telemarketer/register" element={<Registertelemarketer/>} />
//             <Route path="/OE/register" element={<RegisterOE/>} />
//         <Route path="/HR/register" element={<RegisterHR/>} />
//           <Route path="/OA/register" element={<RegisterOA/>} />
//       <Route path="/telecaller" element={<TelecallerPanel />}>
//     <Route path="dashboard" element={<DashboardPage />} />
//     <Route path="suspect/add" element={<AddSuspect />} />
//      <Route path="appointments" element={<AppointmentComponent/>} />
//   </Route>
    
//        {/* <Route path="/telecaller/dashboard" element={<TelecallerPanel/>} />  */}
//       <Route path="/" element={<Layout />}>
//         <Route index element={<DashboardCards />} />

//         {/* Masters */}
//         <Route path="/area" element={<Area />} />
//         <Route path="/sub-area" element={<SubArea />} />
//         <Route path="/city" element={<City />} />
//         <Route path="/composite" element={<Composite />} />
//           <Route path="/kycdocument" element={<Kycdocument/>} />
//         <Route path="/lead-type" element={<LeadType />} />
//         <Route path="/occupation-type" element={<OccupationType />} />
//         <Route path="/lead-occupation" element={<LeadOccupation />} />
//         <Route path="/lead-source" element={<LeadSource />} />
//         <Route path="/marketing-task" element={<MarketingTask />} />
//         <Route path="/servicing-task" element={<ServicingTask />} />

//         {/* Customer */}
//         <Route path="/client" element={<ClientLeadTabs />} />
//         <Route path="/client/:tabs" element={<ClientLeadTabs />} />
//         <Route path="/client/add" element={<ClientFirstFrom/>} />
//         <Route path="/client/edit/:id" element={<ClientFirstFrom/>} />
//         <Route path="/client/detail/:id" element={<CustomerDetail />} />


//         {/* // suspect routes  */}
//         <Route path="/suspect" element={<SuspectLeadsTabs/>} />
//         <Route path="/suspect/add" element={<SuspectFirstForm/>} />
//         <Route path="/suspect/edit/:id" element={<SuspectFirstForm/>} />
//         <Route path="/suspect/detail/:id" element={<SuspectDetail />} />


//         <Route path="/prospect" element={<ProspectLeadTabs/>} />
//         <Route path="/prospect/add" element={<ProspectFirstForm/>} />
//         <Route path="/prospect/edit/:id" element={<ProspectFirstForm/>} />
//         <Route path="/prospect/detail/:id" element={<ProspectDetail />} />
         
        

//         <Route path="/import-lead" element={<ImportLead />} />
//         <Route path="/kyc" element={<KYCtabs />} />

//         {/* Employee */}
//         <Route path="/add-employee" element={<EmployeeAddForm />} />
//         <Route path="/career-enquiry" element={<CareerEnquiry />} />
//         <Route path="/resume-shortlist" element={<ResumesShortlist />} />
//         <Route path="/interview-process" element={<SelectedInterviewTable />} />
//         <Route path="/joining-data" element={<JoiningData />} />

//         {/* Office */}
//         <Route path="/financial-product-list" element={<FinancialProduct />} />
//         <Route path="/company-name" element={<CompanyTabs />} />
//         <Route path="/mutual-fund/registrar" element={<RegistrarTabs />} />
//         <Route path="/mutual-fund/amc" element={<AMCtabs />} />
//         <Route path="/office-diary" element={<OfficeDiaryTabs />} />
//         <Route path="/office-purchase" element={<OfficePurchase />} />
//         <Route path="/important-documents" element={<ImpDocument />} />

        
  
//         <Route path="/telemarketer/login" element={<LoginTelemarketer/>} />
     
//             <Route path="/OA/login" element={<LoginOA/>} />
         
//                 <Route path="/HR/login" element={<LoginHR/>} />
//         <Route path="/telecaller/login" element={<LoginTelecaller/>} />
//    <Route path="/auth/login" element={<Login/>} />
     


//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;

























import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import DashboardCards from "../Components/Dashbord/DashboardCards";
import AppointmentComponent from "../Components/EmployeeDashboard/TelecallerDashboard/Appointment";
// Master Components
import Composite from "../Components/Masters/Composite/Composite";
import Area from "../Components/Masters/Leads/Area";
import City from "../Components/Masters/Leads/City";
import LeadSource from "../Components/Masters/Leads/LeadSource";
import SubArea from "../Components/Masters/Leads/SubArea";
import MarketingTask from "../Components/Masters/Marketing/MarketingTask";
import ServicingTask from "../Components/Masters/Servicing/ServicingTask";
import LeadType from "../Components/Masters/Leads/LeadType";
import LeadOccupation from "../Components/Masters/Leads/LeadOccupation";
import OccupationType from "../Components/Masters/Leads/OccupationType";

// Customer Components
import CustomerDetail from "../Components/Customer/Client/CustomerDetail";
import ProspectDetail from "../Components/Customer/Prospect/ProspectDetail";
import SuspectDetail from "../Components/Customer/Suspect/SuspectDetail";
import ClientFirstFrom from "../Components/Customer/Client/ClientFirstFrom";
import ProspectFirstForm from "../Components/Customer/Prospect/ProspectFirstForm";
import SuspectFirstForm from "../Components/Customer/Suspect/SuspectFirstForm";
import ClientLeadTabs from "../Components/Customer/Client/ClientLeadTabs";
import SuspectLeadsTabs from "../Components/Customer/Suspect/SuspectLeadTabs";
import ProspectLeadTabs from "../Components/Customer/Prospect/ProspectLeadTabs";
import ImportLead from "../Components/Customer/ImportLead";
import KYCtabs from "../Components/Customer/KYC/KYCtabs";

// Employee Components
import EmployeeAddForm from "../Components/Employee/OfficeAdmin/EmployeeAddForm";
import CareerEnquiry from "../Components/Employee/OfficeAdmin/CareerEnquiry";
import ResumesShortlist from "../Components/Employee/OfficeAdmin/ResumesShortlist";
import SelectedInterviewTable from "../Components/Employee/OfficeAdmin/SelectedInterviewTable";
import JoiningData from "../Components/Employee/OfficeAdmin/JoiningData";
import Kycdocument from "../Components/Masters/kycdocument/Kycdocument";
// Office Components
import FinancialProduct from "../Components/Offices/Financlal/FinancialProduct";
import CompanyTabs from "../Components/Offices/Financlal/CompanyTabs";
import RegistrarTabs from "../Components/Offices/Mutual Funds/Registrar/RegistrarTabs";
import AMCtabs from "../Components/Offices/Mutual Funds/AMC/AMCtabs";
import OfficeDiaryTabs from "../Components/Offices/OfficeRecord/Office Diary/OfficeDiaryTabs";
import OfficePurchase from "../Components/Offices/Other/OfficePurchase";
import ImpDocument from "../Components/Offices/Other/ImportantDocument/ImpDocument";
import Registertelecaller from "../pages/telecaller/Register";
import TelecallerPanel from "../Components/EmployeeDashboard/TelecallerDashboard/telecallerDashboard"; 
import LoginTelecaller from "../pages/telecaller/login";
import Registertelemarketer from "../pages/telemarketer/Register";
import RegisterOE from "../pages/OE/Register";
import RegisterOA from "../pages/OA/Register";
import RegisterHR from "../pages/HR/Register";
import LoginOE from "../pages/OE/Login";
import LoginOA from "../pages/OA/Login";
import LoginHR from "../pages/HR/Login";
import LoginTelemarketer from "../pages/telemarketer/Login";
import Login from "../pages/COMMONLOGIN/Login";
import AddSuspect from "../Components/EmployeeDashboard/TelecallerDashboard/AddSuspect";
import DashboardPage from "../Components/EmployeeDashboard/TelecallerDashboard/Dashboard";

// 🔒 ProtectedRoute Component (Strict Role Check)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.role;

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌍 Public Routes ONLY - Register & Login */}
      <Route path="/telecaller/register" element={<Registertelecaller/>} />
      <Route path="/telemarketer/register" element={<Registertelemarketer/>} />
      <Route path="/OE/register" element={<RegisterOE/>} />
      <Route path="/HR/register" element={<RegisterHR/>} />
      <Route path="/OA/register" element={<RegisterOA/>} />
      <Route path="/telemarketer/login" element={<LoginTelemarketer/>} />
      <Route path="/OA/login" element={<LoginOA/>} />
      <Route path="/HR/login" element={<LoginHR/>} />
      <Route path="/telecaller/login" element={<LoginTelecaller/>} />
      <Route path="/OE/login" element={<LoginOE/>} />
      <Route path="/auth/login" element={<Login/>} />

      {/* 📞 TELECALLER - Only Telecaller Routes */}
      <Route 
        path="/telecaller" 
        element={
          <ProtectedRoute allowedRoles={["Telecaller"]}>
            <TelecallerPanel />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="suspect/add" element={<AddSuspect />} />
        <Route path="appointments" element={<AppointmentComponent/>} />
      </Route>

      {/* 🏢 OA (Office Admin) - Only OA can access Layout & all other routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute allowedRoles={["OA"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardCards />} />

        {/* Masters - Only OA */}
        <Route path="/area" element={<Area />} />
        <Route path="/sub-area" element={<SubArea />} />
        <Route path="/city" element={<City />} />
        <Route path="/composite" element={<Composite />} />
        <Route path="/kycdocument" element={<Kycdocument/>} />
        <Route path="/lead-type" element={<LeadType />} />
        <Route path="/occupation-type" element={<OccupationType />} />
        <Route path="/lead-occupation" element={<LeadOccupation />} />
        <Route path="/lead-source" element={<LeadSource />} />
        <Route path="/marketing-task" element={<MarketingTask />} />
        <Route path="/servicing-task" element={<ServicingTask />} />

        {/* Customer - Only OA */}
        <Route path="/client" element={<ClientLeadTabs />} />
        <Route path="/client/:tabs" element={<ClientLeadTabs />} />
        <Route path="/client/add" element={<ClientFirstFrom/>} />
        <Route path="/client/edit/:id" element={<ClientFirstFrom/>} />
        <Route path="/client/detail/:id" element={<CustomerDetail />} />

        <Route path="/suspect" element={<SuspectLeadsTabs/>} />
        <Route path="/suspect/add" element={<SuspectFirstForm/>} />
        <Route path="/suspect/edit/:id" element={<SuspectFirstForm/>} />
        <Route path="/suspect/detail/:id" element={<SuspectDetail />} />

        <Route path="/prospect" element={<ProspectLeadTabs/>} />
        <Route path="/prospect/add" element={<ProspectFirstForm/>} />
        <Route path="/prospect/edit/:id" element={<ProspectFirstForm/>} />
        <Route path="/prospect/detail/:id" element={<ProspectDetail />} />

        <Route path="/import-lead" element={<ImportLead />} />
        <Route path="/kyc" element={<KYCtabs />} />

        {/* Employee - Only OA */}
        <Route path="/add-employee" element={<EmployeeAddForm />} />
        <Route path="/career-enquiry" element={<CareerEnquiry />} />
        <Route path="/resume-shortlist" element={<ResumesShortlist />} />
        <Route path="/interview-process" element={<SelectedInterviewTable />} />
        <Route path="/joining-data" element={<JoiningData />} />

        {/* Office - Only OA */}
        <Route path="/financial-product-list" element={<FinancialProduct />} />
        <Route path="/company-name" element={<CompanyTabs />} />
        <Route path="/mutual-fund/registrar" element={<RegistrarTabs />} />
        <Route path="/mutual-fund/amc" element={<AMCtabs />} />
        <Route path="/office-diary" element={<OfficeDiaryTabs />} />
        <Route path="/office-purchase" element={<OfficePurchase />} />
        <Route path="/important-documents" element={<ImpDocument />} />
      </Route>

      {/* 👥 HR - Only HR specific routes (if any) can be added here */}
      {/* 🔧 OE - Only OE specific routes (if any) can be added here */}
      {/* 📈 Telemarketer - Only Telemarketer specific routes (if any) can be added here */}

    </Routes>
  );
};

export default AppRoutes;