import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Edappally Church of God | A Christ-Centered Movement in India",
  description:
    "Discover the journey of Edappally Church of God—a Spirit-led, Christ-centered ministry in Kerala focused on making disciples, planting churches, and equipping leaders across India and beyond.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center py-10 px-2 md:px-4">
      <div className="w-full max-w-3xl">
        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-6 top-0 h-full border-l-4 border-amber-700 z-0" aria-hidden="true"></div>
          <div className="space-y-16">

            {/* About Us */}
            <div className="relative flex md:items-center">
              <div className="hidden md:flex flex-col items-center z-10">
                <span className="w-6 h-6 rounded-full bg-amber-700 border-4 border-black"></span>
                <span className="flex-1 w-1 bg-amber-700"></span>
              </div>
              <div className="md:ml-16 flex-1">
                <section className="text-center">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-amber-100 mb-4 tracking-tight drop-shadow-lg">
                    About Us
                  </h1>
                  <h2 className="text-lg md:text-xl font-semibold mb-6 text-amber-100">
                    From Vision to Movement—Transforming Lives for the Glory of Christ
                  </h2>
                  <p className="text-base md:text-lg text-gray-200 font-light mb-4">
                    What began as a simple vision in one man’s heart has, by the grace of God, grown into a vibrant, Spirit-led movement impacting individuals, families, and communities across India and beyond. <span className="font-semibold text-amber-100">Edappally Church of God</span> is a Christ-centered ministry committed to making mature disciples, equipping leaders, and planting churches that reflect the character and mission of Jesus.
                  </p>
                  <div className="flex justify-center my-8">
                    <span className="inline-block w-24 h-0.5 bg-amber-700 rounded-full"></span>
                  </div>
                </section>
              </div>
            </div>

            {/* Our Journey */}
            <div className="relative flex md:items-center">
              <div className="hidden md:flex flex-col items-center z-10">
                <span className="w-6 h-6 rounded-full bg-amber-700 border-4 border-black"></span>
                <span className="flex-1 w-1 bg-amber-700"></span>
              </div>
              <div className="md:ml-16 flex-1">
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-amber-100 text-center mb-8 tracking-tight">Our Journey: From a Seed to a Mission</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-amber-100 mb-2">The Beginning: A Vision is Born <span className="font-normal text-gray-400">(2000)</span></h3>
                      <p className="text-gray-200 leading-relaxed">
                        In June 2000, John A.C. received a clear and compelling vision from the Lord for the city of Ernakulam, Kerala. Moved by this divine call, he began a small Bible study at YMCA Ernakulam, gathering a few believers with a deep hunger for God’s Word.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-amber-100 mb-2">The Birth of a Church <span className="font-normal text-gray-400">(2001)</span></h3>
                      <p className="text-gray-200 leading-relaxed">
                        As the fellowship grew in faith and numbers, the Bible class was officially established as Edappally Church of God in January 2001. Later that year, the church moved to Edappally Toll, where it found a more permanent place to worship, serve, and grow. Driven by a heart for evangelism and discipleship, the ministry began reaching into rural areas, proclaiming the gospel and raising up faithful followers of Christ.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center my-8">
                    <span className="inline-block w-24 h-0.5 bg-amber-700 rounded-full"></span>
                  </div>
                </section>
              </div>
            </div>

            {/* Our Mission */}
            <div className="relative flex md:items-center">
              <div className="hidden md:flex flex-col items-center z-10">
                <span className="w-6 h-6 rounded-full bg-amber-700 border-4 border-black"></span>
                <span className="flex-1 w-1 bg-amber-700"></span>
              </div>
              <div className="md:ml-16 flex-1">
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-amber-100 text-center mb-8 tracking-tight">Our Mission: Making Mature Disciples of Jesus</h2>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    Under the leadership of Pastor Mathew Varughese for over 20 years, the church has remained rooted in its core mission:
                  </p>
                  <blockquote className="text-lg md:text-xl italic text-amber-100 bg-gray-900 border-l-8 border-amber-700 px-6 py-4 mx-auto max-w-2xl rounded-lg shadow-lg mb-6">
                    “To make disciples who obey all that Jesus commanded, live out the Great Commission, and grow into maturity in Christ.”
                  </blockquote>
                  <p className="text-gray-200 leading-relaxed">
                    Through intentional teaching, mentoring, and community life, the church has helped shape leaders, evangelists, and servant-hearted believers who continue to impact their spheres of influence for the Kingdom of God.
                  </p>
                  <div className="flex justify-center my-8">
                    <span className="inline-block w-24 h-0.5 bg-amber-700 rounded-full"></span>
                  </div>
                </section>
              </div>
            </div>

            {/* Media Ministry */}
            <div className="relative flex md:items-center">
              <div className="hidden md:flex flex-col items-center z-10">
                <span className="w-6 h-6 rounded-full bg-amber-700 border-4 border-black"></span>
                <span className="flex-1 w-1 bg-amber-700"></span>
              </div>
              <div className="md:ml-16 flex-1">
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-amber-100 text-center mb-8 tracking-tight">Media Ministry: Sanctuary Word Media</h2>
                  <p className="text-gray-200 leading-relaxed">
                    To expand the reach of biblical teaching, Sanctuary Word Media was launched as the church’s dedicated media ministry. Through publishing, audio-visual content, and digital media in multiple languages, this initiative provides solid, Christ-centered resources to equip and edify the global Church.
                  </p>
                  <div className="flex justify-center my-8">
                    <span className="inline-block w-24 h-0.5 bg-amber-700 rounded-full"></span>
                  </div>
                </section>
              </div>
            </div>

            {/* A Church That Serves Other Churches */}
            <div className="relative flex md:items-center">
              <div className="hidden md:flex flex-col items-center z-10">
                <span className="w-6 h-6 rounded-full bg-amber-700 border-4 border-black"></span>
                <span className="flex-1 w-1 bg-amber-700"></span>
              </div>
              <div className="md:ml-16 flex-1">
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-amber-100 text-center mb-8 tracking-tight">A Church That Serves Other Churches</h2>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    With the apostolic vision and spiritual covering of Evangelist Saju John Mathew, the ministry has grown into a broader movement—a spiritual home and training ground for churches across regions. Operating without denominational or organizational walls, this Christ-centered network empowers fellowships to flourish organically, led by the Holy Spirit and grounded in the Word.
                  </p>
                  <p className="text-gray-200 leading-relaxed">
                    Churches have been planted and leaders trained across India through this model of unity in diversity. The emphasis remains on relational discipleship, spiritual maturity, and faithful obedience to Jesus.
                  </p>
                  <div className="flex justify-center my-8">
                    <span className="inline-block w-24 h-0.5 bg-amber-700 rounded-full"></span>
                  </div>
                </section>
              </div>
            </div>

            {/* Where We Stand Today */}
            <div className="relative flex md:items-center">
              <div className="hidden md:flex flex-col items-center z-10">
                <span className="w-6 h-6 rounded-full bg-amber-700 border-4 border-black"></span>
              </div>
              <div className="md:ml-16 flex-1">
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-amber-100 text-center mb-8 tracking-tight">Where We Stand Today</h2>
                  <p className="text-gray-200 leading-relaxed mb-6">
                    From a humble Bible class to a growing network of disciples, churches, and ministries, Edappally Church of God continues to pursue its God-given calling with unwavering focus.
                  </p>
                  <p className="text-gray-200 leading-relaxed mb-4">Today, we are committed to:</p>
                  <ul className="list-disc list-inside text-gray-100 leading-relaxed space-y-2 mb-6 pl-4">
                    <li>Raising mature disciples who reflect Christ in character and conduct</li>
                    <li>Teaching biblical truth and modeling obedience to Jesus’ commands</li>
                    <li>Equipping servant-hearted leaders with spiritual depth and integrity</li>
                    <li>Supporting churches and ministries beyond organizational limitations</li>
                    <li>Producing transformative media to edify the global body of Christ</li>
                  </ul>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    Through every season, Jesus Christ remains our focus, and our mission remains clear:
                  </p>
                  <blockquote className="text-lg md:text-xl italic text-amber-100 bg-gray-900 border-l-8 border-amber-700 px-6 py-4 mx-auto max-w-2xl rounded-lg shadow-lg">
                    “To make disciples of all nations, teaching them to observe everything He has commanded, until Christ is fully formed in every believer.”
                  </blockquote>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
     );
}