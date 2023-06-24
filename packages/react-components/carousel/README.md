# Carousel

```jsx
import Carousel from `@jtui/carousel`;

function Component() {
	return (
		<Carousel {...args}>
			{Array.from({ length: 10 }).map((_, i) => (
				<Carousel.Item key={i}>{i}</Carousel.Item>
			))}
		</Carousel>
	);
}
```