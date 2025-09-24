import React from "react";
import { useSelector } from "react-redux";
import LeadsTableLayout from "./LeadsTableLayout";

const CallingDonePage = () => {
  const { suspects = [] } = useSelector((state) => state.suspect);

  const data = suspects
    .filter((s) => s.status === "done")
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
    <LeadsTableLayout title="Calling Done" data={data} columns={columns} />
  );
};

export default CallingDonePage;