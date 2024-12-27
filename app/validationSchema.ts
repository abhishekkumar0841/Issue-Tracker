import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  //   type of description is text and we can store max 65535 chars in it
  description: z.string().min(1, "Description is required").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned to user id is required")
    .max(255)
    .optional()
    .nullable(), //by default null is issue is not assign to any user
});
