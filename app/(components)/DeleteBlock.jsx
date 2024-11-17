"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteBlock = ({ id }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm mở modal
  const openModal = () => setIsModalOpen(true);

  // Hàm đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Hàm xóa ticket
  const deleteTicket = async () => {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "DELETE",
    });
    
    if (res.ok) {
      toast.success("Ticket deleted successfully!");
      router.refresh(); // Refresh lại trang sau khi xóa thành công
    } else {
      toast.error("Failed to delete ticket.");
    }
    
    closeModal(); // Đóng modal sau khi xóa
  };

  return (
    <div>
      {/* Nút xóa */}
      <FontAwesomeIcon
        icon={faX}
        className="text-red-400 hover:cursor-pointer hover:text-red-200"
        onClick={openModal} // Mở modal khi nhấn vào icon
      />
      
      {/* Modal (Popup xác nhận xóa) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-xs w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Confirm Deletion</h3>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this ticket?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={deleteTicket}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={closeModal} // Đóng modal khi nhấn "No"
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBlock;
