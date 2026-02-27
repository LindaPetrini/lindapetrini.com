Here is a lot of context:

here is the current version of the websit we want to update https://lindapetrini.com/

updates that need to happen:
* current website is not optimised for SEO at all
* move from carrd to a hosted website, maybe starting from a template? I like the style of the current website but do want acutal separate pages.
* pages I'd like: 
    * about: a bit of my story, I need to write that but the outline is: here is a bit of my past, here is what i care about now. 
    * services: 
        * research: linsks to ai pathways report, secure ai tech tree, bezos report, iclr paper
        * research support: palisade, anthropic
        * and more: open to new tasks
    * writing: links to my substack articles with a brief blurb for each, poption to sign up for substakc
    * coaching/mentoring/need a better title:
         a bit about wanting to coach 1:1 and also offer a course about digital sovreignty. 
* check that all links and signups work, that peoeple can find my cv and send me an email easily
* check that seo works, that analytics are set up and so on
* make sure that the mainpage looks clean and already has a lot of the relevant info, eg my picture as taken from the current website. 
* make sure logos of "trusted by" are available and also include palisade
* keep the pink colour scheme cause i really like it. 




more info on the course from a previous attempt at refactoring:

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tech & Soul — Linda Petrini</title>
  <meta name="description" content="AI mentorship and learning for people who want to understand these tools — technically and emotionally. 1:1 sessions and a coming course. With Linda Petrini.">
  <link rel="canonical" href="https://lindapetrini.com/mentorship/">
  <meta property="og:title" content="Tech & Soul — Linda Petrini">
  <meta property="og:description" content="1:1 AI mentorship and a coming course for people who want to understand AI without losing themselves in the hype.">
  <meta property="og:url" content="https://lindapetrini.com/mentorship/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>

  <nav class="nav">
    <div class="container">
      <a href="/" class="nav__name">Linda Petrini</a>
      <button class="nav__hamburger" aria-label="Menu" onclick="document.querySelector('.nav__links').classList.toggle('open')">&#9776;</button>
      <ul class="nav__links">
        <li><a href="/about">About</a></li>
        <li><a href="/work">Work</a></li>
        <li><a href="/writing">Writing</a></li>
        <li><a href="/mentorship" class="active">Mentorship</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <h1>Tech &amp; Soul</h1>
      <p class="hero__intro">For people who want to understand AI &mdash; technically and emotionally &mdash; without getting lost in the hype. I bring 7+ years of ML research and a deep practice with these tools. I can explain how transformers work <em>and</em> why you felt weird after that conversation with Claude.</p>
    </div>
  </section>

  <section class="section">
    <div class="container container--wide">

      <div class="ts-split">

        <!-- Left: 1:1 Sessions -->
        <div class="ts-split__col">
          <h2>1:1 Sessions</h2>
          <p style="color: var(--color-text-light); font-size: 0.95rem;">Deep-dive conversations tailored to your questions &mdash; how AI works, what it's doing to us, how to use it well. We go wherever is most alive for you.</p>

          <h3>What we cover</h3>
          <ul class="mentorship-features">
            <li><strong>How AI actually works</strong> &mdash; transformers, training, RLHF, context windows. Explained for humans, not textbooks.</li>
            <li><strong>What AI can and can't do</strong> &mdash; building an accurate mental model through direct experience, not hype.</li>
            <li><strong>Navigating emotional responses</strong> &mdash; attachment, trust, grief, excitement, fear. All of it is valid and worth understanding.</li>
            <li><strong>Privacy and data sovereignty</strong> &mdash; what happens to what you share, and how to protect yourself.</li>
            <li><strong>Personal AI setup</strong> &mdash; which tools to use, how to use them well, when to step back.</li>
          </ul>

          <h3>Who this is for</h3>
          <p style="font-size: 0.93rem; color: var(--color-text-light);">Coaches, therapists, writers, parents, professionals &mdash; anyone who uses or is affected by AI and wants to understand it deeper. No technical background required.</p>

          <div class="about-highlight" style="margin: 1.5rem 0;">
            <p style="font-style: italic; font-family: var(--font-serif); margin-bottom: 0.75rem; font-size: 0.95rem;">"Linda is one of my favorite coaches to work with. Her presence is steady, both authentically caring and simultaneously, relaxedly fearless and direct. I feel safe and seen with her."</p>
            <p style="margin: 0; font-size: 0.85rem; color: var(--color-text-light);">— Lalita</p>
          </div>

          <p style="margin-top: 1.5rem;">
            <a href="https://cal.com/lindapetrini/20min" target="_blank" rel="noopener" class="btn btn--primary">Book a free intro call</a>
          </p>
          <p style="font-size: 0.82rem; color: var(--color-text-light); margin-top: 0.6rem;">Free 20-min call &middot; No pressure, no pitch</p>
        </div>

        <!-- Right: Coming Course -->
        <div class="ts-split__col" id="course">
          <div class="course-banner__badge" style="margin-bottom: 0.8rem;">Waitlist open</div>
          <h2>Digital Sovereignty in the Age of AI</h2>
          <p style="color: var(--color-text-light); font-size: 0.95rem;">A self-paced course on protecting your data, attention, and autonomy &mdash; by someone who uses AI every day and understands it from the inside out. No technical background required.</p>

          <h3>What you'll learn</h3>
          <ol class="course-modules">
            <li><strong>What AI actually knows about you</strong> &mdash; data collection, profiling, and inference.</li>
            <li><strong>Your digital footprint</strong> &mdash; an honest audit of what you're sharing, with whom, and what they do with it.</li>
            <li><strong>Attention by design</strong> &mdash; how algorithms capture your time, and how to design your environment back.</li>
            <li><strong>The privacy toolkit</strong> &mdash; messaging, browsing, email, passwords. Ranked by effort and impact.</li>
            <li><strong>Using AI without losing yourself</strong> &mdash; how to work with AI tools thoughtfully and keep your thinking sharp.</li>
            <li><strong>Teaching others</strong> &mdash; how to have this conversation without sounding like a conspiracy theorist.</li>
          </ol>

          <p style="color: var(--color-text-light); font-size: 0.88rem; margin-top: 0.5rem;"><em>Self-paced &middot; 15&ndash;20 min modules &middot; No technical background required</em></p>

          <div class="about-highlight" style="margin-top: 1.5rem;">
            <h3 style="margin-top: 0;">Join the waitlist</h3>
            <p style="font-size: 0.93rem;">The course is in development. Sign up for early access pricing &mdash; you'll be first to know when it's ready.</p>
            <script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>
            <iframe src="https://subscribe-forms.beehiiv.com/74a002d7-b5a2-4a6f-9394-382e906e8ab8" class="beehiiv-embed" data-test-id="beehiiv-embed" frameborder="0" scrolling="no" style="width: 100%; height: 363px; margin: 0; border-radius: 0px !important; background-color: transparent; box-shadow: 0 0 #0000;"></iframe>
          </div>
        </div>

      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer__text">&copy; 2026 Linda Petrini</div>
      <ul class="footer__links">
        <li><a href="https://twitter.com/petrini_linda">Twitter</a></li>
        <li><a href="https://linkedin.com/in/petrinilinda">LinkedIn</a></li>
        <li><a href="https://lindapetrini.substack.com">Substack</a></li>
      </ul>
    </div>
  </footer>

</body>
</html>


testimonials i would like to add:


Lalita

Linda is one of my favorite coaches to work with. Her presence is steady, both authentically caring and sensitive to what feels tender in me, and simultaneously, relaxedly fearless and direct. This helps me drop into the deeper, underlying feelings that are harder to access and work on. I feel safe and seen with her, while exploring complex and multifaceted issues and experiences. 

Allison Duettmann 

“In the 10 years I have been involved in hiring contractors for various technical writing at Foresight, Linda has been the best writer I’ve worked with, both in terms of the quality of result she delivers and in terms of working style.

So far, she worked on an extensive technical report on AI and climate, various workshop reports, a Request for Proposals, a blog post, social media, and a complex technology tree mapping the Secure AI domain for us. In a self-directed manner, she brings structure to projects whose scope is rather unclear, before launching a diligent research process that often uncovers new information that shapes the trajectory of the project. Even if the topic is technically complex, and outside her domain knowledge, she communicates concepts correctly, effectively and with an interesting lens and spin when desired. This includes references, visuals, layout and even design.

In terms of working style, she hits deadlines, is kind, patient, reliable and a great communicator and team worker. When project directions have to change (often initiated by her honest reporting of findings) she adapts flexibly and is ready to take the lead, giving me confidence that the task at hand is executed without me having to pm, and in a manner that frequently exceeds expectations. Feel free to contact me for more info.”

