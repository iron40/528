import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users2, Search, BadgeCheck, Building2 } from "lucide-react";

const services = [
  {
    title: "Talent Sourcing",
    description: "Access our extensive network of pre-screened, qualified candidates.",
    icon: Search,
  },
  {
    title: "Candidate Screening",
    description: "Thorough evaluation process to ensure the perfect fit for your team.",
    icon: BadgeCheck,
  },
  {
    title: "Industry Expertise",
    description: "Specialized recruitment across technology, finance, and more.",
    icon: Building2,
  },
  {
    title: "Team Building",
    description: "Strategic advice on building and scaling high-performing teams.",
    icon: Users2,
  },
];

export default function Services() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive recruitment solutions for modern businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="border-2">
              <CardHeader>
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
