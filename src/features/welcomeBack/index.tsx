import React from "react";

const index = () => {
  const { address } = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading }: any = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCreatorProfile",
    args: [address],
  });

  return <div>index</div>;
};

export default index;
