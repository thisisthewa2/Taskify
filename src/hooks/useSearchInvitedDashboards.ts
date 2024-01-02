import { useEffect, useState } from 'react';
import { InvitationProps } from '@/pages/api/mock';

const useSearchInvitedDashboards = (
  data: InvitationProps[] | undefined,
  delay: number = 1000,
) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<InvitationProps[] | null>(
    null,
  );

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const getFilteredItems = (search: string, items: InvitationProps[]) => {
      if (!search) {
        setFilteredItems(null);
        return;
      }
      const filtered = items.filter((item) =>
        item.dashboard.title.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredItems(filtered);
    };

    if (data && searchTerm) {
      debounceTimer = setTimeout(() => {
        getFilteredItems(searchTerm, data);
      }, delay);
    } else {
      setFilteredItems(null);
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, data, delay]); // 디바운싱: 검색어나 데이터가 변경된 경우 마다 타이머 설정, 딜레이 이후 getFilteredItem호출

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
