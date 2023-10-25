import React, { useEffect, useState } from "react";

interface ICodeBlock {
  code: string;
  lang: string;
}

const CodeBlock: React.FC<ICodeBlock> = ({ code, lang }) => {
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    import("highlight.js").then(({ default: hljs }) => {
      const language = hljs.getLanguage(lang);
      const highlighted = hljs.highlightAuto(code, language?.aliases).value;
      setHighlightedCode(highlighted);
    });
  }, [code, lang]);

  return (
    <div className="group relative my-4 rounded-l scroll">
      <pre className="scrollbar-custom overflow-auto px-5 scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/10 dark:hover:scrollbar-thumb-white/20">
        <code
          className={`language-${lang}`}
          dangerouslySetInnerHTML={{
            __html: highlightedCode || code.replace(/</g, "&lt;"),
          }}
        />
      </pre>
    </div>
  );
};

export { CodeBlock };
