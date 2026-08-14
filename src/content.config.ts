import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const status = z.enum([
  'idea',
  'prototype',
  'active',
  'live',
  'archived',
  'research',
]);

const kind = z.enum(['experiment', 'tool', 'product', 'research']);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    status,
    kind,
    date: z.coerce.date(),
    updated: z.coerce.date(),
    tags: z.array(z.string()),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    notes: z.string().optional(),
    featured: z.boolean().optional(),
    pin: z.boolean().optional(),
    scratch: z.boolean().optional(),
  }),
});

const activity = defineCollection({
  loader: file('./src/content/activity/log.json'),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    summary: z.string().optional(),
    href: z.string().optional(),
  }),
});

const decisions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/decisions' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    project: z.string().optional(),
  }),
});

export const collections = { projects, activity, decisions };
