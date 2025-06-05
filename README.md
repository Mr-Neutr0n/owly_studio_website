# Owly Studio Website

A modern, interactive website for Owly Studio featuring an underwater theme with sharks and a waitlist signup form.

## Preview

The website features:
- An underwater theme with sharks in the background
- A silhouette figure standing among the sharks
- The OWLY logo in the top left corner
- A JOIN WAITLIST button in the top right corner
- A waitlist signup form page

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mr-Neutr0n/owly_studio_website.git
   cd owly_studio_website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Add the required images to the `public/images` directory:
   - `owly-logo.png` - The OWLY logo for the top left corner
   - `underwater-sharks.jpg` - The underwater scene with sharks background
   - `silhouette.png` - The silhouette of the person standing among sharks

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Technologies Used

- [Next.js](https://nextjs.org/) - The React framework
- [TailwindCSS](https://tailwindcss.com/) - For styling
- [Framer Motion](https://www.framer.com/motion/) - For animations

## Project Structure

- `/app` - Next.js app router pages and components
- `/public/images` - Static images used in the website
- `/components` - Reusable React components

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 