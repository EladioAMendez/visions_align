/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import config from "@/config";

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = ({
  text = "Get Your Free Playbook",
  textLoggedIn = "Go to Dashboard",
  extraStyle,
}: {
  text?: string;
  textLoggedIn?: string;
  extraStyle?: string;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  // Ensure this only renders on client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    if (status === "authenticated") {
      router.push(config.auth.callbackUrl);
    } else {
      signIn("google", { callbackUrl: config.auth.callbackUrl });
    }
  };

  // Show loading state during hydration to prevent flash
  if (!isClient || status === "loading") {
    return (
      <button
        className={`btn ${extraStyle ? extraStyle : ""}`}
        disabled
      >
        <span className="loading loading-spinner loading-sm"></span>
        Loading...
      </button>
    );
  }

  if (status === "authenticated") {
    return (
      <Link
        href={config.auth.callbackUrl}
        className={`btn ${extraStyle ? extraStyle : ""}`}
      >
        {session.user?.image ? (
          <img
            src={session.user?.image}
            alt={session.user?.name || "Account"}
            className="w-6 h-6 rounded-full shrink-0"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        ) : (
          <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full shrink-0">
            {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
          </span>
        )}
        {textLoggedIn}
      </Link>
    );
  }

  return (
    <button
      className={`btn ${extraStyle ? extraStyle : ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ButtonSignin;
