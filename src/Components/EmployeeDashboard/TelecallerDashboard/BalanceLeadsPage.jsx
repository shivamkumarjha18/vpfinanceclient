import React from "react";
import { useEffect } from "react";
import LeadsTableLayout from "./LeadsTableLayout";
import { useSelector, useDispatch } from "react-redux";
import { setBalanceCount } from "../../../redux/feature/showdashboarddata/dashboarddataSlice";

// const BalanceLeadsPage = () => {

//     const dispatch = useDispatch();
//  const { suspects = [] } = useSelector((state) => state.suspect);
//    const user = JSON.parse(localStorage.getItem("user")); // Assuming user info is stored here
//    const telecallerId = user?.id || null;

//  let bcnt=0;
//    // Filter for assigned suspects who have call tasks
//    const data = suspects
//      .filter((suspect) => 
//        suspect.assignedTo === telecallerId && suspect.callTasks.length == 0 
//      )
//      .map((s, i) => {
//        const lastTask = s.callTasks.slice(-1)[0]; // Get the last call task
// bcnt++;
//        return {
//          sn: i + 1,
//         //  taskDate: new Date(lastTask.taskDate).toLocaleDateString() || '-',
//          suspectName: s.personalDetails?.groupName || '-',
//          mobile: s.personalDetails?.contactNo || '-',
//          organisation: s.personalDetails?.organisation || '-',
//          area: s.personalDetails?.city || '-',
//         //  purpose: lastTask.taskRemarks || '-',
//          status:  '-',
//        };
//      });


//        useEffect(() => {
//     dispatch(setBalanceCount(bcnt));
//   }, [bcnt, dispatch]);

//    const columns = [
//      { header: "S.N", key: "sn" },
//     //  { header: "Task Date", key: "taskDate" },
//      { header: "Suspect Name", key: "suspectName" },
//      { header: "Mobile", key: "mobile" },
//      { header: "Organisation", key: "organisation" },
//      { header: "Area", key: "area" },
//      { header: "Remark", key: "purpose" },
//      { header: "Calling Status", key: "status" },
//    ];
 


//   return <LeadsTableLayout title="Balance Leads" data={data} columns={columns} />;
// };



const BalanceLeadsPage = () => {
  const dispatch = useDispatch();
  const { suspects = [] } = useSelector((state) => state.suspect);
  const user = JSON.parse(localStorage.getItem("user"));
  const telecallerId = user?.id || null;

  let bcnt = 0;

  // // Get today's date (YYYY-MM-DD)
  // const today = new Date().toISOString().split("T")[0];

  const data = suspects
    .filter((suspect) => {
      const assignedDate = suspect.assignedAt
        ? new Date(suspect.assignedAt).toISOString().split("T")[0]
        : null;

      return (
        suspect.assignedTo === telecallerId &&
        suspect.callTasks.length === 0 // no call task yet
        
      );
    })
    .map((s, i) => {
      bcnt++;
      return {
        sn: i + 1,
        suspectName: s.personalDetails?.groupName || "-",
        mobile: s.personalDetails?.contactNo || "-",
        organisation: s.personalDetails?.organisation || "-",
        area: s.personalDetails?.city || "-",
        status: "-",
      };
    });

  useEffect(() => {
    dispatch(setBalanceCount(bcnt));
  }, [bcnt, dispatch]);

  const columns = [
    { header: "S.N", key: "sn" },
    { header: "Suspect Name", key: "suspectName" },
    { header: "Mobile", key: "mobile" },
    { header: "Organisation", key: "organisation" },
    { header: "Area", key: "area" },
    { header: "Remark", key: "purpose" },
    { header: "Calling Status", key: "status" },
  ];

  return (
    <LeadsTableLayout title="Balance Leads " data={data} columns={columns} />
  );
};


export default BalanceLeadsPage;