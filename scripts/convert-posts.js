import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '../posts');
const SKIP_FILES = ['example-multilingual-post.md'];

// English translations for titles and descriptions
//These are human-quality translations based on the content
const TRANSLATIONS = {
  '12-dicas-de-javascript-que-todo-desenvolvedor-deve-conhecer.md': {
    title: '12 JavaScript Tips Every Developer Should Know',
    description: 'Today I want to share with you 12 super useful tips that can significantly improve your programming skills and project development efficiency'
  },
  '3-tecnicas-pessoais-que-transformaram-minha-carreira-em-desenvolvimento.md': {
    title: '3 Personal Techniques That Transformed My Development Career',
    description: 'You know when you start coding and just want things to work? Well, there are three things that, if you start using them now, will level up your code quickly'
  },
  'a-saga-do-tb-303-do-esquecimento-ao-estrelato-eletronico.md': {
    title: 'The TB-303 Saga: From Obscurity to Electronic Stardom',
    description: 'Celebrating 303 Day, let\'s explore the incredible journey of the TB-303, a device that not only revolutionized electronic music but also became a symbol of innovation and resilience, drawing parallels with Software Development'
  },
  'como-filtrar-um-objeto-no-javascript.md': {
    title: 'How to Filter an Object in JavaScript',
    description: 'Unfortunately, JavaScript objects don\'t have a filter() function. But that doesn\'t mean you can\'t use filter() to filter objects, you just need to be able to iterate over an object and convert it to an array using Object.entries()'
  },
  'como-publicar-um-projeto-next-js-no-github-pages.md': {
    title: 'How to Publish a Next.js Project on GitHub Pages',
    description: 'In this article, I will guide you through the process of publishing a Next.js project on GitHub Pages'
  },
  'descomplicando-o-graphql-no-wordpress-qual-e-o-significado-de-edges-e-node.md': {
    title: 'Demystifying GraphQL in WordPress: What do "edges" and "node" mean?',
    description: 'You\'re consuming a GraphQL endpoint and the return has "edges" and "node". You\'re providing a clean JSON structure for the query and it seems like WPGraphQL is polluting your data without any obvious benefit. And you wonder why these terms are included in the GraphQL endpoint response and if it\'s possible to get rid of them for a simpler data return?'
  },
  'dominando-os-atalhos-do-javascript.md': {
    title: 'Mastering JavaScript Shortcuts 😈',
    description: 'Today, our focus is on shortcuts that I like to call JavaScript "tricks" - techniques that help make your code cleaner and more effective'
  },
  'dstrb-0130-lucaos-kaique.md': {
    title: 'DSTRB:0130 - Lucaos Kaique',
    description: 'Set recorded for electronic music collective from Floripa - SC, Brazil'
  },
  'lidando-com-projetos-wordpress-quando-voce-nao-e-especialista-wpgraphql-ou-rest-api-para-headless-wordpress.md': {
    title: 'Dealing with WordPress Projects When You\'re Not an Expert: WPGraphQL or REST API for Headless WordPress',
    description: 'Imagine you got a client and this client has a WordPress site, but you don\'t work with WordPress and still want to close the deal, what do you do? Well, that\'s what happened to me and it can happen to you, so in this post let\'s talk a bit about this case study'
  },
  'my-git-cheatsheet.md': {
    title: 'My Git Cheatsheet',
    description: 'My personal Git cheatsheet with common commands and workflows'
  },
  'o-impacto-revolucionário-de-softwares-p-2-p-na-cena-musical.md': {
    title: 'The Revolutionary Impact of P2P Software on the Music Scene',
    description: 'This post explores the P2P software concept and its profound impact on the DJ and music community'
  },
  'quando-usar-ssg-vs-ssr-no-next-js-uma-duvida-sincera-para-um-caso-real.md': {
    title: 'When to Use SSG vs SSR in Next.js: An Honest Question for a Real Case',
    description: 'Today I woke up with a doubt I had during the development of a client\'s website: when to use Server-Side Rendering (SSR) and when to use Static Site Generation (SSG) in Next.js?'
  },
  'react-voce-esta-usando-useeffect-errado.md': {
    title: 'React: You\'re Using useEffect() Wrong',
    description: 'React: You\'re Using useEffect() Wrong, Do This Instead'
  },
  'uk-garage-em-2023.md': {
    title: 'UK Garage in 2023: Continuous Transformation and Vibrant Reinvention',
    description: 'UK Garage has maintained its relevance, always evolving and reinventing itself to win over new generations of music lovers'
  }
};

function convertPost(filename) {
  const filepath = path.join(POSTS_DIR, filename);

  console.log(`\nProcessing: ${filename}`);

  // Read the file
  const fileContents = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(fileContents);

  // Check if already in i18n format
  if (data['pt-BR'] || data['en']) {
    console.log(`✓ Skipping ${filename} - already in i18n format`);
    return;
  }

  // Get translations
  const translations = TRANSLATIONS[filename];
  if (!translations) {
    console.log(`⚠ No translation found for ${filename}, skipping...`);
    return;
  }

  // Extract title and description
  const titlePt = data.title;
  const descriptionPt = data.description;

  // Remove title and description from root
  delete data.title;
  delete data.description;

  // Create i18n structure
  data['pt-BR'] = {
    title: titlePt,
    description: descriptionPt,
    body: content
  };

  data['en'] = {
    title: translations.title,
    description: translations.description,
    body: content // For now, keep Portuguese body - user can translate progressively
  };

  // Write back
  const newContent = matter.stringify('', data);
  fs.writeFileSync(filepath, newContent);

  console.log(`✓ Converted ${filename}`);
}

function main() {
  console.log('Starting i18n conversion...\n');

  // Get all markdown files
  const files = fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.md') && !SKIP_FILES.includes(file));

  console.log(`Found ${files.length} posts to process\n`);

  files.forEach(file => {
    try {
      convertPost(file);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  });

  console.log('\n✓ Conversion complete!');
  console.log('\nNote: The English "body" field contains the Portuguese text.');
  console.log('You can gradually translate the content or use the CMS to edit it.\n');
}

main();
