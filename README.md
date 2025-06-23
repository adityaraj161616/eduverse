# 🎓 EduVerse - Premium Online Learning Platform

A world-class online learning platform built with Next.js 15, featuring virtual classrooms, advanced progress tracking, and premium UI/UX design inspired by Cuberto.com.

![EduVerse Platform](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎥 Virtual Classes
- **Live Interactive Sessions** with video conferencing
- **Real-time Chat** and participant management
- **Screen Sharing** and presentation tools
- **Recording & Playback** functionality
- **Breakout Rooms** for group activities
- **Attendance Tracking** and engagement metrics

### 📊 Advanced Progress Tracking
- **Comprehensive Analytics Dashboard** with visualizations
- **Learning Path Progression** with milestone tracking
- **Skill Development** and competency mapping
- **Achievement System** with badges and rewards
- **Study Streak Monitoring** and consistency tracking
- **Performance Metrics** and comparative analysis

### 🔐 Enhanced Authentication
- **Multi-Provider OAuth** (Google, GitHub, LinkedIn, Facebook)
- **Two-Factor Authentication** support
- **Advanced Session Management** with security levels
- **Account Recovery** and verification systems
- **Device Management** and audit logging
- **Privacy Controls** and security tiers

### 🎨 Premium UI/UX Design
- **Cuberto-inspired Design** with smooth animations
- **Glassmorphism Effects** and gradient backgrounds
- **Responsive Design** across all devices
- **Dark Theme** with accent colors
- **Interactive Elements** with hover effects
- **Modern Typography** and spacing

### 💳 Payment Integration
- **Razorpay Integration** for secure payments
- **Multiple Payment Methods** support
- **Payment Link Generation** for easy sharing
- **Transaction Verification** and status tracking
- **Automated Enrollment** after successful payment

### 📱 Core Features
- **Course Management** with detailed curriculum
- **User Dashboard** with personalized insights
- **Mobile-Responsive** design
- **Search and Filtering** capabilities
- **Newsletter Subscription** system
- **Contact Forms** and support system

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication library
- **bcryptjs** - Password hashing
- **JWT** - JSON Web Tokens

### Payment & Communication
- **Razorpay** - Payment gateway
- **SMS API** - Text messaging
- **Email Services** - Automated emails

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm 8+
- MongoDB database
- Razorpay account for payments

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/eduverse.git
cd eduverse
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Setup
Create a `.env.local` file in the root directory:

\`\`\`env
# Database
MONGODB_URI=mongodb://localhost:27017/eduverse

# Authentication
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Payment Gateway
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id

# SMS Service
SMS_API_KEY=your-sms-api-key
SMS_SENDER_ID=your-sender-id
\`\`\`

### 4. Database Setup
\`\`\`bash
# Setup database collections and indexes
npm run db:setup

# Seed with sample data
npm run db:seed
\`\`\`

### 5. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## 🏗️ Project Structure

\`\`\`
eduverse/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── api/                      # API routes
│   ├── courses/                  # Course pages
│   ├── virtual-classes/          # Virtual classroom
│   ├── progress/                 # Progress tracking
│   ├── dashboard/                # User dashboard
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # UI components
│   ├── navbar.tsx                # Navigation
│   ├── hero.tsx                  # Hero section
│   └── footer.tsx                # Footer
├── lib/                          # Utility libraries
│   ├── db.ts                     # Database connection
│   └── utils.ts                  # Helper functions
├── models/                       # Database models
│   ├── user.ts                   # User model
│   ├── course.ts                 # Course model
│   └── progress.ts               # Progress model
├── scripts/                      # Database scripts
│   ├── setup-database.js         # Database setup
│   └── seed-database.js          # Data seeding
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
└── types/                        # TypeScript types
\`\`\`

## 🔧 Available Scripts

\`\`\`bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:setup         # Setup database collections
npm run db:seed          # Seed sample data

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run end-to-end tests
\`\`\`

## 🌟 Key Features Breakdown

### Virtual Classroom Experience
- **HD Video Conferencing** with up to 50 participants
- **Interactive Whiteboard** for collaborative learning
- **Screen Sharing** for presentations and demos
- **Real-time Chat** with moderation capabilities
- **Breakout Rooms** for small group discussions
- **Recording Functionality** for later review
- **Mobile-Responsive** classroom interface

### Progress Analytics
- **Learning Dashboard** with comprehensive insights
- **Skill Progression** tracking with XP system
- **Achievement Badges** for motivation
- **Study Streak** monitoring
- **Performance Comparisons** with peers
- **Learning Path Visualization**
- **Time Tracking** and productivity metrics

### Authentication & Security
- **OAuth Integration** with major providers
- **Two-Factor Authentication** for enhanced security
- **Session Management** with device tracking
- **Account Recovery** system
- **Privacy Controls** and data protection
- **Audit Logging** for security monitoring

## 📱 Mobile Experience

EduVerse is fully responsive and optimized for mobile devices:
- **Touch-Friendly Interface** with gesture support
- **Mobile Virtual Classroom** with optimized controls
- **Offline Content** caching for uninterrupted learning
- **Push Notifications** for class reminders
- **Progressive Web App** capabilities

## 🔒 Security Features

- **Data Encryption** for sensitive information
- **CSRF Protection** on all forms
- **Rate Limiting** on API endpoints
- **Input Validation** and sanitization
- **Secure Headers** configuration
- **Environment Variable** protection

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Cuberto.com** for design inspiration
- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment
- **MongoDB** for database solutions
- **Razorpay** for payment processing

## 📞 Support

For support and questions:
- 📧 Email: support@eduverse.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/eduverse/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/eduverse/wiki)

---

**Built with ❤️ by the EduVerse Team**

*Transforming online education with cutting-edge technology and premium user experience.*
