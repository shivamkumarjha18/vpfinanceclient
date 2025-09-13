import { configureStore } from "@reduxjs/toolkit";
import leadSourceReducer from "./feature/LeadSource/LeadSourceSlice";
import LeadOccupationReducer from "./feature/LeadOccupation/OccupationSlice";
import LeadAreaReducer from "./feature/LeadArea/AreaSlice";
import LeadSubAreaReducer from "./feature/LeadSubArea/SubAreaSlice";
import compositeTaskReducer from "./feature/CompositeTask/CompositeSlice";
import MarketingTaskReducer from "./feature/MarketingTask/MarketingSlice";
import ServiceTaskReducer from "./feature/ServiceTask/ServiceSlice";
import FinancialProductReducer from "./feature/FinancialProduct/FinancialSlice";
import CompanyNameReducer from "./feature/ComapnyName/CompanySlice";
import suspectReducer from "./feature/SuspectRedux/SuspectSlice";
import prospectReducer from "./feature/ProspectRedux/ProspectSlice";
import registrarReducer from "./feature/Registrar/RegistrarSlice";
import AMCReducer from "./feature/AMC/AMCSlice";
import LeadTypeReducer from "./feature/LeadType/LeadTypeSlice";
import OccupationTypeReducer from "./feature/OccupationType/OccupationSlice";
import officeDiaryReducer from "./feature/OfficeDiary/OfficeDiarySlice";
import officePurchaseReducer from "./feature/OfficePurchase/PurchaseSlice";
import importantDocumentsReducer from "./feature/ImpDocument/DocumentSlice";
import LeadCityReducer from "./feature/LeadCity/CitySlice";
import clientReducer from "./feature/ClientRedux/ClientSlice";
import KycReducer from "./feature/ClientRedux/KycSlice";
import documentSliceReducer from "./feature/kycdocument/documentslice"


export const store = configureStore({
  reducer: {
    leadsource: leadSourceReducer,
    leadOccupation: LeadOccupationReducer,
    OccupationType: OccupationTypeReducer,
    client: clientReducer,
    Kyc : KycReducer,
    leadArea: LeadAreaReducer,
    leadSubArea: LeadSubAreaReducer,
    leadCity: LeadCityReducer,
    compositeTask: compositeTaskReducer,
    MarketingTask: MarketingTaskReducer,
    ServiceTask: ServiceTaskReducer,
    financialProduct: FinancialProductReducer,
    CompanyName: CompanyNameReducer,
    suspect: suspectReducer,
    prospect: prospectReducer,
    registrar: registrarReducer,
    AMC: AMCReducer,
    LeadType: LeadTypeReducer,
    officeDiary: officeDiaryReducer,
    officePurchase: officePurchaseReducer,
    importantDocuments: importantDocumentsReducer,
    kycdoc:documentSliceReducer
  },
});
