import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { createSuspect, updateSuspectPersonalDetails } from "../../../redux/feature/SuspectRedux/SuspectThunx";
import { fetchDetails } from "../../../redux/feature/LeadSource/LeadThunx";
import { getAllOccupations } from "../../../redux/feature/LeadOccupation/OccupationThunx";
import { getAllOccupationTypes } from "../../../redux/feature/OccupationType/OccupationThunx";
import { fetchLeadType } from "../../../redux/feature/LeadType/LeadTypeThunx";
import { toast } from "react-toastify";
import { Tabs, Tab } from "react-bootstrap";
// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const incomeOptions = [
  { value: "25 lakh to 1 Cr.", label: "25 lakh to 1 Cr." },
  { value: "5 to 25 lakh", label: "5 to 25 lakh" },
  { value: "2.5 to 5 lakh", label: "2.5 to 5 lakh" },
];

const gradeMap = {
  "25 lakh to 1 Cr.": 1,
  "5 to 25 lakh": 2,
  "2.5 to 5 lakh": 3,
};

const AddSuspect  = ({ isEdit, suspectData, onSuspectCreated }) => {
  const dispatch = useDispatch();
   const initialFormState = {
    salutation: "",
    groupName: "",
    gender: "",
    organisation: "",
    designation: "",
    mobileNo: "",
    contactNo: "",
    whatsappNo: "",
    emailId: "",
    paName: "",
    paMobileNo: "",
    annualIncome: "",
    grade: "",
    preferredAddressType: "resi",
    resiAddr: "",
    resiLandmark: "",
    resiPincode: "",
    officeAddr: "",
    officeLandmark: "",
    officePincode: "",
    preferredMeetingAddr: "",
    preferredMeetingArea: "",
    city: "",
    bestTime: "",
    adharNumber: "",
    panCardNumber: "",
    hobbies: "",
    nativePlace: "",
    socialLink: "",
    habits: "",
    leadSource: "",
    leadName: "",
    leadOccupation: "",
    leadOccupationType: "",
    callingPurpose: "",
    name: "",
    allocatedCRE: "",
    remark: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const { leadsourceDetail } = useSelector((state) => state.leadsource);
  const { alldetails } = useSelector((state) => state.leadOccupation);
  const { alldetailsForTypes } = useSelector((state) => state.OccupationType);
    const { LeadType: leadTypes, loading } = useSelector((state) => state.LeadType);
   const [occupationTypes, setOccupationTypes] = useState([])
   const [occupations, setOccupations] = useState([]);
const [whatsappEdited, setWhatsappEdited] = useState(false);

  useEffect(() => {
    dispatch(fetchLeadType());
  }, [dispatch]);

    useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  const handleMobileWhatsappChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    let updated = { ...prev, [name]: value };

    // ✅ agar mobileNo complete ho (10 digit for example) aur whatsapp edit nahi hua ho
    if (name === "mobileNo" && value.length === 10 && !whatsappEdited  ) {
      updated.whatsappNo = value;
   
    }

    return updated;
  });

  if (name === "whatsappNo") {
    setWhatsappEdited(true);
  }

};

useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const response = await fetch("https://vpfinance2.onrender.com/api/occupation");
        const result = await response.json();
        if (result.success) {
          setOccupations(result.data); // API se aaya data store karo
        } else {
          console.error("Failed to fetch occupations:", result.message);
        }
      } catch (error) {
        console.error("Error fetching occupations:", error);
      }
    };
    fetchOccupations();
  }, []);



  useEffect(() => {
    const fetchOccupationTypes = async () => {
      try {
        const response = await fetch("https://vpfinance2.onrender.com/api/occupation/types");
        const result = await response.json();
        if (result.success) {
          setOccupationTypes(result.data); // API se aaya data store karo
        } else {
          console.error("Failed to fetch occupation types:", result.message);
        }
      } catch (error) {
        console.error("Error fetching occupation types:", error);
      }
    };
    fetchOccupationTypes();
  }, []);
  useEffect(() => {
    dispatch(fetchDetails());
    dispatch(getAllOccupationTypes());
    dispatch(getAllOccupations());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit && suspectData) {
      setFormData(suspectData.personalDetails);
    } else {
      setFormData(initialFormState);
    }
  }, [isEdit, suspectData]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      grade: gradeMap[prev.annualIncome] || "",
    }));
  }, [formData.annualIncome]);

  useEffect(() => {
    if (formData.preferredAddressType === "resi") {
      setFormData((prev) => ({
        ...prev,
        preferredMeetingAddr: prev.resiAddr,
      }));
    } else if (formData.preferredAddressType === "office") {
      setFormData((prev) => ({
        ...prev,
        preferredMeetingAddr: prev.officeAddr,
      }));
    }
  }, [formData.preferredAddressType, formData.resiAddr, formData.officeAddr]);

  

  const fetchAreaData = async (pincode) => {
    try {
      const response = await fetch(`https://vpfinance2.onrender.com/api/leadarea?pincode=${pincode}`);
      const data = await response.json();
      console.log("API Response:", data);

      if (data && Array.isArray(data)) {
        const area = data.find((item) => String(item.pincode) === String(pincode));
        return area || { name: "Area not found", city: "" };
      } else {
        return { name: "No data received", city: "" };
      }
    } catch (error) {
      console.error("Error fetching area data:", error);
      return { name: "Error fetching area", city: "" };
    }
  };


 useEffect(() => {
    const updatePreferredData = async () => {
      if (formData.preferredAddressType === "resi" && formData.resiPincode.length === 6) {
        const areaData = await fetchAreaData(formData.resiPincode);
        setFormData((prev) => ({
          ...prev,
          preferredMeetingAddr: prev.resiAddr,
          preferredMeetingArea: areaData.name,
          city: areaData.city,
        }));
      } else if (formData.preferredAddressType === "office" && formData.officePincode.length === 6) {
        const areaData = await fetchAreaData(formData.officePincode);
        setFormData((prev) => ({
          ...prev,
          preferredMeetingAddr: prev.officeAddr,
          preferredMeetingArea: areaData.name,
          city: areaData.city,
        }));
      }
    };
    updatePreferredData();
  }, [formData.preferredAddressType, formData.resiPincode, formData.officePincode, formData.resiAddr, formData.officeAddr]);

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if ((name === "resiPincode" || name === "officePincode") && value.length === 6) {
      fetchAreaData(value).then((areaData) => {
        if (name === "resiPincode" && formData.preferredAddressType === "resi") {
          setFormData((prev) => ({
            ...prev,
            preferredMeetingArea: areaData.name,
            city: areaData.city,
          }));
        } else if (name === "officePincode" && formData.preferredAddressType === "office") {
          setFormData((prev) => ({
            ...prev,
            preferredMeetingArea: areaData.name,
            city: areaData.city,
          }));
        }
      });
    }
  };

  const handleAddressTypeChange = (type) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        preferredAddressType: type,
        preferredMeetingAddr: type === "resi" ? prev.resiAddr : prev.officeAddr,
      };
      if (type === "resi" && prev.resiPincode.length === 6) {
        fetchAreaData(prev.resiPincode).then((areaData) => {
          setFormData((prev) => ({
            ...prev,
            preferredMeetingArea: areaData.name,
            city: areaData.city,
          }));
        });
      } else if (type === "office" && prev.officePincode.length === 6) {
        fetchAreaData(prev.officePincode).then((areaData) => {
          setFormData((prev) => ({
            ...prev,
            preferredMeetingArea: areaData.name,
            city: areaData.city,
          }));
        });
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit && suspectData?._id) {
      console.log(formData);
      const result = await dispatch(updateSuspectPersonalDetails({ id: suspectData._id, personalDetails: formData }));
      if (result) {
        setFormData(initialFormState);
        toast.info("Suspect details updated successfully");
        if (onSuspectCreated) onSuspectCreated(suspectData._id);
      }
    } else {
      const resultAction = await dispatch(createSuspect({ personalDetails: formData }));
      if (resultAction) {
        toast.success("Suspect Created Successfully");
        setFormData(initialFormState);
        const suspectId = resultAction?.payload;
        if (onSuspectCreated && suspectId) onSuspectCreated(suspectId);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-4">
        <Col md={2}>
          <Form.Group controlId="salutation">
            <Form.Label>Salutation</Form.Label>
            <Form.Select
              name="salutation"
              value={formData.salutation ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">Select</option>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
              <option>Mast.</option>
              <option>Shri.</option>
              <option>Smt.</option>
              <option>Kum.</option>
              <option>Kr.</option>
              <option>Dr.</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="groupName">
            <Form.Label>Group Head</Form.Label>
            <Form.Control
              name="groupName"
              type="text"
              placeholder="Group Head"
              value={formData.groupName ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="organisation">
            <Form.Label>Organisation</Form.Label>
            <Form.Control
              name="organisation"
              type="text"
              placeholder="Organisation"
              value={formData.organisation ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              name="designation"
              type="text"
              placeholder="Designation"
              value={formData.designation ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="annualIncome">
            <Form.Label style={{ color: "#00008B" }} className="fw-medium">
              Annual Income
            </Form.Label>
            <Form.Select
              name="annualIncome"
              value={formData.annualIncome ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">-- Select --</option>
              {incomeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={1}>
          <Form.Group controlId="grade">
            <Form.Label style={{ color: "#00008B" }} className="fw-medium">
              Grade
            </Form.Label>
            <Form.Control
              type="text"
              name="grade"
              value={formData.grade ?? ""}
              size="sm"
              readOnly
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
    
             <Col md={3}>
       <Form.Group controlId="mobileNo">
         <Form.Label>Mobile No</Form.Label>
         <Form.Control
           name="mobileNo"
           type="text"
           placeholder="Mobile No"
           value={formData.mobileNo ?? ""}
           onChange={handleMobileWhatsappChange}
           maxLength={10}
           size="sm"
         />
       </Form.Group>
     </Col>
     
     <Col md={3}>
       <Form.Group controlId="whatsappNo">
         <Form.Label>WhatsApp No</Form.Label>
         <Form.Control
           name="whatsappNo"
           type="text"
           placeholder="WhatsApp No"
           value={formData.whatsappNo ?? ""}
           maxLength={10}
           onChange={handleMobileWhatsappChange}
           size="sm"
         />
       </Form.Group>
     </Col>

   <Col md={3}>
  <Form.Group controlId="contactNo">
    <Form.Label>Phone No</Form.Label>
    <Form.Control
      name="contactNo"
      type="text"
      placeholder="Phone No"
      maxLength={14}
      value={`0755${formData.contactNo ?? ""}`}  // 👈 prefix + stored number
      onChange={(e) =>
        setFormData({
          ...formData,
          contactNo: e.target.value.replace(/^0755/, ""), // 👈 store without prefix
        })
      }
      size="sm"
    />
  </Form.Group>
</Col>

        <Col md={3}>
          <Form.Group controlId="emailId">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="emailId"
              type="email"
              placeholder="Email"
              value={formData.emailId ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group controlId="dob">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              name="dob"
              type="date"
              placeholder="dd-mm-yyyy"
              value={formData.dob ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="dom">
            <Form.Label>DOM</Form.Label>
            <Form.Control
              name="dom"
              type="date"
              placeholder="dd-mm-yyyy"
              value={formData.dom ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
     <Row className="mb-4">
          <Col md={1} className="mt-2">
            <Form.Check
              type="radio"
              label="Resi."
              name="preferredAddressType"
              checked={formData.preferredAddressType === "resi"}
              onChange={() => handleAddressTypeChange("resi")}
            />
          </Col>
          <Col md={6}>
            <Form.Group controlId="resiAddr">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="resiAddr"
                type="text"
                placeholder="Residential Address"
                value={formData.resiAddr ?? ""}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="resiLandmark">
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                name="resiLandmark"
                type="text"
                placeholder="Residential Landmark"
                value={formData.resiLandmark ?? ""}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="resiPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                name="resiPincode"
                type="text"
                placeholder="Residential Pincode"
                value={formData.resiPincode ?? ""}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={1} className="mt-2">
            <Form.Check
              type="radio"
              label="Office"
              name="preferredAddressType"
              checked={formData.preferredAddressType === "office"}
              onChange={() => handleAddressTypeChange("office")}
            />
          </Col>
          <Col md={6}>
            <Form.Group controlId="officeAddr">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="officeAddr"
                type="text"
                placeholder="Office Address"
                value={formData.officeAddr ?? ""}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="officeLandmark">
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                name="officeLandmark"
                type="text"
                placeholder="Office Landmark"
                value={formData.officeLandmark ?? ""}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="officePincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                name="officePincode"
                type="text"
                placeholder="Office Pincode"
                value={formData.officePincode ?? ""}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={5}>
            <Form.Group controlId="preferredMeetingAddr">
              <Form.Label>Preferred Meeting Address</Form.Label>
              <Form.Control
                name="preferredMeetingAddr"
                type="text"
                placeholder="Preferred Meeting Address"
                value={formData.preferredMeetingAddr ?? ""}
                onChange={handleChange}
                size="sm"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="preferredMeetingArea">
              <Form.Label>Preferred Meeting Area</Form.Label>
              <Form.Control
                name="preferredMeetingArea"
                type="text"
                placeholder="Preferred Meeting Area"
                value={formData.preferredMeetingArea ?? ""}
                onChange={handleChange}
                size="sm"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="City"
                value={formData.city ?? ""}
                onChange={handleChange}
                size="sm"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="bestTime">
              <Form.Label>Best Time</Form.Label>
              <Form.Select
                name="bestTime"
                value={formData.bestTime ?? ""}
                onChange={handleChange}
                size="sm"
              >
                <option value="">-- Select Time --</option>
                <option value="10 AM to 2 PM">10 AM to 2 PM</option>
                <option value="2 PM to 7 PM">2 PM to 7 PM</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
           <Col md={3}>
            <Form.Group controlId="leadSource">
              <Form.Label>Lead Source</Form.Label>
              <Form.Select
                name="leadSource"
                value={formData.leadSource ?? ""}
                onChange={handleChange}
                size="sm"
              >
                <option value="">Select Lead Source</option>
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  leadTypes?.map((type) => (
                    <option key={type._id} value={type.leadType.trim()}>
                      {type.leadType.trim()}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>
          </Col>
            <Col md={3}>
            <Form.Group controlId="leadName">
              <Form.Label>Lead Name</Form.Label>
              <Form.Select
                name="leadName"
                value={formData.leadName ?? ""}
                onChange={handleChange}
                size="sm"
              >
                <option value="">Select Lead Name</option>
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  leadsourceDetail?.map((src) => (
                    <option key={src._id} value={src.sourceName}>
                      {src.sourceName}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>
          </Col>
              <Col md={3}>
                <Form.Group controlId="leadOccupation">
                  <Form.Label>Lead Occupation</Form.Label>
                  <Form.Select
                    name="leadOccupation"
                    value={formData.leadOccupation ?? ""}
                    onChange={handleChange}
                    size="sm"
                  >
                    <option value="">Select Lead Occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation._id} value={occupation.occupationName}>
                        {occupation.occupationName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="leadOccupationType">
                  <Form.Label>Lead Occupation Type</Form.Label>
                  <Form.Select
                    name="leadOccupationType"
                    value={formData.leadOccupationType ?? ""}
                    onChange={handleChange}
                    size="sm"
                  >
                    <option value="">Select Lead Occupation Type</option>
                    {occupationTypes.map((type) => (
                      <option key={type._id} value={type.occupationType}>
                        {type.occupationType}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
      
            </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="callingPurpose">
            <Form.Label>Calling Purpose</Form.Label>
            <Form.Select
              name="callingPurpose"
              value={formData.callingPurpose ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">-- Select Purpose --</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Meeting Schedule">Meeting Schedule</option>
              <option value="Query Resolution">Query Resolution</option>
              <option value="Proposal Discussion">Proposal Discussion</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit" className="btn btn-primary">
        {isEdit && suspectData?._id ? "Update" : "Submit Lead"}
      </Button>


{isEdit && suspectData?._id && (
  <div className="mt-4">
    <Tabs defaultActiveKey="addCall" id="call-tabs" className="mb-3">
      
      {/* Tab 1: Add Call Task */}
      <Tab eventKey="addCall" title="📞 Add Call Task">
        <Form >
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="lastCallDate">
                <Form.Label>Last Call Date</Form.Label>
                <Form.Control
                  type="date"
                  name="lastCallDate"
                  value={formData.lastCallDate ?? ""}
                  onChange={handleChange}
                  size="sm"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="callStatus">
                <Form.Label>Call Status</Form.Label>
                <Form.Select
                  name="callStatus"
                  value={formData.callStatus ?? ""}
                  onChange={handleChange}
                  size="sm"
                >
                  <option value="">-- Select Status --</option>
                  <option value="Interested">Interested</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Converted">Converted</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="callRemarks">
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="callRemarks"
                  placeholder="Enter call remarks..."
                  value={formData.callRemarks ?? ""}
                  onChange={handleChange}
                  size="sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mb-3 text-success">📌 Next Action</h5>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="nextFollowUpDate">
                <Form.Label>Next Follow-Up Date</Form.Label>
                <Form.Control
                  type="date"
                  name="nextFollowUpDate"
                  value={formData.nextFollowUpDate ?? ""}
                  onChange={handleChange}
                  size="sm"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="assignedTo">
                <Form.Label>Assign To (Telecaller/CRE)</Form.Label>
                <Form.Control
                  type="text"
                  name="assignedTo"
                  placeholder="Enter Name"
                  value={formData.assignedTo ?? ""}
                  onChange={handleChange}
                  size="sm"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Submit button for Call Summary */}
          <div className="text-end">
            <Button variant="success" size="sm" type="submit">
              💾 Save Call Summary
            </Button>
          </div>
        </Form>
      </Tab>

      {/* Tab 2: Call History */}
      <Tab eventKey="callHistory" title="📜 Call History">
        {suspectData?.callHistory?.length > 0 ? (
          <div className="p-2">
            {suspectData.callHistory.map((call, idx) => (
              <div key={idx} className="border rounded p-2 mb-2 bg-light">
                <strong>Date:</strong> {call.date} <br />
                <strong>Status:</strong> {call.status} <br />
                <strong>Remarks:</strong> {call.remarks}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No call history available.</p>
        )}
      </Tab>
    </Tabs>
  </div>
)}


    </Form>

    
  );
};
export default AddSuspect 


