
import React from "react";

const AppointmentComponent = () => {
  const appointments = [
    {
      // id: 0,
      // name: "Pradumn Goswami",
      // mobile: "7415669067",
      // organisation: "Freelancer",
      // designation: "Developer",
      // address: "Govind garden hno 53, Anmol Homes, Raisen",
      // area: "BHOPAL",
      // purpose: "Portfolio",
      // remark: "Appointment Done!",
      // date: "2024-06-22",
    },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <div>
          Show&nbsp;
          <select className="entries-dropdown">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          &nbsp;entries
        </div>
        <input type="text" className="search-box" placeholder="Search..." />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>G</th>
            <th>Suspect Name</th>
            <th>Mobile</th>
            <th>Organisation</th>
            <th>Designation</th>
            <th>Resident Address</th>
            <th>Area</th>
            <th>Purpose</th>
            <th>Remark</th>
            <th>Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td className="link">{app.name}</td>
              <td>{app.mobile}</td>
              <td>{app.organisation}</td>
              <td>{app.designation}</td>
              <td>{app.address}</td>
              <td>{app.area}</td>
              <td>{app.purpose}</td>
              <td>{app.remark}</td>
              <td>{app.date}</td>
              <td>✏</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <span>Showing 1 to 1 of 1 entries</span>
        <div className="pagination">
          <button disabled>Previous</button>
          <span>1</span>
          <button disabled>Next</button>
        </div>
      </div>

      <style jsx>{`
        .table-container {
          background: #fff;
          border-radius: 6px;
          padding: 15px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          font-family: "Segoe UI", sans-serif;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-size: 13px;
        }

        .entries-dropdown {
          padding: 3px 6px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .search-box {
          padding: 5px 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 13px;
        }

        table.data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .data-table th,
        .data-table td {
          padding: 8px;
          border: 1px solid #e0e0e0;
          text-align: left;
        }

        .data-table th {
          background: #f4f6f9;
          font-weight: bold;
        }

        .link {
          color: #3498db;
          cursor: pointer;
          font-weight: 500;
        }

        .table-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #555;
        }

        .pagination {
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .pagination button {
          padding: 3px 8px;
          border: none;
          border-radius: 3px;
          background: #3c8dbc;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
        }

        .pagination button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default AppointmentComponent;