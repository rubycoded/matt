export function getReadingTime(content: string) {
  const wordsPerMinute = 200;
  const numberOfWords = content.split(/\s/g).length;

  // Count images (each image counts as 10 seconds)
  const imageMatches = content.match(/\!\[.*?\]\(.*?\)/g) || [];
  const imageTime = (imageMatches.length * 10) / 60; // Convert to minutes

  // Count code blocks (reading code is slower)
  const codeBlockMatches = content.match(/```[\s\S]*?```/g) || [];
  const codeWords = codeBlockMatches.join(' ').split(/\s/g).length;
  const codeTime = codeWords / 100; // Assume reading code is twice as slow

  const totalTime = Math.ceil(
    numberOfWords / wordsPerMinute +
    imageTime +
    codeTime
  );

  return totalTime;
} 