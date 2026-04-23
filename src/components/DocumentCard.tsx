import { FileText } from "lucide-react";
import { toast } from "sonner";

interface DocumentCardProps {
  title: string;
  url?: string;
  isAvailable?: boolean;
}

const DocumentCard = ({ title, url, isAvailable = true }: DocumentCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!url || !isAvailable) {
      e.preventDefault();
      toast.error(`Le document "${title}" n'est pas disponible.`);
    }
  };

  return (
    <a
      href={url || "#"}
      target={url ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`flex items-center gap-3 rounded-xl border px-5 py-4 transition-all duration-200 
        ${!url || !isAvailable 
          ? "border-muted bg-muted/30 opacity-60 cursor-not-allowed" 
          : "border-border bg-background hover:shadow-md hover:scale-[1.02] hover:border-primary/40 cursor-pointer"
        }`}
    >
      <FileText className={`h-5 w-5 ${!url || !isAvailable ? "text-muted-foreground" : "text-primary"}`} />
      <span className={`text-sm font-medium ${!url || !isAvailable ? "text-muted-foreground" : "text-foreground"}`}>
        {title} {!url || !isAvailable ? "(Indisponible)" : ""}
      </span>
    </a>
  );
};

export default DocumentCard;
