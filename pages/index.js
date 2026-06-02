import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">📋 Notice Board</h1>
          <div className="space-x-4">
            <Link href="/notices" className="text-gray-700 hover:text-indigo-600 font-medium">
              View Notices
            </Link>
            <Link href="/add-notice" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              + Add Notice
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Notice Board</h2>
        <p className="text-xl text-gray-600 mb-8">
          Stay updated with the latest notices about exams, events, and general announcements.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 my-12">
          <Link href="/notices" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">View All Notices</h3>
            <p className="text-gray-600">Browse all notices with priority filtering</p>
          </Link>

          <Link href="/add-notice" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
            <div className="text-4xl mb-4">✏️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Create Notice</h3>
            <p className="text-gray-600">Add a new notice to the board</p>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Features</h3>
          <ul className="text-left max-w-2xl mx-auto space-y-2 text-gray-600">
            <li>✅ Create and manage notices</li>
            <li>✅ Categorize notices (Exam, Event, General)</li>
            <li>✅ Set priority levels (Normal, Urgent)</li>
            <li>✅ Responsive design for mobile & desktop</li>
            <li>✅ Urgent notices highlighted with red badge</li>
            <li>✅ Optional image support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
