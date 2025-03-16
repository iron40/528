import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold text-primary">528Talent</a>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/candidates">
            <a className="text-sm font-medium hover:text-primary transition-colors">
              Candidates
            </a>
          </Link>
          <Link href="/manage-candidates">
            <a className="text-sm font-medium hover:text-primary transition-colors">
              Manage Candidates
            </a>
          </Link>
          <Link href="/company-dashboard">
            <a className="text-sm font-medium hover:text-primary transition-colors">
              Company Dashboard
            </a>
          </Link>
          <Link href="/subscription">
            <a className="text-sm font-medium hover:text-primary transition-colors">
              Subscription
            </a>
          </Link>
          <Link href="/contact">
            <a className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/subscription">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}