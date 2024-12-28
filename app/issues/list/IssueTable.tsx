import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { ChevronDownIcon, Flex, Table, Text } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sortOrder: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: Promise<IssueQuery>;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const searchParamsObj = await searchParams;
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeaderCell key={col.value} className={col.className}>
              <Flex align={"center"} gap={"3"}>
                <Text>{col.label}</Text>
                <Flex direction={"column"} align={"center"}>
                  <NextLink
                    href={{
                      query: {
                        ...searchParamsObj,
                        orderBy: col.value,
                        sortOrder: col.desc,
                      },
                    }}
                  >
                    <ChevronUpIcon />
                  </NextLink>

                  <NextLink
                    href={{
                      query: {
                        ...searchParamsObj,
                        orderBy: col.value,
                        sortOrder: col.asc,
                      },
                    }}
                  >
                    <ChevronDownIcon />
                  </NextLink>
                </Flex>
              </Flex>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              {/* CUSTOM LINK COMPONENT */}
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  asc: string;
  desc: string;
  className?: string;
}[] = [
  { label: "Issue", value: "title", asc: "asc", desc: "desc" },
  {
    label: "Status",
    value: "status",
    asc: "asc",
    desc: "desc",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    asc: "asc",
    desc: "desc",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
