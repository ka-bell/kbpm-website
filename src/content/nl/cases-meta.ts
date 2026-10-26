/** Dutch overrides for case titles / outcomes / metric labels. */
export const casesMetaNl = {
  "spilnews": {
    "title": "Video-newsplatform voor moderne editorial teams.",
    "outcome": "Een dedicated video publishing-platform voor het maken, beheren en distribueren van video-first nieuwscontent.",
    "metricLabel": "Gelanceerd in SPIL-ecosysteem"
  },
  "mix-interiors": {
    "title": "Visueel product discovery-platform.",
    "outcome": "Een interactief discovery-platform waarmee lezers producten herkennen en verkennen vanuit inspirerende interieurbeelden.",
    "metricLabel": "Product launch"
  },
  "virtue-worldwide": {
    "title": "Network intelligence-platform.",
    "outcome": "Een strategic intelligence-platform dat agencies helpt culturele trends, communities en verborgen verbanden tussen topics te ontdekken.",
    "metricLabel": "Strategy support"
  },
  "hopplay": {
    "title": "Location-based adventure-platform.",
    "outcome": "Een mobile gameplay-platform dat steden omzet in interactieve bezoekerservaringen.",
    "metricLabel": "Live destinations"
  },
  "academion": {
    "title": "Research operations-platform.",
    "outcome": "Een accreditation workflow-tool die teams 85% van hun week terug gaf.",
    "metricLabel": "Teamuren bespaard"
  },
  "blink": {
    "title": "Tattoo booking dat écht werkt.",
    "outcome": "Een bookingplatform voor tattoo artists — van publieke request flow tot studio-agenda en betalingen.",
    "metricLabel": "Booking → agenda → betalen"
  },
  "staatsloterij": {
    "title": "Digitale loterij-ervaring voor Nederland.",
    "outcome": "Een herontworpen digitaal platform dat spelen bij de Staatsloterij modern, helder en betrouwbaar maakt.",
    "metricLabel": "Platform redesign"
  },
  "scooply-ai": {
    "title": "AI die browsen omzet in scoops.",
    "outcome": "Een browser-native AI-product dat mensen helpt scherpere verhalen te vinden, vorm te geven en te delen vanaf het open web.",
    "metricLabel": "In-browser scooping"
  },
  "frame": {
    "title": "Framing voor werk dat een podium verdient.",
    "outcome": "Een productervaring die creative teams helpt hun werk helder te presenteren, delen en beschermen.",
    "metricLabel": "Creative platform"
  },
  "pepperminds": {
    "title": "Een scherpere surface voor brand en product.",
    "outcome": "Een digitaal product- en brandsysteem dat Pepperminds een helderdere, zelfverzekerdere presence geeft over schermen heen.",
    "metricLabel": "Product system"
  }
} as const;

export type CasesMetaNlKey = keyof typeof casesMetaNl;
