import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { loginAtom } from '@/store/loginAtom';
import DescriptionSection from '@/containers/Landing/components/DescriptionSection';
import FeatureContainer from '@/containers/Landing/components/FeatureContainer';
import Footer from '@/containers/Landing/components/Footer';
import MainSection from '@/containers/Landing/components/MainSection';
import Header from '@/components/Header';
import SubDescriptionSection from './components/SubDescription';

export default function Landing() {
  const loginInfo = useAtomValue(loginAtom);

  const router = useRouter();

  const isLoggedIn = loginInfo.isLoggedIn;

  if (isLoggedIn) {
    router.push('/mydashboard');
    return null;
  }
  return (
    <div className='flex-center flex-col'>
      <Header />
      <MainSection />
      <DescriptionSection />
      <SubDescriptionSection />
      <div className='text-22 mb-90 font-bold tablet:text-[36px]'>
        생산성을 높이는 다양한 설정 ⚡
      </div>
      <FeatureContainer />
      <Footer />
    </div>
  );
}