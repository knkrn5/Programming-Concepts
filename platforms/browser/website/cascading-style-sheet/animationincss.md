# **Animation in CSS**

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
