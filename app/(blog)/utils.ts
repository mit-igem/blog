import fs from 'fs'
import fm from 'front-matter'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  updatedAt: string
  summary: string
  image?: string
  published?: boolean
}

function parseFrontmatter(fileContent: string) {
  let { attributes, body } = fm(fileContent)
  return { metadata: attributes as Metadata, content: body }
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir, {recursive: true}).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let subdir = path.dirname(file)
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
      dir: path.join(dir, subdir),
      published: metadata.published
    }
  })
}

export const contentDir = ['app', '(blog)', 'posts']

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), ...contentDir))
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
