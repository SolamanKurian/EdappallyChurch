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
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 leading-relaxed">
            From Vision to Movement—<br/>
            <span className="text-amber-300 font-semibold">Transforming Lives for the Glory of Christ</span>
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 mb-16">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              What began as a simple vision in one man's heart has, by the grace of God, grown into a vibrant, Spirit-led movement impacting individuals, families, and communities across India and beyond. Edappally Church of God is a Christ-centered ministry committed to making mature disciples, equipping leaders, and planting churches that reflect the character and mission of Jesus.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">Our Journey: From a Seed to a Mission</h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-600 via-yellow-600 to-orange-600"></div>
            
            <div className="space-y-20">
              {/* The Beginning */}
              <div className="relative flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-amber-600/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-black font-bold text-lg">2000</span>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100">The Beginning: A Vision is Born</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      In June 2000, John A.C. received a clear and compelling vision from the Lord for the city of Ernakulam, Kerala. Moved by this divine call, he began a small Bible study at YMCA Ernakulam, gathering a few believers with a deep hunger for God's Word.
                    </p>
                  </div>
                </div>
                
                <div className="hidden lg:flex lg:w-1/2 lg:pl-12">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full border-4 border-black shadow-lg"></div>
                </div>
              </div>

              {/* The Birth of a Church */}
              <div className="relative flex flex-col lg:flex-row-reverse items-center">
                <div className="lg:w-1/2 lg:pl-12 mb-8 lg:mb-0">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-amber-600/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-black font-bold text-lg">2001</span>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100">The Birth of a Church</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      As the fellowship grew in faith and numbers, the Bible class was officially established as Edappally Church of God in January 2001. Later that year, the church moved to Edappally Toll, where it found a more permanent place to worship, serve, and grow. Driven by a heart for evangelism and discipleship, the ministry began reaching into rural areas, proclaiming the gospel and raising up faithful followers of Christ.
                    </p>
                  </div>
                </div>
                
                <div className="hidden lg:flex lg:w-1/2 lg:pr-12 justify-end">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full border-4 border-black shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-8">Our Mission: Making Mature Disciples of Jesus</h2>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-600/30 rounded-2xl p-12 mb-8">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Under the leadership of Pastor Mathew Varghese for over 20 years, the church has remained rooted in its core mission:
            </p>
            <blockquote className="text-2xl md:text-3xl italic text-amber-200 leading-relaxed mb-6">
              "To make disciples who obey all that Jesus commanded, live out the Great Commission, and grow into maturity in Christ."
            </blockquote>
            <p className="text-xl text-gray-300 leading-relaxed">
              Through intentional teaching, mentoring, and community life, the church has helped shape leaders, evangelists, and servant-hearted believers who continue to impact their spheres of influence for the Kingdom of God.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full mx-auto mt-8"></div>
          </div>
        </div>
      </section>

      {/* Media Ministry Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 mb-8">
            <h2 className="text-3xl font-bold text-amber-100 mb-6 text-center">Media Ministry: Sanctuary Word Media</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              To expand the reach of biblical teaching, Sanctuary Word Media was launched as the church's dedicated media ministry. Through publishing, audio-visual content, and digital media in multiple languages, this initiative provides solid, Christ-centered resources to equip and edify the global Church.
            </p>
          </div>
        </div>
      </section>

      {/* A Church That Serves Other Churches Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 mb-8">
            <h2 className="text-3xl font-bold text-amber-100 mb-6 text-center">A Church That Serves Other Churches</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              With the apostolic vision and spiritual covering of Evangelist Saju John Mathew, the ministry has grown into a broader movement—a spiritual home and training ground for churches across regions. Operating without denominational or organizational walls, this Christ-centered network empowers fellowships to flourish organically, led by the Holy Spirit and grounded in the Word.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              Churches have been planted and leaders trained across India through this model of unity in diversity. The emphasis remains on relational discipleship, spiritual maturity, and faithful obedience to Jesus.
            </p>
          </div>
        </div>
      </section>

      {/* Where We Stand Today Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">Where We Stand Today</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              From a humble Bible class to a growing network of disciples, churches, and ministries, Edappally Church of God continues to pursue its God-given calling with unwavering focus.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 mb-8">
            <h3 className="text-2xl font-bold text-amber-100 mb-6">Today, we are committed to:</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Raising mature disciples who reflect Christ in character and conduct</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Teaching biblical truth and modeling obedience to Jesus' commands</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Equipping servant-hearted leaders with spiritual depth and integrity</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Supporting churches and ministries beyond organizational limitations</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Producing transformative media to edify the global body of Christ</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-amber-900/20 backdrop-blur-sm border border-amber-600/30 rounded-2xl p-12 text-center">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Through every season, Jesus Christ remains our focus, and our mission remains clear:
            </p>
            <blockquote className="text-2xl md:text-3xl italic text-amber-200 leading-relaxed">
              "To make disciples of all nations, teaching them to observe everything He has commanded, until Christ is fully formed in every believer."
            </blockquote>
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