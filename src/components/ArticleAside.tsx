"use client";

import Image from "next/image";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type Author = {
  name?: string;
  description?: string;
  avatar?: { url?: string };
};

type Contributor = {
  name: string;
  title?: string;
  avatarUrl?: string;
};

type Props = {
  toc: TocItem[];
  author?: Author;
  contributors?: Contributor[];
};

export default function ArticleAside({ toc, author, contributors }: Props) {
  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      {toc.length > 0 && (
        <div className="sticky top-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Table of Contents</h3>
          <nav className="space-y-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block text-sm text-slate-600 hover:text-slate-900 transition-colors ${
                  item.level === 3 ? "ml-4" : ""
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Author */}
      {author && (
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">About the Author</h3>
          <div className="flex items-start gap-3">
            {author.avatar?.url && (
              <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
                <Image
                  src={author.avatar.url}
                  alt={author.name || "Author"}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h4 className="font-medium text-slate-900">{author.name}</h4>
              {author.description && (
                <p className="text-sm text-slate-600 mt-1">{author.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contributors */}
      {contributors && contributors.length > 0 && (
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Contributors</h3>
          <div className="space-y-3">
            {contributors.map((contributor, index) => (
              <div key={index} className="flex items-start gap-3">
                {contributor.avatarUrl && (
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    <Image
                      src={contributor.avatarUrl}
                      alt={contributor.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-slate-900">{contributor.name}</h4>
                  {contributor.title && (
                    <p className="text-sm text-slate-600">{contributor.title}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subscribe CTA */}
      <div className="border-t border-slate-200 pt-6">
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">Stay Updated</h3>
          <p className="text-sm text-slate-600 mb-3">
            Get the latest insights and updates from LaMa Group.
          </p>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </div>
  );
}
