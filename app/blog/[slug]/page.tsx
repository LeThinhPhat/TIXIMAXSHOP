import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/app/data/blogData";
import ShareButtons from "./ShareButtons";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  const renderContent = (raw: string) => {
    return raw.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="content-h2">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="content-list">
            {items.map((item, j) => (
              <li key={j} className="content-li">
                <span className="content-dot" />
                <span>
                  {item.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                </span>
              </li>
            ))}
          </ul>
        );
      }
      const parts = block.split(/(\*\*.*?\*\*|`.*?`)/g);
      return (
        <p key={i} className="content-p">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**"))
              return (
                <strong key={j} className="content-strong">
                  {part.slice(2, -2)}
                </strong>
              );
            if (part.startsWith("`") && part.endsWith("`"))
              return (
                <code key={j} className="content-code">
                  {part.slice(1, -1)}
                </code>
              );
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      <style>{`
        /*
         * ─────────────────────────────────────────────
         *  DESIGN TOKENS — đồng bộ với Blog list page
         *  Font  : system-ui / sans-serif (giống Tailwind default)
         *  Accent: #f97316  (orange-500)
         *  Border: #000000  (black, 4px chính / 2px phụ)
         *  Radius: 12px card lớn / 8px card nhỏ (rounded-xl / rounded-md)
         * ─────────────────────────────────────────────
         */
        :root {
          --black:      #000000;
          --white:      #fafaf8;
          --ink:        #111827;   /* gray-900 */
          --body-text:  #374151;   /* gray-700 */
          --muted:      #4b5563;   /* gray-600 */
          --subtle:     #9ca3af;   /* gray-400 */
          --bg-page:    #fafaf8;
          --bg-warm:    #fff7ed;   /* orange-50  — đồng bộ accent cam */
          --bg-light:   #f9fafb;   /* gray-50 */
          --accent:     #f97316;   /* orange-500 */
          --accent-drk: #ea580c;   /* orange-600 */
          --border-w:   4px;
          --border-sm:  2px;
          --radius-lg:  12px;      /* rounded-xl */
          --radius-md:  8px;       /* rounded-lg */
          --radius-sm:  6px;       /* rounded-md */
        }

        body { background: var(--bg-page); }

        .page-wrap {
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
          color: var(--ink);
          background: var(--bg-page);
        }

        /* ── CATEGORY TAG ── */
        .tag {
          display: inline-block;
          background: var(--accent); color: #fff;
          font-size: 0.6875rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
        }

        /* ══ ZONE 1: HERO ══ */
        .zone-hero {
          border-bottom: var(--border-w) solid var(--black);
          background: var(--ink);
          padding: 2.5rem 2rem 2rem;
        }
        /* hàng trên: tag + date */
        .zone-hero .meta {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 1rem;
        }
        .zone-hero .date {
          font-size: 0.75rem;
          color: var(--subtle);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .07em;
        }
        /* title */
        .zone-hero h1 {
          font-size: clamp(1.25rem, 2.8vw, 1.875rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #fff;
          max-width: 720px;
          margin-bottom: 1.5rem;
        }
        /* hàng dưới title: divider + back btn */
        .hero-bottom {
          border-top: 1px solid #ffffff18;
          padding-top: 1.125rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 0.8125rem; font-weight: 600;
          color: #94a3b8;
          text-decoration: none;
          transition: color .2s;
          padding: 6px 0;
        }
        .nav-back:hover { color: var(--accent); }
        .nav-back svg { transition: transform .2s; }
        .nav-back:hover svg { transform: translateX(-3px); }
        /* read time badge */
        .hero-read {
          font-size: 0.6875rem; font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        @media (max-width: 640px) {
          .zone-hero { padding: 1.75rem 1rem 1.5rem; }
          .hero-read  { display: none; }
        }

        /* ══ ZONE 2: IMAGE ══ */
        .zone-image {
          border-bottom: var(--border-w) solid var(--black);
          position: relative; width: 100%;
          height: clamp(240px, 42vw, 500px);
          overflow: hidden;
        }

        /* ══ ZONE 3: EXCERPT — nền orange-50 đồng bộ accent ══ */
        .zone-excerpt {
          border-bottom: var(--border-w) solid var(--black);
          background: var(--bg-warm);          /* orange-50 */
          padding: 2rem;
          display: flex; align-items: flex-start; gap: 1rem;
          border-left: 6px solid var(--accent); /* accent bar bên trái */
        }
        /* Dấu ngoặc kép — dùng accent orange, sans-serif bold */
        .zone-excerpt .quote-mark {
          font-size: 4rem; line-height: .75;
          color: var(--accent);
          font-weight: 800;
          flex-shrink: 0; margin-top: -2px;
          font-family: inherit;
        }
        .zone-excerpt p {
          font-size: clamp(1rem, 2vw, 1.1875rem);
          line-height: 1.7;
          color: var(--body-text);
          font-style: italic;
          font-weight: 500;
        }

        /* ══ ZONE 4: BODY ══ */
        .zone-body {
          border-bottom: var(--border-w) solid var(--black);
          max-width: 720px; margin: 0 auto;
          padding: 3rem 2rem;
        }

        /* H2 — đồng bộ text-lg font-semibold như sub-heading Blog */
        .content-h2 {
          font-size: clamp(1.125rem, 2.2vw, 1.375rem);
          font-weight: 700;
          line-height: 1.3;
          color: var(--ink);
          margin: 2.25rem 0 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: var(--border-sm) solid var(--black);  /* 2px black — giống divider Blog */
        }
        .content-p {
          font-size: 1.0625rem; line-height: 1.85;
          color: var(--body-text); margin: 0.875rem 0;
        }
        .content-strong { color: var(--ink); font-weight: 700; }
        .content-code {
          background: #f1f5f9; border: 1px solid #cbd5e1;
          padding: 2px 7px; border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-family: 'Fira Code', 'Cascadia Code', monospace;
          color: var(--accent-drk);
        }
        .content-list {
          margin: 1rem 0; padding: 0; list-style: none;
          display: flex; flex-direction: column; gap: 10px;
        }
        .content-li {
          display: flex; gap: 12px;
          font-size: 1.0625rem; line-height: 1.7;
          color: var(--body-text);
        }
        /* Bullet dot — orange-500 đồng bộ accent */
        .content-dot {
          margin-top: 9px; width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        /* ══ ZONE 5: SHARE ══ */
        .zone-share {
          border-bottom: var(--border-w) solid var(--black);
          background: var(--bg-light);
          padding: 1.75rem 2rem;
          display: flex; flex-wrap: wrap; align-items: center; gap: 0.875rem;
        }
        .zone-share-label {
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          white-space: nowrap;
          letter-spacing: -0.01em;
          margin-right: 0.25rem;
        }
        /* wrapper bọc toàn bộ buttons — flex row, gap đồng đều */
        .share-buttons-row {
          display: flex; flex-wrap: wrap; align-items: center; gap: 0.875rem;
        }
        .share-fb {
          display: inline-flex; align-items: center; gap: 7px;
          background: #1877f2; color: #fff;
          font-size: 0.8125rem; font-weight: 700;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background .2s, transform .15s;
          border: 2px solid #1877f2;
          white-space: nowrap;
        }
        .share-fb:hover { background: #0d65d9; border-color: #0d65d9; transform: translateY(-1px); }
        .share-fb svg { flex-shrink: 0; }

        /* ══ ZONE 6: RELATED ══ */
        .zone-related { border-bottom: var(--border-w) solid var(--black); }

        /* Header zone related — đồng bộ heading style Blog */
        .zone-related-header {
          background: var(--black); color: #fff;
          border-bottom: var(--border-w) solid var(--black);
          padding: 0.875rem 2rem;
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: -0.015em;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        }
        .related-card {
          border-right: var(--border-sm) solid var(--black);
          text-decoration: none; display: block;
          transition: background .2s;
        }
        .related-card:last-child { border-right: none; }
        .related-card:hover { background: #fff7ed; }   /* orange-50 on hover */

        /* Image — border-radius rounded-xl đồng bộ top posts */
        .related-img {
          position: relative; width: 100%; height: 160px;
          border-bottom: var(--border-sm) solid var(--black);
          overflow: hidden;
        }
        .related-img img { transition: transform .3s; object-fit: cover; }
        .related-card:hover .related-img img { transform: scale(1.04); }

        .related-body { padding: 1rem 1.25rem 1.25rem; }
        .related-date {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .06em;
          margin-bottom: 6px;
        }
        .related-title {
          font-size: 0.9375rem; font-weight: 600; line-height: 1.45;
          color: var(--ink);
          display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        /* Hover title → orange-500 — đồng bộ Blog list */
        .related-card:hover .related-title { color: var(--accent); }

        /* Animations — giữ nguyên */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim   { animation: fadeUp .45s ease both; }
        .anim-1 { animation-delay: .05s; }
        .anim-2 { animation-delay: .12s; }
        .anim-3 { animation-delay: .22s; }
        .anim-4 { animation-delay: .32s; }
        .anim-5 { animation-delay: .42s; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .zone-excerpt { padding: 1.5rem 1rem; }
          .zone-body  { padding: 2rem 1rem; }
          .zone-share { padding: 1.25rem 1rem; }
          .related-grid { grid-template-columns: 1fr; }
          .related-card { border-right: none; border-bottom: var(--border-sm) solid var(--black); }
        }
      `}</style>

      <div className="page-wrap">
        {/* ══ ZONE 1: HERO ══ */}
        <section className="zone-hero anim">
          <div className="meta">
            <span className="tag">Blog</span>
            <span className="date">{post.date}</span>
          </div>
          <h1>{post.title}</h1>
          <div className="hero-bottom">
            <Link href="/" className="nav-back">
              <svg
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Quay lại trang Blog
            </Link>
            <span className="hero-read">Bài viết</span>
          </div>
        </section>

        {/* ══ ZONE 2: COVER IMAGE ══ */}
        <div className="zone-image anim anim-1">
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* ══ ZONE 3: EXCERPT ══ */}
        <section className="zone-excerpt anim anim-2">
          <p>{post.excerpt}</p>
        </section>

        {/* ══ ZONE 4: ARTICLE BODY ══ */}
        <section className="zone-body anim anim-3">
          {renderContent(post.content)}
        </section>

        {/* ══ ZONE 5: SHARE ══ */}
        <section className="zone-share anim anim-4">
          <span className="zone-share-label">Chia sẻ bài viết</span>

          <div className="share-buttons-row">
            {/* Facebook share button */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-fb"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Chia sẻ Facebook
            </a>

            <ShareButtons title={post.title} />
          </div>
        </section>

        {/* ══ ZONE 6: RELATED ══ */}
        <section className="zone-related anim anim-5">
          <div className="zone-related-header">Bài viết liên quan</div>
          <div className="related-grid">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="related-card"
              >
                <div className="related-img">
                  <Image src={item.image} alt={item.title} fill />
                </div>
                <div className="related-body">
                  <p className="related-date">{item.date}</p>
                  <h4 className="related-title">{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
