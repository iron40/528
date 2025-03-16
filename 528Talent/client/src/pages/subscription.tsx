import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import type { InsertSubscription } from "@shared/schema";

const plans = [
  {
    name: "Basic",
    price: "99",
    description: "Essential access to candidate profiles",
    features: [
      "View 10 candidate profiles/month",
      "Basic candidate information",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "199",
    description: "Complete access with advanced features",
    features: [
      "Unlimited candidate profiles",
      "Full contact information",
      "Priority support",
      "Advanced search filters",
      "Candidate tracking",
    ],
  },
  {
    name: "Enterprise",
    price: "499",
    description: "Custom solutions for large teams",
    features: [
      "All Professional features",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "Team collaboration tools",
    ],
  },
];

export default function Subscription() {
  const { toast } = useToast();

  const subscribe = useMutation({
    mutationFn: async (subscription: InsertSubscription) => {
      await apiRequest("POST", "/api/subscribe", subscription);
    },
    onSuccess: () => {
      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our service!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleSubscribe = (plan: string) => {
    // In a real app, this would open a payment modal
    // For demo, we'll just create a subscription
    subscribe.mutate({
      email: "demo@example.com",
      plan,
    });
  };

  return (
    <div className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Subscription Plans</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className="relative">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-6">
                  ${plan.price}
                  <span className="text-lg font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={subscribe.isPending}
                >
                  {subscribe.isPending ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
