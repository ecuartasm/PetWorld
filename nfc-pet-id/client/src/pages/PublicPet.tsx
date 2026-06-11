import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import type { PublicPet as PublicPetType } from '../types';

export default function PublicPet() {
  const { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<PublicPetType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!petId) return;
    api.getPublicPet(petId)
      .then(setPet)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [petId]);

  if (loading) return <div className="page-loading">Loading…</div>;

  if (notFound || !pet) {
    return (
      <div className="public-page">
        <div className="public-topbar">
          <span className="public-topbar-icon">🐾</span> PawTag
        </div>
        <div className="public-404">
          <div className="public-404-icon">😕</div>
          <h2>Pet not found</h2>
          <p>This tag doesn't match any pet profile. It may have been removed by the owner.</p>
        </div>
      </div>
    );
  }

  const hasRecovery = pet.owner_phone || pet.owner_name || pet.alt_phone;
  const hasMedical = pet.allergies || pet.medications || pet.conditions || pet.vet_name;

  const speciesEmoji: Record<string, string> = {
    dog: '🐶', cat: '🐱', rabbit: '🐰', bird: '🐦', fish: '🐟', hamster: '🐹',
  };
  const emoji = pet.species ? (speciesEmoji[pet.species.toLowerCase()] ?? '🐾') : '🐾';

  return (
    <div className="public-page">
      <div className="public-topbar">
        <span className="public-topbar-icon">🐾</span> PawTag
      </div>

      {/* Hero */}
      <div className="public-hero">
        {pet.photo_url ? (
          <img className="public-hero-photo" src={pet.photo_url} alt={pet.name} />
        ) : (
          <div className="public-hero-placeholder">{emoji}</div>
        )}
        <div className="public-hero-info">
          <div className="public-pet-name">{pet.name}</div>
          <div className="public-pet-breed">
            {[pet.species, pet.breed].filter(Boolean).join(' · ')}
          </div>
        </div>
      </div>

      {/* Recovery */}
      {hasRecovery && (
        <div className="public-section">
          <div className="public-section-label">Lost pet? Call now</div>
          {pet.owner_phone && (
            <a className="call-btn" href={`tel:${pet.owner_phone}`}>
              <span className="call-btn-icon">📞</span>
              <span className="call-btn-text">
                {pet.owner_name && <span className="call-btn-name">Call {pet.owner_name}</span>}
                <span className="call-btn-number">{pet.owner_phone}</span>
              </span>
            </a>
          )}
          {pet.alt_phone && (
            <div className="alt-phone">
              Alt: <a href={`tel:${pet.alt_phone}`}>{pet.alt_phone}</a>
            </div>
          )}
        </div>
      )}

      {/* Medical */}
      {hasMedical && (
        <div className="public-section">
          <div className="public-section-label">Medical info</div>
          <div className="med-grid">
            {pet.allergies && (
              <div className="med-item">
                <span className="med-icon">⚠️</span>
                <div className="med-body">
                  <div className="med-label">Allergies</div>
                  <div className="med-value">{pet.allergies}</div>
                </div>
              </div>
            )}
            {pet.medications && (
              <div className="med-item">
                <span className="med-icon">💊</span>
                <div className="med-body">
                  <div className="med-label">Medications</div>
                  <div className="med-value">{pet.medications}</div>
                </div>
              </div>
            )}
            {pet.conditions && (
              <div className="med-item">
                <span className="med-icon">🏥</span>
                <div className="med-body">
                  <div className="med-label">Conditions</div>
                  <div className="med-value">{pet.conditions}</div>
                </div>
              </div>
            )}
            {(pet.vet_name || pet.vet_phone) && (
              <div className="med-item">
                <span className="med-icon">🩺</span>
                <div className="med-body">
                  <div className="med-label">Veterinarian</div>
                  <div className="med-value">
                    {pet.vet_name}
                    {pet.vet_name && pet.vet_phone && <br />}
                    {pet.vet_phone && (
                      <a href={`tel:${pet.vet_phone}`} style={{ color: 'var(--primary)' }}>{pet.vet_phone}</a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Digital ID */}
      <div className="public-section">
        <div className="public-section-label">Digital ID</div>
        <div className="id-grid">
          <div className="id-item">
            <div className="id-item-label">Name</div>
            <div className="id-item-value">{pet.name}</div>
          </div>
          {pet.species && (
            <div className="id-item">
              <div className="id-item-label">Species</div>
              <div className="id-item-value">{pet.species}</div>
            </div>
          )}
          {pet.breed && (
            <div className="id-item">
              <div className="id-item-label">Breed</div>
              <div className="id-item-value">{pet.breed}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
