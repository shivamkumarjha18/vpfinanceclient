// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Form, Row, Col, Button } from "react-bootstrap";
// import { addFuturePrioritiesAndNeeds } from "../../../redux/feature/ClientRedux/ClientThunx";
// import { toast } from "react-toastify";

// const futurePriorityOptions = [
//   ["Life Insurance", "Health Insurance", "Retirement Fund", "Wealth Creation"],
//   [
//     "Child Higher Education",
//     "Child Professional Education",
//     "Child Marriage",
//     "Property Investment",
//   ],
//   [
//     "Purchase House",
//     "Purchase Car",
//     "Business Fund Creation",
//     "Business Expansion",
//   ],
// ];

// const FuturePrioritiesForm = ({ clientId, clientData, onClientCreated }) => {
//   const dispatch = useDispatch();
//   const [futurePriorities, setFuturePriorities] = useState([]);
//   const [futurePriorityForms, setFuturePriorityForms] = useState({});
//   const [savedFuturePriorityForms, setSavedFuturePriorityForms] = useState({});
//   const [needs, setNeeds] = useState({
//     createdDate: new Date(),
//     memberName: "",
//     financialProduct: "",
//     financialCompany: "",
//     planName: "",
//     documents: [],
//     financialCalculation: false,
//     assesmentOfNeed: false,
//     portfolioManagement: false,
//     doorStepServices: false,
//     purchaseNewProducts: false,
//     anyCorrection: "",
//     anyUpdation: "",
//   });

//   const [familyMembers, setFamilyMembers] = useState([]);

//   useEffect(() => {
//     const fetchClientData = async () => {
//       try {
//         const response = await fetch(`https://vpfinance2.onrender.com/api/client/${clientId}`);
//         const result = await response.json();
//         if (result.success) {
//           setFamilyMembers(result.client.familyMembers || []);
//         } else {
//           console.error("Failed to fetch client data:", result.message);
//         }
//       } catch (error) {
//         console.error("Error fetching client data:", error);
//       }
//     };
//     fetchClientData();
//   }, [clientId]);

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setNeeds((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNeeds((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFuturePriorityChange = (e) => {
//     const { value, checked } = e.target;
//     setFuturePriorities((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleFormChange = (priority, field, value) => {
//     setFuturePriorityForms((prev) => ({
//       ...prev,
//       [priority]: {
//         ...prev[priority],
//         [field]: field === "approxAmount" ? parseFloat(value) : value,
//         members:
//           field === "members"
//             ? value.split(",").map((item) => item.trim())
//             : prev[priority]?.members,
//       },
//     }));
//   };

//   const handleSaveForm = (priority) => {
//     const formData = futurePriorityForms[priority];

//     if (
//       !formData?.priorityName ||
//       !formData?.members ||
//       !formData?.approxAmount ||
//       !formData?.duration
//     ) {
//       toast.error("Please complete all required fields before saving.");
//       return;
//     }

//     // Add submissionDate here
//     const formWithDate = {
//       ...formData,
//       submissionDate: new Date().toISOString(),
//     };

//     // Save to saved forms
//     setSavedFuturePriorityForms((prev) => ({
//       ...prev,
//       [priority]: formWithDate,
//     }));

//     // Clear current form
//     setFuturePriorityForms((prev) => {
//       const newForms = { ...prev };
//       delete newForms[priority];
//       return newForms;
//     });

//     // Close the form UI
//     setFuturePriorities((prev) => prev.filter((p) => p !== priority));
//     toast.success(`${priority} saved.`);
//   };

//   const handleCloseForm = (priority) => {
//     setFuturePriorityForms((prev) => {
//       const newForms = { ...prev };
//       delete newForms[priority];
//       return newForms;
//     });
//     setFuturePriorities((prev) => prev.filter((p) => p !== priority));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const aggregatedFuturePriorities = Object.entries(savedFuturePriorityForms).map(
//       ([priority, data]) => ({
//         priorityName: data?.priorityName || "",
//         members: data?.members || [],
//         approxAmount: data?.approxAmount || 0,
//         duration: data?.duration || "",
//         remark: data?.remark || "",
//         submissionDate: data?.submissionDate || new Date().toISOString(), // ✅ ensure submissionDate
//       })
//     );

//     const idToUse = clientData && clientData._id || clientId;

//     const result = await dispatch(
//       addFuturePrioritiesAndNeeds({
//         clientId: idToUse,
//         futurePriorities: aggregatedFuturePriorities,
//         needs: {
//           ...needs,
//           createdDate: new Date(), // ensure date in needs as well
//         },
//       })
//     );

//     if (result) {
//       const clientIdFromRedux = result?.payload;
//       if (onClientCreated && clientIdFromRedux) onClientCreated(clientIdFromRedux);

//       setFuturePriorities([]);
//       setFuturePriorityForms({});
//       setSavedFuturePriorityForms({});
//       setNeeds({
//         createdDate: new Date(),
//         memberName: "",
//         financialProduct: "",
//         financialCompany: "",
//         planName: "",
//         documents: [],
//         financialCalculation: false,
//         assesmentOfNeed: false,
//         portfolioManagement: false,
//         doorStepServices: false,
//         purchaseNewProducts: false,
//         anyCorrection: "",
//         anyUpdation: "",
//       });

//       toast.info("Future Priorities Added Successfully.");
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Row className="mb-3">
//         {futurePriorityOptions.map((column, colIdx) => (
//           <Col md={4} key={colIdx}>
//             {column.map((option) => (
//               <Form.Check
//                 key={option}
//                 type="checkbox"
//                 label={option}
//                 value={option}
//                 checked={futurePriorities.includes(option)}
//                 onChange={handleFuturePriorityChange}
//               />
//             ))}
//           </Col>
//         ))}
//       </Row>

//       {futurePriorities.map((priority) => (
//         <div key={priority} className="border p-3 mb-3">
//           <h5 className="text-info">{priority} Form</h5>
//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Priority Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={futurePriorityForms[priority]?.priorityName || ""}
//                   onChange={(e) =>
//                     handleFormChange(priority, "priorityName", e.target.value)
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Select
//                 name="members"
//                 value={futurePriorityForms[priority]?.members || ""}
//                 onChange={(e) => handleFormChange(priority, "members", e.target.value)}
//                 required
//               >
//                 <option value="" disabled>
//                   Select Member
//                 </option>
//                 {familyMembers.map((member) => (
//                   <option key={member._id} value={member.name}>
//                     {member.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Col>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Approx Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={futurePriorityForms[priority]?.approxAmount || ""}
//                   onChange={(e) =>
//                     handleFormChange(priority, "approxAmount", e.target.value)
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Duration</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={futurePriorityForms[priority]?.duration || ""}
//                   onChange={(e) =>
//                     handleFormChange(priority, "duration", e.target.value)
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Remark</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={futurePriorityForms[priority]?.remark || ""}
//                   onChange={(e) =>
//                     handleFormChange(priority, "remark", e.target.value)
//                   }
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Button variant="primary" className="me-2" onClick={() => handleSaveForm(priority)}>
//             Save
//           </Button>
//           <Button variant="secondary" onClick={() => handleCloseForm(priority)}>
//             Close
//           </Button>
//         </div>
//       ))}

//       <Row className="mb-3">
//         <Col md={12}>
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Financial Calculation"
//             name="financialCalculation"
//             checked={needs.financialCalculation}
//             onChange={handleCheckboxChange}
//           />
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Assessment of Need"
//             name="assesmentOfNeed"
//             checked={needs.assesmentOfNeed}
//             onChange={handleCheckboxChange}
//           />
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Portfolio Management"
//             name="portfolioManagement"
//             checked={needs.portfolioManagement}
//             onChange={handleCheckboxChange}
//           />
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Door Step Services"
//             name="doorStepServices"
//             checked={needs.doorStepServices}
//             onChange={handleCheckboxChange}
//           />
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Purchase New Products"
//             name="purchaseNewProducts"
//             checked={needs.purchaseNewProducts}
//             onChange={handleCheckboxChange}
//           />
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={4}>
//           <Form.Group controlId="financialProduct">
//             <Form.Label>Financial Products</Form.Label>
//             <Form.Control
//               type="text"
//               name="financialProduct"
//               value={needs.financialProduct}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={4}>
//           <Form.Group controlId="anyCorrection">
//             <Form.Label>Any Correction</Form.Label>
//             <Form.Control
//               type="text"
//               name="anyCorrection"
//               value={needs.anyCorrection}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={4}>
//           <Form.Group controlId="anyUpdation">
//             <Form.Label>Any Updation</Form.Label>
//             <Form.Control
//               type="text"
//               name="anyUpdation"
//               value={needs.anyUpdation}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Button type="submit" className="btn btn-primary">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default FuturePrioritiesForm;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addFuturePrioritiesAndNeeds, updateFuturePrioritiesAndNeeds } from "../../../redux/feature/ClientRedux/ClientThunx";
import { toast } from "react-toastify";

const FUTURE_PRIORITY_OPTIONS = [
  ["Life Insurance", "Health Insurance", "Retirement Fund", "Wealth Creation"],
  ["Child Higher Education", "Child Professional Education", "Child Marriage", "Property Investment"],
  ["Purchase House", "Purchase Car", "Business Fund Creation", "Business Expansion"],
];

const initialFuturePriorityForm = {
  _id: null,
  priorityName: "",
  submissionDate: "",
  members: [],
  approxAmount: "",
  duration: "",
  remark: "",
  documents: [],
};

const initialNeeds = {
  createdDate: new Date().toISOString(),
  memberName: "",
  financialProduct: "",
  financialCompany: "",
  planName: "",
  documents: [],
  financialCalculation: false,
  assesmentOfNeed: false,
  portfolioManagement: false,
  doorStepServices: false,
  purchaseNewProducts: false,
  anyCorrection: "",
  anyUpdation: "",
};

const FuturePrioritiesForm = ({ clientId, clientData, onClientCreated }) => {
  const dispatch = useDispatch();
  const { futurePrioritiesAndNeeds, loading, error } = useSelector((state) => state.client || {});

  const [openPriorities, setOpenPriorities] = useState([]);
  const [futurePriorityForms, setFuturePriorityForms] = useState({});
  const [savedFuturePriorityForms, setSavedFuturePriorityForms] = useState([]);
  const [needs, setNeeds] = useState(initialNeeds);
  const [priorityFiles, setPriorityFiles] = useState({});
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (!clientId) return;
        const response = await fetch(`https://vpfinance2.onrender.com/api/client/${clientId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (result.success) {
          setFamilyMembers(result.client.familyMembers || []);
          if (result.client.futurePrioritiesAndNeeds) {
            setSavedFuturePriorityForms(result.client.futurePrioritiesAndNeeds.priorities || []);
            setNeeds({
              ...initialNeeds,
              ...result.client.futurePrioritiesAndNeeds.needs,
              createdDate: result.client.futurePrioritiesAndNeeds.needs?.createdDate || new Date().toISOString(),
            });
          }
        } else {
          toast.error(result.message || "Failed to load client data.");
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
        toast.error("Error loading client data. Check your network.");
      }
    };

    fetchClientData();
  }, [clientId]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleCheckboxChange = (option, existingData = null) => {
    setOpenPriorities((prev) =>
      prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]
    );
    setFuturePriorityForms((prev) => ({
      ...prev,
      [option]: existingData || { ...initialFuturePriorityForm, priorityName: option, submissionDate: getCurrentDate() },
    }));
  };

  const handleFormChange = (priority, field, value) => {
    setFuturePriorityForms((prev) => ({
      ...prev,
      [priority]: {
        ...prev[priority],
        [field]: field === "approxAmount" ? parseFloat(value) || "" : field === "members" ? value : value,
      },
    }));
  };

  const handleFileChange = (priority, files) => {
    setPriorityFiles((prev) => ({
      ...prev,
      [priority]: files ? Array.from(files) : [],
    }));
  };

  const handleSaveForm = (priority) => {
    const formData = futurePriorityForms[priority];
    if (!formData?.priorityName || !formData?.members?.length || !formData?.approxAmount || !formData?.duration) {
      toast.error("Please complete all required fields before saving.");
      return;
    }

    setSavedFuturePriorityForms((prev) => {
      const existingIndex = prev.findIndex((item) => item._id === formData._id);
      if (existingIndex >= 0) {
        const updatedForms = [...prev];
        updatedForms[existingIndex] = { ...formData, submissionDate: formData.submissionDate || getCurrentDate() };
        return updatedForms;
      }
      return [...prev, { ...formData, submissionDate: formData.submissionDate || getCurrentDate() }];
    });

    setOpenPriorities((prev) => prev.filter((v) => v !== priority));
    setFuturePriorityForms((prev) => {
      const copy = { ...prev };
      delete copy[priority];
      return copy;
    });
    setPriorityFiles((prev) => {
      const copy = { ...prev };
      delete copy[priority];
      return copy;
    });

    toast.success(`${priority} saved.`);
  };

  const handleCloseForm = (priority) => {
    setOpenPriorities((prev) => prev.filter((v) => v !== priority));
    setFuturePriorityForms((prev) => {
      const copy = { ...prev };
      delete copy[priority];
      return copy;
    });
    setPriorityFiles((prev) => {
      const copy = { ...prev };
      delete copy[priority];
      return copy;
    });
  };

  const handleNeedsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNeeds((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e, isUpdate = false) => {
  e.preventDefault();

  try {
    const idToUse = clientData?._id || clientId;
    if (!idToUse) {
      toast.error("Client ID is missing.");
      return;
    }

    // 👇 yaha direct futurePriorities aur needs send karna hai
    const payload = {
      clientId: idToUse,
      futurePriorities: savedFuturePriorityForms,
      needs: { ...needs, createdDate: new Date().toISOString() },
    };

    const action = isUpdate
      ? await dispatch(updateFuturePrioritiesAndNeeds(payload))
      : await dispatch(addFuturePrioritiesAndNeeds(payload));

    if (
      isUpdate
        ? updateFuturePrioritiesAndNeeds.fulfilled.match(action)
        : addFuturePrioritiesAndNeeds.fulfilled.match(action)
    ) {
      setSavedFuturePriorityForms([]);
      setPriorityFiles({});
      setNeeds(initialNeeds);
      toast.success(
        action.payload.message || "Future Priorities saved successfully."
      );
      if (!isUpdate && onClientCreated && action.payload.clientId) {
        onClientCreated(action.payload.clientId);
      }
    } else {
      toast.error(action.payload || "Failed to save future priorities.");
    }
  } catch (error) {
    console.error(
      `Error ${isUpdate ? "updating" : "adding"} future priorities:`,
      error
    );
    toast.error(
      `Failed to ${isUpdate ? "update" : "add"} future priorities. Please try again.`
    );
  }
};


  const handleEditForm = (item) => {
    handleCheckboxChange(item.priorityName, { ...item, documents: [] });
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e, false)}>
      <Row className="mb-3">
        {FUTURE_PRIORITY_OPTIONS.map((column, colIdx) => (
          <Col md={4} key={colIdx}>
            <Form.Group>
              <Form.Label>Future Priorities</Form.Label>
              {column.map((option) => (
                <Form.Check
                  key={option}
                  type="checkbox"
                  label={option}
                  value={option}
                  checked={openPriorities.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
              ))}
            </Form.Group>
          </Col>
        ))}
      </Row>

      <h6 className="mt-3">Saved Future Priorities</h6>
      {savedFuturePriorityForms.map((item, index) => (
        <div key={index} className="border p-2 mb-2">
          <p>{item.priorityName} - {item.members.join(", ")} - {item.approxAmount}</p>
          <Button size="sm" onClick={() => handleEditForm(item)}>
            Edit
          </Button>
        </div>
      ))}

      {openPriorities.map((priority) => (
        <div key={priority} className="border p-3 mb-3">
          <h5 className="text-info">{priority} Form</h5>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Submission Date</Form.Label>
                <Form.Control
                  type="date"
                  value={futurePriorityForms[priority]?.submissionDate || getCurrentDate()}
                  onChange={(e) => handleFormChange(priority, "submissionDate", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Members</Form.Label>
                <Form.Select
                  multiple
                  value={futurePriorityForms[priority]?.members || []}
                  onChange={(e) =>
                    handleFormChange(priority, "members", Array.from(e.target.selectedOptions, (option) => option.value))
                  }
                  required
                >
                  {familyMembers.map((member) => (
                    <option key={member._id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Approx Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={futurePriorityForms[priority]?.approxAmount || ""}
                  onChange={(e) => handleFormChange(priority, "approxAmount", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  value={futurePriorityForms[priority]?.duration || ""}
                  onChange={(e) => handleFormChange(priority, "duration", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  type="text"
                  value={futurePriorityForms[priority]?.remark || ""}
                  onChange={(e) => handleFormChange(priority, "remark", e.target.value)}
                />
              </Form.Group>
            </Col>
            {/* Uncomment to enable file uploads for priorities
            <Col md={4}>
              <Form.Group>
                <Form.Label>Upload Documents (up to 10)</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/gif,image/avif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain"
                  onChange={(e) => handleFileChange(priority, e.target.files)}
                />
              </Form.Group>
            </Col>
            */}
          </Row>
          <Button variant="primary" className="me-2 mt-2" onClick={() => handleSaveForm(priority)}>
            Save
          </Button>
          <Button variant="secondary" className="mt-2" onClick={() => handleCloseForm(priority)}>
            Close
          </Button>
        </div>
      ))}

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Needs</Form.Label>
            <Form.Check
              inline
              type="checkbox"
              label="Financial Calculation"
              name="financialCalculation"
              checked={needs.financialCalculation}
              onChange={handleNeedsChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Assessment of Need"
              name="assesmentOfNeed"
              checked={needs.assesmentOfNeed}
              onChange={handleNeedsChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Portfolio Management"
              name="portfolioManagement"
              checked={needs.portfolioManagement}
              onChange={handleNeedsChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Door Step Services"
              name="doorStepServices"
              checked={needs.doorStepServices}
              onChange={handleNeedsChange}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Purchase New Products"
              name="purchaseNewProducts"
              checked={needs.purchaseNewProducts}
              onChange={handleNeedsChange}
            />
          </Form.Group>
        </Col>
      </Row>


      <Button type="submit" className="btn btn-primary mt-3 me-2">
        Add Future Priorities
      </Button>
      <Button
        type="button"
        className="btn btn-primary mt-3"
        onClick={(e) => handleSubmit(e, true)}
      >
        Update Future Priorities
      </Button>
    </Form>
  );
};

export default FuturePrioritiesForm;