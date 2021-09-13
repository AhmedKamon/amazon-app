import {
  AppBar,
  Container,
  Link,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import Head from 'next/head';
import React, { useState, useContext } from 'react';
import NextLink from 'next/link';
import useStles from '../Utiles/styles';
import { Store } from '../Utiles/store';
import Cookies from 'js-cookie';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStles();
  const darkModeHandler = () => {
    console.log(darkMode, 'dark');

    const newDarkMode = !darkMode;

    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    console.log(Cookies, 'cooki');
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description ? (
          <meta name="description" content={description}></meta>
        ) : (
          ''
        )}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>

            <Switch checked={darkMode} onChange={darkModeHandler}></Switch>
            <NextLink href="/cart" passHref>
              <Link>
                <Typography>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Typography>
              </Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>
                <Typography>Login</Typography>
              </Link>
            </NextLink>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All right reserved</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
