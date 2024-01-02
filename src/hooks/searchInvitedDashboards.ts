import { useEffect, useState } from 'react';
import { InvitationProps } from '@/pages/api/mock';

const searchInvitedDashboards = (data: InvitationProps[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<InvitationProps[] | null>(
    null,
  );

  const getFilteredItems = (searchTerm: string, items: InvitationProps[]) => {
    if (!searchTerm) {
      setFilteredItems(null);
      return;
    }
    const filtered = items.filter((item) =>
      item.dashboard.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (!data) return;
    getFilteredItems(searchTerm, data);
  }, [searchTerm, data]);

  return {
    searchTerm,
    handleSearchChange,
    filteredItems,
  };
};

export default searchInvitedDashboards;
