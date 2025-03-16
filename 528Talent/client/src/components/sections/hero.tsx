import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-24 pb-32">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Find Your Next 
            <span className="block">Top Talent</span>
          </h1>
          
          <p className="mt-6 text-xl text-muted-foreground">
            Professional recruitment solutions tailored to your business needs.
            Access our curated pool of exceptional candidates.
          </p>
          
          <div className="mt-12 flex justify-center gap-6">
            <Link href="/candidates">
              <Button size="lg">Browse Candidates</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
