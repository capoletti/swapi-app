// src/react-app/pages/ListPage.tsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getResources } from '../services/swapiService';
import LoadingSpinner from '../components/LoadingSpinner';
import './ListPage.css';

interface Resource {
  url: string;
  name?: string;
  title?: string;
}

const ListPage = ({ resource }: { resource: string }) => {
  const [data, setData] = useState<{ count: number; results: Resource[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getResources(resource, page, search);
        setData(result);
      } catch (error) {
        console.error(`Failed to fetch ${resource}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resource, page, search]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSearch = formData.get('search') as string;
    setSearchParams({ search: newSearch, page: '1' });
  };

  if (loading) return <LoadingSpinner />;
  if (!data) return <div>No data found for {resource}.</div>;

  const totalPages = Math.ceil(data.count / 10);

  return (
    <div className="list-page">
      <h1 className="list-title">{resource.charAt(0).toUpperCase() + resource.slice(1)}</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input type="text" name="search" defaultValue={search} placeholder="Search..." className="search-input" />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="resource-list">
        {data.results.map((item) => {
          const id = item.url.split('/').filter(Boolean).pop();
          return (
            <Link key={id} to={`/${resource}/${id}`} className="resource-card">
              <h2>{item.name || item.title}</h2>
            </Link>
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={() => setSearchParams({ search, page: `${page - 1}` })} disabled={page <= 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setSearchParams({ search, page: `${page + 1}` })} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ListPage;
