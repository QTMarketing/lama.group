import Image from "next/image";
import Link from "next/link";
import CategoryTag from "@/components/CategoryTag";
import type { MappedPost } from "@/lib/wp";

export default function FeaturedPostCard({ post }: { post: MappedPost }) {
  return (
    <article>
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-200">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <CategoryTag name={post.category} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4 hover:text-indigo-600 transition">{post.title}</h2>
        {post.excerpt && (
          <p className="text-gray-600 mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        )}
        <div className="mt-4 flex items-center gap-2 text-[13px] text-slate-600">
          <span>By {post.authorName}</span>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </Link>
    </article>
  );
}


