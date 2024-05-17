import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactDOMServer from "react-dom/server"; // Import ReactDOMServer
import TypewriterEffect from "./TypewriterEffect";

function FormatResponse({ content }: { content: string }) {
    // Create the formatted content using ReactMarkdown
    const formattedContent = (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
        </ReactMarkdown>
    );

    // Convert the Element to a string using ReactDOMServer.renderToString()
    const contentString = ReactDOMServer.renderToString(formattedContent);

    // Pass the string to TypewriterEffect component
    return (
        <TypewriterEffect content={contentString} />
    );
}

export default FormatResponse;
