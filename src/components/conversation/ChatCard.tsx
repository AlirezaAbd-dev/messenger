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
        className={`m-4 flex h-auto min-w-fit flex-col items-start justify-start px-5 pb-3 pt-3 ${
          props.isYou ? "bg-yellow-500 text-zinc-950" : "bg-zinc-600 text-white"
        }  rounded-lg`}
      >
        <p
          className="max-w-[250px] overflow-hidden whitespace-pre-line sm:max-w-[500px] md:max-w-xl lg:max-w-3xl xl:max-w-5xl"
          style={{
            overflowWrap: "break-word",
          }}
        >
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
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
