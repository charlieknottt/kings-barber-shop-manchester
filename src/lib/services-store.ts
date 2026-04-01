// In-memory services store (for demo purposes)

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isActive: boolean;
  sortOrder: number;
}

// Initialize with default services
const defaultServices: Service[] = [
  { id: "traditional-haircut", name: "Traditional Barber Haircut", description: "Classic barbershop haircut with precision and care", price: 34, duration: 30, isActive: true, sortOrder: 1 },
  { id: "traditional-shave", name: "Traditional Shave", description: "Hot towel straight razor shave for a clean finish", price: 34, duration: 40, isActive: true, sortOrder: 2 },
  { id: "beard-trim", name: "Mustache & Beard Trim", description: "Professional beard and mustache shaping", price: 16, duration: 20, isActive: true, sortOrder: 3 },
  { id: "children-seniors", name: "Children & Seniors Haircut", description: "Quality cuts for kids and seniors", price: 28, duration: 25, isActive: true, sortOrder: 4 },
];

// Global store
const services: Map<string, Service> = new Map(
  defaultServices.map((s) => [s.id, s])
);

export function getAllServices(): Service[] {
  return Array.from(services.values()).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getActiveServices(): Service[] {
  return getAllServices().filter((s) => s.isActive);
}

export function getServiceById(id: string): Service | undefined {
  return services.get(id);
}

export function updateService(id: string, updates: Partial<Service>): Service | null {
  const existing = services.get(id);
  if (!existing) return null;

  const updated = { ...existing, ...updates };
  services.set(id, updated);
  return updated;
}

export function addService(service: Service): Service {
  services.set(service.id, service);
  return service;
}

export function deleteService(id: string): boolean {
  return services.delete(id);
}
