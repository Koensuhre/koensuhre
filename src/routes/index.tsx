import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type UIEvent,
} from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import realBakerAsset from "@/assets/therealbaker.png";
import jongeSpecialistAsset from "@/assets/dejongespecialist.png";
import webAgencyAsset from "@/assets/web agency twente.png";
import heyNoonaAsset from "@/assets/heynoona.nl.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Koen Suhre — Webdesigner & maker" },
      {
        name: "description",
        content:
          "Portfolio van Koen Suhre: webdesign, development, fotografie en video vanuit Nederland.",
      },
      { property: "og:title", content: "Koen Suhre — Webdesigner & maker" },
      {
        property: "og:description",
        content:
          "Digitale projecten waarin ontwerp, techniek en beeld vanzelfsprekend samenkomen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const nav = [
  ["Werk", "cases"],
  ["Over", "over"],
  ["Skills", "skills"],
  ["Werkwijze", "aanpak"],
  ["Contact", "contact"],
] as const;

const disciplines = [
  [
    "01",
    "Webdesign & development",
    "Van eerste schets tot een snelle, toegankelijke website die ook technisch klaar is om gevonden te worden.",
  ],
  [
    "02",
    "Identiteit & digitaal ontwerp",
    "Een visuele taal die past bij wie je bent en die consistent werkt over elke plek waar je zichtbaar bent.",
  ],
  [
    "03",
    "Online vindbaarheid & groei",
    "SEO, contentstructuur en data waar marketeers blij van worden — zonder het gevoel van een advertentie.",
  ],
  [
    "04",
    "Fotografie, film & beweging",
    "Eigen beeld dat sfeer, mensen en details eerlijk vastlegt, klaar om je verhaal te ondersteunen.",
  ],
  [
    "05",
    "Analyse & verfijning",
    "Meten, begrijpen en doorbijschaven zodat je site en content steeds beter aansluiten op je doelgroep.",
  ],
];

const cases = [
  {
    number: "01",
    name: "The Real Baker",
    url: "therealbaker.nl",
    note: "Strategie · webdesign · foto & video",
    image: realBakerAsset,
    text: "Voor The Real Baker heb ik de bestaande website volledig heruitgevonden en vanaf de basis opnieuw opgebouwd. De focus lag op een sterkere merkpositionering, een heldere digitale strategie en een optimale gebruikerservaring. Het aanbod is duidelijker gepresenteerd, de doelgroep wordt gerichter aangesproken en de online vindbaarheid is verbeterd. Voor de visuele merkbeleving ontwikkelde ik ook de bedrijfsvideo en verzorgde ik de fotografie.",
  },
  {
    number: "02",
    name: "De Jonge Specialist",
    url: "dejongespecialist.nl",
    note: "Rebranding · development · fotografie",
    image: jongeSpecialistAsset,
    text: "Voor De Jonge Specialist heb ik de bestaande website gerebrand en opnieuw opgebouwd. De uitstraling is gemoderniseerd, de gebruiksvriendelijkheid verbeterd en het beheer voor de organisatie vereenvoudigd. Ook optimaliseerde ik de structuur, contentpresentatie en technische werking. Ik verzorg doorlopend onderhoud, updates en conversie- en gebruiksoptimalisaties, en maakte de fotografie voor de vernieuwde online uitstraling.",
  },
  {
    number: "03",
    name: "Web Agency Twente",
    url: "webagencytwente.nl",
    note: "UX · conversie · SEO",
    image: webAgencyAsset,
    text: "Voor deze startup ontwikkelde ik een moderne, conversiegerichte website. Vanuit de strategische basis paste ik UI- en UX-principes toe voor een intuïtieve klantreis die bezoekers gericht naar contactmomenten en leads begeleidt. Daarnaast verzorgde ik de technische en contentmatige SEO-optimalisatie en een linkbuildingstrategie om de online autoriteit en organische vindbaarheid te versterken.",
  },
  {
    number: "04",
    name: "HeyNoona.nl",
    url: "heynoona.nl",
    note: "Maatwerk · booking · SEO, GEO & AEO",
    image: heyNoonaAsset,
    text: "Voor deze startup ontwierp en ontwikkelde ik een volledig dynamische maatwerkwebsite, afgestemd op specifieke gebruikersbehoeften en bedrijfsprocessen. Ik bouwde een geïntegreerd bookingsysteem en een dashboard voor boekingen, beschikbaarheid en beheer. Ook optimaliseerde ik de website voor SEO, AEO en GEO: organische zoekresultaten, directe antwoorden en zichtbaarheid binnen AI-gegenereerde zoekomgevingen.",
  },
];

const videos = [
  {
    title: "Timmerfabriek de Kievit — in 60 seconden",
    note: "Bedrijfsfilm · montage",
    embed: "https://player.vimeo.com/video/1112211386",
  },
  {
    title: "The Real Baker — productieproces",
    note: "Procesfilm · storytelling",
    embed: "https://player.vimeo.com/video/1143371348",
  },
  {
    title: "Circulaire geveleconomie",
    note: "Documentaire stijl",
    embed: "https://player.vimeo.com/video/1144867205",
  },
  {
    title: "Duet — Warehouse",
    note: "Sfeer & ruimte",
    embed: "https://player.vimeo.com/video/1152468073",
  },
  {
    title: "Tecnotion — New HQ",
    note: "Bedrijfsvideo",
    embed: "https://player.vimeo.com/video/788309298?h=a33832be69",
  },
  {
    title: "HOUT100% — Roadshow 2026",
    note: "Event aftermovie",
    embed: "https://player.vimeo.com/video/1179133274",
  },
];

const skillGroups = [
  {
    label: "Adobe & design",
    number: "01",
    lead: "Van idee naar beeld, beweging en een helder systeem.",
    tools: [
      "Creative Cloud",
      "Photoshop",
      "Illustrator",
      "InDesign",
      "Premiere Pro",
      "After Effects",
      "Figma",
    ],
  },
  {
    label: "Google marketing",
    number: "02",
    lead: "Meten wat mensen doen, begrijpen waarom en gericht bijsturen.",
    tools: [
      "Google Ads",
      "Analytics 4",
      "Tag Manager",
      "Search Console",
      "Looker Studio",
    ],
  },
  {
    label: "CMS & automation",
    number: "03",
    lead: "Digitale omgevingen die prettig blijven werken en meegroeien.",
    tools: ["WordPress", "Webflow", "HubSpot", "Zapier"],
  },
  {
    label: "Vindbaarheid & marketing",
    number: "04",
    lead: "Zichtbaar waar mensen zoeken: in zoekmachines, de regio en AI-antwoorden.",
    tools: [
      "SEO",
      "Local SEO — online vindbaarheid in de regio",
      "AI search (AEO & GEO) — vindbaarheid in AI-antwoorden",
    ],
  },
] as