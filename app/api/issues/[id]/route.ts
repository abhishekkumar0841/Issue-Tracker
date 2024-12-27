import { issueSchema, patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

// interface Parameters {
//   params: { id: string };
// }

// interface Parameters {
//   params: { params: { id: string } };
// }

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  // console.log("session:", session);
  if (!session) {
    return NextResponse.json(
      { UnAuthenticated: "Authentication error" },
      { status: 401 }
    );
  }
  const { id } = await params;
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation) {
    return NextResponse.json(
      { error: "Issue schema validation failed" },
      { status: 404 }
    );
  }

  // VALIDATING assignedToUserId
  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  // VALIDATING ISSUE
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { UnAuthenticated: "Authentication error" },
      { status: 401 }
    );
  }
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
  await prisma.issue.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({}, { status: 200 });
}
