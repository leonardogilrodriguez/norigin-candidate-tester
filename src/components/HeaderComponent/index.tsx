import Link from "next/link";
import BackButton from "../BackButton";
import Image from "next/image";
import styles from './header.module.css';

const HeaderComponent = () => {
  return (
    <div className={styles.wrapper}>
      <div><BackButton /></div>
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="Norigin Media Logo" title="Norigin Media Logo" loading={'eager'} width={50} height={50} />
          <h1>Norigin Media EPG</h1>
        </Link>
      </div>
    </div>
  );
}

export default HeaderComponent;