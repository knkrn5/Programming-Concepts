# **CSS**

> The key to master is CSS, is knowing to create any kind of responsive layouts using both **Grid and Flex property**

```mermaid
flowchart TD
    A(CSS) ==> B{Popular CSS Styling Libraries}
    B e1@--> |One| D([Tailwind CSS])
    B e2@-->|Two| E([BootStrap])
    e1@{ animate: true, animation: fast, curve: linear }
    e2@{ animate: true, animation: fast }
```

## **Animations**

- To add any animation we use **@@keyframes** property in CSS File

  ```css
  .color-blink {
    animation: color-blink 3s ease-in-out infinite;
    border-radius: 5px;
  }

  @keyframes color-blink {
    0% {
      background: #002663;
    }
    25% {
      background: green;
    }
    50% {
      background: #38006c;
    }
    75% {
      background: red;
    }
    100% {
      background: brown;
    }
  }
  ```

- the keyframe percentages are calculated relative to that total time:

  | Keyframe | Time (in 1 second) |
  | -------- | ------------------ |
  | `0%`     | 0s (start)         |
  | `25%`    | 0.25s              |
  | `50%`    | 0.5s               |
  | `75%`    | 0.75s              |
  | `100%`   | 1s (end)           |
