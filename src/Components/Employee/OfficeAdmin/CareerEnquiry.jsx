import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialData = [
  {
    id: 1,
    name: "Asheesh kumar mishra",
    mobile: "7340452648",
    email: "masheesh2000@gmail.com",
    city: "SAGAR",
    linkedin: "https://www.linkedin.com/in/gourav-nayar-12076a290",
    department: "Sales & Business Development",
      resume: "../../resume/Souheb Ahmed -Accounts- pg-04-12-2023.docx",
    date: "2024-02-07",
    status: "Pending",
  },
  {
    id: 2,
    name: "Souheb Ahmed",
    mobile: "6261946857",
    email: "ahmedsouheb1@gmail.com",
    city: "Bhopal",
    linkedin: "https://www.linkedin.com/in/gourav-nayar-12076a290",
    department: "Accounts",
    resume: "../../resume/Souheb Ahmed -Accounts- pg-04-12-2023.docx",
    date: "2024-02-07",
    status: "Pending",
  },
  {
    id: 3,
    name: "Gourav Nayar",
    mobile: "7509466263",
    email: "gouravnayar1999@gmail.com",
    city: "Indore",
    linkedin: "https://www.linkedin.com/in/gourav-nayar-12076a290",
    department: "Technology",
    resume: "../../resume/GOURAV NAYAR (1).pdf",
    date: "2023-12-26",
    status: "Resume Shortlist",
  },
  {
    id: 4,
    name: "Pranjal Gurjar",
    mobile: "9977903350",
    email: "pranjalgurjar.gurjar338@gmail.com",
    city: "Bhopal",
    linkedin: "www.linkedin.com/in/pranjal-gurjar-524496219",
    department: "Accounts",
    resume: "../../resume/pranjal resume.pdf",
    date: "2023-12-17",
    status: "Reject",
  },
];

const CareerEnquiry = () => {
  const [data, setData] = useState(initialData);

  const handleStatusChange = (id, newStatus) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: row => row.mobile,
    },
    {
      name: "Email",
      selector: row => row.email,
    },
    {
      name: "City",
      selector: row => row.city,
    },
    {
      name: "LinkedIn",
      cell: row =>
        row.linkedin ? (
          <a href={row.linkedin} target="_blank" rel="noopener noreferrer">
            Profile
          </a>
        ) : (
          "-"
        ),
    },
    {
      name: "Department",
      selector: row => row.department,
    },
    {
      name: "Resume",
      cell: row =>
        row.resume ? (
          <a href={row.resume} target="_blank" rel="noopener noreferrer">
            View
          </a>
        ) : (
          "-"
        ),
    },
    {
      name: "Date",
      selector: row => row.date,
    },
    {
      name: "Status",
      cell: row => (
        <select
          className="form-select form-select-sm"
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Resume Shortlist">Resume Shortlist</option>
          <option value="Reject">Reject</option>
        </select>
      ),
    },
  ];

  return (
    <div className=" mt-2">
      <h4 className="mb-4">Career Enquiry</h4>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        responsive
        striped
      />
    </div>
  );
};

export default CareerEnquiry;
