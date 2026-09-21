import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type UIEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Check, ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import realBakerAsset from "@/assets/therealbaker.png";
import jongeSpecialistAsset from "@/assets/dejongespecialist.png";
import webAgencyAsset from "@/assets/web agency twente.png";
import heyNoonaAsset from "@/assets/heynoona.nl.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Koen Suhre — Webdesigner & maker" },
      { name: "description", content: "Portfolio van Koen Suhre: webdesign, development, fotografie en video vanuit Nederland." },
      { property: "og:title", content: "Koen Suhre — Webdesigner & maker" },
      { property: "og:description", content: "Digitale projecten waarin ontwerp, techniek en beeld vanzelfsprekend samenkomen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const nav = [["Werk", "cases"], ["Over", "over"], ["Skills", "skills"], ["Werkwijze", "aanpak"], ["Contact", "contact"]] as const;

const disciplines = [
  ["01", "Webdesign & development", "Van eerste schets tot een snelle, toegankelijke website die ook technisch klaar is om gevonden te worden."],
  ["02", "Identiteit & digitaal ontwerp", "Een visuele taal die past bij wie je bent en die consistent werkt over elke plek waar je zichtbaar bent."],
  ["03", "Online vindbaarheid & groei", "SEO, contentstructuur en data waar marketeers blij van worden — zonder het gevoel van een advertentie."],
  ["04", "Fotografie, film & beweging", "Eigen beeld dat sfeer, mensen en details eerlijk vastlegt, klaar om je verhaal te ondersteunen."],
  ["05", "Analyse & verfijning", "Meten, begrijpen en doorbijschaven zodat je site en content steeds beter aansluiten op je doelgroep."],
];

const cases = [
  { number: "01", name: "The Real Baker", url: "therealbaker.nl", note: "Strategie · webdesign · foto & video", image: realBakerAsset.url, text: "Voor The Real Baker heb ik de bestaande website volledig heruitgevonden en vanaf de basis opnieuw opgebouwd. De focus lag op een sterkere merkpositionering, een heldere digitale strategie en een optimale gebruikerservaring. Het aanbod is duidelijker gepresenteerd, de doelgroep wordt gerichter aangesproken en de online vindbaarheid is verbeterd. Voor de visuele merkbeleving ontwikkelde ik ook de bedrijfsvideo en verzorgde ik de fotografie." },
  { number: "02", name: "De Jonge Specialist", url: "dejongespecialist.nl", note: "Rebranding · development · fotografie", image: jongeSpecialistAsset.url, text: "Voor De Jonge Specialist heb ik de bestaande website gerebrand en opnieuw opgebouwd. De uitstraling is gemoderniseerd, de gebruiksvriendelijkheid verbeterd en het beheer voor de organisatie vereenvoudigd. Ook optimaliseerde ik de structuur, contentpresentatie en technische werking. Ik verzorg doorlopend onderhoud, updates en conversie- en gebruiksoptimalisaties, en maakte de fotografie voor de vernieuwde online uitstraling." },
  { number: "03", name: "Web Agency Twente", url: "webagencytwente.nl", note: "UX · conversie · SEO", image: webAgencyAsset.url, text: "Voor deze startup ontwikkelde ik een moderne, conversiegerichte website. Vanuit de strategische basis paste ik UI- en UX-principes toe voor een intuïtieve klantreis die bezoekers gericht naar contactmomenten en leads begeleidt. Daarnaast verzorgde ik de technische en contentmatige SEO-optimalisatie en een linkbuildingstrategie om de online autoriteit en organische vindbaarheid te versterken." },
  { number: "04", name: "HeyNoona.nl", url: "heynoona.nl", note: "Maatwerk · booking · SEO, GEO & AEO", image: heyNoonaAsset.url, text: "Voor deze startup ontwierp en ontwikkelde ik een volledig dynamische maatwerkwebsite, afgestemd op specifieke gebruikersbehoeften en bedrijfsprocessen. Ik bouwde een geïntegreerd bookingsysteem en een dashboard voor boekingen, beschikbaarheid en beheer. Ook optimaliseerde ik de website voor SEO, AEO en GEO: organische zoekresultaten, directe antwoorden en zichtbaarheid binnen AI-gegenereerde zoekomgevingen." },
];

const videos = [
  { title: "Timmerfabriek de Kievit — in 60 seconden", note: "Bedrijfsfilm · montage", embed: "https://player.vimeo.com/video/1112211386" },
  { title: "The Real Baker — productieproces", note: "Procesfilm · storytelling", embed: "https://player.vimeo.com/video/1143371348" },
  { title: "Circulaire geveleconomie", note: "Documentaire stijl", embed: "https://player.vimeo.com/video/1144867205" },
  { title: "Duet — Warehouse", note: "Sfeer & ruimte", embed: "https://player.vimeo.com/video/1152468073" },
  { title: "Tecnotion — New HQ", note: "Bedrijfsvideo", embed: "https://player.vimeo.com/video/788309298?h=a33832be69" },
  { title: "HOUT100% — Roadshow 2026", note: "Event aftermovie", embed: "https://player.vimeo.com/video/1179133274" },
];

const skillGroups = [
  { label: "Adobe & design", number: "01", lead: "Van idee naar beeld, beweging en een helder systeem.", tools: ["Creative Cloud", "Photoshop", "Illustrator", "InDesign", "Premiere Pro", "After Effects", "Figma"] },
  { label: "Google marketing", number: "02", lead: "Meten wat mensen doen, begrijpen waarom en gericht bijsturen.", tools: ["Google Ads", "Analytics 4", "Tag Manager", "Search Console", "Looker Studio"] },
  { label: "CMS & automation", number: "03", lead: "Digitale omgevingen die prettig blijven werken en meegroeien.", tools: ["WordPress", "Webflow", "HubSpot", "Zapier"] },
  { label: "Vindbaarheid & marketing", number: "04", lead: "Zichtbaar waar mensen zoeken: in zoekmachines, de regio en AI-antwoorden.", tools: ["SEO", "Local SEO — online vindbaarheid in de regio", "AI search (AEO & GEO) — vindbaarheid in AI-antwoorden"] },
] as const;

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [projectType, setProjectType] = useState<"web" | "media">("web");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    let frame = 0;
    const move = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--page-scroll", `${window.scrollY}px`);
        const wide = window.innerWidth >= 1024;
        document.querySelectorAll<HTMLElement>("[data-scroll-speed]").forEach((element) => {
          if (!wide) { element.style.setProperty("--scroll-shift", "0px"); return; }
          const speed = Number(element.dataset["scrollSpeed"] ?? 0);
          const rect = element.getBoundingClientRect();
          const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
          element.style.setProperty("--scroll-shift", `${offset}px`);
        });
      });
    };
    move();
    window.addEventListener("scroll", move, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", move); cancelAnimationFrame(frame); };
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-6 lg:px-10" aria-label="Hoofdnavigatie">
          <button onClick={() => go("home")} className="font-display text-lg font-medium" aria-label="Naar boven">Koen Suhre</button>
          <div className="hidden items-center gap-9 md:flex">
            {nav.map(([label, id]) => <button key={id} onClick={() => go(id)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{label}</button>)}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Menu sluiten" : "Menu openen"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </nav>
        {menuOpen && <div className="absolute inset-x-0 top-20 border-t border-border bg-background p-6 shadow-soft md:hidden">{nav.map(([label, id]) => <button key={id} onClick={() => go(id)} className="block w-full border-b border-border py-4 text-left font-display text-2xl">{label}</button>)}</div>}
      </header>

      <main>
        <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden border-b-2 border-foreground px-6 pb-14 pt-28 lg:px-10">
          <div className="kinetic-disc absolute -right-12 top-28 size-56 sm:-right-24 sm:size-72 md:size-[30rem]" data-scroll-speed="0.08" aria-hidden="true" />
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="mb-8 flex items-center justify-between border-b-2 border-foreground pb-4 text-xs font-medium uppercase">
              <span>Portfolio / 2026</span><span className="hidden sm:block">Almelo — Nederland</span>
            </div>
            <h1 className="hero-type relative z-10 font-bold uppercase">
              <span className="hero-line hero-line-left">Web</span>
              <span className="hero-line hero-line-right text-primary">Designer</span>
              <span className="hero-line hero-line-left">& Maker</span>
            </h1>
            <div className="mt-10 grid gap-8 border-t-2 border-foreground pt-7 md:grid-cols-3 md:items-end">
              <p className="max-w-sm text-lg leading-snug">Ik ontwerp en bouw digitale ervaringen waarin beeld, techniek en verhaal samenkomen.</p>
              <p className="text-sm leading-6 text-muted-foreground md:col-start-2">Webdesign · development<br />fotografie · film · strategie<br />SEO · content · online marketing</p>
              <button onClick={() => go("cases")} className="group ml-auto flex size-24 items-center justify-center rounded-full border-2 border-foreground transition-colors hover:bg-foreground hover:text-background" aria-label="Bekijk mijn werk"><ArrowDown className="size-7 transition-transform group-hover:translate-y-2" /></button>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee-track">DESIGN — CODE — BEELD — IDEEËN — DESIGN — CODE — BEELD — IDEEËN —</div></div>

        <section id="over" className="overflow-hidden border-b-2 border-foreground px-6 py-28 lg:px-10 lg:py-44">
          <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-12">
            <div className="reveal lg:col-span-4"><Eyebrow text="Over" /></div>
            <div className="reveal lg:col-span-8"><h2 className="section-title max-w-6xl uppercase">Tussen idee en <span className="serif-cut text-primary">uitvoering</span> voel ik me thuis.</h2><p className="mt-10 max-w-2xl text-lg leading-8 text-muted-foreground">Ik ben webdesigner, developer en beeldmaker. Daardoor kan ik een project als geheel bekijken: wat het moet vertellen, hoe het moet voelen en hoe het technisch prettig blijft werken. Soms begint dat met een gesprek, soms met een camera of een schets.</p></div>
          </div>
        </section>

        <section id="diensten" className="border-b-2 border-foreground bg-signal px-6 py-28 text-signal-foreground lg:px-10 lg:py-40">
           <div className="mx-auto max-w-[1380px]"><div className="reveal max-w-6xl"><Eyebrow text="Wat ik maak" /><h2 className="section-title mt-7 uppercase">Verschillende <span className="serif-cut">disciplines.</span><br />Eén handschrift.</h2></div>
            <div className="mt-20 grid gap-x-12 md:grid-cols-2">{disciplines.map(([number, title, text], index) => <article key={title} className={`reveal border-t-2 border-signal-foreground py-10 ${index % 2 ? "md:translate-y-16" : ""}`}><span className="text-xs">{number}</span><h3 className="mt-6 text-2xl font-bold uppercase md:text-3xl">{title}</h3><p className="mt-4 max-w-md leading-7 opacity-70">{text}</p></article>)}</div>
          </div>
        </section>

        <SkillSlider />

        <section id="cases" className="px-6 py-28 lg:px-10 lg:py-44">
          <div className="mx-auto max-w-[1380px]">
            <div className="reveal flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div><Eyebrow text="Geselecteerd werk" /><h2 className="section-title mt-7 uppercase">Werk/<span className="serif-cut text-primary">04</span></h2></div>
              <div className="max-w-md">
                <p className="leading-7 text-muted-foreground">Een selectie waarin strategie, ontwerp, techniek en beeld elkaar aanvullen.</p>
                <div className="mt-7 inline-flex border-2 border-foreground p-1" role="tablist" aria-label="Soort projecten">
                  <Button role="tab" aria-selected={projectType === "web"} variant={projectType === "web" ? "default" : "ghost"} className="rounded-none" onClick={() => setProjectType("web")}>Websites</Button>
                  <Button role="tab" aria-selected={projectType === "media"} variant={projectType === "media" ? "default" : "ghost"} className="rounded-none" onClick={() => setProjectType("media")}>Foto & video</Button>
                </div>
              </div>
            </div>

            {projectType === "web" ? (
              <div className="mt-24 space-y-36" role="tabpanel" aria-label="Websiteprojecten">{cases.map((project, index) => <article key={project.name} className="grid items-center gap-10 lg:grid-cols-12"><div className={`project-frame group lg:col-span-8 ${index % 2 ? "lg:order-2 lg:translate-x-10" : "lg:-translate-x-10"}`} data-scroll-speed={index % 2 ? "-0.035" : "0.035"}><img src={project.image} alt={`Website van ${project.name}`} width={1280} height={800} loading={index === 0 ? "eager" : "lazy"} decoding="async" className="block aspect-[16/10] h-auto w-full max-w-full object-cover object-top transition duration-1000 group-hover:scale-[1.04]" /><span className="absolute left-4 top-4 bg-signal px-4 py-3 font-display text-xl font-bold text-signal-foreground">{project.number}</span></div><div className={`relative z-10 lg:col-span-4 ${index % 2 ? "lg:order-1" : "lg:col-start-9"}`}><p className="text-xs uppercase text-primary">{project.note}</p><h3 className="mt-5 text-4xl font-bold uppercase md:text-6xl">{project.name}</h3><p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">{project.text}</p><a href={`https://${project.url}`} target="_blank" rel="noreferrer" className="story-link mt-8 inline-flex items-center gap-2 pb-1 text-sm">{project.url} <ExternalLink className="size-4" /></a></div></article>)}</div>
            ) : (
              <div className="mt-24 space-y-20" role="tabpanel" aria-label="Foto- en videoprojecten">
                <div className="grid gap-10 md:grid-cols-12 md:items-end">
                  <p className="text-xs font-semibold uppercase text-primary md:col-span-3">Film & beeld</p>
                  <h3 className="text-4xl font-bold uppercase leading-none md:col-span-9 md:text-7xl">Bewegend beeld, eerlijk verteld.</h3>
                </div>
                <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">{videos.map((video) => <article key={video.title}><div className="project-frame aspect-video w-full overflow-hidden"><iframe src={video.embed} title={`Video: ${video.title}`} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full border-0" /></div><p className="mt-5 text-xs uppercase text-primary">{video.note}</p><h4 className="mt-2 font-display text-2xl font-bold uppercase md:text-3xl">{video.title}</h4></article>)}</div>
              </div>
            )}
          </div>
        </section>

        <section id="aanpak" className="bg-foreground px-6 py-28 text-background lg:px-10 lg:py-40"><div className="mx-auto max-w-[1380px]"><h2 className="section-title max-w-6xl uppercase">Rust in het proces.<br /><span className="serif-cut text-signal">Ruimte voor ideeën.</span></h2></div></section>

        

        <section id="contact" className="px-6 pb-20 lg:px-10 lg:pb-32"><div className="mx-auto overflow-hidden rounded-[2.5rem] bg-secondary p-7 md:p-14 lg:p-20"><div className="grid gap-16 lg:grid-cols-2"><div className="reveal"><Eyebrow text="Contact" /><h2 className="mt-7 text-5xl font-medium leading-tight md:text-7xl">Heb je iets<br />in gedachten?</h2><p className="mt-7 max-w-md text-lg leading-8 text-muted-foreground">Vertel me waar je aan werkt. Dan kijken we rustig of mijn manier van werken erbij past.</p><a href="mailto:koensuhre@gmail.com" className="mt-10 inline-block border-b border-foreground pb-1 text-lg">koensuhre@gmail.com</a><a href="tel:+31623816297" className="mt-3 block text-lg text-muted-foreground transition-colors hover:text-foreground">06 238 16 297</a></div>
                <form onSubmit={submit} className="reveal space-y-7" aria-label="Contactformulier"><div className="grid gap-7 sm:grid-cols-2"><Field label="Naam" name="name" placeholder="Jouw naam" required /><Field label="E-mail" name="email" type="email" placeholder="jij@bedrijf.nl" required /></div><Field label="Organisatie" name="company" placeholder="Optioneel" /><label className="block text-sm">Waar denk je aan?<textarea required name="message" rows={5} placeholder="Een korte omschrijving is genoeg" className="mt-2 w-full resize-none rounded-2xl border border-border bg-card p-4 outline-none placeholder:text-muted-foreground/60 focus:border-primary" /></label><Button type="submit" size="lg">Verstuur bericht <ArrowRight /></Button>{sent && <p role="status" className="flex items-center gap-2 text-sm text-primary"><Check className="size-4" /> Je bericht staat klaar. De verzendservice moet nog worden gekoppeld.</p>}</form>
              </div></div></section>
      </main>

      <footer className="px-6 pb-10 lg:px-10"><div className="mx-auto flex max-w-[1380px] flex-col gap-8 border-t border-border pt-9 md:flex-row md:items-end md:justify-between"><div><p className="font-display text-xl font-medium">Koen Suhre</p><p className="mt-2 text-sm text-muted-foreground">Design · Development · Fotografie · Film</p><div className="mt-4 flex flex-col gap-1 text-sm"><a href="mailto:koensuhre@gmail.com" className="transition-colors hover:text-foreground">koensuhre@gmail.com</a><a href="tel:+31623816297" className="transition-colors hover:text-foreground">06 238 16 297</a></div></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">{nav.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</div><p className="text-xs text-muted-foreground">© 2026</p></div></footer>
    </div>
  );
}

function Eyebrow({ text, light = false }: { text: string; light?: boolean }) { return <p className={`flex items-center gap-3 text-xs font-medium uppercase ${light ? "text-background/60" : "text-muted-foreground"}`}><span className={`h-px w-9 ${light ? "bg-signal" : "bg-primary"}`} />{text}</p>; }
function Field({ label, name, type = "text", placeholder, required = false }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) { return <label className="block text-sm">{label}<input required={required} name={name} type={type} placeholder={placeholder} className="mt-2 h-12 w-full rounded-full border border-border bg-card px-5 outline-none placeholder:text-muted-foreground/60 focus:border-primary" /></label>; }

function SkillSlider() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const next = Math.max(0, Math.min(skillGroups.length - 1, active + direction));
    rail.children.item(next)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActive(next);
  };

  const syncActive = (event: UIEvent<HTMLDivElement>) => {
    const rail = event.currentTarget;
    const width = rail.firstElementChild?.getBoundingClientRect().width ?? rail.clientWidth;
    if (width > 0) setActive(Math.min(skillGroups.length - 1, Math.round(rail.scrollLeft / width)));
  };

  return (
    <section id="skills" className="overflow-hidden border-b-2 border-foreground bg-secondary py-28 lg:py-40" aria-labelledby="skills-title">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="reveal flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div><Eyebrow text="Tools & platforms" /><h2 id="skills-title" className="section-title mt-7 max-w-5xl uppercase">Gereedschap voor <span className="serif-cut text-primary">ideeën.</span></h2></div>
          <div className="flex items-center gap-3 self-end">
            <Button variant="editorial" size="icon" onClick={() => move(-1)} disabled={active === 0} aria-label="Vorige skillgroep"><ArrowLeft /></Button>
            <span className="min-w-20 text-center text-xs font-medium" aria-live="polite">0{active + 1} / 0{skillGroups.length}</span>
            <Button variant="editorial" size="icon" onClick={() => move(1)} disabled={active === skillGroups.length - 1} aria-label="Volgende skillgroep"><ArrowRight /></Button>
          </div>
        </div>
      </div>
      <div ref={railRef} onScroll={syncActive} onKeyDown={(event) => { if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); }} tabIndex={0} role="region" aria-label="Skillgroepen" className="skill-rail mt-16 flex gap-5 overflow-x-auto px-6 pb-8 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary lg:gap-8 lg:px-[max(2.5rem,calc((100vw-1380px)/2))]">
        {skillGroups.map((group) => (
          <article key={group.label} className="skill-slide relative flex min-h-[30rem] w-[84vw] shrink-0 flex-col justify-between overflow-hidden border-2 border-foreground bg-background p-7 md:w-[58vw] md:p-10 lg:w-[48rem]">
            <div className="flex items-start justify-between gap-6"><p className="text-xs font-semibold uppercase text-primary">{group.label}</p><span className="skill-number text-7xl leading-none text-primary/25 md:text-9xl">{group.number}</span></div>
            <div><h3 className="max-w-xl text-3xl font-bold uppercase leading-tight md:text-5xl">{group.lead}</h3><ul className="mt-10 flex flex-wrap gap-2" aria-label={`Programma's voor ${group.label}`}>{group.tools.map((tool) => <li key={tool} className="rounded-full border border-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background">{tool}</li>)}</ul></div>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-3 flex max-w-[1380px] items-center gap-5 px-6 lg:px-10"><span className="text-xs uppercase text-muted-foreground">Swipe / sleep</span><div className="h-1 flex-1 overflow-hidden bg-border"><div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${((active + 1) / skillGroups.length) * 100}%` }} /></div></div>
    </section>
  );
}