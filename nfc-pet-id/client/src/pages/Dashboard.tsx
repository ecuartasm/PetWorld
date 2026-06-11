import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import type { Pet } from '../types';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  useEffect(() => {
    api.getPets()
      .then(setPets)
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate() {
    if (!newName.trim()) { setCreateError('Name is required'); return; }
    setCreating(true);
    setCreateError('');
    try {
      const pet = await api.createPet(newName.trim());
      setShowModal(false);
      setNewName('');
      navigate(`/pets/${pet.id}`);
    } catch (err) {
      setCreateError((err as Error).message);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.deletePet(id);
      setPets(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setDeleteId(null);
    }
  }

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  const speciesEmoji: Record<string, string> = {
    dog: '🐶', cat: '🐱', rabbit: '🐰', bird: '🐦', fish: '🐟', hamster: '🐹',
  };

  function petEmoji(species: string | null) {
    if (!species) return '🐾';
    return speciesEmoji[species.toLowerCase()] ?? '🐾';
  }

  return (
    <>
      <nav className="topnav">
        <Link to="/" className="topnav-brand">
          <span className="topnav-brand-icon">🐾</span> PawTag
        </Link>
        <div className="topnav-right">
          <span className="topnav-email">{user?.email}</span>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Sign out</button>
        </div>
      </nav>

      <div className="dashboard-page">
        <div className="dashboard-header">
          <h2>My Pets</h2>
          <button className="btn btn-primary" onClick={() => { setShowModal(true); setCreateError(''); setNewName(''); }}>
            + Add pet
          </button>
        </div>

        {loading ? (
          <div className="page-loading" style={{ minHeight: 200 }}>Loading…</div>
        ) : pets.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">🐾</span>
            <p>No pets yet. Add your first pet to get started.</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add pet</button>
          </div>
        ) : (
          <div className="pet-grid">
            {pets.map(pet => (
              <div key={pet.id} className="pet-card" onClick={() => setSelectedPet(pet)} style={{ cursor: 'pointer' }}>
                {pet.photo_url ? (
                  <img className="pet-card-photo" src={pet.photo_url} alt={pet.name} />
                ) : (
                  <div className="pet-card-photo-placeholder">{petEmoji(pet.species)}</div>
                )}
                <div className="pet-card-name">{pet.name}</div>
                <div className="pet-card-meta">
                  {[pet.species, pet.breed].filter(Boolean).join(' · ') || 'No details yet'}
                </div>
                <div className="pet-card-hint">Tap to view details</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create pet modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="modal">
            <h3>Add a new pet</h3>
            {createError && <div className="error-msg" style={{ marginBottom: 12 }}>{createError}</div>}
            <div className="form-group">
              <label>Pet name</label>
              <input
                type="text" autoFocus placeholder="e.g. Luna"
                value={newName} onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreate} disabled={creating}>
                {creating ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pet summary floating panel */}
      {selectedPet && (
        <div className="summary-backdrop" onClick={e => { if (e.target === e.currentTarget) setSelectedPet(null); }}>
          <div className="summary-panel">

            <div className="summary-panel-topbar">
              <h3>Pet summary</h3>
              <button className="modal-close-btn" onClick={() => setSelectedPet(null)}>✕</button>
            </div>

            <div className="summary-hero">
              {selectedPet.photo_url ? (
                <img className="summary-photo" src={selectedPet.photo_url} alt={selectedPet.name} />
              ) : (
                <div className="summary-photo-placeholder">{petEmoji(selectedPet.species)}</div>
              )}
              <div className="summary-hero-info">
                <div className="summary-name">{selectedPet.name}</div>
                <div className="summary-breed">
                  {[selectedPet.species, selectedPet.breed].filter(Boolean).join(' · ') || 'No species / breed set'}
                </div>
              </div>
            </div>

            <div className="summary-sections">
              <div className="summary-section">
                <div className="summary-section-label">Lost Pet Recovery</div>
                <div className="summary-rows">
                  <div className="summary-row"><span>Owner</span><span>{selectedPet.owner_name || '—'}</span></div>
                  <div className="summary-row"><span>Primary phone</span><span>{selectedPet.owner_phone || '—'}</span></div>
                  <div className="summary-row"><span>Alt phone</span><span>{selectedPet.alt_phone || '—'}</span></div>
                </div>
              </div>

              <div className="summary-section">
                <div className="summary-section-label">Medical Info</div>
                <div className="summary-rows">
                  <div className="summary-row"><span>Allergies</span><span>{selectedPet.allergies || '—'}</span></div>
                  <div className="summary-row"><span>Medications</span><span>{selectedPet.medications || '—'}</span></div>
                  <div className="summary-row"><span>Conditions</span><span>{selectedPet.conditions || '—'}</span></div>
                  <div className="summary-row"><span>Vet</span><span>{selectedPet.vet_name || '—'}</span></div>
                  <div className="summary-row"><span>Vet phone</span><span>{selectedPet.vet_phone || '—'}</span></div>
                </div>
              </div>
            </div>

            <div className="summary-footer">
              <button
                className="btn btn-danger"
                onClick={() => { setSelectedPet(null); setDeleteId(selectedPet.id); }}
              >
                Delete
              </button>
              <Link to={`/pets/${selectedPet.id}`} className="btn btn-primary">
                Edit profile
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* Confirm delete modal */}
      {deleteId && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setDeleteId(null); }}>
          <div className="modal">
            <h3>Delete pet?</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>
              This will permanently delete the pet profile and its public page.
              Anyone who taps the NFC tag will see "Pet not found".
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
