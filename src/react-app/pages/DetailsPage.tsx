// src/react-app/pages/DetailsPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResourceById } from '../services/swapiService';
import { getDisplayFields } from '../utils/displayFields';
import LoadingSpinner from '../components/LoadingSpinner';
import './DetailsPage.css';

const DetailsPage = ({ resource }: { resource: string }) => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const result = await getResourceById(resource, id);
        setItem(result);
      } catch (error) {
        console.error(`Failed to fetch ${resource} with id ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resource, id]);

  if (loading) return <LoadingSpinner />;
  if (!item) return <div>Item not found.</div>;

  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((url) => {
            const parts = url.split('/').filter(Boolean);
            const resourceType = parts[parts.length - 2];
            const resourceId = parts[parts.length - 1];
            return (
              <li key={url}>
                <Link to={`/${resourceType}/${resourceId}`}>{`${resourceType} ${resourceId}`}</Link>
              </li>
            );
          })}
        </ul>
      );
    }
    if (typeof value === 'string' && value.includes('swapi.dev/api')) {
      const parts = value.split('/').filter(Boolean);
      const resourceType = parts[parts.length - 2];
      const resourceId = parts[parts.length - 1];
      return <Link to={`/${resourceType}/${resourceId}`}>{`${resourceType} ${resourceId}`}</Link>;
    }
    return value;
  };

  const displayFields = getDisplayFields(resource);
  const keysToRender = displayFields || Object.keys(item);

  return (
    <div className="details-page">
      <h1 className="details-title">{item.name || item.title}</h1>
      <div className="details-grid">
        {keysToRender.map((key) => {
          const value = item[key];
          if (!value || (Array.isArray(value) && value.length === 0)) {
            return null;
          }
          if (key === 'name' || key === 'title') {
            return null;
          }
          return (
            <div key={key} className="details-field">
              <strong>{key.replace(/_/g, ' ')}:</strong>
              <div>{renderValue(value)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsPage;
