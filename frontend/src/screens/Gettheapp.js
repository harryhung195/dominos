import React from "react";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Correct import

const GetTheApp = () => {
  const appUrl = "http://localhost:3000/get-the-app"; // Replace with actual app URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Get the App</h1>
      <p className="text-gray-600 mb-4">Download our app for iOS and Android.</p>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <QRCodeCanvas value={appUrl} size={150} />
      </div>

      <p className="text-gray-500 mt-2">Scan the QR code to download.</p>

      <a href={appUrl} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
        Download for iOS & Android
      </a>
    </div>
  );
};

export default GetTheApp;
