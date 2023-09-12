import FooterSection from '@/components/conversation/FooterSection';
import Header from '@/components/conversation/Header';
import MainChatSection from '@/components/conversation/MainChatSection';

const ConversationChat = () => {
   return (
      <section className='flex flex-col justify-between items-center col-span-3 h-full w-full'>
         {/* Header */}
         <Header />

         {/* Chat Section */}
         <MainChatSection />

         {/* Message Tools */}
         <FooterSection />
      </section>
   );
};

export default ConversationChat;
