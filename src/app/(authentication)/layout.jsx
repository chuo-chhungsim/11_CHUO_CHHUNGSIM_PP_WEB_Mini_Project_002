const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full font-sans">
      {/* Left Side (Hidden on Small Screens) */}
      <div className="hidden lg:flex relative w-1/2 bg-black">
        {/* Background Image */}
        <img
          src="https://i.pinimg.com/736x/28/0c/d1/280cd11ba77932867b04669c0caafe4b.jpg"
          alt="To-Do List Background"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Welcome to Plan<span className="text-pink-700">l</span>t
          </h1>
          <p className="mt-4 text-lg max-w-lg">
            Your ultimate task management solution. Stay organized, stay
            productive. You can manage your tasks, set deadlines, and
            collaborate with your team.
          </p>
        </div>

        {/* Logo (Positioned at the Top Left) */}
        <h1 className="absolute top-6 left-7 text-3xl font-semibold text-white">
          Plan<span className="text-pink-700">l</span>t
        </h1>
      </div>

      {/* Right Side (Main Content) */}
      <div className="flex flex-1 justify-center bg-background px-4 py-12 sm:px-6">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
