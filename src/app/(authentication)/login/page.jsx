import LoginComponent from "../_components/login";

const page = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center mb-4">
        Login To Use Plan<span className="text-pink-900">I</span>t
      </h1>
      <LoginComponent />
    </div>
  );
};
export default page;
