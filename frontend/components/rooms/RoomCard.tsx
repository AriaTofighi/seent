import React from "react";
import StyledCard from "../UI/StyledCard";

type Props = {
  children: React.ReactNode;
};

const RoomCard = ({ children }: Props) => {
  return <StyledCard variant="outlined">{children}</StyledCard>;
};

export default RoomCard;
