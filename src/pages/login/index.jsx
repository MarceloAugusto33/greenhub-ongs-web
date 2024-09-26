import { z } from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/authContext";
import { HeaderComponent } from "../../components/header";
import { Box, Divider, InputAdornment, TextField, Button, Typography, Link as MLink, IconButton, CircularProgress, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const formularioLogin = z.object({
    email: z.string().min(4, "Minimo de 4 caracteres").email("Email invalido"),
    password: z.string().min(4, "Minimo de 4 caracteres").max(30)
});

export function LoginPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formularioLogin),
        mode: 'onChange'
    });

    const { loginUser } = useAuth();

    async function handleLogin(data) {
        setLoading(true);
        await loginUser(data.email, data.password);
        setLoading(false);
    }

    return (
        <Box sx={{ display: "flex", minHeight: '100vh' }}>
            <Box sx={{ width: '500px', overflowY: 'auto' }}>
                <Box
                    sx={{
                        padding: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4rem',
                        justifyContent: 'space-between',
                    }}>


                    <HeaderComponent />

                    <Box
                        sx={{
                            marginTop: '4rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            padding: '2rem',
                        }}
                        component='form'
                        onSubmit={handleSubmit(handleLogin)}
                    >

                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700 }}
                        >
                            Acesse sua conta
                        </Typography>

                        <TextField
                            helperText={errors?.email?.message}
                            error={!!errors.email}
                            {...register("email")}
                            fullWidth
                            required
                            type='email'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{
                                                display: 'flex',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <PersonIcon />

                                            <Divider orientation="vertical" flexItem />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            label="E-mail"
                        />

                        <TextField
                            helperText={errors?.password?.message}
                            error={!!errors.password}
                            {...register('password')}
                            fullWidth
                            required
                            type={isShowPassword ? 'text' : "password"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{
                                                display: 'flex',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <KeyIcon />

                                            <Divider orientation="vertical" flexItem />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setIsShowPassword(prev => !prev)}
                                        >
                                            {isShowPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    )
                                },
                            }}
                            label="Senha"
                        />

                        <Box
                            sx={{
                                display: 'flex'
                            }}
                        >
                            <Typography>Você não tem conta? </Typography>
                            <Box
                                component={Link}
                                to='/registro'
                                sx={{
                                    color: '#22703E'
                                }}
                            >
                                Cadastre-se
                            </Box>
                        </Box>

                        <Button
                            disabled={loading}
                            type="submit"
                            variant='contained'
                            sx={{
                                backgroundColor: '#22703E',
                                height: '3.5rem',
                                width: '50%',
                                margin: '0 auto',
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : "Entrar"}
                        </Button>

                    </Box>
                    <Box sx={{
                        marginTop: '5rem',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem'
                    }}>
                        <MLink
                            href="#"
                            sx={{
                                color: '#22703E',
                                cursor: 'pointer',
                            }}
                        >
                            Termos de Uso
                        </MLink>

                        <MLink
                            href="#"
                            sx={{
                                color: '#22703E',
                                cursor: 'pointer',
                                marginLeft: '2rem',
                            }}
                        >
                            LGPD
                        </MLink>
                    </Box>

                </Box>
            </Box>

            <Box
                component='img'
                src='/paraguaio.png'
                alt='Imagem de floresta'
                sx={{
                    objectFit: 'cover',
                    flex: '1',
                }}
            />
        </Box>
    )
}