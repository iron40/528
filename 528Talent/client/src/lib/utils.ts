
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomGradient = () => {
  const gradients = [
    "from-blue-500 to-purple-500",
    "from-green-400 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-yellow-400 to-orange-500",
    "from-teal-400 to-blue-500",
    "from-red-500 to-pink-500",
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
};

export const shimmer = "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";
