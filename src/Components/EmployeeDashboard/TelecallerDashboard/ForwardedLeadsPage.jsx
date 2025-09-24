import React from "react";
import { useSelector } from "react-redux";
import LeadsTableLayout from "./LeadsTableLayout";

const ForwardedLeadsPage = () => {
  const { suspects = [] } = useSelector((state) => state.suspect);

  // Filter for forwarded leads (adjust filter according to backend)
  const data = suspects
    .filter((s) => s.status === "forwarded")
    .map((s, i) => ({
      sn: i + 1,
      taskDate: new Date(s.createdAt).toLocaleDateString(),
      suspectName: s.personalDetails?.name,
      organisation: s.personalDetails?.organisation,
      area: s.personalDetails?.city,
      mobile: s.personalDetails?.contactNo,
      purpose: "-portfolio",
      status: s.callSummary?.status || "-",
      remark: s.callSummary?.remark || "-",
    }));

  const columns = [
    { header: "S.N", key: "sn" },
    { header: "Task Date", key: "taskDate" },
    { header: "Suspect Name", key: "suspectName" },
    { header: "Organisation Name", key: "organisation" },
    { header: "Area", key: "area" },
    { header: "Mobile", key: "mobile" },
    { header: "Calling Purpose", key: "purpose" },
    { header: "Calling Status", key: "status" },
    { header: "Remark", key: "remark" },
  ];

  return (
    <LeadsTableLayout title="Forwarded Leads" data={data} columns={columns} />
  );
};

export default ForwardedLeadsPage;