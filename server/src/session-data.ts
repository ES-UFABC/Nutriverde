/**
 * Session data declarations
 */

declare module "express-session" {
  interface SessionData {
    authenticated: boolean;
    userName: string;
  }
}

export {};
