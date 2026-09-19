import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
from matplotlib.lines import Line2D

fig, ax = plt.subplots(figsize=(15, 10.5))
ax.set_xlim(0, 150)
ax.set_ylim(0, 105)
ax.axis("off")

COLORS = {
    "edge": "#FFE8EC",
    "app": "#E7F3FF",
    "data": "#FFF3D6",
    "async": "#E8F7EF",
    "infra": "#F1EDFA",
    "border": "#222222",
}


def box(x, y, w, h, label, sub="", color="#E7F3FF", fontsize=10.5):
    b = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle="round,pad=0.4,rounding_size=3",
        linewidth=1.3,
        edgecolor=COLORS["border"],
        facecolor=color,
    )
    ax.add_patch(b)
    if sub:
        ax.text(x + w / 2, y + h * 0.62, label, ha="center", va="center",
                 fontsize=fontsize, fontweight="bold", color="#222222")
        ax.text(x + w / 2, y + h * 0.28, sub, ha="center", va="center",
                 fontsize=fontsize - 2.3, color="#4a4a4a")
    else:
        ax.text(x + w / 2, y + h / 2, label, ha="center", va="center",
                 fontsize=fontsize, fontweight="bold", color="#222222")
    return (x, y, w, h)


def arrow(b1, b2, side1="right", side2="left", label="", style="-|>", color="#222222", curve=0.0):
    def anchor(b, side):
        x, y, w, h = b
        return {
            "right": (x + w, y + h / 2),
            "left": (x, y + h / 2),
            "top": (x + w / 2, y + h),
            "bottom": (x + w / 2, y),
        }[side]

    p1 = anchor(b1, side1)
    p2 = anchor(b2, side2)
    a = FancyArrowPatch(
        p1, p2, arrowstyle=style, mutation_scale=14,
        color=color, linewidth=1.3,
        connectionstyle=f"arc3,rad={curve}",
    )
    ax.add_patch(a)
    if label:
        mx, my = (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2
        ax.text(mx, my + 1.6, label, ha="center", va="bottom", fontsize=8, color="#444444")


# Title
ax.text(75, 102, "Vacation-Rental Marketplace — Production Architecture",
         ha="center", va="center", fontsize=15, fontweight="bold")
ax.text(75, 99, "Scaling strategy for frontend, backend, storage, search, and deployment",
         ha="center", va="center", fontsize=10, color="#555555")

# Client layer
client = box(4, 88, 26, 7, "Guest / Host", "Browser (Desktop)", COLORS["app"])

# Edge / CDN layer
cdn = box(4, 76, 26, 7, "CDN / Edge Network", "Vercel Edge · static assets, ISR pages", COLORS["edge"])
img_cdn = box(34, 76, 26, 7, "Image CDN", "Resized photos, WebP/AVIF, cache-control", COLORS["edge"])

# Gateway / LB
gw = box(4, 64, 56, 7, "API Gateway / Load Balancer", "TLS termination, rate limiting, routing", COLORS["edge"])

# App tier
next_app = box(4, 50, 26, 8, "Next.js App Servers", "SSR listing pages · autoscaled\n(horizontal pod autoscaling)", COLORS["app"], fontsize=9.5)
booking_svc = box(34, 50, 26, 8, "Booking Service", "Reservation, pricing, availability\n(stateless, horizontally scaled)", COLORS["app"], fontsize=9.5)
listing_svc = box(64, 50, 26, 8, "Listing Service", "CRUD, photo metadata,\nhost management", COLORS["app"], fontsize=9.5)
search_svc = box(94, 50, 26, 8, "Search Service", "Query parsing, ranking,\ngeo + availability filter", COLORS["app"], fontsize=9.5)

# Async / eventing
queue = box(64, 38, 26, 7, "Message Queue", "SQS/Kafka — image processing,\nsearch indexing, notifications", COLORS["async"], fontsize=9)
img_proc = box(94, 38, 26, 7, "Image Processing Workers", "Thumbnail/format generation\non upload", COLORS["async"], fontsize=9)

# Data tier
pg = box(4, 24, 26, 8, "Postgres (Primary)", "Listings, bookings, users\n+ read replicas per region", COLORS["data"], fontsize=9.5)
redis = box(34, 24, 26, 8, "Redis Cache", "Hot listing pages, session,\nrate-limit counters", COLORS["data"], fontsize=9.5)
search_idx = box(64, 24, 26, 8, "Search Index", "OpenSearch/Elasticsearch\nsharded by region", COLORS["data"], fontsize=9.5)
s3 = box(94, 24, 26, 8, "Object Storage", "S3 — original photos,\narchitecture assets", COLORS["data"], fontsize=9.5)

# Observability / CI-CD
obs = box(4, 10, 26, 8, "Observability", "Centralized logs, metrics,\ntraces (Datadog/CloudWatch)", COLORS["infra"], fontsize=9.5)
cicd = box(34, 10, 26, 8, "CI/CD", "GitHub Actions → build,\ntest, canary deploy", COLORS["infra"], fontsize=9.5)
region = box(64, 10, 56, 8, "Multi-region deployment", "Active-active app tier per region · DB primary + regional read replicas · async cross-region replication for photos/search index",
             COLORS["infra"], fontsize=9.5)

# Arrows
arrow(client, cdn, "bottom", "top")
arrow(cdn, img_cdn, "right", "left", "photo requests")
arrow(cdn, gw, "bottom", "top", "API calls")
arrow(img_cdn, s3, "bottom", "top", curve=-0.35)

arrow(gw, next_app, "bottom", "top")
arrow(gw, booking_svc, "bottom", "top")
arrow(gw, listing_svc, "bottom", "top")
arrow(gw, search_svc, "bottom", "top")

arrow(next_app, redis, "bottom", "top", curve=0.15)
arrow(booking_svc, pg, "bottom", "top", curve=0.1)
arrow(listing_svc, pg, "bottom", "left", curve=-0.2)
arrow(listing_svc, queue, "bottom", "top")
arrow(search_svc, search_idx, "bottom", "top")
arrow(queue, img_proc, "right", "left")
arrow(img_proc, s3, "bottom", "top", curve=-0.2)
arrow(queue, search_idx, "bottom", "right", curve=0.3)

for b in [next_app, booking_svc, listing_svc, search_svc, pg, redis, search_idx, s3]:
    arrow(b, obs, "bottom", "top", curve=0.0, style="-", color="#bbbbbb")

plt.tight_layout()
plt.savefig("/home/claude/airbnb-clone/architecture-diagram.png", dpi=200, bbox_inches="tight")
plt.savefig("/home/claude/airbnb-clone/architecture-diagram.pdf", bbox_inches="tight")
print("saved")
