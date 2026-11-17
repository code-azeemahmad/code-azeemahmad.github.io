# UI/UX Design Specification

## Product feel
Create a calm, polished, ChatGPT-inspired portfolio interface. The experience should foreground conversation and make the owner's work easy to discover without copying another product's branding or proprietary assets.

## Main layout
- Desktop: collapsible left sidebar and main conversation area.
- Mobile: sidebar becomes a drawer/sheet with an obvious open/close control.
- Welcome state: greeting, short owner introduction, prompt suggestions, and featured topic entry points.
- Active chat: readable message column, composer anchored near the bottom, clear streaming and stop states.
- Profile/settings: owner identity and BYOK configuration with privacy explanation.

## Visual system
Define final brand colors, typography, spacing, radii, shadows, and light/dark tokens after owner approval. Do not invent a personal brand identity. Use design tokens rather than scattered hard-coded values.

## Interaction requirements
- Keyboard-accessible sidebar and composer.
- Visible focus indicators.
- Enter sends; Shift+Enter inserts a newline (unless a documented alternative is chosen).
- Disable send when input is empty or a request cannot be started.
- Provide stop/cancel while generating.
- Copy feedback and clear error messages.
- Confirm destructive actions such as clearing all history.
- Preserve scroll behavior without unexpectedly stealing focus.
- Support reduced-motion preferences.
- Show a useful empty state when no conversations exist.

## Responsive requirements
- Support narrow mobile screens, tablets, and desktop.
- Prevent horizontal overflow in code blocks and long URLs.
- Keep the composer usable with mobile virtual keyboards.
- Ensure sidebar navigation remains discoverable on mobile.

## Accessibility
Target WCAG 2.2 AA as a design goal:
- Semantic landmarks and headings.
- Sufficient color contrast.
- Labels for icon-only buttons.
- Keyboard operation and logical focus order.
- Announce relevant status changes to assistive technology.
- Do not communicate status by color alone.

## Content design
Use concise, factual language. Label portfolio-specific evidence and source links. Do not present model-generated guesses as verified biography or career information.
