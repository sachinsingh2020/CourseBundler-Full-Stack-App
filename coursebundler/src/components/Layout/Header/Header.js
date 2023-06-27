import React from 'react'
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { RiDashboard2Fill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({ url, title, onClose }) => (
    <Link to={url}>
        <Button onClick={onClose} variant={'ghost'}>{title}</Button>
    </Link>
)

const Header = ({ isAuthenticated = false, user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

    const logoutHandler = () => {
        onClose();
        dispatch(logout());
    }
    return (
        <>
            <ColorModeSwitcher />
            <Button onClick={onOpen} colorScheme={'yellow'} width='12' height={'12'} rounded="full" zIndex={'overlay'} pos={'fixed'} top='6' left={'6'} >
                <RiMenu5Fill />
            </Button>
            <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay backdropFilter={'blur(2px)'} />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'}>COURSE BUNDLER</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={'4'} alignItems={'flex-start'} >
                            <LinkButton url={'/'} title={'Home'} onClose={onClose} />
                            <LinkButton url={'/courses'} title={'Browse All Courses'} onClose={onClose} />
                            <LinkButton url={'/request'} title={'Request a Course'} onClose={onClose} />
                            <LinkButton url={'/contact'} title={'Contact Us'} onClose={onClose} />
                            <LinkButton url={'/about'} title={'About'} onClose={onClose} />

                            <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'} >
                                {isAuthenticated ? (
                                    <>
                                        <VStack>
                                            <HStack>
                                                <Link to={'/profile'}>
                                                    <Button onClick={onClose} variant={'ghost'} colorScheme={'yellow'} >Profile</Button>
                                                </Link>
                                                <Button variant={'ghost'} colorScheme={'yellow'} onClick={logoutHandler} >
                                                    <RiLogoutBoxLine />
                                                    Logout</Button>
                                            </HStack>
                                            {user && user.role === 'admin' && (
                                                <Link to='/admin/dashboard' >
                                                    <Button onClick={onClose} colorScheme={'purple'} variant='ghost' >
                                                        <RiDashboard2Fill style={{ margin: '4px' }} />
                                                        DashBoard
                                                    </Button>
                                                </Link>
                                            )}
                                        </VStack>
                                    </>
                                ) : (
                                    <>
                                        <Link to={'/login'}>
                                            <Button onClick={onClose} colorScheme={'yellow'} >Login</Button>
                                        </Link>
                                        <p fontWeight="800" >OR</p>
                                        <Link to={'/register'}>
                                            <Button onClick={onClose} colorScheme={'yellow'} >Sign Up</Button>
                                        </Link>
                                    </>)}
                            </HStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header
