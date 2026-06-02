# Notice Board Application

A modern, responsive Notice Board web application built with **Next.js**, **Prisma**, **TiDB Cloud**, and **Tailwind CSS**. This is a full-stack web development assignment that demonstrates CRUD operations, form validation, database integration, and responsive design.

## 🎯 Features

- ✅ **Create Notices** - Add new notices with title, body, category, and priority
- ✅ **View All Notices** - Display notices as responsive cards
- ✅ **Priority Sorting** - Urgent notices appear first with red badge
- ✅ **Category Support** - Organize by Exam, Event, or General
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Responsive Design** - Mobile and desktop friendly
- ✅ **Optional Images** - Bonus feature to add images to notices
- ✅ **Database Integration** - Prisma ORM with TiDB Cloud

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (Pages Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM + TiDB Cloud (MySQL)
- **Deployment**: Vercel
- **Validation**: Client-side + Server-side

## 📋 Database Schema

```prisma
model Notice {
  id          String    @id @default(cuid())
  title       String    @db.VarChar(255)      // Required
  body        String    @db.LongText          // Required
  category    Category  @default(GENERAL)     // Enum: EXAM, EVENT, GENERAL
  priority    Priority  @default(NORMAL)      // Enum: NORMAL, URGENT
  publishDate DateTime  @default(now())       // Publish date
  image       String?   @db.VarChar(500)      // Optional image URL
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum Category {
  EXAM
  EVENT
  GENERAL
}

enum Priority {
  NORMAL
  URGENT
}
```

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Git
- TiDB Cloud account (free tier available)

### Local Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Satt123-tech/notice-board-app.git
   cd notice-board-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Copy this template and add your database URL:
   ```env
   DATABASE_URL="mysql://username:password@host:port/database_name"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

   **To get your TiDB Cloud connection string:**
   - Go to [TiDB Cloud](https://tidbcloud.com)
   - Create a new cluster (free tier available)
   - Click "Connect" and copy the MySQL connection string
   - Format: `mysql://user:password@host:4000/database`

4. **Set up Prisma and database**
   ```bash
   npx prisma migrate dev --name init
   ```
   This will:
   - Create the database schema
   - Generate Prisma client

5. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

6. **Prisma Studio (Optional - View database)**
   ```bash
   npm run prisma:studio
   ```

## 🚀 Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `DATABASE_URL` (your TiDB Cloud connection string)
   - Click "Deploy"
   - Your app will be live! 🎉

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with navigation |
| `/notices` | View all notices (GET) |
| `/add-notice` | Create new notice form (POST) |
| `/api/notices` | API endpoint for notices |

## ✨ Form Validation

**Title**
- Required field
- Min 3 characters, Max 255 characters

**Body**
- Required field
- Min 10 characters
- Supports long text

**Category**
- Dropdown: Exam, Event, General
- Default: General

**Priority**
- Dropdown: Normal, Urgent
- Default: Normal
- Urgent notices show red badge and appear first

**Publish Date**
- Required field
- Date picker

**Image (Optional)**
- URL format
- Bonus feature

## 🎓 Skills Demonstrated

✅ Frontend development (Next.js + React)
✅ Form validation (Client & Server)
✅ Database integration (Prisma ORM)
✅ API development (REST endpoints)
✅ Responsive design (Tailwind CSS)
✅ Deployment (Vercel)
✅ Git/GitHub workflow
✅ Environment configuration

## 🔮 Future Improvements

### Suggested Enhancement
**Edit & Delete Notices** - Add functionality to:
- Edit existing notices with pre-filled forms
- Delete notices with confirmation dialog
- Track edit history with timestamps
- Add user authentication to restrict edit/delete permissions

This would demonstrate more advanced CRUD operations and user permission management.

## 🤖 AI Usage

This project was developed with guidance from **GitHub Copilot** for:
- Code structure and best practices
- API endpoint design
- Form validation patterns
- Tailwind CSS styling
- Error handling and user feedback
- README documentation
- Database schema design

**Copilot** provided suggestions for improving code quality, component organization, responsive design patterns, and deployment best practices. It helped accelerate development while maintaining code quality and following industry standards.

## 🐛 Troubleshooting

**Issue: "DATABASE_URL not found"**
- Ensure `.env.local` file exists in root directory
- Restart development server after adding environment variables

**Issue: "Prisma Client not found"**
```bash
npx prisma generate
```

**Issue: Database connection fails**
- Verify TiDB Cloud connection string format
- Check if your IP is whitelisted in TiDB Cloud security settings

**Issue: Tailwind CSS not working**
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run dev`

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Created by Satt123-tech for the Web Development Internship Assignment.

---

**Happy coding! 🚀**

For questions or issues, please open a GitHub issue in the repository.
