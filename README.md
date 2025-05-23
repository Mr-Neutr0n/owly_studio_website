# Owly Studio Website

A modern, interactive website for Owly Studio featuring a horizontal carousel showcase and modern UI/UX features.

## Overview

This website showcases Owly Studio's AI-powered video creation capabilities with a sleek, modern interface that includes:

- Horizontal scrolling carousel with smooth animations
- Interactive UI elements with visual feedback
- Gradient text and background effects
- Mouse trailer effects and subtle grain overlay for visual depth
- Fully responsive design for all device sizes

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd owly_studio_website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
owly_studio_website/
├── components/         # React components
│   └── App.js          # Main application component
├── pages/              # Next.js pages
│   ├── _app.js         # Custom App component with global styles
│   └── index.js        # Home page
├── public/             # Static assets
├── styles/             # CSS styles
│   └── globals.css     # Global styles and utilities
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # Project documentation
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [GSAP](https://greensock.com/gsap/) - Advanced animations
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## TODO List

### Design Tasks
- [ ] Replace placeholder carousel items with actual images/videos
- [ ] Finalize color scheme and typography
- [ ] Create logo and favicon
- [ ] Design additional UI elements (buttons, inputs, etc.)

### Development Tasks
- [ ] Build "About" section below the hero carousel
- [ ] Implement "Features" section with animations
- [ ] Create contact form with validation
- [ ] Add modal for the waitlist/sign-up functionality
- [ ] Implement smooth scroll between sections

### Performance & Accessibility
- [ ] Add keyboard navigation for carousel
- [ ] Optimize images and videos
- [ ] Implement lazy loading for media
- [ ] Add proper meta tags for SEO
- [ ] Test and optimize for performance (Lighthouse score >90)

### Backend Integration
- [ ] Set up API routes for form submissions
- [ ] Connect to a database for waitlist storage
- [ ] Add authentication for admin section
- [ ] Implement analytics tracking

### Deployment
- [ ] Configure CI/CD pipeline
- [ ] Set up production environment
- [ ] Configure custom domain
- [ ] Add SSL certificate

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. 