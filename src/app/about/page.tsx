import React from "react";

export default function AboutPage() {
  return (
    <main className="container mx-auto py-12 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About Our Church</h1>

      {/* Church History */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Church History</h2>
        <p className="text-gray-700 leading-relaxed">
          Founded in the early 20th century, our church has been a beacon of faith and hope for generations. From humble beginnings, we have grown into a vibrant community, rooted in tradition yet open to new ways of serving God and our neighbors.
        </p>
      </section>

      {/* Mission and Beliefs */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Mission and Beliefs</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to share the love of Christ, nurture spiritual growth, and serve all people. We believe in the authority of the Bible, the power of prayer, and the importance of living out our faith through compassion, justice, and humility.
        </p>
      </section>

      {/* Ministry Activities */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Ministry Activities</h2>
        <p className="text-gray-700 leading-relaxed">
          We offer a variety of ministries for all ages, including worship services, Bible studies, youth and children's programs, music ministry, outreach, and support groups. Our ministries are designed to help everyone grow in faith and find their place in God's family.
        </p>
      </section>

      {/* Community Involvement */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Community Involvement</h2>
        <p className="text-gray-700 leading-relaxed">
          Our church is deeply committed to serving our local community through food drives, educational programs, health camps, and partnerships with local organizations. We strive to be a source of hope and help to all who are in need.
        </p>
      </section>
    </main>
  );
} 