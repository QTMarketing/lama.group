import Image from "next/image";
import Link from "next/link";

export default function BlogHero({ post }: { post: any }) {
  const img = post?.featuredImage?.node?.sourceUrl;
  const cat = post?.categories?.nodes?.[0]?.name;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block rounded-[18px] overflow-hidden bg-slate-200 relative"
      style={{ aspectRatio: "16/9" }}
    >
      {img && <Image src={img} alt={post?.featuredImage?.node?.altText || post.title} fill className="object-cover" priority />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute left-5 right-5 bottom-5 text-white">
        {cat && (
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            {cat}
          </span>
        )}
        <h2 className="mt-2 text-[24px] md:text-[28px] leading-tight font-extrabold">
          {post.title}
        </h2>
      </div>
    </Link>
  );
}


