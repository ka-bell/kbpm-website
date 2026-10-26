/** Dutch overrides for playground posts. */
export const playgroundNl = {
  "why-we-still-write-sql-by-hand": {
    "title": "Waarom we nog steeds SQL met de hand schrijven",
    "summary": "ORMs zijn fine tot de query het product wordt. Notities van een platform dat zijn eigen data begon te verbergen.",
    "imageAlt": "Abstracte technische textuur",
    "body": [
      "De meeste producten sterven niet aan slechte UI. Ze sterven aan een datamodel dat niemand meer kan uitleggen — gewikkeld in een ORM die de rommel verborg tot die rommel load-bearing werd.",
      "We gebruiken ORMs nog voor saaie CRUD. Maar de queries die het product definiëren — die business rules, permissions en reporting coderen — schrijven we met de hand. In SQL. Op één plek. Gereviewd als code.",
      "Het is trager op dag één. Het is sneller op dag negentig, als iemand vraagt \"waarom is dit traag?\" en het antwoord een file is, niet een stapel generated joins.",
      "Dit is geen nostalgie. Het is ownership. Als het product de data is, is de query het craft."
    ]
  },
  "eu-hosting-is-a-product-decision": {
    "title": "EU-hosting is een productbeslissing",
    "summary": "Data residency is geen checkbox voor legal. Het verandert hoe je auth, backups en incident response ontwerpt.",
    "imageAlt": "Netwerk- en infrastructuurvisual",
    "body": [
      "Teams behandelen \"EU-hosting\" vaak als procurement-regel. Kies een region, vink GDPR aan, ship.",
      "In de praktijk hervormt het het product: waar sessions leven, hoe keys roteren, wat \"restore\" betekent als een backup de regio niet mag verlaten, en wie gepaged wordt als latency in één land piekt en in een ander niet.",
      "Wij behandelen het als architectuur. Als de brief Europese clients of gereguleerde data zegt, is residency onderdeel van de productvorm — geen late infra-ticket.",
      "De saaie versie: beslis vroeg, documenteer de data flow, en verzin geen multi-region-verhaal dat je niet kunt opereren."
    ]
  },
  "ai-features-that-earn-their-keep": {
    "title": "AI-features die hun plek verdienen",
    "summary": "Een korte filter voor wanneer AI in een live product hoort — en wanneer het alleen ruis is met een API-rekening.",
    "imageAlt": "Abstracte product surface",
    "body": [
      "De nuttige vraag is niet \"kunnen we AI toevoegen?\" Het is \"welke beslissing wordt beter, sneller of goedkoper als we het doen?\"",
      "Als je de beslissing niet kunt benoemen, decoreren je. Als je hem wel kunt benoemen — triage, matching, samenvatten van een bekende workflow — dan is AI gewoon een capability met duidelijke inputs, outputs en failure modes.",
      "We pressure-testen fit vóór build. Zelfde als elke integratie: cost, latency, evals, en een fallback als het model fout zit.",
      "AI shippen zonder die filter maakt producten trager en minder trusted. Met die filter is het gewoon engineering."
    ]
  }
} as const;

export type PlaygroundNlKey = keyof typeof playgroundNl;
