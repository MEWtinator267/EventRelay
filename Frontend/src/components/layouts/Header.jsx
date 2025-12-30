const Header = () => {
  return (
    <header className="h-14 bg-white border-b flex items-center px-6 justify-between">
      <h1 className="text-lg font-semibold text-gray-800">
        EventRelay Dashboard
      </h1>

      <div className="text-sm text-gray-600">
        Admin
      </div>
    </header>
  );
};

export default Header;