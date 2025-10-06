// ClientForm.js (Parent)
import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import PersonalDetailsForm from "./PersonalDetailsForm";
import FamilyMembersForm from "./FamilyMembersForm";
// ... other imports

// ClientForm.js (Parent)
const ClientForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [createdClientId, setCreatedClientId] = useState(null);
  
  const [globalFormData, setGlobalFormData] = useState({
    personalDetails: { /* initial state */ },
    // ... other tabs
  });

  // ✅ Client create success handler
  const handleClientCreated = async (clientId) => {
    setCreatedClientId(clientId);
    
    // ✅ Client data fetch karke globalFormData me store karo
    try {
      const response = await fetch(`http://localhost:8080/api/client/${clientId}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setGlobalFormData(prev => ({
          ...prev,
          personalDetails: { ...prev.personalDetails, ...result.data.personalDetails },
          // family details bhi pre-load kar sakte ho agar available ho
        }));
        
        toast.success("Client data loaded and ready for editing!");
      }
    } catch (error) {
      console.error("Error loading client data:", error);
    }
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onSelect={setActiveTab}>
        <Tab eventKey="personal" title="Personal Details">
          <PersonalDetailsForm 
            formData={globalFormData.personalDetails}
            updateFormData={updatePersonalDetails}
            changeTab={setActiveTab}
            onClientCreated={handleClientCreated}  // ✅ Pass handler
            isEdit={!!createdClientId}  // ✅ Edit mode enable after creation
            clientData={{ _id: createdClientId, personalDetails: globalFormData.personalDetails }}
          />
        </Tab>
        
        <Tab eventKey="family" title="Add Family Details">
          <FamilyMembersForm 
            formData={globalFormData.familyDetails}
            updateFormData={(data) => 
              setGlobalFormData(prev => ({
                ...prev, 
                familyDetails: { ...prev.familyDetails, ...data }
              }))
            }
            clientId={createdClientId}  // ✅ Client ID pass karo
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ClientForm;