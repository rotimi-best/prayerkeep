export default async function getChapters(book) {
  return import(`../constants/bible/${book}.json`)
}