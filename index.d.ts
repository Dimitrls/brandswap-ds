export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | 'filled'
  | 'outline'
  | 'filled-warning'
  | 'outline-warning'
  | 'subtle'
  | 'subtle-warning';
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  variant?:
  | 'filled'
  | 'outline'
  | 'subtle'
  | 'warning'
  | 'subtle-warning'
  | 'filled-warning'
  | 'outline-warning';
  sizeVariant?: 'small' | 'medium' | 'large';
}

export function IconButton(props: IconButtonProps): JSX.Element;

export interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  variant?: 'filled' | 'outline';
  sizeVariant?: 'default' | 'large';
  style?: CSSProperties;
}

export function FloatingButton(props: FloatingButtonProps): JSX.Element;

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  variant?: 'neutral' | 'positive' | 'negative' | 'accent1' | 'accent2';
  subtle?: boolean;
}

export function Tag(props: TagProps): JSX.Element;

export interface RemovableTagProps extends TagProps, React.HTMLAttributes<HTMLDivElement> {
  onRemove: () => void;
}

export function RemovableTag(props: RemovableTagProps): JSX.Element;

export const Heading: (props: any) => JSX.Element;
export const BodyText: (props: any) => JSX.Element;
export const Table: (props: any) => JSX.Element;
export const Tabs: (props: any) => JSX.Element;
export const TabsSecondary: (props: any) => JSX.Element;
export const Pagination: (props: any) => JSX.Element;
export const Breadcrumbs: (props: any) => JSX.Element;
export const Tooltip: (props: any) => JSX.Element;
export const Toast: (props: any) => JSX.Element;
export const AlertBanner: (props: any) => JSX.Element;
export const Icon: (props: any) => JSX.Element;
export const Logo: (props: any) => JSX.Element;
export const Uploader: (props: any) => JSX.Element;
export const TextArea: (props: any) => JSX.Element;
export const SwitchNonBinary: (props: any) => JSX.Element;
export const Switch: (props: any) => JSX.Element;
export const Selectbox: (props: any) => JSX.Element;
export const RadioButton: (props: any) => JSX.Element;
export const RadioButtonGroup: (props: any) => JSX.Element;
export const MultiSelectbox: (props: any) => JSX.Element;
export const InputField: (props: any) => JSX.Element;
export const Checkbox: (props: any) => JSX.Element;
export const ShadowPalette: (props: any) => JSX.Element;
export const ColorPalette: (props: any) => JSX.Element;
export const primitiveColors: Record<string, string>;
export const semanticColors: Record<string, string>;
export const TopBar: (props: any) => JSX.Element;
export const SecondBar: (props: any) => JSX.Element;
export const Panel: (props: any) => JSX.Element;
export const Notifications: (props: any) => JSX.Element;
export const NavBar: (props: any) => JSX.Element;
export const FiltersBar: (props: any) => JSX.Element;
export const CompanySelector: (props: any) => JSX.Element;
export const Avatar: (props: any) => JSX.Element;
