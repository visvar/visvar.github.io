>
> inp1 = "{This is LaTeX project to discuss about BibTeX and LuaTeX}"
'{This is LaTeX project to discuss about BibTeX and LuaTeX}'
>
> inp2 = "\"This is LaTeX project to discuss about BibTeX and LuaTeX\""
'"This is LaTeX project to discuss about BibTeX and LuaTeX"'
>
> inp3 = "{\"This is LaTeX project to discuss about BibTeX and LuaTeX\"}"
'{"This is LaTeX project to discuss about BibTeX and LuaTeX"}'
>
> /(^\{\".*\"\}$)|(^\{.*\}$)|(^\".*\"$)/g.test(b_inp1);
false
>
> /(^\{\".*\"\}$)|(^\{.*\}$)|(^\".*\"$)/g.test(inp1);
true
true
>
> b_inp1 = "{\"This is LaTeX project to discuss ab
out BibTeX and LuaTeX\""
'{"This is LaTeX project to discuss about BibTeX a
nd LuaTeX"'
>
> /^(\{\".*\"\})|(\{.*\})|(\".*\")$/g.test(b_inp1)
;
true
>
> /(^\{\".*\"\}$)|(^\{.*\}$)|(^\".*\"$)/g.test(b_i
np1);
false
>
> /(^\{\".*\"\}$)|(^\{.*\}$)|(^\".*\"$)/g.test(inp
1);
true
>
> /(^\{\".*\"\}$)|(^\{.*\}$)|(^\".*\"$)/g.test(inp
2);
true
> /(^\{\".*\"\}$)|(^\{.*\}$)|(^\".*\"$)/g.test(inp
3);
true
>
> b_inp2 = "\"This is LaTeX project to discuss about BibTeX and LuaTeX}"
'"This is LaTeX project to discuss about BibTeX and LuaTeX}'
>
> /(^\{\".*\"\}$)|(^\{.*\}$)|(^\".*\"$)/g.test(b_inp2);
false
>
> .save commands.md
Session saved to:commands.md
>
