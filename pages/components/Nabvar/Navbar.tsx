import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  return (
    <nav>
      <ul>
        <li>
          {" "}
          <Link href="/"> Home </Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="/store"> Store </Link>{" "}
        </li>
        <li>
          <button onClick={toggleUserMenu}> User </button>{" "}
          {/*setUserMenuOpen and open toggle*/}
          {userMenuOpen && (
            <ul className="user-dropdown">
              <li>
                <Link href="/user/config">Settings</Link>
              </li>
              <li>
                <Link href="/user/username">User</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
