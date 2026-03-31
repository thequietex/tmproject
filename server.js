const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const {createClient} = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Default admin credentials (change in production via environment variables)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || bcrypt.hashSync('maturity2026', 10);
const SESSION_SECRET = process.env.SESSION_SECRET || 'tmp-session-secret-change-me';

const CONTENT_FILE = path.join(__dirname, 'data', 'content.json');

// Sanity client
const sanityClient = createClient({
  projectId: 'rownmujw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

// Auth middleware
function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// --- Auth Routes ---

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && bcrypt.compareSync(password || '', ADMIN_PASS_HASH)) {
    req.session.authenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.get('/api/auth-check', (req, res) => {
  res.json({ authenticated: !!(req.session && req.session.authenticated) });
});

// --- Content Routes ---

// Local JSON content (fallback / admin-editable)
app.get('/api/content', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read content' });
  }
});

app.put('/api/content', requireAuth, (req, res) => {
  try {
    const content = req.body;
    const tmpFile = CONTENT_FILE + '.tmp';
    fs.writeFileSync(tmpFile, JSON.stringify(content, null, 2), 'utf-8');
    fs.renameSync(tmpFile, CONTENT_FILE);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// Sanity content endpoint
app.get('/api/sanity-content', async (req, res) => {
  try {
    const [hero, about, stages, commissions, members, events, leaders, connect, footer, settings] = await Promise.all([
      sanityClient.fetch(`*[_type == "hero"][0]`),
      sanityClient.fetch(`*[_type == "about"][0]`),
      sanityClient.fetch(`*[_type == "stage"] | order(order asc)`),
      sanityClient.fetch(`*[_type == "commission"] | order(order asc)`),
      sanityClient.fetch(`*[_type == "member"] | order(order asc)`),
      sanityClient.fetch(`*[_type == "scheduleEvent"] | order(order asc)`),
      sanityClient.fetch(`*[_type == "leader"] | order(order asc)`),
      sanityClient.fetch(`*[_type == "connectSection"][0]`),
      sanityClient.fetch(`*[_type == "footerSection"][0]`),
      sanityClient.fetch(`*[_type == "siteSettings"][0]`),
    ]);

    // Transform Sanity data into the same shape as local content.json
    const data = {
      hero: hero ? {
        eyebrow: hero.eyebrow || '',
        headline: hero.headline || '',
        scripture: hero.scripture || '',
        scriptureRef: hero.scriptureRef || '',
        ctaText: hero.ctaText || '',
      } : null,
      about: about ? {
        label: about.label || '',
        title: about.title || '',
        body: about.body || [],
        visualText: about.visualText || '',
      } : null,
      journey: {
        label: settings?.journeyLabel || 'The Path',
        title: settings?.journeyTitle || 'Stages of Growth',
        stages: (stages || []).map(s => ({
          number: s.number || '',
          title: s.title || '',
          description: s.description || '',
        })),
      },
      commissions: {
        label: settings?.commissionsLabel || 'Godly Commissions',
        title: settings?.commissionsTitle || 'Called to Serve',
        body: settings?.commissionsBody || '',
        cards: (commissions || []).map(c => ({
          icon: c.icon || '',
          iconColor: c.iconColor || 'sage',
          title: c.title || '',
          description: c.description || '',
        })),
      },
      members: {
        label: settings?.membersLabel || 'Our People',
        title: settings?.membersTitle || '40 Members, One Purpose',
        list: (members || []).map(m => ({
          name: m.name || '',
          color: m.color || 'sage',
        })),
      },
      schedule: {
        label: settings?.scheduleLabel || 'Study Calendar',
        title: settings?.scheduleTitle || 'Upcoming<br>Sessions',
        body: settings?.scheduleBody || '',
        events: (events || []).map(e => ({
          day: e.day || '',
          month: e.month || '',
          title: e.title || '',
          details: e.details || '',
        })),
      },
      leadership: {
        label: settings?.leadershipLabel || 'Leadership',
        title: settings?.leadershipTitle || 'Guided by Servant Hearts',
        leaders: (leaders || []).map(l => ({
          name: l.name || '',
          role: l.role || '',
          gradient: l.gradient || 'sage-to-sage-light',
        })),
      },
      connect: connect ? {
        label: connect.label || '',
        title: connect.title || '',
        body: connect.body || '',
        buttonText: connect.buttonText || '',
        email: connect.email || '',
      } : null,
      footer: footer ? {
        scripture: footer.scripture || '',
        scriptureRef: footer.scriptureRef || '',
        copyright: footer.copyright || '',
      } : null,
    };

    res.json(data);
  } catch (err) {
    console.error('Sanity fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch from Sanity' });
  }
});

app.listen(PORT, () => {
  console.log(`The Maturity Project CMS running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin.html`);
  console.log(`Sanity Studio: cd studio && npm run dev`);
});
