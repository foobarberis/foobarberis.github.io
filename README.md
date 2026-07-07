# foobarberis.github.io

Static personal website and resume.

## CSS workflow

CSS sources are split into:

```text
css/tachyons.css  # vendor Tachyons source, rarely edited
css/custom.css    # custom utilities, fonts, resume theme
style.css         # generated/minified output used by HTML pages
```

Edit `css/custom.css` for project-specific CSS.

Then regenerate `style.css`:

```sh
npm run build:css
```

Commit both the source CSS files and the generated `style.css` after CSS changes.

## First setup

Install the CSS build dependency:

```sh
npm install
```

## Site theme

Site and resume colors are defined in `css/custom.css` under:

```css
.theme-sage
```

Change the CSS variables there, then run:

```sh
npm run build:css
```

Resume SVG icon colors are not controlled through CSS. Edit the `fill` values directly in the SVG files under `assets/icons/`.

## Resume PDF layout

`resume.html` is tuned for Firefox and Chrome/Chromium PDF export.

Firefox settings:

- Paper size: `A4`
- Scale: `Fit to page width`
- Margins: `None`
- Headers and footers: disabled
- Print backgrounds: enabled

Chrome/Chromium settings:

- Paper size: `A4`
- `Fit to page width` enabled
- `Margins` set to `None`
- `Print headers and footers` disabled
- `Print backgrounds` enabled

The page keeps its visible margin through the `pa2` padding on the `<page>` element, not through browser print margins. For this reason, `css/custom.css` sets:

```css
@page {
	size: A4 portrait;
	margin: 0;
}
```

The left sidebar is forced to fill the A4 page height minus the `<page>` top and bottom padding:

```css
@media print {
	page > .bg-resume-sidebar {
		box-sizing: border-box;
		min-height: calc(29.7cm - 1rem);
	}
}
```

`29.7cm` is the A4 page height. `1rem` is the total vertical padding from `pa2` (`0.5rem` top + `0.5rem` bottom). If the `<page>` padding changes, update this calculation so the sidebar keeps the same top and bottom visual margin.
