import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addFamilyMember, updateFamilyMember } from "../../../redux/feature/ClientRedux/ClientThunx";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const FamilyMembersForm = ({ clientId, clientData, onClientCreated }) => {
  const dispatch = useDispatch();
  const [familyMembers, setFamilyMembers] = useState([]);
  const { id } = useParams();
  const isEdit = !!id || !!clientData?._id;

  useEffect(() => {
    // Load existing family members when editing
    if (clientData && clientData.familyMembers && clientData.familyMembers.length > 0) {
      setFamilyMembers(
        clientData.familyMembers.map((m) => ({
          _id: m._id,
          title: m.title || "",
          name: m.name || "",
          relation: m.relation || "",
          dobActual: m.dobActual || "",
          dobRecord: m.dobRecord || "",
          marriageDate: m.marriageDate || "",
          occupation: m.occupation || "",
          annualIncome: m.annualIncome || "",
          contact: m.contact || "",
          includeHealth: m.includeHealth || false,
          healthHistory: {
            submissionDate: m.healthHistory?.submissionDate || "",
            diseaseName: m.healthHistory?.diseaseName || "",
            since: m.healthHistory?.since || "",
            height: m.healthHistory?.height || "",
            weight: m.healthHistory?.weight || "",
            remark: m.healthHistory?.remark || "",
          },
        }))
      );
    } else if (clientData && clientData.name) {
      // If no family members, initialize with client's personal details
      setFamilyMembers([
        {
          title: "",
          name: clientData.name || "",
          relation: "Self",
          dobActual: "",
          dobRecord: "",
          marriageDate: "",
          occupation: "",
          annualIncome: "",
          contact: clientData.contact || "",
          includeHealth: false,
          healthHistory: {
            submissionDate: "",
            diseaseName: "",
            since: "",
            height: "",
            weight: "",
            remark: "",
          },
        },
      ]);
    } else {
      // Fallback: Initialize with an empty member
      setFamilyMembers([
        {
          title: "",
          name: "",
          relation: "",
          dobActual: "",
          dobRecord: "",
          marriageDate: "",
          occupation: "",
          annualIncome: "",
          contact: "",
          includeHealth: false,
          healthHistory: {
            submissionDate: "",
            diseaseName: "",
            since: "",
            height: "",
            weight: "",
            remark: "",
          },
        },
      ]);
    }
  }, [clientData]);

  const handleAddMember = () => {
    setFamilyMembers((prev) => [
      ...prev,
      {
        title: "",
        name: "",
        relation: "",
        dobActual: "",
        dobRecord: "",
        marriageDate: "",
        occupation: "",
        annualIncome: "",
        contact: "",
        includeHealth: false,
        healthHistory: {
          submissionDate: "",
          diseaseName: "",
          since: "",
          height: "",
          weight: "",
          remark: "",
        },
      },
    ]);
  };

  const handleRemoveMember = (index) => {
    // if (familyMembers.length === 1) {
    //   toast.warning("At least one family member is required!");
    //   return;
    // }
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMemberChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");

    setFamilyMembers((prev) =>
      prev.map((member, i) => {
        if (i !== index) return member;

        if (keys.length === 1) {
          return {
            ...member,
            [keys[0]]: type === "checkbox" ? checked : value,
          };
        } else if (keys.length === 2) {
          return {
            ...member,
            [keys[0]]: {
              ...member[keys[0]],
              [keys[1]]: value,
            },
          };
        }
        return member;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const isValid = familyMembers.every(
      (member) =>
        member.name &&
        member.relation &&
        member.dobActual &&
        (!member.includeHealth ||
          (member.healthHistory.diseaseName &&
            member.healthHistory.submissionDate))
    );

    if (!isValid) {
      toast.error("Please fill all required fields for each member!");
      return;
    }

    const idToUse = clientData?._id || clientId || id;
    if (!idToUse) {
      toast.error("No client ID found!");
      return;
    }

    // Prepare payload with _id for existing members
    const membersPayload = familyMembers.map((member) => ({
      _id: member._id, // Include _id if it exists, undefined for new members
      title: member.title,
      name: member.name,
      relation: member.relation,
      dobActual: member.dobActual,
      dobRecord: member.dobRecord,
      marriageDate: member.marriageDate,
      occupation: member.occupation,
      annualIncome: member.annualIncome,
      contact: member.contact,
      includeHealth: member.includeHealth,
      healthHistory: member.includeHealth ? member.healthHistory : undefined,
    }));

    try {
      let result;
      if (isEdit) {
        result = await dispatch(
          updateFamilyMember({ clientId: idToUse, membersArray: membersPayload })
        );
        if (updateFamilyMember.fulfilled.match(result)) {
          // Update familyMembers state with backend response
          const updatedMembers = result.payload.familyMembers.map((m) => ({
            _id: m._id,
            title: m.title || "",
            name: m.name || "",
            relation: m.relation || "",
            dobActual: m.dobActual || "",
            dobRecord: m.dobRecord || "",
            marriageDate: m.marriageDate || "",
            occupation: m.occupation || "",
            annualIncome: m.annualIncome || "",
            contact: m.contact || "",
            includeHealth: m.includeHealth || false,
            healthHistory: {
              submissionDate: m.healthHistory?.submissionDate || "",
              diseaseName: m.healthHistory?.diseaseName || "",
              since: m.healthHistory?.since || "",
              height: m.healthHistory?.height || "",
              weight: m.healthHistory?.weight || "",
              remark: m.healthHistory?.remark || "",
            },
          }));
          setFamilyMembers(updatedMembers);
          toast.success("Family Members Updated Successfully ✅");
        } else {
          toast.error(result.payload || "Failed to update family members!");
        }
      } else {
        result = await dispatch(
          addFamilyMember({ clientId: idToUse, membersArray: membersPayload })
        );
      

        if (addFamilyMember.fulfilled.match(result)) {
          // Update familyMembers state with backend response
          const updatedMembers = result.payload.familyMembers.map((m) => ({
            _id: m._id,
            title: m.title || "",
            name: m.name || "",
            relation: m.relation || "",
            dobActual: m.dobActual || "",
            dobRecord: m.dobRecord || "",
            marriageDate: m.marriageDate || "",
            occupation: m.occupation || "",
            annualIncome: m.annualIncome || "",
            contact: m.contact || "",
            includeHealth: m.includeHealth || false,
            healthHistory: {
              submissionDate: m.healthHistory?.submissionDate || "",
              diseaseName: m.healthHistory?.diseaseName || "",
              since: m.healthHistory?.since || "",
              height: m.healthHistory?.height || "",
              weight: m.healthHistory?.weight || "",
              remark: m.healthHistory?.remark || "",
            },
          }));
          setFamilyMembers(updatedMembers);
          toast.success("Family Members Saved Successfully ✅");
          if (onClientCreated && result.payload.clientId) {
            onClientCreated(result.payload.clientId);
          }
        } else {
          toast.error(result.payload || "Failed to save family members!");
        }
      }
    } catch (error) {
      toast.error("An error occurred while saving family members!");
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {familyMembers.map((member, index) => (
        <div key={member._id || index} className="border rounded p-3 mb-3">
          <Row className="mb-2">
            <Col md={2}>
              <Form.Group controlId={`title-${member._id || index}`}>
                <Form.Label>Mr/Mrs</Form.Label>
                <Form.Select
                  name="title"
                  value={member.title}
                  onChange={(e) => handleMemberChange(e, index)}
                >
                  <option value="">Select</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId={`name-${member._id || index}`}>
                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="name"
                  value={member.name}
                  onChange={(e) => handleMemberChange(e, index)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`relation-${member._id || index}`}>
                <Form.Label>Relation <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="relation"
                  value={member.relation}
                  onChange={(e) => handleMemberChange(e, index)}
                  required
                >
                  <option value="">Select Relation</option>
                  <option>Self</option>
                  <option>Wife</option>
                  <option>Husband</option>
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Brother</option>
                  <option>Sister</option>
                  <option>Brother-in-law</option>
                  <option>Sister-in-law</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`annualIncome-${member._id || index}`}>
                <Form.Label>Annual Income</Form.Label>
                <Form.Control
                  name="annualIncome"
                  value={member.annualIncome}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={3}>
              <Form.Group controlId={`dobActual-${member._id || index}`}>
                <Form.Label>DOB (Actual) <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="date"
                  name="dobActual"
                  value={member.dobActual ? member.dobActual.split("T")[0] : ""}
                  onChange={(e) => handleMemberChange(e, index)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`dobRecord-${member._id || index}`}>
                <Form.Label>DOB (Record)</Form.Label>
                <Form.Control
                  type="date"
                  name="dobRecord"
                  value={member.dobRecord ? member.dobRecord.split("T")[0] : ""}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`marriageDate-${member._id || index}`}>
                <Form.Label>Marriage Date</Form.Label>
                <Form.Control
                  type="date"
                  name="marriageDate"
                  value={member.marriageDate ? member.marriageDate.split("T")[0] : ""}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`occupation-${member._id || index}`}>
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                  name="occupation"
                  value={member.occupation}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={3}>
              <Form.Group controlId={`contact-${member._id || index}`}>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  name="contact"
                  value={member.contact}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId={`includeHealth-${member._id || index}`}>
                <Form.Check
                  type="checkbox"
                  label="Include Health History"
                  name="includeHealth"
                  checked={member.includeHealth}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            {member.includeHealth && (
              <Col md={7}>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId={`healthHistory.submissionDate-${member._id || index}`}>
                      <Form.Label>Submission Date <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="date"
                        name="healthHistory.submissionDate"
                        value={member.healthHistory.submissionDate || ""}
                        onChange={(e) => handleMemberChange(e, index)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`healthHistory.diseaseName-${member._id || index}`}>
                      <Form.Label>Disease Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        name="healthHistory.diseaseName"
                        value={member.healthHistory.diseaseName || ""}
                        onChange={(e) => handleMemberChange(e, index)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`healthHistory.since-${member._id || index}`}>
                      <Form.Label>Since</Form.Label>
                      <Form.Control
                        type="date"
                        name="healthHistory.since"
                        value={member.healthHistory.since || ""}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`healthHistory.height-${member._id || index}`}>
                      <Form.Label>Height</Form.Label>
                      <Form.Control
                        name="healthHistory.height"
                        value={member.healthHistory.height || ""}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`healthHistory.weight-${member._id || index}`}>
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        name="healthHistory.weight"
                        value={member.healthHistory.weight || ""}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`healthHistory.remark-${member._id || index}`}>
                      <Form.Label>Remark</Form.Label>
                      <Form.Control
                        name="healthHistory.remark"
                        value={member.healthHistory.remark || ""}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>

          <Button
            variant="danger"
            className="mt-2"
            onClick={() => handleRemoveMember(index)}
          >
            Remove Member
          </Button>
        </div>
      ))}
      <Button
        variant="success"
        onClick={handleAddMember}
        type="button"
        className="me-2"
      >
        Add New Member
      </Button>
      <Button type="submit" className="btn btn-primary">
        {isEdit && clientData?._id ? "Update Members" : "Save Members"}
      </Button>
    </Form>
  );
};

export default FamilyMembersForm;
   

