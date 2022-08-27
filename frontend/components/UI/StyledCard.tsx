import { Card } from "@mui/material";
import { alpha, styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.main,
  transition: "all 0.5s cubic-bezier(.25,.8,.25,1)",
  cursor: "pointer",
  whiteSpace: "pre-line",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

export default StyledCard;
