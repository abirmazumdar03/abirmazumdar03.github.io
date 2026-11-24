/* Portfolio content lives here: add or edit entries without changing the layout. */
const portfolio = {
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Connect', href: '#connect' }
  ],
  skills: [
    { title: 'Languages', items: ['Python', 'C', 'C++', 'Java'] },
    { title: 'AI & information retrieval', items: ['Machine learning', 'LangChain', 'LangSmith', 'Hugging Face', 'Pinecone', 'Retrieval augmented generation'] },
    { title: 'Data & development', items: ['Flask', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'scikit-learn'] },
    { title: 'Databases & workflow', items: ['MySQL', 'MongoDB', 'Git', 'GitHub', 'AWS'] }
  ],
  projects: [
    {
      category: 'Machine learning', title: 'Predictive maintenance for industrial machines',
      description: 'Explored the UCI AI4I 2020 dataset, engineered features, and compared classifiers while guarding against data leakage. A decision tree reached 92% recall for failures on the held out test set.',
      stack: ['Python', 'scikit-learn', 'Pandas'], url: 'https://github.com/abirmazumdar03/machine-failure-risk-prediction'
    },
    {
      category: 'Systems · C', title: 'Rate monotonic task scheduler',
      description: 'A deterministic, tick based single core scheduler simulator with fixed task priorities, a Liu & Layland schedulability check, and text based execution traces for inspecting deadline misses.',
      stack: ['C', 'Makefile', 'Scheduling'], url: 'https://github.com/abirmazumdar03/Rate-Monotonic-Task-Scheduler-Simulation'
    },
    {
      category: 'Security · IoT', title: 'End to end encrypted health data pipeline',
      description: 'A Raspberry Pi telemetry flow and blind Flask backend. The design uses ECDH, HKDF and AES-GCM so the backend can validate and store encrypted payloads without reading their contents.',
      stack: ['Raspberry Pi', 'Flask', 'AWS KMS', 'MongoDB'], url: 'https://github.com/abirmazumdar03/Secure-E2EE-Health-Data-Pipeline'
    },
    {
      category: 'Computer vision · Edge AI', title: 'Lightweight retinal OCT screening',
      description: 'An offline oriented screening pipeline for low resource settings. The project explores distillation, ONNX export, INT8 quantization and calibration, with an explainability and review workflow.',
      stack: ['EfficientNet-Lite0', 'ONNX', 'INT8', 'Grad-CAM'], url: 'https://github.com/abirmazumdar03/oct-screening'
    },
    {
      category: 'Language models · Search', title: 'Documentation intelligence',
      description: 'A question answering app that crawls technical documentation, indexes local embeddings in Pinecone and uses an agent to retrieve relevant passages. Answers include source links; chat history persists in SQLite.',
      stack: ['LangChain', 'Pinecone', 'Hugging Face', 'Streamlit'], url: 'https://github.com/abirmazumdar03/Documentation-Intelligence'
    }
  ],
  education: [
    { degree: 'M.Tech · Computer Science and Engineering', school: 'National Institute of Technology Rourkela', place: 'Rourkela, Odisha', dates: '2025 — Present', detail: 'CGPA 7.78' },
    { degree: 'B.Tech · Computer Science and Engineering', school: 'Arka Jain University', place: 'Jamshedpur, Jharkhand', dates: '2020 — 2024', detail: 'CGPA 9.10' },
    { degree: 'ISC · Science (PCM)', school: 'DBMS English School', place: 'Jamshedpur, Jharkhand', dates: 'Completed 2020', detail: '89.6%' }
  ],
  socials: [
    { label: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/abirmazumdar03' },
    { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://www.linkedin.com/in/abir-mazumdar24/' },
    { label: 'Facebook', icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/profile.php?id=100009567234483' }
  ]
};

const nav = document.querySelector('#navLinks');
nav.innerHTML = portfolio.navigation.map(item => `<a href="${item.href}">${item.label}</a>`).join('');

document.querySelector('#skillGroups').innerHTML = portfolio.skills.map(group => `
  <article class="skill-group reveal"><div><h3>${group.title}</h3><div class="skill-tags">${group.items.map(item => `<span>${item}</span>`).join('')}</div></div>
  </article>`).join('');

document.querySelector('#projectGrid').innerHTML = portfolio.projects.map(project => `
  <article class="project-card reveal">
    <div class="project-topline"><span>${project.category}</span></div>
    <h3>${project.title}</h3><p>${project.description}</p>
    <div class="project-bottom"><div class="tech-stack">${project.stack.map(tech => `<span>${tech}</span>`).join('')}</div>
      <a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${project.title} on GitHub"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
  </article>`).join('');

document.querySelector('#educationList').innerHTML = portfolio.education.map(item => `
  <article class="education-item reveal"><div class="education-date">${item.dates}</div><div><h3>${item.degree}</h3><p>${item.school} <span>· ${item.place}</span></p></div><span class="education-detail">${item.detail}</span></article>`).join('');

document.querySelector('#socialLinks').innerHTML = portfolio.socials.map(item => `
  <a class="social-link" href="${item.url}" target="_blank" rel="noopener noreferrer"><span class="social-icon"><i class="${item.icon}"></i></span><span>${item.label}</span><i class="fa-solid fa-arrow-up-right-from-square external-icon"></i></a>`).join('');

const portraitCard = document.querySelector('.portrait-card');
const portraitImage = document.querySelector('.portrait-image');
portraitImage.addEventListener('load', () => portraitCard.classList.add('has-image'));
portraitImage.addEventListener('error', () => portraitCard.classList.add('no-image'));
if (portraitImage.complete && portraitImage.naturalWidth > 0) portraitCard.classList.add('has-image');

const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
  toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  toggle.innerHTML = `<i class="fa-solid fa-${expanded ? 'bars' : 'xmark'}"></i>`;
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

const sections = document.querySelectorAll('main section[id], main header[id]');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    nav.querySelectorAll('a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => navObserver.observe(section));
