import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import DashboardCards from "../Components/Dashbord/DashboardCards";

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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardCards />} />

        {/* Masters */}
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

        {/* Customer */}
        <Route path="/client" element={<ClientLeadTabs />} />
        <Route path="/client/:tabs" element={<ClientLeadTabs />} />
        <Route path="/client/add" element={<ClientFirstFrom/>} />
        <Route path="/client/edit/:id" element={<ClientFirstFrom/>} />
        <Route path="/client/detail/:id" element={<CustomerDetail />} />


        {/* // suspect routes  */}
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

        {/* Employee */}
        <Route path="/add-employee" element={<EmployeeAddForm />} />
        <Route path="/career-enquiry" element={<CareerEnquiry />} />
        <Route path="/resume-shortlist" element={<ResumesShortlist />} />
        <Route path="/interview-process" element={<SelectedInterviewTable />} />
        <Route path="/joining-data" element={<JoiningData />} />

        {/* Office */}
        <Route path="/financial-product-list" element={<FinancialProduct />} />
        <Route path="/company-name" element={<CompanyTabs />} />
        <Route path="/mutual-fund/registrar" element={<RegistrarTabs />} />
        <Route path="/mutual-fund/amc" element={<AMCtabs />} />
        <Route path="/office-diary" element={<OfficeDiaryTabs />} />
        <Route path="/office-purchase" element={<OfficePurchase />} />
        <Route path="/important-documents" element={<ImpDocument />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
