import type { IconName } from '@/lib/content';

const paths: Record<IconName | 'arrow' | 'check' | 'send' | 'close' | 'spark' | 'plus' | 'mail', string> = {
  bot: 'M12 3v3M8 21h8M5 10a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-6ZM9.5 13h.01M14.5 13h.01M2 13v2M22 13v2',
  code: 'm8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14',
  plug: 'M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0V7ZM12 17v5',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM15.5 8.5l-2 5-5 2 2-5 5-2Z',
  chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12ZM8.5 12h.01M12 12h.01M15.5 12h.01',
  funnel: 'M3 4h18l-7 8.5V19l-4 2v-8.5L3 4Z',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  pen: 'M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4ZM13.5 6.5l4 4',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'm5 12 5 5 9-10',
  send: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z',
  close: 'M6 6l12 12M18 6 6 18',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z',
  plus: 'M12 5v14M5 12h14',
  mail: 'M3 6h18v12H3V6Zm0 0 9 7 9-7',
};

export type AnyIcon = keyof typeof paths;

export default function Icon({ name, size = 22, className }: { name: AnyIcon; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
