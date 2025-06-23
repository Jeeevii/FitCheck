import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FitCheck.AI',
  description: 'Rate your fit, get feedback, and see AI outfit edits.',
  generator: 'Built with FastAPI + Next.js',
  keywords: ['AI fashion', 'outfit rating', 'Kontext', 'Chatterbox', 'Gemini'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
