import markdown

with open('GUIDE.md', 'r', encoding='utf-8') as f:
    md_content = f.read()

extensions = ['tables', 'fenced_code', 'toc', 'attr_list', 'md_in_html']
html_body = markdown.markdown(md_content, extensions=extensions, output_format='html5')

html_template = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React 工程化项目实战 Guide</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/typescript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/bash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/css.min.js"></script>
    <style>
        body { background: #0f172a; color: #e2e8f0; font-family: system-ui, -apple-system, sans-serif; }
        .container { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; }
        h1 { font-size: 2.5rem; font-weight: 800; background: linear-gradient(to right, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
        h2 { font-size: 1.75rem; font-weight: 700; color: #f8fafc; border-bottom: 2px solid #334155; padding-bottom: 0.5rem; margin-top: 3rem; margin-bottom: 1.5rem; }
        h3 { font-size: 1.25rem; font-weight: 600; color: #93c5fd; margin-top: 2rem; margin-bottom: 0.75rem; }
        h4 { font-size: 1.1rem; font-weight: 600; color: #a78bfa; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        p, li, td, th { color: #cbd5e1; line-height: 1.7; }
        a { color: #60a5fa; }
        code { background: #1e293b; color: #fbbf24; padding: 0.15rem 0.4rem; border-radius: 0.25rem; font-size: 0.9em; }
        pre { background: #1e293b !important; border-radius: 0.75rem; padding: 1.25rem; overflow-x: auto; margin: 1rem 0; border: 1px solid #334155; }
        pre code { background: none; color: inherit; padding: 0; font-size: 0.9rem; }
        blockquote { border-left: 4px solid #3b82f6; padding-left: 1rem; margin: 1rem 0; color: #94a3b8; font-style: italic; background: rgba(59,130,246,0.05); padding: 0.75rem 1rem; border-radius: 0 0.5rem 0.5rem 0; }
        table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        th, td { padding: 0.75rem 1rem; border: 1px solid #334155; text-align: left; }
        th { background: #1e293b; color: #f8fafc; font-weight: 600; }
        ul, ol { padding-left: 1.5rem; }
        li { margin-bottom: 0.25rem; }
        hr { border: none; border-top: 1px solid #334155; margin: 3rem 0; }
        strong { color: #f1f5f9; }
        em { color: #94a3b8; }
        #toc { position: fixed; left: 0; top: 0; bottom: 0; width: 280px; background: #1e293b; border-right: 1px solid #334155; padding: 1.5rem; overflow-y: auto; z-index: 100; }
        #toc h2 { font-size: 1.1rem; color: #94a3b8; border: none; margin: 0 0 1rem; }
        #toc ul { list-style: none; padding: 0; }
        #toc li { margin: 0.6rem 0; }
        #toc a { color: #94a3b8; text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
        #toc a:hover { color: #60a5fa; }
        .content { margin-left: 280px; }
        @media (max-width: 768px) {
            #toc { display: none; }
            .content { margin-left: 0; }
        }
    </style>
</head>
<body>
    <nav id="toc">
        <h2>📑 目录</h2>
        <ul>
            <li><a href="#概述">概述</a></li>
            <li><a href="#先决条件">先决条件</a></li>
            <li><a href="#phase-1-项目初始化">Phase 1: 项目初始化</a></li>
            <li><a href="#phase-2-类型定义">Phase 2: 类型定义</a></li>
            <li><a href="#phase-3-主框架-app">Phase 3: 主框架 App</a></li>
            <li><a href="#phase-4-rag-对话组件">Phase 4: RAG 对话组件</a></li>
            <li><a href="#phase-5-jira-看板组件">Phase 5: Jira 看板组件</a></li>
            <li><a href="#phase-6-整合打磨">Phase 6: 整合打磨</a></li>
            <li><a href="#最终目录结构">最终目录结构</a></li>
            <li><a href="#常见问题">常见问题</a></li>
            <li><a href="#下一步学习建议">下一步学习建议</a></li>
        </ul>
    </nav>
    <main class="content">
        <div class="container">
""" + html_body + """
        </div>
    </main>
    <script>
        document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
    </script>
</body>
</html>"""

with open('GUIDE.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

print('GUIDE.html created successfully')
print(f'File size: {len(html_template)} bytes')
