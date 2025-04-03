import Image from "next/image";

type PCBuild = {
  id: number;
  name: string;
  image: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  price: string;
};

const systems: PCBuild[] = [
  {
    id: 1,
    name: "Nexa Starter",
    image: "/images/systems/starter.jpg",
    cpu: "Intel Core i5-12400F",
    gpu: "NVIDIA GTX 1660 Super",
    ram: "16GB DDR4",
    storage: "512GB NVMe SSD",
    price: "$799",
  },
  {
    id: 2,
    name: "Nexa Pro",
    image: "/images/systems/pro.jpg",
    cpu: "AMD Ryzen 5 7600",
    gpu: "NVIDIA RTX 3060 Ti",
    ram: "32GB DDR5",
    storage: "1TB NVMe SSD",
    price: "$1199",
  },
  {
    id: 3,
    name: "Nexa Ultra",
    image: "/images/systems/ultra.jpg",
    cpu: "Intel Core i9-13900K",
    gpu: "NVIDIA RTX 4080",
    ram: "64GB DDR5",
    storage: "2TB NVMe SSD + 4TB HDD",
    price: "$2499",
  },
];

const preownedSystems: PCBuild[] = [
  {
    id: 101,
    name: "Preowned Nexa Starter",
    image: "/images/preowned/starter.jpg",
    cpu: "Intel Core i5-12400F",
    gpu: "NVIDIA GTX 1660",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    price: "$599",
  },
  {
    id: 102,
    name: "Preowned Nexa Pro",
    image: "/images/preowned/pro.jpg",
    cpu: "AMD Ryzen 5 7600",
    gpu: "NVIDIA RTX 3060",
    ram: "32GB DDR5",
    storage: "1TB SSD",
    price: "$899",
  },
  {
    id: 103,
    name: "Preowned Nexa Ultra",
    image: "/images/preowned/ultra.jpg",
    cpu: "Intel Core i9-13900K",
    gpu: "NVIDIA RTX 4080",
    ram: "64GB DDR5",
    storage: "2TB SSD + 4TB HDD",
    price: "$1899",
  },
];

export default function StorePage() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* Prebuilt Systems Section */}
      <h1 className="text-4xl font-bold mb-10 text-center text-green-700">
        Prebuilt Systems
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {systems.map((pc) => (
          <div
            key={pc.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <Image
              src={pc.image}
              alt={pc.name}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold mb-2">{pc.name}</h2>
              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li><strong>CPU:</strong> {pc.cpu}</li>
                <li><strong>GPU:</strong> {pc.gpu}</li>
                <li><strong>RAM:</strong> {pc.ram}</li>
                <li><strong>Storage:</strong> {pc.storage}</li>
              </ul>
              <div className="text-xl font-bold text-green-600 mb-4">{pc.price}</div>
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preowned Systems Section */}
      <h1 className="text-4xl font-bold mb-10 text-center text-green-700">
        Preowned Systems
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {preownedSystems.map((pc) => (
          <div
            key={pc.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <Image
              src={pc.image}
              alt={pc.name}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold mb-2">{pc.name}</h2>
              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li><strong>CPU:</strong> {pc.cpu}</li>
                <li><strong>GPU:</strong> {pc.gpu}</li>
                <li><strong>RAM:</strong> {pc.ram}</li>
                <li><strong>Storage:</strong> {pc.storage}</li>
              </ul>
              <div className="text-xl font-bold text-green-600 mb-4">{pc.price}</div>
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}