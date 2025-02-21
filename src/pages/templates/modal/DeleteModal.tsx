import React from "react";

interface DeleteModalProps {
  show: boolean;
  onHide: () => void;
  deleteId?: string; // Ensure deleteId is included
  onDelete: (id?: string) => void; // Pass deleteId to onDelete function
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, onHide, deleteId, onDelete }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button onClick={onHide} className="px-4 py-2 border border-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => onDelete(deleteId)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
