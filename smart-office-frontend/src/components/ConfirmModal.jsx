import React from 'react';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Не рендерить, если модальное окно не открыто

  return (
    <div className="fixed inset-0 bg-gray-200 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 transform scale-95 animate-scale-in">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Подтверждение</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100 transition duration-200"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition duration-200"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;