


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addFinancialInfo } from "../../../redux/feature/ProspectRedux/ProspectThunx";
import {toast} from "react-toastify"

const INSURANCE_OPTIONS = [
  "LIC Policy",
  "Pvt. Life Policy",
  "Health Policy",
  "Motor Policy",
  "Fire Policy",
  "Other Policy",
];

const INVESTMENT_OPTIONS = [
  "Deposits",
  "Mutual Fund",
  "Stock Market",
  "Gold",
  "Property",
  "Other Investment",
];

const LOAN_OPTIONS = [
  "Business Loan",
  "Home Loan",
  "Vehicle Loan",
  "Personal Loan",
  "Gold Loan",
  "Other Loan",
];

const initialInsuranceForm = {
  type: "",
  submissionDate: "",
  memberName: "",
  insuranceCompany: "",
  policyNumber: "",
  planName: "",
  sumAssured: "",
  mode: "",
  premium: "",
  startDate: "",
  maturityDate: "",
  document: null,
};

const initialInvestmentForm = {
  type: "",
  submissionDate: "",
  memberName: "",
  financialProduct: "",
  companyName: "",
  planName: "",
  amount: "",
  startDate: "",
  maturityDate: "",
  document: null,
};

const initialLoanForm = {
  type: "",
  submissionDate: "",
  memberName: "",
  loanType: "",
  companyName: "",
  loanAccountNumber: "",
  outstandingAmount: "",
  interestRate: "",
  term: "",
  startDate: "",
  maturityDate: "",
  document: null,
};

const FinancialInformationFormForProspect = ({ prospectId, prospectData, onProspectCreated }) => {
  const dispatch = useDispatch();

  const [openInsurance, setOpenInsurance] = useState([]);
  const [openInvestments, setOpenInvestments] = useState([]);
  const [openLoans, setOpenLoans] = useState([]);

  const [insuranceForms, setInsuranceForms] = useState([]);
  const [investmentForms, setInvestmentForms] = useState([]);
  const [loanForms, setLoanForms] = useState([]);

  const [insuranceFormData, setInsuranceFormData] = useState({});
  const [investmentFormData, setInvestmentFormData] = useState({});
  const [loanFormData, setLoanFormData] = useState({});





  const handleCheckboxChange = (option, group) => {
    if (group === "insurance") {
      setOpenInsurance((prev) =>
        prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]
      );
      setInsuranceFormData((prev) => ({
        ...prev,
        [option]: { ...initialInsuranceForm, type: option },
      }));
    }
    if (group === "investment") {
      setOpenInvestments((prev) =>
        prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]
      );
      setInvestmentFormData((prev) => ({
        ...prev,
        [option]: { ...initialInvestmentForm, type: option },
      }));
    }
    if (group === "loan") {
      setOpenLoans((prev) =>
        prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]
      );
      setLoanFormData((prev) => ({
        ...prev,
        [option]: { ...initialLoanForm, type: option },
      }));
    }
  };

  const handleFormChange = (option, group, field, value) => {
    if (group === "insurance") {
      setInsuranceFormData((prev) => ({
        ...prev,
        [option]: { ...prev[option], [field]: value },
      }));
    }
    if (group === "investment") {
      setInvestmentFormData((prev) => ({
        ...prev,
        [option]: { ...prev[option], [field]: value },
      }));
    }
    if (group === "loan") {
      setLoanFormData((prev) => ({
        ...prev,
        [option]: { ...prev[option], [field]: value },
      }));
    }
  };


  
  const handleSaveForm = (option, group) => {
    if (group === "insurance") {
      const formData = { ...insuranceFormData[option] };
      if (!formData.document) {
        formData.document = null;
      }
      setInsuranceForms((prev) => [...prev, formData]);
      setOpenInsurance((prev) => prev.filter((v) => v !== option));
      setInsuranceFormData((prev) => {
        const copy = { ...prev };
        delete copy[option];
        return copy;
      });
    }
    if (group === "investment") {
      const formData = { ...investmentFormData[option] };
      if (!formData.document) {
        formData.document = null;
      }
      setInvestmentForms((prev) => [...prev, formData]);
      setOpenInvestments((prev) => prev.filter((v) => v !== option));
      setInvestmentFormData((prev) => {
        const copy = { ...prev };
        delete copy[option];
        return copy;
      });
    }
    if (group === "loan") {
      const formData = { ...loanFormData[option] };
      if (!formData.document) {
        formData.document = null;
      }
      setLoanForms((prev) => [...prev, formData]);
      setOpenLoans((prev) => prev.filter((v) => v !== option));
      setLoanFormData((prev) => {
        const copy = { ...prev };
        delete copy[option];
        return copy;
      });
    }
  };

  const handleCloseForm = (option, group) => {
    if (group === "insurance") {
      setOpenInsurance((prev) => prev.filter((v) => v !== option));
      setInsuranceFormData((prev) => {
        const copy = { ...prev };
        delete copy[option];
        return copy;
      });
    }
    if (group === "investment") {
      setOpenInvestments((prev) => prev.filter((v) => v !== option));
      setInvestmentFormData((prev) => {
        const copy = { ...prev };
        delete copy[option];
        return copy;
      });
    }
    if (group === "loan") {
      setOpenLoans((prev) => prev.filter((v) => v !== option));
      setLoanFormData((prev) => {
        const copy = { ...prev };
        delete copy[option];
        return copy;
      });
    }
  };

  // const handleFileChange = (option, group, file) => {
  //   handleFormChange(option, group, "document", file);
  // };

  const handleFileChange = (option, group, file) => {
  if (file) {
    handleFormChange(option, group, "document", file);
  } else {
    handleFormChange(option, group, "document", null);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const financialData = {
      insurance: insuranceForms,
      investments: investmentForms,
      loans: loanForms,
    };
    
    const idToUse = prospectData && prospectData._id || prospectId;
  
    const result = await dispatch(addFinancialInfo({ prospectId:idToUse, financialData }));
    if(result){
    setInsuranceForms([]);
    setInvestmentForms([]);
    setLoanForms([]);
    toast.info("Financial Information Added Successfully....")
    const prospectIdFromRedux = result?.payload;
    if (onProspectCreated && prospectIdFromRedux) onProspectCreated(prospectIdFromRedux);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Insurance</Form.Label>
            {INSURANCE_OPTIONS.map((option) => (
              <Form.Check
                key={option}
                type="checkbox"
                label={option}
                value={option}
                checked={openInsurance.includes(option)}
                onChange={() => handleCheckboxChange(option, "insurance")}
              />
            ))}
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Investments</Form.Label>
            {INVESTMENT_OPTIONS.map((option) => (
              <Form.Check
                key={option}
                type="checkbox"
                label={option}
                value={option}
                checked={openInvestments.includes(option)}
                onChange={() => handleCheckboxChange(option, "investment")}
              />
            ))}
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Loans</Form.Label>
            {LOAN_OPTIONS.map((option) => (
              <Form.Check
                key={option}
                type="checkbox"
                label={option}
                value={option}
                checked={openLoans.includes(option)}
                onChange={() => handleCheckboxChange(option, "loan")}
              />
            ))}
          </Form.Group>
        </Col>
      </Row>

      {/* Insurance Forms */}
      {openInsurance.map((option) => (
        <div key={option} className="border p-3 mb-3">
          <h5 className="text-primary">{option} Insurance</h5>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Submission Date</Form.Label>
                <Form.Control
                  type="date"
                  value={insuranceFormData[option]?.submissionDate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "submissionDate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Member Name</Form.Label>
                <Form.Control
                  type="text"
                  value={insuranceFormData[option]?.memberName || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "memberName", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Insurance Company</Form.Label>
                <Form.Control
                  type="text"
                  value={insuranceFormData[option]?.insuranceCompany || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "insuranceCompany", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Policy Number</Form.Label>
                <Form.Control
                  type="text"
                  value={insuranceFormData[option]?.policyNumber || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "policyNumber", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Plan Name</Form.Label>
                <Form.Control
                  type="text"
                  value={insuranceFormData[option]?.planName || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "planName", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Sum Assured</Form.Label>
                <Form.Control
                  type="number"
                  value={insuranceFormData[option]?.sumAssured || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "sumAssured", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Mode</Form.Label>
                <Form.Control
                  type="text"
                  value={insuranceFormData[option]?.mode || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "mode", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Premium</Form.Label>
                <Form.Control
                  type="number"
                  value={insuranceFormData[option]?.premium || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "premium", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={insuranceFormData[option]?.startDate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "startDate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Maturity Date</Form.Label>
                <Form.Control
                  type="date"
                  value={insuranceFormData[option]?.maturityDate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "insurance", "maturityDate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            {/* <Col md={6}>
              <Form.Group>
                <Form.Label>Upload Document</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    handleFileChange(option, "insurance", e.target.files[0])
                  }
                />
              </Form.Group>
            </Col> */}
            <Col md={6}>
  <Form.Group>
    <Form.Label>Upload Document</Form.Label>
    <Form.Control
      type="file"
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFileChange(option, "insurance", e.target.files[0]);
        } else {
          handleFileChange(option, "insurance", null);
        }
      }}
    />
  </Form.Group>
</Col>
          </Row>
          <Button
            variant="primary"
            className="me-2 mt-2"
            onClick={() => handleSaveForm(option, "insurance")}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => handleCloseForm(option, "insurance")}
          >
            Close
          </Button>
        </div>
      ))}

      {/* Investment Forms */}
      {openInvestments.map((option) => (
        <div key={option} className="border p-3 mb-3">
          <h5 className="text-success">{option} Investment</h5>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Submission Date</Form.Label>
                <Form.Control
                  type="date"
                  value={investmentFormData[option]?.submissionDate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "investment", "submissionDate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Member Name</Form.Label>
                <Form.Control
                  type="text"
                  value={investmentFormData[option]?.memberName || ""}
                  onChange={(e) =>
                    handleFormChange(option, "investment", "memberName", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Financial Product</Form.Label>
                <Form.Control
                  type="text"
                  value={investmentFormData[option]?.financialProduct || ""}
                  onChange={(e) =>
                    handleFormChange(option, "investment", "financialProduct", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={investmentFormData[option]?.companyName || ""}
                  onChange={(e) =>
                    handleFormChange(option, "investment", "companyName", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Plan Name</Form.Label>
                <Form.Control
                  type="text"
                  value={investmentFormData[option]?.planName || ""}
                  onChange={(e) =>
                    handleFormChange(option, "investment", "planName", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={investmentFormData[option]?.amount || ""}
                  onChange={(e) =>
                    handleFormChange(option, "investment", "amount", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={investmentFormData[option]?.startDate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "investment", "startDate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Maturity Date</Form.Label>
                <Form.Control
                  type="date"
                  value={investmentFormData[option]?.maturityDate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "investment", "maturityDate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            {/* <Col md={6}>
              <Form.Group>
                <Form.Label>Upload Document</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    handleFileChange(option, "investment", e.target.files[0])
                  }
                />
              </Form.Group>
            </Col> */}
            <Col md={6}>
  <Form.Group>
    <Form.Label>Upload Document</Form.Label>
    <Form.Control
      type="file"
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFileChange(option, "investment", e.target.files[0]);
        } else {
          handleFileChange(option, "investment", null);
        }
      }}
    />
  </Form.Group>
</Col>
          </Row>
          <Button
            variant="primary"
            className="me-2 mt-2"
            onClick={() => handleSaveForm(option, "investment")}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => handleCloseForm(option, "investment")}
          >
            Close
          </Button>
        </div>
      ))}

      {/* Loan Forms */}
      {openLoans.map((option) => (
        <div key={option} className="border p-3 mb-3">
          <h5 className="text-danger">{option} Loan</h5>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Submission Date</Form.Label>
                <Form.Control
                  type="date"
                  value={loanFormData[option]?.submissionDate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "submissionDate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Member Name</Form.Label>
                <Form.Control
                  type="text"
                  value={loanFormData[option]?.memberName || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "memberName", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Loan Type</Form.Label>
                <Form.Control
                  type="text"
                  value={loanFormData[option]?.loanType || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "loanType", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={loanFormData[option]?.companyName || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "companyName", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Loan Account Number</Form.Label>
                <Form.Control
                  type="text"
                  value={loanFormData[option]?.loanAccountNumber || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "loanAccountNumber", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Outstanding Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={loanFormData[option]?.outstandingAmount || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "outstandingAmount", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Interest Rate (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={loanFormData[option]?.interestRate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "interestRate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Term</Form.Label>
                <Form.Control
                  type="text"
                  value={loanFormData[option]?.term || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "term", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={loanFormData[option]?.startDate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "startDate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Maturity Date</Form.Label>
                <Form.Control
                  type="date"
                  value={loanFormData[option]?.maturityDate || ""}
                  onChange={(e) =>
                    handleFormChange(option, "loan", "maturityDate", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            {/* <Col md={6}>
              <Form.Group>
                <Form.Label>Upload Document</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    handleFileChange(option, "loan", e.target.files[0])
                  }
                />
              </Form.Group>
            </Col> */}

            <Col md={6}>
  <Form.Group>
    <Form.Label>Upload Document</Form.Label>
    <Form.Control
      type="file"
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFileChange(option, "loan", e.target.files[0]);
        } else {
          handleFileChange(option, "loan", null);
        }
      }}
    />
  </Form.Group>
</Col>

          </Row>
          <Button
            variant="primary"
            className="me-2 mt-2"
            onClick={() => handleSaveForm(option, "loan")}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => handleCloseForm(option, "loan")}
          >
            Close
          </Button>
        </div>
      ))}

      <Button type="submit" className="btn btn-primary">
        Submit All
      </Button>
    </Form>
  );
};

export default FinancialInformationFormForProspect;