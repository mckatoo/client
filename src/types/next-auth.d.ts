import 'next-auth'
import { Url } from 'node:url'

declare module 'next-auth/client' {
  export * from 'next-auth/client'

  interface SignOutResponse {
    url: Url
  }

  export function signout(data?: {
    callbackUrl?: string
    redirect?: boolean
  }): Promise<SignOutResponse>

  export const signOut: typeof signout
}
