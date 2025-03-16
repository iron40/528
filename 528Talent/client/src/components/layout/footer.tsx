import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">TalentScope</h3>
            <p className="text-sm text-muted-foreground">
              Professional recruitment solutions for modern businesses.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/candidates">
                <a className="block text-sm text-muted-foreground hover:text-primary">
                  Browse Candidates
                </a>
              </Link>
              <Link href="/subscription">
                <a className="block text-sm text-muted-foreground hover:text-primary">
                  Subscription Plans
                </a>
              </Link>
              <Link href="/contact">
                <a className="block text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </a>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>contact@talentscope.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Recruitment St.</p>
              <p>New York, NY 10001</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TalentScope. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
