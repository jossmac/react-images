function getAuthorName({ author }) {
  if (!author) return null
  return typeof author === 'string' ? author : author.name
}

export function getAltText({ data, index }): string {
  if (data.caption) return data.caption

  const author = getAuthorName(data)

  return author ? `Photo by ${author}` : `Image ${index + 1}`
}
