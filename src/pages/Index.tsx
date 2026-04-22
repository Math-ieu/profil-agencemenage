import CandidateCard from "@/components/CandidateCard";
import SectionBadge from "@/components/SectionBadge";
import DocumentCard from "@/components/DocumentCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import logo from "@/assets/logo_vert_3.png";
import candidatePhoto from "@/assets/candidate-photo.png";

const candidateData = {
  name: "IMANE ADIL",
  nationality: "Marocaine",
  maritalStatus: "Mariée",
  age: 42,
  location: "Hay Salam, Casablanca",
  phone: "06 09 90 89 78",
  photo: candidatePhoto,
  about:
    "Profil femme de ménage avec une total expérience de 2 ans 6 mois en tant que ménage dans les familles, riad…",
  documents: [
    { title: "CIN Image", url: "/documents/cin.jpg" },
    { title: "Fiche antropométrique", url: "/documents/antropometrique.jpg" },
  ],
};

const agencyName = "Agence Ménage";

const Index = () => {
  const d = candidateData;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 opacity-0 animate-fade-in-up">
        <img src={logo} alt={agencyName} className="h-20 w-auto" />
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-4 pb-12">
        {/* Badge titre */}
        <div className="opacity-0 animate-fade-in-up animate-delay-1 mt-4 mb-8">
          <SectionBadge label="Fiche Candidat" />
        </div>

        {/* Profil */}
        <div className="opacity-0 animate-fade-in-up animate-delay-2 mb-10">
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
        <section className="w-full max-w-md opacity-0 animate-fade-in-up animate-delay-3 mb-10">
          <SectionBadge label="A propos" />
          <p className="text-center text-muted-foreground text-sm leading-relaxed px-2 mb-4">
            {d.about}
          </p>

          <div className="flex flex-col gap-3 px-2">
            <div>
              <p className="text-base font-bold text-primary mb-2 text-center">Langue</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Arabe", "Français"].map((lang) => (
                  <span key={lang} className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-base font-bold text-primary mb-2 text-center">Expérience</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Familles", "Hôtel", "Riad", "Établissement de luxe"].map((exp) => (
                  <span key={exp} className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="w-full max-w-md opacity-0 animate-fade-in-up animate-delay-4 mb-10">
          <SectionBadge label="Documents" />
          <div className="flex flex-col gap-3">
            {d.documents.map((doc) => (
              <DocumentCard key={doc.title} title={doc.title} url={doc.url} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="opacity-0 animate-fade-in-up animate-delay-5 flex flex-col items-center gap-3">
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
      <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border">
        © 2026 {agencyName} — Tous droits réservés
      </footer>
    </div>
  );
};

export default Index;
