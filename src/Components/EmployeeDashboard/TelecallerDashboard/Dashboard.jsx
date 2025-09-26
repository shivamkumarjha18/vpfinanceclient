
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllSuspects } from "../../../redux/feature/SuspectRedux/SuspectThunx";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { suspects = [], loading, error } = useSelector((state) => state.suspect);

  // State for action panel (Forward / Close / Call Back)
  const [actionPanel, setActionPanel] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    nextCallDate: "",
    time: "",
    remark: "",
  });

  // 🔥 NEW: Assigned suspects state
  const [assignedSuspects, setAssignedSuspects] = useState([]);
  const [assignedLoading, setAssignedLoading] = useState(false);
  const [assignedError, setAssignedError] = useState(null);
  const [activeTab, setActiveTab] = useState("today"); // today | assigned

  // 🔥 Get telecaller ID from localStorage or Redux (adjust as per your auth system)
 const user = JSON.parse(localStorage.getItem("user")); // object milega
const telecallerId = user?.id || null;

console.log(telecallerId)
  useEffect(() => {
    dispatch(getAllSuspects());
    fetchAssignedSuspects(); // ✅ Fetch assigned suspects on mount
  }, [dispatch]);

  // 🔥 Fetch assigned suspects for current telecaller
  const fetchAssignedSuspects = async () => {
    if (!telecallerId) {
      console.warn("Telecaller ID not found");
      return;
    }

    setAssignedLoading(true);
    setAssignedError(null);

    try {
      const response = await fetch(`https://vpfinance2.onrender.com/api/telecaller/${telecallerId}/assigned-suspects`);
      const result = await response.json();

      if (response.ok && result.success) {
        setAssignedSuspects(result.data.assignedSuspects || []);
        console.log("Assigned suspects fetched:", result.data);
      } else {
        setAssignedError(result.message || "Failed to fetch assigned suspects");
        console.error("API Error:", result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setAssignedError("Network error. Please try again.");
    } finally {
      setAssignedLoading(false);
    }
  };

  // Dummy summary counts
  const todaySummary = {
    balanceLeads: 3,
    callingDone: 0,
    forwardedLeads: 0,
    rejectedLeads: 0,
    appointmentsDone: 0,
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted:", {
      ...formData,
      action: actionPanel?.type,
      suspect: actionPanel?.suspect,
    });
    alert(`✅ ${actionPanel?.type} submitted for ${actionPanel?.suspect.personalDetails?.name}`);
    setActionPanel(null);
    setFormData({ status: "", nextCallDate: "", time: "", remark: "" });
  };

  return (
    <div className="dashboard-page">
      {/* ---- Action Panel ---- */}
      {actionPanel && (
        <div className="action-panel">
          <div className="action-header">
            <span>
              📩 {actionPanel.suspect.personalDetails?.name || "-"}{" "}
              <b>({actionPanel.type.toUpperCase()})</b>
            </span>
            <button className="close-btn" onClick={() => setActionPanel(null)}>✖</button>
          </div>

          <div className="action-body">
            {/* ✅ Forward Form */}
            {actionPanel.type === "forward" && (
              <>
                <div className="form-row">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                  >
                    <option value="">-- Select --</option>
                    <option value="Call Not Picked">Call Not Picked</option>
                    <option value="Call After Some Time">Call After Some Time</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-row">
                  <label>Next Call Date</label>
                  <input
                    type="date"
                    name="nextCallDate"
                    value={formData.nextCallDate}
                    onChange={handleFormChange}
                  />
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-row">
                  <label>Remark</label>
                  <input
                    type="text"
                    name="remark"
                    value={formData.remark}
                    onChange={handleFormChange}
                    style={{ width: "90%" }}
                  />
                </div>
              </>
            )}

            {/* ✅ Close Form */}
            {actionPanel.type === "close" && (
              <>
                <div className="form-row">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                  >
                    <option value="">-- Select --</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-row">
                  <label>Remark</label>
                  <input
                    type="text"
                    name="remark"
                    value={formData.remark}
                    onChange={handleFormChange}
                    style={{ width: "90%" }}
                  />
                </div>
              </>
            )}

            {/* ✅ Callback Form */}
            {actionPanel.type === "callback" && (
              <div className="form-row">
                <label>Remark</label>
                <input
                  type="text"
                  name="remark"
                  value={formData.remark}
                  onChange={handleFormChange}
                  style={{ width: "90%" }}
                />
              </div>
            )}

            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}

      {/* ---- Today's Call Section ---- */}
      <h2 className="table-title">Today Call Task</h2>
      <div className="today-call-cards">
        <div className="card purple" onClick={() => navigate("/telecaller/balance-leads")}>
          <h3>{todaySummary.balanceLeads}</h3>
          <p>Balance Leads</p>
        </div>
        <div className="card blue" onClick={() => navigate("/telecaller/calling-done")}>
          <h3>{todaySummary.callingDone}</h3>
          <p>Calling Done</p>
        </div>
        <div className="card orange" onClick={() => navigate("/telecaller/forwarded-leads")}>
          <h3>{todaySummary.forwardedLeads}</h3>
          <p>Forwarded Leads</p>
        </div>
        <div className="card red" onClick={() => navigate("/telecaller/rejected-leads")}>
          <h3>{todaySummary.rejectedLeads}</h3>
          <p>Rejected Leads</p>
        </div>
        <div className="card green" onClick={() => navigate("/telecaller/appointments-done")}>
          <h3>{todaySummary.appointmentsDone}</h3>
          <p>Appointments Done</p>
        </div>
      </div>

      {/* 🔥 NEW: Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Previous Call Task
        </button>
        <button 
          className={`tab-btn ${activeTab === 'assigned' ? 'active' : ''}`}
          onClick={() => setActiveTab('assigned')}
        >
          My Assigned Suspects ({assignedSuspects.length})
        </button>
        <button 
          className="refresh-btn"
          onClick={fetchAssignedSuspects}
          disabled={assignedLoading}
        >
          {assignedLoading ? "🔄" : "↻"} Refresh
        </button>
      </div>

      {/* ---- Previous Call Task / Assigned Suspects Table ---- */}
      <div className="table-container mt-3">
        {activeTab === 'today' && (
          <>
            <h2 className="table-title">Previous Call Task</h2>
            {loading ? (
              <div className="text-center mt-4">
                <Spinner animation="border" />
              </div>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <table className="task-table">
                <thead>
                  <tr>
                    <th>Update</th>
                    <th>Task Date</th>
                    <th>Suspect Name</th>
                    <th>Organisation Name</th>
                    <th>Area</th>
                    <th>Mobile</th>
                    <th>Calling Purpose</th>
                    <th>Calling Status</th>
                    <th>Remark</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {suspects.map((suspect) => {
                    const personal = suspect.personalDetails || {};
                    const contact = suspect.contactInfo || {};
                    const call = suspect.callSummary || {};
                    const fullName = `${personal.salutation || ""} ${personal.groupName || personal.name || ""}`.trim();

                    return (
                      <tr key={suspect._id}>
                        <td>
                          <a href={`tel:${personal.contactNo || contact.mobileNo}`} className="btn-sm btn-call">
                            📞
                          </a>
                          <button
                            className="btn-sm btn-success"
                            onClick={() => setActionPanel({ type: "forward", suspect })}
                          >
                            Forward
                          </button>
                          <button
                            className="btn-sm btn-danger"
                            onClick={() => setActionPanel({ type: "close", suspect })}
                          >
                            Close
                          </button>
                        </td>
                        <td>{new Date(suspect.createdAt).toLocaleDateString()}</td>
                        <td
                          className="clickable"
                          onClick={() =>
                            navigate(`/telecaller/suspect/edit/${suspect._id}`)
                          }
                        >
                          {fullName || "-"}
                        </td>
                        <td>{personal.organisation || "-"}</td>
                        <td>{personal.city || "-"}</td>
                        <td>{personal.contactNo || contact.mobileNo || "-"}</td>
                        <td>{call.purpose || "-portfolio"}</td>
                        <td>{call.status || "Call Not Picked"}</td>
                        <td>{call.remark || "-"}</td>
                        <td>
                          <button
                            className="btn-sm btn-primary"
                            onClick={() => setActionPanel({ type: "callback", suspect })}
                          >
                            Call Back
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}

        {/* 🔥 NEW: Assigned Suspects Table */}
     {activeTab === 'assigned' && (
  <>
    <h2 className="table-title">My Assigned Suspects</h2>
    {assignedLoading ? (
      <div className="text-center mt-4">
        <Spinner animation="border" />
        <p>Loading assigned suspects...</p>
      </div>
    ) : assignedError ? (
      <div className="text-center mt-4">
        <p className="text-danger">{assignedError}</p>
        <button className="btn-sm btn-primary" onClick={fetchAssignedSuspects}>
          Retry
        </button>
      </div>
    ) : assignedSuspects.length === 0 ? (
      <div className="text-center mt-4">
        <p>No suspects assigned to you yet.</p>
      </div>
    ) : (
      <table className="task-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Assigned Date</th>
            <th>Suspect Name</th>
            <th>Organisation</th>
            <th>Area</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {assignedSuspects.map((suspect) => {
            const personal = suspect.personalDetails || {};
            const fullName = `${personal.salutation || ""} ${personal.groupName || personal.name || ""}`.trim();

            return (
              <tr key={suspect._id}>
                <td>
                  <a href={`tel:${personal.contactNo}`} className="btn-sm btn-call">
                    📞
                  </a>
                  <button
                    className="btn-sm btn-success"
                    onClick={() => setActionPanel({ type: "forward", suspect })}
                  >
                    Forward
                  </button>
                  <button
                    className="btn-sm btn-primary"
                    onClick={() => setActionPanel({ type: "callback", suspect })}
                  >
                    Call Back
                  </button>
                </td>
                {/* 🔥 Updated Assigned Date with date + time */}
                <td>
                  {suspect.assignedAt
                    ? new Date(suspect.assignedAt).toLocaleString()
                    : "-"}
                </td>
                <td
                  className="clickable"
                  onClick={() => navigate(`/telecaller/suspect/edit/${suspect._id}`)}
                >
                  {fullName || "-"}
                </td>
                <td>{personal.organisation || "-"}</td>
                <td>{personal.city || "-"}</td>
                <td>{personal.contactNo || "-"}</td>
                <td>
                  <span className={`status-badge ${suspect.status || 'new'}`}>
                    {suspect.status || "New"}
                  </span>
                </td>
                <td>{personal.remark || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </>
)}

      </div>

      {/* ---- Updated Styles ---- */}
      <style jsx>{`
        .dashboard-page {
          padding: 15px;
          font-family: Arial, sans-serif;
          background: #f5f7fa;
          min-height: 100vh;
        }

        /* ---- Action Panel ---- */
        .action-panel {
          background: #fff;
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .action-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          background: #f8fafc;
          padding: 8px 12px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .close-btn {
          background: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }
        .action-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .form-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .form-row label {
          min-width: 100px;
          font-size: 13px;
        }
        .form-row input,
        .form-row select {
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 13px;
        }
        .submit-btn {
          background: #f59e0b;
          border: none;
          color: #fff;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          margin-top: 8px;
          width: 100px;
        }
        .submit-btn:hover {
          background: #d97706;
        }
/* ---- Today's Call Cards ---- */
        .today-call-cards {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }
        .card {
          flex: 1;
          padding: 15px;
          border-radius: 6px;
          color: #fff;
          text-align: center;
          font-weight: bold;
          cursor: pointer;
        }
        .card:hover {
          opacity: 0.9;
        }
        .card h3 {
          margin: 0;
          font-size: 22px;
        }
        .card p {
          margin: 0;
          font-size: 13px;
        }
        .purple { background: #6f42c1; }
        .blue { background: #007bff; }
        .orange { background: #fd7e14; }
        .red { background: #dc3545; }
        .green { background: #28a745; }

        /* ---- Previous Call Table ---- */
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

        /* ---- Utility Buttons ---- */
        .btn-sm {
          padding: 4px 8px;
          font-size: 11px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }
        .btn-success { background: #28a745; color: #fff; }
        .btn-danger { background: #dc3545; color: #fff; }
        .btn-primary { background: #007bff; color: #fff; }

        .clickable { color: #007bff; cursor: pointer; }
        .clickable:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default DashboardPage;


