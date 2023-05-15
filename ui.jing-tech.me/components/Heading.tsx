import { StyledText } from './Text';

export interface HeadingProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
  as?: any;
}

export const H1 = ({ className, ...props }: HeadingProps) => (
  <StyledText as="h1" fontWeight="bold" fontSize="fontSize600" {...props} />
);

export const H2 = ({ className, ...props }: HeadingProps) => (
  <StyledText as="h2" fontWeight="bold" fontSize="fontSize500" {...props} />
);

export const H3 = ({ className, ...props }: HeadingProps) => (
  <StyledText as="h3" fontWeight="semibold" fontSize="fontSize400" {...props} />
);

export const H4 = ({ className, ...props }: HeadingProps) => (
  <StyledText as="h4" fontWeight="normal" fontSize="fontSize300" {...props} />
);
