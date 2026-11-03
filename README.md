# Cooperative UAV Exploration in LOTUSim

A standalone academic project website, independent of the CROSSING repository. Source and deployments can be maintained without rebuilding the institutional site. No authors or affiliations are displayed yet.

## Preview locally

```sh
python3 -m http.server 5174 --bind 127.0.0.1 --directory site
```

Open http://127.0.0.1:5174. No package installation or build is required.

## Edit

- `site/index.html`: project narrative, results, download links and attribution.
- `site/style.css`: responsive layout and typography.
- `site/app.js`: replay selector (3, 4 and 5 UAVs).
- `site/assets/replays/`: MP4 recordings and posters, approximately 1 MB per video.
- `site/assets/pipeline.svg`: reviewed training/deployment figure.
- `.openai/hosting.json`: private preview hosting identity; contains no credentials.

Videos are loaded only on demand, with native playback controls, no autoplay and local posters. Larger future recordings can use external hosting by changing the source URLs in `app.js` and the initial video in `index.html`.

## Deployment

Upload the contents of `site/` to any static host. All local links are relative, so the website works under a GitHub Pages repository subpath as well as a standalone domain. The source repository should remain private. A public project website does not require making its source repository public; use a host that supports private-source builds. GitHub Pages availability for private repositories depends on the account's plan.

The initial hosted preview is owner-private. Publishing a public research URL is separate from the private GitHub source repository. Do not add a private preview URL to CROSSING as a public project link.

CROSSING is intentionally unchanged. When a public project URL is ready, the institutional page can retain an overview and link to this site's demonstrations.

## Content provenance

The methodology, figures, compressed videos and results come from the existing local CROSSING LOTUSim resource page. An exact source-page snapshot is retained in `docs/source-crossing-page.tsx` for traceability. The offline benchmark JSON and training report have a different scope from the LOTUSim repeated mission results; labels on the page distinguish them.

The replay videos visualize recorded mission data (27 October 2026), rather than camera captures. Each team-size replay is one mission; repeated benchmark results use ten missions per method with three UAVs. No physical-flight claim is made.

## Template attribution

Adapted from [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template), commit `d38af1ccae1ce82c3404d2820c4c646afd409f81`, itself derived from [Nerfies](https://nerfies.github.io/). We retain its Bulma stylesheet and academic page structure, with project-specific HTML, styling and interactions. Template documentation and its CC BY-SA 4.0 notice are preserved in `docs/template-original-readme.md`, and the site footer retains attribution. Research data and media retain their existing rights; the template license is not a claim to relicense those materials.
