// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/resume-builder': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../routes/resume-builder').default>>>>
    }
  }
}
export {}