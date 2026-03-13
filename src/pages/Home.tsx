import Header from "@/components/Header";
import TriggerCard from "@/components/TriggerCard";
import FeedTabs from "@/components/FeedTabs";
import ServiceCard from "@/components/ServiceCard";
import { useApp } from "@/context/AppContext";
import { mockPosts } from "@/data/mockData";

export default function Home() {
  const { activeFeed } = useApp();

  const filteredPosts = mockPosts.filter((p) =>
    activeFeed === "pedidos" ? p.type === "pedido" : p.type === "profissional"
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <TriggerCard />
        <FeedTabs />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredPosts.map((post, i) => (
            <ServiceCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
