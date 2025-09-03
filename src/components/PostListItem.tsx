import Image from "next/image";
import Link from "next/link";
import type { MappedPost } from "@/lib/wp";

export default function PostListItem({ post }: { post: MappedPost }) {
  return (
    <div className="flex gap-4 items-start py-3 border-b last:border-b-0">
      <Link href={`/posts/${post.slug}`} className="shrink-0">
        <div className="relative w-20 h-20 rounded overflow-hidden bg-slate-200">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
        </div>
      </Link>
      <div className="min-w-0">
        <Link href={`/posts/${post.slug}`} className="text-sm font-medium hover:text-indigo-600 line-clamp-2">
          {post.title}
        </Link>
      </div>
    </div>
  );
}


