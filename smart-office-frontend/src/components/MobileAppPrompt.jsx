import React from 'react';

const MobileAppPrompt = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="text-center w-100 p-6 bg-white rounded-3xl shadow-lg max-w-md">
        <h2 className="text-2xl font-medium text-brown mb-4">Слишком малое <br/> разрешение экрана</h2>
        <p className="text-lg">
          Для полноценной работы с приложением необходима большая ширина экрана.
          Пожалуйста, скачайте наше мобильное приложение.
        </p>
        <div className="mt-6">
          <a 
            href="#" 
            className="inline-block bg-brown text-white py-2 px-6 rounded-md shadow-md hover:bg-opacity-90 transition-colors duration-200 mr-4"
          >
            Перейти в App Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileAppPrompt;