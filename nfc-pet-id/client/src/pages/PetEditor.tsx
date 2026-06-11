import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import type { Pet } from '../types';

type Tab = 'recovery' | 'medical' | 'digital';

export default function PetEditor() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('recovery');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [nfcSupported] = useState(() => 'NDEFReader' in window);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [form, setForm] = useState({
    name: '', species: '', breed: '', photo_url: '',
    owner_name: '', owner_phone: '', alt_phone: '',
    allergies: '', medications: '', conditions: '', vet_name: '', vet_phone: '',
  });

  useEffect(() => {
    if (!id) return;
    api.getPet(id)
      .then(p => {
        setPet(p);
        setForm({
          name: p.name ?? '',
          species: p.species ?? '',
          breed: p.breed ?? '',
          photo_url: p.photo_url ?? '',
          owner_name: p.owner_name ?? '',
          owner_phone: p.owner_phone ?? '',
          alt_phone: p.alt_phone ?? '',
          allergies: p.allergies ?? '',
          medications: p.medications ?? '',
          conditions: p.conditions ?? '',
          vet_name: p.vet_name ?? '',
          vet_phone: p.vet_phone ?? '',
        });
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSave() {
    if (!id || !form.name.trim()) { setError('Pet name cannot be empty'); return; }
    setSaving(true);
    setSaveMsg('');
    setError('');
    try {
      const updated = await api.updatePet(id, {
        ...form,
        name: form.name.trim(),
        species: form.species || undefined,
        breed: form.breed || undefined,
        photo_url: form.photo_url || undefined,
        owner_name: form.owner_name || undefined,
        owner_phone: form.owner_phone || undefined,
        alt_phone: form.alt_phone || undefined,
        allergies: form.allergies || undefined,
        medications: form.medications || undefined,
        conditions: form.conditions || undefined,
        vet_name: form.vet_name || undefined,
        vet_phone: form.vet_phone || undefined,
      });
      setPet(updated);
      setSaveMsg('Saved');
      setTimeout(() => setSaveMsg(''), 2500);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const publicUrl = `${window.location.origin}/p/${id}`;

  function copyUrl() {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const url = await api.uploadPhoto(file);
      setForm(prev => ({ ...prev, photo_url: url }));
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function writeNFC() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ndef = new (window as any).NDEFReader();
      await ndef.write({ records: [{ recordType: 'url', data: publicUrl }] });
      alert('Written to NFC tag successfully!');
    } catch (err) {
      alert('NFC write failed: ' + (err as Error).message);
    }
  }

  if (loading) return <div className="page-loading">Loading…</div>;
  if (!pet) return null;

  return (
    <>
      <nav className="topnav">
        <Link to="/" className="topnav-brand">
          <span className="topnav-brand-icon">🐾</span> PawTag
        </Link>
        <div className="topnav-right">
          <span className="topnav-email">{user?.email}</span>
        </div>
      </nav>

      <div className="editor-page">
        <Link to="/" className="editor-back">← Back to pets</Link>

        <div className="editor-header">
          <h2>{form.name || pet.name}</h2>
          <p>Tap a tab to edit, then save.</p>
        </div>

        <div className="tabs">
          {(['recovery', 'medical', 'digital'] as Tab[]).map(t => (
            <button
              key={t}
              className={`tab-btn ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'recovery' ? '📞 Lost Pet Recovery' : t === 'medical' ? '🏥 Medical Info' : '🏷️ Digital ID'}
            </button>
          ))}
        </div>

        {tab === 'recovery' && (
          <div className="tab-panel">
            <div className="form-group">
              <label>Owner name</label>
              <input type="text" value={form.owner_name} onChange={set('owner_name')} placeholder="Your full name" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Primary phone</label>
                <input type="tel" value={form.owner_phone} onChange={set('owner_phone')} placeholder="+1-555-0100" />
              </div>
              <div className="form-group">
                <label>Alternate phone</label>
                <input type="tel" value={form.alt_phone} onChange={set('alt_phone')} placeholder="+1-555-0101" />
              </div>
            </div>
          </div>
        )}

        {tab === 'medical' && (
          <div className="tab-panel">
            <div className="form-group">
              <label>Allergies</label>
              <textarea value={form.allergies} onChange={set('allergies')} placeholder="e.g. Pollen, Chicken" />
            </div>
            <div className="form-group">
              <label>Medications</label>
              <textarea value={form.medications} onChange={set('medications')} placeholder="e.g. Apoquel 16mg daily" />
            </div>
            <div className="form-group">
              <label>Conditions</label>
              <textarea value={form.conditions} onChange={set('conditions')} placeholder="e.g. Seasonal allergies, hip dysplasia" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Vet name</label>
                <input type="text" value={form.vet_name} onChange={set('vet_name')} placeholder="Dr. Sarah Mills" />
              </div>
              <div className="form-group">
                <label>Vet phone</label>
                <input type="tel" value={form.vet_phone} onChange={set('vet_phone')} placeholder="+1-555-0200" />
              </div>
            </div>
          </div>
        )}

        {tab === 'digital' && (
          <div className="tab-panel">
            <div className="form-group">
              <label>Pet name</label>
              <input type="text" value={form.name} onChange={set('name')} placeholder="Luna" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Species</label>
                <input type="text" value={form.species} onChange={set('species')} placeholder="Dog" />
              </div>
              <div className="form-group">
                <label>Breed</label>
                <input type="text" value={form.breed} onChange={set('breed')} placeholder="Golden Retriever" />
              </div>
            </div>
            <div className="form-group">
              <label>Photo</label>
              <div className="photo-upload-area">
                {form.photo_url ? (
                  <img className="photo-preview" src={form.photo_url} alt="Preview" />
                ) : (
                  <div className="photo-preview-placeholder">
                    {form.species ? ({ dog:'🐶',cat:'🐱',rabbit:'🐰',bird:'🐦',fish:'🐟',hamster:'🐹' }[form.species.toLowerCase()] ?? '🐾') : '🐾'}
                  </div>
                )}
                <div className="photo-upload-actions">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading…' : form.photo_url ? 'Change photo' : 'Upload photo'}
                  </button>
                  {form.photo_url && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => setForm(prev => ({ ...prev, photo_url: '' }))}
                    >
                      Remove
                    </button>
                  )}
                  {uploadError && <span className="upload-error">{uploadError}</span>}
                </div>
              </div>
              <input
                type="url"
                value={form.photo_url}
                onChange={set('photo_url')}
                placeholder="Or paste a photo URL…"
                style={{ marginTop: 8 }}
              />
            </div>

            <div className="public-url-box">
              <label>Public NFC URL</label>
              <div className="url-copy-row">
                <input type="text" readOnly value={publicUrl} />
                <button className="btn btn-secondary btn-sm" onClick={copyUrl}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <div className="qr-section">
                <label>QR Code</label>
                <QRCodeSVG value={publicUrl} size={160} />
              </div>
            </div>

            {nfcSupported && (
              <button className="btn btn-secondary" onClick={writeNFC}>
                📡 Write to NFC tag
              </button>
            )}
          </div>
        )}

        <div className="editor-actions">
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          {saveMsg && <span className="success-msg">{saveMsg}</span>}
          {error && <span className="error-msg">{error}</span>}
        </div>
      </div>
    </>
  );
}
