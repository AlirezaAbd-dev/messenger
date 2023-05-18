import CheckedCircleLogoSvg from "../ui/CheckedCircleLogoSvg";
import CheckedLogoSvg from "../ui/CheckedLogoSvg";
import PendingClockLogoSvg from "../ui/PendingClockLogoSvg";

const ChatCard = (props: {
  isYou: boolean;
  seen?: boolean;
  pending?: boolean;
}) => {
  const messageState =
    (props.isYou && !props.pending && props.seen === true && (
      <CheckedCircleLogoSvg />
    )) ||
    (props.isYou && !props.pending && !props.seen && <CheckedLogoSvg />) ||
    (props.isYou && props.pending && <PendingClockLogoSvg />);

  return (
    <li className={`flex ${props.isYou ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex flex-col justify-start items-start h-auto m-4 pb-2 px-3 min-w-fit ${
          props.isYou ? "bg-yellow-500 text-zinc-950" : "bg-zinc-600 text-white"
        }  rounded-lg`}
      >
        <p
          className="whitespace-pre-line max-w-[250px] sm:max-w-[500px] md:max-w-xl lg:max-w-3xl xl:max-w-5xl overflow-hidden"
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
          <span className="text-xs mt-2">23:45</span>
        </div>
      </div>
    </li>
  );
};

export default ChatCard;
