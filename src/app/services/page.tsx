import Link from "next/link";
import { formatPrice, formatDuration } from "@/lib/utils";
import { IoTime } from "react-icons/io5";

export const metadata = {
  title: "Services | King's Barber Shop",
  description: "View our full menu of barbershop services including haircuts, shaves, and beard trims in Manchester, NH.",
};

const services = [
  { id: "traditional-haircut", name: "Traditional Barber Haircut", description: "Classic barbershop haircut with precision and care", price: 34, duration: 30 },
  { id: "traditional-shave", name: "Traditional Shave", description: "Hot towel straight razor shave for a clean finish", price: 34, duration: 40 },
  { id: "beard-trim", name: "Mustache & Beard Trim", description: "Professional beard and mustache shaping", price: 16, duration: 20 },
  { id: "children-seniors", name: "Children & Seniors Haircut", description: "Quality cuts for kids and seniors", price: 28, duration: 25 },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest-dark text-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-cream/70 max-w-2xl mx-auto">
            Quality cuts and grooming services to keep you looking your best.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-cream-light border border-forest/10 p-6 hover:border-forest/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-xl text-forest">
                    {service.name}
                  </h3>
                  <span className="font-serif text-2xl text-forest">
                    {formatPrice(service.price)}
                  </span>
                </div>

                <p className="text-forest/60 mb-4">{service.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-forest/50">
                    <IoTime className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDuration(service.duration)}
                    </span>
                  </div>
                  <Link href={`/#book`} className="btn-primary text-sm px-4 py-2">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-forest-dark text-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Ready to Book?
          </h2>
          <p className="text-cream/70 mb-6">
            Select your service and choose a time that works for you.
          </p>
          <Link href="/#book" className="btn-primary">
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
