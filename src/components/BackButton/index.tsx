'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const BackButton =  () => {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <Link href="/">
      <Image alt={'back'} title={'back'} height={20} width={20} src={'/icons/left-arrow.svg'}></Image>
    </Link>
  );
}

export default BackButton;