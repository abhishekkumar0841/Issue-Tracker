import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status); //['OPEN', 'IN_PROGRESS', 'CLOSED']
  // const searchParamsObj = await searchParams;
  const { status, orderBy, sortOrder, page: pageNo } = await searchParams;
  const filterStatus = statuses.includes(status) ? status : undefined;

  // creating obj to sort issue by order
  const sortByOrder = columnNames.includes(orderBy)
    ? { [orderBy]: sortOrder }
    : undefined;

  // for handling pagination
  const page = parseInt(pageNo) || 1;
  const pageSize = 10;

  const where = {
    status: filterStatus,
  };
  const issues = await prisma.issue.findMany({
    where,
    orderBy: sortByOrder,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize} //10
        currentPage={page} //1
        itemCount={issueCount} //25
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List page",
  description:
    "View all the listed issues and find which one is open, closed or in-progress",
};

export default IssuesPage;
