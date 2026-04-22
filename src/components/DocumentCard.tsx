import { FileText } from "lucide-react";

interface DocumentCardProps {
  title: string;
  url?: string;
}

const DocumentCard = ({ title, url = "#" }: DocumentCardProps) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 rounded-xl border border-border bg-background px-5 py-4 transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:border-primary/40 cursor-pointer"
  >
    <FileText className="h-5 w-5 text-primary" />
    <span className="text-sm font-medium text-foreground">{title}</span>
  </a>
);

export default DocumentCard;
