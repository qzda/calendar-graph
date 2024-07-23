# calendar-graph

## use

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

or

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
