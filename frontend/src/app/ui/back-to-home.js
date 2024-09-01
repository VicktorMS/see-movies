import Link from 'next/link';

export default function BackToHome() {
  return (
    <Link href="/" className="btn btn-secondary btn-sm">
        ← Back to home
    </Link>
  );
}
