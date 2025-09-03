import Image from "next/image";
import Link from "next/link";
import { readingTimeFromHtml } from "@/lib/blog";

export default function PostCard({ post }: { post: any }) {
  const img = post?.featuredImage?.node?.sourceUrl;
  const author = post?.author?.node?.name;
  const avatar = post?.author?.node?.avatar?.url;
  const rt = readingTimeFromHtml(post?.content);

  return (
    <Link href={`/blog/${post.slug}`} className="block rounded-[18px] border border-slate-200 overflow-hidden bg-white hover:shadow-md transition">
      <div className="relative bg-slate-200" style={{ aspectRatio: "16/9" }}>
        {img && <Image src={img} alt={post?.featuredImage?.node?.altText || post.title} fill className="object-cover" />}
      </div>
      <div className="p-4">
        <h3 className="text-[18px] leading-[26px] font-semibold text-slate-900 line-clamp-2">
          {post.title}
        </h3>
        <div
          className="mt-2 text-[14px] leading-[22px] text-slate-600 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post?.excerpt || "" }}
          suppressHydrationWarning
        />
        <div className="mt-4 flex items-center gap-2 text-[13px] text-slate-600">
          <div className="h-6 w-6 rounded-full overflow-hidden bg-slate-200">
            {avatar && <Image src={avatar} alt={author || ""} width={24} height={24} />}
          </div>
          <span className="truncate">{author || "—"}</span>
          <span>•</span>
          <span>{rt}</span>
        </div>
      </div>
    </Link>
  );
}


