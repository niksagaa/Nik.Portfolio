import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dominic Saga | Full-Stack Web Developer Portfolio',
  description: 'Production-ready web applications, UI/UX systems, and developer portfolio built with Next.js, TypeScript, and Tailwind CSS.',
  keywords: ['Frontend Developer', 'Full Stack', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Portfolio', 'NodeJS', 'MySQL'],
  authors: [{ name: 'Dominic Saga' }],
  openGraph: {
    title: 'Dominic Saga | Full-Stack Web Developer',
    description: 'Explore my featured projects, technical skills, professional work experience, and downloadable CV.',
    url: 'https://yourportfolio.com',
    siteName: 'Dominic Saga Portfolio',
    images: [
      {
        url: 'https://yourportfolio.com/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Dominic Saga | Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dominic Saga | Frontend & Full-Stack Web Developer',
    description: 'Explore my featured projects, technical skills, and professional portfolio.',
    images: ['https://yourportfolio.com/og-banner.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* I-binaba natin ang scroll-smooth at idinagdag ang transition properties */
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-[#59B292] selection:text-black transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}