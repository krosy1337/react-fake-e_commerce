import React, {FC, useEffect, useState} from 'react'
import {
    Alert,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Snackbar,
    TextField,
    Typography
} from "@mui/material"
import {Link} from 'react-router-dom'
import {LoadingButton} from "@mui/lab"
import {ErrorNames} from "../../types/error"
import {useAuth} from "../../hooks/useAuth"

interface AuthFormProps {
    title: string
    link: string
    bottomText?: string
    linkText: string
    onClick: (email: string, password: string) => void
}

interface IAlert {
    isVisible: boolean
    text: string
}

const AuthForm: FC<AuthFormProps> = ({
                                         title, onClick, link, linkText, bottomText,
                                     }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [alert, setAlert] = useState<IAlert>({
        isVisible: false,
        text: 'User not found',
    })

    const {error, isLoading} = useAuth()

    useEffect(() => {
        if (Object.values<string>(ErrorNames).includes(error)) {
            setEmailError('')
            setPasswordError('')
            setAlert((prevState) => ({...prevState, isVisible: false}))
            switch (error) {
                case ErrorNames.INVALID_EMAIL:
                    setEmailError('Invalid email')
                    return
                case ErrorNames.USER_NOT_FOUND:
                    setAlert(() => ({text: 'User not found', isVisible: true}))
                    return
                case ErrorNames.WRONG_PASSWORD:
                    setPasswordError('Wrong password')
                    return
                case ErrorNames.EMAIL_ALREADY_IN_USE:
                    setEmailError('Email already in use')
                    return
                case ErrorNames.WEAK_PASSWORD:
                    setPasswordError('Weak password')
                    return
                case ErrorNames.INTERNAL_ERROR:
                    setAlert(() => ({text: 'Internal error', isVisible: true}))
                    return
                case ErrorNames.MISSING_EMAIL:
                    setEmailError('Missing email')
                    return
                default: {
                    setAlert(() => ({text: error, isVisible: true}))
                }
            }
        } else {
            setEmailError('')
            setPasswordError('')
        }
    }, [error])
    useEffect(() => {
        setEmailError('')
        setPasswordError('')
        setAlert((prevState) => ({text: '', isVisible: false}))
    }, [])


    const handleClick = () => {
        onClick(email, password)
    }
    const handleClose = () => {
        setAlert((prevState) => ({...prevState, isVisible: false}))
    }

    return (
        <Container sx={{paddingTop: '80px'}}>
            <Card sx={{backgroundColor: '#fff', padding: 2, maxWidth: '500px', marginX: 'auto'}}>
                <CardHeader title={title}/>
                <CardContent>
                    <Box component="form" noValidate autoComplete="off">
                        <div><TextField value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" label="Email" sx={{marginBottom: 2,}}
                                        error={!!emailError} helperText={emailError}/></div>
                        <div><TextField value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password" label="Password"
                                        error={!!passwordError} helperText={passwordError}/></div>
                    </Box>
                </CardContent>
                <CardActions sx={{paddingLeft: 2, flexDirection: 'column', alignItems: 'start'}}>
                    <LoadingButton loading={isLoading} variant="outlined" onClick={handleClick}
                                   sx={{marginBottom: 1}}>Submit</LoadingButton>
                    <Typography variant="body1" component="div">
                        {bottomText} <Link to={link}>{linkText}</Link>
                    </Typography>
                </CardActions>
            </Card>
                <Snackbar open={alert.isVisible} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}>
                    <Alert severity="error" onClose={handleClose} sx={{width: '100%', alignItems: 'center'}}>
                        <Typography variant="h6">{alert.text}</Typography>
                    </Alert>
                </Snackbar>
        </Container>
    )
}

export default AuthForm