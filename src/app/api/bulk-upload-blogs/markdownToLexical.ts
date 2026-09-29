import { marked } from 'marked';

export function markdownToLexical(markdown: string) {
  if (!markdown) markdown = "";
  
  const tokens = marked.lexer(markdown);

  function parseTokens(tokens: any[]): any[] {
    const nodes: any[] = [];
    
    for (const token of tokens) {
      if (token.type === 'paragraph') {
        nodes.push({
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: parseInlineTokens(token.tokens || [])
        });
      } else if (token.type === 'heading') {
        nodes.push({
          type: 'heading',
          tag: `h${Math.min(token.depth, 6)}`,
          format: '',
          indent: 0,
          version: 1,
          children: parseInlineTokens(token.tokens || [])
        });
      } else if (token.type === 'list') {
        nodes.push({
          type: 'list',
          listType: token.ordered ? 'number' : 'bullet',
          start: token.start || 1,
          format: '',
          indent: 0,
          version: 1,
          children: (token.items || []).map((item: any) => ({
            type: 'listitem',
            value: item.task ? (item.checked ? 1 : 0) : undefined,
            format: '',
            indent: 0,
            version: 1,
            children: item.tokens ? parseTokens(item.tokens) : [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: parseInlineTokens([{ type: 'text', text: item.text } as any])
              }
            ]
          }))
        });
      } else if (token.type === 'blockquote') {
        nodes.push({
          type: 'quote',
          format: '',
          indent: 0,
          version: 1,
          children: parseTokens(token.tokens || [])
        });
      } else if (token.type === 'space' || token.type === 'hr') {
        // ignore spaces and horizontal rules for now
      } else {
        // fallback
        if ('text' in token && token.type !== 'html') {
           nodes.push({
             type: 'paragraph',
             format: '',
             indent: 0,
             version: 1,
             children: [{ type: 'text', text: (token as any).text, version: 1, format: 0, mode: 'normal', style: '', detail: 0 }]
           });
        }
      }
    }
    return nodes;
  }

  function parseInlineTokens(tokens: any[]): any[] {
    const inlineNodes: any[] = [];
    for (const token of tokens) {
      if (token.type === 'text' || token.type === 'escape' || token.type === 'html') {
        inlineNodes.push({ type: 'text', text: token.raw || token.text || '', version: 1, format: 0, mode: 'normal', style: '', detail: 0 });
      } else if (token.type === 'strong') {
        inlineNodes.push({ type: 'text', text: token.text, version: 1, format: 1, mode: 'normal', style: '', detail: 0 }); // format 1 = bold
      } else if (token.type === 'em') {
        inlineNodes.push({ type: 'text', text: token.text, version: 1, format: 2, mode: 'normal', style: '', detail: 0 }); // format 2 = italic
      } else if (token.type === 'del') {
        inlineNodes.push({ type: 'text', text: token.text, version: 1, format: 4, mode: 'normal', style: '', detail: 0 }); // format 4 = strikethrough
      } else if (token.type === 'codespan') {
        inlineNodes.push({ type: 'text', text: token.text, version: 1, format: 16, mode: 'normal', style: '', detail: 0 }); // format 16 = code
      } else if (token.type === 'link') {
        inlineNodes.push({
          type: 'link',
          fields: { url: token.href, newTab: false, linkType: 'custom' },
          version: 2,
          children: parseInlineTokens(token.tokens || [])
        });
      } else {
        // Fallback
        inlineNodes.push({ type: 'text', text: token.raw || '', version: 1, format: 0, mode: 'normal', style: '', detail: 0 });
      }
    }
    return inlineNodes.length > 0 ? inlineNodes : [{ type: 'text', text: '', version: 1, format: 0, mode: 'normal', style: '', detail: 0 }];
  }

  const children = parseTokens(tokens);

  // Fallback to empty paragraph if no content
  if (children.length === 0) {
    children.push({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      children: [{ type: 'text', text: '', version: 1, format: 0, mode: 'normal', style: '', detail: 0 }]
    });
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children
    }
  };
}
