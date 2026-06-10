# cms-demo-site

A small Astro site used to test the Nua CMS in the project-edit flow.

It exercises:
- `image()` / `n.image()` previews from entry-relative `src/assets` paths
- `n.markdown()` rich body editor on a frontmatter field
- `n.textarea()` autosize
- `defineCmsCollection({ cms })` declarative form layout (tabs + sidebar + sections)
- a markdown (`blog`) collection and a yaml data (`product`) collection

## Use
1. In the Contember admin, create a Project, set `repositoryUrl` to this repo, pick the org, save.
2. Open the project, start an edit session (clones this repo).
3. Open the Collections tab.
