import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { User as UserIcon } from "../icons/user";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { logout as apiLogout, LOGOUT } from "../api/account";
import useUser from "../lib/useUser";
import axios from "axios";
import logout from "src/pages/api/logout";

const items = [
  {
    href: "/",
    icon: <UserIcon fontSize="small" />,
    title: "Convert",
  },
  //must comment out if need to do automatic route to login page
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  //   const { user, mutateUser } = useUser();
  const router = useRouter();
  const { mutateUser } = useUser();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <Typography color="inherit" variant="subtitle1">
                Crypto Broker Demo
              </Typography>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => {
            return (
              <NavItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
                onClick={item.onClick}
              />
            );
          })}
          <NavItem
            key="Logout"
            icon={<XCircleIcon fontSize="small" />}
            title="Logout"
            href="/api/logout"
            onClick={async (e) => {
              e.preventDefault();
              // const logoutResponse = await apiLogout();
              // console.log(logoutResponse);
              const isLogoutSuccessful = await apiLogout();
              if (isLogoutSuccessful) {
                const response = await axios.post("/api/logout");
                if (response.message === undefined) {
                  mutateUser(response, false);
                  router.push("/login");
                } else {
                  console.log(`logout error: ${response.message}`);
                }
                return;
              }
              console.log(`failed logout...`);
            }}
          />
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
