# be-free-ranged [TODO]

be-free-ranged is another ("whiteboarding" at this point) go at something that was (is?) trying to be accomplished with things like [shadow-fax](https://github.com/bahrus/sceadu-fax), [xtal-fragment](https://github.com/bahrus/xtal-fragment), [xt-f](https://github.com/bahrus/xt-f), [lazy-mt](https://github.com/bahrus/lazy-mt).

One limitation of web components, is that they make most sense when they "own" nested children -- either in the ShadowDOM Root, or the standard children if forgoing Shadow DOM.

But there are some important edge cases where that limitation is a bit of an issue, especially when working with built-in elements like tables or ul's.

It is noteworthy that [frameworks support](https://reactjs.org/docs/fragments.html) this as well.

```html
<ul>
    <li>Header</li>
    <li data-cnt=3>List Item  1</li>
    <li>List Item 2</li>
    <li>List Item 3</li>
    <li>Footer</li>
    <script be-free-ranged>
    </script>
</ul>
```

... does the following:

1.  Attaches "scope" to element with attribute data-cnt

