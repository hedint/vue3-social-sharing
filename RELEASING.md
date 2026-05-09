# Releasing

This package is released from `master` through GitHub Actions and npm Trusted Publishing.

## One-time npm setup

Configure a trusted publisher for `vue3-social-sharing` on npm:

- Provider: GitHub Actions
- Organization or user: `hedint`
- Repository: `vue3-social-sharing`
- Workflow filename: `publish.yml`
- Environment name: leave empty unless GitHub environment protection is added later

The workflow uses OIDC, so it does not need an `NPM_TOKEN` secret. It publishes with provenance. After the first successful trusted publish, npm recommends restricting token-based publishing for the package.

## One-time GitHub setup

The `Version PR` workflow must be allowed to create pull requests.

First check the repository setting:

1. Open GitHub repository settings.
2. Go to `Actions` -> `General`.
3. Under `Workflow permissions`, enable `Read and write permissions`.
4. Enable `Allow GitHub Actions to create and approve pull requests`.

If organization policy prevents this, create a fine-scoped personal access token or GitHub App token with permission to read/write contents and pull requests, save it as the repository secret `CHANGESETS_TOKEN`, and keep `.github/workflows/version-pr.yml` using that secret.

## Release flow

1. Create a feature PR with the package changes.
2. Run `npm run changeset` in that PR and follow the prompts:
   - select `vue3-social-sharing`;
   - choose `patch`, `minor`, or `major`;
   - write the changelog summary.
3. Commit the generated `.changeset/*.md` file with the feature PR.
4. Merge the feature PR to `master` after CI passes.
5. The `Version PR` workflow creates or updates a `chore(release): version packages` pull request.
6. Review the generated `package.json`, `package-lock.json`, and `CHANGELOG.md` changes in that release PR.
7. Confirm CI is green and merge the release PR to `master`.
8. The `Publish` workflow checks whether that exact version already exists on npm. If it does not, the workflow rebuilds, tests, packs, and publishes it.

Merging to `master` without changing the package version is safe. The publish workflow exits without publishing when the version already exists.

The `Version PR` workflow uses `CHANGESETS_TOKEN` when that secret exists, otherwise it falls back to the default `GITHUB_TOKEN`. If a run pushed `changeset-release/master` but failed before creating the PR, open the PR manually from that branch after fixing the permission setting.

## Changesets commands

Create a changeset interactively:

```bash
npm run changeset
```

Apply pending changesets to `package.json`, `package-lock.json`, and `CHANGELOG.md`:

```bash
npm run version
```

This command is usually run by the `Version PR` workflow. Run it manually only when you need to debug or prepare a release branch without the bot.

The playground depends on the current `vue3-social-sharing` package version because Changesets validates internal workspace dependency ranges. When `npm run version` bumps the package, it also updates the playground dependency range.

Validate a release PR locally:

```bash
npm run release:check
```

This repository uses Changesets only for version and changelog management. npm publishing stays in GitHub Actions through Trusted Publishing.

## Local checks

Run these before opening a release PR:

```bash
npm ci
npm run lint
npm test
npm run build
npm run pack:dry-run
npm audit --audit-level=high
npm -w playground run build
npm -w playground run test:e2e -- --project=chromium
```

For the lowest supported Vue peer version:

```bash
npm install --no-save --workspaces=false vue@3.3.11
npm test
npm run build
```

If that temporary install changes local files, discard those local package manager changes before committing the release PR.

## Verifying a release

After the workflow finishes, verify the npm version and package contents:

```bash
npm view vue3-social-sharing version
npm view vue3-social-sharing dist-tags --json
npm pack vue3-social-sharing@latest --dry-run
```
