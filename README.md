# QR Docent Admin Dashboard

This is the admin dashboard and backend server for the QR Docent app.

## Development

To start development you need to have Node.js and Yarn installed. (Node.js is a JS runtime and Yarn is a package manager)

Initial steps:

1. Fork the repo
2. Clone your fork
3. Add the main repo as upstream (`git remote add upstream https://github.com/daviddecorso/QRDocentDashboard`)
4. Run `yarn` (this should be done after every pull in case new dependencies are added.)
5. Use `yarn run dev` to run a development server. (Hosted on http://localhost:3000)

Contributing:

1. Get the latest work from the repo: `git pull upstream main` (alternatively you can use `git fetch` if you don't want to make changes locally).
2. Make a new branch to start working: `git checkout -b branch-name` (to move to an existing branch do `git checkout branch-name`)
3. Do your work, commit (`git commit -m "message"`), push that branch (`git push upstream branch-name`), and open a pull request on the main repo.
