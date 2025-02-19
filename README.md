# calendar-graph

## use

### vanilla

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link
      rel="icon"
      type="image/svg+xml"
      href="/vite.svg"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Vite + TS</title>

    <style>
      .calendar-graph {
        border: 1px solid #ccc;
        border-radius: 6px;
        width: fit-content;
        padding: 8px;
      }
    </style>
  </head>

  <body>
    <div class="calendar-graph">
      <calendar-graph>slot</calendar-graph>
    </div>
    <script
      type="module"
      src="/src/main.ts"
    ></script>
  </body>
</html>
```

### react

```tsx
import CalendarGraph from "@qzda/calendar-graph/react";

function App() {
  return (
    <CalendarGraph
      data={[
        { date: "2000/1/1", count: 8 },
        { date: "2000/2/1", count: 16 },
      ]}
    />
  );
}
```

### vue

```vue
<script setup lang="ts">
import CalendarGraph from "@qzda/calendar-graph/vue";
</script>

<template>
  <CalendarGraph
    :data="[
      { date: '2000/1/1', count: 8 },
      { date: '2000/2/1', count: 16 },
    ]"
  />
</template>
```
