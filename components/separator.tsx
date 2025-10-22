interface Props {
  color?: string;
}

const Separator = (props: Props) => {
  return (
    <div
      className={`w-full h-[1px]`}
      style={{ backgroundColor: props.color ?? '#ddd' }}
    >
    </div>
  );
}

export default Separator;
