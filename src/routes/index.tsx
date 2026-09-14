import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Asterisk,
  BarChart3,
  Braces,
  Camera,
  Check,
  ChevronRight,
  Compass,
  ExternalLink,
  Layers3,
  Menu,
  MousePointer2,
  Search,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/koen-portrait.jpg";
import webagency from "@/assets/case-webagency.jpg";
import heynoona from "@/assets/case-heynoona.jpg";
import werkgenoten from "@/assets/case-werkgenoten.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Koen Suhre — Webdesigner & Marketeer" },
      { name: "description", content: "Strategisch webdesign, development en content voor merken die willen groeien. Koen Suhre helpt bedrijven in Nederland aan meer impact en conversie." },
      { property: "og:title", content: "Koen Suhre — Webdesigner & Marketeer" },
      { property: "og:description", content: "Websites die er niet alleen goed uitzien, maar ook leads, boekingen en merkgroei opleveren." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const nav = [
  ["Home", "home"], ["Cases", "cases"], ["Over", "over"], ["Werkwijze", "aanpak"], ["Contact", "contact"],
] as const;

const services = [
  { icon: Layers3, title: "Webdesign & development", text: "Scherpe websites die je verhaal helder maken en bezoekers gericht naar actie sturen.", outcome: "Meer aanvragen" },
  { icon: Sparkles, title: "Branding & identiteit", text: "Een visuele taal die herkenbaar is, blijft hangen en vertrouwen opbouwt.", outcome: "Sterker merk" },
  { icon: Camera, title: "Content & multimedia", text: "Foto, video en motion die je merk menselijk maken en online laten leven.", outcome: "Meer aandacht" },
  { icon: Search, title: "SEO & performance", text: "Technisch snel, logisch opgebouwd en vindbaar voor de mensen die je zoekt.", outcome: "Beter gevonden" },
  { icon: Target, title: "Webstrategie", text: "Positionering, journeys en content vanuit je commerciële doelen, niet vanuit aannames.", outcome: "Slimmere groei" },
  { icon: Zap, title: "Support & optimalisatie", text: "Doorontwikkelen op basis van data, gedrag en nieuwe kansen in je markt.", outcome: "Blijvend resultaat" },
];

const cases = [
  { number: "01", name: "Web Agency Twente", url: "webagencytwente.nl", tagline: "Een strakke agency-website die vertrouwen en autoriteit uitstraalt.", image: webagency, accent: "bg-primary", tags: ["Webdesign", "SEO", "Positioning", "Local Business"], points: ["Lokale expertpositie voor meer vertrouwen en vindbaarheid.", "Heldere diensten en CTA’s sturen gericht naar een aanvraag.", "Rust en resultaatbewijs bouwen geloofwaardigheid op bij MKB."] },
  { number: "02", name: "Hey Noona", url: "heynoona.nl", tagline: "Een expressieve brand-website die verhaal en visueel samenvoegt.", image: heynoona, accent: "bg-cta", tags: ["Branding", "Multimedia", "Storytelling", "Visual Identity"], points: ["Een uitgesproken identiteit maakt het merk direct herkenbaar.", "Storytelling bouwt eerst verbinding, daarna overtuiging.", "Foto en video maken het merk bruikbaar op web én social."] },
  { number: "03", name: "Werkgenoten", url: "werkgenoten.online", tagline: "Een platform dat matching en community centraal stelt.", image: werkgenoten, accent: "bg-signal", tags: ["Platform", "UX", "SEO", "Recruitment Marketing"], points: ["Eén heldere propositie bedient werkgevers én werknemers.", "Vertrouwen en laagdrempelig contact verhogen conversie.", "Schaalbare contentstructuur voor regio’s en diensten."] },
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-30% 0px -60%" });
    nav.forEach(([, id]) => { const el = document.getElementById(id); if (el) sectionObserver.observe(el); });
    const onScroll = () => setProgress((window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div className="bg-background text-foreground">
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-secondary"><div className="h-full bg-signal transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>
      <header className="fixed inset-x-0 top-1 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 lg:px-10" aria-label="Hoofdnavigatie">
          <button onClick={() => go("home")} className="display-text flex items-center gap-2 text-lg font-bold" aria-label="Naar home"><span className="flex size-8 items-center justify-center bg-primary text-primary-foreground">KS</span> Koen Suhre</button>
          <div className="hidden items-center gap-8 md:flex">
            {nav.map(([label, id]) => <button key={id} onClick={() => go(id)} className={`relative py-2 text-sm font-semibold transition-colors hover:text-signal ${active === id ? "text-signal after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-signal" : "text-muted-foreground"}`}>{label}</button>)}
          </div>
          <div className="hidden md:block"><Button variant="coral" onClick={() => go("contact")}>Start project <ArrowRight /></Button></div>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Menu sluiten" : "Menu openen"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </nav>
        {menuOpen && <div className="border-t border-border bg-background p-5 md:hidden">{nav.map(([label, id]) => <button key={id} onClick={() => go(id)} className="display-text block w-full border-b border-border py-4 text-left text-2xl font-bold">{label}</button>)}<Button variant="coral" className="mt-5 w-full" onClick={() => go("contact")}>Start project</Button></div>}
      </header>

      <main>
        <section id="home" className="grid-pattern relative flex min-h-[92vh] items-end overflow-hidden border-b border-border px-5 pb-12 pt-32 lg:px-10 lg:pb-18">
          <div className="absolute right-[8%] top-[18%] size-52 rotate-12 border-[24px] border-primary/50 lg:size-80" aria-hidden="true" />
          <div className="absolute right-[2%] top-[42%] h-24 w-2/5 -rotate-6 bg-signal/90 mix-blend-screen lg:h-32" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-[1440px]">
            <div className="mb-8 flex items-center gap-3 text-xs font-bold uppercase text-signal"><span className="size-2 animate-pulse rounded-full bg-signal" /> Beschikbaar voor selecte projecten</div>
            <h1 className="display-text max-w-7xl text-[clamp(3.2rem,9.8vw,9rem)] font-bold leading-[0.87]">
              Websites die <span className="text-primary">werken</span><br />als jij dat doet<span className="text-cta">.</span>
            </h1>
            <div className="mt-10 grid gap-8 border-t border-foreground/25 pt-7 lg:grid-cols-[1.35fr_1fr_auto] lg:items-end">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">Ik combineer design, development en content met een marketingblik. Voor merken die niet alleen mooi willen zijn, maar willen groeien.</p>
              <div><p className="text-sm font-bold leading-7">Web Designer • Developer • Multimedia Specialist<br />Photographer & Videographer</p><span className="mt-2 inline-flex bg-signal px-2 py-1 text-xs font-bold uppercase text-signal-foreground">Marketing-minded creator</span></div>
              <div className="flex flex-wrap gap-3"><Button variant="coral" size="lg" onClick={() => go("cases")}>Bekijk cases <ArrowDownRight /></Button><Button variant="editorial" size="lg" onClick={() => go("contact")}>Neem contact op</Button></div>
            </div>
            <p className="mt-10 text-xs font-semibold uppercase text-muted-foreground">Helping brands in NL grow with strategic web design & content.</p>
          </div>
        </section>

        <section id="over" className="border-b border-border px-5 py-24 lg:px-10 lg:py-36">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="reveal relative mx-auto max-w-xl lg:mx-0"><div className="absolute -left-4 -top-4 h-full w-full border border-signal" /><img src={portrait} alt="Portret van Koen Suhre in zijn creatieve studio" width={1024} height={1280} loading="lazy" className="relative aspect-[4/5] w-full object-cover grayscale-[15%]" /><div className="absolute -bottom-5 -right-3 bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Enschede, NL — 52.22° N</div></div>
            <div className="reveal lg:pl-12"><SectionLabel number="01" text="Over Koen" /><h2 className="mt-6 text-5xl font-bold leading-[0.96] md:text-7xl">Eén maker.<br /><span className="text-stroke">Meerdere disciplines.</span><br />Eén helder doel.</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">Ik ben Koen: webdesigner, developer en beeldmaker. Die combinatie betekent dat strategie, uitstraling en techniek vanaf dag één samenwerken. Ik kijk niet alleen naar wat mooi is, maar naar wat je merk nodig heeft om op te vallen, vertrouwen te winnen en actie uit te lokken.</p>
              <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2">{["Strategisch vanuit marketingdoelen", "Van concept tot code en content", "Sterk in foto, video en motion", "Focus op SEO, snelheid en conversie"].map((item) => <li key={item} className="flex items-center gap-3 bg-background p-5 text-sm font-semibold"><Check className="size-5 text-signal" />{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="bg-foreground py-5 text-background" aria-label="Expertises"><div className="display-text flex justify-center gap-8 overflow-hidden whitespace-nowrap text-xl font-bold uppercase md:text-3xl">Strategie <Asterisk className="text-cta" /> Design <Asterisk className="text-primary" /> Development <Asterisk className="text-cta" /> Content <Asterisk className="text-signal" /> Groei</div></section>

        <section id="diensten" className="px-5 py-24 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[1440px]"><div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel number="02" text="Expertise" /><h2 className="mt-5 text-5xl font-bold md:text-8xl">Wat ik doe<span className="text-primary">.</span></h2></div><p className="max-w-md text-muted-foreground">Geen losse pixels of trucjes. Wel disciplines die samen een merk sterker maken en meetbaar vooruit helpen.</p></div>
            <div className="mt-16 grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">{services.map(({ icon: Icon, title, text, outcome }, i) => <article key={title} className="reveal group min-h-72 border-b border-r border-border p-7 transition-colors hover:bg-secondary lg:p-9"><div className="flex items-start justify-between"><Icon className="size-8 text-primary transition-transform group-hover:rotate-6 group-hover:scale-110" /><span className="font-mono text-xs text-muted-foreground">0{i + 1}</span></div><h3 className="mt-12 text-2xl font-bold">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p><p className="mt-6 flex items-center gap-2 text-xs font-bold uppercase text-signal"><ArrowRight className="size-4" /> {outcome}</p></article>)}</div>
          </div>
        </section>

        <section id="cases" className="border-y border-border bg-panel px-5 py-24 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[1440px]"><div className="reveal"><SectionLabel number="03" text="Selected work" /><h2 className="mt-5 text-6xl font-bold md:text-9xl">Cases<span className="text-cta">/</span></h2><p className="mt-6 text-xl text-muted-foreground">Projecten met impact — ontworpen om te converteren.</p></div>
            <div className="mt-16 space-y-24">{cases.map((project, index) => <article key={project.name} className="reveal grid gap-8 border-t border-foreground/25 pt-8 lg:grid-cols-12 lg:gap-12"><div className={`group relative overflow-hidden lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}><img src={project.image} alt={`Visuele presentatie van de ${project.name} case`} width={1280} height={912} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]" /><div className={`absolute left-0 top-0 ${project.accent} px-4 py-3 font-mono text-sm font-bold text-background`}>{project.number}</div></div><div className={`flex flex-col justify-center lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}><p className="font-mono text-xs uppercase text-signal">{project.url}</p><h3 className="mt-3 text-4xl font-bold md:text-5xl">{project.name}</h3><p className="mt-4 text-lg leading-7 text-muted-foreground">{project.tagline}</p><ul className="mt-7 space-y-4">{project.points.map(point => <li key={point} className="flex gap-3 text-sm leading-6"><ChevronRight className="mt-1 size-4 shrink-0 text-primary" />{point}</li>)}</ul><div className="mt-7 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="border border-border px-2.5 py-1 text-[11px] font-bold uppercase text-muted-foreground">{tag}</span>)}</div><Button variant="editorial" className="mt-8 self-start" onClick={() => go("contact")}>Bekijk case <ExternalLink /></Button></div></article>)}</div>
            <p className="mt-20 border-l-2 border-signal pl-4 text-sm text-muted-foreground">Meer cases op aanvraag — ik werk regelmatig onder NDA.</p>
          </div>
        </section>

        <section id="aanpak" className="px-5 py-24 lg:px-10 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="reveal"><SectionLabel number="04" text="Werkwijze" /><h2 className="mt-5 max-w-4xl text-5xl font-bold leading-none md:text-8xl">Van scherp idee naar <span className="text-signal">slim resultaat.</span></h2></div><div className="mt-16 grid gap-px bg-border lg:grid-cols-4">{[
          [Compass, "Discover & strategy", "Doelen, doelgroep en positionering scherp. Eerst weten waarom, dan pas maken."], [MousePointer2, "Design & content", "UX, copy en beeld vormen één verhaal dat aandacht vasthoudt."], [Braces, "Build & optimize", "Snelle development, technische SEO en conversie zonder ruis."], [BarChart3, "Launch & grow", "Meten, leren en gericht verbeteren op wat voor jouw bedrijf telt."],
        ].map(([Icon, title, text], i) => { const C = Icon as typeof Compass; return <article key={String(title)} className="reveal bg-background p-8"><span className="font-mono text-xs text-primary">0{i + 1}</span><C className="mt-16 size-9 text-signal" /><h3 className="mt-6 text-2xl font-bold">{String(title)}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{String(text)}</p></article>; })}</div></div></section>

        <section className="border-y border-border bg-primary px-5 py-24 text-primary-foreground lg:px-10"><div className="mx-auto max-w-[1440px]"><SectionLabel number="05" text="Wat klanten zeggen" /><div className="mt-12 grid gap-10 md:grid-cols-2"><blockquote className="reveal"><p className="display-text text-3xl font-semibold leading-tight md:text-5xl">“Koen stelt de juiste vragen en vertaalt complexe ideeën naar een helder verhaal dat werkt.”</p><footer className="mt-8 text-sm font-bold">— Opdrachtgever, zakelijke dienstverlening</footer></blockquote><blockquote className="reveal border-t border-primary-foreground/30 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0"><p className="display-text text-3xl font-semibold leading-tight md:text-5xl">“Creatief sterk, technisch scherp en altijd met het einddoel in beeld.”</p><footer className="mt-8 text-sm font-bold">— Creative lead, digitaal bureau</footer></blockquote></div><p className="mt-12 text-xs opacity-70">Voorbeeldteksten — vervang deze door geverifieerde klantreviews.</p></div></section>

        <section id="contact" className="grid-pattern px-5 py-24 lg:px-10 lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.9fr_1.1fr]"><div className="reveal"><SectionLabel number="06" text="Contact" /><h2 className="mt-5 text-5xl font-bold leading-none md:text-8xl">Laten we iets <span className="text-cta">moois</span> maken.</h2><p className="mt-8 max-w-lg text-lg leading-8 text-muted-foreground">Heb je een project of idee? Laten we kijken hoe we het groot kunnen maken — strategisch, visueel en technisch.</p><div className="mt-10 border-t border-border pt-7"><p className="text-xs font-bold uppercase text-muted-foreground">Direct mailen</p><a className="mt-2 inline-block text-xl font-bold text-signal hover:underline" href="mailto:hello@koensuhre.nl">hello@koensuhre.nl</a><p className="mt-5 text-sm text-muted-foreground">Ik reageer meestal binnen 1 werkdag.</p></div></div>
          <form onSubmit={submit} className="reveal bg-foreground p-6 text-background md:p-10" aria-label="Contactformulier"><div className="grid gap-6 sm:grid-cols-2"><Field label="Naam" name="name" placeholder="Jouw naam" required /><Field label="E-mail" name="email" type="email" placeholder="jij@bedrijf.nl" required /><Field label="Bedrijf" name="company" placeholder="Bedrijfsnaam" /><label className="text-sm font-bold">Budgetrange<select name="budget" className="mt-2 h-12 w-full border border-background/30 bg-foreground px-3 text-sm outline-none focus:border-primary"><option>Nog te bepalen</option><option>€2.500 — €5.000</option><option>€5.000 — €10.000</option><option>€10.000+</option></select></label></div><label className="mt-6 block text-sm font-bold">Vertel over je project<textarea required name="message" rows={5} placeholder="Waar wil je naartoe?" className="mt-2 w-full resize-none border border-background/30 bg-foreground p-3 text-sm outline-none placeholder:text-background/45 focus:border-primary" /></label><Button type="submit" variant="coral" size="lg" className="mt-6 w-full sm:w-auto">Verstuur aanvraag <ArrowRight /></Button>{sent && <p role="status" className="mt-5 flex items-center gap-2 text-sm font-bold text-signal"><Check /> Je bericht staat klaar. Koppel later je formulierdienst om het echt te verzenden.</p>}</form>
        </div></section>
      </main>

      <footer className="border-t border-border px-5 py-10 lg:px-10"><div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><p className="display-text text-2xl font-bold">Koen Suhre<span className="text-cta">.</span></p><p className="mt-2 text-xs text-muted-foreground">Web Design • Development • Multimedia • Marketing-minded</p></div><div className="flex flex-wrap gap-5 text-sm font-semibold">{[["Home","home"],["Cases","cases"],["Over","over"],["Contact","contact"]].map(([label,id]) => <button key={id} onClick={() => go(id)} className="hover:text-signal">{label}</button>)}<a href="#linkedin" className="text-muted-foreground hover:text-signal">LinkedIn</a><a href="#instagram" className="text-muted-foreground hover:text-signal">Instagram</a></div><p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Koen Suhre</p></div></footer>
    </div>
  );
}

function SectionLabel({ number, text }: { number: string; text: string }) { return <p className="flex items-center gap-3 font-mono text-xs font-bold uppercase text-signal"><span className="text-muted-foreground">/{number}</span><span className="h-px w-10 bg-signal" />{text}</p>; }
function Field({ label, name, type = "text", placeholder, required = false }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) { return <label className="text-sm font-bold">{label}<input required={required} name={name} type={type} placeholder={placeholder} className="mt-2 h-12 w-full border border-background/30 bg-foreground px-3 text-sm outline-none placeholder:text-background/45 focus:border-primary" /></label>; }