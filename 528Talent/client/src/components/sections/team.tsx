import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const team = [
  {
    name: "Sarah Johnson",
    role: "Senior Recruiter",
    image: "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9",
  },
  {
    name: "Michael Chen",
    role: "Technical Recruiter",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
  },
  {
    name: "Emily Davis",
    role: "HR Specialist",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
  },
  {
    name: "David Wilson",
    role: "Talent Acquisition",
    image: "https://images.unsplash.com/photo-1568585105565-e372998a195d",
  },
];

export default function Team() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Expert recruiters dedicated to finding your perfect match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <CardContent className="pt-6">
                <Avatar className="h-32 w-32 mx-auto">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
