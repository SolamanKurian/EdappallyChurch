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
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-amber-100 mb-8 leading-tight tracking-tight">
            A Vision, A Seed, A Movement
          </h1>
          <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-transparent bg-clip-text">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-12">
              For the Glory of Christ
            </p>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 rounded-full mx-auto shadow-lg"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-20">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light max-w-4xl mx-auto">
              What began as a <span className="text-amber-300 font-semibold">small vision</span> in the heart of one man of God has now grown into a <span className="text-amber-300 font-semibold">multifaceted ministry</span> by the grace of God with a far-reaching impact—transforming lives, families, and communities across India and beyond.
            </p>
          </div>

          {/* Timeline Section */}
          <div className="relative mb-32">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600 via-yellow-600 to-orange-600"></div>
            
            {/* The Beginning */}
            <div className="relative mb-20 md:mb-32">
              <div className="md:flex md:items-start md:space-x-12">
                <div className="hidden md:block md:w-16 md:flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-black">
                    <span className="text-black font-black text-xl">2000</span>
                  </div>
                </div>
                <div className="md:flex-1">
                                     <h2 className="text-2xl md:text-3xl font-bold text-amber-100 mb-6">The Beginning (2000)</h2>
                   <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                     In June 2000, a man of God by the name of <span className="text-amber-300 font-semibold">John A.C.</span> received a clear vision from the Lord for the city of Kochi, Kerala. Moved by this divine calling, he began a Bible class at the YMCA in Ernakulam, with a few believers who were starved for the truth of God's Word.
                   </p>
                </div>
              </div>
            </div>

            {/* Birth of a Church */}
            <div className="relative mb-20 md:mb-32">
              <div className="md:flex md:items-start md:space-x-12">
                <div className="hidden md:block md:w-16 md:flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-black">
                    <span className="text-black font-black text-xl">2001</span>
                  </div>
                </div>
                <div className="md:flex-1">
                                     <h2 className="text-2xl md:text-3xl font-bold text-amber-100 mb-6">Birth of a Church (2001)</h2>
                   <div className="space-y-4">
                     <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                       As the fellowship grew in numbers and in faith, the Bible class was formally established as a church in January 2001 in Edappally, under the name <span className="text-amber-300 font-semibold">Edappally Church of God</span>.
                     </p>
                     <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                       Later that year, the Lord opened the way for the church to move to Edappally Toll, a place that could better receive the growing congregation He was adding to daily. From its earliest days, the church has remained steadfast in its mission—to teach the Word of God, make disciples, and bring believers into the fullness of life in Christ.
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Vision Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 mb-6">Leadership and Discipleship Vision</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center">
                Under the faithful leadership of <span className="text-amber-300 font-semibold">Pastor Mathew Varughese</span> for over two decades, the church has stayed true to its God-given mission:
              </p>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 backdrop-blur-sm border-l-8 border-amber-500 rounded-r-3xl p-8 md:p-12">
                  <blockquote className="text-xl md:text-2xl lg:text-3xl italic text-amber-200 leading-relaxed font-light text-center">
                    "To make disciples who obey all that the Lord Jesus commanded, fulfilling the Great Commission and the Great Commandments—raising mature believers who walk in servanthood and Christlikeness."
                  </blockquote>
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center">
                Many individuals and families have been deeply transformed and empowered through this vision; stepping into lives of purpose, leadership, and faithful service.
              </p>
            </div>
          </div>

          {/* Media Ministry Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 mb-6">Media Teaching Ministry</h2>
              <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-transparent bg-clip-text">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">Sanctuary Word Media</h3>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                To strengthen the spiritual understanding and to expand the reach of God's Word, the church established <span className="text-amber-300 font-semibold">Sanctuary Word Media</span>, dedicated to creating quality content solely for spiritual edification. This initiative focuses on publishing and proclaiming the Word of God in various languages, making solid biblical teaching accessible to a broader audience across the globe.
              </p>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-8 md:p-12">
                  <h4 className="text-xl md:text-2xl font-bold text-amber-100 mb-6 text-center">Prof. P. M. Varkey's Teaching Ministry</h4>
                  <div className="space-y-6">
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                      A defining contribution to this media mission has been the in-depth and systematic teaching ministry of <span className="text-amber-300 font-semibold">Prof. P. M. Varkey</span>, a seasoned Bible teacher with prophetic insight into the Scripture.
                    </p>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                      He undertook a comprehensive study covering the entire Bible, presenting structured analysis and spiritual interpretation that, through media outreach, has become a treasured study resource.
                    </p>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                      His teachings—first developed in Malayalam, was later translated into English and Hindi—have become a spiritual feast for many, especially those with a deep hunger for God's Word.
                    </p>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                      By His divine grace, the Lord enabled the team to complete the recording of the series over the span of several years, even amidst various challenges, including the pandemic. Today, these resources serve as a powerful tool for Bible study, discipleship, and spiritual formation across linguistic and cultural boundaries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Church for Churches Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 mb-6">A Church for the Churches</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Under the spiritual oversight and broader vision of <span className="text-amber-300 font-semibold">Evangelist Saju John Mathew</span>, the church evolved into a church for many churches—a spiritual family that supports, empowers, and walks alongside other ministries without imposing organizational structures or denominational labels.
              </p>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                This open and Spirit-led approach has encouraged many fellowships and church plants across India to flourish with freedom, rooted in the truth and united in His love.
              </p>
            </div>
          </div>

          {/* Where We Are Today Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 mb-6">Where We Are Today</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed text-center">
                From its beginnings as a humble Bible class to a growing network of churches, media ministries, and teaching resources, the story of Edappally Church of God stands as a powerful testament to God's vision, obedience, and His divine guidance.
              </p>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 backdrop-blur-sm border border-amber-500/30 rounded-3xl p-8 md:p-12">
                  <h3 className="text-xl md:text-2xl font-bold text-amber-100 mb-8 text-center">Today, we continue to:</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mt-3 flex-shrink-0 shadow-lg"></div>
                      <p className="text-base md:text-lg text-gray-300">Make disciples who reflect Christ in word and deed</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mt-3 flex-shrink-0 shadow-lg"></div>
                      <p className="text-base md:text-lg text-gray-300">Teach and model the commands of Jesus Christ</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mt-3 flex-shrink-0 shadow-lg"></div>
                      <p className="text-base md:text-lg text-gray-300">Equip leaders with spiritual depth and servant-heartedness</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mt-3 flex-shrink-0 shadow-lg"></div>
                      <p className="text-base md:text-lg text-gray-300">Strengthen churches and networks through shared resources</p>
                    </div>
                    <div className="flex items-start space-x-4 md:col-span-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mt-3 flex-shrink-0 shadow-lg"></div>
                      <p className="text-base md:text-lg text-gray-300">Produce Bible-based media content for multigenerational growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Statement */}
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm border border-amber-500/50 rounded-3xl p-8 md:p-12 text-center">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                Through every season, one truth remains central:
              </p>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl italic text-amber-200 leading-relaxed font-light">
                "Jesus Christ is the foundation and goal of everything we do—until every person is brought to full maturity in Him."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
                      <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-transparent bg-clip-text mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Join Our Journey</h2>
            </div>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full mx-auto mb-12"></div>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Be part of a movement that's transforming lives and communities through the power of Christ
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/contact" className="bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-bold py-4 px-10 rounded-xl hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg">
              Connect With Us
            </a>
            <a href="/attend" className="border-2 border-amber-600 text-amber-100 font-bold py-4 px-10 rounded-xl hover:bg-amber-600 hover:text-black transition-all duration-300 shadow-2xl text-lg">
              Visit Our Church
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}