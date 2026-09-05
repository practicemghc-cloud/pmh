import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/**
 * Pill button. Every measurement below is taken from the Figma buttons:
 *
 * | variant   | fill            | text  | seen in                          |
 * | --------- | --------------- | ----- | -------------------------------- |
 * | primary   | mint + shadow   | ink   | "Book a Call", "Book a Conv…"    |
 * | secondary | surface-2       | ink   | "Send an enquiry"                |
 * | onDark    | white/12        | white | "Explore All Services" (CTA card)|
 *
 * Horizontal padding is asymmetric — the design tightens the side that
 * carries an icon and opens up the opposite side.
 */

type ButtonVariant = "primary" | "secondary" | "onDark";

type ButtonProps = {
  variant?: ButtonVariant;
  /** sm = 15px/py-15 (nav), md = 16px/py-18 (page CTAs). */
  size?: "sm" | "md";
  href?: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  /** White circular chip holding an arrow — the hero's primary button. */
  iconChip?: IconName;
  className?: string;
  children: React.ReactNode;
  /** Works for both the <button> and <Link> renderings. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Section-timeline hooks. Declared explicitly because `...rest` is typed for
   * <button> and so can't be spread onto the <Link> branch — and TypeScript
   * waves hyphenated JSX attributes through unchecked, so a silent drop here
   * would be invisible.
   */
  "data-anim"?: string;
  "data-reveal"?: string;
} & Omit<React.ComponentPropsWithoutRef<"button">, "children" | "className" | "onClick">;

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-mint text-ink shadow-cta hover:brightness-[1.04]",
  secondary: "bg-surface-2 text-ink hover:bg-line/60",
  onDark: "bg-white/12 text-white hover:bg-white/20",
};

export function Button({
  variant = "primary",
  size = "sm",
  href,
  leadingIcon,
  trailingIcon,
  iconChip,
  className,
  children,
  onClick,
  "data-anim": dataAnim,
  "data-reveal": dataReveal,
  ...rest
}: ButtonProps) {
  const padY = iconChip ? "py-[12px]" : size === "sm" ? "py-[15px]" : "py-[18px]";
  const padX = iconChip
    ? "pl-[12px] pr-[28px]"
    : leadingIcon
      ? "pl-[26px] pr-[30px]"
      : trailingIcon
        ? "pl-[30px] pr-[26px]"
        : "px-[26px]";

  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold leading-[1.1]",
    "transition-[filter,background-color,transform] duration-200 active:scale-[0.98]",
    iconChip ? "gap-[14px]" : "gap-[10px]",
    size === "sm" ? "text-[15px]" : "text-[16px]",
    padY,
    padX,
    VARIANTS[variant],
    className,
  );

  const inner = (
    <>
      {iconChip && (
        <span className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-white text-ink">
          <Icon name={iconChip} size={20} />
        </span>
      )}
      {leadingIcon && <Icon name={leadingIcon} />}
      <span className="whitespace-nowrap">{children}</span>
      {trailingIcon && <Icon name={trailingIcon} />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        data-anim={dataAnim}
        data-reveal={dataReveal}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      data-anim={dataAnim}
      data-reveal={dataReveal}
      {...rest}
    >
      {inner}
    </button>
  );
}
