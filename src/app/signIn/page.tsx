import MainContainer from "@/components/signIn/MainContainer";
import UserSvg from "@/components/ui/icons/UserSvg";
import Card from "@/components/signIn/Card";
import SubmitButton from "@/components/signIn/SubmitButton";
import Inputs from "@/components/signIn/Inputs";

const SignIn = () => {
  return (
    <MainContainer>
      {/* Card */}
      <Card>
        {/* User SVG */}
        <UserSvg />
        <Inputs />
      </Card>

      {/* Submit Button */}
      <SubmitButton />
    </MainContainer>
  );
};

export default SignIn;
