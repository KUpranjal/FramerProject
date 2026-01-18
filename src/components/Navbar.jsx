import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/uiSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <nav className={`flex justify-between items-center px-6 py-4 shadow 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-xl font-bold">FlowDesk</h1>

      <button
        onClick={() => dispatch(toggleTheme())}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {darkMode ? "Light" : "Dark"}
      </button>
    </nav>
  );
};

export default Navbar;
