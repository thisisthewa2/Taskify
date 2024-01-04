import { useEffect, useState } from 'react';
import { InvitationProps, InvitationsProps } from 'src/types';
import fetch from '@/services/utils/fetch';

const useSearchInvitedDashboards = (data: InvitationsProps[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<InvitationProps[] | null>(
    null,
  );

  useEffect(() => {
    if (searchTerm !== '') {
      const getFilteredItems = async (search: string) => {
        if (!search) {
          setFilteredItems(null);
          return;
        }

        try {
          const { data: filteredData }: { data: InvitationsProps } =
            await fetch({
              url: 'invitations',
              method: 'get',
              params: {
                title: search,
              },
            });

          const invitations = filteredData.invitations;

          if (invitations.length > 0) {
            const filtered = invitations.filter((item) => {
              if (item.dashboard && item.dashboard.title) {
                return item.dashboard.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              }
              return false;
            });

            setFilteredItems(filtered);
          } else {
            setFilteredItems(null);
          }
        } catch (error) {
          console.error('Error fetching filtered data:', error);
          setFilteredItems(null);
        }
      };

      getFilteredItems(searchTerm);
    }
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return {
    searchTerm,
    handleSearchChange,
    filteredItems,
  };
};

export default useSearchInvitedDashboards;
