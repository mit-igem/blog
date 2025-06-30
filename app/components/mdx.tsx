import Link from 'next/link'
import Image from 'next/image'
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

import remarkGfm from 'remark-gfm'
import remarkEmbedImages from 'remark-embed-images'
import remarkMath from 'remark-math'
import rehypePrettyCode from 'rehype-pretty-code'

import 'katex'
import 'katex/contrib/mhchem'
import rehypeKatex from 'rehype-katex'

function Box({ children, ...props }) {
  const { title } = props
  return <div className="bg-neutral-100 rounded px-3 py-2 my-4 text-sm text-neutral-700">
    {title && <div className="font-bold">{title}</div>}
    { children }
  </div>
}

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let globalComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  // code: Code,
  Table,
  Box
}

export async function CustomMDX(props) {
  const { dir, source, components, ...otherProps } = props
  const { content } = await compileMDX({
    source: {cwd: dir, value: source},
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkEmbedImages, remarkMath],
        rehypePlugins: [rehypeKatex, [rehypePrettyCode, {theme: "everforest-dark"}]]
      }
    },
    components: { ...globalComponents, ...(components || {}) }
  })
  return <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"></link>

    {content}
  </>
}
