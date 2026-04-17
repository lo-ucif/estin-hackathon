export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <ul className="space-y-2">
        <li><a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</a></li>
        <li><a href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</a></li>
        <li><a href="/weekly" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Weekly Sequence</a></li>
      </ul>
    </aside>
  );
};