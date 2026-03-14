# Maison Élégance - Luxury Bag E-Commerce Platform

A sophisticated e-commerce platform for luxury handbags and accessories, built with modern web technologies to deliver an exceptional shopping experience.

## 🛍️ Features

- **Premium Shopping Experience**: Elegant interface designed for luxury fashion
- **User Authentication**: Secure registration, login, and profile management
- **Product Catalog**: Dynamic product display with advanced filtering and search
- **Shopping Cart**: Persistent cart with real-time updates
- **Order Management**: Complete order tracking and history
- **Admin Dashboard**: Comprehensive product and order management
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern Tech Stack**: Built with Next.js, TypeScript, and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aniekwensicodex/luxury-bag-e-commerce.git
cd luxury-bag-e-commerce
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
luxury-bag-e-commerce/
├── app/                    # Next.js app router pages
│   ├── account/           # User account management
│   ├── admin/            # Admin dashboard
│   ├── products/          # Product pages and categories
│   └── layout/            # Layout components
├── components/             # Reusable UI components
│   ├── ui/               # Base UI components (buttons, inputs, etc.)
│   ├── layout/            # Header, footer, navigation
│   └── auth-guard/        # Authentication components
├── lib/                   # Utility functions and contexts
│   ├── store-context.tsx  # Global state management
│   ├── types.ts           # TypeScript type definitions
│   └── api.ts            # API configuration
└── public/                 # Static assets
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Notifications**: [Sonner](https://sonner.dev/)

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📱 Key Features

### User Experience
- **Elegant Design**: Clean, minimalist interface focused on product showcase
- **Smooth Navigation**: Intuitive category browsing and search functionality
- **Secure Checkout**: Safe and secure payment processing
- **Order Tracking**: Real-time order status updates
- **Wishlist Management**: Save favorite items for later

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Inventory Tracking**: Monitor stock levels and availability
- **Order Management**: View and process customer orders
- **Image Upload**: Cloudinary integration for product images
- **Analytics Dashboard**: Sales and performance metrics

## 🛒 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### API Integration

The application integrates with a RESTful API for:

- User authentication and management
- Product catalog operations
- Order processing and tracking
- Inventory management
- Image uploads via Cloudinary

## 📦 Deployment

### Build for Production

```bash
npm run build
```

### Environment Setup

Configure your production environment variables and deploy to your preferred platform:

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site hosting
- **AWS**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Review the documentation
- Check existing discussions for common solutions

---

**Maison Élégance** - Where luxury meets technology. 🛍️✨
