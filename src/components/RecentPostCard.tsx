import Image from "next/image";
import Link from "next/link";
import type { MappedPost } from "@/lib/wp";

export default function RecentPostCard({ post }: { post: MappedPost }) {
  return (
    <article className="rounded-lg overflow-hidden border hover:shadow-md transition">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] bg-slate-200">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <span>By {post.authorName}</span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </Link>
    </article>
  );
}


