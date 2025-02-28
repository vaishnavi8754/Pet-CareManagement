/*import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../../hooks/UseAuthContext';

const PetCards = (props) => {
  const [showJustificationPopup, setShowJustificationPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setshowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const { user } = useAuthContext();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
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
      const response = await fetch(`http://localhost:4000/approving/${props.pet._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: "Approved"
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

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
  }

  const deleteFormsAdoptedPet = async () => {
    setIsDeleting(true)
    try {
      const deleteResponses = await fetch(`http://localhost:4000/form/delete/many/${props.pet._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (!deleteResponses.ok) {
        throw new Error('Failed to delete forms');
      }
    } catch (err) {
    }finally{
      handleReject();
    }
  }

  const handleReject = async () => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${props.pet._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (!response.ok) {
        setShowErrorPopup(true);
        throw new Error('Failed to delete pet');
      } else {
        setshowDeletedSuccess(true);
      }
    } catch (err) {
      setShowErrorPopup(true);
      console.error('Error deleting pet:', err);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className='req-containter'>
      <div className='pet-view-card'>
        <div className='pet-card-pic'>
          <img src={`http://localhost:4000/images/${props.pet.filename}`} alt={props.pet.name} />
        </div>
        <div className='pet-card-details'>
          <h2>{props.pet.name}</h2>
          <p><b>Type:</b> {props.pet.type}</p>
          <p><b>Age:</b> {props.pet.age}</p>
          <p><b>Location:</b> {props.pet.area}</p>
          <p><b>Owner Email:</b> {props.pet.email}</p>
          <p><b>Owner Phone:</b> {props.pet.phone}</p>
          <p>
            <b>Justification:</b>
            <span>
              {truncateText(props.pet.justification, maxLength)}
              {props.pet.justification.length > maxLength && (
                <span onClick={() => setShowJustificationPopup(!showJustificationPopup)} className='read-more-btn'>
                  Read More
                </span>
              )}
            </span>
          </p>
          <p>{formatTimeAgo(props.pet.updatedAt)}</p>
        </div>
        <div className='app-rej-btn'>
          <button onClick={deleteFormsAdoptedPet} disabled={isDeleting || isApproving}>{isDeleting ? (<p>Deleting</p>) : (props.deleteBtnText)}</button>
          {props.approveBtn ?
            <button disabled={isDeleting || isApproving} onClick={handleApprove}>{isApproving ? (<p>Approving</p>) : 'Approve'}</button>
            : ''
          }
        </div>
        {showJustificationPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <h4>Justification:</h4>
              <p>{props.pet.justification}</p>
            </div>
            <button onClick={() => setShowJustificationPopup(!showJustificationPopup)} className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showErrorPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Oops!... Connection Error</p>
            </div>
            <button onClick={() => setShowErrorPopup(!showErrorPopup)} className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showApproved && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Approval Successful...</p>
              <p>
                Please contact the customer at{' '}
                <a href={`mailto:${props.pet.email}`}>{props.pet.email}</a>{' '}
                or{' '}
                <a href={`tel:${props.pet.phone}`}>{props.pet.phone}</a>{' '}
                to arrange the transfer of the pet from the owner's home to our adoption center.
              </p>
            </div>
            <button onClick={() => {
              setShowApproved(!showApproved)
              props.updateCards()
            }} className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}

        {showDeletedSuccess && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Deleted Successfully from Database...</p>
            </div>
            <button onClick={() => {
              setshowDeletedSuccess(!showDeletedSuccess)
              props.updateCards()
            }} className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PetCards; */
/*import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../../hooks/UseAuthContext';

const PetCards = (props) => {
  const [showJustificationPopup, setShowJustificationPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const { user } = useAuthContext();

  const truncateText = (text, maxLength) => {
    if (!text) return 'No justification provided'; // Fallback for undefined/null text
    return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
  };

  const maxLength = 40;

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const response = await fetch(`http://localhost:4000/approving/${props.pet._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: "Approved",
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
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
      const deleteResponses = await fetch(`http://localhost:4000/form/delete/many/${props.pet._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      if (!deleteResponses.ok) {
        throw new Error('Failed to delete forms');
      }
    } catch (err) {
    } finally {
      handleReject();
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${props.pet._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
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

  const renderPetDetails = () => {
    return (
      <div>
        <p><b>Type:</b> {props.pet.type || 'Unknown'}</p>
        <p><b>Age:</b> {props.pet.age || 'Unknown'}</p>
        <p><b>Location:</b> {props.pet.area || 'Unknown'}</p>
        {props.pet.type === 'Homeless' && (
          <p><b>Found At:</b> {props.pet.foundAt || 'Not specified'}</p>
        )}
        {props.pet.type === 'Home' && (
          <>
            <p><b>Owner Email:</b> {props.pet.email || 'Not provided'}</p>
            <p><b>Owner Phone:</b> {props.pet.phone || 'Not provided'}</p>
          </>
        )}
        <p>
          <b>Justification:</b>
          <span>
            {truncateText(props.pet.justification, maxLength)}
            {props.pet.justification?.length > maxLength && (
              <span
                onClick={() => setShowJustificationPopup(!showJustificationPopup)}
                className='read-more-btn'>
                Read More
              </span>
            )}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className='req-containter'>
      <div className='pet-view-card'>
        <div className='pet-card-pic'>
          <img src={`http://localhost:4000/images/${props.pet.filename}`} alt={props.pet.name || 'Pet'} />
        </div>
        <div className='pet-card-details'>
          <h2>{props.pet.name || 'Unnamed Pet'}</h2>
          {renderPetDetails()}
          <p>{formatTimeAgo(props.pet.updatedAt)}</p>
        </div>
        <div className='app-rej-btn'>
          <button
            onClick={deleteFormsAdoptedPet}
            disabled={isDeleting || isApproving}>
            {isDeleting ? 'Deleting...' : props.deleteBtnText || 'Reject'}
          </button>
          {props.approveBtn && (
            <button
              onClick={handleApprove}
              disabled={isDeleting || isApproving}>
              {isApproving ? 'Approving...' : 'Approve'}
            </button>
          )}
        </div>
        {showJustificationPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <h4>Justification:</h4>
              <p>{props.pet.justification || 'No justification provided'}</p>
            </div>
            <button
              onClick={() => setShowJustificationPopup(!showJustificationPopup)}
              className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showErrorPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Oops!... Connection Error</p>
            </div>
            <button
              onClick={() => setShowErrorPopup(!showErrorPopup)}
              className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showApproved && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Approval Successful...</p>
              {props.pet.type === 'Home' && (
                <p>
                  Please contact the customer at{' '}
                  <a href={`mailto:${props.pet.email}`}>{props.pet.email}</a>{' '}
                  or{' '}
                  <a href={`tel:${props.pet.phone}`}>{props.pet.phone}</a>{' '}
                  to arrange the transfer of the pet from the owner's home to our adoption center.
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setShowApproved(!showApproved);
                props.updateCards();
              }}
              className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}

        {showDeletedSuccess && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Deleted Successfully from Database...</p>
            </div>
            <button
              onClick={() => {
                setShowDeletedSuccess(!showDeletedSuccess);
                props.updateCards();
              }}
              className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCards; */
/*import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../../hooks/UseAuthContext';

const PetCards = (props) => {
  const [showJustificationPopup, setShowJustificationPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const { user } = useAuthContext();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
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
      const response = await fetch(`http://localhost:4000/approving/${props.pet._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: "Approved"
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
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
      const deleteResponses = await fetch(`http://localhost:4000/form/delete/many/${props.pet._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (!deleteResponses.ok) {
        throw new Error('Failed to delete forms');
      }
    } catch (err) {
    } finally {
      handleReject();
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${props.pet._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
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

  const renderPetDetails = () => {
    const { type, age, area, foundAt, email, phone, justification } = props.pet;
    return (
      <div>
        <p><b>Type:</b> {type === 'Home' ? 'Home Pet' : 'Homeless Pet'}</p>
        <p><b>Age:</b> {age}</p>
        <p><b>Location:</b> {area}</p>
        {type === 'Homeless' && <p><b>Found At:</b> {foundAt || 'Not specified'}</p>}
        {type === 'Home' && (
          <>
            <p><b>Owner Email:</b> <a href={`mailto:${email}`}>{email}</a></p>
            <p><b>Owner Phone:</b> <a href={`tel:${phone}`}>{phone}</a></p>
          </>
        )}
        <p>
          <b>Justification:</b>
          <span>
            {truncateText(justification || 'No justification provided.', maxLength)}
            {justification && justification.length > maxLength && (
              <span onClick={() => setShowJustificationPopup(!showJustificationPopup)} className='read-more-btn'>
                Read More
              </span>
            )}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className='req-containter'>
      <div className='pet-view-card'>
        <div className='pet-card-pic'>
          <img src={`http://localhost:4000/images/${props.pet.filename}`} alt={props.pet.name} />
        </div>
        <div className='pet-card-details'>
          <h2>{props.pet.name}</h2>
          {renderPetDetails()}
          <p>{formatTimeAgo(props.pet.updatedAt)}</p>
        </div>
        <div className='app-rej-btn'>
          <button onClick={deleteFormsAdoptedPet} disabled={isDeleting || isApproving}>{isDeleting ? (<p>Deleting</p>) : (props.deleteBtnText)}</button>
          {props.approveBtn ?
            <button disabled={isDeleting || isApproving} onClick={handleApprove}>{isApproving ? (<p>Approving</p>) : 'Approve'}</button>
            : ''
          }
        </div>
        {showJustificationPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <h4>Justification:</h4>
              <p>{props.pet.justification}</p>
            </div>
            <button onClick={() => setShowJustificationPopup(!showJustificationPopup)} className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showErrorPopup && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Oops!... Connection Error</p>
            </div>
            <button onClick={() => setShowErrorPopup(!showErrorPopup)} className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showApproved && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Approval Successful...</p>
              {props.pet.type === 'Home' && (
                <p>
                  Please contact the owner at{' '}
                  <a href={`mailto:${props.pet.email}`}>{props.pet.email}</a>{' '} or{' '}
                  <a href={`tel:${props.pet.phone}`}>{props.pet.phone}</a>{' '}
                  to arrange the transfer of the pet.
                </p>
              )}
            </div>
            <button onClick={() => {
              setShowApproved(!showApproved);
              props.updateCards();
            }} className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
        {showDeletedSuccess && (
          <div className='popup'>
            <div className='popup-content'>
              <p>Deleted Successfully from Database...</p>
            </div>
            <button onClick={() => {
              setShowDeletedSuccess(!showDeletedSuccess);
              props.updateCards();
            }} className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCards;*/
/*import React, { useState } from 'react';
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
    const { age, area, email, phone, justification } = pet;
    return (
      <div>
        
        <p><b>Age:</b> {age}</p>
        <p><b>Location:</b> {area}</p>
        <p><b>Owner Email:</b> <a href={`mailto:${email}`}>{email}</a></p>
        <p><b>Owner Phone:</b> <a href={`tel:${phone}`}>{phone}</a></p>
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
    const { age, area, foundAt, justification } = pet;
    return (
      <div>
        <p><b>Age:</b> {age}</p>
        <p><b>Location:</b> {area}</p>
        <p><b>Found At:</b> {foundAt || 'Not specified'}</p>
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

  return (
    <div className='req-container'>
      <div className='pet-view-card'>
        <div className='pet-card-pic'>
          <img src={`http://localhost:4000/images/${pet.filename}`} alt={pet.name} />
        </div>
        <div className='pet-card-details'>
          <h2>{pet.name}</h2>
          {pet.status === 'Homepet' ? renderHomelessPetDetails() : renderHomePetDetails()}
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
              {pet.status === 'Homepet' && (
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

export default PetCards;*/
/*import React, { useState } from 'react';
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
    const { age, area, email, phone, justification } = pet;
    return (
      <div>
        <p><b>Age:</b> {age}</p>
        <p><b>Location:</b> {area}</p>
        <p><b>Owner Email:</b> <a href={`mailto:${email}`}>{email}</a></p>
        <p><b>Owner Phone:</b> <a href={`tel:${phone}`}>{phone}</a></p>
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
    const { age, area, foundAt, justification } = pet;
    return (
      <div>
        <p><b>Age:</b> {age}</p>
        <p><b>Location:</b> {area}</p>
        <p><b>Found At:</b> {foundAt || 'Not specified'}</p>
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

  return (
    <div className='req-container'>
      <div className='pet-view-card'>
        <div className='pet-card-pic'>
          <img src={`http://localhost:4000/images/${pet.filename}`} alt={pet.name} />
        </div>
        <div className='pet-card-details'>
          <h2>{pet.name}</h2>
          {pet.status === 'Home' ? renderHomePetDetails() : renderHomelessPetDetails()}
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
              {pet.status === 'Home' && (
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

export default PetCards;*/
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
    if (!text || text.length <= maxLength) return text || 'No justification provided.';
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
    const { age, area, email, phone, justification } = pet;
    return (
      <div>
        <p><b>Age:</b> {age}</p>
        <p><b>Area:</b> {area}</p>
        <p><b>Owner Email:</b> <a href={`mailto:${email}`}>{email}</a></p>
        <p><b>Owner Phone:</b> <a href={`tel:${phone}`}>{phone}</a></p>
        <p>
          <b>Justification:</b>{justification}
          <span>
            {truncateText(justification, maxLength)}
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
    const { posterName, type, daysInLocation, area, justification } = pet;
    return (
      <div>
        <p><b>Poster Name:</b> {posterName}</p>
        <p><b>Area:</b> {area}</p>
        <p><b>Type:</b> {type}</p>
        <p><b>Days in Location:</b> {daysInLocation}</p>
        <p>
          <b>Justification:</b>
          <span>
            {truncateText(justification, maxLength)}
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

  return (
    <div className='req-container'>
      <div className='pet-view-card'>
        <div className='pet-card-pic'>
          <img src={`http://localhost:4000/images/${pet.filename}`} alt={pet.name || pet.posterName} />
        </div>
        <div className='pet-card-details'>
          <h2>{pet.name || pet.posterName}</h2>
          <p><b>Category:</b> {pet.Status === 'Home' ? 'Home Pet' : 'Homeless Pet'}</p>
          
          {/* New Section to Display Pet Status */}
          <p><b>Status:</b> {pet.Status || 'Status not available'}</p>

          {pet.Status === 'Home' ? renderHomePetDetails() : renderHomelessPetDetails()}
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
              {pet.type === 'Home' && (
                <p>
                  Please contact the owner at{' '}
                  <a href={`mailto:${pet.email}`}>{pet.email}</a> or{' '}
                  <a href={`tel:${pet.phone}`}>{pet.phone}</a> to arrange the transfer of the pet.
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
