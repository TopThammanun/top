import type { Profile } from "@/content/types";

export function fullName(profile: Profile): string {
  return `${profile.givenName} ${profile.familyName}`;
}

export function alternateNames(profile: Profile): string[] {
  return [profile.handle, profile.displayName, profile.nickname];
}

export function resumeFileName(profile: Profile): string {
  return `${fullName(profile).replaceAll(" ", "-")}-Resume.pdf`;
}
