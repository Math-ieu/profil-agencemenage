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

  const d = {
    name: `${agent.first_name || ""} ${agent.last_name || ""}`.trim().toUpperCase() || "CANDIDAT",
    nationality: agent.nationality || "Marocaine",
    maritalStatus: agent.marital_status || "Non spécifié",
    age: getAge(agent.birth_date),
    location: `${agent.neighborhood || ""}${agent.neighborhood && agent.city ? ", " : ""}${agent.city || ""}` || "Casablanca",
    phone: agent.phone || "",
    photo: getMediaUrl(agent.photo) || undefined,
    about: agent.operator_notes || `Profil ${agent.poste_display || "intervenant"} avec ${agent.experience_years || 0} ans d'expérience.`,
    languages: Array.isArray(agent.languages) ? agent.languages : ["Arabe"],
    experience_list: ["Professionnel", agent.poste_display].filter(Boolean),
    documents: [
      { title: "CIN", url: getMediaUrl(agent.cin_file) || undefined },
      { title: "Fiche Anthropométrique", url: getMediaUrl(agent.fiche_antropometrique) || undefined },
      { title: "Attestation", url: getMediaUrl(agent.attestation_file) || undefined },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 animate-fade-in-up">
        <img src={logo} alt={agencyName} className="h-20 w-auto" />
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-4 pb-12">
        {/* Badge titre */}
        <div className="animate-fade-in-up animate-delay-1 mt-4 mb-4">
          <SectionBadge label="Fiche Candidat" />
        </div>

        {agent.demande_context && (
          <div className="animate-fade-in-up animate-delay-1 mb-8 text-center">
            <h2 className="text-xl font-bold text-primary">{agent.demande_context.service}</h2>
            <p className="text-sm text-muted-foreground">Proposition pour {agent.demande_context.client_name}</p>
          </div>
        )}

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
        <section className="w-full max-w-md animate-fade-in-up animate-delay-3 mb-10">
          <SectionBadge label="A propos" />
          <p className="text-center text-muted-foreground text-sm leading-relaxed px-2 mb-4 whitespace-pre-line">
            {d.about}
          </p>

          <div className="flex flex-col gap-3 px-2">
            <div>
              <p className="text-base font-bold text-primary mb-2 text-center">Langues</p>
              <div className="flex flex-wrap justify-center gap-2">
                {d.languages.map((lang: string) => (
                  <span key={lang} className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-base font-bold text-primary mb-2 text-center">Expérience</p>
              <div className="flex flex-wrap justify-center gap-2">
                {d.experience_list.map((exp: string) => (
                  <span key={exp} className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="w-full max-w-md animate-fade-in-up animate-delay-4 mb-10">
          <SectionBadge label="Documents" />
          <div className="flex flex-col gap-3">
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
        <div className="animate-fade-in-up animate-delay-5 flex flex-col items-center gap-3">
          <Button size="lg" className="rounded-full px-8 gap-2" asChild>
            <a href="tel:0664226790">
              <MessageCircle className="h-4 w-4" />
              Contacter : 06 64 22 67 90
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">Service commercial</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border mt-auto">
        © {new Date().getFullYear()} {agencyName} — Tous droits réservés
      </footer>
    </div>
  );
};

export default Index;
