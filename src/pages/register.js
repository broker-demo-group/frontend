import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            policy: false
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(255)
                .required(
                    'Username is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required'),
            policy: Yup
                .boolean()
                .oneOf(
                    [true],
                    'This field must be checked'
                )
        }),
        onSubmit: () => {
            router.push('/');
        }
    });

    return (
        <>
            <Head>
                <title>
                    Register | Broker Demo
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth="sm">
                    <NextLink
                        href="/"
                        passHref
                    >
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small"/>}
                        >
                            Dashboard
                        </Button>
                    </NextLink>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{my: 3}}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Create a new account
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Use your username to create a new account
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.username && formik.errors.username)}
                            fullWidth
                            helperText={formik.touched.username && formik.errors.username}
                            label="Username"
                            margin="normal"
                            name="username"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="username"
                            value={formik.values.username}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                        />
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1
                            }}
                        >
                            <Checkbox
                                checked={formik.values.policy}
                                name="policy"
                                onChange={formik.handleChange}
                            />
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                I have read the
                                {' '}
                                <NextLink
                                    href="#"
                                    passHref
                                >
                                    <Link
                                        color="primary"
                                        underline="always"
                                        variant="subtitle2"
                                    >
                                        Terms and Conditions
                                    </Link>
                                </NextLink>
                            </Typography>
                        </Box>
                        {Boolean(formik.touched.policy && formik.errors.policy) && (
                            <FormHelperText error>
                                {formik.errors.policy}
                            </FormHelperText>
                        )}
                        <Box sx={{py: 2}}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Sign Up Now
                            </Button>
                        </Box>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Have an account?
                            {' '}
                            <NextLink
                                href="/login"
                                passHref
                            >
                                <Link
                                    variant="subtitle2"
                                    underline="hover"
                                >
                                    Sign In
                                </Link>
                            </NextLink>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register;
