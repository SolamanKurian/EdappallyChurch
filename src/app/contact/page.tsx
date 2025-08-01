"use client";
import React from "react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join us in worship, prayer, and fellowship. We'd love to hear from you and welcome you to our church family.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Services Section */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Service Times</h2>
              </div>
              
              <div className="space-y-6">
                <div className="group hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 border-l-4 border-yellow-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">Morning Devotion</h3>
                      <p className="text-gray-400 mt-1">Start your day with prayer and devotion</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-500">Every Day</div>
                      <div className="text-sm text-gray-400">7:00 AM - 8:00 AM</div>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 border-l-4 border-yellow-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">Sunday English Service</h3>
                      <p className="text-gray-400 mt-1">Worship in English language</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-500">Sunday</div>
                      <div className="text-sm text-gray-400">9:00 AM - 10:15 AM</div>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 border-l-4 border-yellow-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">Sunday Malayalam Service</h3>
                      <p className="text-gray-400 mt-1">Worship in Malayalam language</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-500">Sunday</div>
                      <div className="text-sm text-gray-400">10:15 AM - 1:15 PM</div>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 border-l-4 border-yellow-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">Cottage Meeting</h3>
                      <p className="text-gray-400 mt-1">Intimate fellowship and prayer</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-500">Thursday</div>
                      <div className="text-sm text-gray-400">6:00 PM - 8:30 PM</div>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 border-l-4 border-yellow-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">Fasting Prayer</h3>
                      <p className="text-gray-400 mt-1">Spiritual fasting and prayer</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-500">Friday</div>
                      <div className="text-sm text-gray-400">11:00 AM - 1:00 PM</div>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 border-l-4 border-yellow-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">Tarrying Meeting</h3>
                      <p className="text-gray-400 mt-1">Waiting on the Lord in prayer</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-500">Saturday</div>
                      <div className="text-sm text-gray-400">6:00 PM - 8:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Contact Details</h2>
              </div>

              <div className="space-y-8">
                <div className="group hover:bg-gray-800 p-6 rounded-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-600/30 transition-colors">
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Church Address</h3>
                      <p className="text-gray-300 leading-relaxed">
                        <strong>Edappally Church of God</strong><br />
                        26/150, 2nd Floor, AV's Building<br />
                        Toll Jn, Edappally - 682 024<br />
                        Kerala, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800 p-6 rounded-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-600/30 transition-colors">
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Phone Contact</h3>
                      <a 
                        href="tel:+919447154450" 
                        className="text-lg text-yellow-500 hover:text-yellow-400 font-medium transition-colors block"
                      >
                        +91 9447154450
                      </a>
                      <p className="text-gray-300 mt-1">
                        <strong>Pr. Mathew Varghese</strong><br />
                        Senior Pastor
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 lg:mt-16">
          <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
            <div className="p-8 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Find Us</h2>
              </div>
              <p className="text-gray-400 mt-2">Visit us at our location in Edappally, Kerala</p>
            </div>
            <div className="w-full h-96 lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.123456789!2d76.310959!3d10.0289995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d7b50ed06ab%3A0xbb64e425928c209!2sSanctuary%20Church%20Edappally!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Edappally Church Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 text-white border border-gray-700">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Join Us This Sunday</h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Experience the love of Christ in a welcoming community. We invite you to join us for worship, fellowship, and spiritual growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919447154450"
                className="bg-yellow-600 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us Now
              </a>
              <a 
                href="#"
                className="border-2 border-yellow-600 text-yellow-600 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-600 hover:text-gray-900 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Service Times
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 