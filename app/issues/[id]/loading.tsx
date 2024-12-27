import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadingDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap={"3"} my={"2"} className=" items-center">
        <Skeleton width={"8rem"} />
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="prose" mt={"4"}>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingDetailsPage;
