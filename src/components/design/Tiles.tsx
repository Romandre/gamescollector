import { css } from "../../../styled-system/css";

export const Tiles = ({ array }: { array: string[] }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      })}
    >
      {array?.map((items) => (
        <p
          key={items}
          className={`tile ${css({
            px: {
              base: 2,
              md: "9px",
            },
            py: 2,
            fontSize: 13,
            boxShadow: {
              base: "0px 0px 7px rgba(0,0,0,0.45)",
              md: "0px 0px 6px rgba(0,0,0,0.35)",
            },
          })}`}
        >
          {items}
        </p>
      ))}
    </div>
  );
};
