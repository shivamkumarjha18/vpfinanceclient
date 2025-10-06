import React, { useState } from "react";
import { logoutUser } from "../../../redux/feature/auth/authThunx";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const TelecallerPanel = () => {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenu, setUserMenu] = useState(false);
  const [activeLeadsOpen, setActiveLeadsOpen] = useState(false);
  const [rejectedLeadsOpen, setRejectedLeadsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/telecaller/dashboard", icon: "📊" },
    { name: "Add New Suspect", path: "/telecaller/suspect/add", icon: "➕" },
    { name: "Monthly Appointments", path: "/telecaller/appointments", icon: "📅" },
    {
      name: "Active Leads",
      icon: "🎯",
      hasDropdown: true,
       path: "/telecaller", // 🟢 parent click navigate karega
      subItems: [
        { name: "Busy On Another Call",  icon: "📞", path: "/telecaller/busy-on-another-call" },
        { name: "Call After Some Time",  icon: "⏰", path: "/telecaller/call-after-some-time" },
        { name: "Call Not Picked",  icon: "📵", path: "/telecaller/call-not-picked" },
        { name: "Others",  icon: "📋", path: "/telecaller/others" },
      ],
    },
    {
      name: "Rejected Leads",
      icon: "❌",
      hasDropdown: true,
    
      subItems: [
        { name: "Wrong Number",  icon: "📱", path: "/telecaller/wrong-number" },
        { name: "Not Reachable", icon: "🚫", path: "/telecaller/not-reachable" },
        { name: "Not Interested",  icon: "👎", path: "/telecaller/not-interested" },
      ],
    },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={sidebarOpen ? "sidebar" : "sidebar collapsed"}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">VP</div>
            {sidebarOpen && <span className="logo-text">Financial Nest</span>}
          </div>
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="menu">
            {menu.map((item) => (
              <li key={item.name}>
                <div
                  className={`menu-item ${active === item.name ? "active" : ""}`}
                  onClick={() => {
                    if (item.hasDropdown) {
                      // dropdown ke liye toggle aur navigate dono
                      if (item.name === "Active Leads") {
                        setActiveLeadsOpen(!activeLeadsOpen);
                        navigate(item.path); // 🟢 Active Leads parent page
                      } else if (item.name === "Rejected Leads") {
                        setRejectedLeadsOpen(!rejectedLeadsOpen);
                      }
                      setActive(item.name);
                    } else {
                      setActive(item.name);
                      if (item.path) navigate(item.path);
                    }
                  }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  {sidebarOpen && <span className="menu-text">{item.name}</span>}
                  {sidebarOpen && item.hasDropdown && (
                    <span
                      className={`dropdown-arrow ${
                        (item.name === "Active Leads" && activeLeadsOpen) ||
                        (item.name === "Rejected Leads" && rejectedLeadsOpen)
                          ? "open"
                          : ""
                      }`}
                    >
                      ▼
                    </span>
                  )}
                  {!sidebarOpen && <div className="tooltip">{item.name}</div>}
                </div>

                {item.hasDropdown && sidebarOpen && (
                  <ul
                    className={`submenu ${
                      (item.name === "Active Leads" && activeLeadsOpen) ||
                      (item.name === "Rejected Leads" && rejectedLeadsOpen)
                        ? "open"
                        : ""
                    }`}
                  >
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.name}
                        className={`submenu-item ${active === subItem.name ? "active" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActive(subItem.name);
                          if (subItem.path) navigate(subItem.path); // 🟢 sub-item pe navigate
                        }}
                      >
                        <span className="submenu-icon">{subItem.icon}</span>
                        <span className="submenu-text">{subItem.name}</span>
                        <span className="submenu-count">
                          ({subItem.count})
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {sidebarOpen && (
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">👤</div>
              <div className="user-details">
                <div className="user-name">Telecaller</div>
                <div className="user-role">Agent</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <main className="main">
        {/* Topbar */}
        <div className="topbar">
          <h1 className="page-title">{active}</h1>
          <div className="user-menu">
            <div className="user-icon" onClick={() => setUserMenu(!userMenu)}>
              👤
            </div>
            {userMenu && (
              <div className="dropdown">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

         {/* ✅ Yeh jagah par child routes render honge */}
        <Outlet />
      </main>

      {/* tumhara style JSX wahi ka wahi rahega */}
        <style jsx>{`
        .layout {
          display: flex;
          height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Enhanced Sidebar Styles */
        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          color: white;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .sidebar.collapsed {
          width: 70px;
        }

        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 70px;
          position: relative;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
          flex-shrink: 0;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .toggle-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          font-size: 12px;
          flex-shrink: 0;
          position: relative;
          z-index: 10;
        }

        .sidebar.collapsed .toggle-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }

        .toggle-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(2px);
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto;
        }

        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .menu-item {
          position: relative;
          margin: 4px 16px;
          padding: 14px 16px;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #cbd5e1;
          font-weight: 500;
        }

        .dropdown-arrow {
          margin-left: auto;
          font-size: 12px;
          transition: transform 0.2s;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .submenu.open {
          max-height: 300px;
        }

        .submenu-item {
          margin: 2px 32px 2px 48px;
          padding: 10px 12px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 400;
        }

        .submenu-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
          transform: translateX(2px);
        }

        .submenu-item.active {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
        }

        .submenu-icon {
          font-size: 14px;
          min-width: 16px;
        }

        .submenu-text {
          flex: 1;
        }

        .submenu-count {
          font-size: 11px;
          color: #64748b;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          transform: translateX(4px);
        }

        .menu-item.active {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .menu-item.active::before {
          content: '';
          position: absolute;
          left: -16px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 24px;
          background: white;
          border-radius: 0 4px 4px 0;
        }

        .menu-icon {
          font-size: 18px;
          min-width: 20px;
          text-align: center;
        }

        .menu-text {
          flex: 1;
          font-size: 14px;
        }

        .tooltip {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          background: #1f2937;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s;
          margin-left: 10px;
          z-index: 1000;
        }

        .menu-item:hover .tooltip {
          opacity: 1;
          visibility: visible;
        }

        .tooltip::before {
          content: '';
          position: absolute;
          left: -4px;
          top: 50%;
          transform: translateY(-50%);
          border: 4px solid transparent;
          border-right-color: #1f2937;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: auto;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: white;
          margin-bottom: 2px;
        }

        .user-role {
          font-size: 12px;
          color: #94a3b8;
        }

        /* Main content styles remain the same */
        .main {
          flex-grow: 1;
          padding: 24px;
          background: #f8fafc;
          overflow-y: auto;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          background: white;
          padding: 16px 20px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .user-menu {
          position: relative;
        }

        .user-icon {
          font-size: 22px;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .user-icon:hover {
          background: #f1f5f9;
        }

        .dropdown {
          position: absolute;
          right: 0;
          top: 40px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 8px;
          z-index: 100;
        }

        .logout-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .logout-btn:hover {
          background: #dc2626;
        }

        .section-heading {
          font-size: 20px;
          font-weight: 600;
          margin: 24px 0 16px;
          color: #1e293b;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          color: white;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-value {
          font-size: 32px;
          font-weight: bold;
          margin: 0 0 8px 0;
        }

        .stat-title {
          font-size: 14px;
          margin: 0;
          opacity: 0.9;
        }

        .table-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          background: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 12px;
          border: 1px solid #e5e7eb;
          text-align: left;
          font-size: 14px;
        }

        thead {
          background: #f8fafc;
        }

        th {
          font-weight: 600;
          color: #374151;
        }

        .btn {
          padding: 6px 12px;
          font-size: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-right: 4px;
          color: white;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .btn-orange {
          background: #f97316;
        }

        .btn-orange:hover {
          background: #ea580c;
        }

        .btn-red {
          background: #ef4444;
        }

        .btn-red:hover {
          background: #dc2626;
        }

        .btn-blue {
          background: #3b82f6;
        }

        .btn-blue:hover {
          background: #2563eb;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sidebar {
            width: 70px;
          }
          
          .sidebar.collapsed {
            width: 0;
          }
        }
      `}</style>

    </div>
  );
};

export default TelecallerPanel;
// import React, { useState } from "react";
// import { logoutUser } from "../../../redux/feature/auth/authThunx";
// import { useDispatch } from "react-redux";
// import { useNavigate, Outlet } from "react-router-dom";

// const TelecallerPanel = () => {
//   const [active, setActive] = useState("Dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [userMenu, setUserMenu] = useState(false);
//   const [activeLeadsOpen, setActiveLeadsOpen] = useState(false);
//   const [rejectedLeadsOpen, setRejectedLeadsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const menu = [
//     { name: "Dashboard", path: "/telecaller/dashboard", icon: "📊" },
//     { name: "Add New Suspect", path: "/telecaller/suspect/add", icon: "➕" },
//     { name: "Monthly Appointments", path: "/telecaller/appointments", icon: "📅" },
//     {
//       name: "Active Leads",
//       icon: "🎯",
//       hasDropdown: true,
//       subItems: [
//         { name: "Busy On Another Call", count: 0, icon: "📞" },
//         { name: "Call After Some Time", count: 2, icon: "⏰" },
//         { name: "Call Not Picked", count: 0, icon: "📵" },
//         { name: "Others", count: 0, icon: "📋" },
//       ],
//     },
//     {
//       name: "Rejected Leads",
//       icon: "❌",
//       hasDropdown: true,
//       subItems: [
//         { name: "Wrong Number", count: 0, icon: "📱" },
//         { name: "Not Reachable", count: 3, icon: "🚫" },
//         { name: "Not Interested", count: 46, icon: "👎" },
//       ],
//     },
//   ];

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/auth/login");
//   };

//   return (
//     <div className="layout">
//       {/* Sidebar */}
//       <aside className={sidebarOpen ? "sidebar" : "sidebar collapsed"}>
//         <div className="sidebar-header">
//           <div className="logo">
//             <div className="logo-icon">VP</div>
//             {sidebarOpen && <span className="logo-text">Financial Nest</span>}
//           </div>
//           <button
//             className="toggle-btn"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             {sidebarOpen ? "◀" : "▶"}
//           </button>
//         </div>

//         <nav className="sidebar-nav">
//           <ul className="menu">
//             {menu.map((item) => (
//               <li key={item.name}>
//                 <div
//                   className={`menu-item ${active === item.name ? "active" : ""}`}
//                   onClick={() => {
//                     if (item.hasDropdown) {
//                       if (item.name === "Active Leads") {
//                         setActiveLeadsOpen(!activeLeadsOpen);
//                       } else if (item.name === "Rejected Leads") {
//                         setRejectedLeadsOpen(!rejectedLeadsOpen);
//                       }
//                       setActive(item.name);
//                     } else {
//                       setActive(item.name);
//                       if (item.path) navigate(item.path);
//                     }
//                   }}
//                 >
//                   <span className="menu-icon">{item.icon}</span>
//                   {sidebarOpen && <span className="menu-text">{item.name}</span>}
//                   {sidebarOpen && item.hasDropdown && (
//                     <span
//                       className={`dropdown-arrow ${
//                         (item.name === "Active Leads" && activeLeadsOpen) ||
//                         (item.name === "Rejected Leads" && rejectedLeadsOpen)
//                           ? "open"
//                           : ""
//                       }`}
//                     >
//                       ▼
//                     </span>
//                   )}
//                   {!sidebarOpen && <div className="tooltip">{item.name}</div>}
//                 </div>

//                 {item.hasDropdown && sidebarOpen && (
//                   <ul
//                     className={`submenu ${
//                       (item.name === "Active Leads" && activeLeadsOpen) ||
//                       (item.name === "Rejected Leads" && rejectedLeadsOpen)
//                         ? "open"
//                         : ""
//                     }`}
//                   >
//                     {item.subItems.map((subItem) => (
//                       <li
//                         key={subItem.name}
//                         className="submenu-item"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setActive(subItem.name);
//                         }}
//                       >
//                         <span className="submenu-icon">{subItem.icon}</span>
//                         <span className="submenu-text">{subItem.name}</span>
//                         <span className="submenu-count">
//                           ({subItem.count})
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {sidebarOpen && (
//           <div className="sidebar-footer">
//             <div className="user-info">
//               <div className="user-avatar">👤</div>
//               <div className="user-details">
//                 <div className="user-name">Telecaller</div>
//                 <div className="user-role">Agent</div>
//               </div>
//             </div>
//           </div>
//         )}
//       </aside>

//       {/* Main */}
//       <main className="main">
//         {/* Topbar */}
//         <div className="topbar">
//           <h1 className="page-title">{active}</h1>
//           <div className="user-menu">
//             <div className="user-icon" onClick={() => setUserMenu(!userMenu)}>
//               👤
//             </div>
//             {userMenu && (
//               <div className="dropdown">
//                 <button className="logout-btn" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

      //   {/* ✅ Yeh jagah par child routes render honge */}
      //   <Outlet />
      // </main>

      // {/* tumhara style JSX wahi ka wahi rahega */}
      //   <style jsx>{`
      //   .layout {
      //     display: flex;
      //     height: 100vh;
      //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      //   }

      //   /* Enhanced Sidebar Styles */
      //   .sidebar {
      //     width: 280px;
      //     background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
      //     color: white;
      //     display: flex;
      //     flex-direction: column;
      //     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      //     box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      //     position: relative;
      //     overflow: hidden;
      //   }

      //   .sidebar.collapsed {
      //     width: 70px;
      //   }

      //   .sidebar::before {
      //     content: '';
      //     position: absolute;
      //     top: 0;
      //     left: 0;
      //     right: 0;
      //     height: 1px;
      //     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      //   }

      //   .sidebar-header {
      //     padding: 20px;
      //     border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      //     display: flex;
      //     align-items: center;
      //     justify-content: space-between;
      //     min-height: 70px;
      //     position: relative;
      //   }

      //   .logo {
      //     display: flex;
      //     align-items: center;
      //     gap: 12px;
      //     flex: 1;
      //   }

      //   .logo-icon {
      //     width: 40px;
      //     height: 40px;
      //     background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      //     border-radius: 10px;
      //     display: flex;
      //     align-items: center;
      //     justify-content: center;
      //     font-weight: bold;
      //     font-size: 16px;
      //     box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
      //     flex-shrink: 0;
      //   }

      //   .logo-text {
      //     font-size: 18px;
      //     font-weight: 600;
      //     background: linear-gradient(135deg, #ffffff, #e2e8f0);
      //     -webkit-background-clip: text;
      //     -webkit-text-fill-color: transparent;
      //     background-clip: text;
      //   }

      //   .toggle-btn {
      //     background: rgba(255, 255, 255, 0.1);
      //     border: 1px solid rgba(255, 255, 255, 0.2);
      //     color: white;
      //     width: 32px;
      //     height: 32px;
      //     border-radius: 8px;
      //     cursor: pointer;
      //     display: flex;
      //     align-items: center;
      //     justify-content: center;
      //     transition: all 0.2s;
      //     font-size: 12px;
      //     flex-shrink: 0;
      //     position: relative;
      //     z-index: 10;
      //   }

      //   .sidebar.collapsed .toggle-btn {
      //     position: absolute;
      //     right: 10px;
      //     top: 50%;
      //     transform: translateY(-50%);
      //   }

      //   .toggle-btn:hover {
      //     background: rgba(255, 255, 255, 0.2);
      //     transform: translateX(2px);
      //   }

      //   .sidebar-nav {
      //     flex: 1;
      //     padding: 20px 0;
      //     overflow-y: auto;
      //   }

      //   .menu {
      //     list-style: none;
      //     padding: 0;
      //     margin: 0;
      //   }

      //   .menu-item {
      //     position: relative;
      //     margin: 4px 16px;
      //     padding: 14px 16px;
      //     cursor: pointer;
      //     border-radius: 12px;
      //     transition: all 0.2s;
      //     display: flex;
      //     align-items: center;
      //     gap: 12px;
      //     color: #cbd5e1;
      //     font-weight: 500;
      //   }

      //   .dropdown-arrow {
      //     margin-left: auto;
      //     font-size: 12px;
      //     transition: transform 0.2s;
      //   }

      //   .dropdown-arrow.open {
      //     transform: rotate(180deg);
      //   }

      //   .submenu {
      //     max-height: 0;
      //     overflow: hidden;
      //     transition: max-height 0.3s ease;
      //     margin: 0;
      //     padding: 0;
      //     list-style: none;
      //   }

      //   .submenu.open {
      //     max-height: 300px;
      //   }

      //   .submenu-item {
      //     margin: 2px 32px 2px 48px;
      //     padding: 10px 12px;
      //     cursor: pointer;
      //     border-radius: 8px;
      //     transition: all 0.2s;
      //     display: flex;
      //     align-items: center;
      //     gap: 8px;
      //     color: #94a3b8;
      //     font-size: 13px;
      //     font-weight: 400;
      //   }

      //   .submenu-item:hover {
      //     background: rgba(255, 255, 255, 0.05);
      //     color: #e2e8f0;
      //     transform: translateX(2px);
      //   }

      //   .submenu-item.active {
      //     background: rgba(59, 130, 246, 0.2);
      //     color: #60a5fa;
      //   }

      //   .submenu-icon {
      //     font-size: 14px;
      //     min-width: 16px;
      //   }

      //   .submenu-text {
      //     flex: 1;
      //   }

      //   .submenu-count {
      //     font-size: 11px;
      //     color: #64748b;
      //     background: rgba(255, 255, 255, 0.1);
      //     padding: 2px 6px;
      //     border-radius: 10px;
      //     min-width: 20px;
      //     text-align: center;
      //   }

      //   .menu-item:hover {
      //     background: rgba(255, 255, 255, 0.08);
      //     color: white;
      //     transform: translateX(4px);
      //   }

      //   .menu-item.active {
      //     background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      //     color: white;
      //     box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      //   }

      //   .menu-item.active::before {
      //     content: '';
      //     position: absolute;
      //     left: -16px;
      //     top: 50%;
      //     transform: translateY(-50%);
      //     width: 4px;
      //     height: 24px;
      //     background: white;
      //     border-radius: 0 4px 4px 0;
      //   }

      //   .menu-icon {
      //     font-size: 18px;
      //     min-width: 20px;
      //     text-align: center;
      //   }

      //   .menu-text {
      //     flex: 1;
      //     font-size: 14px;
      //   }

      //   .tooltip {
      //     position: absolute;
      //     left: 100%;
      //     top: 50%;
      //     transform: translateY(-50%);
      //     background: #1f2937;
      //     color: white;
      //     padding: 8px 12px;
      //     border-radius: 6px;
      //     font-size: 12px;
      //     white-space: nowrap;
      //     opacity: 0;
      //     visibility: hidden;
      //     transition: all 0.2s;
      //     margin-left: 10px;
      //     z-index: 1000;
      //   }

      //   .menu-item:hover .tooltip {
      //     opacity: 1;
      //     visibility: visible;
      //   }

      //   .tooltip::before {
      //     content: '';
      //     position: absolute;
      //     left: -4px;
      //     top: 50%;
      //     transform: translateY(-50%);
      //     border: 4px solid transparent;
      //     border-right-color: #1f2937;
      //   }

      //   .sidebar-footer {
      //     padding: 20px;
      //     border-top: 1px solid rgba(255, 255, 255, 0.1);
      //     margin-top: auto;
      //   }

      //   .user-info {
      //     display: flex;
      //     align-items: center;
      //     gap: 12px;
      //     padding: 12px;
      //     background: rgba(255, 255, 255, 0.05);
      //     border-radius: 12px;
      //     border: 1px solid rgba(255, 255, 255, 0.1);
      //   }

      //   .user-avatar {
      //     width: 36px;
      //     height: 36px;
      //     background: linear-gradient(135deg, #10b981, #059669);
      //     border-radius: 10px;
      //     display: flex;
      //     align-items: center;
      //     justify-content: center;
      //     font-size: 14px;
      //   }

      //   .user-details {
      //     flex: 1;
      //   }

      //   .user-name {
      //     font-size: 14px;
      //     font-weight: 600;
      //     color: white;
      //     margin-bottom: 2px;
      //   }

      //   .user-role {
      //     font-size: 12px;
      //     color: #94a3b8;
      //   }

      //   /* Main content styles remain the same */
      //   .main {
      //     flex-grow: 1;
      //     padding: 24px;
      //     background: #f8fafc;
      //     overflow-y: auto;
      //   }

      //   .topbar {
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //     margin-bottom: 20px;
      //     background: white;
      //     padding: 16px 20px;
      //     border-radius: 12px;
      //     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      //   }

      //   .page-title {
      //     font-size: 24px;
      //     font-weight: 600;
      //     color: #1e293b;
      //     margin: 0;
      //   }

      //   .user-menu {
      //     position: relative;
      //   }

      //   .user-icon {
      //     font-size: 22px;
      //     cursor: pointer;
      //     padding: 8px;
      //     border-radius: 8px;
      //     transition: background 0.2s;
      //   }

      //   .user-icon:hover {
      //     background: #f1f5f9;
      //   }

      //   .dropdown {
      //     position: absolute;
      //     right: 0;
      //     top: 40px;
      //     background: white;
      //     border: 1px solid #e2e8f0;
      //     border-radius: 8px;
      //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      //     padding: 8px;
      //     z-index: 100;
      //   }

      //   .logout-btn {
      //     background: #ef4444;
      //     color: white;
      //     border: none;
      //     padding: 8px 16px;
      //     border-radius: 6px;
      //     cursor: pointer;
      //     font-weight: 500;
      //     transition: background 0.2s;
      //   }

      //   .logout-btn:hover {
      //     background: #dc2626;
      //   }

      //   .section-heading {
      //     font-size: 20px;
      //     font-weight: 600;
      //     margin: 24px 0 16px;
      //     color: #1e293b;
      //   }

      //   .stats-grid {
      //     display: grid;
      //     grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      //     gap: 16px;
      //     margin-bottom: 24px;
      //   }

      //   .stat-card {
      //     color: white;
      //     border-radius: 12px;
      //     padding: 20px;
      //     text-align: center;
      //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      //     transition: transform 0.2s;
      //   }

      //   .stat-card:hover {
      //     transform: translateY(-2px);
      //   }

      //   .stat-value {
      //     font-size: 32px;
      //     font-weight: bold;
      //     margin: 0 0 8px 0;
      //   }

      //   .stat-title {
      //     font-size: 14px;
      //     margin: 0;
      //     opacity: 0.9;
      //   }

      //   .table-card {
      //     border: 1px solid #e2e8f0;
      //     border-radius: 12px;
      //     padding: 20px;
      //     background: white;
      //     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      //   }

      //   .table-wrapper {
      //     overflow-x: auto;
      //   }

      //   table {
      //     width: 100%;
      //     border-collapse: collapse;
      //   }

      //   th,
      //   td {
      //     padding: 12px;
      //     border: 1px solid #e5e7eb;
      //     text-align: left;
      //     font-size: 14px;
      //   }

      //   thead {
      //     background: #f8fafc;
      //   }

      //   th {
      //     font-weight: 600;
      //     color: #374151;
      //   }

      //   .btn {
      //     padding: 6px 12px;
      //     font-size: 12px;
      //     border: none;
      //     border-radius: 6px;
      //     cursor: pointer;
      //     margin-right: 4px;
      //     color: white;
      //     font-weight: 500;
      //     transition: all 0.2s;
      //   }

      //   .btn:hover {
      //     transform: translateY(-1px);
      //     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      //   }

      //   .btn-orange {
      //     background: #f97316;
      //   }

      //   .btn-orange:hover {
      //     background: #ea580c;
      //   }

      //   .btn-red {
      //     background: #ef4444;
      //   }

      //   .btn-red:hover {
      //     background: #dc2626;
      //   }

      //   .btn-blue {
      //     background: #3b82f6;
      //   }

      //   .btn-blue:hover {
      //     background: #2563eb;
      //   }

      //   /* Responsive adjustments */
      //   @media (max-width: 768px) {
      //     .sidebar {
      //       width: 70px;
      //     }
          
      //     .sidebar.collapsed {
      //       width: 0;
      //     }
      //   }
      // `}</style>

//     </div>
//   );
// };

// export default TelecallerPanel;
