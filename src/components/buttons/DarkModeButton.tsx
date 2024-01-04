import { useAtom } from 'jotai';
import { themeAtom } from '@/store/colorSchemeAtom';
import { IconMoonDark, IconMoonLight } from '@/public/svgs';

function DarkModeButton() {
  const [theme, toggleTheme] = useAtom(themeAtom);

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? <IconMoonLight /> : <IconMoonDark />}
    </button>
  );
}

export default DarkModeButton;
