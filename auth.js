
const BACKEND_BASE = '../eventflow_backend-master/backend';

function apiUrl(path) {
  return `${BACKEND_BASE}/${String(path).replace(/^\/+/, '')}`;
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  let data = null;
  try { data = await res.json(); } catch {}
  return { res, data };
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('ef_user')); }
  catch { return null; }
}

function isAdmin() {
  const u = getUser();
  return !!(u && u.role === 'admin');
}

function isLoggedIn() {
  return !!getUser();
}

async function logout() {
  try {
    await fetchJson(apiUrl('auth.php?action=logout'), { method: 'POST' });
  } catch {}
  localStorage.removeItem('ef_user');
  window.location.href = 'event-manager.html';
}

async function checkSession() {
  try {
    const { data } = await fetchJson(apiUrl('auth.php?action=me'));
    if (!data || !data.logged_in) localStorage.removeItem('ef_user');
    return !!(data && data.logged_in);
  } catch {
    return false;
  }
}
