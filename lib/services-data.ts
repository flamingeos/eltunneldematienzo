export interface ServiceInfo {
  name: string;
  category: "exterior" | "interior" | "protection" | "correction";
  duration: number; // hours
  price: string;
  description: string;
}

export const SERVICES: ServiceInfo[] = [
  { name: "Lavado Exterior", category: "exterior", duration: 1, price: "desde $25", description: "Limpieza exterior con productos premium" },
  { name: "Foam Bath", category: "exterior", duration: 1, price: "desde $35", description: "Tratamiento con espuma de alta densidad" },
  { name: "Hand Wash", category: "exterior", duration: 1, price: "desde $45", description: "Lavado meticuloso 100% a mano" },
  { name: "Wheel Cleaning", category: "exterior", duration: 1, price: "desde $20", description: "Limpieza profunda de rines y llantas" },
  { name: "Tire Shine", category: "exterior", duration: 1, price: "desde $15", description: "Brillo protector para neumaticos" },
  { name: "Full Detail", category: "interior", duration: 3, price: "desde $120", description: "Detallado completo interior y exterior" },
  { name: "Interior Deep Clean", category: "interior", duration: 2, price: "desde $85", description: "Limpieza profunda del habitaculo" },
  { name: "Steam Cleaning", category: "interior", duration: 3, price: "desde $100", description: "Vapor a alta presion para desinfectar" },
  { name: "Leather Treatment", category: "interior", duration: 2, price: "desde $95", description: "Nutricion y proteccion del cuero genuino" },
  { name: "Stain Removal", category: "interior", duration: 2, price: "desde $60", description: "Eliminacion de manchas dificiles" },
  { name: "Ceramic Coating", category: "protection", duration: 4, price: "desde $350", description: "Recubrimiento ceramico de larga duracion" },
  { name: "Paint Protection", category: "protection", duration: 3, price: "desde $250", description: "Film protector de pintura (PPF)" },
  { name: "Hydrophobic Finish", category: "protection", duration: 2, price: "desde $150", description: "Acabado hidrofobico repelente al agua" },
  { name: "Multi-Year Protection", category: "protection", duration: 4, price: "desde $450", description: "Proteccion premium por multiples anos" },
  { name: "Paint Correction", category: "correction", duration: 4, price: "desde $300", description: "Correccion profesional de defectos" },
  { name: "Swirl Removal", category: "correction", duration: 3, price: "desde $200", description: "Eliminacion de remolinos y microrayones" },
  { name: "Scratch Reduction", category: "correction", duration: 3, price: "desde $250", description: "Reduccion de rayones superficiales" },
  { name: "Gloss Enhancement", category: "correction", duration: 2, price: "desde $180", description: "Potenciacion del brillo y lustre" },
];

export const SERVICE_DURATIONS: Record<string, number> = Object.fromEntries(
  SERVICES.map((s) => [s.name, s.duration])
);
