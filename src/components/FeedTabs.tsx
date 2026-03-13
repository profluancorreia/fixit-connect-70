import { useApp } from "@/context/AppContext";
import { FeedTab } from "@/types";

export default function FeedTabs() {
  const { activeFeed, setActiveFeed } = useApp();

  const tabs: { key: FeedTab; label: string }[] = [
    { key: "pedidos", label: "Pedidos de Ajuda" },
    { key: "profissionais", label: "Profissionais" },
  ];

  return (
    <div className="flex gap-6 border-b border-border mt-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveFeed(tab.key)}
          className={`pb-3 text-sm font-semibold transition-colors ${
            activeFeed === tab.key
              ? "border-b-2 border-primary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
