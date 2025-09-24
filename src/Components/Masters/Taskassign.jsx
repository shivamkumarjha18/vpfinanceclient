import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSuspects } from "../../redux/feature/SuspectRedux/SuspectThunx";
import { toast } from "react-toastify"; // ✅ Toast notifications ke liye

const TaskAssign = () => {
  const [employees, setEmployees] = useState({
    Telecaller: [],
    HR: ["Ankit", "Neha", "Rahul"],
    Manager: ["Shivam", "Pooja"],
  });

  const [role, setRole] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedSuspects, setSelectedSuspects] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false); // ✅ Loading state

  const dispatch = useDispatch();
  const { suspects = [], loading, error } = useSelector(
    (state) => state.suspect
  );

  // ✅ Redux se suspects laane ke liye
  useEffect(() => {
    dispatch(getAllSuspects());
  }, [dispatch]);

  // ✅ Telecaller list fetch karna API se
  useEffect(() => {
    const fetchTelecallers = async () => {
      try {
        const res = await fetch("https://vpfinance2.onrender.com/api/telecaller/");
        const data = await res.json();

        if (Array.isArray(data)) {
          setEmployees((prev) => ({
            ...prev,
            Telecaller: data.map((tc) => ({
              id: tc._id,
              name: tc.username,
            })),
          }));
        } else if (data.telecallers) {
          setEmployees((prev) => ({
            ...prev,
            Telecaller: data.telecallers.map((tc) => ({
              id: tc._id,
              name: tc.username,
            })),
          }));
        }
      } catch (err) {
        console.error("Error fetching telecallers:", err);
      }
    };

    fetchTelecallers();
  }, []);

  // ✅ Checkbox select/deselect handler
  const handleSuspectSelect = (id) => {
    setSelectedSuspects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // 🔥 Updated Assign button action with API call
  const handleAssign = async () => {
    // ✅ Validation
    if (!role) {
      toast.error("Please select a role");
      return;
    }
    
    if (!selectedPerson) {
      toast.error("Please select a person");
      return;
    }
    
    if (selectedSuspects.length === 0) {
      toast.error("Please select at least one suspect");
      return;
    }

    setIsAssigning(true);

    try {
      console.log("Assigning =>", {
        role,
        selectedPerson,
        suspects: selectedSuspects,
      });

      // ✅ POST API call
      const response = await fetch("https://vpfinance2.onrender.com/api/telecaller/assign-suspects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: role,
          selectedPerson: selectedPerson,
          suspects: selectedSuspects
        })
      });

      const result = await response.json();
      
      // ✅ Handle response
      if (response.ok && result.success) {
        toast.success(result.message || "Suspects assigned successfully!");
        
        // ✅ Clear selections after successful assignment
        setSelectedSuspects([]);
        setRole("");
        setSelectedPerson("");
        
        // ✅ Refresh suspects list
        dispatch(getAllSuspects());
        
        console.log("Assignment successful:", result.data);
      } else {
        // ✅ Handle API errors
        toast.error(result.message || "Failed to assign suspects");
        console.error("Assignment failed:", result);
      }
      
    } catch (error) {
      console.error("Assignment API error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="task-container">
      {/* Dropdowns */}
      <div className="task-dropdowns">
        <select value={role} onChange={(e) => setRole(e.target.value)} disabled={isAssigning}>
          <option value="">Select Role</option>
          {Object.keys(employees).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={selectedPerson}
          onChange={(e) => setSelectedPerson(e.target.value)}
          disabled={!role || isAssigning}
        >
          <option value="">Select {role || "Person"}</option>
          {role &&
            employees[role].map((emp) =>
              typeof emp === "string" ? (
                <option key={emp} value={emp}>
                  {emp}
                </option>
              ) : (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              )
            )}
        </select>
      </div>

      {/* Suspect Table */}
      <div className="task-table">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>#</th>
              <th>Suspect/Lead Name</th>
              <th>Status</th>
              <th>Area</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6">Error loading suspects</td>
              </tr>
            ) : suspects.length === 0 ? (
              <tr>
                <td colSpan="6">No suspects found</td>
              </tr>
            ) : (
              suspects.map((suspect, index) => (
                <tr key={suspect._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedSuspects.includes(suspect._id)}
                      onChange={() => handleSuspectSelect(suspect._id)}
                      disabled={isAssigning}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{suspect.personalDetails?.name}</td>
                  <td>{suspect.status || "Pending"}</td>
                  <td>{suspect.personalDetails?.city || "-"}</td>
                  <td>{suspect.personalDetails?.contactNo || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Count Display */}
      {selectedSuspects.length > 0 && (
        <div className="selected-info">
          <p>Selected: {selectedSuspects.length} suspect(s)</p>
        </div>
      )}

      {/* Assign Button */}
      <div className="task-button">
        <button 
          className="assign-btn" 
          onClick={handleAssign}
          disabled={isAssigning || selectedSuspects.length === 0}
        >
          {isAssigning ? "Assigning..." : `Assign (${selectedSuspects.length})`}
        </button>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        .task-container {
          max-width: 100%;
          margin: 20px;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #fff;
        }

        .task-dropdowns {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 10px;
        }

        .task-dropdowns select {
          flex: 1;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .task-dropdowns select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .task-table {
          margin-bottom: 20px;
          overflow-x: auto;
        }

        .task-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        .task-table th,
        .task-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
          font-size: 14px;
        }

        .task-table th {
          background: #f1f1f1;
        }

        .selected-info {
          margin-bottom: 10px;
          padding: 8px;
          background: #e6f4ff;
          border-radius: 4px;
          color: #0066cc;
          font-weight: 500;
        }

        .task-button {
          text-align: right;
        }

        .assign-btn {
          padding: 10px 20px;
          background: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .assign-btn:hover:not(:disabled) {
          background: #0056b3;
        }

        .assign-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default TaskAssign;