# followup
could-not-find-plugin-proposal-numeric-separator error:
delete node_modules and package-lock.json
add "resolutions": { "@babel/preset-env": "^7.8.7" } to package.json
npm install npm-force-resolutions --save-dev
npm install
npx npm-force-resolutions
npm install again
ionic build
