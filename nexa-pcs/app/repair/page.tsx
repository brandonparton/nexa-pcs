"use client";
import { useState } from "react";

type RepairService = {
  id: number;
  name: string;
  description: string;
  price: string;
};

const repairServices: RepairService[] = [
  {
    id: 1,
    name: "Virus Removal",
    description: "Comprehensive removal of malware, viruses, and spyware.",
    price: "$99",
  },
  {
    id: 2,
    name: "OS Reinstallation",
    description: "Reinstall operating system and restore system settings.",
    price: "$149",
  },
  {
    id: 3,
    name: "Hardware Diagnostics",
    description: "In-depth diagnostics to identify hardware issues.",
    price: "$79",
  },
  {
    id: 4,
    name: "Data Recovery",
    description: "Recover lost or corrupted data from your drives.",
    price: "$199",
  },
  {
    id: 5,
    name: "Custom Build Consultation",
    description: "Expert advice for custom PC builds and upgrades.",
    price: "$49",
  },
];

type BookingModalProps = {
  service: RepairService;
  onClose: () => void;
};

function BookingModal({ service, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, we'll just log the booking details.
    console.log("Booking request for", service.name, {
      name,
      email,
      phone,
      date,
    });
    alert(`Booking request for ${service.name} submitted!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Book: {service.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-3xl leading-none"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Preferred Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RepairPage() {
  const [selectedService, setSelectedService] = useState<RepairService | null>(null);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-red-700">
        Repair Services
      </h1>
      <div className="space-y-6">
        {repairServices.map((service) => (
          <div
            key={service.id}
            className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800">
                {service.name}
              </h2>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
              <div className="text-xl font-bold text-red-600 mb-2">
                {service.price}
              </div>
              <button
                onClick={() => setSelectedService(service)}
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </main>
  );
}