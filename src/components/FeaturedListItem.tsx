import Image from "next/image";
import Link from "next/link";

export default function FeaturedListItem({ post }: { post: any }) {
  const img = post?.featuredImage?.node?.sourceUrl;
  return (
    <Link href={`/blog/${post.slug}`} className="flex items-center gap-3 rounded-[10px] hover:bg-slate-50 p-2">
      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-slate-200 shrink-0">
        {img && <Image src={img} alt={post?.featuredImage?.node?.altText || post.title} fill className="object-cover" />}
      </div>
      <span className="text-sm text-slate-800 line-clamp-2">{post.title}</span>
    </Link>
  );
}


