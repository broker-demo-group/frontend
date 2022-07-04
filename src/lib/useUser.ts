import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { User } from '../pages/api/user'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')

  useEffect(() => {
    console.log(`redirectTo: ${redirectTo}, !redirectIfFound: ${!redirectIfFound}, !user?.isLoggedIn: ${!user?.isLoggedIn}`);
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    console.log(`(redirectTo && !redirectIfFound && !user?.isLoggedIn): ${(redirectTo && !redirectIfFound && !user?.isLoggedIn) }`);
    console.log(`(!redirectTo || !user): ${(!redirectTo || !user)}`);
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      console.log('lets redirect to login page');
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
