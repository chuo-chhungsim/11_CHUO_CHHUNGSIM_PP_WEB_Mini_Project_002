const ProfileComponent = () => {
  return (
    <div>
      <div className="h-16 rounded-xl w-3/12 py-2.5 px-3 flex gap-3 items-center">
        <img
          src="https://i.pinimg.com/736x/39/2a/50/392a5042102c7d7e4ed87527a2d7e74a.jpg"
          alt="profile image"
          width={80}
          height={80}
          className="rounded-full"
        />
        {/* username and email */}
        <div>
          <p className="capitalize text-base">Super Idol</p>
          <p className="text-gray-400 text-xs">heheee@gmail.com</p>
        </div>
      </div>
    </div>
  );
};
export default ProfileComponent;
