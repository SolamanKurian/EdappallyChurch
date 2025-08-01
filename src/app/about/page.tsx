import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Edappally Church of God | A Christ-Centered Movement in India",
  description:
    "Discover the journey of Edappally Church of God—a Spirit-led, Christ-centered ministry in Kerala focused on making disciples, planting churches, and equipping leaders across India and beyond.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-amber-100 mb-6 tracking-tight drop-shadow-2xl">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 leading-relaxed">
            From a humble Bible study to a transformative movement—<br/>
            <span className="text-amber-300 font-semibold">Two decades of faith, growth, and divine purpose</span>
          </p>
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full"></div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">Our Journey Through Time</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every milestone, every challenge, every victory—all part of God's perfect plan
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-600 via-yellow-600 to-orange-600"></div>
            
            <div className="space-y-20">
              {/* 2000 - The Beginning */}
              <div className="relative flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-amber-600/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-black font-bold text-lg">2000</span>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100">The Vision is Born</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      In June 2000, John A.C. received a divine vision that would change everything. 
                      The Lord spoke clearly about the city of Ernakulam, Kerala, and the need for 
                      authentic, Spirit-led ministry.
                    </p>
                    <div className="bg-amber-900/20 border-l-4 border-amber-600 p-4 rounded-r-lg">
                      <p className="text-amber-200 italic">
                        "The vision was clear—a church that would make disciples, not just converts."
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:flex lg:w-1/2 lg:pl-12">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full border-4 border-black shadow-lg"></div>
                </div>
              </div>

              {/* 2001 - Church Birth */}
              <div className="relative flex flex-col lg:flex-row-reverse items-center">
                <div className="lg:w-1/2 lg:pl-12 mb-8 lg:mb-0">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-amber-600/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-black font-bold text-lg">2001</span>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100">The Church is Born</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      What began as a small Bible study at YMCA Ernakulam officially became 
                      Edappally Church of God in January 2001. The ministry moved to Edappally Toll, 
                      finding its permanent home for worship and growth.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-amber-400 font-semibold">First Location</div>
                        <div className="text-gray-400">YMCA Ernakulam</div>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-amber-400 font-semibold">Current Home</div>
                        <div className="text-gray-400">Edappally Toll</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:flex lg:w-1/2 lg:pr-12 justify-end">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full border-4 border-black shadow-lg"></div>
                </div>
              </div>

              {/* 2002-2020 - Growth Era */}
              <div className="relative flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-amber-600/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">20+</span>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100">Decades of Growth</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Under Pastor Mathew Varughese's leadership, the church experienced unprecedented 
                      growth. The ministry expanded beyond city limits, reaching rural areas and 
                      establishing a network of faithful disciples.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                        <span>Rural evangelism and outreach programs</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                        <span>Leadership development and training</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                        <span>Community transformation initiatives</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:flex lg:w-1/2 lg:pl-12">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-full border-4 border-black shadow-lg"></div>
                </div>
              </div>

              {/* Media Ministry */}
              <div className="relative flex flex-col lg:flex-row-reverse items-center">
                <div className="lg:w-1/2 lg:pl-12 mb-8 lg:mb-0">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-amber-600/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100">Sanctuary Word Media</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Recognizing the power of media in spreading the Gospel, Sanctuary Word Media 
                      was launched to reach beyond physical boundaries and equip believers worldwide.
                    </p>
                    <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600/30 p-4 rounded-lg">
                      <p className="text-blue-200 text-sm">
                        <strong>Multilingual Content:</strong> Reaching diverse communities across India and beyond
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:flex lg:w-1/2 lg:pr-12 justify-end">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-black shadow-lg"></div>
                </div>
              </div>

              {/* Present Day */}
              <div className="relative flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                  <div className="bg-gradient-to-br from-gray-900/80 to-amber-900/20 backdrop-blur-sm border border-amber-600/30 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mr-4 animate-pulse">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100">Today's Impact</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      From a single Bible study to a network of churches and ministries, 
                      Edappally Church of God continues to fulfill its divine calling with 
                      unwavering commitment to Christ and His mission.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-600/30">
                        <div className="text-amber-300 font-semibold">Churches Planted</div>
                        <div className="text-amber-100 text-lg font-bold">Multiple</div>
                      </div>
                      <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-600/30">
                        <div className="text-amber-300 font-semibold">Lives Transformed</div>
                        <div className="text-amber-100 text-lg font-bold">Countless</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:flex lg:w-1/2 lg:pl-12">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full border-4 border-black shadow-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-8">Our Mission</h2>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-600/30 rounded-2xl p-12 mb-8">
            <blockquote className="text-2xl md:text-3xl italic text-amber-200 leading-relaxed mb-6">
              "To make disciples who obey all that Jesus commanded, live out the Great Commission, 
              and grow into maturity in Christ."
            </blockquote>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-100 mb-2">Biblical Teaching</h3>
              <p className="text-gray-400">Rooted in God's Word, teaching truth that transforms lives</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-100 mb-2">Discipleship</h3>
              <p className="text-gray-400">Making mature followers of Christ who multiply His kingdom</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-100 mb-2">Evangelism</h3>
              <p className="text-gray-400">Reaching the lost with the life-changing message of Jesus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-6">Join Our Journey</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Be part of a movement that's transforming lives and communities through the power of Christ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-bold py-4 px-8 rounded-lg hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105">
              Connect With Us
            </a>
            <a href="/attend" className="border-2 border-amber-600 text-amber-100 font-bold py-4 px-8 rounded-lg hover:bg-amber-600 hover:text-black transition-all duration-300">
              Visit Our Church
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}