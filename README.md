# E-Commerce Project

A modern, full-featured e-commerce web application built with **Angular 20** and **TypeScript**. This project demonstrates best practices in Angular development including authentication, state management, and server-side rendering.

## 🎯 Features

- **User Authentication**: Login, Register, and Forget Password functionality with JWT-based authentication
- **Product Management**: Browse products with filtering, search, and pagination
- **Shopping Cart**: Add/remove items, manage quantities, and view cart summary
- **Wishlist**: Save products for later purchase
- **Orders**: Checkout process and view order history
- **Categories & Brands**: Organize products by categories and brands
- **Multi-language Support**: Full internationalization (i18n) support for English and Arabic
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS and Flowbite components
- **Server-Side Rendering**: SSR for improved performance and SEO
- **Error Handling**: Global error interceptor with user-friendly error messages
- **Toast Notifications**: Real-time notifications for user actions

## 🛠 Tech Stack

### Frontend Framework

- **Angular 20** - Latest Angular framework with standalone components
- **TypeScript** - Type-safe programming
- **TailwindCSS** - Utility-first CSS framework
- **Flowbite** - Component library built on Tailwind CSS

### UI Components & Libraries

- **Owl Carousel** - carousel functionality
- **Font Awesome** - Icon library
- **ngx-pagination** - Pagination component
- **ngx-toastr** - Toast notifications
- **ngx-translate** - Internationalization

### State Management & Data

- **RxJS** - Reactive programming with observables
- **Express.js** - Server for SSR support

### Authentication & Security

- **JWT** - JSON Web Tokens for authentication
- **ngx-cookie-service** - Cookie management

### Build & Deployment

- **Angular CLI 20.1.0** - Development and build tool
- **Angular SSR** - Server-side rendering
- **Vercel** - Cloud deployment platform

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** (v10 or higher)
- A modern web browser

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd E-commerce-project
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   > Note: We use `--legacy-peer-deps` flag due to some peer dependency conflicts

## 💻 Development Server

Start the development server:

```bash
npm start
```

or

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🏗 Building

### Development Build

```bash
ng build --configuration development
```

### Production Build

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

### Build with Watch Mode

```bash
npm run watch
```

## ✅ Testing

### Run Unit Tests

```bash
npm test
```

Unit tests are executed with [Karma](https://karma-runner.github.io) test runner. Tests are located in `*.spec.ts` files throughout the project.

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core authentication & services
│   │   ├── auth/                # Login, Register, Forget Password
│   │   ├── guards/              # Route guards (auth-guard, is-logged-guard)
│   │   ├── interceptors/        # HTTP interceptors (error, headers, loader)
│   │   ├── layouts/             # Main layout components
│   │   ├── models/              # Data interfaces (Brand, Category, Product)
│   │   └── services/            # Core services
│   ├── features/                # Feature components
│   │   ├── home/                # Home page
│   │   ├── products/            # Products listing
│   │   ├── product-details/     # Single product view
│   │   ├── categories/          # Categories page
│   │   ├── brands/              # Brands page
│   │   ├── cart/                # Shopping cart
│   │   ├── wishlist/            # Wishlist page
│   │   ├── checkout/            # Checkout process
│   │   ├── all-orders/          # Order history
│   │   └── not-found/           # 404 page
│   ├── shared/                  # Shared components & utilities
│   │   ├── components/          # Reusable components
│   │   ├── directives/          # Custom directives
│   │   ├── pipes/               # Custom pipes
│   │   └── Services/            # Shared services
│   ├── i18n/                    # Internationalization
│   ├── app.routes.ts            # Application routes
│   └── app.ts                   # Root component
├── assets/
│   ├── images/                  # Project images
│   └── i18n/                    # Translation files (ar.json, en.json)
├── environments/                # Environment configurations
└── main.ts                      # Application entry point
```

## 🔐 Authentication & Guards

The application implements role-based access control using route guards:

- **authGuard**: Protects routes that require user authentication
- **isLoggedGuard**: Prevents logged-in users from accessing auth pages (login, register)

All HTTP requests include JWT tokens via the `heading-interceptor`.

## 🌍 Internationalization (i18n)

The application supports multiple languages:

- **English** - `ar.json`
- **Arabic** - `en.json`

Language translations are located in `src/assets/i18n/`. The application uses `@ngx-translate/core` for dynamic language switching.

## 🧩 Key Services

- **UserService**: Authentication and user management
- **BrandsService**: Fetch brands data
- **CategoriesService**: Fetch categories data
- **ProductsService**: Fetch products and product details
- **FlowbiteService**: Initialize Flowbite components
- **CartService**: Shopping cart management

## 🌐 HTTP Interceptors

1. **ErrorInterceptor**: Handles HTTP errors and displays user-friendly messages
2. **HeadingInterceptor**: Adds JWT token to request headers
3. **LoaderInterceptor**: Shows/hides loader during HTTP requests

## 🚀 Deployment

### Vercel Deployment

The project is configured for deployment on Vercel with the following settings:

- **Build Command**: `npm run build -- --configuration=production`
- **Output Directory**: `dist/E-commerce-project/browser`
- **Install Command**: `npm install --legacy-peer-deps`

### Deploy to Vercel

```bash
vercel
```

### Environment Variables

Create a `.env.local` file for local development with necessary environment variables:

```
NG_APP_API_URL=https://ecommerce.routemisr.com/api/v1/
```

## 📦 Dependencies

Key dependencies include:

- `@angular/*` - Angular core libraries
- `tailwindcss` - CSS utility framework
- `rxjs` - Reactive programming library
- `@ngx-translate/core` - Translation library
- `ngx-toastr` - Notification library
- `owl-carousel` - Carousel library
- `express` - Node.js server for SSR

See `package.json` for complete list and versions.

## 🔧 Available Commands

| Command                      | Description              |
| ---------------------------- | ------------------------ |
| `npm start`                  | Start development server |
| `npm run build`              | Build for production     |
| `npm test`                   | Run unit tests           |
| `npm run watch`              | Build with watch mode    |
| `ng serve`                   | Angular CLI dev server   |
| `ng generate component name` | Generate new component   |

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component:

```bash
ng generate component component-name
```

For a complete list of available schematics (components, directives, pipes, services), run:

```bash
ng generate --help
```

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, email support@example.com or open an issue in the repository.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
