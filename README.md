# PC Builder

A small PC bundle builder where users can choose components, track the total budget, and avoid incompatible parts.

## Tech Stack

* Next.js
* React
* TypeScript
* Ant Design
* Context API + reducer

## How to Run

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```bash
http://localhost:3000
```

## Undo / Redo Logic

The Logic is built based on the history state that hold the whole timeline the user made and having a key isActive indicating the current inventory 

The key used as pointer so the undo go backward a step and the redo go forth a step 

Everytime the user adds or removes an item there's a new history entry created that contain the selected items at that point

## PDF Export Logic

The PDF export uses a Next.js API route

The selected build items are sent to the route then the PDF is generated on the server using `@react-pdf/renderer`

I used Next.js here because it gives more flexibility for server-side features like setting response headers. For the PDF download, the route returns the generated PDF with:

```ts
Content-Disposition: attachment
```

This makes the browser download the file instead of opening it as normal page content.

## Project Structure

```bash
app/
  api/
    export-inventory/
      route.ts
  favicon.ico
  globals.css
  layout.tsx
  page.tsx

components/
  global/
    card.tsx
  layout/
    header.tsx
    main_content.tsx
    mobile_controls.tsx
    sider.tsx

lib/
  constants/
    constants.ts
  contexts/
    inventory-context.tsx
  pdf/
    inventory-pdf.tsx
  theme/
    tokens.ts
  types/
    component.ts
  utils/
    helpers.ts

data/
  pc-components.json
```

## Resources

* https://ant.design/components/layout#interaction-rules
* https://nextjs.org/docs/pages/getting-started/fonts
* https://react.dev/reference/react/createContext
* https://react.dev/learn/passing-data-deeply-with-context
* https://react.dev/reference/react/useContext#updating-data-passed-via-context
* https://react.dev/learn/extracting-state-logic-into-a-reducer
* https://react.dev/learn/scaling-up-with-reducer-and-context
* https://stevekinney.com/courses/react-typescript/passing-dispatch-and-context
* https://ant.design/docs/react/use-with-next
* https://ant.design/docs/react/customize-theme/
