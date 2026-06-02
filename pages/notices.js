import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Notices() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/notices')
      if (!response.ok) throw new Error('Failed to fetch notices')
      const data = await response.json()
      
      // Sort notices: Urgent first, then by publish date
      const sorted = data.sort((a, b) => {
        if (a.priority === 'URGENT' && b.priority !== 'URGENT') return -1
        if (a.priority !== 'URGENT' && b.priority === 'URGENT') return 1
        return new Date(b.publishDate) - new Date(a.publishDate)
      })
      
      setNotices(sorted)
      setError(null)
    } catch (err) {
      console.error('Error fetching notices:', err)
      setError('Failed to load notices')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      EXAM: 'bg-purple-100 text-purple-800',
      EVENT: 'bg-green-100 text-green-800',
      GENERAL: 'bg-blue-100 text-blue-800',
    }
    return colors[category] || colors.GENERAL
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            📋 Notice Board
          </Link>
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

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">All Notices</h1>
          <p className="text-gray-600">Stay updated with the latest announcements</p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading notices...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && notices.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-2xl text-gray-600 mb-4">No notices yet</p>
            <Link href="/add-notice" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
              Create First Notice
            </Link>
          </div>
        )}

        {!loading && notices.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition ${
                  notice.priority === 'URGENT' ? 'border-l-4 border-red-500 bg-red-50' : 'bg-white'
                }`}
              >
                {notice.image && (
                  <div className="h-40 overflow-hidden bg-gray-200">
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="w-full h-full object-cover hover:scale-105 transition"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex flex-wrap gap-2">
                      {notice.priority === 'URGENT' && (
                        <span className="urgent-badge">🚨 URGENT</span>
                      )}
                      <span className={`category-badge ${getCategoryColor(notice.category)}`}>
                        {notice.category}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{notice.title}</h2>

                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {notice.body}
                  </p>

                  <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
                    <p>📅 {formatDate(notice.publishDate)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
