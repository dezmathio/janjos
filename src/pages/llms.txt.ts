// llms.txt (https://llmstxt.org): a plain-markdown map of the site, built from
// the content collections so new projects and decisions show up on their own.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, byDateDesc, formatYear, isScratch, sortBench, statusLabel } from '../utils/projects';

const page = (path: string) => new URL(path, SITE.url).href;

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');
  const bench = sortBench(projects.filter((project) => !isScratch(project)));
  const scratch = sortBench(projects.filter(isScratch));
  const decisions = (await getCollection('decisions')).sort(byDateDesc);

  const projectLine = (project: (typeof projects)[number]) =>
    `- [${project.data.title}](${page(`projects/${project.id}/`)}): ${project.data.subtitle}. Status: ${statusLabel(project.data.status).toLowerCase()}.`;

  const contact = [
    `- [Email](mailto:${SITE.email})`,
    `- [GitHub](${SITE.github})`,
    `- [X](${SITE.twitter})`,
    `- [Discord](${SITE.discord})`,
    ...(SITE.linkedin ? [`- [LinkedIn](${SITE.linkedin})`] : []),
  ];

  const lines = [
    `# ${SITE.author}`,
    '',
    `> The personal R&D lab of ${SITE.author}: experiments, tools, and the occasional product, each with an honest status label.`,
    '',
    "I'm Josiah Anjos, currently in Burke, VA. I grew up in Portugal and have been building software since I was a teenager, working up from Automation Engineer to Software Engineer to Senior Full Stack Software Engineer. This site is my lab notebook: what I built, what I shelved, and sometimes why. The statuses are honest. Live means you can use it. Archived means I stopped, and the page says why.",
    '',
    '## Projects',
    '',
    ...bench.map(projectLine),
    '',
    '## Scratch',
    '',
    'One-offs and scripts that run on my machine. Not products, and they know it.',
    '',
    ...scratch.map(projectLine),
    '',
    '## Decisions',
    '',
    'Short notes on why things were built the way they were.',
    '',
    `- [All decisions](${page('decisions/')})`,
    ...decisions.map(
      (decision) =>
        `- [${decision.data.title}](${page(`decisions/${decision.id}/`)}) (${formatYear(decision.data.date)})`,
    ),
    '',
    '## About',
    '',
    `- [About](${page('about/')}): who I am, in three paragraphs.`,
    `- [Resume](${page('resume.pdf')}): the same story with dates.`,
    '',
    '## Contact',
    '',
    ...contact,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
