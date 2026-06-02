import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Fetch all notices
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: 'desc' }, // URGENT first
          { publishDate: 'desc' }, // Then by date
        ],
      })
      return res.status(200).json(notices)
    }

    if (req.method === 'POST') {
      // Create a new notice
      const { title, body, category, priority, publishDate, image } = req.body

      // Validation
      if (!title || !body) {
        return res.status(400).json({ message: 'Title and body are required' })
      }

      if (title.length < 3 || title.length > 255) {
        return res.status(400).json({ message: 'Title must be between 3 and 255 characters' })
      }

      if (body.length < 10) {
        return res.status(400).json({ message: 'Body must be at least 10 characters' })
      }

      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category: category || 'GENERAL',
          priority: priority || 'NORMAL',
          publishDate: publishDate ? new Date(publishDate) : new Date(),
          image: image || null,
        },
      })

      return res.status(201).json(notice)
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}
