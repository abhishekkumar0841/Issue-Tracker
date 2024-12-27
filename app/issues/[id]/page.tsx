import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const fetchIssues = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issue = await fetchIssues(parseInt(id));
  //   console.log(issue);
  await delay(2000);
  if (!issue) {
    notFound();
  }
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  // const issue = await prisma.issue.findUnique({
  //   where: {
  //     id: parseInt(id),
  //   },
  // });

  const issue = await fetchIssues(parseInt(id));

  return {
    title: issue?.title,
    description: issue?.description,
  };
}

export default IssueDetailsPage;
