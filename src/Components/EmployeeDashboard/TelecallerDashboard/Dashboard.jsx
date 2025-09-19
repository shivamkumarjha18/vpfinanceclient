import React from "react";

const DashboardPage = () => {
  const stats = [
    { title: "Balance Leads", value: 3, color: "#7C3AED" },
    { title: "Calling Done", value: 2, color: "#3B82F6" },
    { title: "Forwarded Leads", value: 2, color: "#F97316" },
    { title: "Rejected Leads", value: 0, color: "#EF4444" },
    { title: "Appointments Done", value: 0, color: "#10B981" },
  ];

  const tasks = [
    {
      date: "2025-07-12",
      name: "Manoj Verma (Govt. Emp.)",
      org: "—",
      area: "—",
      mobile: "7987622690",
      purpose: "Portfolio",
      status: "HDFC ERGO Due month 3 saal ka ek sath me liya hai",
      remark: "—",
      taskStatus: "Update",
    },
    {
      date: "2025-06-11",
      name: "Pradeep Enterprises",
      org: "—",
      area: "—",
      mobile: "8889996171",
      purpose: "Portfolio",
      status: "TATA Due Month 2 Saal ka ek sath karaya hai",
      remark: "—",
      taskStatus: "Forward",
    },
    {
      date: "2025-05-08",
      name: "RAHUL ROOPOLIA",
      org: "—",
      area: "—",
      mobile: "9229201469",
      purpose: "Life Insurance",
      status: "Life Insurance Others",
      remark: "HDFC ERGO Due Month nhi hota hai mera 5 saal ka ek sath jama hota hai",
      taskStatus: "Close",
    },
    {
      date: "2025-05-08",
      name: "RAHUL ROOPOLIA",
      org: "—",
      area: "—",
      mobile: "9229201469",
      purpose: "Life Insurance",
      status: "HDFC ERGO Due Month 5 saal me ek sath hota hai",
      remark: "—",
      taskStatus: "Forward",
    },
    {
      date: "2025-04-25",
      name: "PRABHUDDH KAUSHAL",
      org: "—",
      area: "—",
      mobile: "7620000508",
      purpose: "Portfolio",
      status: "Others",
      remark: "TATA Due Month 25 May Abhi renewal karaya hai",
      taskStatus: "Close",
    },
    {
      date: "2025-04-01",
      name: "PRADEEP MAJHI",
      org: "—",
      area: "—",
      mobile: "735478640",
      purpose: "Portfolio",
      status: "Others",
      remark: "Star health Due Month April (Renewal ho gaya hai) next year call",
      taskStatus: "Update",
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="stat-card"
            style={{ borderTop: `4px solid ${stat.color}` }}
          >
            <div className="stat-value">{stat.value}</div>
            <div className="stat-title">{stat.title}</div>
            <a href="#" className="more-info">More info ⓘ</a>
          </div>
        ))}
      </div>

      {/* Calls Table */}
      <div className="table-container">
        <h2 className="table-title">Previous Call Task</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Date</th>
              <th>Suspect Name</th>
              <th>Org Name</th>
              <th>Area</th>
              <th>Mobile</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Remark</th>
              <th>Call Back</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={idx}>
                <td>{task.date}</td>
                <td>{task.name}</td>
                <td>{task.org}</td>
                <td>{task.area}</td>
                <td>{task.mobile}</td>
                <td>{task.purpose}</td>
                <td>{task.status}</td>
                <td>{task.remark}</td>
                <td>
                  <div className="button-group">
                    <button
                      className={task.taskStatus === "Forward" ? "active-btn" : "inactive-btn"}
                    >
                      Forward
                    </button>
                    <button
                      className={task.taskStatus === "Close" ? "active-btn" : "inactive-btn"}
                    >
                      Close
                    </button>
                    <button
                      className={task.taskStatus === "Update" ? "active-btn" : "inactive-btn"}
                    >
                      Update
                    </button>
                    <button className="callback-btn">Call Back</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Style */}
      <style jsx>{`
        .dashboard-page {
          padding: 15px;
          font-family: Arial, sans-serif;
          background: #f5f7fa;
          min-height: 100vh;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(120px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        .stat-card {
          background: #fff;
          border-radius: 6px;
          padding: 12px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
        }
        .stat-value {
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }
        .stat-title {
          font-size: 12px;
          color: #666;
          margin-top: 6px;
        }
        .more-info {
          display: block;
          margin-top: 6px;
          color: #666;
          text-decoration: none;
          font-size: 10px;
        }
        .more-info:hover {
          color: #000;
        }
        .table-container {
          background: #fff;
          border-radius: 6px;
          padding: 15px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .table-title {
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
        }
        .task-table {
          width: 100%;
          border-collapse: collapse;
        }
        .task-table th,
        .task-table td {
          padding: 8px;
          border: 1px solid #ddd;
          text-align: left;
          font-size: 12px;
        }
        .task-table th {
          background: #f0f2f5;
          font-weight: 600;
        }
        .task-table td {
          vertical-align: top;
        }
        .button-group {
          display: flex;
          gap: 3px;
        }
        .active-btn {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 3px 6px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 10px;
        }
        .active-btn:hover {
          background: #45a049;
        }
        .inactive-btn {
          background: #e0e0e0;
          color: #666;
          border: none;
          padding: 3px 6px;
          border-radius: 3px;
          cursor: not-allowed;
          font-size: 10px;
        }
        .callback-btn {
          background: #2196F3;
          color: white;
          border: none;
          padding: 3px 6px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 10px;
        }
        .callback-btn:hover {
          background: #1976D2;
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .task-table th,
          .task-table td {
            font-size: 10px;
            padding: 6px;
          }
          .table-container {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;

