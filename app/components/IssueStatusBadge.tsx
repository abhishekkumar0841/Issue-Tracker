import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

// interface Props{
//     status: Status
// }

// CREATING RECORD UTILITY CLASS ---- think just like creating a type of interface
// Reason for defining this statusMap outside the component is because we don't need this every
// time you want to render a component, so we define the mapping once and whenever the component should be rendered
// this is the only that should be executed
const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  // WE CAN ALSO WRITE BELOW CODES IF WE DON'T LIKE TO USE RECORD UTILITY CLASS
  //   if (status === "OPEN") {
  //     return <Badge color={"red"}>Open</Badge>;
  //   } else if (status === "CLOSED") {
  //     return <Badge color={"blue"}>Closed</Badge>;
  //   } else if (status === "IN_PROGRESS") {
  //     return <Badge color="green">In Progress</Badge>;
  //   }
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
