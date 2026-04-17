export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">My App</h1>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800">Home</button>
          <button className="text-gray-600 hover:text-gray-800">Dashboard</button>
        </div>
      </div>
    </nav>
  );
};