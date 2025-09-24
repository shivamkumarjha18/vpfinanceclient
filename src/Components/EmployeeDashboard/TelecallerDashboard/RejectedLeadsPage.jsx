import React from "react";
import { useSelector } from "react-redux";
import LeadsTableLayout from "./LeadsTableLayout";

const RejectedLeadsPage = () => {
  const { suspects = [] } = useSelector((state) => state.suspect);

  // Filter for rejected leads (adjust condition as per backend)
  const data = suspects
    .filter((s) => s.status === "rejected")
    .map((s, i) => ({
      sn: i + 1,
      g: 0,
      suspectName: s.personalDetails?.name,
      mobile: s.personalDetails?.contactNo,
      organisation: s.personalDetails?.organisation,
      area: s.personalDetails?.city,
      purpose: "-portfolio",
      status: s.callSummary?.status || "-",
    }));

  const columns = [
    { header: "S.N", key: "sn" },
    { header: "G", key: "g" },
    { header: "Suspect Name", key: "suspectName" },
    { header: "Mobile", key: "mobile" },
    { header: "Organisation", key: "organisation" },
    { header: "Area", key: "area" },
    { header: "Calling Purpose", key: "purpose" },
    { header: "Calling Status", key: "status" },
  ];

  return (
    <LeadsTableLayout title="Rejected Leads" data={data} columns={columns} />
  );
};

export default RejectedLeadsPage;