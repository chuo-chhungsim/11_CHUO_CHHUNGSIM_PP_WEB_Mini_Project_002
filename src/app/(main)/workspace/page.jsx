import Image from "next/image"; // For optimized image/illustration handling

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Section */}
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            Welcome to Your Workspace
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Please select a workspace to start working .
          </p>
        </div>

        {/* Illustration Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://stories.freepiklabs.com/api/vectors/learning/amico/render?color=&background=complete&hide="
            alt="Team working together"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
