export type CardPaddingOptions =
  | 'space100'
  | 'space200'
  | 'space300'
  | 'space400'
  | 'space500'
  | 'space600'
  | 'space700';

export interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The contents of the card. Can be any valid HTML or React components.*/
  children: React.ReactNode;
  /** Removes the border from the card. */
  borderless?: boolean;
  /** Sets the padding for the card. */
  padding?: CardPaddingOptions;
  /** Sets the bottom padding for the card. */
  paddingBottom?: CardPaddingOptions;
  /** Sets the left padding for the card. */
  paddingLeft?: CardPaddingOptions;
  /** Sets the right padding for the card. */
  paddingRight?: CardPaddingOptions;
  /** Sets the top padding for the card. */
  paddingTop?: CardPaddingOptions;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The contents of the card header. Can be any valid HTML or React components.*/
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The contents of the card footer. Can be any valid HTML or React components.*/
  children: React.ReactNode;
}

export interface CardProps extends CardBaseProps {
  useCollapse?: boolean;
}
