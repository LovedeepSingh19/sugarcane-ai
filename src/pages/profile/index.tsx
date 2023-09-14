import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import RouteGuard from "~/components/RouteGuard";

export default function Profile() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );
  

  return (
    <RouteGuard>
    <div className="w-full">
      <Typography variant="h5" fontWeight={700}>
        Profile
      </Typography>

      <Card className="mt-3" variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Profile
          </Typography>
          <Divider className="my-4" />
           
          <Avatar className="h-16 w-16" alt="Profile Image" src={sessionData && sessionData.user?.image} />

          <Typography sx={{ fontSize: 16 }} className="mt-4" gutterBottom>
          {sessionData && sessionData.user?.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
          {sessionData && sessionData.user?.email}
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="outlined"
        className="mt-4"
        onClick={() => void signOut()}
      >
        Logout
      </Button>
    </div>
    </RouteGuard>
  );
}
