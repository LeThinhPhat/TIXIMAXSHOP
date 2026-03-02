import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/app/data/blogData";
import ShareButtons from "./ShareButtons";
import type { Metadata } from "next";

/* ─────────────────────────────────────────────────────────
   ENV — đặt trong .env.local:
     NEXT_PUBLIC_SITE_URL  = https://yourdomain.com
     NEXT_PUBLIC_SITE_NAME = Tên trang web
───────────────────────────────────────────────────────── */
type Props = { params: Promise<{ slug: string }> };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Blog";

/* ═══════════════════════════════════════════════════════
   generateMetadata — Next.js App Router
   Tự động inject <title>, <meta>, Open Graph, Twitter Card
════════════════════════════════════════════════════════ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${slug}`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${SITE_URL}${post.image}`;
  const titleSEO = `${post.title} | ${SITE_NAME}`;
  const description = (post.excerpt ?? "").slice(0, 160);

  return {
    /* ── Cơ bản ── */
    title: titleSEO,
    description,
    keywords: post.tags ?? [],
    authors: [{ name: post.author ?? SITE_NAME, url: SITE_URL }],
    creator: post.author ?? SITE_NAME,
    publisher: SITE_NAME,

    /* ── Canonical URL (tránh duplicate content) ── */
    alternates: { canonical: url },

    /* ── Open Graph: Facebook, Zalo, LinkedIn ── */
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      siteName: SITE_NAME,
      locale: "vi_VN",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.isoDate,
      modifiedTime: post.isoDate,
      authors: [post.author ?? SITE_NAME],
      tags: post.tags ?? [],
    },

    /* ── Twitter Card — summary_large_image để ảnh to hơn ── */
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
      creator: post.twitterHandle ?? `@${SITE_NAME}`,
    },

    /* ── Robots — khai báo tường minh ── */
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* ═══════════════════════════════════════════════════════
   JSON-LD Structured Data
   Article + BreadcrumbList → Google Rich Results
════════════════════════════════════════════════════════ */
function ArticleJsonLd({
  post,
  url,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
  url: string;
}) {
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${SITE_URL}${post.image}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: (post.excerpt ?? "").slice(0, 160),
        image: [imageUrl],
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        inLanguage: "vi",
        keywords: (post.tags ?? []).join(", "),
        author: {
          "@type": "Person",
          name: post.author ?? SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang chủ",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   renderContent — markdown-lite → JSX semantic
════════════════════════════════════════════════════════ */
function renderContent(raw: string) {
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
              <span className="content-dot" aria-hidden="true" />
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
}

/* ═══════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════ */
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const pageUrl = `${SITE_URL}/blog/${slug}`;

  return (
    <>
      {/* JSON-LD — đặt trước <body> content */}
      <ArticleJsonLd post={post} url={pageUrl} />

      <style>{`
        :root {
          --black:      #000000;
          --white:      #fafaf8;
          --ink:        #111827;
          --body-text:  #374151;
          --muted:      #4b5563;
          --subtle:     #9ca3af;
          --bg-page:    #fafaf8;
          --bg-warm:    #fff7ed;
          --bg-light:   #f9fafb;
          --accent:     #f97316;
          --accent-drk: #ea580c;
          --border-w:   4px;
          --border-sm:  2px;
          --radius-lg:  12px;
          --radius-md:  8px;
          --radius-sm:  6px;
        }

        body { background: var(--bg-page); }

        .page-wrap {
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
          color: var(--ink); background: var(--bg-page);
        }

        /* ── BREADCRUMB ── */
        .breadcrumb {
          padding: 0.625rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: var(--white);
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8125rem; color: var(--muted);
          flex-wrap: wrap;
        }
        .breadcrumb a { color: var(--muted); text-decoration: none; transition: color .15s; }
        .breadcrumb a:hover { color: var(--accent); text-decoration: underline; }
        .breadcrumb .sep { color: #d1d5db; }
        .breadcrumb .bc-current { color: var(--ink); font-weight: 500;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px; }

        /* ── TAG ── */
        .tag {
          display: inline-block; background: var(--accent); color: #fff;
          font-size: 0.6875rem; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; padding: 4px 10px;
          border-radius: var(--radius-sm); text-decoration: none;
        }
        .tag:hover { background: var(--accent-drk); }

        /* ══ HERO ══ */
        .zone-hero {
          border-bottom: var(--border-w) solid var(--black);
          background: var(--ink); padding: 2.5rem 2rem 2rem;
        }
        .zone-hero .meta {
          display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;
        }
        .zone-hero .date {
          font-size: 0.75rem; color: var(--subtle); font-weight: 500;
          text-transform: uppercase; letter-spacing: .07em;
        }
        .zone-hero h1 {
          font-size: clamp(1.25rem, 2.8vw, 1.875rem); font-weight: 700;
          line-height: 1.25; letter-spacing: -0.02em; color: #fff;
          max-width: 720px; margin-bottom: 1.5rem;
        }
        .hero-bottom {
          border-top: 1px solid #ffffff18; padding-top: 1.125rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 0.8125rem; font-weight: 600; color: #94a3b8;
          text-decoration: none; transition: color .2s; padding: 6px 0;
        }
        .nav-back:hover { color: var(--accent); }
        .nav-back svg { transition: transform .2s; }
        .nav-back:hover svg { transform: translateX(-3px); }
        .hero-read {
          font-size: 0.6875rem; font-weight: 600; color: #64748b;
          text-transform: uppercase; letter-spacing: .08em;
        }

        /* ══ IMAGE ══ */
        .zone-image {
          border-bottom: var(--border-w) solid var(--black);
          position: relative; width: 100%;
          height: clamp(240px, 42vw, 500px); overflow: hidden;
        }

        /* ══ EXCERPT ══ */
        .zone-excerpt {
          border-bottom: var(--border-w) solid var(--black);
          background: var(--bg-warm); padding: 2rem;
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; text-align: center; flex-direction: column;
          border-left: 6px solid var(--accent);
        }
        .zone-excerpt .quote-mark {
          font-size: 4rem; line-height: .75;
          color: var(--accent); font-weight: 800;
        }
        .zone-excerpt p {
          font-size: clamp(1rem, 2vw, 1.1875rem); line-height: 1.7;
          color: var(--body-text); font-style: italic;
          font-weight: 500; max-width: 680px;
        }

        /* ══ BODY ══ */
        .zone-body {
          border-bottom: var(--border-w) solid var(--black);
          max-width: 720px; margin: 0 auto; padding: 3rem 2rem;
        }
        .content-h2 {
          font-size: clamp(1.125rem, 2.2vw, 1.375rem); font-weight: 700;
          line-height: 1.3; color: var(--ink); margin: 2.25rem 0 0.75rem;
          padding-bottom: 0.5rem; border-bottom: var(--border-sm) solid var(--black);
        }
        .content-p { font-size: 1.0625rem; line-height: 1.85; color: var(--body-text); margin: 0.875rem 0; }
        .content-strong { color: var(--ink); font-weight: 700; }
        .content-code {
          background: #f1f5f9; border: 1px solid #cbd5e1;
          padding: 2px 7px; border-radius: var(--radius-sm);
          font-size: 0.875rem; font-family: 'Fira Code', 'Cascadia Code', monospace;
          color: var(--accent-drk);
        }
        .content-list { margin: 1rem 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .content-li   { display: flex; gap: 12px; font-size: 1.0625rem; line-height: 1.7; color: var(--body-text); }
        .content-dot  { margin-top: 9px; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

        /* ══ SHARE ══ */
        .zone-share {
          border-bottom: var(--border-w) solid var(--black);
          background: var(--bg-light); padding: 1.75rem 2rem;
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: center; gap: 0.875rem;
        }
        .zone-share-label {
          font-size: 1rem; font-weight: 700; color: var(--ink);
          white-space: nowrap; letter-spacing: -0.01em; margin-right: 0.25rem;
        }
        .share-buttons-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.875rem; }

        /* ══ RELATED ══ */
        .zone-related { border-bottom: var(--border-w) solid var(--black); }
        .zone-related-header {
          background: var(--black); color: #fff;
          border-bottom: var(--border-w) solid var(--black);
          padding: 0.875rem 2rem; font-size: 1.125rem;
          font-weight: 700; letter-spacing: -0.015em;
        }
        .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
        .related-card {
          border-right: var(--border-sm) solid var(--black);
          text-decoration: none; display: block; transition: background .2s;
        }
        .related-card:last-child { border-right: none; }
        .related-card:hover { background: #fff7ed; }
        .related-img {
          position: relative; width: 100%; height: 160px;
          border-bottom: var(--border-sm) solid var(--black); overflow: hidden;
        }
        .related-img img { transition: transform .3s; object-fit: cover; }
        .related-card:hover .related-img img { transform: scale(1.04); }
        .related-body { padding: 1rem 1.25rem 1.25rem; }
        .related-date {
          display: block; font-size: 0.75rem; color: var(--muted);
          font-weight: 500; text-transform: uppercase;
          letter-spacing: .06em; margin-bottom: 6px;
        }
        .related-title {
          font-size: 0.9375rem; font-weight: 600; line-height: 1.45; color: var(--ink);
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .related-card:hover .related-title { color: var(--accent); }

        /* Animations */
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

        /* Responsive */
        @media (max-width: 640px) {
          .zone-hero    { padding: 1.75rem 1rem 1.5rem; }
          .hero-read    { display: none; }
          .zone-excerpt { padding: 1.5rem 1rem; }
          .zone-body    { padding: 2rem 1rem; }
          .zone-share   { padding: 1.25rem 1rem; }
          .related-grid { grid-template-columns: 1fr; }
          .related-card { border-right: none; border-bottom: var(--border-sm) solid var(--black); }
          .breadcrumb   { padding: 0.5rem 1rem; }
        }
      `}</style>

      <div className="page-wrap">
        {/* ══ BREADCRUMB — Google hiển thị trên SERP ══ */}
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Trang chủ</Link>
          <span className="sep" aria-hidden="true">
            ›
          </span>
          <Link href="/blog">Blog</Link>
          <span className="sep" aria-hidden="true">
            ›
          </span>
          <span className="bc-current" aria-current="page">
            {post.title}
          </span>
        </nav>

        {/* ══ HERO — <header> semantic ══ */}
        <header className="zone-hero anim">
          <div className="meta">
            {/* rel="tag" giúp Google nhận diện category */}
            <Link href="/blog" className="tag" rel="tag">
              Blog
            </Link>
            {/* <time dateTime> — Google dùng để hiển thị ngày trên SERP */}
            <time className="date" dateTime={post.isoDate}>
              {post.date}
            </time>
          </div>
          {/* Chỉ duy nhất 1 thẻ <h1> trên toàn trang */}
          <h1>{post.title}</h1>
          <div className="hero-bottom">
            <Link href="/blog" className="nav-back">
              <svg
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
        </header>

        {/* ══ COVER IMAGE — priority để tối ưu LCP ══ */}
        <div className="zone-image anim anim-1">
          <Image
            src={post.image}
            alt={post.title} /* alt = title đầy đủ */
            fill
            style={{ objectFit: "cover" }}
            priority /* LCP image — tải trước */
            sizes="100vw" /* giúp browser chọn đúng src-set */
          />
        </div>

        {/* ══ EXCERPT — <blockquote> semantic ══ */}
        <blockquote className="zone-excerpt anim anim-2" cite={pageUrl}>
          <p>{post.excerpt}</p>
        </blockquote>

        {/* ══ ARTICLE BODY — <article> + Microdata Schema.org ══ */}
        <article
          className="zone-body anim anim-3"
          itemScope
          itemType="https://schema.org/Article"
        >
          {/* Microdata ẩn — bổ sung tín hiệu cho Google */}
          <meta itemProp="headline" content={post.title} />
          <meta itemProp="datePublished" content={post.isoDate} />
          <meta itemProp="author" content={post.author ?? SITE_NAME} />
          <meta
            itemProp="image"
            content={
              post.image.startsWith("http")
                ? post.image
                : `${SITE_URL}${post.image}`
            }
          />

          {renderContent(post.content)}
        </article>

        {/* ══ SHARE ══ */}
        <section
          className="zone-share anim anim-4"
          aria-label="Chia sẻ bài viết"
        >
          <span className="zone-share-label">Chia sẻ bài viết</span>
          <div className="share-buttons-row">
            <ShareButtons title={post.title} />
          </div>
        </section>

        {/* ══ RELATED — <aside> vì là nội dung phụ ══ */}
        <aside
          className="zone-related anim anim-5"
          aria-label="Bài viết liên quan"
        >
          <div className="zone-related-header">Bài viết liên quan</div>
          <div className="related-grid">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="related-card"
                title={item.title}
              >
                <div className="related-img">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    loading="lazy" /* lazy load ảnh phụ — cải thiện LCP */
                  />
                </div>
                <div className="related-body">
                  <time className="related-date" dateTime={item.isoDate}>
                    {item.date}
                  </time>
                  {/* h3 — hierarchy đúng: h1 > h2 section > h3 related */}
                  <h3 className="related-title">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
