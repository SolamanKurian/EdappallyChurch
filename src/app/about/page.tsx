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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-amber-100 mb-6 tracking-tight drop-shadow-2xl">
            A Vision, A Seed, A Movement
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light mb-8 leading-relaxed">
            <span className="text-amber-300 font-semibold">For the Glory of Christ</span>
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

      {/* Introduction Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              What began as a small vision in the heart of one man of God has now grown into a multifaceted ministry by the grace of God with a far-reaching impact—transforming lives, families, and communities across India and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* The Beginning Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-amber-600/50 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-lg">2000</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-amber-100">The Beginning</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                In June 2000, a man of God by the name of John A.C. received a clear vision from the Lord for the city of Kochi, Kerala. Moved by this divine calling, he began a Bible class at the YMCA in Ernakulam, with a few believers who were starved for the truth of God's Word.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-amber-600/50 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-lg">2001</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-amber-100">Birth of a Church</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                As the fellowship grew in numbers and in faith, the Bible class was formally established as a church in January 2001 in Edappally, under the name Edappally Church of God. Later that year, the Lord opened the way for the church to move to Edappally Toll, a place that could better receive the growing congregation He was adding to daily. From its earliest days, the church has remained steadfast in its mission—to teach the Word of God, make disciples, and bring believers into the fullness of life in Christ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership and Discipleship Vision Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 mb-6">Leadership and Discipleship Vision</h2>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-600/30 rounded-2xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Under the faithful leadership of Pastor Mathew Varughese for over two decades, the church has stayed true to its God-given mission:
            </p>
            <blockquote className="text-xl md:text-2xl italic text-amber-200 leading-relaxed mb-6 border-l-4 border-amber-600 pl-6">
              To make disciples who obey all that the Lord Jesus commanded, fulfilling the Great Commission and the Great Commandments—raising mature believers who walk in servanthood and Christlikeness.
            </blockquote>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Many individuals and families have been deeply transformed and empowered through this vision; stepping into lives of purpose, leadership, and faithful service.
            </p>
          </div>
        </div>
      </section>

      {/* Media Teaching Ministry Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 mb-6">Media Teaching Ministry: Sanctuary Word Media</h2>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 mb-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              To strengthen the spiritual understanding and to expand the reach of God's Word, the church established Sanctuary Word Media, dedicated to creating quality content solely for spiritual edification. This initiative focuses on publishing and proclaiming the Word of God in various languages, making solid biblical teaching accessible to a broader audience across the globe.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              A defining contribution to this media mission has been the in-depth and systematic teaching ministry of Prof. P. M. Varkey, a seasoned Bible teacher with prophetic insight into the Scripture. He undertook a comprehensive study covering the entire Bible, presenting structured analysis and spiritual interpretation that, through media outreach, has become a treasured study resource.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              His teachings—first developed in Malayalam, was later translated into English and Hindi—have become a spiritual feast for many, especially those with a deep hunger for God's Word.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              By His divine grace, the Lord enabled the team to complete the recording of the series over the span of several years, even amidst various challenges, including the pandemic. Today, these resources serve as a powerful tool for Bible study, discipleship, and spiritual formation across linguistic and cultural boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* A Church for the Churches Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 mb-6">A Church for the Churches</h2>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Under the spiritual oversight and broader vision of Evangelist Saju John Mathew, the church evolved into a church for many churches—a spiritual family that supports, empowers, and walks alongside other ministries without imposing organizational structures or denominational labels.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6">
              This open and Spirit-led approach has encouraged many fellowships and church plants across India to flourish with freedom, rooted in the truth and united in His love.
            </p>
          </div>
        </div>
      </section>

      {/* Where We Are Today Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 mb-6">Where We Are Today</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              From its beginnings as a humble Bible class to a growing network of churches, media ministries, and teaching resources, the story of Edappally Church of God stands as a powerful testament to God's vision, obedience, and His divine guidance.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-100 mb-6">Today, we continue to:</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Make disciples who reflect Christ in word and deed</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Teach and model the commands of Jesus Christ</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Equip leaders with spiritual depth and servant-heartedness</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Strengthen churches and networks through shared resources</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Produce Bible-based media content for multigenerational growth</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-amber-900/20 backdrop-blur-sm border border-amber-600/30 rounded-2xl p-8 md:p-12 text-center">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Through every season, one truth remains central:
            </p>
            <blockquote className="text-xl md:text-2xl lg:text-3xl italic text-amber-200 leading-relaxed">
              Jesus Christ is the foundation and goal of everything we do—until every person is brought to full maturity in Him.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 mb-6">Join Our Journey</h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
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