import { Card } from "@mui/material";
import { alpha, styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.main,
  transition: "all 0.5s cubic-bezier(.25,.8,.25,1)",
  whiteSpace: "pre-line",
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  borderRadius: 0,
  "&:hover": {
    // Using styled() to make use of alpha(). Cannot use MUIv5 system colours
    // Or maybe not -> sx={{ backgroundColor: (theme) => lighten(0.2, theme.palette.primary.main) }}
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

export default StyledCard;
