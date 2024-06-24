import Link from "next/link"

export default function Header() {
    return  <header className="bg-rose-200 shadow-lg">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <Link href="/"><h1 className="text-2xl">Blog</h1></Link>
                    <nav className="space-x-4">
                        <Link href="/" className="text-zinc-800">Home</Link>
                        <Link href="/about" className="text-zinc-800">About</Link>
                        <Link href="/contact" className="text-zinc-800">Contact</Link>
                    </nav>
                </div>
            </header>
}