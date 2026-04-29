import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CandidateCard from "@/components/CandidateCard";
import SectionBadge from "@/components/SectionBadge";
import DocumentCard from "@/components/DocumentCard";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";
import logo from "@/assets/logo_vert_3.png";
import candidatePhotoPlaceholder from "@/assets/candidate-photo.png";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://agencemenage-api.up.railway.app";
const agencyName = "Agence Ménage";

const fetchAgent = async (id?: string, shareId?: string) => {
  const url = shareId 
    ? `${API_BASE_URL}/api/agents/by-share/${shareId}/` 
    : `${API_BASE_URL}/api/agents/${id}/`;
    
  const response = await fetch(url);
  if (!response.ok) throw new Error("Agent non trouvé");
  return response.json();
};

const Index = () => {
  const { id, shareId } = useParams();
  
  const { data: agent, isLoading, error } = useQuery({
    queryKey: ["agent", id, shareId],
    queryFn: () => fetchAgent(id, shareId),
    enabled: !!id || !!shareId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Oups ! Profil introuvable.</h1>
        <p className="text-muted-foreground mb-8">Le lien est peut-être expiré ou incorrect.</p>
        <Button onClick={() => window.location.href = "https://agencemenage.ma"}>
          Retour au site
        </Button>
      </div>
    );
  }

  // Calculate age from birth_date
  const getAge = (dateString: string) => {
    if (!dateString) return 0;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const getMediaUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const cleanOperatorNotes = (notes?: string) => {
    if (!notes) return undefined;
    // Remove lines that look like feedback evaluations: "[DD/MM/YYYY] Évaluation: X/5..."
    return notes
      .split('\n')
      .filter(line => !line.trim().match(/^\[\d{2}\/\d{2}\/\d{4}\]\s*Évaluation:/i))
      .join('\n')
      .trim();
  };

  const cleanedNotes = cleanOperatorNotes(agent.operator_notes);

  const d = {
    name: `${agent.first_name || ""} ${agent.last_name || ""}`.trim().toUpperCase() || "CANDIDAT",
    nationality: agent.nationality || "Marocaine",
    maritalStatus: agent.marital_status || "Mariée",
    age: getAge(agent.birth_date),
    location: `${agent.neighborhood || ""}${agent.neighborhood && agent.city ? ", " : ""}${agent.city || ""}` || "Casablanca",
    phone: agent.phone || "",
    photo: getMediaUrl(agent.photo) || undefined,
    about: cleanedNotes || `Profil ${agent.poste_display || "intervenant"} avec ${agent.experience_years || 0} ans d'expérience.`,
    documents: [
      { title: "CIN Image", url: getMediaUrl(agent.cin_file) || undefined },
      { title: "Fiche antropométrique", url: getMediaUrl(agent.fiche_antropometrique) || undefined },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8F9F9] flex flex-col font-sans">
      {/* Header */}
      <header className="flex justify-start px-8 pt-8 pb-4 animate-fade-in-up">
        <img src={logo} alt={agencyName} className="h-16 w-auto" />
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-4 pb-12">
        {/* Badge titre */}
        <div className="animate-fade-in-up animate-delay-1 mb-8">
          <SectionBadge label="FICHE CANDIDAT" />
        </div>

        {/* Profil */}
        <div className="animate-fade-in-up animate-delay-2 mb-10">
          <CandidateCard
            name={d.name}
            photo={d.photo}
            nationality={d.nationality}
            maritalStatus={d.maritalStatus}
            age={d.age}
            location={d.location}
            phone={d.phone}
          />
        </div>

        {/* A propos */}
        <section className="w-full max-w-md animate-fade-in-up animate-delay-3 mb-10 flex flex-col items-center">
          <SectionBadge label="A PROPOS" />
          <p className="text-center text-[#64748b] text-base leading-relaxed px-6 whitespace-pre-line">
            {d.about}
          </p>
        </section>

        {/* Documents */}
        <section className="w-full max-w-md animate-fade-in-up animate-delay-4 mb-10 flex flex-col items-center">
          <SectionBadge label="DOCUMENTS" />
          <div className="flex flex-col gap-3 w-full px-4">
            {d.documents.map((doc) => (
              <DocumentCard 
                key={doc.title} 
                title={doc.title} 
                url={doc.url} 
                isAvailable={!!doc.url} 
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="animate-fade-in-up animate-delay-5 flex flex-col items-center gap-2 mt-4">
          <Button size="lg" className="rounded-full px-10 py-7 text-lg bg-[#008080] hover:bg-[#006666] gap-3 shadow-lg" asChild>
            <a href="tel:0664226790">
              <MessageCircle className="h-6 w-6" />
              Contacter : 06 64 22 67 90
            </a>
          </Button>
          <p className="text-sm font-medium text-[#64748b]">Service commercial</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-[#94a3b8] border-t border-[#e2e8f0] mt-auto">
        © {new Date().getFullYear()} {agencyName} — Tous droits réservés
      </footer>
    </div>
  );
};

export default Index;
