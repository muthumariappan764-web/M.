const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
  const current = sections.find(section => section.getBoundingClientRect().top <= 120 && section.getBoundingClientRect().bottom > 120);
  if (current) links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`));
}, { passive: true });
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  form.querySelector('.form-note').textContent = 'Opening your email app with your message…';
  window.location.href = `mailto:muthumariappan764@gmail.com?subject=${subject}&body=${body}`;
});

const courseTopics = {
  Java: { overview: 'A foundation course for writing structured Java programs and understanding object-oriented programming.', topics: ['Java syntax', 'Variables and data types', 'Classes and objects', 'Basic problem solving'], practice: 'Practice: build a small Java console program using classes and methods.' },
  Python: { overview: 'A programming course focused on clear Python fundamentals and the Python skills used in the ROS 2 project.', topics: ['Python syntax', 'Functions and modules', 'ROS 2 Python basics', 'TurtleSim key control'], practice: 'Practice: create a Python script that reads keyboard input and runs a simple task.' },
  'HTML & CSS': { overview: 'A web-design course for creating semantic, responsive pages with clean structure and styling.', topics: ['Semantic HTML', 'Responsive layouts', 'CSS Flexbox and Grid', 'Portfolio page styling'], practice: 'Practice: build a responsive personal profile card for mobile and desktop.' },
  JavaScript: { overview: 'A front-end course for adding useful behaviour and interaction to web pages.', topics: ['Variables and functions', 'DOM selection', 'Click events', 'Form interactions'], practice: 'Practice: build a button that updates page content when a user clicks it.' },
  SQL: { overview: 'A database fundamentals course for reading and organizing data with structured queries.', topics: ['SELECT queries', 'Filtering and sorting', 'Tables and relationships', 'Basic database concepts'], practice: 'Practice: write queries to find, filter, and sort student records.' },
  'Git & GitHub': { overview: 'A version-control course for tracking changes and sharing projects through GitHub.', topics: ['Repositories and commits', 'Branches', 'Pushing projects', 'GitHub project sharing'], practice: 'Practice: create a repository, commit a project, and push it to GitHub.' }
};

const coursePanel = document.querySelector('#course-panel');
document.querySelectorAll('.skill-card').forEach(card => {
  const name = card.querySelector('h3').textContent.trim();
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Show ${name} course topics`);
  const course = courseTopics[name];
  card.insertAdjacentHTML('beforeend', `<p class="course-inline-title">Course topics</p><ul class="course-inline-list">${course.topics.map(topic => `<li>${topic}</li>`).join('')}</ul>`);
  const showCourse = () => {
    coursePanel.classList.add('open');
    coursePanel.innerHTML = `<div><p class="eyebrow">${name} course details</p><h3>What I am currently learning</h3><p class="course-description">${course.overview}</p><h4>Topics covered</h4><ul class="course-topic-list">${course.topics.map(topic => `<li>${topic}</li>`).join('')}</ul><p class="course-practice"><strong>Practical exercise:</strong> ${course.practice.replace('Practice: ', '')}</p></div><span class="course-panel-icon">✓</span>`;
  };
  card.addEventListener('click', showCourse);
  card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showCourse(); } });
});
