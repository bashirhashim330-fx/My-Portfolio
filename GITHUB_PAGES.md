# Bashir Hashim Portfolio — GitHub Pages

This is a Next.js static-export project prepared for GitHub Pages.

## Preview on Android (Acode/SPCK)

1. Install the project dependencies in a Node/Termux environment:
   `pnpm install`
2. Build:
   `pnpm build`
3. A static `out/` folder will be generated.
4. Open `out/index.html` in Acode/SPCK to preview the generated static site.

For local preview, `NEXT_PUBLIC_BASE_PATH` is empty, so assets use normal `/...` paths.

## GitHub Pages

The included `.github/workflows/deploy.yml` automatically builds and deploys the site when you push to the `main` branch.

The workflow builds with:

`NEXT_PUBLIC_BASE_PATH=/My-Portfolio`

So the expected URL is:

`https://bashirhashim330-fx.github.io/My-Portfolio/`

In GitHub:
1. Open the repository.
2. Go to Settings → Pages.
3. Under Build and deployment, choose **GitHub Actions**.
4. Push the project to the `main` branch.
5. Wait for the Actions workflow to finish.

Do not manually create an `index.html` in the source project. Next.js generates the static `index.html` files inside `out/` during the build.
