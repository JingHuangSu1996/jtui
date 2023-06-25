# Carousel

[Document](https://ui.jing-tech.me/components/carousel)

```jsx
import Carousel from '@jtui/carousel';

function Component() {
  return (
    <Carousel>
      {Array.from({ length: 10 }).map((_, i) => (
        <Carousel.Item key={i}>{i}</Carousel.Item>
      ))}
    </Carousel>
  );
}
```
