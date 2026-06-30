## Update: authenticated state of the login button (header)

Make the header login control reflect authentication state.

- Logged OUT: keep the `Iniciar sesión` button exactly as it is today.
- Logged IN: replace `Iniciar sesión` with a small circular avatar thumbnail
  showing the user's pet photo.

Avatar image source — use this fallback chain, in order:
1. The `avatarUrl` of the user's first pet (ordered by `createdAt`) that has one.
2. If no pet has a photo, a bundled placeholder cat avatar at
   `/public/placeholder-pet.svg` (add this static asset to the repo).
3. If the chosen image fails to load at runtime, fall back to the same
   placeholder via an image `onError` handler.

Behavior and styling:
- Circular image, ~36–40 px, `object-cover`, subtle border, visible focus ring,
  reusing the existing design tokens.
- The avatar is a button. Click, Enter, or Space opens an account dropdown with:
  `Mis mascotas`, `Mi cuenta`, `Cerrar sesión`.
- While the session or image is loading, show a neutral placeholder with no
  layout shift.

Accessibility:
- `aria-label` on the button: `Menú de cuenta`.
- Meaningful `alt`: the pet's name when a real photo is used, or
  `Foto de tu mascota` for the placeholder.
- Dropdown is keyboard navigable and closes with Escape.

Keep all user-facing text in Spanish (es-CO). Do not change the logged-out experience.


## Placeholder pet avatar — asset and styling

Use `docs/img/cat face.png` as the bundled placeholder cat avatar (replacing the
earlier `/public/placeholder-pet.svg` reference).

Asset handling:
- Copy the file into the served static folder and rename it to avoid the space in
  the filename: `public/placeholder-pet.png`. Reference it as `/placeholder-pet.png`.
  (Files under `docs/` are not served by Next.js; the space also breaks URLs.)
- If the file isn't present at build time, log a clear warning but don't fail the build.

Styling (the placeholder should read as muted/subtle, not like a real pet photo):
- Note: this is a raster PNG, so its internal colors can't be recolored via CSS.
  Achieve the low-contrast look with CSS filters instead, e.g.
  `filter: grayscale(0.5) saturate(0.7) opacity(0.85)` (tune to taste), optionally
  on a muted neutral background circle.
- Apply this muted treatment ONLY to the placeholder, not to real pet photos —
  real `avatarUrl` images render at full contrast.
- Keep the same circular shape, size (~36–40 px), border, and focus ring as the
  real avatar so the layout is identical either way.

-----------

I loging but the new cat tubnail is not shown, I still see the `Iniciar sesion` button after lging in.


