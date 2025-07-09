"use client";
import React from "react";

export default function ContactPage() {
  return (
    <main className="container mx-auto py-8 px-4 sm:px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="space-y-8 px-4 sm:px-0">
        {/* Services Section */}
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Services</h2>
          <div className="space-y-3 text-gray-600">
            <div className="border-l-4 border-blue-500 pl-3">
              <div className="font-medium">Morning Devotion</div>
              <div className="text-sm text-gray-500">🗓️ Every Day | ⏰ 7:00 AM – 8:00 AM</div>
            </div>
            
            <div className="border-l-4 border-green-500 pl-3">
              <div className="font-medium">Sunday English Service</div>
              <div className="text-sm text-gray-500">🗓️ Sunday | ⏰ 9:00 AM – 10:15 AM</div>
            </div>
            
            <div className="border-l-4 border-green-500 pl-3">
              <div className="font-medium">Sunday Malayalam Service</div>
              <div className="text-sm text-gray-500">🗓️ Sunday | ⏰ 10:15 AM – 1:15 PM</div>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-3">
              <div className="font-medium">Cottage Meeting</div>
              <div className="text-sm text-gray-500">🗓️ Every Thursday | ⏰ 6:00 PM – 8:30 PM</div>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-3">
              <div className="font-medium">Fasting Prayer</div>
              <div className="text-sm text-gray-500">🗓️ Every Friday | ⏰ 11:00 AM – 1:00 PM</div>
            </div>
            
            <div className="border-l-4 border-red-500 pl-3">
              <div className="font-medium">Tarrying Meeting</div>
              <div className="text-sm text-gray-500">🗓️ Every Saturday | ⏰ 7:00 PM – 9:00 PM</div>
            </div>
          </div>
        </div>
        
        {/* Contact Details Section */}
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Details</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600 leading-relaxed">
                Edappally Church of God<br />
                26/150, 2nd Floor, AV's Building<br />
                Toll Jn, Edappally - 682 024<br />
                Kerala, India
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">
                <a href="tel:+919447154450" className="hover:text-blue-600 transition">
                  +91 9447154450
                </a>
                <br />
                <span className="text-sm text-gray-500">(Pr. Mathew Varghese)</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-2xl font-bold p-6 sm:p-8 pb-4 text-gray-800">Location</h2>
          <div className="w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.123456789!2d76.310959!3d10.0289995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d7b50ed06ab%3A0xbb64e425928c209!2sSanctuary%20Church%20Edappally!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Edappally Church Location"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
} 