# MIT iGEM Blog

## For developers
- This website is based off of the [portfolio-blog-starter](https://portfolio-blog-starter.vercel.app) Vercel template: https://github.com/vercel/examples/tree/main/solutions/blog

### Getting started

1. Clone the repository.

```bash
git clone git@github.com:mit-igem/blog.git
```

2. Install all the packages needed to start the development server.

```bash
yarn install
```

3. Start the development server to see live changes.

```bash
yarn dev
```

4. Once you have finalized your edits, commit your changes to the repository and push them to the remote.

```bash
git add .
git commit -m "DESCRIBE YOUR CHANGES HERE"
git push
```

### KaTeX compatibility

- See https://github.com/withastro/astro/issues/8650 for more details.

```json
"rehype-katex": "^7.0.1",
"remark-math": "^6.0.0",
```

### Additional syntax highlighting grammars
- https://rehype-pretty.pages.dev/#custom-highlighter
