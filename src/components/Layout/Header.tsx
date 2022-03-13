import React, {FC, useState} from 'react'
import {AppBar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Typography} from "@mui/material"
import logo from 'assets/images/logo.svg'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {Link, NavLink} from 'react-router-dom'
import {useAuth} from "hooks/useAuth"
import {useActions} from "hooks/redux"
import {RouteNames} from "types/routes"
import {getAuth} from "firebase/auth"

interface HeaderProps {
    openCart: () => void
    cartQuantity: number
}

const Header: FC<HeaderProps> = ({openCart, cartQuantity}) => {
    const {isAuth, email} = useAuth()
    const auth = getAuth()
    const {removeUser} = useActions()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => setAnchorEl(null)
    const logout = async () => {
        handleClose()
        await auth.signOut()
        removeUser()
    }
    
    return (
        <AppBar sx={{
            paddingY: 1,
            height: 67,
        }}>
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
            }}>
                <NavLink to={RouteNames.ROOT} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: 1,
                    }}>
                        <img src={logo} alt="Market" height={30}/>
                        <Typography variant="h5"
                                    sx={{}}>Market</Typography>
                    </Box>
                </NavLink>
                {
                    isAuth
                        ?
                        <div>
                            <Button color="inherit" onClick={handleMenu}>{email}</Button>
                            <Menu open={Boolean(anchorEl)} onClose={handleClose}
                                  anchorEl={anchorEl}
                                  anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                  }}
                                  keepMounted
                                  transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
                                  }}
                            >
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                            <IconButton onClick={openCart} color="inherit" aria-label="cart">
                                <Badge badgeContent={cartQuantity} anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}>
                                    <ShoppingCartIcon fontSize="large"/>
                                </Badge>
                            </IconButton>
                        </div>

                        :
                        <Link to={RouteNames.LOGIN} style={{color: 'inherit', textDecoration: 'none'}}>
                            <Button color="inherit">Login</Button>
                        </Link>

                }
            </Container>
        </AppBar>
    )
}

export default Header