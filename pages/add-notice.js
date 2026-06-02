import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function AddNotice() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category: 'GENERAL',
    priority: 'NORMAL',
    publishDate: new Date().toISOString().split('T')[0],
    image: '',
  })

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must not exceed 255 characters'
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Body is required'
    } else if (formData.body.length < 10) {
      newErrors.body = 'Body must be at least 10 characters'
    }

    if (!formData.publishDate) {
      newErrors.publishDate = 'Publish date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          body: formData.body.trim(),
          category: formData.category,
          priority: formData.priority,
          publishDate: new Date(formData.publishDate),
          image: formData.image || null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(`Error: ${error.message || 'Failed to create notice'}`)
        return
      }

      alert('Notice created successfully!')
      router.push('/notices')
    } catch (error) {
      console.error('Error:', error)
      alert('Error creating notice. Please try again.')
    } finally {
      setLoading(false)
    }
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
            <Link href="/add-notice" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
              + Add Notice
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Notice</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to create a new notice</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter notice title"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Body */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                Body <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Enter notice details"
                rows="6"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.body ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="GENERAL">General</option>
                <option value="EXAM">Exam</option>
                <option value="EVENT">Event</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            {/* Publish Date */}
            <div>
              <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.publishDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.publishDate && <p className="text-red-500 text-sm mt-1">{errors.publishDate}</p>}
            </div>

            {/* Image URL (Optional) */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Creating...' : 'Create Notice'}
              </button>
              <Link href="/notices" className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition text-center">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
