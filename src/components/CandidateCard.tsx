import { MapPin, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CandidateCardProps {
  name: string;
  photo?: string;
  nationality: string;
  maritalStatus: string;
  age: number;
  location: string;
  phone: string;
}

const CandidateCard = ({ name, photo, nationality, maritalStatus, age, location, phone }: CandidateCardProps) => {
  const initials = name.split(" ").map(n => n[0]).join("");

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-40 w-40 border-4 border-primary/20 shadow-lg">
        <AvatarImage src={photo} alt={name} />
        <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-wide">{name}</h2>
        <p className="text-muted-foreground text-sm">
          {nationality} · {maritalStatus} · {age} ans
        </p>
        <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground pt-1">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary/70" />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-primary/70" />
            {phone}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
