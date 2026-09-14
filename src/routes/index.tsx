import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Check, ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/koen-portrait.jpg";
import webagency from "@/assets/case-webagency.jpg";
import heynoona from "@/assets/case-heynoona.jpg";
import werkgenoten from "@/assets/case-werkgenoten.jpg";

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

const nav = [["Werk", "cases"], ["Over", "over"], ["Werkwijze", "aanpak"], ["Contact", "contact"]] as const;

const disciplines = [
  ["01", "Webdesign & development", "Van eerste schets tot een snelle, toegankelijke website."],
  ["02", "Identiteit & digitaal ontwerp", "Een visuele taal die past bij wie je bent en wat je wilt vertellen."],
  ["03", "Fotografie, film & beweging", "Eigen beeld dat sfeer, mensen en details eerlijk vastlegt."],
  ["04", "Vindbaarheid & verfijning", "Aandacht voor structuur, techniek en wat na de lancering beter kan."],
];

const cases = [
  { number: "01", name: "Web Agency Twente", url: "webagencytwente.nl", note: "Digitale identiteit en website", image: webagency, text: "Een heldere website voor een bureau uit Twente. Rust in de structuur laat expertise en lokaal karakter spreken." },
  { number: "02", name: "Hey Noona", url: "heynoona.nl", note: "Merk, web en beeld", image: heynoona, text: "Een expressieve merkwereld waarin verhalen, fotografie en digitaal ontwerp als één geheel aanvoelen." },
  { number: "03", name: "Werkgenoten", url: "werkgenoten.online", note: "Platform en gebruikservaring", image: werkgenoten, text: "Een toegankelijk platform voor nieuwe ontmoetingen op de werkvloer, met ruimte voor twee verschillende doelgroepen." },
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
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
        <section id="home" className="relative flex min-h-[94vh] items-center overflow-hidden px-6 pb-16 pt-32 lg:px-10">
          <div className="organic-field absolute -right-32 top-24 size-[32rem] opacity-70" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-[1380px] gap-16 lg:grid-cols-12 lg:items-center">
            <div className="relative z-10 lg:col-span-7">
              <p className="mb-8 flex items-center gap-3 text-xs font-medium uppercase text-muted-foreground"><span className="size-2 rounded-full bg-signal" /> Webdesigner & maker in Nederland</p>
              <h1 className="text-[clamp(4rem,9vw,8.5rem)] font-medium leading-[0.84]">Koen <span className="text-primary">Suhre</span></h1>
              <p className="mt-9 max-w-2xl text-xl font-light leading-relaxed text-muted-foreground md:text-2xl">Ik ontwerp en bouw digitale ervaringen, met evenveel aandacht voor <span className="text-foreground">beeld, techniek en verhaal.</span></p>
              <div className="mt-10 flex flex-wrap items-center gap-5"><Button size="lg" onClick={() => go("cases")}>Bekijk mijn werk <ArrowDown /></Button><Button variant="link" size="lg" onClick={() => go("over")}>Meer over mij</Button></div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <div className="portrait-shell reveal"><img src={portrait} alt="Koen Suhre in zijn creatieve werkruimte" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" /></div>
              <div className="absolute -bottom-8 -left-3 max-w-56 rotate-2 rounded-3xl border border-card bg-card/90 p-6 shadow-soft backdrop-blur md:-left-12"><p className="font-display text-xl leading-snug">Nieuwsgierig naar hoe dingen beter kunnen.</p><p className="mt-3 text-xs text-muted-foreground">Ontwerpfilosofie</p></div>
              <div className="absolute right-0 top-10 -rotate-3 rounded-2xl bg-primary px-5 py-3 text-sm text-primary-foreground shadow-soft">Design · Code · Beeld</div>
            </div>
          </div>
        </section>

        <section id="over" className="px-6 py-28 lg:px-10 lg:py-44">
          <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-12">
            <div className="reveal lg:col-span-4"><Eyebrow text="Over" /><p className="mt-8 max-w-xs text-sm leading-7 text-muted-foreground">Vanuit Enschede werk ik met organisaties en mensen die aandacht hebben voor wat ze maken.</p></div>
            <div className="reveal lg:col-span-8"><h2 className="max-w-4xl text-4xl font-medium leading-tight md:text-7xl">Tussen idee en uitvoering voel ik me het meest thuis.</h2><p className="mt-10 max-w-2xl text-lg leading-8 text-muted-foreground">Ik ben webdesigner, developer en beeldmaker. Daardoor kan ik een project als geheel bekijken: wat het moet vertellen, hoe het moet voelen en hoe het technisch prettig blijft werken. Soms begint dat met een gesprek, soms met een camera of een schets.</p></div>
          </div>
        </section>

        <section id="diensten" className="bg-secondary/55 px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1380px]"><div className="reveal max-w-3xl"><Eyebrow text="Wat ik maak" /><h2 className="mt-7 text-5xl font-medium md:text-7xl">Verschillende disciplines,<br />één handschrift.</h2></div>
            <div className="mt-20 grid gap-x-12 md:grid-cols-2">{disciplines.map(([number, title, text], index) => <article key={title} className={`reveal border-t border-border py-10 ${index % 2 ? "md:translate-y-16" : ""}`}><span className="text-xs text-primary">{number}</span><h3 className="mt-6 text-2xl font-medium md:text-3xl">{title}</h3><p className="mt-4 max-w-md leading-7 text-muted-foreground">{text}</p></article>)}</div>
          </div>
        </section>

        <section id="cases" className="px-6 py-28 lg:px-10 lg:py-44">
          <div className="mx-auto max-w-[1380px]"><div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><Eyebrow text="Geselecteerd werk" /><h2 className="mt-7 text-6xl font-medium md:text-8xl">Drie verhalen.</h2></div><p className="max-w-sm leading-7 text-muted-foreground">Een selectie van projecten waarin strategie, ontwerp en uitvoering elkaar aanvullen.</p></div>
            <div className="mt-24 space-y-36">{cases.map((project, index) => <article key={project.name} className="reveal grid items-center gap-10 lg:grid-cols-12"><div className={`group overflow-hidden rounded-[2rem] lg:col-span-7 ${index % 2 ? "lg:order-2 lg:translate-y-12" : ""}`}><img src={project.image} alt={`Ontwerp voor ${project.name}`} width={1280} height={912} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-1000 group-hover:scale-[1.025]" /></div><div className={`lg:col-span-4 ${index % 2 ? "lg:order-1" : "lg:col-start-9"}`}><p className="text-xs text-primary">{project.number} · {project.note}</p><h3 className="mt-5 text-4xl font-medium md:text-5xl">{project.name}</h3><p className="mt-6 text-lg leading-8 text-muted-foreground">{project.text}</p><a href={`https://${project.url}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm">{project.url} <ExternalLink className="size-4" /></a></div></article>)}</div>
          </div>
        </section>

        <section id="aanpak" className="bg-foreground px-6 py-28 text-background lg:px-10 lg:py-40"><div className="mx-auto max-w-[1380px]"><Eyebrow text="Werkwijze" light /><h2 className="mt-7 max-w-4xl text-5xl font-medium leading-tight md:text-7xl">Rust in het proces geeft ruimte aan goede ideeën.</h2><div className="mt-20 grid gap-10 md:grid-cols-4">{[["01", "Luisteren", "We beginnen bij de context, de mensen en de vraag achter de vraag."], ["02", "Verkennen", "Richting ontstaat in schetsen, woorden, beelden en kleine experimenten."], ["03", "Maken", "Ontwerp en techniek groeien samen, met regelmatige momenten om te kijken."], ["04", "Verfijnen", "Na de eerste versie blijven details, snelheid en inhoud aandacht krijgen."]].map(([number, title, text]) => <article key={title} className="reveal border-t border-background/25 pt-7"><span className="text-xs text-signal">{number}</span><h3 className="mt-10 text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-background/65">{text}</p></article>)}</div></div></section>

        <section className="px-6 py-28 lg:px-10 lg:py-40"><div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-12"><div className="lg:col-span-4"><Eyebrow text="Samenwerken" /></div><blockquote className="reveal lg:col-span-7"><p className="font-display text-3xl leading-snug md:text-5xl">“Koen stelt aandachtige vragen en vertaalt complexe ideeën naar iets dat helder en vanzelfsprekend voelt.”</p><footer className="mt-8 text-sm text-muted-foreground">Voorbeeldtekst — te vervangen door een geverifieerde reactie</footer></blockquote></div></section>

        <section id="contact" className="px-6 pb-20 lg:px-10 lg:pb-32"><div className="mx-auto overflow-hidden rounded-[2.5rem] bg-secondary p-7 md:p-14 lg:p-20"><div className="grid gap-16 lg:grid-cols-2"><div className="reveal"><Eyebrow text="Contact" /><h2 className="mt-7 text-5xl font-medium leading-tight md:text-7xl">Heb je iets<br />in gedachten?</h2><p className="mt-7 max-w-md text-lg leading-8 text-muted-foreground">Vertel me waar je aan werkt. Dan kijken we rustig of mijn manier van werken erbij past.</p><a href="mailto:hello@koensuhre.nl" className="mt-10 inline-block border-b border-foreground pb-1 text-lg">hello@koensuhre.nl</a></div>
                <form onSubmit={submit} className="reveal space-y-7" aria-label="Contactformulier"><div className="grid gap-7 sm:grid-cols-2"><Field label="Naam" name="name" placeholder="Jouw naam" required /><Field label="E-mail" name="email" type="email" placeholder="jij@bedrijf.nl" required /></div><Field label="Organisatie" name="company" placeholder="Optioneel" /><label className="block text-sm">Waar denk je aan?<textarea required name="message" rows={5} placeholder="Een korte omschrijving is genoeg" className="mt-2 w-full resize-none rounded-2xl border border-border bg-card p-4 outline-none placeholder:text-muted-foreground/60 focus:border-primary" /></label><Button type="submit" size="lg">Verstuur bericht <ArrowRight /></Button>{sent && <p role="status" className="flex items-center gap-2 text-sm text-primary"><Check className="size-4" /> Je bericht staat klaar. De verzendservice moet nog worden gekoppeld.</p>}</form>
              </div></div></section>
      </main>

      <footer className="px-6 pb-10 lg:px-10"><div className="mx-auto flex max-w-[1380px] flex-col gap-8 border-t border-border pt-9 md:flex-row md:items-end md:justify-between"><div><p className="font-display text-xl font-medium">Koen Suhre</p><p className="mt-2 text-sm text-muted-foreground">Design · Development · Fotografie · Film</p></div><div className="flex gap-6 text-sm">{nav.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</div><p className="text-xs text-muted-foreground">© {new Date().getFullYear()}</p></div></footer>
    </div>
  );
}

function Eyebrow({ text, light = false }: { text: string; light?: boolean }) { return <p className={`flex items-center gap-3 text-xs font-medium uppercase ${light ? "text-background/60" : "text-muted-foreground"}`}><span className={`h-px w-9 ${light ? "bg-signal" : "bg-primary"}`} />{text}</p>; }
function Field({ label, name, type = "text", placeholder, required = false }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) { return <label className="block text-sm">{label}<input required={required} name={name} type={type} placeholder={placeholder} className="mt-2 h-12 w-full rounded-full border border-border bg-card px-5 outline-none placeholder:text-muted-foreground/60 focus:border-primary" /></label>; }