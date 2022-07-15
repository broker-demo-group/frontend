import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { User as UserIcon } from "../icons/user";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import fetchJson from "../lib/fetchJson";

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
            href="/login"
            title="Logout"
            onClick={async (e) => {
              e.preventDefault();
              fetch("/backendservice/logout", { method: "POST" })
                .then((res) => res.json())
                .then((e) => console.log(`logout: ${e}`))
                .catch((e) => console.log(`logout error: ${e}`));
              fetchJson("/backendservice/logout", { method: "POST" })
                .then((e) => console.log(`logout: ${e}`))
                .catch((e) => console.log(`logout error: ${e}`));
              // axios.post('/logout').then(res => console.log(`logout res: ${res}`)).catch(err => console.log(`error logout: ${err}`));
              // mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false);
              router.push("/login");
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
