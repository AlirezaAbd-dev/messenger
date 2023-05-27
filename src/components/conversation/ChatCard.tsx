import Icons from "../ui/Icons";

const ChatCard = (props: {
  isYou: boolean;
  seen?: boolean;
  pending?: boolean;
}) => {
  const messageState =
    (props.isYou && !props.pending && props.seen === true && (
      <Icons.CheckedCircleLogoSvg />
    )) ||
    (props.isYou && !props.pending && !props.seen && (
      <Icons.CheckedLogoSvg />
    )) ||
    (props.isYou && props.pending && <Icons.PendingClockLogoSvg />);

  return (
    <li className={`flex ${props.isYou ? "justify-start" : "justify-end"}`}>
      <div
        className={`m-4 flex h-auto min-w-fit flex-col items-start justify-start px-3 pb-2 ${
          props.isYou ? "bg-yellow-500 text-zinc-950" : "bg-zinc-600 text-white"
        }  rounded-lg`}
      >
        <p
          className="max-w-[250px] overflow-hidden whitespace-pre-line sm:max-w-[500px] md:max-w-xl lg:max-w-3xl xl:max-w-5xl"
          style={{
            overflowWrap: "break-word",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi debitis
          error quisquam aut molestiae pariatur et, perspiciatis natus optio
          odio cum obcaecati sapiente harum tempora? Soluta sequi exercitationem
          harum est.
        </p>
        <div
          className={`flex items-center ${
            props.isYou ? "justify-start" : "justify-end"
          } w-full`}
        >
          {messageState}
          <span className="mt-2 text-xs">23:45</span>
        </div>
      </div>
    </li>
  );
};

export default ChatCard;
