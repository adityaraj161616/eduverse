# 🎓 EduVerse - Explore. Learn. Evolve.

A modern, full-stack online learning platform built with Next.js 15, MongoDB, and TypeScript. EduVerse provides a comprehensive solution for online education with student enrollment, progress tracking, video courses, and admin management.

![EduVerse Platform](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80)

## ✨ Features

### 🎓 Student Features
- **Secure Authentication** - JWT-based login/registration with HTTP-only cookies
- **Course Browsing** - Filter courses by category, level, and price
- **Video Learning** - Watch course videos with progress tracking
- **Personal Dashboard** - Track enrolled courses and learning progress
- **Progress Tracking** - Visual progress bars and completion status
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### 👨‍💼 Admin Features
- **Admin Dashboard** - Platform statistics and analytics overview
- **Course Management** - Create, edit, and manage courses
- **User Management** - Manage student accounts and permissions
- **Content Control** - Upload videos, set pricing, and publish courses
- **Analytics** - Track user engagement and course performance

### 🛠 Technical Features
- **Modern Stack** - Next.js 15, TypeScript, MongoDB, Tailwind CSS
- **Authentication** - JWT tokens with secure cookie storage
- **Database** - MongoDB with Mongoose ODM
- **UI Components** - shadcn/ui for consistent design
- **Video Support** - HTML5 video player with custom controls
- **API Routes** - RESTful API with proper error handling

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and npm/yarn
- **MongoDB database** (MongoDB Atlas recommended for production)
- **Git** for version control

### Step-by-Step Setup

#### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/eduverse.git
cd eduverse
\`\`\`

#### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

#### 3. Environment Configuration

Create a `.env.local` file in the root directory and add the following variables:

\`\`\`env
# Required: Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eduverse?retryWrites=true&w=majority

# Required: Authentication Secret
JWT_SECRET=your-super-secure-jwt-secret-key-here-make-it-long-and-random

# Required: Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Cloudinary (for video uploads in production)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: Stripe (for payment processing)
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
\`\`\`

#### 4. Generate JWT Secret
Generate a secure JWT secret using Node.js:
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
\`\`\`
Copy the output and use it as your `JWT_SECRET` value.

#### 5. Database Setup Options

**Option A: MongoDB Atlas (Recommended for Production)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string from "Connect" → "Connect your application"
4. Replace `<username>`, `<password>`, and `<cluster-url>` in the connection string
5. Add the connection string to your `.env.local` as `MONGODB_URI`

**Option B: Local MongoDB (Development)**
\`\`\`bash
# Install MongoDB locally (macOS)
brew install mongodb/brew/mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Use local connection string in .env.local
MONGODB_URI=mongodb://localhost:27017/eduverse
\`\`\`

**Option C: Docker MongoDB (Development)**
\`\`\`bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Use local connection string in .env.local
MONGODB_URI=mongodb://localhost:27017/eduverse
\`\`\`

#### 6. Initialize Database
\`\`\`bash
# Set up database indexes
npm run db:setup

# Seed with sample data (optional but recommended)
npm run db:seed
\`\`\`

#### 7. Start Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

#### 8. Access the Application
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:3000/api](http://localhost:3000/api)

### 🔑 Test Accounts (After Seeding)

Once you run the seed script, you can use these test accounts:

**Admin Account:**
- Email: `admin@eduverse.com`
- Password: `admin123`
- Access: Full admin panel, course management

**Student Accounts:**
- Email: `john@example.com` / Password: `student123`
- Email: `jane@example.com` / Password: `student123`
- Email: `mike@example.com` / Password: `student123`
- Access: Student dashboard, course enrollment

### ⚠️ Important Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use strong JWT secrets** - Generate random 64-character strings
3. **MongoDB Atlas IP Whitelist** - Add your IP address or use `0.0.0.0/0` for development
4. **Environment Variables** - All required variables must be set before starting

### 🔧 Troubleshooting

**Database Connection Issues:**
\`\`\`bash
# Check if MongoDB is running (local)
brew services list | grep mongodb

# Test connection
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduverse').then(() => console.log('Connected!')).catch(err => console.error('Connection failed:', err))"
\`\`\`

**Port Already in Use:**
\`\`\`bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
\`\`\`

**Missing Dependencies:**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 📁 Project Structure

\`\`\`
eduverse/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── courses/
│   │   └── page.tsx
│   ├── course/[id]/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── courses/
│   │   └── user/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/                   # Reusable Components
│   ├── ui/                      # shadcn/ui components
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── featured-courses.tsx
│   └── footer.tsx
├── lib/                         # Utilities
│   ├── db.ts                    # Database connection
│   ├── auth.ts                  # Authentication utilities
│   └── utils.ts
├── models/                      # Database Models
│   ├── user.ts
│   ├── course.ts
│   └── progress.ts
├── scripts/                     # Database scripts
│   └── setup-database.sql
├── public/                      # Static assets
│   ├── images/
│   └── videos/
└── README.md
\`\`\`

## 🔧 Configuration

### Database Setup

1. **MongoDB Atlas (Recommended)**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string
   - Add it to \`.env.local\` as \`MONGODB_URI\`

2. **Local MongoDB**
   \`\`\`bash
   # Install MongoDB locally
   brew install mongodb/brew/mongodb-community
   
   # Start MongoDB service
   brew services start mongodb/brew/mongodb-community
   
   # Use local connection string
   MONGODB_URI=mongodb://localhost:27017/eduverse
   \`\`\`

### JWT Secret
Generate a secure JWT secret:
\`\`\`bash
# Generate a random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

### Video Storage Options

**Option 1: Cloudinary (Production)**
- Sign up at [Cloudinary](https://cloudinary.com/)
- Add credentials to \`.env.local\`
- Supports video optimization and CDN delivery

**Option 2: Local Storage (Development)**
- Place videos in \`public/videos/\` folder
- Reference as \`/videos/filename.mp4\`
- Good for development and testing

## 🌍 Environment Variables Guide

### Required Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.net/eduverse` | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT tokens | `64-character-random-string` | ✅ Yes |
| `NEXT_PUBLIC_APP_URL` | Application base URL | `http://localhost:3000` | ✅ Yes |

### Optional Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` | ❌ No |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` | ❌ No |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-api-secret` | ❌ No |
| `SMTP_HOST` | Email server host | `smtp.gmail.com` | ❌ No |
| `SMTP_PORT` | Email server port | `587` | ❌ No |
| `SMTP_USER` | Email username | `your-email@gmail.com` | ❌ No |
| `SMTP_PASS` | Email password/app password | `your-app-password` | ❌ No |
| `STRIPE_PUBLIC_KEY` | Stripe publishable key | `pk_test_...` | ❌ No |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` | ❌ No |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` | ❌ No |

### Setting Up Each Service

#### MongoDB Atlas Setup
1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Choose free tier (M0)
3. **Create Database User**: 
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password
4. **Whitelist IP**: 
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add `0.0.0.0/0` for development (allow all)
5. **Get Connection String**:
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<dbname>`

#### Cloudinary Setup (Optional)
1. **Create Account**: Go to [Cloudinary](https://cloudinary.com/)
2. **Get Credentials**: 
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret
3. **Configure Upload Presets**:
   - Go to Settings → Upload
   - Create upload preset for videos
   - Set folder structure

#### Gmail SMTP Setup (Optional)
1. **Enable 2FA**: On your Google account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Use Credentials**:
   - SMTP_HOST: `smtp.gmail.com`
   - SMTP_PORT: `587`
   - SMTP_USER: Your Gmail address
   - SMTP_PASS: Generated app password

#### Stripe Setup (Optional)
1. **Create Account**: Go to [Stripe](https://stripe.com/)
2. **Get API Keys**:
   - Go to Developers → API keys
   - Copy Publishable key and Secret key
3. **Set Up Webhooks**:
   - Go to Developers → Webhooks
   - Add endpoint: `your-domain.com/api/webhooks/stripe`
   - Copy webhook secret

### Development vs Production

#### Development (.env.local)
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/eduverse
JWT_SECRET=dev-secret-key-change-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

#### Production (Vercel/Hosting Platform)
\`\`\`env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/eduverse
JWT_SECRET=super-secure-64-character-random-string
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

### Security Best Practices

1. **JWT Secret**: Use `crypto.randomBytes(64).toString('hex')`
2. **MongoDB**: Use strong passwords and IP whitelisting
3. **Environment Files**: Never commit `.env.local` to version control
4. **Production**: Use different secrets for production
5. **API Keys**: Rotate keys regularly

## 🎬 Sample Content

### Test Videos
Use these free sample videos for testing:
- [Big Buck Bunny](https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4)
- [Elephant Dream](https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4)
- [Pexels Learning Video](https://videos.pexels.com/video-files/4148801/4148801-hd_1920_1080_25fps.mp4)

### Sample Course Categories
- Web Development
- Data Science
- UI/UX Design
- Digital Marketing
- Business Strategy
- Programming Fundamentals

## 🧪 Testing

### Test Accounts
Create these test accounts for development:

**Admin Account:**
- Email: admin@eduverse.com
- Password: admin123
- Role: admin

**Student Account:**
- Email: student@eduverse.com
- Password: student123
- Role: student

### Running Tests
\`\`\`bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
\`\`\`

## 📱 Mobile Responsiveness

The platform is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Test on different devices:
\`\`\`bash
# Mobile simulation
npm run dev:mobile

# Tablet simulation
npm run dev:tablet
\`\`\`

## 🔐 Security Features

- **JWT Authentication** with HTTP-only cookies
- **Password Hashing** using bcrypt
- **Input Validation** on all forms
- **CORS Protection** for API routes
- **Rate Limiting** on authentication endpoints
- **SQL Injection Prevention** with Mongoose

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to [Vercel](https://vercel.com)
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Environment Variables in Vercel**
   Add these in your Vercel project settings:
   - \`MONGODB_URI\`
   - \`JWT_SECRET\`
   - \`CLOUDINARY_CLOUD_NAME\` (if using Cloudinary)
   - \`CLOUDINARY_API_KEY\`
   - \`CLOUDINARY_API_SECRET\`

### Alternative Deployment Options

**Docker**
\`\`\`bash
# Build Docker image
docker build -t eduverse .

# Run container
docker run -p 3000:3000 eduverse
\`\`\`

**Traditional Hosting**
\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🛣️ Roadmap & Next Steps

### Phase 1: Core Platform ✅
- [x] User authentication and authorization
- [x] Course browsing and enrollment
- [x] Video player and progress tracking
- [x] Student dashboard
- [x] Admin panel basics
- [x] Responsive design

### Phase 2: Enhanced Features 🚧
- [ ] **Payment Integration** - Stripe for paid courses
- [ ] **Advanced Video Player** - Custom controls, speed adjustment
- [ ] **Course Reviews** - Student ratings and feedback
- [ ] **Certificates** - PDF generation for completed courses
- [ ] **Discussion Forums** - Course-specific discussions
- [ ] **Live Classes** - Integration with Zoom/Meet

### Phase 3: Advanced Features 📋
- [ ] **Mobile App** - React Native companion app
- [ ] **AI Recommendations** - Personalized course suggestions
- [ ] **Gamification** - Badges, streaks, and achievements
- [ ] **Multi-language** - Internationalization support
- [ ] **Advanced Analytics** - Detailed learning analytics
- [ ] **API for Third-party** - Public API for integrations

### Phase 4: Scale & Performance 🚀
- [ ] **Microservices** - Split into smaller services
- [ ] **CDN Integration** - Global content delivery
- [ ] **Caching Layer** - Redis for improved performance
- [ ] **Load Balancing** - Handle high traffic
- [ ] **Monitoring** - Application performance monitoring

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add amazing feature'
\`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation as needed
- Follow semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment platform
- **MongoDB** - For the flexible database solution
- **shadcn/ui** - For beautiful UI components
- **Tailwind CSS** - For utility-first CSS framework
- **Pexels** - For free stock videos and images

## 📞 Support

- **Documentation**: [docs.eduverse.com](https://docs.eduverse.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/eduverse/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/eduverse/discussions)
- **Email**: support@eduverse.com

## 🌟 Show Your Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase
- 📢 Sharing with others

---

**Built with ❤️ by the EduVerse Team**

*Empowering learners worldwide through technology and innovation.*
\`\`\`

## 📊 Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 95+

### Load Times (Target)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s

## 🔍 SEO Optimization

- **Meta Tags** - Dynamic meta descriptions for courses
- **Open Graph** - Social media sharing optimization
- **Structured Data** - Course schema markup
- **Sitemap** - Auto-generated XML sitemap
- **Robots.txt** - Search engine crawling guidelines

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** 14+
- **Chrome Mobile** 90+

---

*Last updated: January 2024*
