"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authConfig } from "@/libs/config";
import { Button, type ButtonProps } from "./Button";

/**
 * User Avatar Component
 */
const UserAvatar = ({ user }: { user: any }) => {
  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={user.name || "Account"}
        className="w-6 h-6 rounded-full shrink-0"
        referrerPolicy="no-referrer"
        width={24}
        height={24}
      />
    );
  }

  return (
    <span className="w-6 h-6 bg-secondary-300 flex justify-center items-center rounded-full shrink-0 text-sm font-medium">
      {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
    </span>
  );
};

export interface ButtonSigninProps extends Omit<ButtonProps, 'onClick' | 'loading'> {
  /**
   * Text to display when user is not signed in
   */
  text?: string;
  
  /**
   * Text to display when user is signed in
   */
  textLoggedIn?: string;
  
  /**
   * Show user avatar when signed in
   */
  showAvatar?: boolean;
  
  /**
   * Custom callback URL after sign in
   */
  callbackUrl?: string;
  
  /**
   * OAuth provider to use for sign in
   */
  provider?: string;
  
  /**
   * Callback function called on sign in attempt
   */
  onSignin?: () => void;
}

/**
 * ButtonSignin Component
 * 
 * A specialized button component for user authentication.
 * Handles both sign-in and signed-in states with proper loading and error handling.
 * 
 * @example
 * ```tsx
 * <ButtonSignin 
 *   text="Get Your Free Playbook"
 *   textLoggedIn="Go to Dashboard"
 *   variant="primary"
 *   showAvatar={true}
 * />
 * ```
 */
export const ButtonSignin: React.FC<ButtonSigninProps> = ({
  text = "Get Your Free Playbook",
  textLoggedIn = "Go to Dashboard",
  showAvatar = true,
  callbackUrl,
  provider = "google",
  onSignin,
  variant = "primary",
  size = "md",
  ...buttonProps
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
      router.push(callbackUrl || authConfig.callbackUrl);
    } else {
      onSignin?.();
      signIn(provider, { 
        callbackUrl: callbackUrl || authConfig.callbackUrl 
      });
    }
  };

  // Show loading state during hydration and auth loading
  if (!isClient || status === "loading") {
    return (
      <Button
        variant={variant}
        size={size}
        loading={true}
        disabled={true}
        {...buttonProps}
      >
        Loading...
      </Button>
    );
  }

  // If user is authenticated, show as a link to dashboard
  if (status === "authenticated") {
    return (
      <Link
        href={callbackUrl || authConfig.callbackUrl}
        className="inline-block"
      >
        <Button
          variant={variant}
          size={size}
          startIcon={showAvatar ? <UserAvatar user={session.user} /> : undefined}
          {...buttonProps}
        >
          {textLoggedIn}
        </Button>
      </Link>
    );
  }

  // Show sign-in button for unauthenticated users
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      {...buttonProps}
    >
      {text}
    </Button>
  );
};

export default ButtonSignin;
