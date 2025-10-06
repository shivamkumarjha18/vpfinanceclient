
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllSuspects } from "../../../redux/feature/SuspectRedux/SuspectThunx";

const DashboardPage = () => {
  const bcnt = useSelector((state) => state.dashboard.bcnt);
  const cdcnt = useSelector((state) => state.dashboard.cdcnt);
  const flcnt = useSelector((state) => state.dashboard.flcnt);
  const rlcnt = useSelector((state) => state.dashboard.rlcnt);
  const adcnt = useSelector((state) => state.dashboard.adcnt);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { suspects = [], loading, error } = useSelector((state) => state.suspect);

  const [actionPanel, setActionPanel] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    nextCallDate: "",
    time: "",
    remark: "",
  });

  const [assignedSuspects, setAssignedSuspects] = useState([]);
  const [assignedLoading, setAssignedLoading] = useState(false);
  const [assignedError, setAssignedError] = useState(null);

  const [activeTab, setActiveTab] = useState("assigned"); // assigned | previous

  const user = JSON.parse(localStorage.getItem("user"));
  const telecallerId = user?.id || null;

  useEffect(() => {
    dispatch(getAllSuspects());
    fetchAssignedSuspects();
  }, [dispatch]);

  const fetchAssignedSuspects = async () => {
    if (!telecallerId) return;

    setAssignedLoading(true);
    setAssignedError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/telecaller/${telecallerId}/assigned-suspects`
      );
      const result = await response.json();

      if (response.ok && result.success) {
        const sortedData = (result.data.assignedSuspects || []).sort(
          (a, b) => new Date(b.assignedAt) - new Date(a.assignedAt)
        );
        setAssignedSuspects(sortedData);
      } else {
        setAssignedError(result.message || "Failed to fetch assigned suspects");
      }
    } catch (error) {
      setAssignedError("Network error. Please try again.");
    } finally {
      setAssignedLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const updateStatus = async (suspectId, actionType) => {
  const { nextCallDate, time, remark, status } = formData;

  try {
    let endpoint = "";
    let body = {};

    if (actionType === "forward") {
      endpoint = `http://localhost:8080/api/suspect/${suspectId}/call-task`; // Use the call-task endpoint
      body = {
        taskDate: nextCallDate, // Match the field name from handleSubmit2
        taskTime: time,        // Match the field name from handleSubmit2
        taskRemarks: remark,   // Match the field name from handleSubmit2
        taskStatus: status , // Default status for forward action
      };
      const response = await fetch(endpoint, {
        method: "POST", // Use POST as in handleSubmit2
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("Forward successful");
          fetchAssignedSuspects(); // Refresh the list
          setActionPanel(null);
          setFormData({ status: "", nextCallDate: "", time: "", remark: "" });
        } else {
          console.error("Failed to forward call task:", data.message);
          setAssignedError(`Failed to forward: ${data.message || "Unknown error"}`);
        }
      } else {
        const errorText = await response.text();
        console.error("HTTP error:", errorText);
        setAssignedError(`HTTP error: ${errorText || "Failed to connect to server"}`);
      }
    } else if (actionType === "close") {
      endpoint = `http://localhost:8080/api/suspect/${suspectId}/call-task`;
      body = {
        taskDate: new Date().toISOString().split('T')[0], // Match the field name from handleSubmit2
        taskTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),        // Match the field name from handleSubmit2
        taskRemarks: remark,   // Match the field name from handleSubmit2
        taskStatus: status , // Default status for forward action
      };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Close successful");
        fetchAssignedSuspects(); // Refresh the list
        setActionPanel(null);
        setFormData({ status: "", nextCallDate: "", time: "", remark: "" });
      } else {
        setAssignedError(result.message || `Failed to close suspect`);
      }
    } else if (actionType === "callback") {
      endpoint = `http://localhost:8080/api/suspect/${suspectId}/call-task`;
     body = {
        taskDate: new Date().toISOString().split('T')[0], // Match the field name from handleSubmit2
        taskTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),        // Match the field name from handleSubmit2
        taskRemarks: remark,   // Match the field name from handleSubmit2
        taskStatus: "Callback" , // Default status for forward action
      };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Callback successful");
        fetchAssignedSuspects(); // Refresh the list
        setActionPanel(null);
        setFormData({ status: "", nextCallDate: "", time: "", remark: "" });
      } else {
        setAssignedError(result.message || `Failed to set callback`);
      }
    }
  } catch (error) {
    console.error(`Error in ${actionType} action:`, error);
    setAssignedError("Network error. Please try again.");
  }
}; 

  const handleSubmit = () => {
    if (actionPanel?.suspect?._id && actionPanel.type) {
      updateStatus(actionPanel.suspect._id, actionPanel.type);
    }
  };

  return (
    <div className="dashboard-page">
      {/* ---- Today's Call Section ---- */}
      <h2 className="table-title">Today Call </h2>
      <div className="today-call-cards">
        <div
          className="card purple"
          onClick={() => navigate("/telecaller/balance-leads")}
        >
          <h3>{bcnt}</h3>
          <p>Balance Leads </p>
        </div>
        <div
          className="card blue"
          onClick={() => navigate("/telecaller/calling-done")}
        >
          <h3>{cdcnt}</h3>
          <p>Calling Done</p>
        </div>
        <div
          className="card orange"
          onClick={() => navigate("/telecaller/forwarded-leads")}
        >
          <h3>{flcnt}</h3>
          <p>Forwarded Leads</p>
        </div>
        <div
          className="card red"
          onClick={() => navigate("/telecaller/rejected-leads")}
        >
          <h3>{rlcnt}</h3>
          <p>Rejected Leads</p>
        </div>
        <div
          className="card green"
          onClick={() => navigate("/telecaller/appointments-done")}
        >
          <h3>{adcnt}</h3>
          <p>Appointments Done</p>
        </div>
             <div
          className="card green"
          onClick={() => navigate("/telecaller/Callback")}
        >
          <h3>{0}</h3>
          <p>callback</p>
        </div>
      </div>

      {/* ---- Tab Navigation ---- */}
      <div className="tab-nav">
        <button
          className={activeTab === "assigned" ? "active" : ""}
          onClick={() => setActiveTab("assigned")}
        >
          Assigned Suspects
        </button>
        <button
          className={activeTab === "previous" ? "active" : ""}
          onClick={() => setActiveTab("previous")}
        >
          Previous Call Task
        </button>
      </div>

      {/* ---- Tab Content ---- */}
      {activeTab === "assigned" && (
        <div className="assigned-suspects">
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="refresh-btn"
              onClick={fetchAssignedSuspects}
              disabled={assignedLoading}
            >
              {assignedLoading ? "🔄 Loading..." : "↻ Refresh"}
            </button>
          </div>

          <div className="table-container mt-3">
            {assignedLoading ? (
              <div className="text-center mt-4">
                <Spinner animation="border" />
                <p>Loading assigned suspects...</p>
              </div>
            ) : assignedError ? (
              <div className="text-center mt-4">
                <p className="text-danger">{assignedError}</p>
              </div>
            ) : assignedSuspects.length === 0 ? (
              <div className="text-center mt-4">
                <p>No suspects assigned to you yet.</p>
              </div>
            ) : (
              <table className="task-table">
                <thead>
                  <tr>
                    <th>Assigned Date</th>
                    <th>Suspect Name</th>
                    <th>Organisation</th>
                    <th>Area</th>
                    <th>Mobile</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedSuspects.map((suspect) => {
                    const personal = suspect.personalDetails || {};
                    const fullName = `${personal.salutation || ""} ${personal.groupName || personal.name || ""}`.trim();

                    return (
                      <tr key={suspect._id}>
                        <td>
                          {suspect.assignedAt
                            ? new Date(suspect.assignedAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }).replace(/\//g, "/")
                            : "-"}
                        </td>
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
                        <td>{personal.contactNo || "-"}</td>
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
                            className="btn-sm btn-danger"
                            onClick={() => setActionPanel({ type: "close", suspect })}
                          >
                            Close
                          </button>
                          <button
                            className="btn-sm btn-primary"
                            onClick={() => setActionPanel({ type: "callback", suspect })}
                          >
                            Callback
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

   {activeTab === "previous" && (
  <div className="previous-task">
    <div className="table-container mt-3">
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p>Loading call history...</p>
        </div>
      ) : error ? (
        <div className="text-center mt-4">
          <p className="text-danger">{error}</p>
        </div>
      ) : suspects.length === 0 ? (
        <div className="text-center mt-4">
          <p>No call history available.</p>
        </div>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Date</th>
              <th>Suspect Name</th>
              <th>Mobile</th>
              <th>Organisation</th>
              <th>Area</th>
              <th>Status</th>
              <th>Remark</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suspects
              .flatMap((suspect) => {
                const personal = suspect.personalDetails || {};
                const fullName = `${personal.salutation || ""} ${personal.groupName || personal.name || ""}`.trim();
                return (suspect.callTasks || []).map((task) => ({
                  ...task,
                  suspectId: suspect._id,
                  name: fullName,
                  contactNo: personal.contactNo || "-",
                  organisation: personal.organisation || "-",
                  city: personal.city || "-",
                }));
              })
              .sort((a, b) => {
                const dateA = new Date(a.taskDate || "1970-01-01");
                const dateB = new Date(b.taskDate || "1970-01-01");
                if (dateB.getTime() !== dateA.getTime()) {
                  return dateB - dateA; // Sort by date in descending order
                }
                return b.taskTime?.localeCompare(a.taskTime) || 0; // Then by time in descending order
              })
              .filter((task) => !["Not Reachable", "Wrong Number", "Not Interested", "Appointment Done"].includes(task.taskStatus))
              .map((task, idx) => (
                <tr key={`${task.suspectId}-${idx}`}>
                  <td>
                    {task.taskDate
                      ? new Date(task.taskDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).replace(/\//g, "/")
                      : "-"}
                  </td>
                  <td
                    className="clickable"
                    onClick={() =>
                      navigate(`/telecaller/suspect/edit/${task.suspectId}`)
                    }
                  >
                    {task.name || "-"}
                  </td>
                  <td>{task.contactNo}</td>
                  <td>{task.organisation}</td>
                  <td>{task.city}</td>
                  <td>{task.taskStatus || "-"}</td>
                  <td>{task.taskRemarks || "-"}</td>
                  <td>
                    <a href={`tel:${task.contactNo}`} className="btn-sm btn-call">
                      📞
                    </a>
                    <button
                      className="btn-sm btn-success"
                      onClick={() =>
                        setActionPanel({
                          type: "forward",
                          suspect: { _id: task.suspectId, personalDetails: { name: task.name, contactNo: task.contactNo } },
                        })
                      }
                    >
                      Forward
                    </button>
                    <button
                      className="btn-sm btn-danger"
                      onClick={() =>
                        setActionPanel({
                          type: "close",
                          suspect: { _id: task.suspectId, personalDetails: { name: task.name, contactNo: task.contactNo } },
                        })
                      }
                    >
                      Close
                    </button>
                    <button
                      className="btn-sm btn-primary"
                      onClick={() =>
                        setActionPanel({
                          type: "callback",
                          suspect: { _id: task.suspectId, personalDetails: { name: task.name, contactNo: task.contactNo } },
                        })
                      }
                    >
                      Callback
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
)}

      {actionPanel && (
        <div className="action-panel">
          <div className="action-header">
            <span>
              📩 {actionPanel.suspect.personalDetails?.groupName || "-"} <b>({actionPanel.type.toUpperCase()})</b>
            </span>
            <button className="close-btn" onClick={() => setActionPanel(null)}>✖</button>
          </div>
          <div className="action-body">
            {actionPanel.type === "forward" && (
              <>
                <div className="form-row">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleFormChange}>
                    <option value="">-- Select --</option>
                    <option value="Call Not Picked">Call Not Picked</option>
                    <option value="Call After Sometimes">Call After Sometimes</option>
                    <option value="Busy on Another Call">Busy on Another Call</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Next Call Date</label>
                  <input type="date" name="nextCallDate" value={formData.nextCallDate} onChange={handleFormChange} />
                  <label>Time</label>
                  <input type="time" name="time" value={formData.time} onChange={handleFormChange} />
                </div>
                <div className="form-row">
                  <label>Remark</label>
                  <input type="text" name="remark" value={formData.remark} onChange={handleFormChange} style={{ width: "90%" }} />
                </div>
              </>
            )}
            {actionPanel.type === "close" && (
                 <>
                <div className="form-row">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleFormChange}>
                    <option value="">-- Select --</option>
                  <option value="Not Reachable">Not Reachable</option>
                      <option value="Wrong Number">Wrong Number</option>
                      <option value="Not Interested">Not Interested</option>
              
                  </select>
                </div>
                {/* <div className="form-row">
                  <label>Next Call Date</label>
                  <input type="date" name="nextCallDate" value={formData.nextCallDate} onChange={handleFormChange} />
                  <label>Time</label>
                  <input type="time" name="time" value={formData.time} onChange={handleFormChange} />
                </div> */}
                <div className="form-row">
                  <label>Remark</label>
                  <input type="text" name="remark" value={formData.remark} onChange={handleFormChange} style={{ width: "90%" }} />
                </div>
              </>
            )}
            {actionPanel.type === "callback" && (
              <div className="form-row">
              
                <label>Remark</label>
                <input type="text" name="remark" value={formData.remark} onChange={handleFormChange} style={{ width: "90%" }} />
              </div>
            )}
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}

      {/* ---- Styles ---- */}
      <style jsx>{`
        .dashboard-page {
          padding: 15px;
          font-family: Arial, sans-serif;
          background: #f5f7fa;
          min-height: 100vh;
        }

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

        .tab-nav {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .tab-nav button {
          padding: 8px 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
        }
        .tab-nav button.active {
          background: #007bff;
          color: #fff;
        }

        .table-container {
          background: #fff;
          border-radius: 6px;
          padding: 15px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

        .clickable { color: #007bff; cursor: pointer; }
        .clickable:hover { text-decoration: underline; }

        .action-panel {
          background: #fff;
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
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

        .btn-sm {
          padding: 4px 8px;
          font-size: 11px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          margin-right: 5px;
        }
        .btn-call { background: #6c757d; color: #fff; }
        .btn-success { background: #28a745; color: #fff; }
        .btn-danger { background: #dc3545; color: #fff; }
        .btn-primary { background: #007bff; color: #fff; }
      `}</style>
    </div>
  );
};

export default DashboardPage;