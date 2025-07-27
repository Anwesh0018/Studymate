import React from 'react';

export default function InfoPage() {
  return (
    <div className=" bg-opacity-90 text-white py-12 px-6 sm:px-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">What You’ll Get in This App</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
        <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📝 Notes</h3>
          <p>Access curated notes for UPSC, IIT-JEE, and NEET, organized by subjects.</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📚 Syllabus-wise Resources</h3>
          <p>Explore topic-wise content tailored to competitive exam syllabi.</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📦 Organized Subjects</h3>
          <p>Study subjects grouped by exam categories to save time and effort.</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🧠 Smart Recommendations</h3>
          <p>Coming soon: personalized suggestions based on your usage.</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🔍 Easy Navigation</h3>
          <p>Quickly jump to topics using a clean, responsive interface.</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🧾 Updates & Announcements</h3>
          <p>Stay updated with important news and new content additions.</p>
        </div>
      </div>
    </div>
  );
}
