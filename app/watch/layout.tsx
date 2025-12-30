import { WatchContainer } from '@/components/watch/WatchContainer';

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WatchContainer>{children}</WatchContainer>;
}
