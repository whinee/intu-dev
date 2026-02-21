# intu-dev (npm package)

Install the intu CLI globally:

```bash
npm i -g intu-dev
```

Then run:

```bash
intu init my-project --dir .
intu c my-channel --dir my-project
```

## Publishing

From the project root:

```bash
cd npm
npm run build    # Cross-compiles Go for darwin, linux, win32
npm version patch
npm publish
```

Requires Go to be installed for the build step.
