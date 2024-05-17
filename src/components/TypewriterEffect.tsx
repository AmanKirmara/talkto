import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TypeIt from "typeit-react";
import ReactDOMServer from "react-dom/server";

function TypewriterEffect({ content }: { content: string }) {
  // Convert Markdown content to HTML using ReactMarkdown
  const markdownToHtml = <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>;

  // Convert the markdownToHtml element to a string
  const formattedContent = ReactDOMServer.renderToString(markdownToHtml);

  // Pass the formatted content to TypeIt for the typewriter effect
  return (
    <TypeIt
      options={{
        strings: [formattedContent],
        speed: 2,
        waitUntilVisible: true,
        cursor: false
      }}
    />
  );
}

export default TypewriterEffect;
