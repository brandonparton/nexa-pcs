"use client";
import { useState, useMemo } from "react";
import Image from "next/image";

// Define categories
const categories = [
  { id: "chipset", name: "Chipset" },
  { id: "case", name: "Case" },
  { id: "cpu", name: "CPU" },
  { id: "motherboard", name: "Motherboard" },
  { id: "gpu", name: "GPU" },
  { id: "ram", name: "RAM" },
  { id: "storage", name: "Storage" },
  { id: "cooling", name: "Cooling" },
  { id: "power-supply", name: "Power Supply" },
  { id: "software", name: "Software" },
];

// Example part type
type Part = {
  id: number;
  category: string; // Must match one of the category IDs above
  name: string;
  price: number;
  image: string;
  brand?: "Intel" | "AMD" | "N/A"; // Optional, for chipset/CPU filtering
};

// Sample parts data
const partsData: Part[] = [
  // Chipset
  {
    id: 1,
    category: "chipset",
    name: "Intel",
    price: 0,
    image: "/images/chipset/intel.jpg",
    brand: "Intel",
  },
  {
    id: 2,
    category: "chipset",
    name: "AMD",
    price: 0,
    image: "/images/chipset/amd.jpg",
    brand: "AMD",
  },
  // Case
  {
    id: 3,
    category: "case",
    name: "Fractal Design North",
    price: 155,
    image: "/images/case/fractaldesign-north.jpg",
    brand: "N/A",
  },
  {
    id: 4,
    category: "case",
    name: "CORSAIR 4000D",
    price: 125,
    image: "/images/case/corsair-4000d.jpg",
    brand: "N/A",
  },
  {
    id: 5,
    category: "case",
    name: "Lian Li O11 Dynamic",
    price: 190,
    image: "/images/case/lianli-o11d.jpg",
    brand: "N/A",
  },
  // Intel CPUs
  {
    id: 21,
    category: "cpu",
    name: "Intel Core i3-12100F",
    price: 149,
    image: "/images/cpu/intel-i3.jpg",
    brand: "Intel",
  },
  {
    id: 22,
    category: "cpu",
    name: "Intel Core i5-12400F",
    price: 199,
    image: "/images/cpu/intel-i5.jpg",
    brand: "Intel",
  },
  {
    id: 23,
    category: "cpu",
    name: "Intel Core i5-12600K",
    price: 279,
    image: "/images/cpu/intel-i5.jpg",
    brand: "Intel",
  },
  {
    id: 24,
    category: "cpu",
    name: "Intel Core i7-12700K",
    price: 349,
    image: "/images/cpu/intel-i7.jpg",
    brand: "Intel",
  },
  {
    id: 25,
    category: "cpu",
    name: "Intel Core i7-13700K",
    price: 399,
    image: "/images/cpu/intel-i7.jpg",
    brand: "Intel",
  },
  {
    id: 26,
    category: "cpu",
    name: "Intel Core i9-13900K",
    price: 499,
    image: "/images/cpu/intel-i9.jpg",
    brand: "Intel",
  },
  // AMD CPUs
  {
    id: 29,
    category: "cpu",
    name: "AMD Ryzen 7 9800X3D",
    price: 480,
    image: "/images/cpu/amd-ryzen7.jpg",
    brand: "AMD",
  },
  {
    id: 30,
    category: "cpu",
    name: "AMD Ryzen 7 7800X3D",
    price: 410,
    image: "/images/cpu/amd-ryzen7.jpg",
    brand: "AMD",
  },
  {
    id: 31,
    category: "cpu",
    name: "AMD Ryzen 7 7700X",
    price: 320,
    image: "/images/cpu/amd-ryzen7.jpg",
    brand: "AMD",
  },
  {
    id: 32,
    category: "cpu",
    name: "AMD Ryzen 5 7600X",
    price: 215,
    image: "/images/cpu/amd-ryzen5.jpg",
    brand: "AMD",
  },
  // Other categories (Motherboard, GPU, RAM, Storage, Cooling, Software) can remain unchanged...
];

export default function BuildPage() {
  // State for selected parts per category
  const [selectedParts, setSelectedParts] = useState<Record<string, Part | null>>({});
  // State for active tab in the right column
  const [activeTab, setActiveTab] = useState<"Base" | "Add-ons" | "Summary">("Base");
  // State for currently active category (set from the middle column)
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Base price for the build
  const baseSystemPrice = 100;
  // Calculate total price
  const totalPrice = useMemo(() => {
    const partsCost = Object.values(selectedParts).reduce((sum, part) => sum + (part?.price || 0), 0);
    return baseSystemPrice + partsCost;
  }, [selectedParts]);

  // Handler for selecting a part in the right column
  const selectPart = (categoryId: string, part: Part) => {
    setSelectedParts((prev) => ({
      ...prev,
      [categoryId]: part,
    }));
  };

  // Filter parts for the active category
  // For CPU, show only those matching the selected chipset's brand
  const partsForActiveCategory = activeCategory === "cpu"
    ? (selectedParts["chipset"]
          ? partsData.filter((p) => p.category === "cpu" && p.brand === selectedParts["chipset"]?.brand)
          : [])
    : partsData.filter((p) => p.category === activeCategory);

  // Determine build name and case image from selected case, or default values if not selected
  const selectedCase = selectedParts["case"];
  const buildName = selectedCase ? selectedCase.name : "H5 Elite Build";
  const caseImage = selectedCase ? selectedCase.image : "/images/case/h5-elite.jpg";

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* LEFT COLUMN: Build Title and Case Image */}
      <div className="w-1/3 border-r border-gray-300 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">{buildName}</h1>
        <div className="relative w-full h-[600px] bg-white rounded shadow">
          <Image src={caseImage} alt={buildName} fill className="object-contain" />
        </div>
      </div>
      {/* MIDDLE COLUMN: Category Boxes in 2 Columns */}
      <div className="w-1/3 border-r border-gray-300 p-8 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => {
            const selectedPart = selectedParts[cat.id];
            return (
              <div
                key={cat.id}
                className="bg-white rounded shadow p-4 cursor-pointer hover:bg-gray-50 transition text-center"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveTab("Base");
                }}
              >
                <p className="font-semibold">{cat.name}</p>
                {selectedPart ? (
                  <p className="text-sm text-gray-500">
                    {selectedPart.name} (+${selectedPart.price})
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">Not selected</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* RIGHT COLUMN: Part Selection Area with Tabs */}
      <div className="w-1/3 p-8 flex flex-col">
        {/* Tab Bar */}
        <div className="flex space-x-4 mb-4">
          {(["Base", "Add-ons", "Summary"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-300"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Scrollable Content Area */}
        <div className="flex-1 bg-white rounded shadow p-4 overflow-y-auto">
          {activeTab === "Summary" ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Build Summary</h2>
              <ul className="space-y-2">
                {categories.map((cat) => {
                  const part = selectedParts[cat.id];
                  return (
                    <li key={cat.id} className="flex justify-between">
                      <span className="font-semibold">{cat.name}:</span>
                      <span>
                        {part ? (
                          <>
                            {part.name} (+${part.price})
                          </>
                        ) : (
                          <em className="text-gray-400">Not selected</em>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            activeCategory && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  {categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                {partsForActiveCategory.length === 0 ? (
                  activeCategory === "cpu" ? (
                    <p className="text-gray-500">Please select a chipset first.</p>
                  ) : (
                    <p className="text-gray-500">No parts available for this category.</p>
                  )
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {partsForActiveCategory.map((part) => (
                      <div
                        key={part.id}
                        onClick={() => selectPart(activeCategory, part)}
                        className={`border rounded p-2 cursor-pointer hover:shadow transition ${
                          selectedParts[part.category]?.id === part.id ? "border-blue-500" : "border-gray-200"
                        }`}
                      >
                        <div className="relative w-full h-24">
                          <Image src={part.image} alt={part.name} fill className="object-contain" />
                        </div>
                        <p className="mt-2 text-sm font-medium">{part.name}</p>
                        {part.price > 0 && (
                          <p className="text-xs text-green-600">+ ${part.price}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
        {/* Footer: Total Price and Next Button */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Base Price: ${baseSystemPrice}</p>
              <p className="text-lg font-bold">
                Total: <span className="text-blue-600">${totalPrice}</span>
              </p>
            </div>
            <button
              onClick={() => alert(`Proceeding to next step with total: $${totalPrice}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}