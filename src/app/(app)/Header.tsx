import { FilmIcon } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex gap-2 py-5 px-5 bg-slate-900 text-white rounded-b-xl items-center">
      <FilmIcon />
      <Link href="/" className="text-xl font-bold">
        <h1>Our Favorite Movies</h1>
      </Link>{' '}
      |
      <Link href="/add" className="text-xl font-light">
        Add A Movie
      </Link>
    </header>
  )
}
