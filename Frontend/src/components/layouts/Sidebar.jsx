import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass =
    "block px-4 py-2 rounded text-gray-700 hover:bg-blue-100";
  const activeClass = "bg-blue-600 text-white";

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 text-xl font-bold text-blue-600">
        EventRelay
      </div>

      <nav className="px-2 space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Events
        </NavLink>

        <NavLink
          to="/webhooks"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Webhooks
        </NavLink>

        <NavLink
          to="/dlq"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          DLQ
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;