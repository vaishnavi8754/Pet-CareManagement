/*import React, { useEffect, useState } from "react";
import PetsViewer from "./PetsViewer";
import { useAuthContext } from "../../hooks/UseAuthContext";

const Pets = () => {
  const [filter, setFilter] = useState("all");
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user || !user.token) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:4000/approvedPets', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch pets data');
        }
        const data = await response.json();
        setPetsData(data);
        setError(null); 
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching the data');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const filteredPets = petsData.filter((pet) => {
    if (filter === "all") {
      return true;
    }
    return pet.type === filter;
  });

  return (
    <>
      <div className="filter-selection">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All Pets</option>
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
          <option value="Rabbit">Rabbits</option>
          <option value="Bird">Birds</option>
          <option value="Fish">Fish</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="pet-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredPets.length > 0 ? (
          filteredPets.map((petDetail, index) => (
            <PetsViewer pet={petDetail} key={index} />
          ))
        ) : (
          <p className="oops-msg">Oops!... No pets available</p>
        )}
      </div>
    </>
  );
};

export default Pets;*/

/*import React, { useEffect, useState } from "react";
import PetsViewer from "./PetsViewer";
import { useAuthContext } from "../../hooks/UseAuthContext";

const Pets = () => {
  const [filter, setFilter] = useState("all");
  const [petsData, setPetsData] = useState([]); // Initial state as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user || !user.token) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/approvedPets', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pets data');
        }

        const data = await response.json();

        // Check if the data is an array before setting it
        if (Array.isArray(data)) {
          setPetsData(data);
          setError(null);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching the data');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  // Ensure petsData is always an array before applying filter
  const filteredPets = Array.isArray(petsData)
    ? petsData.filter((pet) => {
        if (filter === "all") {
          return true;
        }
        return pet.type === filter;
      })
    : []; // Fallback to empty array if petsData is not an array

  return (
    <>
      <div className="filter-selection">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All Pets</option>
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
          <option value="Rabbit">Rabbits</option>
          <option value="Bird">Birds</option>
          <option value="Fish">Fish</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="pet-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredPets.length > 0 ? (
          filteredPets.map((petDetail, index) => (
            <PetsViewer pet={petDetail} key={index} />
          ))
        ) : (
          <p className="oops-msg">Oops!... No pets available</p>
        )}
      </div>
    </>
  );
};

export default Pets;*/
import React, { useEffect, useState } from "react";
import PetsViewer from "./PetsViewer";
import { useAuthContext } from "../../hooks/UseAuthContext";

const Pets = () => {
  const [filter, setFilter] = useState("all");
  const [petStatusFilter, setPetStatusFilter] = useState("all");
  const [petsData, setPetsData] = useState([]); // Initial state as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user || !user.token) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/approvedPets", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch pets data");
        }

        const data = await response.json();

        // Check if the data is an array before setting it
        if (Array.isArray(data)) {
          setPetsData(data);
          setError(null);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  // Ensure petsData is always an array before applying filters
  const filteredPets = Array.isArray(petsData)
    ? petsData.filter((pet) => {
        if (filter !== "all" && pet.type !== filter) {
          return false;
        }
        if (petStatusFilter !== "all" && pet.status !== petStatusFilter) {
          return false;
        }
        return true;
      })
    : []; // Fallback to empty array if petsData is not an array

  return (
    <>
      <div className="filter-selection">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All Pets</option>
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
          <option value="Rabbit">Rabbits</option>
          <option value="Bird">Birds</option>
          <option value="Fish">Fish</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={petStatusFilter}
          onChange={(event) => setPetStatusFilter(event.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Home Pet">Home Pets</option>
          <option value="Homeless Pet">Homeless Pets</option>
        </select>
      </div>

      <div className="pet-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredPets.length > 0 ? (
          filteredPets.map((petDetail, index) => (
            <PetsViewer pet={petDetail} key={index} />
          ))
        ) : (
          <p className="oops-msg">Oops!... No pets available</p>
        )}
      </div>
    </>
  );
};

export default Pets;

