import { auth } from "@/auth";

const headerToken = async () => {
  const session = await auth();
  // console.log(" Session Data:", session);

  if (!session?.user?.payload?.token) {
    // console.error(" No authentication token available");
    return null;
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.user.payload.token}`,
  };
};

export default headerToken;
