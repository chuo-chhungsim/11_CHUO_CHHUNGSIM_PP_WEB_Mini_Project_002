import RegisterComponent from "./../_components/register";

const page = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center mb-4">
        Register To Use Plan<span className="text-pink-900">I</span>t
      </h1>
      <RegisterComponent />
    </div>
  );
};
export default page;
