import SidebarTitle from "./SidebarTitle";
import ConversationCard from "./ConversationCard";

const MainSidebar = () => {
  return (
    <section className="md:col-span-1 col-span-4 h-full md:border-l md:border-zinc-700 overflow-y-auto pb-16">
      {/* Conversations header */}
      <SidebarTitle />

      {/* Conversation Cards list */}
      <ul className="list-none flex flex-col">
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
      </ul>
    </section>
  );
};

export default MainSidebar;
