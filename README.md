# ZedExel - Industrial & Safety Equipment E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js 15, TypeScript, and MongoDB, specializing in industrial and safety equipment. Features a responsive storefront, admin dashboard, and comprehensive product management system.

## 🚀 Features

### Storefront
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Catalog**: Advanced filtering, sorting, and search functionality
- **Featured Products**: Auto-advancing carousel with 5 products per slide
- **Category Navigation**: Visual category browsing with mosaic layout
- **Product Details**: Comprehensive product pages with vendor information
- **Trusted Clients**: Showcase of partner brands and vendors

### Admin Dashboard
- **Product Management**: CRUD operations for products
- **Authentication**: Secure admin login system
- **Inventory Management**: Stock tracking and status management
- **Category & Vendor Management**: Organize products by categories and vendors
- **Responsive Admin UI**: Mobile-friendly admin interface

### Technical Features
- **Next.js 15**: Latest App Router with Turbopack
- **TypeScript**: Full type safety throughout the application
- **MongoDB**: NoSQL database with Mongoose ODM
- **Authentication**: JWT-based admin authentication
- **Image Optimization**: Next.js Image component with remote patterns
- **API Routes**: RESTful API endpoints for data management

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Radix UI** - Accessible UI components

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **js-cookie** - Cookie management

### Development Tools
- **Turbopack** - Fast bundler for development
- **PostCSS** - CSS processing
- **ESLint** - Code linting (implicit with Next.js)

## 📁 Project Structure

```
zedexel/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (admin)/           # Admin route group
│   │   │   └── admin/         # Admin dashboard pages
│   │   ├── (store)/           # Store route group
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── products/      # Product listing
│   │   │   └── product/       # Product details
│   │   ├── api/               # API routes
│   │   │   ├── admin/         # Admin API endpoints
│   │   │   └── products/      # Product API endpoints
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── admin/            # Admin-specific components
│   │   ├── store/            # Store-specific components
│   │   └── ui/               # Generic UI components
│   ├── lib/                  # Utility libraries
│   │   ├── mongodb.ts        # MongoDB connection
│   │   └── utils.ts          # Helper functions
│   └── models/               # Database models
│       └── Product.ts        # Product schema
├── public/                   # Static assets
│   ├── banners/             # Banner images
│   ├── logos/               # Company logos
│   └── vendors/             # Vendor logos
├── package.json             # Dependencies and scripts
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── middleware.ts            # Route middleware
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zedexel
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   **MongoDB Setup Options:**
   
   **Option A: MongoDB Atlas (Cloud)**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Replace `your_mongodb_connection_string` with your actual connection string

   **Option B: Local MongoDB**
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/zedexel`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

The application will automatically create the necessary collections when you first access it. However, you may want to add some sample data:

1. **Access the admin dashboard**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. **Add products** through the admin interface
3. **Set up categories and vendors** as needed

## 📱 Usage

### Storefront

- **Homepage**: Browse featured products and categories
- **Products Page**: Filter and search through all products
- **Product Details**: View detailed product information
- **Category Browsing**: Navigate by product categories

### Admin Dashboard

- **Login**: Access admin panel at `/admin/login`
- **Product Management**: Add, edit, and delete products
- **Inventory Control**: Manage stock levels and product status
- **Category Management**: Organize products by categories

## 🔧 Configuration

### Next.js Configuration

The `next.config.ts` file includes:
- **Image Optimization**: Remote patterns for external images
- **Turbopack**: Fast development bundler

### Tailwind CSS

The project uses Tailwind CSS 4 with:
- **Custom fonts**: Poppins font family
- **Responsive design**: Mobile-first approach
- **Custom components**: Reusable UI components

### MongoDB Schema

**Product Model:**
```typescript
{
  name: string,           // Product name
  price: number,          // Product price
  stockQuantity: number,  // Available stock
  category: string,       // Product category
  status: string,         // active/inactive
  vendor: string,         // Product vendor
  brand: string,          // Product brand
  images: string[],       // Product images
  createdAt: Date,        // Creation timestamp
  updatedAt: Date         // Last update timestamp
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🔒 Security

- **JWT Authentication**: Secure admin access
- **Environment Variables**: Sensitive data protection
- **Input Validation**: API endpoint validation
- **CORS Protection**: Cross-origin request handling

## 📊 API Endpoints

### Public APIs
- `GET /api/products` - Get products with filtering
- `GET /api/products/[id]` - Get single product

### Admin APIs
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/products` - Admin product listing
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔄 Updates

Stay updated with the latest changes:
- Follow the repository for updates
- Check the [Releases](../../releases) page
- Review the [Changelog](CHANGELOG.md)

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**
