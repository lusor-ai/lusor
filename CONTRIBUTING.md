# Contributing

Thanks for helping improve Lusor. Issues and pull requests are welcome.

## How changes reach this repository

This repository is published from Lusor's internal repository as snapshots:
each release is one commit. An accepted pull request is applied internally
with you credited as co-author (`Co-authored-by:`), and it appears in the next
snapshot. Your pull request is then closed with a link to that snapshot. Your
authorship is kept; only the merge happens internally.

## Pull requests

- Keep each pull request to one change, and say what it fixes or adds and how
  you tested it.
- Run the checks of the package you touched (for example `npm ci`, then
  `npm run typecheck` and `npm run build` in `packages/sdk`).
- Sign off every commit (`git commit -s`) to certify the
  [Developer Certificate of Origin](https://developercertificate.org/): that
  you wrote the change or otherwise have the right to submit it under this
  repository's licence.

## Scope

App skills should help an agent navigate an app. Skills or code whose purpose
is to get around an app's security controls, rate limits or terms are not
accepted.

## App skills

New skills go in `skills-unverified/<app>/SKILL.md`. Lusor's agent doesn't
load that folder. Each skill is reviewed, verified on a real phone, and then
moved to `skills/`, which Lusor's agent loads on every run. The format and
the verification record are described in [skills/README.md](skills/README.md).

## Security issues

Don't open a public issue for a vulnerability; see [SECURITY.md](SECURITY.md).
