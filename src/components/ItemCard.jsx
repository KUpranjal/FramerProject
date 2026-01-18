import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const ItemCard = ({ title, description, status }) => {
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded border hover:shadow transition
        ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white"}`}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm opacity-80 mt-1">{description}</p>

      <span className={`inline-block mt-3 px-3 py-1 text-xs rounded-full
        ${status === "Completed"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"}`}>
        {status}
      </span>
    </motion.div>
  );
};

export default ItemCard;
