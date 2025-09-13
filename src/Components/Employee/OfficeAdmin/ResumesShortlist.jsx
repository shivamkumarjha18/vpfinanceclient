import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResumesShortlist = () => {
  const originalData = [
    {
      id: 1,
      name: 'Abhishek Meena',
      mobile: '9999999999',
      email: 'abhishek@example.com',
      city: 'Bhopal',
      linkedin: 'https://linkedin.com/in/abhishekmeena',
      department: 'MERN Developer',
      resume: 'Resume.pdf',
      date: '2025-05-12',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Ravi Sharma',
      mobile: '8888888888',
      email: 'ravi@example.com',
      city: 'Indore',
      linkedin: 'https://linkedin.com/in/ravisharma',
      department: 'React Developer',
      resume: 'Resume2.pdf',
      date: '2025-05-11',
      status: 'Shortlisted',
    },
    // Add more as needed
  ];

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(originalData);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filtered = originalData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.city.toLowerCase().includes(searchTerm) ||
      item.department.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Mobile',
      selector: row => row.mobile,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'City',
      selector: row => row.city,
      sortable: true
    },
    {
      name: 'Linkedin',
      selector: row => <a href={row.linkedin} target="_blank" rel="noopener noreferrer">{row.linkedin}</a>,
      sortable: false
    },
    {
      name: 'Department',
      selector: row => row.department,
      sortable: true
    },
    {
      name: 'Resume',
      selector: row => <a href={`/${row.resume}`} target="_blank" rel="noopener noreferrer">Download</a>,
      sortable: false
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true
    },
    {
      name: 'Status',
      selector: row => (
        <select defaultValue={row.status} className="form-select form-select-sm">
          <option value="Pending">Pending</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      )
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#ECECEC',
        color: 'black',
        fontWeight: 'bold'
      }
    }
  };

  return (
    <section className=" mt-4">
      <div className="card shadow">
        <div className="card-header bg- text-black d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Career Enquiry - Resume Shortlist</h4>
          <input
            type="text"
            placeholder="Search by Name, Email, City, Dept."
            className="form-control w-50"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="card-body">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            responsive
            highlightOnHover
            striped
            customStyles={customStyles}
          />
        </div>
      </div>
    </section>
  );
};

export default ResumesShortlist;
