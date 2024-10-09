import { defineUserSignupFields } from 'wasp/auth/providers/types';
import { Manageawsuser } from './users/users';

const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];

const isValidEmail = (email : any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const getEmailUserFields = defineUserSignupFields({
  username: (data: any) => {
    const username = data.email;
    Manageawsuser(username);
    return username;  // Returning username for consistency
  },
  isAdmin: (data: any) => adminEmails.map(email => email.toLowerCase()).includes(data.email.toLowerCase()),
  email: (data: any) => {
    if (!isValidEmail(data.email)) {
      throw new Error("Invalid email format");
    }
    return data.email;
  },
});

export const getGitHubUserFields = defineUserSignupFields({
  email: (data: any) => data.profile.emails?.[0]?.email || '',
  username: (data: any) => data.profile.login,
  isAdmin: (data: any) => adminEmails.map(email => email.toLowerCase()).includes(data.profile.emails?.[0]?.email.toLowerCase()),
});

export function getGitHubAuthConfig() {
  return {
    scopes: ['user'],
  };
}

export const getGoogleUserFields = defineUserSignupFields({
  email: (data: any) => data.profile.email,
  username: (data: any) => data.profile.name,
  isAdmin: (data: any) => adminEmails.map(email => email.toLowerCase()).includes(data.profile.email.toLowerCase()),
});

export function getGoogleAuthConfig() {
  return {
    scopes: ['profile', 'email'],
  };
}
