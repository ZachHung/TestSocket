import { AppBar, Typography } from "@mui/material";

const Appbar = () => {
  return (
    <AppBar position='static' sx={{ p: 2 }}>
      <Typography variant='h4'>Socket Test</Typography>
    </AppBar>
  );
};
export default Appbar;
