import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Activity = CollectionEntry<'activity'>;
export type Decision = CollectionEntry<'decisions'>;

export type Status =
  | 'idea'
  | 'prototype'
  | 'active'
  | 'live'
  | 'archived'
  | 'research';

export type Kind = 'experiment' | 'tool' | 'product' | 'research';

export const SITE = {
  name: 'Josiah Lab',
  author: 'Josiah Anjos',
  domain: 'janjos.lol',
  url: 'https://janjos.lol',
  github: 'https://github.com/dezmathio',
  twitter: 'https://x.com/dezmathio',
  email: 'dezmathio@gmail.com',
  discord: 'https://discord.gg/Rfetrryfp',
  description:
    'Personal R&D lab and engineering notebook. Experiments, tools, and the occasional product.',
} as const;

export function isFootnote(project: Project): boolean {
  return project.data.status === 'archived';
}

export function isScratch(project: Project): boolean {
  return Boolean(project.data.scratch) && project.data.status !== 'archived';
}

const statusRank = {
  live: 0,
  active: 1,
  prototype: 2,
  research: 3,
  idea: 4,
  archived: 5,
} as const satisfies Record<Status, number>;

export function byDateDesc(a: { data: { date: Date } }, b: { data: { date: Date } }): number {
  return b.data.date.valueOf() - a.data.date.valueOf();
}

export function sortBench(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (Boolean(a.data.pin) !== Boolean(b.data.pin)) {
      return a.data.pin ? -1 : 1;
    }
    if (Boolean(a.data.featured) !== Boolean(b.data.featured)) {
      return a.data.featured ? -1 : 1;
    }
    const rank = statusRank[a.data.status] - statusRank[b.data.status];
    if (rank !== 0) return rank;
    return b.data.updated.valueOf() - a.data.updated.valueOf();
  });
}

export function uniqueKinds(projects: Project[]): Kind[] {
  const present = new Set(projects.map((project) => project.data.kind));
  const order = ['experiment', 'tool', 'product', 'research'] as const;
  return order.filter((kind) => present.has(kind));
}

export function kindLabel(kind: Kind): string {
  switch (kind) {
    case 'experiment':
      return 'Experiments';
    case 'tool':
      return 'Tools';
    case 'product':
      return 'Products';
    case 'research':
      return 'Research';
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

export function statusLabel(status: Status): string {
  return `${status.at(0)?.toUpperCase() ?? ''}${status.slice(1)}`;
}

export function formatYear(date: Date): string {
  return String(date.getUTCFullYear());
}

export function decisionsForProject(decisions: Decision[], projectId: string): Decision[] {
  return decisions.filter((decision) => decision.data.project === projectId).sort(byDateDesc);
}
