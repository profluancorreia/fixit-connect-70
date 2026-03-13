import { motion } from "framer-motion";
import { Post } from "@/types";
import { useApp } from "@/context/AppContext";
import { MapPin, MessageSquare } from "lucide-react";

interface ServiceCardProps {
  post: Post;
  index: number;
}

export default function ServiceCard({ post, index }: ServiceCardProps) {
  const { activeFeed, setSelectedPost, setOpenModal } = useApp();

  const handleClick = () => {
    setSelectedPost(post);
    setOpenModal("serviceDetail");
  };

  const badgeLabel = activeFeed === "pedidos" ? "URGENTE" : "PATROCINADO";
  const badgeClass =
    activeFeed === "pedidos"
      ? "bg-destructive text-destructive-foreground"
      : "bg-amber-400 text-card";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      onClick={handleClick}
      className="bg-card rounded-xl shadow-sm hover:shadow-card transition-shadow duration-150 cursor-pointer overflow-hidden"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover border-b border-border"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full object-cover border border-border"
          />
          <span className="text-sm font-medium text-foreground">{post.author.name}</span>
          <span className="text-xs text-muted-foreground ml-auto">{post.createdAt}</span>
        </div>
        {post.isSponsored && (
          <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${badgeClass}`}>
            {badgeLabel}
          </span>
        )}
        <h3 className="font-display font-bold text-foreground mb-1 line-clamp-1">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{post.description}</p>
      </div>
      <div className="px-4 py-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {post.location}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <MessageSquare className="w-3 h-3" /> {post.commentsCount}
        </span>
      </div>
    </motion.div>
  );
}
