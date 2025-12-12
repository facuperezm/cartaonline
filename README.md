<div align="center">
    <img src="public/favicon.ico" height="50px" width="auto" /> 
<h3>
 cartaonline.
</h3>
<p>Cartaonline is a streamlined store management application designed specifically for local restaurants. It provides an intuitive platform for restaurants to effortlessly upload and manage their menus.</p>

<span>&nbsp;✦&nbsp;</span>
<a href="https://cartaonline.facupm.dev">Live website</a>
<span>&nbsp;✦&nbsp;</span>

![App Screenshot](./public/screenshot.png)

</div>

## 🛠️ Stack

- [**React 19**](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [**Next.js**](https://nextjs.org/) - The React framework for building production-ready websites.
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [**Tailwind CSS**](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [**Shadcn/ui**](https://ui.shadcn.com/) - A collection of UI components for React.
- [**Prisma ORM**](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM for PostgreSQL.
- [**Clerk Authentication**](https://clerk.com/) - The most comprehensive User Management Platform.
- [**Uploadthing**](https://uploadthing.com/) - File Uploads For Next.js Developers.
- [**Vercel AI SDK**](https://sdk.vercel.ai/) - The AI Toolkit for TypeScript.
- [**OpenAI**](https://openai.com/) - AI-powered menu extraction using GPT-4o-mini.
- [**React Hook Form**](https://react-hook-form.com/) - Performant, flexible, and extensible forms.
- [**Zod**](https://github.com/colinhacks/zod) - TypeScript-first schema declaration and validation.

## 🚀 Features

- **User Authentication:** Secure login and account creation using Clerk Authentication.
- **Store Management:** Create and manage multiple restaurant stores with ease.
- **AI-Powered Menu Import:** Upload menu images or PDFs and let AI automatically extract all products (name, price, description, category).
- **Product Management:** Add, edit, and delete menu items with categorization (Food, Drinks, Desserts).
- **Custom Store URLs:** Each store gets a unique shareable URL path and customizable slug.
- **QR Code Generator:** Generate custom QR codes for easy menu sharing.
- **Store Visibility Control:** Temporarily hide stores from public view.
- **Image Uploads:** Upload store logos and banner images via Uploadthing.
- **Responsive Dashboard:** Comprehensive dashboard with data tables powered by TanStack Table.
- **City-based Organization:** Organize stores by cities for better discoverability.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Clerk account for authentication
- Uploadthing account for file uploads
- OpenAI API key for AI menu import

### Installation

1. Clone the repository:

```bash
git clone https://github.com/facuperezm/second-try-carta-online.git
cd second-try-carta-online
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables (see `.env.example`):

```env
DATABASE_URL=your_postgres_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...
OPENAI_API_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. (Optional) Start local test database with Docker:

```bash
docker compose up -d  # Runs PostgreSQL on port 5433
```

5. Initialize the database:

```bash
npx prisma generate
npx prisma db push
tsx prisma/seed.ts  # Optional: seed with sample data
```

6. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📈 Planned Features

- [x] AI-powered menu import from images/PDFs
- [ ] MercadoPago payment integration for online orders
- [ ] Subscription tiers (Free/Pro/Enterprise)
- [ ] Analytics dashboard (sales, customer behavior, product performance)
- [ ] Multi-language support
- [ ] Customer review system
- [ ] Promotions and discount codes
- [ ] Advanced SEO optimizations

## Author

- [Facundo Perez Montalvo](https://facuperezm.com)

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://facuperezm.com)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/facuperezm/)
[![github](https://img.shields.io/badge/github-555?style=for-the-badge&logo=github&logoColor=white)](https://github.com/facuperezm)
