"use client";

import { useMemo, useState } from "react";
import { Filter, Globe, MapPin, Phone, Search, Star } from "lucide-react";
import { Panel, Pill, ProductShell } from "../../components/product-shell";

const providers = [
  { id: 1, name: "BaptistCare", type: "Home Care", location: "Sydney NSW", distance: 2.3, rating: 4.5, reviews: 127, specialties: ["Dementia Care", "Mobility Support", "Nursing"], phone: "(02) 9000 0000", website: "baptistcare.org.au", availability: "Available now", description: "Large aged care provider with home care, respite and residential pathways." },
  { id: 2, name: "HammondCare", type: "Residential Care", location: "Sydney NSW", distance: 5.1, rating: 4.3, reviews: 89, specialties: ["Memory Care", "Palliative Care", "Respite"], phone: "(02) 9111 1111", website: "hammondcare.com.au", availability: "Waiting list", description: "Specialist care provider with strong dementia and residential care capability." },
  { id: 3, name: "Uniting Care", type: "Home Care", location: "Sydney NSW", distance: 3.8, rating: 4.2, reviews: 156, specialties: ["Home Support", "Nursing", "Respite"], phone: "(02) 9222 2222", website: "uniting.org", availability: "Available now", description: "Community-focused home care and aged care provider with broad local footprint." },
  { id: 4, name: "Regis Aged Care", type: "Residential Care", location: "Sydney NSW", distance: 7.2, rating: 4.1, reviews: 112, specialties: ["Residential Care", "Dementia", "Rehabilitation"], phone: "(02) 9333 3333", website: "regisagedcare.com.au", availability: "Waiting list", description: "Residential aged care provider with modern facilities and permanent care options." },
];

const filters = [
  { id: "all", label: "All" },
  { id: "home", label: "Home Care" },
  { id: "residential", label: "Residential" },
  { id: "dementia", label: "Dementia" },
  { id: "nearby", label: "Within 5km" },
];

export default function ProvidersPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(1);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const search = `${provider.name} ${provider.type} ${provider.specialties.join(" ")}`.toLowerCase();
      const matchesSearch = search.includes(query.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "home" && provider.type === "Home Care") ||
        (filter === "residential" && provider.type === "Residential Care") ||
        (filter === "dementia" && provider.specialties.some((specialty) => specialty.toLowerCase().includes("dementia") || specialty.toLowerCase().includes("memory"))) ||
        (filter === "nearby" && provider.distance <= 5);
      return matchesSearch && matchesFilter;
    });
  }, [query, filter]);

  const selectedProvider = providers.find((provider) => provider.id === selected) ?? providers[0];

  return (
    <ProductShell eyebrow="Provider search" title="Search and compare aged care providers." description="Use care-path filters to compare provider fit, proximity, availability and service capability before creating a shortlist.">
      <Panel>
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#61736a]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by provider, service or specialty..." className="w-full rounded-2xl border border-[#dfd3c1] bg-white px-12 py-4 outline-none focus:border-[#173f35]" />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-[#61736a]" />
            {filters.map((item) => (
              <button key={item.id} onClick={() => setFilter(item.id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === item.id ? "bg-[#173f35] text-white" : "bg-[#f7f1e8] text-[#52645c] hover:bg-white"}`}>{item.label}</button>
            ))}
          </div>
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4">
          {filteredProviders.map((provider) => (
            <button key={provider.id} onClick={() => setSelected(provider.id)} className={`premium-card rounded-[2rem] p-6 text-left transition hover:-translate-y-1 ${selected === provider.id ? "ring-2 ring-[#173f35]" : ""}`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <Pill>{provider.type}</Pill>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{provider.name}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#61736a]"><MapPin className="h-4 w-4" /> {provider.location} · {provider.distance} km away</p>
                  <p className="mt-4 leading-7 text-[#5d6d65]">{provider.description}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="flex items-center gap-1 font-semibold text-[#bc7c51] md:justify-end"><Star className="h-4 w-4 fill-current" /> {provider.rating}</p>
                  <p className="text-sm text-[#61736a]">{provider.reviews} reviews</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">{provider.specialties.map((specialty) => <Pill key={specialty}>{specialty}</Pill>)}</div>
            </button>
          ))}
        </div>

        <Panel className="h-fit lg:sticky lg:top-6">
          <Pill>{selectedProvider.availability}</Pill>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">{selectedProvider.name}</h2>
          <p className="mt-4 leading-7 text-[#5d6d65]">{selectedProvider.description}</p>
          <div className="mt-6 grid gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-[#f7f1e8] p-4"><Phone className="h-5 w-5 text-[#173f35]" /> {selectedProvider.phone}</div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#f7f1e8] p-4"><Globe className="h-5 w-5 text-[#173f35]" /> {selectedProvider.website}</div>
          </div>
          <a href="/shortlist" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#173f35] px-6 py-4 font-semibold text-white shadow-xl shadow-emerald-950/15">Add to shortlist</a>
        </Panel>
      </div>
    </ProductShell>
  );
}
