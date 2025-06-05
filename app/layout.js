import './globals.css';

export const metadata = {
  title: 'Owly Studio',
  description: 'Dive into the world of Owly Studio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-teal-900 text-white">
        {children}
      </body>
    </html>
  );
} 