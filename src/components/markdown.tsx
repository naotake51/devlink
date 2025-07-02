import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}

const components: Components = {
  h1: ({ children, ...props }) => {
    // 目次（MarkdownIndexes）用のid
    const id = encodeURIComponent(children?.toString() ?? "");
    return (
      <h1
        id={id}
        className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-300 first:mt-8 mt-16"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    // 目次（MarkdownIndexes）用のid
    const id = encodeURIComponent(children?.toString() ?? "");
    return (
      <h2
        id={id}
        className="text-2xl font-bold text-gray-800 mt-8 mb-3 border-b pb-2 border-gray-300"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-gray-700 mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a className="text-blue-600 hover:text-blue-800 underline" {...props}>
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 mb-4 text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 mb-4 text-gray-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 py-1 italic text-gray-600 bg-blue-50 rounded my-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    // インラインコードかどうかをclassNameから判断
    const isInline = !className || !className.includes("language-");

    return isInline ? (
      <code
        className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className={`block bg-gray-800 text-white p-4 rounded-md overflow-x-auto font-mono text-sm my-4 ${className || ""}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre className="bg-transparent p-0 m-0 overflow-visible" {...props}>
      {children}
    </pre>
  ),
  hr: ({ ...props }) => (
    <hr className="border-t border-gray-300 my-6" {...props} />
  ),
  table: ({ children, ...props }) => (
    <table
      className="min-w-full border-collapse border border-gray-300 my-4"
      {...props}
    >
      {children}
    </table>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-gray-300 bg-gray-100 px-4 py-2 text-left"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-gray-300 px-4 py-2" {...props}>
      {children}
    </td>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-800" {...props}>
      {children}
    </em>
  ),
  del: ({ children, ...props }) => (
    <del className="line-through text-gray-500" {...props}>
      {children}
    </del>
  ),
};
