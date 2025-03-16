import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import type { Candidate } from "@shared/schema";

function CandidateSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

type FilterValues = {
  search: string;
  skills: string[];
  experienceMin: number;
  experienceMax: number;
  location: string;
};

const allSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "TypeScript",
  "SQL",
  "AWS",
];

const locations = [
  "New York, NY",
  "San Francisco, CA",
  "London, UK",
  "Berlin, DE",
  "Remote",
];

export default function Candidates() {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    skills: [],
    experienceMin: 0,
    experienceMax: 20,
    location: "",
  });

  const queryString = new URLSearchParams({
    ...(filters.search && { search: filters.search }),
    ...(filters.skills.length && { skills: JSON.stringify(filters.skills) }),
    ...(filters.experienceMin && { experienceMin: filters.experienceMin.toString() }),
    ...(filters.experienceMax && { experienceMax: filters.experienceMax.toString() }),
    ...(filters.location && { location: filters.location }),
  }).toString();

  const { data: candidates, isLoading } = useQuery<Candidate[]>({
    queryKey: [`/api/candidates?${queryString}`],
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleSkillChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(value)
        ? prev.skills.filter(s => s !== value)
        : [...prev.skills, value]
    }));
  };

  const handleExperienceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      experienceMin: value[0],
      experienceMax: value[1]
    }));
  };

  const handleLocationChange = (value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      skills: [],
      experienceMin: 0,
      experienceMax: 20,
      location: "",
    });
  };

  return (
    <div className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Available Candidates</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse our curated selection of top talent
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="flex gap-4">
            <Input
              placeholder="Search by name, title, or summary..."
              value={filters.search}
              onChange={handleSearch}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={clearFilters}
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <Badge
                    key={skill}
                    variant={filters.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleSkillChange(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">
                Experience Range ({filters.experienceMin}-{filters.experienceMax} years)
              </h3>
              <Slider
                min={0}
                max={20}
                step={1}
                value={[filters.experienceMin, filters.experienceMax]}
                onValueChange={handleExperienceChange}
                className="w-full"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Location</h3>
              <Select
                value={filters.location}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <CandidateSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates?.map((candidate) => (
              <Card key={candidate.id}>
                <CardHeader>
                  <CardTitle>{candidate.name}</CardTitle>
                  <CardDescription>{candidate.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {candidate.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {candidate.location} • {candidate.experience} years
                    </span>
                    <Link href="/subscription">
                      <Button>View Contact</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}