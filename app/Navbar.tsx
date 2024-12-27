"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import {Skeleton} from "@/app/components";

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

// SUB COMPONENT
const NavLinks = () => {
  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  const currentPath = usePathname();
  return (
    <ul className=" flex space-x-6">
      {navLinks.map((link) => (
        <li
          key={link.href}
          className={classnames({
            "nav-link": true,
            "!text-zinc-900": link.href === currentPath,
          })}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  // with useSession() we can get access to the current authentication session
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width={'3rem'} />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href={"/api/auth/signin"}>
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            radius="full"
            className="cursor-pointer"
            // referrerPolicy prop helps to get avatar/img from google
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={"3"}>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={"/api/auth/signout"}>Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
