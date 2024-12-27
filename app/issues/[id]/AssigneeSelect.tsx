"use client";
import { Spinner } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Spinner />;

  if (error) return null;

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
      toast.success("Assignee Changed");
    } catch (error) {
      console.error(error);
      toast.error("Changes could not be saved");
    }
  };

  // const [users, setUsers] = useState<User[]>([]);
  // const getUsers = async () => {
  //   try {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   getUsers();
  // }, []);
  return (
    <>
      {/* onValueChange() get the selected value in parameter */}
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => {
              const { id, name } = user;
              return (
                <Select.Item key={id} value={id}>
                  {name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // is equal to 60 seconds
    retry: 3,
  });

export default AssigneeSelect;
