# @jtui/carousel Spec

## Background

## Prior Art

### 3rd party Design Systems

https://www.smashingmagazine.com/2022/04/designing-better-carousel-ux/

- [Mistica UI](https://mistica-web.vercel.app/?path=/story/components-carousels-carousel-on-different-container-types--default)
- [Mantine UI](https://mantine.dev/others/carousel/)
- [Reshaped UI](https://reshaped.so/content/docs/components/carousel)
- [Embla Carousel](https://www.embla-carousel.com/examples/static/)
- [WPDS Carousel](https://build.washingtonpost.com/resources/working-examples)

https://github.com/onderonur/react-infinite-scroll-hook/blob/master/src/useInfiniteScroll.ts

## Sample Code

```tsx
<Carousel>
  {items.map((item) => (
    <Card {...item} />
  ))}
</Carousel>
```

## Variants

## API

| Property  | Values                   | Default      | Description                                  |
| --------- | ------------------------ | ------------ | -------------------------------------------- |
| direction | `horizontal`, `vertical` | `horizontal` | Set the direction of the Carousel            |
| behavior  | `swipe`, `drag`          | `swipe`      | Set the behavior of the Carousel             |
| loop      | boolean                  | `false`      | Set the Carousel to loop through the items   |
| rtl       | boolean                  | `false`      | Set the Carousel to render in RTL mode       |
| dragFree  | boolean                  | `false`      | Set the Carousel to render in drag free mode |
| autoPlay  | boolean                  | `false`      | Set the Carousel to auto play                |

### Lazy Loading

### Infinite Scroll (Lazy Fetching)

## Behaviors

## Accessibility

https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
