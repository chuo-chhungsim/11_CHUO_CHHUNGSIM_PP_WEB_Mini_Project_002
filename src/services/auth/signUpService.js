export const signUpService = async (user) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const registeredUser = await response.json();

  if (!response.ok) {
    throw new Error(registeredUser.message || "Sign up failed");
  }

  return registeredUser;
};
