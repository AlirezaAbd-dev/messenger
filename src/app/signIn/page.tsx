import MainContainer from '@/components/signIn/MainContainer';
import Card from '@/components/signIn/Card';
import SubmitButton from '@/components/signIn/SubmitButton';
import Inputs from '@/components/signIn/Inputs';
import Icons from '@/components/ui/Icons';

const SignIn = () => {
   return (
      <MainContainer>
         {/* Card */}
         <Card>
            {/* User SVG */}
            <Icons.UserSvg />
            <Inputs />
         </Card>

         {/* Submit Button */}
         <SubmitButton />
      </MainContainer>
   );
};

export default SignIn;
