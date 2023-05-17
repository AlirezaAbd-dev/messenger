const ChatCard = (props: { isYou: boolean }) => {
  return (
    <li className={`flex ${props.isYou ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex flex-col justify-start items-start h-auto m-4 pb-2 px-3 min-w-fit ${
          props.isYou ? "bg-yellow-500 text-zinc-950" : "bg-zinc-600 text-white"
        }  rounded-lg`}
      >
        <p
          className="whitespace-pre-line max-w-xs md:max-w-5xl overflow-hidden"
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
          className={`flex ${
            props.isYou ? "justify-start" : "justify-end"
          } w-full`}
        >
          <span className="mx-3 text-xs mt-2">23:45</span>
        </div>
      </div>
    </li>
  );
};

export default ChatCard;
