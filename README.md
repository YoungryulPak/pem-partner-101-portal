# Partner 101 Portal (published site)

This folder is a static-site build of the Partner 101 Portal: short, role-based 101 pages on Preemptive Exposure Management (PEM) and its three solutions (SecurityScorecard, Mondoo, Alt Security), plus an independent Technical 101 hands-on track.

**Do not edit files in this folder directly.** It is generated output. The source content and build script live in a separate working folder (`PEM_Partner_Portal`, next to this one) and this folder is re-synced from there each time the content changes.

## Viewing it locally

No server needed for most of it, but Google Translate's language switcher needs the page served over `http://` (not `file://`). From this folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Publishing to GitHub Pages

1. Create a new (private or public) repository on GitHub, with no README/license (so it starts empty).
2. From this folder:

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

3. In the repository's **Settings → Pages**, set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. GitHub publishes it at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Updating after content changes

This folder's content comes from `../PEM_Partner_Portal`. After editing content there, rebuild and re-sync:

```bash
cd ../PEM_Partner_Portal && python3 scripts/build.py
rsync -a --delete --exclude='.git' ../PEM_Partner_Portal/site/ ../PEM_Partner_Portal_Site/ \
  && rm -f ../PEM_Partner_Portal_Site/sitemap.json
cd ../PEM_Partner_Portal_Site && git add -A && git commit -m "Update content" && git push
```
