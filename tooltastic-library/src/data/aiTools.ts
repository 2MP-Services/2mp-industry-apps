export interface AITool {
  id: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  websiteUrl: string;
  thumbnailUrl: string;
  featured?: boolean;
  isFree?: boolean;
  price?: string;
}

export type Category =
  | 'NLP'
  | 'Computer Vision'
  | 'Code Generation'
  | 'Design'
  | 'Audio'
  | 'Productivity'
  | 'Content Creation'
  | 'Software Development'
  | 'Software Development & Code Generation'
  | 'Web Development & UI/UX Design'
  | 'Marketing & Content Creation'
  | 'Graphic Design & Image Editing'
  | 'Video Editing & Animation'
  | 'Audio & Speech Processing'
  | 'Mechanical Engineering & 3D Design'
  | 'Electronics Engineering & Embedded Systems'
  | 'Hardware & Robotics'
  | 'Manufacturing & CNC Programming'
  | 'Drones & Aerospace'
  | 'Compatibility & API Integration'
  | 'API Integration'
  | 'Finance & Accounting'
  // Newly added categories from the knowledge base
  | 'Data Analysis'
  | 'Business Intelligence'
  | 'E-commerce'
  | 'Virtual Reality'
  | 'Gaming'
  | 'Film & Animation'
  | 'Education & Training'
  | 'Workforce Training'
  | 'Investment'
  | 'Mergers & Acquisitions (M&A)'
  | 'Venture Capital (VC)'
  | 'Private Equity (PE)'
  | 'Presentation Creation'
  | 'Image Generation'
  | 'Text-to-Image'
  | 'Image Editing'
  | 'Inpainting & Outpainting'
  | 'Face Swapping'
  | 'Music Generation'
  | 'AI Avatars'
  | 'Audio Chat'
  | 'Personal Development'
  | 'Entertainment'
  | 'AR & 3D Visualization'
  | '3D Modeling'
  | 'WebAR'
  | 'Animation'
  | 'Media Generation'
  | 'NSFW Content Creation'
  | 'Photorealistic Image Creation'
  | 'Text-to-Video'
  | 'Video Editing'
  | 'Real-Time Video Generation'
  | 'Responsive Web Design'
  | 'Customer Service Automation'
  | 'Automation'
  | 'Strategic Decision-Making'
  | 'Lead Prospecting'
  | 'Web Scraping'
  | 'Email Automation'
  | 'Multilingual Content'
  | 'Data Transformation'
  | '3D Gaussians'
  | 'Radiance Fields'
  | 'Mesh Generation'
  | 'Creative Transformation'
  | 'Generative AI'
  | 'Visual Storytelling'
  | 'Storytelling'
  | 'Digital Art'
  | 'Concept Art'
  | 'AI Creativity Tools';

export const categories: Category[] = [
  'NLP',
  'Computer Vision',
  'Code Generation',
  'Design',
  'Audio',
  'Productivity',
  'Content Creation',
  'Software Development',
  'Software Development & Code Generation',
  'Web Development & UI/UX Design',
  'Marketing & Content Creation',
  'Graphic Design & Image Editing',
  'Video Editing & Animation',
  'Audio & Speech Processing',
  'Mechanical Engineering & 3D Design',
  'Electronics Engineering & Embedded Systems',
  'Hardware & Robotics',
  'Manufacturing & CNC Programming',
  'Drones & Aerospace',
  'Compatibility & API Integration',
  'API Integration',
  'Finance & Accounting',
  // Newly added categories
  'Data Analysis',
  'Business Intelligence',
  'E-commerce',
  'Virtual Reality',
  'Gaming',
  'Film & Animation',
  'Education & Training',
  'Workforce Training',
  'Investment',
  'Mergers & Acquisitions (M&A)',
  'Venture Capital (VC)',
  'Private Equity (PE)',
  'Presentation Creation',
  'Image Generation',
  'Text-to-Image',
  'Image Editing',
  'Inpainting & Outpainting',
  'Face Swapping',
  'Music Generation',
  'AI Avatars',
  'Audio Chat',
  'Personal Development',
  'Entertainment',
  'AR & 3D Visualization',
  '3D Modeling',
  'WebAR',
  'Animation',
  'Media Generation',
  'NSFW Content Creation',
  'Photorealistic Image Creation',
  'Text-to-Video',
  'Video Editing',
  'Real-Time Video Generation',
  'Responsive Web Design',
  'Customer Service Automation',
  'Automation',
  'Strategic Decision-Making',
  'Lead Prospecting',
  'Web Scraping',
  'Email Automation',
  'Multilingual Content',
  'Data Transformation',
  '3D Gaussians',
  'Radiance Fields',
  'Mesh Generation',
  'Creative Transformation',
  'Generative AI',
  'Visual Storytelling',
  'Storytelling',
  'Digital Art',
  'Concept Art',
  'AI Creativity Tools'
];

export const teamToCategoriesMap = {
  "marketing": [
    'Marketing',
    'Marketing & Content Creation',
    'Content Creation',
    'Graphic Design',
    'Graphic Design & Image Editing',
    'Video Editing',
    'Video Editing & Animation',
    'Presentation Creation',
    'Image Generation',
    'Text-to-Image',
    'Media Generation',
    'Photorealistic Image Creation',
    'AI Creativity Tools'
  ],
  "mechanics": [
    'Mechanical Engineering',
    'Mechanical Engineering & 3D Design',
    'Manufacturing',
    'Manufacturing & CNC Programming',
    'Design',
    'Drones & Aerospace',
    'Drones & Aerospace',
    'AR & 3D Visualization',
    '3D Modeling',
    '3D Gaussians',
    'Mesh Generation'
  ],
  "electronics": [
    'Electronics Engineering',
    'Electronics Engineering & Embedded Systems',
    'Hardware & Robotics',
    'Hardware & Robotics',
    'Drones & Aerospace',
    'Drones & Aerospace',
    'Embedded Systems',
    'Robotics',
    'Sensor Integration'
  ],
  "development": [
    'Software Development',
    'Code Generation',
    'Software Development & Code Generation',
    'Web Development',
    'Web Development & UI/UX Design',
    'API Integration',
    'Compatibility & API Integration',
    'Generative AI',
    'AI Avatars',
    'Automation',
    'Creative Transformation'
  ],
  "hr": [
    'Productivity',
    'Content Creation',
    'Education & Training',
    'Workforce Training',
    'Personal Development'
  ],
  "finance": [
    'Finance & Accounting',
    'Productivity',
    'API Integration',
    'Software Development',
    'Investment',
    'Mergers & Acquisitions (M&A)',
    'Venture Capital (VC)',
    'Private Equity (PE)',
    'Strategic Decision-Making'
  ],
  "management": [
    'Productivity',
    'Content Creation',
    'API Integration',
    'Lead Prospecting',
    'Web Scraping',
    'Email Automation',
    'Data Transformation',
    'Business Intelligence'
  ],
  // New teams from knowledge base
  "creative": [
    'Graphic Design & Image Editing',
    'Image Generation',
    'Text-to-Image',
    'Image Editing',
    'Inpainting & Outpainting',
    'Face Swapping',
    'Digital Art',
    'Concept Art',
    'Photorealistic Image Creation',
    'Animation',
    'Video Editing',
    'Real-Time Video Generation',
    'Visual Storytelling',
    'Storytelling',
    'AI Creativity Tools'
  ],
  "dataScience": [
    'Data Analysis',
    'Business Intelligence',
    'Data Transformation',
    'Lead Prospecting',
    'Web Scraping',
    'Email Automation',
    'API Integration',
    'Automation'
  ],
  "mediaProduction": [
    'Animation',
    'Video Editing',
    'Text-to-Video',
    'Real-Time Video Generation',
    'Visual Storytelling',
    'Storytelling',
    'Media Generation',
    'Music Generation',
    'Face Swapping',
    'NSFW Content Creation'
  ],
  "research": [
    'Strategic Decision-Making',
    'Investment',
    'Mergers & Acquisitions (M&A)',
    'Venture Capital (VC)',
    'Private Equity (PE)',
    'Business Intelligence',
    'Data Transformation'
  ]
};

export const aiTools: AITool[] = [
  // NLP Category
  {
    id: '11',
    name: 'Claude',
    description: 'A versatile AI assistant that can tackle complex tasks with a focus on safety and helpfulness.',
    category: 'NLP',
    tags: ['chatbot', 'language model', 'research'],
    websiteUrl: 'https://anthropic.com/claude',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/anthropic.svg'
  },
  {
    id: '101',
    name: 'GPT-4o',
    description: 'La dernière génération du modèle de langage d\'OpenAI avec des capacités multimodales et une compréhension contextuelle améliorée.',
    category: 'NLP',
    tags: ['multimodal', 'AI avancée', 'traitement de langage'],
    websiteUrl: 'https://openai.com/gpt-4o',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg'
  },
  {
    id: '102',
    name: 'Llama 3',
    description: 'Modèle de langage open source de Meta conçu pour être plus accessible et transparent pour les développeurs et chercheurs.',
    category: 'NLP',
    tags: ['open source', 'modèle de langage', 'IA éthique'],
    websiteUrl: 'https://ai.meta.com/llama/',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/meta.svg'
  },
  {
    id: '103',
    name: 'Gemini',
    description: 'Modèle multimodal de Google DeepMind qui excelle dans la compréhension combinée de texte, d\'images et d\'autres modalités.',
    category: 'NLP',
    tags: ['multimodal', 'Google', 'IA générative'],
    websiteUrl: 'https://deepmind.google/technologies/gemini/',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg'
  },
  {
    id: '104',
    name: 'Mistral',
    description: 'Modèle de langage français de pointe offrant un excellent rapport performance/taille pour diverses applications.',
    category: 'NLP',
    tags: ['français', 'efficace', 'modèle de langage'],
    websiteUrl: 'https://mistral.ai/',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=800&q=80'
  },

  // Computer Vision Category
  {
    id: '2',
    name: 'DALLE-3',
    description: 'Cutting-edge AI system that can create realistic images and art from natural language descriptions.',
    category: 'Computer Vision',
    tags: ['image generation', 'art', 'creative'],
    websiteUrl: 'https://openai.com/dall-e-3',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg',
    featured: true
  },
  {
    id: '4',
    name: 'Midjourney',
    description: 'A powerful AI art generator that creates stunning imagery from textual descriptions.',
    category: 'Computer Vision',
    tags: ['image generation', 'art', 'creative'],
    websiteUrl: 'https://midjourney.com',
    thumbnailUrl: 'https://valasys.com/wp-content/uploads/2023/07/What-Is-Midjourney-AI-and-How-Does-It-Work-1.jpg'
  },
  {
    id: '9',
    name: 'Runway',
    description: 'Creative toolkit powered by AI that offers video editing, generation, and visual effects capabilities.',
    category: 'Computer Vision',
    tags: ['video editing', 'visual effects', 'content creation'],
    websiteUrl: 'https://runwayml.com',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxDcGFaouIAaUfawIIsLvKya3V91OgFuQ4CQ&s'
  },
  {
    id: '201',
    name: 'Stable Diffusion',
    description: 'Modèle open source de génération d\'images qui peut être exécuté localement sur du matériel grand public.',
    category: 'Computer Vision',
    tags: ['génération d\'images', 'open source', 'local'],
    websiteUrl: 'https://stability.ai/',
    thumbnailUrl: 'data:image/jpeg;base64,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'
  },
  {
    id: '202',
    name: 'Lensa',
    description: 'Application qui utilise l\'IA pour créer des avatars artistiques et retoucher des portraits de manière professionnelle.',
    category: 'Computer Vision',
    tags: ['retouche photo', 'avatar', 'portraits'],
    websiteUrl: 'https://prisma-ai.com/lensa',
    thumbnailUrl: 'https://static.wixstatic.com/media/87fe73_e1ea4b5e3dc04b47a5a943752381b188~mv2.png'
  },
  {
    id: '203',
    name: 'Leonardo.AI',
    description: 'Plateforme de génération d\'images AI qui permet aux créateurs de produire des visuels de qualité pour le gaming et la fiction.',
    category: 'Computer Vision',
    tags: ['gaming', 'art conceptuel', 'illustrations'],
    websiteUrl: 'https://leonardo.ai/',
    thumbnailUrl: 'https://www.bworldonline.com/wp-content/uploads/2024/07/Leonardo-AI-logo.jpg'
  },
  {
    id: '204',
    name: 'Imagen',
    description: 'Technologie de Google DeepMind pour la génération d\'images photoréalistes à partir de descriptions textuelles.',
    category: 'Computer Vision',
    tags: ['photoréalisme', 'Google', 'génération d\'images'],
    websiteUrl: 'https://deepmind.google/technologies/imagen/',
    thumbnailUrl: 'https://www.dpreview.com/files/p/articles/7952219469/google-imagen-brain-toronto-skyline.jpeg'
  },

  // Code Generation Category
  {
    id: '301',
    name: 'Replit Ghostwriter',
    description: 'Assistant de programmation intégré à l\'IDE Replit qui aide à générer du code, déboguer et expliquer les concepts.',
    category: 'Code Generation',
    tags: ['IDE', 'autocomplétion', 'débogage'],
    websiteUrl: 'https://replit.com/site/ghostwriter',
    thumbnailUrl: 'https://cdn.arstechnica.net/wp-content/uploads/2022/10/ghostwriter_hero.jpg'
  },
  {
    id: '302',
    name: 'Amazon CodeWhisperer',
    description: 'Assistant de codage basé sur le machine learning qui génère des recommandations de code en temps réel.',
    category: 'Code Generation',
    tags: ['AWS', 'suggestions de code', 'développement'],
    websiteUrl: 'https://aws.amazon.com/codewhisperer/',
    thumbnailUrl: 'https://www.tabnine.com/wp-content/uploads/2023/07/Codewhisperer.png'
  },
  {
    id: '303',
    name: 'Tabnine',
    description: 'Outil d\'autocomplétion de code qui apprend vos motifs de codage pour fournir des suggestions personnalisées.',
    category: 'Code Generation',
    tags: ['autocomplétion', 'personnalisation', 'productivité'],
    websiteUrl: 'https://www.tabnine.com/',
    thumbnailUrl: 'https://avatars.githubusercontent.com/u/6810259?s=200&v=4'
  },
  {
    id: '304',
    name: 'Codeium',
    description: 'Alternative gratuite à GitHub Copilot qui offre une assistance de codage par IA dans de nombreux langages et IDE.',
    category: 'Code Generation',
    tags: ['gratuit', 'multi-langage', 'assistance de code'],
    websiteUrl: 'https://codeium.com/',
    thumbnailUrl: 'https://avatars.githubusercontent.com/u/87784615?s=200&v=4'
  },

  // Design Category
  {
    id: '8',
    name: 'Figma AI',
    description: 'AI-powered design tools integrated into Figma to help designers create and iterate faster.',
    category: 'Design',
    tags: ['UI design', 'prototyping', 'design tools'],
    websiteUrl: 'https://figma.com',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg'
  },
  {
    id: '401',
    name: 'Canva AI',
    description: 'Suite d\'outils d\'IA intégrés à Canva pour la création de textes, d\'images et de designs variés.',
    category: 'Design',
    tags: ['accessibilité', 'design graphique', 'marketing'],
    websiteUrl: 'https://www.canva.com/ai-image-generator/',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/canva.svg'
  },
  {
    id: '402',
    name: 'Adobe Firefly',
    description: 'Ensemble d\'outils créatifs d\'Adobe qui utilisent l\'IA générative tout en respectant les droits d\'auteur.',
    category: 'Design',
    tags: ['Adobe', 'création éthique', 'génération d\'images'],
    websiteUrl: 'https://www.adobe.com/products/firefly.html',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobe.svg'
  },
  {
    id: '403',
    name: 'Uizard',
    description: 'Plateforme qui transforme des croquis à main levée en designs d\'interface utilisateur fonctionnels.',
    category: 'Design',
    tags: ['UI/UX', 'prototypage', 'wireframes'],
    websiteUrl: 'https://uizard.io/',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPy8rydMu4Ns2O0a8h3KWnSLEHEv1VuiJ1-A&s'
  },
  {
    id: '404',
    name: 'Framer AI',
    description: 'Fonctionnalités d\'IA dans Framer qui permettent de créer des sites web et des prototypes à partir de simples instructions textuelles.',
    category: 'Design',
    tags: ['sites web', 'prototypes', 'no-code'],
    websiteUrl: 'https://www.framer.com/',
    thumbnailUrl: 'https://images.sftcdn.net/images/t_app-cover-s,f_auto/p/145c767d-85d4-4be1-a8f5-6330ff198499/3489336209/framer-screenshot'
  },

  // Audio Category
  {
    id: '7',
    name: 'Whisper',
    description: 'Advanced speech recognition system with multilingual capabilities and high accuracy transcription.',
    category: 'Audio',
    tags: ['speech to text', 'transcription', 'voice recognition'],
    websiteUrl: 'https://openai.com/research/whisper',
    thumbnailUrl: 'https://assets.zilliz.com/Open_AI_Sora_1_02673e88c8.png'
  },
  {
    id: '12',
    name: 'Descript',
    description: 'All-in-one audio and video editing platform with AI features like transcription and voice cloning.',
    category: 'Audio',
    tags: ['audio editing', 'transcription', 'video editing'],
    websiteUrl: 'https://descript.com',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Ukvt88gI-RuLq8sgb7SX4AukMLSlFfkb6g&s'
  },
  {
    id: '501',
    name: 'ElevenLabs',
    description: 'Plateforme de synthèse vocale offrant des voix AI ultra-réalistes avec contrôle des émotions et du style.',
    category: 'Audio',
    tags: ['synthèse vocale', 'narration', 'contenu audio'],
    websiteUrl: 'https://elevenlabs.io/',
    thumbnailUrl: 'https://substack-post-media.s3.amazonaws.com/public/images/b7ec3081-5f51-449c-81fd-7904f27c7ae1_492x474.png'
  },
  {
    id: '502',
    name: 'Murf AI',
    description: 'Studio de voix AI permettant de créer des voix-off professionnelles pour divers types de contenus.',
    category: 'Audio',
    tags: ['voix-off', 'narration', 'podcasts'],
    websiteUrl: 'https://murf.ai/',
    thumbnailUrl: 'https://cdn.prod.website-files.com/66b3765153a8a0c399c70981/6765500522d3bb49576bd629_Murf%20Logos%20-%20Color%20-%20version.svg'
  },
  {
    id: '503',
    name: 'LALAL.AI',
    description: 'Outil qui sépare la voix de la musique et extrait différents instruments dans n\'importe quel enregistrement audio.',
    category: 'Audio',
    tags: ['séparation de pistes', 'traitement audio', 'musique'],
    websiteUrl: 'https://www.lalal.ai/',
    thumbnailUrl: 'https://play-lh.googleusercontent.com/6Mi6vzzfAB4CBcdC8iW5Lq8WGc7I_THJ4-Tr7PG6kV5NCQZHdkeW7VUVAct9A74VkTN6'
  },
  {
    id: '504',
    name: 'Suno',
    description: 'Plateforme de génération musicale par IA qui crée des chansons originales à partir de descriptions textuelles.',
    category: 'Audio',
    tags: ['musique', 'composition', 'génération de chansons'],
    websiteUrl: 'https://suno.ai/',
    thumbnailUrl: 'https://imag.malavida.com/mvimgbig/download-fs/suno-ai-40264-0.jpg'
  },

  // Productivity Category
  {
    id: '5',
    name: 'Gamma',
    description: 'AI-powered presentation and document creation tool that transforms your ideas into beautiful content.',
    category: 'Productivity',
    tags: ['presentations', 'documents', 'content creation'],
    websiteUrl: 'https://gamma.app',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/anthropic.svg'
  },
  {
    id: '10',
    name: 'Notion AI',
    description: 'AI writing tool integrated into Notion that helps you create, summarize, and edit content more efficiently.',
    category: 'Productivity',
    tags: ['writing', 'note-taking', 'productivity'],
    websiteUrl: 'https://notion.so',
    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg'
  },
  {
    id: '601',
    name: 'Mem',
    description: 'Plateforme de prise de notes alimentée par l\'IA qui organise automatiquement vos informations et connaissances.',
    category: 'Productivity',
    tags: ['prise de notes', 'organisation', 'gestion des connaissances'],
    websiteUrl: 'https://mem.ai/',
    thumbnailUrl: 'https://miro.medium.com/v2/resize:fit:1160/1*Xy0_AI0MfCZUHD2t7ElbHg@2x.jpeg'
  },
  {
    id: '602',
    name: 'Otter.ai',
    description: 'Service de transcription en temps réel qui prend des notes lors de vos réunions et crée des résumés automatiques.',
    category: 'Productivity',
    tags: ['transcription', 'réunions', 'notes'],
    websiteUrl: 'https://otter.ai/',
    thumbnailUrl: 'https://images.ctfassets.net/lzny33ho1g45/1xZDtB3DUQYdcYP8yyGgm6/feb85168ea9cd0a7a459f68918c2ab0b/otter.jpg'
  },
  {
    id: '603',
    name: 'Taskade',
    description: 'Espace de travail unifié avec des fonctionnalités d\'IA pour organiser, planifier et collaborer sur des projets.',
    category: 'Productivity',
    tags: ['gestion de projet', 'collaboration', 'organisation'],
    websiteUrl: 'https://www.taskade.com/',
    thumbnailUrl: 'https://styles.redditmedia.com/t5_3ipu3/styles/communityIcon_n380jclg47j51.png'
  },
  {
    id: '604',
    name: 'Krisp',
    description: 'Application qui utilise l\'IA pour supprimer les bruits de fond et les échos lors des appels vidéo.',
    category: 'Productivity',
    tags: ['suppression de bruit', 'appels vidéo', 'audio'],
    websiteUrl: 'https://krisp.ai/',
    thumbnailUrl: 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBaRe9fe8skSWI.VBoYlhAarAwqTbAweMEg0zshp8cfuuolAnbkUD4bCL8fPy3OzyAqNJdkjyYV253sFSOqBWmXE-&format=source'
  },

  // Content Creation Category
  {
    id: '6',
    name: 'Jasper',
    description: 'AI content platform that helps teams create original, brand-aligned content at scale.',
    category: 'Content Creation',
    tags: ['writing', 'marketing', 'blog posts'],
    websiteUrl: 'https://jasper.ai',
    thumbnailUrl: 'https://waterbearlearning.com/wp-content/uploads/2024/10/jasper-ai-pros-cons.png'
  },
  {
    id: '701',
    name: 'Copy.ai',
    description: 'Plateforme d\'écriture par IA qui génère du contenu marketing de haute qualité pour divers formats.',
    category: 'Content Creation',
    tags: ['copywriting', 'marketing', 'publicité'],
    websiteUrl: 'https://www.copy.ai/',
    thumbnailUrl: 'https://zorgle.co.uk/wp-content/uploads/2024/11/Copy-ai-logo.png'
  },
  {
    id: '702',
    name: 'Synthesia',
    description: 'Plateforme qui permet de créer des vidéos professionnelles avec des présentateurs IA qui parlent dans différentes langues.',
    category: 'Content Creation',
    tags: ['vidéo', 'avatars', 'présentateurs virtuels'],
    websiteUrl: 'https://www.synthesia.io/',
    thumbnailUrl: 'https://assets.wheelhouse.com/media/_solution_logo_04162024_679873.jpeg'
  },
  {
    id: '703',
    name: 'Pictory',
    description: 'Outil qui transforme automatiquement de longs articles ou vidéos en courts clips vidéo pour les réseaux sociaux.',
    category: 'Content Creation',
    tags: ['vidéo courte', 'médias sociaux', 'repurposing'],
    websiteUrl: 'https://pictory.ai/',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb8n0L2Mw5zHYhHOP_hDyZEyCvZMyaDdR8ow&s'
  },
  {
    id: '704',
    name: 'Beautiful.ai',
    description: 'Outil de présentation qui utilise l\'IA pour créer automatiquement des diapositives professionnelles et esthétiques.',
    category: 'Content Creation',
    tags: ['présentations', 'diapositives', 'design'],
    websiteUrl: 'https://www.beautiful.ai/',
    thumbnailUrl: 'https://media.licdn.com/dms/image/v2/C5633AQHGJoJOXx83Ag/videocover-low/videocover-low/0/1648747860744?e=2147483647&v=beta&t=tmPn33cydUUFdPs2_CO8JN5woUozr2Js-ZjVkZDKuTc'
  },
  {
    id: '705',
    name: 'HeyGen',
    description: 'Plateforme vidéo IA permettant de créer des présentateurs virtuels réalistes pour vos vidéos d\'entreprise et de formation.',
    category: 'Content Creation',
    tags: ['vidéo IA', 'présentateurs virtuels', 'formation'],
    websiteUrl: 'https://www.heygen.com/',
    thumbnailUrl: 'https://cdn-public.softwarereviews.com/production/logos/offerings/11635/large/HeyGen_logo.png?1708193120'
  },

  // Software Development Category
  {
    id: 'sd1',
    name: 'GitHub Copilot',
    description: 'Assistant de codage IA qui suggère des lignes ou des fonctions entières en temps réel dans votre IDE.',
    category: 'Software Development',
    tags: ['IDE', 'autocomplétion', 'développement'],
    websiteUrl: 'https://github.com/features/copilot',
    thumbnailUrl: 'https://www.it-labs.com/wp-content/uploads/2023/05/GitHub-Copilot-logo-1040x650-1.png',
    featured: true
  },
  {
    id: 'sd2',
    name: 'Kite',
    description: 'Copilote de programmation qui utilise l\'apprentissage automatique pour fournir des complétions de code pertinentes.',
    category: 'Software Development',
    tags: ['Python', 'JavaScript', 'autocomplétion'],
    websiteUrl: 'https://www.kite.com/',
    thumbnailUrl: 'https://media.licdn.com/dms/image/v2/D560BAQF1sdW3hEZhAg/company-logo_200_200/B56ZVAakClHsAI-/0/1740542460660/gokiteai_logo?e=2147483647&v=beta&t=XaS3NlqjCgTQfVc5q6JjiyqWrJb0NkVoOPqPsb5HBVY'
  },
  {
    id: 'sd4',
    name: 'DeepCode',
    description: 'Outil d\'analyse de code qui détecte les bugs et les problèmes de qualité en utilisant l\'intelligence artificielle.',
    category: 'Software Development',
    tags: ['analyse statique', 'détection de bugs', 'qualité de code'],
    websiteUrl: 'https://www.deepcode.ai/',
    thumbnailUrl: 'https://ai-learning-tools.com/wp-content/uploads/2024/02/DeepCode.jpg'
  },
  {
    id: 'sd6',
    name: 'Codota',
    description: 'Complète votre code en se basant sur des millions de programmes open source et sur votre contexte de codage.',
    category: 'Software Development',
    tags: ['Java', 'Kotlin', 'autocomplétion'],
    websiteUrl: 'https://www.codota.com/',
    thumbnailUrl: 'https://financialit.net/sites/default/files/0_1_19.png'
  },
  {
    id: 'sd7',
    name: 'Ponicode',
    description: 'Génération automatique de tests unitaires pour JavaScript, TypeScript et Python à l\'aide de l\'IA.',
    category: 'Software Development',
    tags: ['tests unitaires', 'qualité', 'développement'],
    websiteUrl: 'https://www.ponicode.com/',
    thumbnailUrl: 'https://theenterpriseworld.com/wp-content/uploads/2024/12/1.9-Ponicode-Source-hackernoon.com_.jpg'
  },
  {
    id: 'sd10',
    name: 'Sourcery',
    description: 'Assistant qui suggère des améliorations de code Python directement dans votre éditeur.',
    category: 'Software Development',
    tags: ['Python', 'refactoring', 'qualité de code'],
    websiteUrl: 'https://sourcery.ai/',
    thumbnailUrl: 'https://avatars.githubusercontent.com/u/36609879?v=4'
  },
  {
    id: 'sd11',
    name: 'CodeGuru',
    description: 'Service d\'Amazon qui utilise l\'apprentissage automatique pour identifier les problèmes de code et améliorer les performances.',
    category: 'Software Development',
    tags: ['revue de code', 'optimisation', 'AWS'],
    websiteUrl: 'https://aws.amazon.com/codeguru/',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9hv_Nkcn2wHhuz8VGMZcb7wDwulzZKzvbHA&s'
  },
  {
    id: 'sd12',
    name: 'Codeium',
    description: 'Alternative gratuite à GitHub Copilot qui offre une assistance de codage par IA dans de nombreux langages et IDE.',
    category: 'Software Development',
    tags: ['gratuit', 'multi-langage', 'assistance de code'],
    websiteUrl: 'https://codeium.com/',
    thumbnailUrl: 'https://avatars.githubusercontent.com/u/87784615?s=200&v=4'
  },
  {
    id: 'sd15',
    name: 'Codex',
    description: 'Modèle de langage IA qui peut comprendre et générer du code dans de nombreux langages de programmation.',
    category: 'Software Development',
    tags: ['modèle de langage', 'génération de code', 'développement'],
    websiteUrl: 'https://www.codex.ai/',
    thumbnailUrl: 'https://generaltranslation.com/gt-logo-light.svg'
  },
  {
    id: 'sd17',
    name: 'CodeFactor',
    description: 'Outil d\'analyse de code qui aide les développeurs à améliorer la qualité et la maintenabilité de leur code.',
    category: 'Software Development',
    tags: ['analyse de code', 'qualité de code', 'maintenabilité'],
    websiteUrl: 'https://www.codefactor.io/',
    thumbnailUrl: 'https://www.svgrepo.com/show/353578/codefactor.svg'
  },
  {
    id: 'sd18',
    name: 'CodeScene',
    description: 'Outil d\'analyse de code qui aide les développeurs à comprendre et à améliorer la structure de leur code.',
    category: 'Software Development',
    tags: ['analyse de code', 'structure de code', 'développement'],
    websiteUrl: 'https://www.codescene.com/',
    thumbnailUrl: 'https://codescene.com/hs-fs/hubfs/CS_logo_navy.png?width=472&height=93&name=CS_logo_navy.png'
  },

  // Software Development & Code Generation
  {
    id: 'sdcg1',
    name: 'Cursor.sh',
    description: 'AI-powered code editor that autocompletes entire functions and explains code in real-time.',
    category: 'Software Development & Code Generation',
    tags: ['code editor', 'AI autocompletion', 'debugging'],
    websiteUrl: 'https://cursor.sh',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBhXJu145Ak8e3NsMLakbbfbMpPvDMYO6rw&s'
  },
  {
    id: 'sdcg2',
    name: 'Gitpod',
    description: 'AI-enhanced cloud IDE with automated code reviews and vulnerability detection.',
    category: 'Software Development & Code Generation',
    tags: ['cloud IDE', 'code analysis', 'security'],
    websiteUrl: 'https://gitpod.io',
    thumbnailUrl: 'https://avatars.githubusercontent.com/u/37021919?s=280&v=4'
  },

  // Web Development & UI/UX Design
  {
    id: 'web1',
    name: 'Wix ADI',
    description: 'AI-driven website builder that designs custom sites based on user input and content.',
    category: 'Web Development & UI/UX Design',
    tags: ['website builder', 'AI design', 'responsive'],
    websiteUrl: 'https://www.wix.com/adi',
    thumbnailUrl: 'https://sm.pcmag.com/t/pcmag_me/review/w/wix-websit/wix-website-builder_wc57.1920.jpg'
  },
  // Drones & Aerospace
  {
    id: 'drone1',
    name: 'AirSim',
    description: 'AI-powered drone simulation platform for autonomous flight training and testing.',
    category: 'Drones & Aerospace',
    tags: ['drone simulation', 'autonomous flight', 'aerospace'],
    websiteUrl: 'https://microsoft.github.io/AirSim',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNUPWygqrN_6a6jKVxsMbkR3cSdZtWongOeQ&s'
  },
  {
    id: 'drone2',
    name: 'FlytBase',
    description: 'AI-driven drone fleet management system with automated mission planning.',
    category: 'Drones & Aerospace',
    tags: ['drone fleet', 'automation', 'mission planning'],
    websiteUrl: 'https://flytbase.com',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCy-zilDkzd4840-jZDkNDpxoIw_hNhWtzIQ&s'
  },
  {
    id: '1000',
    name: 'Runware',
    description: 'Affordable, ultra-fast AI tool for media generation. Create, edit, and enhance images with features like background removal and support for various models.',
    category: 'Graphic Design & Image Editing',
    tags: ['image editing', 'media generation', 'background removal'],
    websiteUrl: 'https://runware.ai ',
    thumbnailUrl: 'https://runware.ai/assets/img/og/main.png',
    featured: true,
    isFree: false,
    price: "Freemium"
  },
  {
    id: '1001',
    name: 'Gradescope',
    description: 'Simplify your grading process with Gradescope, an AI tool perfect for administering online or in-person assessments. Enables detailed insights into student performance.',
    category: 'Productivity',
    tags: ['grading', 'assessment', 'education'],
    websiteUrl: 'https://www.gradescope.com ',
    thumbnailUrl: 'https://blogs.swarthmore.edu/its/wp-content/uploads/2021/09/gradescope_logo.jpeg',
    featured: true,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1002',
    name: 'Grok',
    description: 'Enhance productivity with Grok: Create essays, chat, generate text & images, and write code. Unlock creativity and efficiency with AI\'s unfiltered insights.',
    category: 'Content Creation',
    tags: ['content creation', 'text generation', 'code generation'],
    websiteUrl: 'https://grok.twitter.com ',
    thumbnailUrl: 'https://image.coinpedia.org/wp-content/uploads/2025/03/12104822/grok-ai.webp',
    featured: true,
    isFree: true,
    price: "Freemium"
  },
  {
    id: '1003',
    name: 'AskNow',
    description: 'AskNow: An engaging AI tool offering immersive audio chats and interactive AI avatars. Perfect for education, entertainment, and personal development.',
    category: 'Audio & Speech Processing',
    tags: ['audio chat', 'AI avatar', 'personal development'],
    websiteUrl: 'https://asknow.ai ',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDsTHR2He-KYClPj-hlwda6gOBDpbzs7Lv3g&s',
    featured: true,
    isFree: true,
    price: "Freemium"
  },
  {
    id: '1006',
    name: 'Identic AI',
    description: 'Identic AI creates 3D models from a single image for AR, boosting sales and engaging customers with AI content, WebAR integration, and 3D configurators.',
    category: 'Mechanical Engineering & 3D Design',
    tags: ['3D modeling', 'AR', 'product visualization'],
    websiteUrl: 'https://identic.ai ',
    thumbnailUrl: 'https://identic.ai/assets/img/img_3dicons.svg',
    featured: false,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1007',
    name: 'Humanize AI',
    description: 'Humanize AI transforms AI-generated text into engaging, human-like content, bypassing AI detectors for authentic and undetectable results.',
    category: 'NLP',
    tags: ['text rewriting', 'AI detection', 'content optimization'],
    websiteUrl: 'https://humanize.ai ',
    thumbnailUrl: 'https://play-lh.googleusercontent.com/xejRTi7tgUpd0NcyFfV0o4RXK6pzxXEZ8jLb13ah-U3-rkJhR_DGDd_gWrxPMv7Rlxc',
    featured: true,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1008',
    name: 'tems.ai',
    description: 'Effortlessly create training materials, write documents, analyze data, and review videos with tems.ai\'s innovative, time-saving AI platform. Ideal for streamlined training.',
    category: 'Productivity',
    tags: ['document writing', 'data analysis', 'video analysis'],
    websiteUrl: 'https://tems.ai ',
    thumbnailUrl: 'https://static.tildacdn.com/tild6566-3836-4763-b635-326337313036/on_white.svg',
    featured: true,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1009',
    name: 'SmallPPT',
    description: 'SmallPPT: AI-powered tool for creating presentations, images, and text with speed and precision. Bring your ideas to life effortlessly!',
    category: 'Marketing & Content Creation',
    tags: ['presentation creation', 'image generation', 'content creation'],
    websiteUrl: 'https://smallppt.com ',
    thumbnailUrl: 'https://play-lh.googleusercontent.com/ftX76AVdC0CeLJCag9PY1tuI2j-1a5Qqva_CSe_mzYmPcYf1umT_0qUiYQQlzEIGZo2Z=w240-h480-rw',
    featured: true,
    isFree: true,
    price: "Free, Open-source"
  },
  {
    id: '1011',
    name: 'Datatera.ai',
    description: 'Datatera.ai: Streamlining Data Transformation, Web Scraping, Lead Prospecting, and Automated Email Handling',
    category: 'Data Analysis',
    tags: ['data transformation', 'web scraping', 'lead prospecting'],
    websiteUrl: 'https://datatera.ai ',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPZiRKdxPRYSv4oJuZ2m3V6ck3EpHLh1bSg&s',
    featured: true,
    isFree: true,
    price: "Freemium"
  },
  {
    id: '1012',
    name: 'PiAPI',
    description: 'PiAPI - Generative AI Tool for Creative Text and Visual Transformations, Music Creation, and Seamless Face Swaps',
    category: 'Content Creation',
    tags: ['generative AI', 'face swap', 'creative transformations'],
    websiteUrl: 'https://piapi.com ',
    thumbnailUrl: 'https://assets.apidog.com/app/project-icon/custom/20241009/482dc896-55d5-49bc-93d8-0ac091ec6f2a.png',
    featured: true,
    isFree: true,
    price: "Freemium"
  },
  {
    id: '1013',
    name: 'Socratic',
    description: 'Socratic is an AI tool that quickly creates multilingual presentations with images, graphs, and tables, exporting directly to PowerPoint or PDF in under a minute.',
    category: 'Marketing & Content Creation',
    tags: ['presentation creation', 'multilingual', 'data visualization'],
    websiteUrl: 'https://socratic.com ',
    thumbnailUrl: 'https://img.utdstc.com/icon/003/819/0038190aa334ad95542470c80db22676ddbd4ff2fb1de6eb7ca05d877d25d93a:200',
    featured: true,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1014',
    name: 'Kore.ai',
    description: 'Kore.ai - Streamlining Operations and Enhancing User Experience with AI-Powered Virtual Assistants',
    category: 'NLP',
    tags: ['virtual assistant', 'customer service', 'automation'],
    websiteUrl: 'https://kore.ai ',
    thumbnailUrl: 'https://play-lh.googleusercontent.com/tDIiw4Mm7yndvcWuHS9aL9tBXsgYWswWy2zBw2ozM095vsuA-7xZAZAA_caJX-85xw',
    featured: true,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1015',
    name: 'FireCut AI',
    description: 'Streamline video editing with features like silence cutting, zoom-ins, chapter detection, repetition removal, transcription, subtitle creation, and slide generation.',
    category: 'Video Editing & Animation',
    tags: ['video editing', 'transcription', 'subtitle creation'],
    websiteUrl: 'https://firecut.ai ',
    thumbnailUrl: 'https://framerusercontent.com/assets/E77v0YJQViRZoJaZyvrAnlaAx0.png',
    featured: true,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1016',
    name: 'AdCreative',
    description: 'Create text, images, videos & slides for improved conversions. A comprehensive tool for marketing content generation.',
    category: 'Marketing & Content Creation',
    tags: ['marketing content', 'text generation', 'image generation', 'video generation'],
    websiteUrl: 'https://adcreative.ai ',
    thumbnailUrl: 'https://appsumo2-cdn.appsumo.com/media/deals/images/As-web-adcreative.png?width=832&height=468&aspect_ratio=16:9&optimizer=gif',
    featured: true,
    isFree: true,
    price: "Free, Freemium, Paid"
  },
  {
    id: '1017',
    name: 'ChatBCG',
    description: 'Generative AI for creating images & slides. Perfect for presentations and visual content creation.',
    category: 'Presentation Creation',
    tags: ['presentation creation', 'image generation', 'slide creation'],
    websiteUrl: 'https://chatbcg.ai ',
    thumbnailUrl: 'https://i.imgur.com/zoRf1rU.png',
    featured: true,
    isFree: true,
    price: "Free"
  },
  {
    id: '1021',
    name: 'Pixcap',
    description: 'Unlock creativity with Pixcap, an AI-powered graphic design tool for creating icons, logos, 3D characters, scenes & objects effortlessly.',
    category: 'Graphic Design & Image Editing',
    tags: ['graphic design', 'icon creation', '3D modeling'],
    websiteUrl: 'https://pixcap.ai ',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMNowZho-UTjNE5zcfl-mTNqVjAkK2vUii8A&s',
    featured: true,
    isFree: true,
    price: "Freemium"
  },
  {
    id: '1022',
    name: 'Immersity AI',
    description: 'Explore Immersity AI, a breakthrough in artificial intelligence transforming industries with next-gen solutions. Learn more in our blog post!',
    category: 'AI Creativity Tools',
    tags: ['AI innovation', 'next-gen AI', 'industry transformation'],
    websiteUrl: 'https://immersity.ai ',
    thumbnailUrl: 'https://media.licdn.com/dms/image/sync/v2/D5627AQGSp_xTGDBwcg/articleshare-shrink_800/articleshare-shrink_800/0/1716336392357?e=2147483647&v=beta&t=7o6cUWPzmfJWMXf2juU4K3w7Jl4xotXQ83YApi0S7Os',
    featured: false,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1023',
    name: 'Sortium',
    description: 'Experience Sortium, an AI-powered tool capable of creating 3D objects & characters. Simplifies design workflows, turning novices into creative directors.',
    category: '3D Modeling',
    tags: ['3D modeling', 'creative workflow', 'design simplification'],
    websiteUrl: 'https://sortium.ai ',
    thumbnailUrl: 'https://www.f6s.com/content-resource/media/4801291_0b2bef88d3807ba58a5c7fe36930f1bf98e4938c.png',
    featured: true,
    isFree: true,
    price: "Freemium"
  },
  {
    id: '1024',
    name: 'Tripo AI',
    description: 'Tripo AI - Transforming Text and Images into Stunning 3D Models and Characters',
    category: '3D Modeling',
    tags: ['text-to-3D', 'image-to-3D', '3D character creation'],
    websiteUrl: 'https://tripo.ai ',
    thumbnailUrl: 'https://cdn-image.creati.ai/cdn-cgi/image/width=480/ai-tools/product-image/tripo-ai.webp',
    featured: true,
    isFree: false,
    price: "Freemium"
  },
  {
    id: '1025',
    name: 'Bezi AI',
    description: 'Revolutionize your design process with Bezi AI tool that enables quick creation of 3D objects, characters & animations in seconds. Streamline 3D modeling & ideation today.',
    category: '3D Modeling',
    tags: ['3D modeling', 'animation', 'rapid prototyping'],
    websiteUrl: 'https://bezi.ai ',
    thumbnailUrl: 'https://framerusercontent.com/images/b7HbQKY2Gup38kcjPTqHwv3WcY.png',
    featured: true,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1032',
    name: 'WNR.AI',
    description: 'Explore the power of AI with WNR.AI. Create your own AI models for chat, images, voice and video. Ideal for developers and content creators to enhance creativity.',
    category: 'Generative AI',
    tags: ['AI model creation', 'generative AI', 'developer tools'],
    websiteUrl: 'https://wnr.ai ',
    thumbnailUrl: 'https://fullstackai.co/wp-content/uploads/2023/04/wnr.ai-1-1024x576.jpg',
    featured: true,
    isFree: true,
    price: "Freemium"
  },
  {
    id: '1033',
    name: 'Nim',
    description: 'Discover Nim, a revolutionary AI tool for professional video production. Create, edit, upscale videos, synchronize lips and more with cutting-edge AI tech. Transform your work now with Nim!',
    category: 'Video Editing & Animation',
    tags: ['video editing', 'lipsync', 'professional video'],
    websiteUrl: 'https://nim.ai ',
    thumbnailUrl: 'https://newrelic.com/sites/default/files/2024-06/NVIDIA%20NIM%20Blog_Main_1920x1080.png',
    featured: true,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1034',
    name: 'vidBoard.ai',
    description: 'Experience vidBoard.ai, an innovative AI tool that creates videos, avatars, translations, subtitles, transcriptions, audios, text-to-speech & more. Revolutionize your presentations & content creation effortlessly!',
    category: 'Content Creation',
    tags: ['presentation creation', 'avatar generation', 'multilingual'],
    websiteUrl: 'https://vidboard.ai ',
    thumbnailUrl: 'https://aiforeveryone.org/wp-content/uploads/2024/07/Vidboard-AI-.png',
    featured: true,
    isFree: true,
    price: "Freemium"
  },
  {
    id: '1035',
    name: 'ToastyAI',
    description: 'Streamline your podcast promotion with ToastyAI, the powerful AI tool that transforms podcasts into engaging multimedia content, from transcripts to social media posts, in minutes.',
    category: 'Audio & Speech Processing',
    tags: ['podcast promotion', 'transcription', 'social media content'],
    websiteUrl: 'https://toasty.ai ',
    thumbnailUrl: 'https://outcast.ai/wp-content/uploads/2023/09/image-1.png',
    featured: true,
    isFree: true,
    price: "Freemium"
  },
  {
    id: '1041',
    name: 'iContact',
    description: 'Supercharge your email marketing campaigns with iContact, an AI tool that automates content creation. Enjoy quick learnability and easy customization.',
    category: 'Marketing & Content Creation',
    tags: ['email marketing', 'content automation', 'customizable templates'],
    websiteUrl: 'https://icontact.com ',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGTDz-Fti5LEffjVCX9xneD9BSLo14hvHCEA&s',
    featured: true,
    isFree: false,
    price: "Paid"
  },
  {
    id: '1042',
    name: 'TaskDrive',
    description: 'Connect with your ideal customers, save time, and get more done with this platform. With it anyone on any team can learn email marketing quickly. This easy-to-use platform and customizable templates take the guesswork out of email marketing.',
    category: 'Productivity',
    tags: ['task management', 'email marketing', 'team collaboration'],
    websiteUrl: 'https://taskdrive.ai ',
    thumbnailUrl: 'https://growthjunkie.com/wp-content/uploads/2022/07/taskdrive-favicon.png',
    featured: false,
    isFree: true,
    price: "Freemium"
  }
];

