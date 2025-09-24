import React from "react";
import { useSelector } from "react-redux";
import LeadsTableLayout from "./LeadsTableLayout";

const BalanceLeadsPage = () => {
  const { suspects = [] } = useSelector((state) => state.suspect);

  // Yaha filter laga balance leads ke liye
  const data = suspects.filter((s) => s.status === "balance").map((s, i) => ({
    g: 0,
    suspectName: s.personalDetails?.name,
    mobile: s.personalDetails?.contactNo,
    organisation: s.personalDetails?.organisation,
    designation: s.personalDetails?.designation,
    address: s.personalDetails?.address,
    area: s.personalDetails?.city,
    purpose: "-portfolio",
  }));

  const columns = [
    { header: "G", key: "g" },
    { header: "Suspect Name", key: "suspectName" },
    { header: "Mobile", key: "mobile" },
    { header: "Organisation", key: "organisation" },
    { header: "Designation", key: "designation" },
    { header: "Residence Address", key: "address" },
    { header: "Area", key: "area" },
    { header: "Purpose Name", key: "purpose" },
  ];

  return <LeadsTableLayout title="Balance Leads" data={data} columns={columns} />;
};

export default BalanceLeadsPage;