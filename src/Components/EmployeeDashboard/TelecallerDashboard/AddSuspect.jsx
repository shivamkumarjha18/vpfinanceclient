import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tabs, Tab, Form, Button, Row, Col, Table } from "react-bootstrap";
import { createSuspect, updateSuspectPersonalDetails } from "../../../redux/feature/SuspectRedux/SuspectThunx";
import { fetchDetails } from "../../../redux/feature/LeadSource/LeadThunx";
import { getAllOccupations } from "../../../redux/feature/LeadOccupation/OccupationThunx";
import { getAllOccupationTypes } from "../../../redux/feature/OccupationType/OccupationThunx";
import { toast } from "react-toastify";
import { getAllSuspects } from "../../../redux/feature/SuspectRedux/SuspectThunx";

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



const AddSuspect = ({ isEdit, suspectData, onSuspectCreated }) => {


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
    dob: "",
    dom: "",
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
    leadSource: "",
    leadName: "",
    leadOccupation: "",
    leadOccupationType: "",
    callingPurpose: "",
    name: "",
  };

  // Yeh data tu API se bhi laa sakta hai, abhi ke liye dummy hai
const callHistory = [
  {
    mobile: "7987622690",
    remark: "2025-09-22 : call not picked",
    status: "",
    callBy: "Employee1",
  },
  {
    mobile: "7987622690",
    remark: "2024-05-18 : HDFC ERGO Due 3 saal ka ek sath me le liya hai",
    status: "Abhi nhi lena",
    callBy: "Employee1",
  },
  {
    mobile: "7987622690",
    remark: "2024-04-30 : call not received",
    status: "Others",
    callBy: "Employee1",
  },
];

  const [formData, setFormData] = useState(initialFormState);
  const [callSummary, setCallSummary] = useState({
    callStatus: "",
    remark: "",
    nextCallDate: "",
    time: "",
  });

  const { leadsourceDetail } = useSelector((state) => state.leadsource);
  const { alldetails } = useSelector((state) => state.leadOccupation);
  const { alldetailsForTypes } = useSelector((state) => state.OccupationType);
  const { suspects } = useSelector((state) => state.suspect);

  useEffect(() => {
    dispatch(fetchDetails());
    dispatch(getAllOccupationTypes());
    dispatch(getAllOccupations());
    dispatch(getAllSuspects());
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

        if (area) {
          setFormData((prev) => ({
            ...prev,
            preferredMeetingArea: area.name || "",
            city: area.city || "",
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            preferredMeetingArea: "Area not found",
            city: "",
          }));
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          preferredMeetingArea: "No data received",
          city: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching area data:", error);
      setFormData((prev) => ({
        ...prev,
        preferredMeetingArea: "Error fetching area",
        city: "",
      }));
    }
  };

  useEffect(() => {
    if (formData.resiPincode?.length === 6 || formData.officePincode?.length === 6) {
      fetchAreaData(formData.resiPincode || formData.officePincode);
    }
  }, [formData.resiPincode, formData.officePincode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if ((name === "resiPincode" || name === "officePincode") && value.length === 6) {
      fetchAreaData(value);
    }
  };

  const handleAddressTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      preferredAddressType: type,
      preferredMeetingAddr: type === "resi" ? prev.resiAddr : prev.officeAddr,
    }));
  };

  const handleCallSummaryChange = (e) => {
    const { name, value } = e.target;
    setCallSummary((prev) => ({ ...prev, [name]: value }));
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

  const handleCallSummarySubmit = (e) => {
    e.preventDefault();
    console.log("Call Summary:", callSummary);
    // Add API call or dispatch action to save call summary
  };

  return (
    <div>
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
              <Form.Label>Family Head</Form.Label>
              <Form.Control
                name="groupName"
                type="text"
                placeholder="Family Head"
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
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="whatsappNo">
              <Form.Label>Whatsapp No</Form.Label>
              <Form.Control
                name="whatsappNo"
                type="text"
                placeholder="Whatsapp No"
                value={formData.whatsappNo ?? ""}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="contactNo">
              <Form.Label>Contact No</Form.Label>
              <Form.Control
                name="contactNo"
                type="text"
                placeholder="Contact No"
                value={formData.contactNo ?? ""}
                onChange={handleChange}
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
              label="Residential"
              name="preferredAddressType"
              checked={formData.preferredAddressType === "resi"}
              onChange={() => handleAddressTypeChange("resi")}
            />
          </Col>
          <Col md={6}>
            <Form.Group controlId="resiAddr">
              <Form.Label>Resi. Address</Form.Label>
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
              <Form.Label>Resi. Landmark</Form.Label>
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
              <Form.Label>Pin Code</Form.Label>
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
              <Form.Label>Off. Address</Form.Label>
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
              <Form.Label>Off. Landmark</Form.Label>
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
              <Form.Label>Area</Form.Label>
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
                <option value="Referred">Referred</option>
                <option value="Digital Platform">Digital Platform</option>
                <option value="Employee">Employee</option>
                <option value="Business Associate">Business Associate</option>
                <option value="Internship">Internship</option>
                <option value="Direct">Direct</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="leadName">
              <Form.Label>Lead Name</Form.Label>
              <Form.Control
                name="leadName"
                type="text"
                placeholder="Lead Name"
                value={formData.leadName ?? ""}
                onChange={handleChange}
                size="sm"
              />
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
                <option value="Businessman">Businessman</option>
                <option value="Govt.Service">Govt.Service</option>
                <option value="Private Service">Private Service</option>
                <option value="Retired">Retired</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="leadOccupationType">
              <Form.Label>Occupation Type</Form.Label>
              <Form.Select
                name="leadOccupationType"
                value={formData.leadOccupationType ?? ""}
                onChange={handleChange}
                size="sm"
              >
                <option value="">Select Occupation Type</option>
                <option value="CA">CA</option>
                <option value="Jwellars">Jwellars</option>
                <option value="Iron Merchant">Iron Merchant</option>
                <option value="Kirana Merchant">Kirana Merchant</option>
                <option value="Sugar Tredars">Sugar Tredars</option>
                <option value="Cloth Merchant">Cloth Merchant</option>
                <option value="Whole Sale Stationary">Whole Sale Stationary</option>
                <option value="Tent & Lighte">Tent & Lighte</option>
                <option value="Pan Masala Merchant">Pan Masala Merchant</option>
                <option value="Bartan Merchant">Bartan Merchant</option>
                <option value="Paper Traders">Paper Traders</option>
                <option value="Restorent Ownar">Restorent Ownar</option>
                <option value="Hotel Ownar">Hotel Ownar</option>
                <option value="Electronics Shop Owner">Electronics Shop Owner</option>
                <option value="Electricals Shop Owner">Electricals Shop Owner</option>
                <option value="Tyre Dealers">Tyre Dealers</option>
                <option value="Tea Merchents">Tea Merchents</option>
                <option value="Whole Sale Medical Shop">Whole Sale Medical Shop</option>
                <option value="Automobile Dealears">Automobile Dealears</option>
                <option value="Cycle Dealers">Cycle Dealers</option>
                <option value="Transportars">Transportars</option>
                <option value="Retail Cloth Merchant">Retail Cloth Merchant</option>
                <option value="Bangle Merchant">Bangle Merchant</option>
                <option value="Book Salears">Book Salears</option>
                <option value="Grain & Oil Seads Merchant">Grain & Oil Seads Merchant</option>
                <option value="Oil & Ghee Merchant">Oil & Ghee Merchant</option>
                <option value="Doctors">Doctors</option>
                <option value="PVT.Service">PVT.Service</option>
                <option value="Retired">Retired</option>
                <option value="Industrialist">Industrialist</option>
                <option value="Teacher">Teacher</option>
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
      </Form>

    {isEdit && (
  <div className="mt-4">
    <h4>Call Summary</h4>

    <Tabs defaultActiveKey="addTask" id="call-summary-tabs" className="mb-3">
      {/* Add Call Task Tab */}
      <Tab eventKey="addTask" title="Add Call Task">
        <Form onSubmit={handleCallSummarySubmit}>
          <Row>
            <Col md={3}>
              <Form.Group controlId="callStatus">
                <Form.Label>Call Status</Form.Label>
                <Form.Select
                  name="callStatus"
                  value={callSummary.callStatus}
                  onChange={handleCallSummaryChange}
                  size="sm"
                >
                  <option value="">-- Select --</option>
                  <option value="Call Not Picked">Call Not Picked</option>
                  <option value="Call After Sometimes">Call After Sometimes</option>
                  <option value="Wrong Number">Wrong Number</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="nextCallDate">
                <Form.Label>Next Call Date</Form.Label>
                <Form.Control
                  name="nextCallDate"
                  type="date"
                  value={callSummary.nextCallDate}
                  onChange={handleCallSummaryChange}
                  size="sm"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="time">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  name="time"
                  type="time"
                  value={callSummary.time}
                  onChange={handleCallSummaryChange}
                  size="sm"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="remark">
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  name="remark"
                  type="text"
                  value={callSummary.remark}
                  onChange={handleCallSummaryChange}
                  size="sm"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" className="btn btn-primary mt-2">
            Submit Call Summary
          </Button>
        </Form>
      </Tab>

      {/* All Call History Tab */}
      <Tab eventKey="callHistory" title="All Call History">
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Mobile</th>
              <th>Remark</th>
              <th>Status</th>
              <th>Call By</th>
            </tr>
          </thead>
          <tbody>
            {callHistory && callHistory.length > 0 ? (
              callHistory.map((call, index) => (
                <tr key={index}>
                  <td>{call.mobile}</td>
                  <td>{call.remark}</td>
                  <td>{call.status || ":"}</td>
                  <td>{call.callBy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Call History Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Tab>
    </Tabs>
  </div>
)}
    </div>
  );
};



export default AddSuspect;