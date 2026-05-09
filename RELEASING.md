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

The `Version PR` workflow uses the default `GITHUB_TOKEN`. If repository settings prevent GitHub Actions-created PRs from triggering required checks, replace it with a fine-scoped PAT or GitHub App token secret and use that token in `.github/workflows/version-pr.yml`.

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
