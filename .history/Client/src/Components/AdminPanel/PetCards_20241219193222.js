import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../../hooks/UseAuthContext';

const PetCards = ({ pet, approveBtn, deleteBtnText, updateCards }) => {
  const [showJustificationPopup, setShowJustificationPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const { user } = useAuthContext();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const maxLength = 40;

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const response = await fetch(`http://localhost:4000/approving/${pet._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'Approved' }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        setShowErrorPopup(true);
      } else {
        setShowApproved(true);
      }
    } catch (err) {
      setShowErrorPopup(true);
    } finally {
      setIsApproving(false);
    }
  };

  const deleteFormsAdoptedPet = async () => {
    setIsDeleting(true);
    try {
      const deleteResponses = await fetch(`http://localhost:4000/form/delete/many/${pet._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!deleteResponses.ok) throw new Error('Failed to delete forms');
    } catch (err) {
    } finally {
      handleReject();
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${pet._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        setShowErrorPopup(true);
        throw new Error('Failed to delete pet');
      } else {
        setShowDeletedSuccess(true);
      }
    } catch (err) {
      setShowErrorPopup(true);
      console.error('Error deleting pet:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderHomePetDetails = () => {
    const { name,type,age, area, email, phone, justification } = pet;
    return (
      <div>
        <p><b>Category:</b> {'Home Pet'}</p>
        <p><b>Pet Name:</b> {name}</p>
        <p><b>Pet Type:</b> {type}</p>
        <p><b>Age:</b> {age}</p>
        <p><b>Location:</b> {area}</p>
        <p><b>Owner Email:</b> <a href={`mailto:${email}`}>{email}</a></p>
        <p><b>Owner Phone:</b> <a href={`tel:${phone}`}>{phone}</a></p>
        <p><b>Location:</b> {area}</p>
        <p>
          <b>Justification:</b>
          <span>
            {truncateText(justification || 'No justification provided.', maxLength)}
            {justification && justification.length > maxLength && (
              <span onClick={() => setShowJustificationPopup(true)} className='read-more-btn'>
                Read More
              </span>
            )}
          </span>
        </p>
      </div>
    );
  };

  const renderHomelessPetDetails = () => {
    const { posterName,type, area,email,phone, daysInLocation } = pet;
    return (
      <div>
        <p><b>category:</b> {'Homeless Pet'}</p>
        <p><b>Poster Name:</b> {posterName}</p>
        <p><b>Pet Type:</b> {type}</p>
        <p><b>Location:</b> {area}</p>
        <p><b>Days in Location:</b> {daysInLocation}</p>
        <p><b>Poster Email:</b> <a href={`mailto:${email}`}>{email}</a></p>
        <p><b>Poster Phone:</b> <a href={`tel:${phone}`}>{phone}</a></p>
      </div>
    );
  };

  return (
    <div className='req-container'>
      <div className='pet-view-card'>
        <div className='pet-card-pic'>
          <img src={`http://localhost:4000/images/${pet.filename}`} alt={pet.name} />
        </div>
        <div className='pet-card-details'>
          <h2>{pet.name}</h2>
          {pet.petStatus=== 'Home Pet' ? renderHomelessPetDetails() : renderHomePetDetails()}
          <p>{formatTimeAgo(pet.updatedAt)}</p>
        </div>
        <div className='app-rej-btn'>
          <button onClick={deleteFormsAdoptedPet} disabled={isDeleting || isApproving}>
            {isDeleting ? 'Deleting...' : deleteBtnText}
          </button>
          {approveBtn && (
            <button disabled={isDeleting || isApproving} onClick={handleApprove}>
              {isApproving ? 'Approving...' : 'Approve'}
            </button>
          )}
        </div>
        {showJustificationPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <h4>Justification:</h4>
              <p>{pet.justification}</p>
            </div>
            <button onClick={() => setShowJustificationPopup(false)} className='close-btn'>
              Close <i className='fa fa-times'></i>
            </button>
          </div>
        )}
        {showErrorPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Oops!... Connection Error</p>
            </div>
            <button onClick={() => setShowErrorPopup(false)} className='close-btn'>
              Close <i className='fa fa-times'></i>
            </button>
          </div>
        )}
        {showApproved && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Approval Successful...</p>
              {pet.petStatus === 'Home Pet' && (
                <p>
                  Please contact the owner at{' '}
                  <a href={`mailto:${pet.email}`}>{pet.email}</a>{' '}or{' '}
                  <a href={`tel:${pet.phone}`}>{pet.phone}</a>{' '}to arrange the transfer of the pet.
                </p>
              )}
            </div>
            <button onClick={() => {
              setShowApproved(false);
              updateCards();
            }} className='close-btn'>
              Close <i className='fa fa-times'></i>
            </button>
          </div>
        )}
        {showDeletedSuccess && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Deleted Successfully from Database...</p>
            </div>
            <button onClick={() => {
              setShowDeletedSuccess(false);
              updateCards();
            }} className='close-btn'>
              Close <i className='fa fa-times'></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCards;